<template>
  <div>
    <Loader :loader="loader" />
    <div class="air_block">
      <div class="air_block_header">
        <h5>Ввод бюджета</h5>
      </div>
      <hr />
      <br />
      <p class="explanation">
        * Скопируйте данные из Excel и вставьте их в поле ввода <br />
        * Нажмите "Сохранить данные в таблицу"
        * Для редактирования полей таблице кликните на интересующее поле, чтобы сохранить нажмите Enter
      </p>
      <label for="">
        Тип вагона <br>
        <select v-model="wag_type" :disabled="isDisabled">
          <option value="Полувагон">Полувагон</option>
          <option value="Цистерна">Цистерна</option>
        </select>
      </label>

      <textarea class="textarea" placeholder="Вставьте данные из Excel сюда" v-model.trim="excelData"></textarea>
      <button class="Request button" @click="loadFromExcel()">Сохранить данные в таблицу</button>
      <button class="Delete button" @click="ClearTable()" v-show="isShowClearButton">Очистить данные таблицы</button>
      <button class="Accept button" @click="sendDataToServer()" v-show="isShowClearButton">Отправить
        данные&nbsp;&nbsp;<b-icon icon="cursor-fill" aria-hidden="true"></b-icon></button>
      <Transition name="fade">
        <table v-if="show">
          <thead>
            <tr>
              <th>Действие</th>
              <th>Клиент</th>
              <th>Станция отправления</th>
              <th>Станция назначения</th>
              <th>Объемы, тн</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in dataFromExcelData" :key="rowIndex" :class="{ errorText: hasError }">
              <td class="deleteRow" @click="deleteRow(rowIndex)">Удалить</td>
              <td v-for="(cell, cellIndex) in row" :key="cellIndex" style="position: relative"
                :class="{ errorText: hasError }">
                <input v-model="dataFromExcelData[rowIndex][cellIndex]" @click="editCell(rowIndex, cellIndex)"
                  @blur="saveCell()" @keyup.enter="saveCell(rowIndex, cellIndex)"
                  v-if="activeCell === `${rowIndex}-${cellIndex}`" ref="editableInput[rowIndex][cellIndex]"
                  :class="{ errorText: hasError }" />
                <div style="width: 100%" v-else @click="editCell(rowIndex, cellIndex)">
                  <span class="editable-text">{{ cell }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Transition>
    </div>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
      id="notif" />
  </div>
</template>
  
<script>
import api from '@/api/directory'
import apiWagon from '@/api/wagonPark'
import Loader from '@/components/loader/loader.vue';
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  components: { Loader, Notifications },
  data() {
    return {
      loader: false,
      excelData: [],
      dataFromExcelData: [],
      show: false,
      isShowClearButton: false,
      hot: null,
      activeCell: null,
      wag_type: 'Полувагон',
      isDisabled: false,
      hasError: false,
      // Уведомелния
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },

  methods: {

    async sendDataToServer() {
      this.loader = true
      let allClientFlights = [];
      let request = await apiWagon.getClient();
      allClientFlights.push(request.data);

      let roadMemoize = {};
      let roadSetCollection = new Set();

      // Создаем новый массив для совпадающих клиентов и их данных
      let matchedClients = [];

      // Собираем уникальные станции в коллекцию roadSetCollection
      for (let item of this.dataFromExcelData) {
        if (item.departure_station) {
          roadSetCollection.add(item.departure_station);
        }
        if (item.destination_station) {
          roadSetCollection.add(item.destination_station);
        }
      }

      // Запрос кодов для станций и запись в roadMemoize
      let responsePromises = Array.from(roadSetCollection).map(async (station) => {
        try {
          const response = await apiWagon.getCurrentStation(station);
          // Поиск объекта в массиве, сравнение в нижнем регистре
          const matchingObject = response.data.data.find(obj =>
            obj.name && obj.name.toLowerCase() === station?.toLowerCase()
          );

          if (matchingObject) {
            roadMemoize[station] = String(matchingObject.code);
          } else {
            roadMemoize[station] = `Некорректная станция: ${station}`;
          }
        } catch (error) {
          console.error("Ошибка при запросе кода станции", error);
          roadMemoize[station] = "Некорректная станция";
        }
      });

      // Дожидаемся выполнения всех запросов
      await Promise.allSettled(responsePromises);

      this.dataFromExcelData = this.dataFromExcelData.map((item) => {
        const matchingClient = allClientFlights[0].find((el) => item.client?.toLowerCase() === el.client?.toLowerCase());

        // Проверка наличия станции в roadMemoize и ее корректности
        const departureCode = roadMemoize[item.departure_station];
        const destinationCode = roadMemoize[item.destination_station];

        // Проверка корректности станций
        const isDepartureStationCorrect = departureCode && !departureCode.includes("Некорректная");
        const isDestinationStationCorrect = destinationCode && !destinationCode.includes("Некорректная");

        if (matchingClient && isDepartureStationCorrect && isDestinationStationCorrect) {
          // Если найдено совпадение и станции корректны, добавляем в новый массив
          const mergedItem = {
            ...item,
            ...matchingClient,
            departure_station: departureCode,
            destination_station: destinationCode
          };
          matchedClients.push(mergedItem);
          return null; // Удаляем из текущего массива
        } else {
          // Если совпадение не найдено или станции не корректны, заменяем значения
          item.client = !item.client?.includes("Некорректный клиент") ? `Некорректный клиент: ${item.client}` : item.client;
          item.departure_station = !isDepartureStationCorrect ? `Некорректная станция: ${item.departure_station}` : item.departure_station;
          item.destination_station = !isDestinationStationCorrect ? `Некорректная станция: ${item.destination_station}` : item.destination_station;
          return item; // Оставляем в текущем массиве
        }
      }).filter(Boolean);

      if (this.dataFromExcelData.length > 0) {
        this.hasError = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Корректные данные были отправлены. Пожалуйста, исправьте ошибки и повторите попытку";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 3500);
      }

      matchedClients.forEach((item) => (item.wagon_type = this.wag_type));
      api.sendDataForOperSpravka(matchedClients)
        .then(response => {
          console.log(response)
          matchedClients = []
          this.loader = false;
        }).catch((err) => {
          console.log(err)
        })
    },


    loadFromExcel() {
      this.hasError = false
      this.isDisabled = true
      const excelData = this.excelData;
      const rows = excelData.split("\n");
      const data = rows.map((row) => row.split("\t"));

      // Фильтруем строки, исключая те, где "Клиент" пустой или содержит слово "Итог"
      const filteredData = data.filter(row => {
        const clientColumnIndex = 0; // Индекс столбца "Клиент"
        const clientValue = row[clientColumnIndex].trim().toLowerCase();
        return clientValue !== '' && !clientValue.includes('итог');
      });

      const newDataStructure = filteredData.map((row) => {
        return this.wag_type == 'Полувагон' ? { client: row[0], departure_station: row[1], destination_station: row[2], loading_amount: Number(row[3]?.replace(" ", "")) }
          : { client: row[0], departure_station: row[1], destination_station: row[2], volume: Number(row[3]?.replace(" ", "")) }
      });
      for (let item of newDataStructure) {
        // Обрезаем departure_station
        if (item.departure_station) {
          const match = item.departure_station.match(/^(.*?)[А-Я]{3}/);
          item.departure_station = match ? match[1].replace(/,/g, '').trim() : item.departure_station.trim();
        }

        // Обрезаем destination_station
        if (item.destination_station) {
          const match = item.destination_station.match(/^(.*?)[А-Я]{3}/);
          item.destination_station = match ? match[1].replace(/,/g, '').trim() : item.destination_station.trim();
        }
      }
      this.excelData = [];
      this.show = true;
      this.isShowClearButton = true;
      this.dataFromExcelData = newDataStructure;
    },

    editCell(rowIndex, cellIndex) {
      this.activeCell = `${rowIndex}-${cellIndex}`;
      //  Этот блок кода выполняется в следующем такте рендера Vue, что позволяет убедиться, что DOM-элементы обновлены после изменения activeCell.
      this.$nextTick(() => {
        const input = this.$refs.editableInput;
        if (input && input[rowIndex] && input[rowIndex][cellIndex]) {
          input[rowIndex][cellIndex].focus();
        }
      });
    },
    deleteRow(rowIndex) {
      this.dataFromExcelData.splice(rowIndex, 1);
    },
    ClearTable() {
      this.dataFromExcelData = []
      this.isShowClearButton = false
      this.show = false
      this.isDisabled = false
    },
    saveCell() {
      this.activeCell = null; // Завершаем редактирование ячейки
    },
  },
};
</script>


<style scoped>
.errorText {
  background: rgb(250, 228, 231);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active до версии 2.1.8 */
  {
  opacity: 0;
}

input {
  width: 100%;
  text-align: center;
}

table {
  width: 100%;
  margin-top: 2%;
}

td:first-child,
th:first-child {
  width: 70px !important;
}

td:first-child {
  background: rgb(238, 177, 177);
}

td:first-child:hover {
  background: rgb(194, 124, 124);

}

td:not(:first-child) {
  background: #C6E0B4;
}

.errorText td:not(:first-child) {
  background: rgb(250, 228, 231);
}


.Accept,
.Request,
.Delete {
  width: 20vw !important;
  margin-top: 2%;
  width: auto;
  height: 40px;
  margin-left: auto;
}

.hot-display-license-info {
  display: none !important;
}

.air_block {
  width: 70%;
  height: auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  padding: 1%;
  transform: translate(-50%, 0);
}

textarea {
  width: 100%;
  height: 20vh;
  margin-top: 2%;
}

.air_block_header {
  padding: 1% 0 0 2%;
  color: #cacaca;
}
</style>
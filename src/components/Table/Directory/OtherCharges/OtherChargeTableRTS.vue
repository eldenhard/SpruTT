<template>
  <div>
    <Loader :loader="loader" />
    <div class="serviceTable">
      <label for="service1">
        <input type="radio" id="service1" value="service1" v-model="showTable">&nbsp;Таблица 1
      </label>
      <label for="service2">
        <input type="radio" id="service2" value="service2" v-model="showTable">&nbsp;Таблица 2
      </label>
    </div>
    <table v-if="showTable == 'service1'">
      <thead>
        <tr class="table-secondary" style="background: #e1e1e2">
          <th></th>
          <th>Вагон</th>
          <th>Дата подачи вагона</th>
          <th>Дата уборки вагона</th>
          <th>Услуги по отстою</th>
          <th>Цена</th>
          <th>НДС</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td class="deleteRow" @click="deleteRow(rowIndex)">Удалить</td>
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" style="position: relative">
            <input v-model="tableData[rowIndex][cellIndex]" @click="editCell(rowIndex, cellIndex)" @blur="saveCell()"
              @keyup.enter="saveCell(rowIndex, cellIndex)" v-show="isActiveCell(rowIndex, cellIndex)"
              ref="editableInput[rowIndex][cellIndex]" class="editable-input" />
            <div style="width: 100%" @click="editCell(rowIndex, cellIndex)" v-show="!isActiveCell(rowIndex, cellIndex)">
              <span class="editable-text">{{ cell }}</span>
            </div>

          </td>
        </tr>
      </tbody>
    </table>
    <table v-else>
      <thead>
        <tr class="table-secondary" style="background: #e1e1e2">
          <th></th>
          <th>Вагон</th>
          <th>Дата подачи вагона</th>
          <th>Дата уборки вагона</th>
          <th>Маневровые работы</th>
          <th>Подача и уборка</th>
          <th>Ком. осмотр и подготовка</th>
          <th>Цена</th>
          <th>НДС</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData2" :key="rowIndex">
          <td class="deleteRow" @click="deleteRow(rowIndex)">Удалить</td>
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" style="position: relative">
            <input v-model="tableData2[rowIndex][cellIndex]" @click="editCell(rowIndex, cellIndex)" @blur="saveCell()"
              @keyup.enter="saveCell(rowIndex, cellIndex)" v-show="isActiveCell(rowIndex, cellIndex)"
              ref="editableInput[rowIndex][cellIndex]" class="editable-input" />
            <div style="width: 100%" @click="editCell(rowIndex, cellIndex)" v-show="!isActiveCell(rowIndex, cellIndex)">
              <span class="editable-text">{{ cell }}</span>
            </div>

          </td>
        </tr>
      </tbody>
    </table>
    <button class="Accept" @click="sendData()">Отправить</button>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
      id="notif" />

  </div>
</template>

<script>
import Handsontable from "handsontable";
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "../../../loader/loader.vue";
import api from "@/api/directory";

export default {
  props: ['dataMess', 'service', 'contractor', 'act_date', 'act_number'],
  components: {
    Loader,
    Notifications,
  },
  data() {
    return {
      tableData: [],
      tableData2: [],
      hot: null,
      activeRowIndex: null, // Индекс активной строки
      activeCellIndex: null, // Индекс активной ячейки
      showTable: 'service1',
      loader: false,

      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  watch: {
    dataMess: {
      handler(newData, oldData) {
        // Ожидаем, пока данные будут переданы через пропс, и затем инициализируем Handsontable
        this.initializeHandsontable(newData);
      },
      immediate: true, // Запустить обработчик сразу при монтировании компонента
    },
  },

  methods: {
    sendData() {
      let dataWarehouse = []
      if (this.showTable == 'service1') {
        dataWarehouse = this.tableData
      } else {
        dataWarehouse = this.tableData2
      }
      if (this.act_number == "" || this.act_date == "") {
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Заполните поля № договора/Дата акта";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 2500);
        console.log('213')

        return;
      }
      this.loader = true
      let new_obj = {}
      if (dataWarehouse[0].length == 8 && this.showTable == 'service2') {
        console.log('1')
        new_obj = dataWarehouse.map((item) => {
          return {
            wagon: item[0].trim(),
            arrival_date: item[1].split(".").reverse().join("-"),
            departure_date: item[2].split(".").reverse().join("-"),
            service5: item[3].trim()?.replace(",00", ""),
            service7: item[4].trim()?.replace(",00", ""),
            service8: item[5].trim()?.replace(",00", ""),
            cost: parseFloat(item[6].replace(/\s/g, "").replace(",", ".")) ?? null,
            nds: parseFloat(item[7].replace(/\s/g, "").replace(",", ".")) ?? null,
            act_number: this.act_number,
            act_date: this.act_date,
            contractor: this.contractor,
          };
        });
      } else if (dataWarehouse[0].length == 6 && this.showTable == 'service1') {
        console.log('2')
        new_obj = dataWarehouse.map((item) => {
          return {
            wagon: item[0].trim(),
            arrival_date: item[1].split(".").reverse().join("-"),
            departure_date: item[2].split(".").reverse().join("-"),
            service9: item[3].trim()?.replace(",00", ""),
            cost: parseFloat(item[4].replace(/\s/g, "").replace(",", ".")) ?? null,
            nds: parseFloat(item[5].replace(/\s/g, "").replace(",", ".")) ?? null,
            act_number: this.act_number,
            act_date: this.act_date,
            contractor: this.contractor,
          };
        });
      } else {
        this.notifyHead = "Ошибка!";
        this.notifyMessage = "Вы загружаете некорректный объем данных( длина таблицы должна соответствовать длине скопированной области)";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => this.showNotify = false, 4500);
        this.loader = false;
        return
      }

      // console.log(new_obj)
      api
        .postOtherChanges(new_obj)
        .then((response) => {
          this.loader = false;
          if (this.showTable == 'service1') {
            this.tableData = []
          } else {
            this.tableData2 = []
          }
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные отправлены";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 2500);
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Данные не отправлены, повторите позже";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 2500);
        });
    },
    initializeHandsontable(data) {
      console.log(data)
      // Парсим данные из Excel, разделяя их по строкам и столбцам
      const rows = data.split("\n");
      const tableData = rows.map((row) => row.split("\t"));

      // Уничтожаем текущий экземпляр Handsontable, если он существует
      if (this.hot) {
        this.hot.destroy();
      }

      for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
        for (
          let cellIndex = 0;
          cellIndex < tableData[rowIndex].length;
          cellIndex++
        ) {
          if (tableData[rowIndex][cellIndex].trim() === "") {
            tableData[rowIndex][cellIndex] = "0";
          }
        }
      }

      // Инициализируем Handsontable внутри <tbody> и передаем данные
      const tbody = document.querySelector("tbody");
      this.hot = new Handsontable(tbody, {
        data: tableData,
        colHeaders: false, // Отключаем заголовки столбцов
        rowHeaders: false, // Отключаем заголовки строк
      });

      for (let i of tableData) {
        if (i.length == 1) {
          tableData.splice(tableData.indexOf(i), 1);
        }
      }

      // Обновляем tableData
      if (this.showTable == 'service1') {
        this.tableData = tableData;
      } else {
        this.tableData2 = tableData
      }

    },

    editCell(rowIndex, cellIndex) {
      this.activeRowIndex = rowIndex;
      this.activeCellIndex = cellIndex;
    },

    deleteRow(rowIndex) {
      if (this.showTable == 'service1') {
        this.tableData.splice(rowIndex, 1);

      } else {
        this.tableData2.splice(rowIndex, 1);

      }
    },

    saveCell(rowIndex, cellIndex) {
      // Можно добавить обработку сохранения данных, если это необходимо
      this.activeRowIndex = null;
      this.activeCellIndex = null;
    },

    isActiveCell(rowIndex, cellIndex) {
      return (
        this.activeRowIndex === rowIndex && this.activeCellIndex === cellIndex
      );
    },
  },
};
</script>


<style scoped>
.serviceTable {
  margin-top: 2%;
  width: 25%;
  display: flex;
  gap: 2%;
  margin-left: auto;
  justify-content: center;
  align-items: center;
}

tr:hover {
  background: lightgrey;
}

.Accept {
  margin-top: 2%;
  width: 25%;
  margin-left: auto;
  height: 40px;
}

.editable-input {
  width: 100%;
}

.editable-text {
  cursor: pointer;
}

.dataAct {
  display: flex;
  flex-direction: column;
}
.dataAct label {
  width: 100%;
}
.dataAct input {
  width: 100%;
}

.getDataExcel {
  display: flex;
  width: 25%;
  position: relative;
  margin-left: auto !important;
  flex-direction: column;
}
.getDataExcel textarea {
  width: 100%;
  margin-top: 2%;
}
.getDataExcel button {
  margin-top: 2%;
  width: 100%;
}

.radio {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 1%;
  gap: 5%;
}
.radio label {
  font-size: 16px;
  font-weight: bold;
}

.deleteRow {
  background: #ffb0a2;
  color: grey !important;
}

table {
  margin-top: 4%;
}
</style>
<template>
  <div>
    <Loader  :loader="loader" />
    <table>
      <thead>
        <tr class="table-secondary" style="background: #e1e1e2">
          <th></th>
          <th>Вагон</th>
          <th>Дата подачи вагона</th>
          <th>Дата уборки вагона</th>
          <th>Услуга</th>
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
      hot: null,
      activeRowIndex: null, // Индекс активной строки
      activeCellIndex: null, // Индекс активной ячейки
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
      let new_obj = this.tableData.map((item) => {
        return {
          wagon: item[0].trim(),
          arrival_date: item[1].split(".").reverse().join("-"),
          departure_date: item[2].split(".").reverse().join("-"),
          [this.service]: item[3].trim()?.replace(",00", ""),
          cost: parseFloat(item[4].replace(/\s/g, "").replace(",", ".")) ?? null,
          nds: parseFloat(item[5].replace(/\s/g, "").replace(",", ".")) ?? null,
          act_number: this.act_number,
          act_date: this.act_date,
          contractor: this.contractor,
        };
      });

      api
        .postOtherChanges(new_obj)
        .then((response) => {
          this.loader = false;
          this.tableData = [];
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
      this.tableData = tableData;
    },

    editCell(rowIndex, cellIndex) {
      this.activeRowIndex = rowIndex;
      this.activeCellIndex = cellIndex;
    },

    deleteRow(rowIndex) {
      this.tableData.splice(rowIndex, 1);
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


<style lang="scss" scoped>
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

  label {
    width: 100%;
  }

  input {
    width: 100%;
  }
}

.getDataExcel {
  display: flex;
  width: 25%;
  position: relative;
  margin-left: auto !important;
  flex-direction: column;

  textarea {
    width: 100%;
    margin-top: 2%;
  }

  button {
    margin-top: 2%;
    width: 100%;
  }
}

.radio {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 5px;
  padding: 1%;
  gap: 5%;

  label {
    font-size: 16px;
    font-weight: bold;
  }
}

.deleteRow {
  background: rgb(255, 176, 162);
  color: grey !important;
}

table {
  margin-top: 4%;
}
</style>
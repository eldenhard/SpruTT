<template>
  <div>
    <Loader :loader="loader" />
    <div class="getDataExcel">
      <div class="radio">
        <p style="margin-right: auto">Контрагент :</p>
        <label for="ВСТ">
          <input
            id="ВСТ"
            type="radio"
            value='ООО "Вагон-Сервис Транс"'
            v-model="table_type"
          />
          ВСТ
        </label>

        <label for="РТС">
          <input
            id="РТС"
            type="radio"
            value="РТС Сервис"
            v-model="table_type"
          />
          РТС
        </label>
      </div>
      <div class="dataAct">
        <label for=""
        v-if="table_type === 'РТС Сервис'"
          >Услуги <br>
          <select name="" id="" class="textarea" style="width: 100%">
            <option value="">Услуги по маневровой работ</option>
            <option value="">
              Комплекс работ и услуг по ком. осмотру и подг. ваг.
            </option>
            <option value="">Услуги по подаче и уборке вагонов</option>
            <option value="">Услуги по отстою</option>
          </select>
        </label>
        <label for=""
          >№ договора <br />
          <input type="text" v-model="act_number" class="textarea" />
        </label>
        <label for=""
          >Дата акта<br />
          <input type="date" v-model="act_date" class="textarea" />
        </label>
      </div>

      <textarea
        v-model="excelData"
        placeholder="Вставьте данные из Excel сюда"
        class="textarea"
      ></textarea>
      <button class="Accept" @click="loadFromExcel">Загрузить</button>
    </div>

    <table class="table-hover" v-if="table_type != 'РТС Сервис'">
      <thead>
        <tr class="table-secondary" style="background: #e1e1e2">
          <th></th>
          <th>Вагон</th>
          <th>Из под груза</th>
          <th>Дата прибытия</th>
          <th>Дата начала отстоя</th>
          <th>Дата вывода вагонов с под. пути</th>
          <th>Расчетное время (сут)</th>
          <th>Ремонт запорного мех. люка</th>
          <th>Уборка вагона от снега без зач.</th>
          <th>Удаление остатков ранее перев. груза</th>
          <th>Проведение сварочных работ</th>
          <th>Маневровые работы</th>
          <th>Осмотр вагонов</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td class="deleteRow" @click="deleteRow(rowIndex)">Удалить</td>
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            style="position: relative"
          >
            <input
              v-model="tableData[rowIndex][cellIndex]"
              @click="editCell(rowIndex, cellIndex)"
              @blur="saveCell()"
              @keyup.enter="saveCell(rowIndex, cellIndex)"
              v-if="activeCell === `${rowIndex}-${cellIndex}`"
              ref="editableInput[rowIndex][cellIndex]"
              class="editable-input"
            />
            <div
              style="width: 100%"
              v-else
              @click="editCell(rowIndex, cellIndex)"
            >
              <span class="editable-text">{{ cell }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <OtherChargeTableRTS v-if="table_type === 'РТС Сервис'">
      <tr>
        <td></td>
      </tr>
    </OtherChargeTableRTS>

    <button class="Accept" @click="sendData()">Отправить</button>

    <OtherChargesChangeVue style="margin-top: 10%" />


    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
      id="notif"
    />
  </div>
</template>

<script>
import Handsontable from "handsontable";
import Loader from "../../../loader/loader.vue";
import api from "@/api/directory";
import OtherChargesChangeVue from "./OtherChargesChange.vue";
import OtherChargeTableRTS from "./OtherChargeTableRTS.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  components: {
    Loader,
    OtherChargesChangeVue,
    Notifications,
    OtherChargeTableRTS,
  },
  data() {
    return {
      excelData: "",
      tableData: [],
      hot: null,
      activeCell: null,
      table_type: 'ООО "Вагон-Сервис Транс"',
      act_number: "",
      act_date: "",
      loader: false,

      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
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
        return;
      }
      this.loader = true;
      let new_obj = this.tableData.map((item) => {
        return {
          wagon: item[0].trim(),
          from_cargo: item[1].trim(),
          arrival_date: item[2].split(".").reverse().join("-"),
          parking_begin_date: item[3].split(".").reverse().join("-"),
          departure_date: item[4].split(".").reverse().join("-"),
          days: Number(item[5].trim()),
          service1: item[6].trim(),
          service2: item[7].trim(),
          service3: item[8].trim(),
          service4: item[9].trim(),
          service5: item[10].trim(),
          service6: item[11].trim(),
          cost: Number(item[12].replace(" ", "").replace(",", ".")) ?? null,
          act_number: this.act_number,
          act_date: this.act_date,
          contractor: this.table_type,
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
    loadFromExcel() {
      const excelData = this.excelData;
      // Парсим данные из Excel, разделяя их по строкам и столбцам
      const rows = excelData.split("\n");
      const data = rows.map((row) => row.split("\t"));

      // Уничтожаем текущий экземпляр Handsontable, если он существует
      if (this.hot) {
        this.hot.destroy();
      }
      for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        for (
          let cellIndex = 0;
          cellIndex < data[rowIndex].length;
          cellIndex++
        ) {
          if (data[rowIndex][cellIndex].trim() === "") {
            data[rowIndex][cellIndex] = "0";
          }
        }
      }
      // Инициализируем Handsontable внутри <tbody> и передаем данные
      const tbody = document.querySelector("tbody");
      this.hot = new Handsontable(tbody, {
        data: data,
        colHeaders: false, // Отключаем заголовки столбцов
        rowHeaders: false, // Отключаем заголовки строк
      });
      for (let i of data) {
        if (i.length == 1) {
          data.splice(data.indexOf(i), 1);
        }
      }
      // Обновляем tableData
      this.tableData = data;
      this.excelData = "";
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
      this.tableData.splice(rowIndex, 1);
      if (this.hot) {
        this.hot.loadData(this.tableData);
      }
    },
    saveCell() {
      console.log(this.tableData);
      this.activeCell = null; // Завершаем редактирование ячейки
    },
  },
};
</script>

<style lang="scss" scoped>
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
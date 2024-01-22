<template>
  <div>
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
        <select v-model="wag_type">
          <option value="Полувагон">Полувагон</option>
          <option value="Цистерна">Цистерна</option>
        </select>
      </label>
    
      <textarea class="textarea" placeholder="Вставьте данные из Excel сюда" v-model.trim="excelData"></textarea>
      <button class="Accept button" @click="loadFromExcel()">Сохранить данные в таблицу</button>
      <button class="Action button" @click="ClearTable()" v-show="isShowClearButton">Очистить данные таблицы</button>
      <Transition name="fade">
        <table v-if="show">
          <thead>
            <tr>
              <th>Действие</th>
              <th>Клиент</th>
              <th>Объемы, тн</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in dataFromExcelData" :key="rowIndex">
              <td class="deleteRow" @click="deleteRow(rowIndex)">Удалить</td>
              <td v-for="(cell, cellIndex) in row" :key="cellIndex" style="position: relative">
                <input v-model="dataFromExcelData[rowIndex][cellIndex]" @click="editCell(rowIndex, cellIndex)"
                  @blur="saveCell()" @keyup.enter="saveCell(rowIndex, cellIndex)"
                  v-if="activeCell === `${rowIndex}-${cellIndex}`" ref="editableInput[rowIndex][cellIndex]"
                  class="editable-input" />
                <div style="width: 100%" v-else @click="editCell(rowIndex, cellIndex)">
                  <span class="editable-text">{{ cell }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Transition>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      excelData: [],
      dataFromExcelData: [],
      show: false,
      isShowClearButton: false,
      hot: null,
      activeCell: null,
      wag_type: 'Полувагон'
    };
  },
  methods: {

    loadFromExcel() {
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
        return { client: row[0], volume: row[1] || "0" };
      });

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
    },
    saveCell() {
      this.activeCell = null; // Завершаем редактирование ячейки
    },
  },
};
</script>


<style scoped>
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
  width: 55px !important;
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



.Accept,
.Action {
  min-width: 20%;
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
}

.air_block_header {
  padding: 1% 0 0 2%;
  color: #cacaca;
}
</style>
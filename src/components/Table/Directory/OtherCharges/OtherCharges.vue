<template>
  <div>
    <button @click="sendData()">ОТправить</button>
    <table>
      <thead>
        <tr>
          <th>Вагон</th>
          <th>Из под груза</th>
          <th>Дата прибытия</th>
          <th>Дата начала отстоя</th>
          <th>Дата вывода вагонов с подъездного пути</th>
          <th>Расчетное время (сут)</th>
          <th>Ремонт запорного механизма люка</th>
          <th>Уборка вагона от снега без зачистки</th>
          <th>Удаление остатков ранее перевозимого груза</th>
          <th>Проведение сварочных работ</th>
          <th>Маневровые работы</th>
          <th>Осмотр вагонов</th>
          <th>Примечания</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            <input v-model="tableData[rowIndex][cellIndex]" @click="editCell(rowIndex, cellIndex)"
              @blur="saveCell()" @keyup.enter="saveCell(rowIndex, cellIndex)"
              v-if="activeCell === `${rowIndex}-${cellIndex}`" ref="editableInput[rowIndex][cellIndex]"
              class="editable-input">
            <span @click="editCell(rowIndex, cellIndex)" v-else class="editable-text">{{ cell }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <textarea v-model="excelData" placeholder="Вставьте данные из Excel сюда"></textarea>
    <button @click="loadFromExcel">Загрузить из Excel</button>
  </div>
</template>

<script>

import Handsontable from 'handsontable';

export default {
  data() {
    return {
      excelData: '',
      tableData: [],
      hot: null,
      activeCell: null,
    };
  },
  methods: {
    sendData() {
      console.log(this.tableData)
    },
    loadFromExcel() {
      const excelData = this.excelData;

      // Парсим данные из Excel, разделяя их по строкам и столбцам
      const rows = excelData.split('\n');
      const data = rows.map(row => row.split('\t'));

      // Уничтожаем текущий экземпляр Handsontable, если он существует
      if (this.hot) {
        this.hot.destroy();
      }

      // Инициализируем Handsontable внутри <tbody> и передаем данные
      const tbody = document.querySelector('tbody');
      this.hot = new Handsontable(tbody, {
        data: data,
        colHeaders: false, // Отключаем заголовки столбцов
        rowHeaders: false, // Отключаем заголовки строк
        // Другие настройки Handsontable, если необходимо
      });

      // Обновляем tableData
      this.tableData = data;
      console.log(this.tableData)
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
    saveCell() {
      console.log(this.tableData)
      this.activeCell = null; // Завершаем редактирование ячейки
    },

  },
};
</script>

<style>
.editable-input {
  width: 100%;
}

.editable-text {
  cursor: pointer;
}
</style>
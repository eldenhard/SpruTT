<script>
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
registerAllModules(); // Регистрируем все модули Handsontable

export default {
  components: { HotTable },
  data() {
    return {
      placeholderData: "", // Данные из textarea
      tableData: [], // Данные для Handsontable
      colHeaders: [
        "Сетевой Номер",
        "Тип вагона",
        "Модель",
        "Дата выпуска/по-стройки",
        "Срок службы",
        "Страховая сумма, руб. без НДС",
      ], // Заголовки столбцов
      columns: [
        { data: "Сетевой Номер" },
        { data: "Тип вагона" },
        { data: "Модель" },
        { data: "Дата выпуска/по-стройки" },
        { data: "Срок службы" },
        { data: "Страховая сумма, руб. без НДС" },
      ], // Конфигурация столбцов
    };
  },
  methods: {
    loadDataToTable() {
      // Преобразуем текст из textarea в массив данных для таблицы
      const rows = this.placeholderData.split("\n").map((row) => row.split("\t"));
      if(rows.at(-1).length === 1) rows.pop()
      // Обновляем tableData для Handsontable
      this.tableData = rows.map((row) => ({
        "Сетевой Номер": row[0],
        "Тип вагона": row[1],
        "Модель": row[2],
        "Дата выпуска/по-стройки": row[3],
        "Срок службы": row[4],
        "Страховая сумма, руб. без НДС": row[5],
      }));

      // Обновляем таблицу Handsontable
      this.$nextTick(() => {
        const hotInstance = this.$refs.hotTableComponent.hotInstance;
        hotInstance.loadData(this.tableData);
        hotInstance.render();
        this.placeholderData = "";
      });
    },
  },
};
</script>

<template>
    <b-modal id="modal-1234567" centered  cancel-disabled title="Загрузка страховой суммы" size="xl">
      <div class="modal-table">
        <textarea v-model="placeholderData" placeholder="Вставьте данные из Excel сюда"></textarea>
        <b-button variant="info" @click="loadDataToTable">Вгрузить в таблицу</b-button>
        <br><br>
        <hot-table
            ref="hotTableComponent"
            :data="tableData"
            :colHeaders="colHeaders"
            :columns="columns"
            :rowHeaders="true"
            :licenseKey="'non-commercial-and-evaluation'"
            :height="400"
            :width="'100%'"
        ></hot-table>
      </div>
      <template #modal-footer="{ ok, cancel }">
        <b-button size="md" variant="success" @click="ok()">Сохранить</b-button>
        <b-button size="md" variant="danger" @click="cancel()">Закрыть</b-button>
      </template>
      

    </b-modal>
  </template>
<style scoped>


textarea{
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
}
</style>
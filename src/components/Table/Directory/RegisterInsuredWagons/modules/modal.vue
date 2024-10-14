<script>
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
registerAllModules(); // Регистрируем все модули Handsontable
import api from "@/api/directory";
import { time } from '@amcharts/amcharts4/core';

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
        { data: "wagon_number" },
        { data: "wagon_type" },
        { data: "wagon_model" },
        { data: "build_date" },
        { data: "lifetime" },
        { data: "insurance_sum" },
      ], // Конфигурация столбцов
    };
  },
  methods: {
    loadDataToTable() {
      // Преобразуем текст из textarea в массив данных для таблицы
      const rows = this.placeholderData.split("\n").map((row) => row.split("\t"));
      if(rows.at(-1).length === 1) rows.pop()
      // Обновляем tableData
      this.tableData = rows.map((row) => ({
        "wagon_number": row[0],
        "wagon_type": row[1],
        "wagon_model": row[2],
        "build_date": row[3].split(".").reverse().join("-"),
        "lifetime": row[4].split(".").reverse().join("-"),
        "insurance_sum": parseFloat(row[5].replace(/\s+/g, '').replace(',', '.'))
      }));

      // Обновляем таблицу Handsontable
      this.$nextTick(() => {
        const hotInstance = this.$refs.hotTableComponent.hotInstance;
        hotInstance.loadData(this.tableData);
        hotInstance.render();
        this.placeholderData = "";
      });
    },
    async saveNewInsuredSum() {
    try {
        let check_wagons = this.tableData.map((item) => api.getAllInsuranceWagons({ wagons: item.wagon_number }, 1));
        let responses = await Promise.all(check_wagons);

        let error_wagon = [];
        let success_wagon = [];

        for (let i in responses) {
            if (responses[i].data.data.length === 0) {
                error_wagon.push(this.tableData[i]); 
            } else {
                success_wagon.push({
                    ...this.tableData[i],
                    id: responses[i].data.data[0].id 
                });
            }
        }

        let createNewDiaryInHistoryWagon = success_wagon.map((item) => api.editInsuranceWagons(item.id, item));
        let createNewInsuredWagon = error_wagon.map((item) => api.sendNewDataInsuranceWagons([item]));
        
        let all_response = await Promise.allSettled([...createNewDiaryInHistoryWagon, ...createNewInsuredWagon]);

        let failed_wagons = [];
        for (const result of all_response) {
            if (result.status === "rejected") {
                failed_wagons.push(result.reason.config.data.wagons); // Если запрос не удался, добавляем в список ошибочных
            }
        }

        if (failed_wagons.length === 0) {
            this.$toast.success('Все данные сохранены!', {timeout: 4000}); 
            this.tableData = []
            this.placeholderData = ""
            this.$bvModal.hide('modal-1234567')
        } else {
            this.$toast.error(`Не удалось сохранить вагоны: ${failed_wagons.join(', ')}`, {
                timeout: 8000,
            }); // Сообщение с ошибочными вагонами
        }
    } catch (err) {
        console.error(err);
        this.$toast.error('Произошла ошибка при сохранении данных.', {
            timeout:3500
        });
    } finally {

    }
}

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
      <template #modal-footer="{  cancel }">
        <b-button size="md" variant="success" @click="saveNewInsuredSum()">Сохранить</b-button>
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
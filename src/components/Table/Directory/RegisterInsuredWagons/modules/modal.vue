<script>
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import {
  registerLanguageDictionary,
  getLanguagesDictionaries,
  ruRU,
} from "handsontable/i18n";
import Handsontable from 'handsontable';
import api from "@/api/directory";
import { time } from '@amcharts/amcharts4/core';

export default {
  components: { HotTable },
  props: {
    title: {
      type: String,
    },
    insuredCase: {
      type: Boolean,
    },
    DataForModal: {
      type: Array,
    }
    
  },
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
      dropdownMenuOptions: ['filter_by_condition', 'filter_action_bar', 'filter_by_value', 'clear_column'],

columnsInsured: [
    { data: 'status', editor: 'select', selectOptions: ['Новый', 'Архивный'] },
    { data: 'wagon_number', type: 'text', readOnly: false },
    { data: 'wagon_type', readOnly: true },
    { data: 'owner', type: 'text' },
    { data: 'insurance_company', type: 'text' },
    { data: 'agr_number', type: 'text' },
    { data: 'franchise_sum', type: 'numeric' },
    {
        data: 'conditional',
        type: 'dropdown',
        editor: 'select',
        selectOptions: ['Условная', 'Безусловная'],
        renderer: function (instance, td, row, col, prop, value, cellProperties) {
            let displayValue = value === true || value === 'Условная' ? 'Условная' : 'Безусловная';
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.innerText = displayValue;
        },
        onChange: function (value, row, prop) {
            // Преобразуем строковое значение в boolean при изменении
            if (prop === 'conditional') {
                this.tableData[row][prop] = value === 'Условная' ? true : false;
            }
        }
    },


    { data: 'insure_case_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
    { data: 'vu23_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
    { data: 'vu36_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
    { data: 'fault_code', type: 'text' },
    { data: 'repair_exclusion_loss', type: 'text' },


    { data: 'damage_causer', type: 'text' },
    { data: 'client', type: 'text' },
    { data: 'sk_notification_date', type: 'date', dateFormat: 'YYYY-MM-DD', readOnly: false },
    { data: 'out_application_number', type: 'text', readOnly: false },
    { data: 'application_date', type: 'date', dateFormat: 'YYYY-MM-DD', readOnly: false },


    { data: 'last_request_response_date', type: 'date', dateFormat: 'YYYY-MM-DD', readOnly: false },
    { data: 'refund_date', type: 'date', dateFormat: 'YYYY-MM-DD', readOnly: false },
    { data: 'estimated_insurance_indemnity', type: 'text' },
    { data: 'franchise', type: 'text' },
    { data: 'deduction_of_balances', type: 'numeric' },


    { data: 'fact_insurance_indemnity', type: 'numeric' },
    { data: 'refused', type: 'numeric' },
    { data: 'repair_downtime_pending_amount', type: 'numeric' },
    { data: 'railway_fare_to_from_repair', type: 'numeric' },
    { data: 'additional_compensation_due', type: 'numeric' },


    { data: 'total_loss_tt', type: 'numeric' },
    { data: 'reimbursed', type: 'numeric' },
    { data: 'reimbursed_ost', type: 'numeric' },
    { data: 'comment', type: 'text' },

],
colHeadersInsured: [
    'Статус',
    'Номер вагона',
    'Тип вагона',
    'Собственник',
    'Страховая компания',
    '№ Договора',
    'Сумма франшизы',
    'Условная/Безусловная',


    "Дата страхового случая",
    'Дата ВУ-23',
    'Дата ВУ-36/ИСКЛ',
    "Код неисправности",
    'Ремонт/исключение/утеря',


    'Виновник повреждения',
    'Клиент',
    'Дата уведомления в СК',
    'Исх. Номер заявления',
    'Дата заявления',


    'Дата направления ответа по последнему запросу',
    'Дата возмещения',
    'Предполагаемое/ Причитающееся страховое возмещение',
    'Франшиза',
    'Вычет остатков',


    'Факт возмещения от страховой, руб.',
    'Отказано',
    'Сумма за простой в ремонте',
    'Ж/д тариф в/из ремонта',
    'Причитающееся довозмещение',

    'ИТОГО потери ТТ',
    'Возмещено ВСЕГО',
    'Осталось возместить',
    'Примечание'
],
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
      this.$emit("startStopLoader", true);
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
          this.$emit("startStopLoader", false);

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
        this.$emit("startStopLoader", false);

        this.$toast.error('Произошла ошибка при сохранении данных.', {
            timeout:3500
        });
    } finally {
      this.$emit("startStopLoader", false);

    }
},
async saveNewInsuredCase(){
  try {
                this.$emit('startStopLoader', true);
                // Преобразование перед сохранением: "Условная" -> true, "Безусловная" -> false
                let dataToSave = this.DataForModal.map(item => ({
                    ...item,
                       // Преобразуем даты
                    build_date: item.build_date?.split(".").reverse().join("-") ?? null,
                    lifetime: item.lifetime?.split(".").reverse().join("-") ?? null,
                    cutting_date: item.cutting_date?.split(".").reverse().join("-") ?? null,
                    agr_date: item.agr_date?.split(".").reverse().join("-") ?? null,
                    agr_date_end: item.agr_date_end?.split(".").reverse().join("-") ?? null,
                    last_operation_date: item.last_operation_date?.split(".").reverse().join("-") ?? null,
                    state_change_date: item.state_change_date?.split(".").reverse().join("-") ?? null,
                    on_balance_1c: item.on_balance_1c === "Да" ? true : false,
                    conditional: item.conditional === 'Условная' ? true : false
                }));
                // console.log(dataToSave);
                await api.saveDataInsuranceCases(dataToSave);

                this.$emit('startStopLoader', false);
                this.$bvModal.hide("modal-12345678");
                this.$toast.success('Данные сохранены', { timeout: 3000 });

            } catch (err) {
                console.log(err);
                this.$emit('startStopLoader', false);
                this.$toast.error(`Данные не сохранены\n ${err}`, { timeout: 3000 });
            }
},

  },
};
</script>

<template>
  <div>

    <b-modal id="modal-1234567" centered  cancel-disabled title="Загрузка страховой суммы" size="xl" v-if="!insuredCase">
      <div class="modal-table">
        <textarea v-model="placeholderData" placeholder="Вставьте данные из Excel сюда"></textarea>
        <b-button variant="info" :class="{pulse: tableData.length == 0}" @click="loadDataToTable">Вгрузить в таблицу</b-button>
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
        <b-button size="md" variant="success" class="pulse_green" v-show="tableData.length > 0" @click="saveNewInsuredSum()" >Сохранить</b-button>
        <b-button size="md" variant="danger" @click="cancel()">Закрыть</b-button>
      </template>
      

    </b-modal>


    <b-modal id="modal-12345678" centered  cancel-disabled :title="title" size="xl" v-if="insuredCase">
      <div class="modal-table">
                <hot-table ref="modalHotTable" v-if="DataForModal.length > 0" :data="DataForModal" :columns="columnsInsured"
                    :rowHeaders="false" :colHeaders="colHeadersInsured" height="30vh" :manualColumnResize="true"
                    :manualRowResize="true" :filters="true" :language="'ru-RU'" :dropdownMenu="dropdownMenuOptions"
                    :licenseKey="'non-commercial-and-evaluation'">
                </hot-table>
                <div v-else style="display: flex; align-items: center; justify-content: center">
                    <h4>Данных нет</h4>
                </div>
            </div>
      <template #modal-footer="{  cancel }">
        <b-button size="md" variant="success" class="pulse_green"  @click="saveNewInsuredCase()"  v-if="
          DataForModal.length > 0 
          && 
          title != 'Архивные страховые случаи'" 
          >Сохранить</b-button>
        <b-button size="md" variant="danger" @click="cancel()">Закрыть</b-button>
      </template>
      

    </b-modal>

  </div>
  </template>


<style scoped>
.pulse{
  background-color: #4285f4;
  border: none;
  animation-name: color;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  
}
@keyframes color {
  0% {
    background-color: #315faa;
  }
  50% {
    background-color: #4285f4;
  }
  100% {
    background-color: #315faa;
  }
}
.pulse_green{
  background-color: #44C287;
  border: none;
  animation-name: color_green;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
@keyframes color_green {
  0% {
    background-color: #44C287;
  }
  50% {
    background-color: #2b7e57;
  }
  100% {
    background-color: #44C287;
  }
}
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
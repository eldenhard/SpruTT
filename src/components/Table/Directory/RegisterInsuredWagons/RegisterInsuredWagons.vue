<template>
  <div>
    <Loader :loader="loader" />
    <div class="air_block" style="width: 98vw; margin: 1% 0 0 0">
      <modal />
      <div class="air_block_header">
        <h4>Реестр застрахованных вагонов</h4>
      </div>
      <hr />
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Застрахованные вагоны" active>
            <b-card-text style="margin-left: -5%; margin-top: -2%;">
              <div>
                <!-- <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    gap: 5vw;
                    height: 4vh;
                  "
                >
                  <template v-if="getInsuredWagonsData.length > 1">
                    <PregisterIsuredwagonsSearch
                      @getInsuredWagons="getInsuredWagons"
                      @getOwnWagonsCompare="getOwnWagonsCompare"
                      style="width: 80%"
                    />
                  </template>
                  <template v-else>
                    <PregisterIsuredwagonsSearch
                      @getInsuredWagons="getInsuredWagons"
                      @getOwnWagonsCompare="getOwnWagonsCompare"
                      style="width: 100%"
                    />
                  </template>
                  <PregisterInsuredWagonsAddColumnVue
                    @add_column_el="addNewObjectInColumns"
                    style="width: 100%"
                  />
                
                </div> -->
                <br />
                <!-- <b-button
                  variant="info"
                  style="position: absolute; right: 2%"
                  v-if="getInsuredWagonsData.length > 1"
                  @click="DownloadExcel('test')"
                  >Выгрузить в EXCEL</b-button
                > -->
                <br />

                <h4
                  class="air_block_header"
                  v-show="getInsuredWagonsData.length > 0"
                >
                  <b-spinner
                    :variant="'secondary'"
                    style="width: 1.5rem; height: 1.5rem"
                    v-show="is_save_row"
                  />&nbsp;Застрахованные вагоны
                </h4>

                <div>
                  <b-button-toolbar>
                    <b-button-group>
                      <b-button size="sm" class="mb-2 border rounded p-2 d-flex " style="min-width:150px !important" focusable="false">
                        <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
                        <PregisterIsuredwagonsSearch @getInsuredWagons="getInsuredWagons" @getOwnWagonsCompare="getOwnWagonsCompare" style="margin-left: 5px !important"/>
                      </b-button>
                       <b-button size="sm" class="mb-2 border rounded p-2" @click="$bvModal.show('modal-1234567')">
                        <b-icon icon="file-earmark" aria-hidden="true"></b-icon> Внести данные
                      </b-button>
                      <b-button size="sm" class="mb-2 border rounded p-2">
                        <b-icon icon="cloud-upload" aria-hidden="true"></b-icon> Выгрузить в Excel
                      </b-button>
                    </b-button-group>
                  </b-button-toolbar>
                </div>
                
                <span class="description-text"
                  >Всего записей {{ getInsuredWagonsData.length ?? 0 }}</span
                >
                <br />
                <br />
                <input
                  v-model="wagonFilter"
                  @input="applyCustomWagonFilter"
                  placeholder="Введите номера вагонов через пробел"
                  class="searchBlock"
                />
                <hot-table
                  ref="hotTableComponent"
                  :data="getInsuredWagonsData"
                  :rowHeaders="true"
                  :columns="columns"
                  :preventOverflow="'horizontal'"
                  :filters="true"
                  :language="'ru-RU'"
                  :manualColumnResize="true"
                  :autoWrapRow="true"
                  :autoWrapCol="true"
                  :height="'59vh'"
                  :width="'100%'"
                  :fillHandle="true"
                  :manualColumnMove="true"
                  :dropdownMenu="dropdownMenuOptions"
                  :cells="cellConfig"
                  :afterColumnResize="onColumnResize"
                  :afterColumnMove="onColumnMove"
                ></hot-table>
                <br />
                <!-- Перечень незастрахованных вагонов -->
                <OwnWagonsCompareTable
                  :getOwnWagonsCompareData="getOwnWagonsCompareData"
                  :columns="columns_own_wagons"
                  :columns_table_copy="columns_table_copy"
                  @startStopLoader="startStopLoader"
                  :dropdownMenuOptions="dropdownMenuOptions"
                  :is_mini_loader="mini_loader"
                />
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Страховые случаи">
            <b-card-text>
              <saveAccidientVue @startStopLoader="startStopLoader" />
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { saveAs } from "file-saver";

import api from "@/api/wagonPark";
import api_directory from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import PregisterIsuredwagonsSearch from "./components/PregisterIsuredwagonsSearch.vue";
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import {
  registerLanguageDictionary,
  getLanguagesDictionaries,
  ruRU,
} from "handsontable/i18n";
import modal from './modules/modal.vue'
registerLanguageDictionary(ruRU);
registerAllModules();
// import 'handsontable/dist/handsontable.full.min.css';
import PregisterInsuredWagonsAddColumnVue from "./components/PregisterInsuredWagonsAddColumn.vue";
import OwnWagonsCompareTable from "./components/OwnWagonsCompareTable.vue";
import saveAccidientVue from "./components/saveAccidient.vue";
import moment from "moment";
import "moment/locale/ru";
import debounce from "lodash/debounce";
import Pikaday from "pikaday";

export default {
  components: {
    Loader,
    PregisterIsuredwagonsSearch,
    PregisterInsuredWagonsAddColumnVue,
    HotTable,
    OwnWagonsCompareTable,
    saveAccidientVue,
    modal,
  },
  data() {
    return {
      wagonFilter: "",
      loader: false,
      mini_loader: false,
      nameClient: [],
      is_save_row: false,
      columns: [
        {
          title: "Номер вагона",
          data: "wagon_number",
          width: "150px",
          minWidth: "150px",
        },
        {
          title: "Тип вагона",
          data: "wagon_type",
          editor: "select",
          selectOptions: ["ПВ", "ЦС"],
          width: "150px",
        },
        {
          title: "Собст. на момент страхования",
          data: "owner_at_insurance_moment",
          editor: "select",
          selectOptions: [
            "ДЕЛОВОЙ ВИЗИТ, ООО",
            'ООО "ТРАНСПОРТНЫЕ ТЕХНОЛОГИИ"',
            "OОО TRANSPORT TECHNOLOGIES GP",
          ],
        },
        {
          title: "Страховая компания",
          data: "insurance_company",
          width: "200px",
        },
        { title: "№ договора", data: "agr_number", width: "150px" },
        {
          title: "Дата договора",
          data: "agr_date",
          type: "date",
          width: "150px",
          dateFormat: "DD.MM.YYYY",
          correctFormat: true, // Принудительное применение формата
          allowInvalid: false, // Отклоняет некорректные даты
          datePickerConfig: {
            showWeekNumber: false,
            i18n: {
              previousMonth: "Предыдущий месяц",
              nextMonth: "Следующий месяц",
              months: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
              ],
              weekdays: [
                "Воскресенье",
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота",
              ],
              weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            },
            format: "DD.MM.YYYY",
          },
        },
        {
          title: "Дата прекращения действия договора страхования",
          data: "agr_date_end",
          type: "date",
          width: "200px",
          dateFormat: "DD.MM.YYYY",
          correctFormat: true, // Принудительное применение формата
          allowInvalid: false, // Отклоняет некорректные даты
          width: 450,
          datePickerConfig: {
            showWeekNumber: false,
            i18n: {
              previousMonth: "Предыдущий месяц",
              nextMonth: "Следующий месяц",
              months: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
              ],
              weekdays: [
                "Воскресенье",
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота",
              ],
              weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            },
            format: "DD.MM.YYYY",
          },
        },
        { title: "Собственник", data: "owner", width: "150px" },
        {
          title: "Страховая сумма, руб",
          data: "insurance_sum",
          type: "numeric",
          numericFormat: { pattern: "0 0.00" },
          width: "200px",
        },
        {
          title: "На балансе",
          data: "on_balance_1c",
          width: "150px",
          editor: "select",
          selectOptions: ["Да", "Нет"],
        },
        {
          title: "Дата постройки",
          data: "build_date",
          dateFormat: "YYYY-MM-DD",
          correctFormat: true,
          width: "150px",
        },
        { title: "Срок службы", data: "lifetime", width: "150px" },
        { title: "Группа СТЖ", data: "group", width: "150px" },
        {
          title: "Собственник СТЖ",
          data: "owner_at_insurance_moment",
          width: "180px",
        },
      ],
      columns_table_copy: [
        { title: "Номер вагона", data: "wagon_number", width: "150px" },
        {
          title: "Тип вагона",
          data: "wagon_type",
          editor: "select",
          selectOptions: ["ПВ", "ЦС"],
          width: "150px",
        },
        {
          title: "Собст. на момент страхования",
          data: "owner_at_insurance_moment",
          editor: "select",
          selectOptions: [
            "ДЕЛОВОЙ ВИЗИТ, ООО",
            'ООО "ТРАНСПОРТНЫЕ ТЕХНОЛОГИИ"',
            "OОО TRANSPORT TECHNOLOGIES GP",
          ],
        },
        {
          title: "На балансе 1С",
          data: "on_balance_1c",
          width: "150px",
          editor: "select",
          selectOptions: ["Да", "Нет"],
        },
        {
          title: "Страховая компания",
          data: "insurance_company",
          width: "200px",
        },
        { title: "№ договора", data: "agr_number", width: "150px" },
        {
          title: "Дата договора",
          data: "agr_date",
          type: "date",
          width: "150px",
          dateFormat: "DD.MM.YYYY",
          correctFormat: true, // Принудительное применение формата
          allowInvalid: false, // Отклоняет некорректные даты
          datePickerConfig: {
            showWeekNumber: false,
            i18n: {
              previousMonth: "Предыдущий месяц",
              nextMonth: "Следующий месяц",
              months: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
              ],
              weekdays: [
                "Воскресенье",
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота",
              ],
              weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            },
            format: "DD.MM.YYYY",
          },
        },
        {
          title: "Дата прекращения действия договора страхования",
          data: "agr_date_end",
          type: "date",
          width: "200px",
          dateFormat: "DD.MM.YYYY",
          correctFormat: true, // Принудительное применение формата
          allowInvalid: false, // Отклоняет некорректные даты
          width: 450,
          datePickerConfig: {
            showWeekNumber: false,
            i18n: {
              previousMonth: "Предыдущий месяц",
              nextMonth: "Следующий месяц",
              months: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
              ],
              weekdays: [
                "Воскресенье",
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота",
              ],
              weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            },
            format: "DD.MM.YYYY",
          },
        },
      ],
      // dropdownMenuOptions: ['clear_column', 'filter_by_condition', 'filter_by_value'],
      dropdownMenuOptions: [
        "filter_by_condition",
        "filter_action_bar",
        "filter_by_value",
        "clear_column",
      ],

      // Для маленькой таблицы незастрахованных вагонов
      columns_own_wagons: [
        { title: "Номер вагона", data: "Номер вагона" },
        {
          title: "Принадлежность СТЖ",
          data: "Принадлежность СТЖ",
          editor: false,
        },
        {
          title: "В управлении компании",
          data: "В управлении компании",
          editor: false,
        },
        { title: "Тип вагона", data: "Тип", editor: false },
        { title: "Примечание", data: "Примечание" },

        // В управлении компании
      ],
      getInsuredWagonsData: [{ title: "Номер вагона", data: "wagon_number" }],
      getOwnWagonsCompareData: [
        { title: "Номер вагона", data: "wagon_number" },
      ],
    };
  },
  created() {
  const savedColumnOrder = localStorage.getItem('userColumnOrder');
  const savedColumnSettings = localStorage.getItem('userColumnSettings');
  
  if (savedColumnOrder) {
    this.columns = JSON.parse(savedColumnOrder);
  }

  if (savedColumnSettings) {
    this.columns = JSON.parse(savedColumnSettings);
  }
},
  mounted() {
    
    document.querySelector(".hot-display-license-info").style =
      "display: none !important";
    const hotInstance = this.$refs.hotTableComponent.hotInstance;
    moment.locale("ru");

    hotInstance.addHook("afterChange", this.onCellValueChange);
  },
  computed: {
    ...mapState({
      clients: (state) => state.client.name_client,
    }),
  },

  methods: {
    onColumnMove(startColumn, endColumn) {
    const updatedColumns = [...this.columns];
    const movedColumn = updatedColumns.splice(startColumn, 1)[0];
    updatedColumns.splice(endColumn, 0, movedColumn);
    
    this.columns = updatedColumns;
    
    // Сохраняем новый порядок в LocalStorage
    localStorage.setItem('userColumnOrder', JSON.stringify(this.columns));
    
    console.log("Updated column order:", this.columns);
  },
  onColumnResize(newSize, columnIndex) {
    this.columns[columnIndex].width = newSize;
    
    // Сохраняем новые размеры в LocalStorage
    localStorage.setItem('userColumnSettings', JSON.stringify(this.columns));
    
    console.log("Updated column size:", this.columns);
  },
    cellConfig(row, col) {
      const cellProperties = {};
      return (cellProperties.className = "myCustomClass");
    },
    onCellValueChange(changes, source) {
      if (changes && source !== "loadData") {
        const hotInstance = this.$refs.hotTableComponent.hotInstance;
        changes.forEach(([row, prop, oldValue, newValue]) => {
          // Получаем индекс строки в исходном наборе данных
          const physicalRow = hotInstance.toPhysicalRow(row);
          const rowData = hotInstance.getSourceDataAtRow(physicalRow);

          // Обновляем значение в строке
          rowData[prop] = newValue;

          // Логика сохранения изменений
          this.saveEditCellsInRow(rowData);

          // Обновляем фильтр и перерисовываем таблицу после изменения
          this.applyCustomWagonFilter();
          this.updateHotTableData();
        });
      }
    },

    applyCustomWagonFilter() {
      const wagonNumbers = this.wagonFilter
        .split(" ")
        .filter((num) => num.trim() !== "");

      // Применяем фильтр по номерам вагонов
      const filteredData = this.getInsuredWagonsData.filter((item) => {
        return (
          wagonNumbers.length === 0 || wagonNumbers.includes(item.wagon_number)
        );
      });

      // Обновляем данные таблицы после фильтрации
      const hotInstance = this.$refs.hotTableComponent.hotInstance;
      hotInstance.loadData(filteredData); // Загружаем отфильтрованные данные
    },

    async saveEditCellsInRow(updatedRow) {
      console.log("saveEditCellsInRow", updatedRow);
      this.is_save_row = true;

      // Преобразуем даты
      updatedRow.build_date =
        updatedRow?.build_date?.split(".").reverse().join("-") ?? null;
      updatedRow.lifetime =
        updatedRow?.lifetime?.split(".").reverse().join("-") ?? null;
      updatedRow.cutting_date =
        updatedRow?.cutting_date?.split(".").reverse().join("-") ?? null;
      updatedRow.agr_date =
        updatedRow?.agr_date?.split(".").reverse().join("-") ?? null;
      updatedRow.agr_date_end =
        updatedRow?.agr_date_end?.split(".").reverse().join("-") ?? null;
      updatedRow.last_operation_date =
        updatedRow?.last_operation_date?.split(".").reverse().join("-") ?? null;
      updatedRow.state_change_date =
        updatedRow?.state_change_date?.split(".").reverse().join("-") ?? null;
      updatedRow.on_balance_1c =
        updatedRow?.on_balance_1c == "Да" ? true : false;

      // Добавляем каждый запрос в массив сохранений
      this.saveQueue = this.saveQueue || [];
      this.saveQueue.push(updatedRow);

      // Используем debounced сохранение
      this.debouncedSaveAllRows(); // Вызываем debounced метод
    },

    // Debounced функция для сохранения всех данных
    debouncedSaveAllRows: debounce(async function () {
      this.loader = true;

      try {
        let savePromises = this.saveQueue.map((row) =>
          api_directory.editInsuranceWagons(row.id, row)
        );

        await Promise.all(savePromises);

        this.$toast.success("Все данные сохранены", {
          timeout: 3000,
        });

        this.saveQueue = []; // Очищаем очередь после сохранения
        this.loader = false;
      } catch (err) {
        this.$toast.error(`Ошибка сохранения данных: ${err}`, {
          timeout: 3000,
        });
        this.loader = false;
        this.saveQueue = []; // Очищаем очередь в случае ошибки
      } finally {
        this.is_save_row = false;
        this.loader = false;
      }
    }, 1000),

    DownloadExcel() {
      const hotInstance = this.$refs.hotTableComponent.hotInstance;
      const exportPlugin = hotInstance.getPlugin("exportFile");

      // Экспортируем CSV с BOM и точкой с запятой как разделителем
      const csvData = exportPlugin.exportAsString("csv", {
        bom: true,
        columnHeaders: true,
        rowHeaders: true,
        mimeType: "text/csv",
        columnDelimiter: ";", // Используем точку с запятой в качестве разделителя
      });

      // Создаем blob с данными и сохраняем его
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "Застрахованные_вагоны.csv");
    },

    startStopLoader(value) {
      this.loader = value;
    },
    // Добавление новых столбцов  в таблицы
    addNewObjectInColumns(data) {
      this.$nextTick(() => {
        const newColumns = [...this.columns, ...data]
        const hotInstance = this.$refs.hotTableComponent.hotInstance;
        this.columns = newColumns;

        hotInstance.updateSettings({ columns: this.columns });
        hotInstance.render();
      });
    },
    isType(value) {
      if (value === "Полувагон") {
        return "ПВ";
      } else if (value === "Цистерна") {
        return "ЦС";
      }
    },
    async getOwnWagonsCompare(data) {
      let preData = data.data;
      let compareDataMap = {};
      // Создаем карту для getInsuredWagonsData, чтобы быстро проверить наличие вагонов
      this.getInsuredWagonsData.forEach((item) => {
        compareDataMap[item.wagon_number] = true;
      });
      // Фильтруем preData, оставляя только те вагоны, которых нет в compareDataMap
      preData = preData.filter((el) => {
        return (
          el["Принадлежность СТЖ"] === "С" &&
          !compareDataMap[el["Номер вагона"]]
        );
      });

      try {
        // this.loader = true
        this.mini_loader = true;
        let promises = preData.map((el) =>
          api.getWagons({ number: el["Номер вагона"] })
        );
        const results = await Promise.all(promises);
        this.mini_loader = false;
        let compareDataMap2 = [];
        for (let i in results) {
          if (results[i].data.data[0].is_active === true) {
            compareDataMap2.push({
              "Номер вагона": results[i].data.data[0].number,
              "В управлении компании": results[i].data.data[0].last_uk,
              Тип: this.isType(results[i].data.data[0].wagon_type),
              "Принадлежность СТЖ": "С",
              Примечание: results[i].data.data[0].insurance_comment,
            });
          }
        }
        this.$toast.success("Данные по незастрахованным вагонам получены", {
          timeout: 3000,
        });

        this.getOwnWagonsCompareData = compareDataMap2;
        this.$nextTick(() => {
          const hotInstance = this.$refs.hotTableComponent.hotInstance;
          hotInstance.loadData(this.getInsuredWagonsData);
          hotInstance.updateSettings({ data: this.getInsuredWagonsData });
          hotInstance.render();
        });
      } catch (err) {
        this.mini_loader = false;
      }
    },

    getInsuredWagons(data) {
      this.getInsuredWagonsData = [...data].sort((a, b) => {
        const agrDateEndA = moment(a.agr_date_end, "DD.MM.YYYY");
        const agrDateEndB = moment(b.agr_date_end, "DD.MM.YYYY");
        const today = moment();

        // Если договор просрочен, он должен идти выше
        if (agrDateEndA.isBefore(today) && !agrDateEndB.isBefore(today)) {
          return -1;
        }
        if (!agrDateEndA.isBefore(today) && agrDateEndB.isBefore(today)) {
          return 1;
        }
        // Если оба договора просрочены или оба действующие, оставляем их на месте
        return 0;
      });

      this.updateHotTableData();
    },

    updateHotTableData() {
      this.$nextTick(() => {
        const hotInstance = this.$refs.hotTableComponent.hotInstance;

        hotInstance.updateSettings({
          data: this.getInsuredWagonsData,
          afterRenderer: (TD, row, col, prop, value, cellProperties) => {
            const rowData = this.getInsuredWagonsData[row]; // Получаем данные строки
            const agrDateEnd = new Date(rowData.agr_date_end.split(".").reverse().join("-") ); // Преобразуем в дату
            const today = new Date();
            TD.style.fontSize = "12px"
            // Проверяем, если дата окончания договора меньше текущей даты
            if (agrDateEnd < today) {
              TD.style.backgroundColor = "#ffcccc"; // Красный цвет фона для просроченной строки
            } else {
              TD.style.backgroundColor = ""; // Убираем красный фон, если договор не просрочен
            }
          },

        });

        hotInstance.render(); // Рендерим таблицу
      });
    },
  },
};
</script>

<style scoped>
th {
  font-size: 10px !important;
}
.myCustomClass {
  background-color: #b40000; /* Пример: серый фон */
  font-weight: bold; /* Пример: жирный текст */
}
.ht_clone_top .htCore thead tr th {
  cursor: move;
  height: 40px; /* Увеличение высоты заголовков */
  display: flex;
  justify-content: center;
  align-items: center;
}
.htCore td {
  min-width: 100px !important;
}
.htCenter {
  min-width: 100px !important;
}
.searchBlock {
  border: 1px solid #e1e1e1;
  width: 300px;
}
.air_block {
  width: 90%;
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

.air_block_header {

  color: #cacaca;
}
</style>
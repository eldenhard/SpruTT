<template>
  <div>
    <b-modal
      id="modal-123456"
      :title="is_insurances_cases"
      centered
      size="xl"
      cancel-disabled
    >
      <div class="modal-table">
        <hot-table
          ref="modalHotTable"
          v-if="tableData.length > 0"
          :data="tableData"
          :columns="columns"
          :rowHeaders="false"
          :colHeaders="colHeaders"
          height="30vh"
          :manualColumnResize="true"
          :manualRowResize="true"
          :filters="true"
          :language="'ru-RU'"
          :dropdownMenu="dropdownMenuOptions"
          :licenseKey="'non-commercial-and-evaluation'"
        >
        </hot-table>
        <div
          v-else
          style="display: flex; align-items: center; justify-content: center"
        >
          <h4>Данных нет</h4>
        </div>
      </div>
      <template #modal-footer="{ cancel }">
        <b-form-checkbox
          id="checkbox-1"
          v-show="
            is_insurances_cases != 'Новый страховой случай' &&
            tableData.length > 0 &&
            is_insurances_cases != 'Архивные страховые случаи'
          "
          v-model="status"
          name="checkbox-1"
          unchecked-value="not_accepted"
        >
          Закрыть страховой случай
        </b-form-checkbox>
        <b-button
          size="md"
          variant="success"
          v-if="
            tableData.length > 0 &&
            is_insurances_cases != 'Архивные страховые случаи'
          "
          @click="saveAccidientByWagon(is_insurances_cases)"
          >Сохранить</b-button
        >
        <b-button size="md" variant="danger" v-else @click="cancel()"
          >Закрыть</b-button
        >
      </template>
    </b-modal>

    <div
      style="
        display: flex;
        justify-content: space-between;
        gap: 5vw;
        height: 4vh;
      "
    >
      <section class="search_bloc" style="width: 100%">
        <div class="long_search">
          <input
            type="text"
            placeholder="Введите номера вагонов..."
            v-model="search"
            @input="IputProcessing(search)"
          />
          <button class="Request" @click="getRequestFromServerData(search)">
            <span v-if="isSearch">Найти</span>
            <b-icon
              v-if="!isSearch"
              icon="three-dots"
              animation="cylon"
              font-scale="3"
            ></b-icon>
          </button>
        </div>
      </section>
    </div>
    <br /><br />

    <hot-table
      ref="hotTable"
      :data="responseData"
      :columns="columns"
      :colHeaders="colHeaders"
      :contextMenu="customContextMenu"
      :manualColumnResize="true"
      :manualRowResize="true"
      :height="'50vh'"
      :language="'ru-RU'"
      :filters="true"
      :dropdownMenu="dropdownMenuOptions"
      :className="'custom-table'"
      :licenseKey="'non-commercial-and-evaluation'"
    >
    </hot-table>

    <br /><br />
    <hr />
    <div class="air_block_header">
      <h4>Ранее введенные данные</h4>
      <!-- <div style="display: flex; justify-content: flex-end; gap: 25px">
                <b-button variant="info" @click="getData()">Загрузить данные</b-button>
                <b-button variant="info" v-show="earlyData.length > 0" @click="downloadToExcel()">Выгрузить в
                    EXCEL</b-button>
                    <b-button variant="success" v-show="earlyData.length > 0" @click="saveData()">Сохранить изменения</b-button>
            </div> -->
      <div>
        <b-button-toolbar>
          <b-button-group>
            <b-button
              size="sm"
              class="mb-2 border rounded p-2 d-flex"
              @click="getData()"
              style="min-width: 150px !important"
            >
              <b-icon
                icon="cloud-download"
                aria-hidden="true"
                focusable="false"
              ></b-icon
              >Загрузить данные
            </b-button>
            <b-button
              size="sm"
              class="mb-2 border rounded p-2"
              v-show="earlyData.length > 0"
              @click="downloadToExcel()"
            >
              <b-icon icon="cloud-upload" aria-hidden="true"></b-icon> Выгрузить
              в Excel
            </b-button>
            <b-button
              size="sm"
              class="mb-2 border rounded p-2"
              style="background: #264722"
              @click="saveData()"
            >
              <b-icon
                icon="check-all"
                aria-hidden="true"
                focusable="false"
                v-show="earlyData.length > 0"
              ></b-icon
              >Сохранить изменения
            </b-button>
          </b-button-group>
        </b-button-toolbar>
        <div>
          <label for="range-2">Увеличение размера таблицы</label>
          <b-form-input
            id="range-2"
            v-model="rangeTable"
            type="range"
            min="1"
            max="10"
            step="0.1"
          ></b-form-input>
          <div class="mt-2">Увеличение: x{{ rangeTable }}</div>
        </div>
      </div>
    </div>

    <br />
    <hot-table
      ref="hotTable2"
      :data="earlyData"
      :columns="columns"
      :colHeaders="colHeaders"
      :rowHeaders="true"
      :contextMenu="customContextMenu"
      :manualColumnResize="true"
      :height="sizeTable"
      :language="'ru-RU'"
      :filters="true"
      :dropdownMenu="dropdownMenuOptions"
      :nestedRows="true"
      :licenseKey="'non-commercial-and-evaluation'"
    >
    </hot-table>
  </div>
</template>

<script>
import api from "@/api/directory";
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import { Theme } from "@amcharts/amcharts5";
import Handsontable from "handsontable";
registerAllModules();

export default {
  components: {
    HotTable,
  },
  data() {
    return {
      isSearch: true,
      rangeTable: 1,
      originalData: [], // исходные данные
      modifiedRows: [], // измененные строки
      search: "",
      is_insurances_cases: "",
      intervalResponse: null,
      responseData: [],
      responseOldData: [],
      status: false,
      earlyData: [
        {
          data: "status",
          editor: "select",
          selectOptions: ["Новый", "Старый", "Архивный"],
        },
      ],
      tableData: [],
      dropdownMenuOptions: [
        "filter_by_condition",
        "filter_action_bar",
        "filter_by_value",
        "clear_column",
      ],

      columns: [
        { data: "category", type: "text", readOnly: true },
        {
          data: "status",
          editor: "select",
          selectOptions: ["Новый", "Архивный"],
        },
        { data: "wagon_number", type: "text", readOnly: false },
        { data: "wagon_type", readOnly: true },
        { data: "owner", type: "text" },
        { data: "insurance_company", type: "text" },
        { data: "agr_number", type: "text" },
        { data: "franchise_sum", type: "numeric" },
        {
          data: "conditional",
          type: "dropdown",
          editor: "select",
          selectOptions: ["Условная", "Безусловная"],
          renderer: function (
            instance,
            td,
            row,
            col,
            prop,
            value,
            cellProperties
          ) {
            let displayValue =
              value === true || value === "Условная"
                ? "Условная"
                : "Безусловная";
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.innerText = displayValue;
          },
          onChange: function (value, row, prop) {
            // Преобразуем строковое значение в boolean при изменении
            if (prop === "conditional") {
              this.tableData[row][prop] = value === "Условная" ? true : false;
            }
          },
        },

        { data: "insure_case_date", type: "date", dateFormat: "YYYY-MM-DD" },
        { data: "vu23_date", type: "date", dateFormat: "YYYY-MM-DD" },
        { data: "vu36_date", type: "date", dateFormat: "YYYY-MM-DD" },
        { data: "fault_code", type: "text" },
        { data: "repair_exclusion_loss", type: "text" },

        { data: "damage_causer", type: "text" },
        { data: "client", type: "text" },
        {
          data: "sk_notification_date",
          type: "date",
          dateFormat: "YYYY-MM-DD",
          readOnly: false,
        },
        { data: "out_application_number", type: "text", readOnly: false },
        {
          data: "application_date",
          type: "date",
          dateFormat: "YYYY-MM-DD",
          readOnly: false,
        },

        {
          data: "last_request_response_date",
          type: "date",
          dateFormat: "YYYY-MM-DD",
          readOnly: false,
        },
        {
          data: "refund_date",
          type: "date",
          dateFormat: "YYYY-MM-DD",
          readOnly: false,
        },
        { data: "estimated_insurance_indemnity", type: "text" },
        { data: "franchise", type: "text" },
        { data: "deduction_of_balances", type: "numeric" },

        { data: "fact_insurance_indemnity", type: "numeric" },
        { data: "refused", type: "numeric" },
        { data: "repair_downtime_pending_amount", type: "numeric" },
        { data: "railway_fare_to_from_repair", type: "numeric" },
        { data: "additional_compensation_due", type: "numeric" },

        { data: "total_loss_tt", type: "numeric" },
        { data: "reimbursed", type: "numeric" },
        { data: "reimbursed_ost", type: "numeric" },
        { data: "comment", type: "text" },
      ],
      colHeaders: [
        "Группа по вагону",
        "Статус",
        "Номер вагона",
        "Тип вагона",
        "Собственник",
        "Страховая компания",
        "№ Договора",
        "Сумма франшизы",
        "Условная/Безусловная",

        "Дата страхового случая",
        "Дата ВУ-23",
        "Дата ВУ-36/ИСКЛ",
        "Код неисправности",
        "Ремонт/исключение/утеря",

        "Виновник повреждения",
        "Клиент",
        "Дата уведомления в СК",
        "Исх. Номер заявления",
        "Дата заявления",

        "Дата направления ответа по последнему запросу",
        "Дата возмещения",
        "Предполагаемое/ Причитающееся страховое возмещение",
        "Франшиза",
        "Вычет остатков",

        "Факт возмещения от страховой, руб.",
        "Отказано",
        "Сумма за простой в ремонте",
        "Ж/д тариф в/из ремонта",
        "Причитающееся довозмещение",

        "ИТОГО потери ТТ",
        "Возмещено ВСЕГО",
        "Осталось возместить",
        "Примечание",
      ],
      ver_imp_data: "",
      customContextMenu: {
        items: {
          new_case: {
            name: "Новый страховой случай",
            callback: () => this.handleContextMenuClick("new"),
          },
          old_cases: {
            name: "Старые страховые случаи",
            callback: () => this.handleContextMenuClick("old"),
          },
          archived_cases: {
            name: "Архивные страховые случаи",
            callback: () => this.handleContextMenuClick("archived"),
          },
          // 'sep1': '---------',
          // 'remove_row': {
          //     name: 'Удалить строку',
          //     callback: (key, selection) => {
          //         this.$refs.hotTable.hotInstance.alter('remove_row', selection[0].start.row);
          //     }
          // }
        },
      },
    };
  },
  mounted() {
    const hotInstance = this.$refs.hotTable2.hotInstance;
    // Подписываемся на событие изменения данных
    hotInstance.addHook("afterChange", this.handleAfterChange);
  },
  computed: {
    sizeTable() {
      return this.rangeTable * 10 + 40 + "vh";
    },
  },
  methods: {
    downloadToExcel() {
      const hotInstance = this.$refs.hotTable2.hotInstance;
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
      saveAs(blob, "Страховые случаи.csv");
    },
    handleContextMenuClick(type) {
      const selected = this.$refs.hotTable.hotInstance.getSelectedLast();
      console.log(selected);
      if (selected) {
        const rowIndex = selected[0];
        const rowData = this.responseData[rowIndex];
        this.is_insurances_cases =
          type == "new"
            ? "Новый страховой случай"
            : type == "old"
            ? "Старые страховые случаи"
            : "Архивные страховые случаи";

        this.openModalPage(rowData, type);
        console.log(`Selected row data for ${type}:`, rowData);
      }
    },
    // Функция для создания объекта, где все значения будут null
    nullifyObjectValues(obj) {
      return Object.keys(obj).reduce((acc, key) => {
        if (acc["wagon_number"]) {
          acc[key] = key;
        }
        return acc;
      }, {});
    },
    async getData() {
      this.$emit("startStopLoader", true);
      try {
        let response = await api.getDataInsuranceCases();

        this.earlyData = response.data.data.reduce((acc, item) => {
          let existingCategory = acc.find(
            (el) => el.category === item.wagon_number
          );

          // Создаем копию item, где все значения будут null
          let nullifiedItem = this.nullifyObjectValues(item);

          if (!existingCategory) {
            // Если категории нет, добавляем объект с wagon_number и null-значениями
            acc.push({
              category: item.wagon_number,
              ...nullifiedItem, // Применяем объект с null значениями
              __children: [{ ...item }],
            });
          } else {
            // Если категория уже существует, добавляем элемент в __children
            existingCategory.__children.push({ ...item });
          }

          return acc;
        }, []);
        this.originalData = this.earlyData;
        this.$nextTick(() => {
          const hotInstance = this.$refs.hotTable2.hotInstance;
          hotInstance.loadData(this.earlyData);
          document.querySelector(".ht_nestingButton.ht_nestingCollapse").style =
            "color: red !important; border: yellow !important; font-size: 20px !important;";
          hotInstance.updateSettings({ data: this.earlyData });
          hotInstance.render();
        });
        this.$emit("startStopLoader", false);

        if (this.earlyData.length > 0) {
          this.$toast.success("Данные загружены", { timeout: 3000 });
        } else {
          this.$toast.warning("Нет ранее введенных данных", { timeout: 4000 });
        }
      } catch (err) {
        this.$emit("startStopLoader", false);

        this.$toast.error(`Данные не загружены\n ${err}`, { timeout: 3000 });
      } finally {
        this.$emit("startStopLoader", false);
      }
    },
    // Метод для отслеживания изменений
    handleAfterChange(changes, source) {
        console.log('источник', source)
      if (source === "edit" || source === "CopyPaste.paste" || source === "Autofill.fill") {
        const hotInstance = this.$refs.hotTable2.hotInstance;
        changes.forEach(([row, prop, oldValue, newValue]) => {
          if (oldValue !== newValue) {
            const rowData = hotInstance.getSourceDataAtRow(row);
            this.modifiedRows.push(rowData); // Добавляем измененные строки в массив
          }
        });
      }
    },
    async saveData() {
      try {
        this.$emit("startStopLoader", true);
        this.modifiedRows?.forEach((updatedRow) => {
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
            updatedRow?.last_operation_date?.split(".").reverse().join("-") ??
            null;
          updatedRow.state_change_date =
            updatedRow?.state_change_date?.split(".").reverse().join("-") ??
            null;
          updatedRow.on_balance_1c =
            updatedRow?.on_balance_1c == "Да" ? true : false;
        });
        console.log("Измененные строки:", this.modifiedRows);
        let promises = this.modifiedRows.map((item) => api.editInsuranceEvent(item.id, item));
        await Promise.all(promises);
        this.modifiedRows = [];
        this.getData();
        this.$emit("startStopLoader", false);

        this.$toast.success("Данные сохранены", { timeout: 3000 });
      } catch (err) {
        console.log(err);
        this.$emit("startStopLoader", false);
      }
   
      // Здесь вы можете отправить измененные строки на сервер или обработать их другим образом
    },

    async saveAccidientByWagon() {
      try {
        this.$emit("startStopLoader", true);
        let wagonNumber = this.tableData[0].wagon_number;
        // Преобразование перед сохранением: "Условная" -> true, "Безусловная" -> false
        let dataToSave = this.tableData.map((item) => ({
          ...item,
          conditional: item.conditional === "Условная" ? true : false,
        }));
        // Получаем все данные по вагону
        let response = await api.getDataInsuranceCases({
          wagon_number: wagonNumber,
        });
        if (this.is_insurances_cases === "Новый страховой случай") {
          // Сначала сохраняем новый страховой случай
          await api.saveDataInsuranceCases(dataToSave);

          // Затем обновляем статус всех "Новых" записей на "Старые"
          let newCases = response.data?.data.filter(
            (item) => item.status === "Новый"
          );
          newCases.forEach((item) => {
            item.status = "Старый";
          });

          // Сохраняем обновленные записи
          let promises = newCases.map((item) =>
            api.saveManyDataInsuranceCases(item.id, item)
          );
          await Promise.all(promises);
        } else if (this.is_insurances_cases === "Старые страховые случаи") {
          // В старых страховых случаях просто сохраняем изменения, не трогая статус
          let promises = dataToSave.map((item) =>
            api.saveManyDataInsuranceCases(item.id, item)
          );
          await Promise.all(promises);

          // Если статус установлен как архивный, обновляем все записи на "Архивный"
          if (this.status) {
            response.data?.data.forEach((item) => {
              item.status = "Архивный";
              item.is_closed = true;
            });

            // Сохраняем обновленные данные
            let promises2 = response.data?.data.map((item) =>
              api.saveManyDataInsuranceCases(item.id, item)
            );
            await Promise.all(promises2);
          }
        }
        this.getData();
        this.$emit("startStopLoader", false);
        this.$bvModal.hide("modal-123456");
        this.$toast.success("Данные сохранены", { timeout: 3000 });
      } catch (err) {
        console.log(err);
        this.$emit("startStopLoader", false);
        this.$toast.error(`Данные не сохранены\n ${err}`, { timeout: 3000 });
      }
    },

    async openModalPage(item, type) {
      let response;
      let wagonNumber = item.wagon_number;

      if (type === "new") {
        // Открытие нового случая
        this.tableData = [{ ...item }];
        response = await api.getDataInsuranceCases({
          wagon_number: wagonNumber,
        });

        // Изменение статуса всех "Новых" на "Старый"
        let filter_response = response.data.data.filter(
          (item) => item.status === "Новый"
        );
        if (filter_response.length > 0) {
          filter_response.forEach((item) => {
            item.status = "Старый";
          });
          this.ver_imp_data = filter_response;
        }
        this.$bvModal.show("modal-123456");
        this.$nextTick(() => this.initializeHotTable());
      } else if (type === "old") {
        // Открытие старых случаев
        response = await api.getDataInsuranceCases({
          wagon_number: wagonNumber,
          status: "Старый",
        });
        this.tableData = response.data.data;
        this.$bvModal.show("modal-123456");
        this.$nextTick(() => this.initializeHotTable());
      } else if (type === "archived") {
        // Открытие архивных случаев
        response = await api.getDataInsuranceCases({
          wagon_number: wagonNumber,
          status: "Архивный",
        });
        this.tableData = response.data.data;
        this.$bvModal.show("modal-123456");
        this.$nextTick(() => this.initializeHotTable());
      }
    },

    initializeHotTable() {
      const hotInstance = this.$refs.modalHotTable?.hotInstance;
      if (hotInstance) {
        hotInstance.loadData(this.tableData);
        hotInstance.updateSettings({ data: this.tableData });
        hotInstance.render();
      } else {
        console.error("hotInstance не определен");
      }
    },

    IputProcessing(val) {
      clearInterval(this.intervalResponse);
      this.intervalResponse = setTimeout(() => {
        this.getRequestFromServerData(val);
      }, 500);
    },

    async getRequestFromServerData(search) {
      this.isSearch = false;
      let obj = {
        wagons: search.replace(/[^.\d]+/g, "").replace(/(\d{8})(?=\d)/g, "$1,"),
      };
      let today = new Date().toISOString().slice(0, 10);
      let allData = [];
      try {
        // let response = await api.getAllInsuranceWagons(obj)
        let last_page = 1;
        let response = await api.getAllInsuranceWagons(obj, last_page);
        allData.push(...response.data.data);
        while (last_page < response.data.total_pages) {
          last_page += 1;
          let res = await api.getAllInsuranceWagons(obj, last_page);
          allData.push(...res.data.data);
        }
        this.responseData = allData;
        this.$nextTick(() => {
          const hotInstance = this.$refs.hotTable.hotInstance;
          hotInstance.loadData(this.responseData);
          hotInstance.updateSettings({
            data: this.responseData,
            afterRenderer: (TD, row, col, prop, value, cellProperties) => {
              // Если элемент readOnly
              if (this.columns[col].readOnly === false) {
                TD.style.backgroundColor = "#fbfddd";
              }
            },
          });
          hotInstance.render();
          console.log("checkdata", this.$refs.hotTable.$el);
        });
        this.isSearch = true;
      } catch (err) {
        console.log(err);
        this.isSearch = true;
      }
    },
  },
};
</script>

<style scoped>
.air_block_header {
  padding: 1% 0 0 2%;
  color: #cacaca;
  display: flex;
  justify-content: space-between;
}

.long_search {
  position: relative;
  width: 90%;
  margin: 0 auto;
}

.long_search {
  position: relative;
  width: 100%;
  height: 110%;
}

.long_search input {
  width: 100%;
  height: 100%;
  border: 1px solid #007bff !important;
  border-radius: 10px;
  text-align: left !important;
  padding-left: 2% !important;
}

.long_search button {
  width: 15%;
  height: 80%;
  position: absolute;
  top: 4px;
  right: 5px;
  border-radius: 8px;
}

.modal-table {
  width: 100%;
  height: auto;
  min-height: 15vh;
}

tr:hover {
  background: lightgray;
}

.air_block {
  width: 100%;
  margin: 0 auto;
}

td.custom-cell {
  color: #fff;
  background-color: #37bc6c;
}

.custom-table thead th:nth-child(even),
.custom-table tbody tr:nth-child(odd) th {
  background-color: #d7f1e1;
}
</style>
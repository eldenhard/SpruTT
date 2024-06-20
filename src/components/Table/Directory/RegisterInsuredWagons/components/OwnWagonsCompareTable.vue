<!-- <template>
    <div>

        <br>
        <h4 v-show="getOwnWagonsCompareData.length > 0" class="air_block_header">Перечень незастрахованных вагонов </h4>
        <hot-table ref="hotTableComponent2" :data="getOwnWagonsCompareData" :rowHeaders="true" :columns="columns"
            :preventOverflow="'horizontal'" :filters="true" :language="'ru-RU'" :manualColumnResize="true"
            :autoWrapRow="true" :autoWrapCol="true" :height="'40vh'" :width="'30%'" :fillHandle="false"
            :dropdownMenu="true" v-show="getOwnWagonsCompareData.length > 0">
        </hot-table>
    </div>
</template>

<script>
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, getLanguagesDictionaries, ruRU } from 'handsontable/i18n';
registerLanguageDictionary(ruRU);
registerAllModules();
import 'handsontable/dist/handsontable.full.css';

export default {
    props: ['getOwnWagonsCompareData', 'columns'],
    components: {
        HotTable,
    },
    created() {
        document.querySelector('.hot-display-license-info').style = 'display: none !important';
    },
    watch: {
        getOwnWagonsCompareData: {
            handler(newData) {
                this.updateTableData(newData);
                document.querySelector('.hot-display-license-info').style = 'display: none !important';
            },
            deep: true,
        },
    },
    mounted() {
        this.updateTableData(this.getOwnWagonsCompareData);
        document.querySelector('.hot-display-license-info').style = 'display: none !important';

    },
    methods: {
        updateTableData(newData) {
            this.$nextTick(() => {
                document.querySelector('.hot-display-license-info').style = 'display: none !important';
                const hotInstance = this.$refs.hotTableComponent2.hotInstance;
                hotInstance.loadData(newData)
                hotInstance.updateSettings({ data: newData })
                hotInstance.render()
                  document.querySelector('.hot-display-license-info').style = 'display: none !important';
            })
        },
    },
}
</script>

<style scoped>
.hot-display-license-info{
    display: none !important;
}
.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}
</style> -->

<template>
    <div>
      <br>
      <h4 v-show="getOwnWagonsCompareData.length > 0" class="air_block_header">Перечень незастрахованных вагонов</h4>
      <div class="tables-container">
        <div class="table-container">
          <hot-table
            ref="hotTableComponent1"
            :data="getOwnWagonsCompareData"
            :rowHeaders="true"
            :columns="columns"
            :manualRowMove="true"
            :manualColumnMove="true"
            :preventOverflow="'horizontal'"
            :filters="true"
            :language="'ru-RU'"
            :manualColumnResize="true"
            :height="'40vh'"
            :width="'100%'"
            :fillHandle="false"
            :dropdownMenu="true"
            @afterSelection="handleSelection"
          >
          </hot-table>
        </div>
        <div class="table-container">
          <hot-table
            ref="hotTableComponent2"
            :data="insuredWagonsData"
            :rowHeaders="true"
            :columns="columns_table_copy"
            :manualRowMove="true"
            :manualColumnMove="true"
            :preventOverflow="'horizontal'"
            :filters="true"
            :language="'ru-RU'"
            :manualColumnResize="true"
            :height="'40vh'"
            :width="'100%'"
            :fillHandle="false"
            :dropdownMenu="true"
            @afterPaste="handlePaste"
          >
          </hot-table>
        </div>
      </div>
    </div>
  </template>
  <script>
  
  
  import { HotTable } from '@handsontable/vue';
  import { registerAllModules } from 'handsontable/registry';
  import { registerLanguageDictionary, getLanguagesDictionaries, ruRU } from 'handsontable/i18n';
  
  registerLanguageDictionary(ruRU);
  registerAllModules();
  import 'handsontable/dist/handsontable.full.css';
  
  export default {
    components: {
      HotTable,
    },
    props: ['getOwnWagonsCompareData', 'columns', 'columns_table_copy'],
    data() {
      return {
        insuredWagonsData: [
            { title: 'Номер вагона', data: 'wagon_number' },
        ],
        selectedWagons: [],
      };
    },
    watch: {
      getOwnWagonsCompareData: {
        handler(newData) {
          this.updateTableData('hotTableComponent1', newData);
          document.querySelector('.hot-display-license-info').style = 'display: none !important';
        },
        deep: true,
      },
      insuredWagonsData: {
        handler(newData) {
          this.updateTableData('hotTableComponent2', newData);
          document.querySelector('.hot-display-license-info').style = 'display: none !important';
        },
        deep: true,
      },
    },
    mounted() {
      this.updateTableData('hotTableComponent1', this.getOwnWagonsCompareData);
      this.updateTableData('hotTableComponent2', this.insuredWagonsData);
      document.querySelector('.hot-display-license-info').style = 'display: none !important';
    },
    methods: {
      updateTableData(componentRef, newData) {
        this.$nextTick(() => {
          document.querySelector('.hot-display-license-info').style = 'display: none !important';
          const hotInstance = this.$refs[componentRef]?.hotInstance;
          if (hotInstance) {
            hotInstance.loadData(newData);
            hotInstance.updateSettings({ data: newData });
            hotInstance.render();
            document.querySelector('.hot-display-license-info').style = 'display: none !important';
          }
        });
      },
      handleSelection(row, column, row2, column2) {
        const hotInstance = this.$refs.hotTableComponent1.hotInstance;
        const selected = [];
        for (let r = row; r <= row2; r++) {
          for (let c = column; c <= column2; c++) {
            selected.push(hotInstance.getDataAtCell(r, c));
          }
        }
        this.selectedWagons = selected;
      },
      handlePaste(changes) {
        const hotInstance2 = this.$refs.hotTableComponent2.hotInstance;
        changes.forEach(change => {
          const [row, col, oldVal, newVal] = change;
          if (this.columns_table_copy[col].data === 'wagon_number') {
            hotInstance2.setDataAtCell(row, col, newVal);
          }
        });
      },
    },
  };
</script>  

<style scoped>
.hot-display-license-info {
    display: none !important;
}

.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}

.tables-container {
    display: flex;

    gap: 10px;
}

.table-container:nth-child(2) {
    width: 100%;
    /* background: green; */
}
.table-container:first-child{
    width: 35%;
    /* background: lightgrey */
}
</style>
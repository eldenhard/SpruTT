<template>
    <div>
        <br>
        <h4 v-show="getOwnWagonsCompareData.length > 0" class="air_block_header">Перечень незастрахованных вагонов</h4>
        <div class="tables-container">
            <div class="table-container">
                <hot-table ref="hotTableComponent1" :data="getOwnWagonsCompareData" :rowHeaders="true"
                    :columns="columns" :manualRowMove="true" :manualColumnMove="true" :preventOverflow="'horizontal'"
                    :filters="true" :language="'ru-RU'" :manualColumnResize="true" :height="'40vh'" :width="'100%'"
                    :fillHandle="false" :dropdownMenu="true" @afterSelection="handleSelection">
                </hot-table>
            </div>
            <div class="table-container">
                <hot-table ref="hotTableComponent2" :data="insuredWagonsData" :rowHeaders="true"
                    :columns="columns_table_copy" :manualRowMove="true" :manualColumnMove="true"
                    :preventOverflow="'horizontal'" :filters="true" :language="'ru-RU'" :manualColumnResize="true"
                    :height="'40vh'" :width="'100%'" :fillHandle="true" :dropdownMenu="true" @afterPaste="handlePaste"
                    :contextMenu="contextMenuOptions">
                </hot-table>
            </div>
        </div>
        <button class="Accept button" disabled style="width: 30%; margin-left: auto;" @click="saveData()">Сохранить данные</button>
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
            contextMenuOptions: {
                items: {
                    'remove_row': {
                        name: 'Удалить строку'
                    }
                }
            },
            selectedWagons: [],
        };
    },
    watch: {
        getOwnWagonsCompareData: {
            handler(newData) {
                this.updateTableData('hotTableComponent1', newData);
               document.querySelectorAll('.hot-display-license-info').forEach(element => {
    element.style.display = 'none';
});

            },
            deep: true,
        },
        insuredWagonsData: {
            handler(newData) {
                this.updateTableData('hotTableComponent2', newData);
               document.querySelectorAll('.hot-display-license-info').forEach(element => {
    element.style.display = 'none';
});

            },
            deep: true,
        },
    },
    created() {
       document.querySelectorAll('.hot-display-license-info').forEach(element => {
    element.style.display = 'none';
});


    },
    mounted() {
        this.updateTableData('hotTableComponent1', this.getOwnWagonsCompareData);
        this.updateTableData('hotTableComponent2', this.insuredWagonsData);
       document.querySelectorAll('.hot-display-license-info').forEach(element => {
    element.style.display = 'none';
});

    },
   
    methods: {
        saveData(){
            console.log(this.insuredWagonsData)
        },
        updateTableData(componentRef, newData) {
            this.$nextTick(() => {
               document.querySelectorAll('.hot-display-license-info').forEach(element => {
    element.style.display = 'none';
});

                const hotInstance = this.$refs[componentRef]?.hotInstance;
                if (hotInstance) {
                    hotInstance.loadData(newData);
                    hotInstance.updateSettings({ data: newData });
                    hotInstance.render();
                   document.querySelectorAll('.hot-display-license-info').forEach(element => {
    element.style.display = 'none';
});

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

.table-container:first-child {
    width: 35%;
    /* background: lightgrey */
}
</style>
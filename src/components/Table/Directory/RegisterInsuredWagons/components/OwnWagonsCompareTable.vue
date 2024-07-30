<template>
    <div>
        <br>
        <h4 v-show="getOwnWagonsCompareData.length > 0" class="air_block_header">Перечень незастрахованных вагонов</h4>
        <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted"
            unchecked-value="not_accepted">
            Включить вагоны с примечаниями
        </b-form-checkbox>
        <div class="tables-container">

            <div class="table-container">
                <span class="description-text">Всего записей {{ getOwnWagonsCompareData.length ?? 0 }}</span>
                <hot-table ref="hotTableComponent1" :data="getOwnWagonsCompareData" :rowHeaders="true"
                    :columns="columns" :manualRowMove="true" :manualColumnMove="true" :preventOverflow="'horizontal'"
                    :filters="true" :language="'ru-RU'" :manualColumnResize="true" :height="'40vh'" :width="'100%'"
                    :fillHandle="false" :dropdownMenu="dropdownMenuOptions" @afterSelection="handleSelection">
                </hot-table>
            </div>
            <div class="table-container">
                <span class="description-text">Скопируйте и вставьте данные в эту таблицу</span>
                <hot-table ref="hotTableComponent2" :data="insuredWagonsData" :rowHeaders="true"
                    :columns="columns_table_copy" :manualRowMove="true" :manualColumnMove="true"
                    :preventOverflow="'horizontal'" :filters="true" :language="'ru-RU'" :manualColumnResize="true"
                    :height="'40vh'" :width="'100%'" :fillHandle="true" :dropdownMenu="dropdownMenuOptions"
                    @afterPaste="handlePaste" :contextMenu="contextMenuOptions">
                </hot-table>
            </div>
        </div>
        <br>
        <button class="Accept button" style="width: 30%; margin-left: auto;" @click="saveData()">Сохранить
            данные</button>
    </div>
</template>
<script>


import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, getLanguagesDictionaries, ruRU } from 'handsontable/i18n';
import api from "@/api/directory";
import api_wagon from "@/api/wagonPark";
registerLanguageDictionary(ruRU);
registerAllModules();
import 'handsontable/dist/handsontable.full.css';

export default {
    components: {
        HotTable,
    },
    props: ['getOwnWagonsCompareData', 'columns', 'columns_table_copy', 'dropdownMenuOptions'],
    data() {
        return {
            sortWagons: [],
            insuredWagonsData: [
                { title: 'Номер вагона', data: 'wagon_number' },
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
            status: false,
        };
    },
    watch: {
        getOwnWagonsCompareData: {
            async handler(newData) {
                this.updateTableData('hotTableComponent1', newData);
                document.querySelectorAll('.hot-display-license-info').forEach(element => {
                    element.style.display = 'none';
                });
                let promises = this.getOwnWagonsCompareData.map(item => api_wagon.getWagon(item['Номер вагона']));
                let result = await Promise.all(promises);
                this.sortWagons = result.filter(el => el.note1 != '');
                console.log('AAAAAAAAAAA', this.getOwnWagonsCompareData, this.sortWagons)

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
        async saveData() {
            this.$emit('startStopLoader', true)
            try {
                await api.sendNewDataInsuranceWagons(this.insuredWagonsData)

                this.$emit('startStopLoader', false)
                this.$toast.success('Данные сохранены', {
                    timeout: 3000
                })
            } catch (err) {
                console.log(err)
                this.$emit('startStopLoader', false)
                this.$toast.error('Данные не сохранены', {
                    timeout: 3000
                })
            }
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
<template>
    <div>
        <Loader :loader="loader" />
        <div class="air_block">
            <div class="air_block_header">
                <h4>Реестр застрахованных вагонов</h4>
            </div>
            <hr>
            <br>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Застрахованные вагоны" active>
                        <b-card-text>
                            <div>
                                <div style="display: flex; justify-content: space-between;; gap: 5vw; height: 4vh; ">
                                    <template v-if="getInsuredWagonsData.length > 1">
                                        <PregisterIsuredwagonsSearch @getInsuredWagons="getInsuredWagons"
                                            @getOwnWagonsCompare="getOwnWagonsCompare" style="width: 80%" />
                                    </template>
                                    <template v-else>
                                        <PregisterIsuredwagonsSearch @getInsuredWagons="getInsuredWagons"
                                            @getOwnWagonsCompare="getOwnWagonsCompare" style="width: 100%" />
                                    </template>
                                    <PregisterInsuredWagonsAddColumnVue @add_column_el="addNewObjectInColumns"
                                        v-show="getInsuredWagonsData.length > 1" style="width: 100%" />
                                </div>
                                <br>
                                <h4 class="air_block_header" v-show="getInsuredWagonsData.length > 0">Застрахованные
                                    вагоны</h4>
                                <hot-table ref="hotTableComponent" :data="getInsuredWagonsData" :rowHeaders="true"
                                    :columns="columns" :preventOverflow="'horizontal'" :filters="true"
                                    :language="'ru-RU'" :manualColumnResize="true" :autoWrapRow="true"
                                    :autoWrapCol="true" :height="'40vh'" :width="'100%'" :fillHandle="false"
                                    :dropdownMenu="dropdownMenuOptions" :readOnly="true"
                                    @afterSelection="handleCellClick">
                                </hot-table>
                                <br>

                                <OwnWagonsCompareTable :getOwnWagonsCompareData="getOwnWagonsCompareData"
                                    :columns="columns_own_wagons" :columns_table_copy="columns"
                                    @startStopLoader="startStopLoader" :dropdownMenuOptions="dropdownMenuOptions" />

                            </div>
                        </b-card-text>
                    </b-tab>
                    <b-tab title="Страховые случаи">
                        <b-card-text>
                            <saveAccidientVue />
                        </b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import PregisterIsuredwagonsSearch from "./components/PregisterIsuredwagonsSearch.vue";
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, getLanguagesDictionaries, ruRU } from 'handsontable/i18n';
registerLanguageDictionary(ruRU);
registerAllModules();
import 'handsontable/dist/handsontable.full.css';
import PregisterInsuredWagonsAddColumnVue from './components/PregisterInsuredWagonsAddColumn.vue';
import OwnWagonsCompareTable from "./components/OwnWagonsCompareTable.vue";
import saveAccidientVue from './components/saveAccidient.vue';
export default {
    components: {
        Loader,
        PregisterIsuredwagonsSearch,
        PregisterInsuredWagonsAddColumnVue,
        HotTable,
        OwnWagonsCompareTable,
        saveAccidientVue,
    },
    data() {
        return {
            loader: false,

            columns: [
                { title: 'Номер вагона', data: 'wagon_number' },
                { title: 'Тип вагона', data: 'wagon_type', editor: 'select', selectOptions: ['ПВ', 'ЦС'] },
                { title: 'Собст. на момент страхования', data: 'owner_at_insurance_moment' },
                { title: 'Страховая компания', data: 'insurance_company', },
                { title: '№ договора', data: 'agr_number', },
                { title: 'Дата договора', data: 'agr_date', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
            ],
            dropdownMenuOptions: ['clear_column', 'filter_by_condition', 'filter_by_value'],


            columns_own_wagons: [
                { title: 'Номер вагона', data: 'Номер вагона' },
            ],
            getInsuredWagonsData: [{ title: 'Номер вагона', data: 'wagon_number' },],
            getOwnWagonsCompareData: [{ title: 'Номер вагона', data: 'wagon_number' },],
        }
    },
    mounted() {
        document.querySelector('.hot-display-license-info').style = 'display: none !important';
    },
    methods: {
        handleCellClick(row, column, row2, column2, preventScrolling, selectionLayerLevel) {
            // Получаем данные строки
            const rowData = this.getInsuredWagonsData[row];
            // Форматируем данные для отображения в алерте
            const rowDataString = Object.entries(rowData).map(([key, value]) => `${key}: ${value}`).join('\n');
            // Вызываем алерт с данными строки
            alert(`Данные строки:\n${rowDataString}`);
        },
        startStopLoader(value) {
            this.loader = value
        },
        addNewObjectInColumns(data) {
            this.$nextTick(() => {
                const hotInstance = this.$refs.hotTableComponent.hotInstance;
                this.columns = [
                    { title: 'Номер вагона', data: 'wagon_number' },
                    { title: 'Тип вагона', data: 'wagon_type' },
                    { title: 'Собст. на момент страхования', data: 'owner_at_insurance_moment' },
                    { title: 'Страховая компания', data: 'insurance_company', },
                    { title: '№ договора', data: 'agr_number', type: 'numeric' },
                    { title: 'Дата договора', data: 'agr_date', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
                    ...data
                ];
                hotInstance.updateSettings({ columns: this.columns });
                hotInstance.render();
            })
        },
        getOwnWagonsCompare(data) {
            let preData = data.data;
            let compareDataMap = {};

            // Создаем карту для getInsuredWagonsData, чтобы быстро проверить наличие вагонов
            this.getInsuredWagonsData.forEach((item) => {
                compareDataMap[item.wagon_number] = true;
            });

            // Фильтруем preData, оставляя только те вагоны, которых нет в compareDataMap
            preData = preData.filter((el) => {
                return el['Принадлежность СТЖ'] === 'С' && !compareDataMap[el['Номер вагона']];
            });

            console.log(preData, 'preData');
            this.getOwnWagonsCompareData = preData;
        },

        // getOwnWagonsCompare(data) {
        //     let preData = data.data
        //     let compareDataMap = {}
        //     preData.forEach((el) => {
        //         if (el['Принадлежность СТЖ'] === 'С') {
        //             compareDataMap[el['Номер вагона']] = true
        //         }
        //     })
        //     preData = this.getInsuredWagonsData.filter((item) => {
        //         return compareDataMap[item.wagon_number]
        //     })
        //     this.getOwnWagonsCompareData = preData

        // },
        getInsuredWagons(data) {
            this.getInsuredWagonsData = data.data
            this.$nextTick(() => {
                const hotInstance = this.$refs.hotTableComponent.hotInstance
                hotInstance.loadData(this.getInsuredWagonsData)
                hotInstance.updateSettings({ data: this.getInsuredWagonsData })
                hotInstance.render()
            })
        },
        dataWagons(data) {
            console.log(data)
        }
    },
}
</script>

<style scoped>
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
    padding: 1% 0 0 2%;
    color: #cacaca;
}

</style>
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
                                <b-button variant="info" style="position: absolute; right: 2%;"
                                    v-if="getInsuredWagonsData.length > 1" @click="DownloadExcel('test')">Выгрузить
                                    таблицу</b-button>
                                <br>
                                <h4 class="air_block_header" v-show="getInsuredWagonsData.length > 0">Застрахованные
                                    вагоны</h4>
                                <span class="description-text">Всего записей {{ getInsuredWagonsData.length ?? 0
                                    }}</span>
                                <hot-table ref="hotTableComponent" :data="getInsuredWagonsData" :rowHeaders="true"
                                    :columns="columns" :preventOverflow="'horizontal'" :filters="true"
                                    :language="'ru-RU'" :manualColumnResize="true" :autoWrapRow="true"
                                    :autoWrapCol="true" :height="'40vh'" :width="'100%'" :fillHandle="false"
                                    :dropdownMenu="dropdownMenuOptions" >
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
import { saveAs } from 'file-saver';

import api from "@/api/wagonPark";
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
            nameClient: [],
            columns: [
                { title: 'Номер вагона', data: 'wagon_number' },
                { title: 'Тип вагона', data: 'wagon_type', editor: 'select', selectOptions: ['ПВ', 'ЦС'] },
                {
                    title: 'Собст. на момент страхования', data: 'owner_at_insurance_moment', editor: 'select',
                    selectOptions: ["ДЕЛОВОЙ ВИЗИТ, ООО", 'ООО "ТРАНСПОРТНЫЕ ТЕХНОЛОГИИ"']
                },
                { title: 'Страховая компания', data: 'insurance_company', },
                { title: '№ договора', data: 'agr_number', },
                { title: 'Дата договора', data: 'agr_date', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
            ],
            // dropdownMenuOptions: ['clear_column', 'filter_by_condition', 'filter_by_value'],
            dropdownMenuOptions: ['filter_by_condition', 'filter_action_bar','filter_by_value', 'clear_column'],


// Для маленькой таблицы незастрахованных вагонов
            columns_own_wagons: [
                { title: 'Номер вагона', data: 'Номер вагона',},   
                { title: 'Принадлежность СТЖ', data: 'Принадлежность СТЖ',editor: false },
                { title: 'В управлении компании', data: 'В управлении компании',editor: false },
                { title: 'Тип вагона', data: 'Тип',editor: false },
                { title: 'Примечание', data: 'Примечание' }

                // В управлении компании
            ],
            getInsuredWagonsData: [{ title: 'Номер вагона', data: 'wagon_number' },],
            getOwnWagonsCompareData: [{ title: 'Номер вагона', data: 'wagon_number' },

            ],
        }
    },
    mounted() {
        document.querySelector('.hot-display-license-info').style = 'display: none !important';
    },
    computed: {
        ...mapState({
            clients: state => state.client.name_client
        }),

    },
    methods: {
        DownloadExcel() {
            const hotInstance = this.$refs.hotTableComponent.hotInstance;
            const exportPlugin = hotInstance.getPlugin('exportFile');

            // Экспортируем CSV с BOM и точкой с запятой как разделителем
            const csvData = exportPlugin.exportAsString('csv', {
                bom: true,
                columnHeaders: true,
                rowHeaders: true,
                mimeType: 'text/csv',
                columnDelimiter: ';', // Используем точку с запятой в качестве разделителя
            });

            // Создаем blob с данными и сохраняем его
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'Застрахованные_вагоны.csv');
        },

        startStopLoader(value) {
            this.loader = value
        },
        // Добаление новых столбцов  в таблицы
        addNewObjectInColumns(data) {
            this.$nextTick(() => {
                const hotInstance = this.$refs.hotTableComponent.hotInstance;
                this.columns = [
                    { title: 'Номер вагона', data: 'wagon_number' },
                    { title: 'Тип вагона', data: 'wagon_type', editor: 'select', selectOptions: ['ПВ', 'ЦС'] },
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
        isType(value) {
            if(value === 'Полувагон') {
                return 'ПВ'
            }else if(value === 'Цистерна') {
                return 'ЦС'
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
                return el['Принадлежность СТЖ'] === 'С' && !compareDataMap[el['Номер вагона']];
            });

            try {
                this.loader = true
                let promises = preData.map(el => api.getWagons({ number: el['Номер вагона'] }));
                const results = await Promise.all(promises);
                console.log('results',results)
                this.loader = false
                let compareDataMap2 = []
                for (let i in results) {
                    if (results[i].data.data[0].is_active === true) {
                        compareDataMap2.push({ "Номер вагона": results[i].data.data[0].number, "В управлении компании": results[i].data.data[0].last_uk, "Тип": this.isType(results[i].data.data[0].wagon_type), 'Принадлежность СТЖ': 'С', 'Примечание': results[i].data.data[0].insurance_comment },)
                    }
                }
                this.$toast.success('Данные по незастрахованным вагонам получены', {
                    timeout: 3000
                })

                console.log('compareDataMap2:', compareDataMap2)
                this.getOwnWagonsCompareData = compareDataMap2
                this.$nextTick(() => {
                    const hotInstance = this.$refs.hotTableComponent.hotInstance
                    hotInstance.loadData(this.getInsuredWagonsData)
                    hotInstance.updateSettings({ data: this.getInsuredWagonsData })
                    hotInstance.render()
                })
            } catch (err) {
                this.loader = false

            }

        },

        getInsuredWagons(data) {
            this.getInsuredWagonsData = data
            this.$nextTick(() => {
                const hotInstance = this.$refs.hotTableComponent.hotInstance
                hotInstance.loadData(this.getInsuredWagonsData)
                hotInstance.updateSettings({ data: this.getInsuredWagonsData })
                hotInstance.render()
            })
        },

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
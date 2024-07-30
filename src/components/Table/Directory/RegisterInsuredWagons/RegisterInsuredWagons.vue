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
                                <b-button variant="success" style="position: absolute; right: 2%;"
                                    v-if="getInsuredWagonsData.length > 1" @click="DownloadExcel('test')">Выгрузить
                                    таблицу</b-button>
                                <br>
                                <h4 class="air_block_header" v-show="getInsuredWagonsData.length > 0">Застрахованные
                                    вагоны</h4>
                                <hot-table ref="hotTableComponent" :data="getInsuredWagonsData" :rowHeaders="true"
                                    :columns="columns" :preventOverflow="'horizontal'" :filters="true"
                                    :language="'ru-RU'" :manualColumnResize="true" :autoWrapRow="true"
                                    :autoWrapCol="true" :height="'40vh'" :width="'100%'" :fillHandle="false"
                                    :dropdownMenu="dropdownMenuOptions" :readOnly="true">
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
                    selectOptions: [
                        "METALLOINVEST TRADING AG",
                        "PTC Operator",
                        "TRANSPORT TECHNOLOGIES GP",
                        "Ай Эм Ти Экспресс",
                        "АККЕРМАНН ЦЕМЕНТ, ООО",
                        "АКЦИОНЕРНОЕ ОБЩЕСТВО \"ЯДРАН\"",
                        "Алоран",
                        "Альянс Инерт",
                        "Антрацит Трейд",
                        "АО \"УРАЛЬСКАЯ СТАЛЬ\"",
                        "АРДЕН",
                        "АРТВЭЙ, ООО",
                        "АСР-ГРУПП, ООО",
                        "АУРА",
                        "Базалт",
                        "БЕЛИНТЕРТРАНС",
                        "БПТранспорт",
                        "БТС-Логистика, ООО",
                        "Булатовский базальт",
                        "БЦК",
                        "ВЕКТОР-ДВИЖЕНИЯ, ООО",
                        "ВЕРАТЭК, ООО",
                        "ВЕСКО",
                        "ВЗКСМ, ООО",
                        "Восток-Сибирь Логистик",
                        "Газпром Нефть, ПАО",
                        "Газпромтранс",
                        "ГАЗПРОМТРАНС, ООО",
                        "ГК Вагонсервис",
                        "ГК ТИТАН, АО",
                        "Грифон",
                        "Группа Магнезит",
                        "ДВ УГОЛЬ СИБИРИ, ООО",
                        "ДЕЛОВЫЕ ПРОГРАММЫ, ООО",
                        "ДЕЛЬТА, ООО",
                        "Джетта Строй ЛТД",
                        "ДИПТРАНС, ООО",
                        "ДЛСГРУПП, ООО",
                        "ДНК",
                        "ДублТранс",
                        "ЕВРАЗ НТМК",
                        "Евросиб",
                        "ЕВРОСИБ СПБ-ТС, АО",
                        "Евротрансрейл",
                        "Еврохим",
                        "ЕвроХим",
                        "ЗУР",
                        "ИКТ",
                        "ИМПЭКСТРЕЙД, ООО",
                        "Интерлогистикс",
                        "Интер Транс",
                        "Исткомтранс",
                        "КазКомир Компани ТОО",
                        "КалугаВагонСервис",
                        "КАМЕЛОТ",
                        "КАРБОН УГОЛЬ, ООО",
                        "Карбо-трейд",
                        "КВУ, ООО",
                        "КЛИШИ",
                        "КОКС",
                        "Компания EAST WEST HOLDING LIMITED",
                        "КОНТУР СПБ, ООО",
                        "КОЭКЛЕРИЧИ РАША, ООО",
                        "КТС, ООО",
                        "КУЙБЫШЕВАЗОТ, ПАО",
                        "КУРГАНСТАЛЬМОСТ, ЗАО",
                        "ЛГОК",
                        "ЛП, ООО",
                        "ЛСР",
                        "ЛУКОШКИНСКИЙ КАРЬЕР, ООО",
                        "Майкубен-Вест ООО",
                        "МГОК",
                        "МЕТИНВЕСТ-ШИППИНГ",
                        "Мечел-Транс",
                        "МИКТрансАзия",
                        "МТК, ООО",
                        "МТЛК",
                        "Научно-внедренческая фирма \"Грифон\" ЗАО",
                        "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО",
                        "НБ ТАЙГА ЭНЕРДЖИ, ООО",
                        "НЕРУДНАЯ ЛОГИСТИЧЕСКАЯ КОМПАНИЯ, ООО",
                        "НЕРУДСТРОЙТРАНС",
                        "НЕФТЕХИМТРЕЙД, ООО",
                        "ННК-Транс",
                        "НОВАЯ ГОРНАЯ УК, ООО",
                        "НПК, АО",
                        "НУТЭК",
                        "НХС",
                        "НХТК",
                        "НХТК, ООО",
                        "ОБНИНСКОРГСИНТЕЗ, АО",
                        "Общество с ограниченной ответственностью \"Дельта-Трейд\"",
                        "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ПАРМА ПЕТРОЛИУМ ОПЕРЕЙШН КЛМ\"",
                        "Общество с ограниченной ответственностью \"ПромИнвест\"",
                        "Объединенная горнодобывающая компания",
                        "ОКСИ ЭНЕРДЖИ, ООО",
                        "ООО \"Альфа-транс\"",
                        "ООО \"БалтТрансСервис\"",
                        "ООО \"ЗСТК\"",
                        "ООО Маритер",
                        "ООО \"Парма Петролиум Оперейшн КЛМ\"",
                        "ООО \"ПРОМЖДСЕРВИС\"",
                        "ООО \"Рэйл Оператор\"",
                        "ООО \"Санторини Виктори\"",
                        "ООО \"СГК\"",
                        "ООО \"СИБАНТРАЦИТ ЛОГИСТИКА\"",
                        "ООО \"СОКАР РУС\"",
                        "ООО СТЮ",
                        "ООО «СЧПЗ Трейд»",
                        "ООО Татнефтехим",
                        "ООО \"Татнефть-Транс\"",
                        "ООО \"Томская Топливная Компания\"",
                        "ОТС-Логистика",
                        "ПАО «Газпром нефть»",
                        "ПАО \"Газпром Нефть\"",
                        "ПГК, АО",
                        "ПЕРВООСНОВА, АО",
                        "ПНК, АО",
                        "ППО",
                        "ПРОГРЕСС ХХI ВЕК, ООО",
                        "Проминвест",
                        "ПРОМУГОЛЬСЕРВИС, ООО",
                        "ПУТ",
                        "ПЭКСО, ООО",
                        "РВК, ООО",
                        "Рейл Сервис",
                        "РемиНико",
                        "Ресурс Транс",
                        "РЕСУРС ТРАНС, ООО",
                        "РНК, ООО",
                        "РН-Транс",
                        "РОССОЙЛ, ООО",
                        "РТК Групп",
                        "РТС-ТРАНС, ООО",
                        "РУК, ООО",
                        "РусждТранс",
                        "РУСНЕРУДТРЕЙД, ООО",
                        "Рус-ОйлЭкс",
                        "РУССКИЙ УГОЛЬ, АО",
                        "РУСТЭК",
                        "РЭЙЛ ПРО, ООО",
                        "РЭУ, ООО",
                        "Саткинская нерудная компания",
                        "САЯНПРОМТРАНС",
                        "СДС-Уголь",
                        "Серебрянский цементный завод",
                        "СИБАНТРАЦИТ ЛОГИСТИКА, ООО",
                        "СИБТРЕЙД, ООО",
                        "СИГМА, ООО",
                        "СИМПРЕАЛ ЛОГИСТИКА, ООО",
                        "СКС, АО",
                        "СКС, ООО",
                        "СПО, ООО",
                        "Стелла",
                        "СТК, ООО",
                        "СТРОЙ-ДРЕВ, ООО",
                        "СТРОЙСЕРВИС",
                        "СтройТехно-Урал, ООО",
                        "СТС-ГРУПП, ООО",
                        "СТС, ООО",
                        "ТАЙГА ЭНЕРДЖИ, ООО",
                        "ТАКТ",
                        "ТАТНЕФТЬ-ТРАНС, ООО",
                        "ТГ РУСЖДТРАНС, ООО",
                        "ТД РКУ",
                        "ТД УГЛИ КУЗБАССА, ООО",
                        "ТЕРМИНАЛ МОРСКОЙ РЫБНЫЙ ПОРТ",
                        "ТК РУТ Логистик",
                        "ТК \"Славия\"",
                        "ТЛК",
                        "ТЛК СТАРЫЙ КЛЮЧ, ООО",
                        "ТОО \"CITITRANS\"",
                        "ТОО «GLP Operator»",
                        "ТОО «Logistic resurs»",
                        "ТОО «PartnerInterFreight» (ПартнэрИнтэрФрэйт)",
                        "ТОО \"Авион Норд\"",
                        "ТОО «ЛУКОЙЛ Лубрикантс Центральная Азия»",
                        "ТОО «Тенгри Транс»",
                        "ТОРГОВЫЙ ДОМ ЮЖНО-СИБИРСКИЙ, АО",
                        "ТПС",
                        "ТРАНС ИНВЕСТ, ООО",
                        "ТрансКом ТОО",
                        "Трансметкокс",
                        "ТРАНСХИМРЕСУРС, ООО",
                        "ТРЕЙД ОЙЛ, ООО",
                        "Т-СЕРВИС ЛОГИСТИКС, ООО",
                        "ТСК ЛОГИСТИКА, ООО",
                        "ТТ ЛОГИСТИКА, ООО",
                        "ТТО, ООО",
                        "ТЭК УЛЬТИМА, ООО",
                        "УГМК-Транс",
                        "Уголь-Транс",
                        "УГПХ, ООО",
                        "УК ООО ТМС ГРУПП",
                        "УК Разрез Степной",
                        "УК Южный Альянс",
                        "УралЛогистика",
                        "Урал Логистика, ООО",
                        "Уральская транспортная компания",
                        "ФЕРРУМ ТРЕЙД",
                        "ФЛК, ООО",
                        "ФОРСТ ТРЕЙДИНГ",
                        "ХК КАМА-ТРАКС, ООО",
                        "Центр Комир KZ",
                        "ЦОФ Березовская",
                        "ЧТПЗ, АО",
                        "ЧЭМК, АО",
                        "Шахта Грамотеинская",
                        "Экспортно-производственное республиканское унитарное предприятие «БЕЛЛЕСЭКСПОРТ»",
                        "ЭКТОС-ТРАНС, ООО",
                        "ЭЛСИ ЛОГИСТИКА СИБИРЬ, ООО",
                        "Энергоресурсы",
                        "Энэрго-Трэйд",
                        "ЮНИТРАНС РЭЙЛ",

                    ]
                },
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
        async getOwnWagonsCompare(data) {
            let preData = data.data;
            let compareDataMap = {};
            console.log('test:', this.getInsuredWagonsData)
            // Создаем карту для getInsuredWagonsData, чтобы быстро проверить наличие вагонов
            this.getInsuredWagonsData.forEach((item) => {
                compareDataMap[item.wagon_number] = true;
            });
            console.log('preData - do', preData);
            // Фильтруем preData, оставляя только те вагоны, которых нет в compareDataMap
            preData = preData.filter((el) => {
                return el['Принадлежность СТЖ'] === 'С' && !compareDataMap[el['Номер вагона']];
            });

            try {
                this.loader = true
                let promises = preData.map(el => api.getWagons({ number: el['Номер вагона'] }));
                const results = await Promise.all(promises);


                // const results = []
                // for (let i of preData) {
                //     let result = await api.getWagons({ number: i['Номер вагона'] })
                //     results.push(result)
                // }
                this.loader = false
                let compareDataMap2 = []
                for (let i in results) {
                    if (results[i].data.data[0].is_active === true) {
                        compareDataMap2.push({ "Номер вагона": results[i].data.data[0].number })
                    }
                }
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
<template>
    <div>
        <Loader :loader="loader" />
        <div class="air_block">
            <div class="air_block_header">
                <h5>Оперативная справка</h5>
            </div>
            <hr />
            <br />
            <div class="filter_block" style="width: 50%; display: flex; flex-direction: column; position: relative;">
                <label>Дата <br>
                    <input type="date" class="textarea" style="width: 20vw !important; background: white;"
                        v-model="date_begin" :min="'2024-01-01'">
                </label>
                <label>
                    Тип вагона
                    <br />
                    <select name="" id="" v-model="wag_type" class="textarea"
                        style="width:20vw !important; background: white;">
                        <option value="Полувагон">Полувагон</option>
                        <option value="Цистерна">Цистерна</option>
                    </select>

                </label>
                <label>Клиент <br>
                    <v-select v-model="currentClients" :options="clients" label="value" multiple
                        style="width:20vw !important;"></v-select>
                </label>
                <br>

                <button class="Accept button" @click="Actioned()" style="width:20vw !important; height: 40px;">Загрузить
                    данные</button>

            </div>
            <div>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Выполнение плана" active>
                            <b-card-text>
                                <table style="margin-left: -5%;">
                                    <thead>
                                        <tr>
                                            <th class="greenCell">Клиент
                                                <v-select v-model="selectedOptions" :options="allClientsInTable"
                                                    label="label" multiple>
                                                </v-select>
                                            </th>
                                            <th class="greenCell">{{ wag_type == 'Полувагон' ? 'Кол-во погрузок' :
            "Объемы,тн" }} </th>

                                            <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{ wag_type
            ==
            'Полувагон' ?
            'Кол-во погр План на тек дату' : 'Объем на тек дату План' }} </th>
                                            <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{ wag_type
            ==
            'Полувагон' ?
            'Кол-во погр факт на тек дату' : 'Объем на тек дату Факт' }} </th>
                                            <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{ wag_type
            ==
            'Полувагон' ?
            'Выполнение абсл.' : 'Отклонение кол-ва ваг' }} </th>
                                            <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{ wag_type
            ==
            'Полувагон' ?
            'Выполнение отн.' : ' % выполнения плана' }} </th>

                                            <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{
            wag_type
                == 'Полувагон' ?
                'Выручка без НДС, руб' : "Выручка без НДС, руб ПЛАН" }} </th>
                                            <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{
            wag_type
                == 'Полувагон' ?
                'Объем на тек дату План' : 'Выручка без НДС, руб на тек дату ПЛАН' }}
                                            </th>
                                            <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{
            wag_type
                == 'Полувагон' ?
                'Объем на тек дату Факт' : 'Выручка без НДС, руб на тек дату факт' }}
                                            </th>
                                            <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{
            wag_type
                == 'Полувагон' ?
                'Выполнение абсл.' : 'отклонения в выручке' }} </th>
                                            <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{
            wag_type
                == 'Полувагон' ?
                'Выполнение отн.' : ' % выполнения' }} </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-if="Array.isArray(responseServerData.report) && responseServerData.report.length == 0">
                                            <td colspan="11">По выбранным параметрам нет данных</td>
                                        </tr>
                                        <tr v-for="item, index in filteredReportData" :key="index">
                                            <td>{{ item.client }}</td>
                                            <td>{{ item.metric | format }}</td>
                                            <td>{{ item.metric_current_plan | format }}</td>
                                            <td>{{ item.metric_current_fact | format }}</td>
                                            <td>{{ (item.metric_current_fact - item.metric_current_plan) | format }}
                                            </td>
                                            <td>{{ item.metric_complete_rel | format }} %</td>
                                            <td>{{ item.revenue_wo_nds | format }}</td>
                                            <td>{{ item.revenue_current_plan | format }}</td>
                                            <td>{{ item.revenue_current_fact | format }}</td>
                                            <td>{{ (item.revenue_current_fact - item.revenue_current_plan) | format }}
                                            </td>
                                            <td>{{ item.revenue_complete_rel | format }}%</td>
                                        </tr>
                                        <tr v-for="item in totalResponse2" :key="item.id">
                                            <td>Прочие</td>
                                            <td>{{ item.metric | format }}</td>
                                            <td>{{ item.metric_current_plan | format }}</td>
                                            <td>{{ item.metric_current_fact | format }}</td>
                                            <td>{{ (item.metric_current_fact - item.metric_current_plan) | format }}
                                            </td>
                                            <td>{{ item.metric_complete_rel | format }} %</td>
                                            <td>{{ item.revenue_wo_nds | format }}</td>
                                            <td>{{ item.revenue_current_plan | format }}</td>
                                            <td>{{ item.revenue_current_fact | format }}</td>
                                            <td>{{ (item.revenue_current_fact - item.revenue_current_plan) | format }}
                                            </td>
                                            <td>{{ item.revenue_complete_rel | format }}%</td>
                                        </tr>
                                        <tr class="Row_grey">
                                            <td>Итого</td>
                                            <td>{{ totalMetric | format }}</td>
                                            <td>{{ totalMetricCurrentPlan | format }}</td>
                                            <td>{{ totalMetricCurrentFact | format }}</td>
                                            <td>{{ totalMetricCurrentFact - totalMetricCurrentPlan | format }}</td>
                                            <td>{{ totalMetricCompleteRel }} %</td>
                                            <td>{{ totalRevenueWithoutNDS | format }}</td>
                                            <td>{{ totalRevenueCurrentPlan | format }}</td>
                                            <td>{{ totalRevenueCurrentFact | format }}</td>
                                            <td>{{ totalRevenueCurrentFact - totalRevenueCurrentPlan | format }}</td>
                                            <td>{{ totalRevenueCompleteRel }} %</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Доходность">
                            <b-card-text>
                                <table style="margin-left: -5%;">
                                    <thead>
                                        <th>Показатель</th>
                                        <th style="background: lightskyblue;">БП на<br> {{ date_begin }}</th>
                                        <th style="background: lightseagreen;">Бюджет на <br>{{ date_begin }}</th>
                                        <th style="background: rgb(46, 11, 11); color: white; font-weight: 400;">Факт на
                                            <br>{{ date_begin }}
                                        </th>
                                        <th style="background: darkred; color: white; font-weight: 400;">Отклонение
                                            бюджета
                                            от БП <br>{{ date_begin }}</th>
                                        <th style="background: darkred; color: white; font-weight: 400;">Отклонение
                                            факта от
                                            БП <br>{{ date_begin }}</th>
                                        <th style="background: darkred; color: white; font-weight: 400;">Отклонение
                                            факта от
                                            бюджета <br>{{ date_begin }}</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Выручка</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerData.other_info?.revenue | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Тариф порож</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerData.other_info?.empty_tariff | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Тариф по сопред порож</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerData.other_info?.inroad_tariff | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Тариф груж</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Доп. расходы</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerData.other_info?.other_charges | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Маржинальный доход</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerData.other_info?.margin | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Вагоносутки (раб)</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerData.other_info?.vagonosutki_work | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Вагоносутки (общ)</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerData.other_info?.vagonosutki_calendar | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Доходность (раб в/с)</td>
                                            <td style="background: lightskyblue;"></td>
                                            <td style="background: lightseagreen;"></td>
                                            <td style="background: rgb(46, 11, 11); color: white  !important;;"></td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                        </tr>
                                        <tr>
                                            <td>Доходность (общ в/с)</td>
                                            <td style="background: lightskyblue;"></td>
                                            <td style="background: lightseagreen;"></td>
                                            <td style="background: rgb(46, 11, 11);  color: white !important;">{{
            responseServerData.other_info?.income | format }}</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred; color: white !important;">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br>
                                <table style="margin-left: -5%;">
                                    <thead>
                                        <th>Показатель</th>
                                        <th style="background: lightskyblue;">БП на<br> {{ date_begin }}</th>
                                        <th style="background: lightseagreen;">Бюджет на <br>{{ date_begin }}</th>
                                        <th style="background: rgb(46, 11, 11); color: white; font-weight: 400;">Факт на
                                            <br>
                                            {{ date_begin }}
                                        </th>
                                        <th style="background: darkred; color: white; font-weight: 400;">Отклонение
                                            бюджета
                                            от БП <br> {{ date_begin }}</th>
                                        <th style="background: darkred; color: white; font-weight: 400;">Отклонение
                                            факта от
                                            БП <br> {{ date_begin }}</th>
                                        <th style="background: darkred; color: white; font-weight: 400;">Отклонение
                                            факта от
                                            бюджета {{ date_begin }}</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Выручка</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerDataOtherClients.other_info?.revenue | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Тариф порож</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerDataOtherClients.other_info?.empty_tariff | format }}
                                            </td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Тариф по сопред порож</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerDataOtherClients.other_info?.inroad_tariff | format }}
                                            </td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Тариф груж</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Доп. расходы</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerDataOtherClients.other_info?.other_charges | format }}
                                            </td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Маржинальный доход</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerDataOtherClients.other_info?.margin | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Вагоносутки (раб)</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerDataOtherClients.other_info?.vagonosutki_work | format
                                                }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Вагоносутки (общ)</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ responseServerDataOtherClients.other_info?.vagonosutki_calendar |
                                                format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Доходность (раб в/с)</td>
                                            <td style="background: lightskyblue;"></td>
                                            <td style="background: lightseagreen;"></td>
                                            <td style="background: rgb(46, 11, 11); color: white  !important;;"></td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                        </tr>
                                        <tr>
                                            <td>Доходность (общ в/с)</td>
                                            <td style="background: lightskyblue;"></td>
                                            <td style="background: lightseagreen;"></td>
                                            <td style="background: rgb(46, 11, 11);  color: white !important;">{{
                                                responseServerDataOtherClients.other_info?.income | format }}</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred; color: white !important;">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Внесение данных доходности">
                            <b-card-text>
                                <div class="date_block">
                                    <div class="filter_b">
                                        <div>
                                            <select v-model="typeData" style="width: 20vw !important">
                                                <option value="income">Загрузка доходности</option>
                                                <option value="plan">Загрузка Бизнес-плана</option>
                                            </select>
                                            <br>
                                            <label for="">
                                                Дата <br>
                                                <input type="month" v-model="date_begin_create" class="textarea"
                                                    style="background: white;width: 20vw !important ">
                                            </label>
                                            <br>
                                            <label>Клиент <br>
                                                <v-select v-model="currentClientsForExcelFile" :options="clients"
                                                    label="value" style="width:20vw !important;"></v-select>
                                            </label>
                                        </div>
                                        <div class="download_excel" v-if="typeData == 'plan'">
                                            <textarea v-model="excelData" placeholder="Вставьте данные из Excel сюда"
                                                class="textarea" style="width: 45vw; height: 15vh;">
                                            </textarea>
                                            <div style="display: flex; margin-top: 2%; gap: 5%">
                                                <button class="Delete button" @click="tableData = []">Очистить
                                                    таблицу</button>
                                                <button class="Accept button" @click="downloadExcel()">Загрузить в
                                                    таблицу</button>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="table_block" v-if="typeData == 'income'">
                                        <table>
                                            <thead>
                                                <th>Выручка</th>
                                                <th>Вес</th>
                                                <th>Тариф порож </th>
                                                <th>Тариф по сопред порож</th>
                                                <th>Тариф груж</th>
                                                <th>Доп. расходы</th>
                                                <th>Маржинальный доход</th>
                                                <th>Вагоносутки (раб)</th>
                                                <th>Вагоносутки (общ) </th>
                                                <th>Доходность (раб в/с)</th>
                                                <th>Доходность (общ в/с)</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td v-for="item, index in createNewProfitability" :key="index"
                                                        style="padding: 0 !important;">
                                                        <input type="number" class="input"
                                                            v-model="createNewProfitability[index]">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div v-else style="overflow: auto">
                                        <table>
                                            <thead>
                                                <th>Выручка</th>
                                                <th>Вес</th>
                                                <th>Тариф порож </th>
                                                <th>Тариф по сопред порож</th>
                                                <th>Тариф груж</th>
                                                <th>Доп. расходы</th>
                                                <th>Маржинальный доход</th>
                                                <th>Вагоносутки (раб)</th>
                                                <th>Вагоносутки (общ) </th>
                                                <th>Доходность (раб в/с)</th>
                                                <th>Доходность (общ в/с)</th>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                                                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                                                        {{ cell }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <button class="Accept special" @click="saveNewProfitability()">Сохранить
                                        данные</button>
                                </div>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>

        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
    </div>
</template>


<script>
import Periods from "../../ManagmentRepReporting/Periods.vue";
import api from '@/api/directory'
import Loader from "@/components/loader/loader.vue";
import vSelect from "vue-select";
import Notifications from "@/components/notifications/Notifications.vue";
import Handsontable from "handsontable";

export default {
    components: { Periods, Loader, vSelect, Notifications },
    data() {
        return {
            excelData: "",
            hot: "",
            tableData: [],
            currentClientsForExcelFile: "",
            wag_type: "Полувагон",
            date_begin: new Date().toISOString().slice(0, 10),
            date_begin_create: new Date().toISOString().slice(0, 7),
            date_end: "",
            loader: false,
            responseServerData: "",
            responseServerDataOtherClients: "",
            selectedOptions: "",
            allClientsInTable: [],
            currentClients: [],
            typeData: 'income',
            clients: [{ value: "ТАТНЕФТЬ-ТРАНС, ООО" },
            { value: "ВЕКТОР-ДВИЖЕНИЯ, ООО" },
            { value: "Энергоресурсы" },
            { value: "РЕСУРС ТРАНС, ООО" },
            { value: "Рус-ОйлЭкс" },
            { value: "НХТК" },
            { value: "РУСТЭК" },
            { value: 'Рейл Сервис' },
            { value: 'ООО "Томская Топливная Компания"' },
            { value: 'Грифон' },
            { value: 'ННК-Транс' },
            { value: 'ООО "БалтТрансСервис"' },
            { value: 'РТС-ТРАНС, ООО' },
            { value: 'ГАЗПРОМТРАНС, ООО' },
            { value: 'Газпромтранс' },
            { value: 'ГК ТИТАН, АО' },
            { value: 'НОВАЯ ГОРНАЯ УК, ООО' },
            { value: 'Трансметкокс' },
            { value: 'Мечел-Транс' },
            { value: 'СПО, ООО' },
            { value: 'ТД УГЛИ КУЗБАССА, ООО' },
            { value: 'РУК, ООО' },
            { value: 'НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО' },
            { value: 'Уголь-Транс' },
            { value: 'РУССКИЙ УГОЛЬ, АО' },
            { value: 'ЭЛСИ ЛОГИСТИКА СИБИРЬ, ООО' },
            { value: 'ПАО "Газпром Нефть"' },
            { value: 'ППО' },
            { value: 'ЧЭМК, АО' },
            { value: 'Алоран' },
            { value: 'АККЕРМАНН ЦЕМЕНТ, ООО' },
            { value: 'НЕРУДНАЯ ЛОГИСТИЧЕСКАЯ КОМПАНИЯ, ООО' },
            { value: 'АО "УРАЛЬСКАЯ СТАЛЬ"' },
            { value: 'ПЕРВООСНОВА, АО' },
            { value: 'ДЕЛОВЫЕ ПРОГРАММЫ, ООО' },
            { value: 'СтройТехно-Урал, ООО' },
            { value: 'УГПХ, ООО' }],
            createNewProfitability: {
                revenue: 0,
                volume: 0,
                tariff_empty: 0,
                tariff_inroad: 0,
                tariff_loaded: 0,
                other_charges: 0,
                margin: 0,
                vagonosutki_work: 0,
                vagonosutki: 0,
                income_work: 0,
                income: 0,

            },
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }
    },
    filters: {
        format(value) {
            if (value != "" && !!value) {
                let TwoSignNum = value?.toFixed(0)
                return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            }
            return value

        },
    },

    computed: {
        filteredReportData() {
            if (this.selectedOptions.length == 0) {
                return this.responseServerData.report
            } else {
                let array_val = this.selectedOptions.map(item => item.value)
                return this.responseServerData.report.filter((item) => {
                    return array_val.includes(item.client)
                })
            }
        },
        totalResponse2() {
            if (this.responseServerDataOtherClients.report && this.responseServerDataOtherClients.report.length > 0) {
                try {
                    const sumObject = this.responseServerDataOtherClients.report.reduce((acc, obj) => {
                        for (let key in obj) {
                            if (acc.hasOwnProperty(key)) {
                                acc[key] += obj[key];
                            } else {
                                acc[key] = obj[key];
                            }
                        }
                        return acc;
                    }, {});

                    const resultArray = [sumObject];
                    return resultArray
                } catch {
                    this.loader = false
                }
            } else {
                return 0
            }
        },
        totalMetric() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {

                return this.filteredReportData.reduce((sum, item) => sum + item.metric, 0);
            } else {
                return 0
            }
        },
        totalMetricCurrentPlan() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
                return this.filteredReportData.reduce((sum, item) => sum + item.metric_current_plan, 0) + this.totalResponse2[0].metric_current_plan
            } else {
                return 0
            }
        },
        totalMetricCurrentFact() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
                return this.filteredReportData.reduce((sum, item) => sum + item.metric_current_fact, 0) + this.totalResponse2[0].metric_current_fact
            } else {
                return 0
            }
        },
        totalMetricCompleteAbs() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
                // return this.filteredReportData.reduce((sum, item) => sum + item.metric_complete_abs, 0) + this.totalResponse2[0].metric_complete_abs
                return 1
            } else {
                return 0
            }
        },
        totalMetricCompleteRel() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
                // return this.filteredReportData.reduce((sum, item) => sum + item.metric_complete_rel, 0);
                let a = this.totalMetricCurrentFact
                let b = this.totalMetricCurrentPlan
                return Math.ceil(a / b * 100)
            } else {
                return 0
            }
        },
        totalRevenueWithoutNDS() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
                return this.filteredReportData.reduce((sum, item) => sum + item.revenue_wo_nds, 0) + this.totalResponse2[0].revenue_wo_nds
            } else {
                return 0
            }
        },
        totalRevenueCurrentPlan() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
                return this.filteredReportData.reduce((sum, item) => sum + item.revenue_current_plan, 0) + this.totalResponse2[0].revenue_current_plan
            } else {
                return 0
            }
        },
        totalRevenueCurrentFact() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
                return this.filteredReportData.reduce((sum, item) => sum + item.revenue_current_fact, 0) + this.totalResponse2[0].revenue_current_fact
            } else {
                return 0
            }
        },
        totalRevenueCompleteAbs() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
                // return this.filteredReportData.reduce((sum, item) => sum + item.revenue_complete_abs, 0)
                return 1
            } else {
                return 0
            }
        },
        totalRevenueCompleteRel() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
                // return this.responseServerData.report.reduce((sum, item) => sum + item.revenue_complete_rel, 0);
                let a = this.totalRevenueCurrentFact
                let b = this.totalRevenueCurrentPlan
                if (b == 0) {
                    return 100
                }
                return Math.ceil(a / b * 100)
            } else {
                return 0
            }
        },
    },
    watch: {
        wag_type() {
            this.responseServerData = ""
        }
    },
    methods: {
        downloadExcel() {

            const excelData = this.excelData;
            // Парсим данные из Excel, разделяя их по строкам и столбцам
            const rows = excelData.split("\n");
            const data = rows.map((row) => row.split("\t"));

            // Уничтожаем текущий экземпляр Handsontable, если он существует
            if (this.hot) {
                this.hot.destroy();
            }
            for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
                for (
                    let cellIndex = 0;
                    cellIndex < data[rowIndex].length;
                    cellIndex++
                ) {
                    if (data[rowIndex][cellIndex].trim() === "") {
                        data[rowIndex][cellIndex] = "0";
                    }
                }
            }
            // Инициализируем Handsontable внутри <tbody> и передаем данные
            const tbody = document.querySelector("tbody");
            this.hot = new Handsontable(tbody, {
                data: data,
                colHeaders: false, // Отключаем заголовки столбцов
                rowHeaders: false, // Отключаем заголовки строк
            });
            for (let i of data) {
                if (i.length == 1) {
                    data.splice(data.indexOf(i), 1);
                }
            }

            for (let i = 0; i < data.length; i++) {
                let subArray = data[i];
                if (subArray.length > Object.keys(this.createNewProfitability).length) {
                    data[i] = subArray.slice(0, Object.keys(this.createNewProfitability).length);
                }
            }
            console.log(data);
            this.tableData = data;

            // КОНЕЦ РАБОЧЕГО КОДА
            this.excelData = "";

        },
        saveNewProfitability() {
            if (this.currentClientsForExcelFile == "") {
                this.loader = false
                this.notifyHead = "Ошибка";
                this.notifyMessage = "Не выбран клиент";
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => (this.showNotify = false), 2500);
                return
            }
            this.loader = true

            let filtersData = JSON.parse(JSON.stringify(this.createNewProfitability)); // Копируем объект
            for (let key in filtersData) { // Итерируемся по свойствам объекта
                filtersData[key] = Number(filtersData[key])
            }
            filtersData.on_date = this.date_begin_create + "-01"
            filtersData.client = this.currentClientsForExcelFile.value
            if (this.typeData == "income") {
                api.createNewProfitability(filtersData)
                    .then(() => {
                        this.loader = false
                        this.notifyHead = "Успешно";
                        this.notifyMessage = "Данные доходности сохранены";
                        this.notifyClass = "wrapper-success";
                        this.showNotify = true;
                        setTimeout(() => (this.showNotify = false), 2000);
                    })
                    .catch((err) => {
                        this.loader = false
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = err.response;
                        this.notifyClass = "wrapper-success";
                        this.showNotify = true;
                        setTimeout(() => (this.showNotify = false), 5000);
                    })
                    .finally(() => {
                        this.loader = false
                    })
            } else {
                this.loader = true
                let keys = Object.keys(this.createNewProfitability)
                let result = []
                for (let i = 0; i < this.tableData.length; i++) {
                    let obj = {}
                    for (let j = 0; j < keys.length; j++) {
                        obj[keys[j]] = Number(this.tableData[i][j].replace(',', '.')) || 0
                        obj["on_date"] = this.date_begin_create + "-01"
                        obj["client"] = this.currentClientsForExcelFile.value
                    }
                    result.push(obj)
                }

                let promises = result.map((item) => { api.postNewBusinessPlan(item) })
                Promise.all(promises)
                    .then((result) => {
                        this.loader = false
                        this.tableData = []
                        this.notifyHead = "Успешно";
                        this.notifyMessage = "Данные Бизнес-плана сохранены";
                        this.notifyClass = "wrapper-success";
                        this.showNotify = true;
                        setTimeout(() => (this.showNotify = false), 2000);
                    }).catch((err) => {
                        this.tableData = []
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = err.response;
                        this.notifyClass = "wrapper-success";
                        this.showNotify = true;
                        setTimeout(() => (this.showNotify = false), 5000);
                        this.loader = false
                    }).finally(() => {
                        this.loader = false
                    })

            }


        },
        Actioned() {
            try {

                let data = this.currentClients.map((item) => {
                    return { client: item.value }
                })
                const clientsParams = data.map((item) => `clients=${item.client}`).join('&');
                // Формируем строку запроса с параметрами clients
                const queryString = `?wagon_type=${this.wag_type}&report_date=${this.date_begin}&${clientsParams}`;
                this.loader = true
                Promise.all([api.getDataForOperSpravka(queryString), api.getDataForOperSpravkaOtherClients(queryString),])
                    .then(([response1, response2]) => {
                        this.loader = false
                        this.responseServerData = response1.data
                        this.responseServerDataOtherClients = response2.data
                        const clients = this.responseServerData.report.map(item => item.client)

                        this.allClientsInTable = clients.reduce((acc, client) => {
                            if (!acc.find(item => item.value === client)) {
                                acc.push({ value: client, label: client })
                            }
                            return acc
                        }, []).sort((a, b) => a.value.localeCompare(b.value))
                    })
                    .catch(error => {
                        console.error(error)
                        this.loader = false
                    })
                    .finally(() => {
                        this.loader = false
                    })

            } catch {
                this.loader = false
            }

        },
    }
}
</script>
<style scoped>
table {
    margin-top: 2%;
}

.date_block {
    display: flex;
    flex-direction: column;
}

.filter_b {
    display: flex;
    justify-content: space-between;
}

.download_excel {
    flex-direction: column;
}

.table_block {
    overflow: auto;
    width: 100%;
    table-layout: fixed;
}

.input {
    width: 100%;
    box-sizing: border-box;
    border: none;

}

.table_block th {
    font-size: 12px;
    white-space: nowrap;
}

.Accept.special {
    width: 20%;
    height: 40px;
    margin: 4% 0 0 auto;
}




.greenCell {
    background: #C6E0B4;
}

.greyCell {
    background: #808080;
    color: white
}

.orangeCell {
    background: #FFCC99;
}

.redCell {
    background: #F0C4B9;

}

.blueCell {
    background: #DBCFC3;

}

.air_block {
    width: 100%;
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

select {
    width: 30%;
    margin-top: 2%;
}


.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}

tr td:nth-child(1) {
    text-align: left !important;
    padding-left: 10px !important;
}

td {
    white-space: nowrap;
}
</style>
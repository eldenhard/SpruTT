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
                    <v-select v-model="currentClients" :options="name_client" label="client" multiple
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
                                <div style="overflow: auto; margin-left: -5%;">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="greenCell">Клиент
                                                    <v-select v-model="selectedOptions" :options="allClientsInTable"
                                                        label="label" multiple>
                                                    </v-select>
                                                </th>
    <th style="background: #F4CC6E">{{ wag_type == 'Полувагон' ? 'Объемы БП, ед' : "Объемы БП, тн" }} </th>
    <th class="greenCell">{{ wag_type == 'Полувагон' ? 'Кол-во погрузок' : "Объемы Б,тн" }} </th>
    <th style="background: #F4CC6E">{{ wag_type == 'Полувагон' ? 'Кол-во погр БП на тек дату' : 'Объем БП на тек дату, тн' }}</th>
    <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{wag_type == 'Полувагон' ? 'Кол-во погр План на тек дату' : 'Объем Б на дату, тн' }} </th>
    <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{wag_type == 'Полувагон' ? 'Кол-во погр факт на тек дату' : 'Объем факт на тек дату, тн' }} </th>
    <th style="background: #F4CC6E">{{ wag_type == 'Полувагон' ? 'Выполнение БП, % ' : 'Выполнение БП, % ' }} </th>
    <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{wag_type == 'Полувагон' ? 'Выполнение абсл.' : 'Выполнение Б, %' }}</th>
    <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{ wag_type == 'Полувагон' ? 'Выполнение отн.' : 'Общее выполнение Б, % ' }} </th>
    <th style="background: #F4CC6E">Выручка без НДС БП, руб</th>
    <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{wag_type == 'Полувагон' ? 'Выручка без НДС, руб' : "Выручка без НДС Б, руб" }} </th>
    <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{wag_type == 'Полувагон' ? 'Объем на тек дату План' : 'Выручка на дату БП, руб' }}</th>
    <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{ wag_type == 'Полувагон' ? 'Объем на тек дату Факт' : 'Выручка на дату Б, руб' }}</th>
    <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{ wag_type == 'Полувагон' ? 'Выполнение абсл.' : 'Выручка на дату Факт, руб' }} </th>
    <th style="background: #F4CC6E">Выполнение БП, %</th>
    <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{ wag_type == 'Полувагон' ? 'Выполнение отн.' : 'Выполнение Б, %' }}</th>
    <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{ wag_type == 'Полувагон' ? '% выпонения Б Общий' : '% выпонения Б Общий' }}</th>

                                            </tr>
                                            <tr class="RowAlphabet">
                                                <th></th>
                                                <th>1</th>
                                                <th>2</th>
                                                <th>3</th>
                                                <th>4</th>
                                                <th>5</th>
                                                <th>6</th>
                                                <th>7</th>
                                                <th>8</th>
                                                <th>9</th>
                                                <th>10</th>
                                                <th>11</th>
                                                <th>12</th>
                                                <th>13</th>
                                                <th>14</th>
                                                <th>15</th>
                                                <th>16</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="Array.isArray(responseServerData.report) && responseServerData.report.length == 0">
                                                <td colspan="11">По выбранным параметрам нет данных</td>
                                            </tr>
                                            <tr v-for="item, index in filteredReportData" :key="index">
                                                <td>{{ item.client }}</td>
                                                <td>{{ item.volume_bp || 0 | format }}</td> 
                                                <td>{{ item.metric | format }}</td> 
                                                <td>{{ (item.volume_bp || 0) / getAmountDaysOfCurrentMonth * new Date().getDate() | format }}</td> 
                                                <td>{{ item.metric_current_plan | format }}</td>
                                                <td>{{ item.metric_current_fact | format }}</td>
                                                <td>{{ item.metric_current_fact / item.volume_bp * 100 || 0 | format }}%</td>
                                                <td>{{ item.metric_current_fact / item.metric_current_plan * 100 || 0 | format }} % </td>
                                                <td>{{ item.metric_current_fact / item.metric * 100 || 0 | format }} %
                                                </td> 
                                                <td>{{ item.revenue_wo_nds_bp | format }}</td> 
                                                <td>{{ item.revenue_wo_nds | format }}</td>
                                                <td>{{ item.revenue_current_plan | format }}</td> 
                                                <td>{{ item.revenue_wo_nds / getAmountDaysOfCurrentMonth * new Date().getDate() | format }}</td> 
                                                <td>{{ item.revenue_current_fact | format }}</td> 
                                                <td>{{ item.revenue_current_fact / item.revenue_current_plan * 100 || 0 | format }} %</td>
                                                <td>
                                                    {{ item.revenue_current_fact / (item.revenue_wo_nds / getAmountDaysOfCurrentMonth * new Date().getDate()) * 100 | format }}
                                                    %
                                                </td> 
                                                <td>{{ item.revenue_current_fact / item.revenue_wo_nds * 100 || 0 |  format }} %</td>
                                            </tr>
                                            <tr v-for="item in totalResponse2" :key="item.id">
                                                <td>Прочие</td>
                                                <td>{{ item.volume_bp || 0 | format }}</td> <!-- 1  -->
                                                <td>{{ item.metric || 0 | format }}</td> <!-- 2
-->
                                                <td>{{ item.volume_bp / getAmountDaysOfCurrentMonth * new  Date().getDate() || 0 | format }}</td> <!-- 3
-->
                                                <td>{{ item.metric_current_plan || 0 | format }}</td> <!-- 4
-->
                                                <td>{{ item.metric_current_fact || 0 | format }}</td> <!-- 5
-->
                                                <td>{{ item.metric_current_fact / item.volume_bp * 100 || 0 | format }}
                                                    %</td> <!-- 6
-->
                                                <td>{{ item.metric_current_fact / item.metric_current_plan * 100 || 0 | format }} % <!-- 7
 --> </td>
                                                <td>{{ item.metric_current_fact / item.metric * 100 || 0 | format }} %
                                                </td> <!-- 8
 -->
                                                <td>{{ item.revenue_wo_nds_bp || 0 }}</td> <!-- 9
 -->
                                                <td>{{ item.revenue_wo_nds || 0 | format }}</td> <!-- 10 -->
                                                <td>{{ item.revenue_current_plan || 0 | format }}</td> <!-- 11 -->
                                                <td>{{ item.revenue_wo_nds / getAmountDaysOfCurrentMonth * new Date().getDate() || 0 | format }}</td> <!-- 12 -->
                                                <td>{{ item.revenue_current_fact || 0 | format }}</td> <!-- 13 -->
                                                <td>{{ item.revenue_current_fact / item.revenue_current_plan * 100 || 0 | format }} %</td> <!-- 14 -->
                                                <td>
                                                    {{ item.revenue_current_fact / (item.revenue_wo_nds / getAmountDaysOfCurrentMonth * new Date().getDate()) * 100 || 0 |
            format }} %
                                                </td> <!-- 15 -->
                                                <td>{{ item.revenue_current_fact / item.revenue_wo_nds * 100 || 0 | format }} %</td> <!-- 16 -->
                                            </tr>
                                            <tr class="Row_grey">
                                                 <td>Итого</td>
                                                <td>{{ totalVolumeBP | format }}</td>
                                                <td>{{ totalMetric | format }}</td>
                                                <td>{{ totalVolumeBP / getAmountDaysOfCurrentMonth * new  Date().getDate() || 0 | format }}</td>
                                                <td>{{ totalMetricCurrentPlan | format }}</td>
                                                <td>{{ totalMetricCurrentFact | format }}</td>
                                                <td>{{ totalMetricCurrentFact / totalVolumeBP * 100  || 0| format }} %</td>
                                        <!-- 7 --><td>{{ totalMetricCurrentFact / totalMetricCurrentPlan * 100 || 0| format }} %</td>  
                                                <td>{{ totalMetricCurrentFact / totalMetric * 100 || 0 | format }} %</td>
                                    <!-- 9-->   <td>{{ totalMetricRevenue_wo_nds_bp | format}}</td>
                                       <!-- 10-->          <td>{{ totalRevenueWithoutNDS | format }}</td>
                                       <!-- 11-->          <td>{{ totalRevenueCurrentPlan | format }}</td>
                                       <!-- 12-->          <td>{{ totalRevenueWithoutNDS / getAmountDaysOfCurrentMonth * new  Date().getDate() || 0 | format }}</td>
                                        <!-- 13-->         <td>{{ totalRevenueCurrentFact  | format }}</td>
                                       <!-- 14-->          <td>{{ totalRevenueCurrentFact / totalRevenueCurrentPlan * 100 || 0 | format }} %</td>
                                       <!-- 15-->          <td>{{ totalRevenueCurrentFact / totalRevenueWithoutNDS / getAmountDaysOfCurrentMonth * new  Date().getDate() * 100 || 0 | format }} %</td>
                                    <!-- 16-->         <td>{{totalRevenueCurrentFact / totalRevenueWithoutNDS * 100 || 0 | format }} %</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </b-card-text>
                        </b-tab>
                        <b-tab title="Маржинальная доходность">
                            <b-card-text>
                                <marginIncomeVue
                                @stateLoader="stateLoader" />
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
                                        <div style="flex-direction: column">
                                            <select v-model="typeData" style="width: 20vw !important">
                                                <option value="income" disabled>Загрузка доходности</option>
                                                <option value="plan">Загрузка Бизнес-плана</option>
                                            </select>
                                            <br>
                                            <br>
                                            <select v-model="wagon_type" style="width: 20vw !important">
                                                <option value="Полувагон">Полувагон</option>
                                                <option value="Цистерна">Цистерна</option>
                                            </select>
                                            <br>
                                            <br>
                                            <label for="">
                                                Дата <br>
                                                <input type="month" v-model="date_begin_create" class="textarea"
                                                    style="background: white;width: 20vw !important ">
                                            </label>
                                            <br> <br>
                                            <!-- <label>Клиент <br>
                                                <v-select v-model="currentClientsForExcelFile" :options="clients"
                                                    label="value" style="width:20vw !important;"></v-select>
                                            </label> -->
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
                                        <enterDataIncomeVue :createNewProfitability="createNewProfitability"
                                            :clients="name_client" :tableData="tableData"
                                            @update:tableData="tableData = $event"
                                            :date_begin_create="date_begin_create" :wagon_type="wagon_type"
                                            @stateLoader="stateLoader">
                                        </enterDataIncomeVue>
                                    </div>

                                </div>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>

        </div>
    </div>
</template>


<script>
import Periods from "../../ManagmentRepReporting/Periods.vue";
import api from '@/api/directory'
import Loader from "@/components/loader/loader.vue";
import vSelect from "vue-select";
import Handsontable from "handsontable";
import marginIncomeVue from './marginIncome.vue';
import enterDataIncomeVue from './enterDataIncome.vue';
import { mapState } from "vuex";
export default {
    components: { Periods, Loader, vSelect, marginIncomeVue, enterDataIncomeVue },
    data() {
        return {
            excelData: "",
            hot: "",
            tableData: [],
            currentClientsForExcelFile: "",
            wagon_type: "Полувагон",
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
            typeData: 'plan',
            responseServerDataBP: "",
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
                client: "",
                product: "",
                destination: "",
                revenue_wo_nds: 0,
                volume: 0,
                tariff_empty: 0,
                tariff_inroad: 0,
                tariff_loaded: 0,
                add_services: 0,
                other_charges: 0,
                md_wo_penalties: 0,
                vagonosutki: 0,
                vagonosutki_work_test: 0,
                income_wo_penalties: 0,
                income_w_penalties: 0,

            },



        }
    },
    filters: {
        format(value) {
            if (value != "" && !!value) {
                if (Number.isFinite(value)) {
                    let TwoSignNum = value?.toFixed(0)
                    return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
                } else {
                    return 0;
                }

            }
            return value

        },
    },

    computed: {
        ...mapState({
            name_client: (state) => state.client.name_client,

        }),
        getAmountDaysOfCurrentMonth() {
            return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        },
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
        totalVolumeBP() {
    if (this.responseServerData.report && this.responseServerData.report.length > 0) {
        return this.filteredReportData.reduce((sum, item) => {
            // Проверяем, есть ли значение volume_bp и не пустое ли оно
            if (item.volume_bp !== undefined && item.volume_bp !== "") {
                // Преобразуем значение в число, если оно не пустое
                const volume = parseFloat(item.volume_bp);
                // Проверяем, является ли volume числом
                if (!isNaN(volume)) {
                    // Если все в порядке, добавляем его к сумме
                    return sum + volume;
                }
            }
            // Возвращаем текущую сумму без изменений, если volume_bp не существует или пусто
            return sum;
        }, 0);
    } else {
        return 0;
    }
},
        totalMetric() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {

                return this.filteredReportData.reduce((sum, item) => sum + item.metric, 0);
            } else {
                return 0
            }
        },
        totalMetricRevenue_wo_nds_bp() {
            if (this.responseServerData.report && this.responseServerData.report.length > 0) {
        return this.filteredReportData.reduce((sum, item) => {
            // Проверяем, есть ли значение revenue_wo_nds_bp и не пустое ли оно
            if (item.revenue_wo_nds_bp !== undefined && item.revenue_wo_nds_bp !== "") {
                // Преобразуем значение в число, если оно не пустое
                const volume = parseFloat(item.revenue_wo_nds_bp);
                // Проверяем, является ли volume числом
                if (!isNaN(volume)) {
                    // Если все в порядке, добавляем его к сумме
                    return sum + volume;
                }
            }
            // Возвращаем текущую сумму без изменений, если volume_bp не существует или пусто
                    return sum;
                }, 0);
            } else {
                return 0;
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

        stateLoader(val) {
            this.loader = val
        },
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

        Actioned() {
            try {

                let data = this.currentClients.map((item) => {
                    return { client: item.client }
                })
                const clientsParams = data.map((item) => `clients=${item.client}`).join('&');

                // Формируем строку запроса с параметрами clients
                const queryString = `?wagon_type=${this.wag_type}&report_date=${this.date_begin}&${clientsParams}`;
                this.loader = true
                Promise.all([api.getDataForOperSpravka(queryString), api.getDataForOperSpravkaOtherClients(queryString), api.getBP(queryString)])
                    .then(([response1, response2, response3]) => {
                        this.loader = false
                        this.responseServerData = response1.data
                        // console.log(this.responseServerData)
                        this.responseServerDataOtherClients = response2.data
                        let businessPlanData = response3.data
                        console.log(businessPlanData)
                        this.responseServerData.report.forEach(item => {
                            // Проходимся по ключам первого массива
                            Object.keys(businessPlanData).forEach(key => {
                                // Если ключ из первого массива соответствует значению клиента во втором массиве
                                if (item.client === key) {
                                    // Добавляем объем и выручку из первого массива, переименовывая их
                                    item.volume_bp = businessPlanData[key].volume;
                                    item.revenue_wo_nds_bp = businessPlanData[key].revenue_wo_nds;

                                }
                            });
                        });



                        //     {
                        //     "client": "ТАТНЕФТЬ-ТРАНС, ООО",
                        //     "metric": 193680,
                        //     "metric_current_plan": 174936.7741935484,
                        //     "metric_current_fact": 155863.91800000015,
                        //     "metric_complete_abs": 19072.856193548243,
                        //     "metric_complete_rel": 89.09728598719545,
                        //     "revenue_wo_nds": 515925246.95,
                        //     "revenue_current_plan": 449354247.34354836,
                        //     "revenue_current_fact": 395789558.79599994,
                        //     "revenue_complete_abs": 53564688.54754841,
                        //     "revenue_complete_rel": 88.0796300771146,
                        //     "volume_bp": 193680,
                        //     "revenue_wo_nds_bp": 0
                        // }

                        //                         {
                        //     "volume": 193680,
                        //     "loadings_amount": 0,
                        //     "revenue_wo_nds": 0,
                        //     "tariff_loaded": 0,
                        //     "tariff_empty": 211368384.4565,
                        //     "tariff_inroad": 0,
                        //     "exp_charges": 0,
                        //     "prepare": 0,
                        //     "add_services": 2530681.80788,
                        //     "other_services": 0,
                        //     "vagonosutki": 96954.536018,
                        //     "md_wo_penalties": 287935086.9674,
                        //     "penalties": 0,
                        //     "md_w_penalties": 0,
                        //     "income_wo_penalties": 82915.634159,
                        //     "income_w_penalties": 92587.91296300002,
                        //     "income_wo_prepre": 0
                        // }
                        console.log(this.responseServerData.report);
                        const clients = this.responseServerData.report.map(item => item.client)
                        this.responseServerData
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

th {
    /* white-space: nowrap; */
    font-size: 12px;
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
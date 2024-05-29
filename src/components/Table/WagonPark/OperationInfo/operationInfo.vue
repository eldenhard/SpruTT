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

                <button class="Accept button" @click="Actioned()" style="width:20vw !important; height: 40px;">Загрузить данные</button>

            </div>
            <div>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Выполнение плана" active>
                            <b-card-text>
                                <!-- <pre>{{filteredReportData}}</pre> -->
                                <div style="overflow: auto; margin-left: -5%;">
                                    <button class="Request button" style="width: 20%; margin-left: auto" @click="downloadTableToExcel()">Скачать в Excel</button>
                                    <table ref="theTableOperIncome">
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
                                           <template v-if="wag_type =='Цистерна'">

                                            <tr v-for="item, index in filteredReportData" :key="index">
                                                <td>{{ item.client }}</td>
                                                <td>{{ item.volume_bp || 0 | format }}</td> 
                                                <td>{{ item.metric | format }}</td> 
                                                <td>{{ (item.volume_bp || 0) / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) | format }}</td> 
                                                <td>{{ item.metric_current_plan | format }}</td>
                                                <td>{{ item.metric_current_fact | format }}</td>
                                                <td>{{ item.metric_current_fact / item.volume_bp * 100 || 0 | format }}%</td>
                                                <td>{{ item.metric_current_fact / item.metric_current_plan * 100 || 0 | format }} % </td>
                                                <td>{{ item.metric_current_fact / item.metric * 100 || 0 | format }} %
                                                </td> 
                                                <td>{{ item.revenue_wo_nds_bp | format }}</td> 
                                                <td>{{ item.revenue_wo_nds | format }}</td>
                                                <td>{{ item.revenue_current_plan | format }}</td> 
                                                <td>{{ item.revenue_wo_nds / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) | format }}</td> 
                                                <td>{{ item.revenue_current_fact | format }}</td> 
                                                <td>{{ item.revenue_current_fact / item.revenue_current_plan * 100 || 0 | format }} %</td>
                                                <td>
                                                    {{ item.revenue_current_fact / (item.revenue_wo_nds / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8))) * 100 | format }}
                                                    %
                                                </td> 
                                                <td>{{ item.revenue_current_fact / item.revenue_wo_nds * 100 || 0 |  format }} %</td>
                                            </tr>
                                            <tr v-for="item in totalResponse2" :key="item.id">
                                                <td>Прочие</td>
                                                <td>{{ item.volume_bp || 0 | format }}</td> <!-- 1  -->
                                                <td>{{ item.metric || 0 | format }}</td> <!-- 2
-->
                                                <td>{{ item.volume_bp / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) || 0 | format }}</td> <!-- 3
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
                                                <td>{{ item.revenue_wo_nds / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) || 0 | format }}</td> <!-- 12 -->
                                                <td>{{ item.revenue_current_fact || 0 | format }}</td> <!-- 13 -->
                                                <td>{{ item.revenue_current_fact / item.revenue_current_plan * 100 || 0 | format }} %</td> <!-- 14 -->
                                                <td>
                                                    {{ item.revenue_current_fact / (item.revenue_wo_nds / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8))) * 100 || 0 |
            format }} %
                                                </td> <!-- 15 -->
                                                <td>{{ item.revenue_current_fact / item.revenue_wo_nds * 100 || 0 | format }} %</td> <!-- 16 -->
                                            </tr>
                                            <tr class="Row_grey">
                                                 <td>Итого</td>
                                                <td>{{ totalVolumeBP | format }}</td>
                                                <td>{{ totalMetric | format }}</td>
                                                <td>{{ totalVolumeBP / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) || 0 | format }}</td>
                                                <td>{{ totalMetricCurrentPlan | format }}</td>
                                                <td>{{ totalMetricCurrentFact | format }}</td>
                                                <td>{{ totalMetricCurrentFact / totalVolumeBP * 100  || 0| format }} %</td>
                                                <td>{{ totalMetricCurrentFact / totalMetricCurrentPlan * 100 || 0| format }} %</td>  
                                                <td>{{ totalMetricCurrentFact / totalMetric * 100 || 0 | format }} %</td>
                                       <td>{{ totalMetricRevenue_wo_nds_bp | format}}</td>
                                                <td>{{ totalRevenueWithoutNDS | format }}</td>
                                             <td>{{ totalRevenueCurrentPlan | format }}</td>
                                            <td>{{ totalRevenueWithoutNDS / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) || 0 | format }}</td>
                                              <td>{{ totalRevenueCurrentFact  | format }}</td>
                                                <td>{{ totalRevenueCurrentFact / totalRevenueCurrentPlan * 100 || 0 | format }} %</td>
                                            <td>{{ totalRevenueCurrentFact / totalRevenueWithoutNDS / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) * 100 || 0 | format }} %</td>
                                          <td>{{totalRevenueCurrentFact / totalRevenueWithoutNDS * 100 || 0 | format }} %</td>
                                            </tr>
                                            </template>



                                            <template v-else>
                                                <tr v-for="item, index in filteredReportData" :key="index">
            <td>{{ item.client }}</td>
            <td>{{ item.loading_amount || 0 | format }}</td> 
            <td>{{ item.metric | format }}</td> 
            <td>{{ (item.loading_amount || 0) / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) | format }}</td> 
            <td>{{ item.metric_current_plan | format }}</td>
            <td>{{ item.metric_current_fact | format }}</td>
            <td>{{ item.metric_current_fact / item.loading_amount * 100 || 0 | format }}%</td>
            <td>{{ item.metric_current_fact / item.metric_current_plan * 100 || 0 | format }} % </td>
            <td>{{ item.metric_current_fact / item.metric * 100 || 0 | format }} %
            </td> 
            <td>{{ item.revenue_wo_nds_bp | format }}</td> 
            <td>{{ item.revenue_wo_nds | format }}</td>
            <td>{{ item.revenue_current_plan | format }}</td> 
            <td>{{ item.revenue_wo_nds / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) | format }}</td> 
            <td>{{ item.revenue_current_fact | format }}</td> 
            <td>{{ item.revenue_current_fact / item.revenue_current_plan * 100 || 0 | format }} %</td>
            <td>
                {{ item.revenue_current_fact / (item.revenue_wo_nds / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8))) * 100 | format }}
                %
            </td> 
            <td>{{ item.revenue_current_fact / item.revenue_wo_nds * 100 || 0 |  format }} %</td>
                                            </tr>
                                            <tr v-for="item in totalResponse2" :key="item.id">
                                                <td>Прочие</td>
                                                <td>{{ item.loading_amount || 0 | format }}</td> <!-- 1  -->
                                                <td>{{ item.metric || 0 | format }}</td> <!-- 2
-->
                                                <td>{{ item.loading_amount / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) || 0 | format }}</td> <!-- 3
-->
                                                <td>{{ item.metric_current_plan || 0 | format }}</td> <!-- 4
-->
                                                <td>{{ item.metric_current_fact || 0 | format }}</td> <!-- 5
-->
                                                <td>{{ item.metric_current_fact / item.loading_amount * 100 || 0 | format }}
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
                                                <td>{{ item.revenue_wo_nds / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) || 0 | format }}</td> <!-- 12 -->
                                                <td>{{ item.revenue_current_fact || 0 | format }}</td> <!-- 13 -->
                                                <td>{{ item.revenue_current_fact / item.revenue_current_plan * 100 || 0 | format }} %</td> <!-- 14 -->
                                                <td>
                                                    {{ item.revenue_current_fact / (item.revenue_wo_nds / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8))) * 100 || 0 |
            format }} %
                                                </td> <!-- 15 -->
                                                <td>{{ item.revenue_current_fact / item.revenue_wo_nds * 100 || 0 | format }} %</td> <!-- 16 -->
                                            </tr>
                                            <tr class="Row_grey">
                                                 <td>Итого</td>
                                                <td>{{ totalLoadingsAmount | format }}</td>
                                                <td>{{ totalMetric | format }}</td>
                                                <td>{{ totalLoadingsAmount / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) || 0 | format }}</td>
                                                <td>{{ totalMetricCurrentPlan | format }}</td>
                                                <td>{{ totalMetricCurrentFact | format }}</td>
                                                <td>{{ totalMetricCurrentFact / totalLoadingsAmount * 100  || 0| format }} %</td>
                                                <td>{{ totalMetricCurrentFact / totalMetricCurrentPlan * 100 || 0| format }} %</td>  
                                                <td>{{ totalMetricCurrentFact / totalMetric * 100 || 0 | format }} %</td>
                                       <td>{{ totalMetricRevenue_wo_nds_bp | format}}</td>
                                                <td>{{ totalRevenueWithoutNDS | format }}</td>
                                             <td>{{ totalRevenueCurrentPlan | format }}</td>
                                            <td>{{ totalRevenueWithoutNDS / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) || 0 | format }}</td>
                                              <td>{{ totalRevenueCurrentFact  | format }}</td>
                                                <td>{{ totalRevenueCurrentFact / totalRevenueCurrentPlan * 100 || 0 | format }} %</td>
                                            <td>{{ totalRevenueCurrentFact / totalRevenueWithoutNDS / getAmountDaysOfCurrentMonth * Number(date_begin.slice(8)) * 100 || 0 | format }} %</td>
                                          <td>{{totalRevenueCurrentFact / totalRevenueWithoutNDS * 100 || 0 | format }} %</td>
                                            </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>

                            </b-card-text>
                        </b-tab>
                        <b-tab >
                            <template #title>
                                <b-spinner type="border" v-if="startLoaderChildComponent" small></b-spinner> Маржинальная доходность
                            </template>
                            <b-card-text>
                                <marginIncomeVue
                                    @stateLoader="stateLoader" 
                                    @startLoaderFromChildComponent="startLoaderFromChildComponent"
                                    :margin_income_data="responseServerData"
                                    :bp_data="data3"
                                    :budget_data="budget_data"
                                />
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
                        <b-tab title="Графики">
                            <b-card-text>
                                <chartOperationInfoVue 
                                :column_chart_data_BP="totalVolumeBP"
                                :column_chart_data_B="totalMetric"
                                :column_chart_data_plan="totalMetricCurrentPlan"
                                :column_chart_pie="filteredReportData"
                                />
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Внесение данных доходности">
                            <b-card-text>
                                <div class="date_block">
                                    <div class="filter_b">
                                        <div style="flex-direction: column">
                                            <select v-model="typeData" style="width: 20vw !important">
                                                <option value="income">Загрузка бюджета</option>
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
                                        <div class="download_excel" >
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


                                    <div  style="overflow: auto">
                                        <enterDataIncomeVue :createNewProfitability="createNewProfitability"
                                            :clients="name_client" 
                                            :tableData="tableData"
                                            :typeData="typeData"
                                            @update:tableData="tableData = $event"
                                            :date_begin="date_begin_create" 
                                            :wagon_type="wagon_type"
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
// import chartOperationInfo from './chartOperationInfo.vue';
import chartOperationInfoVue from './chartOperationInfo.vue';
import cp_work_names from './testData.js'

export default {
    components: { Periods, Loader, vSelect, marginIncomeVue, enterDataIncomeVue, chartOperationInfoVue },
    data() {
        return {
            excelData: "",
            budget_data: "",
            hot: "",
            tableData: [],
            currentClientsForExcelFile: "",
            wagon_type: "Полувагон",
            wag_type: "Полувагон",
            date_begin: new Date().toISOString().slice(0, 10),
            date_begin_create: "",
            date_end: "",
            loader: false,
            responseServerData: "",
            responseServerDataOtherClients: "",
            selectedOptions: "",
            allClientsInTable: [],
            currentClients: [],
            typeData: 'plan',
            responseServerDataBP: "",
            data3: "",
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
            startLoaderChildComponent: false,
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
            const dateString = this.date_begin;
            // Разбиваем строку даты на год, месяц и день
            const [year, month] = dateString.split("-").map(Number);

            // Создаем новый объект Date с первым днем следующего месяца и днем 0 текущего месяца
            const lastDayOfMonth = new Date(year, month, 0);
            console.log(lastDayOfMonth.getDate())
            // Получаем день месяца (количество дней в месяце)
          return lastDayOfMonth.getDate();

        },
        filteredReportData() {
            if (this.selectedOptions.length == 0) {
                console.log(this.selectedOptions.report, 'report')
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
            console.log(sum, 'totalVolumeBP')
            // Возвращаем текущую сумму без изменений, если volume_bp не существует или пусто
            return sum;
        }, 0);
    } else {
        return 0;
    }
},
totalLoadingsAmount() {
    if (this.responseServerData.report && this.responseServerData.report.length > 0) {
        return this.filteredReportData.reduce((sum, item) => {
            // Проверяем, есть ли значение loading_amount и не пустое ли оно
            if (item.loading_amount !== undefined && item.loading_amount !== "") {
                // Преобразуем значение в число, если оно не пустое
                const volume = parseFloat(item.loading_amount);
                // Проверяем, является ли volume числом
                if (!isNaN(volume)) {
                    // Если все в порядке, добавляем его к сумме
                    return sum + volume;
                }
            }
            console.log(sum, 'loading_amount')
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
        date_begin_create() {
            console.log(this.date_begin_create)  
        },
        wag_type() {
            this.responseServerData = ""
        },

    },
    methods: {

        stateLoader(val) {
            this.loader = val
        },
        startLoaderFromChildComponent(val){
            this.startLoaderChildComponent = val
        },
        downloadTableToExcel() {
            var table = this.$refs.theTableOperIncome;
            var tableHTML = table.outerHTML;
            var fileName = "Таблица 'Оперативная справка'.xls";

            // var msie = window.navigator.userAgent.indexOf("MSIE ");

            var a = document.createElement("a");
            tableHTML = tableHTML.replace(/  /g, "").replace(/ /g, "%20");
            a.href = "data:application/vnd.ms-excel," + tableHTML;
            a.setAttribute("download", fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
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
                this.responseServerData = ""
                let data = this.currentClients.map((item) => {
                    return { client: item.client }
                })
                const clientsParams = data.map((item) => `clients=${item.client}`).join('&');
                let dateBeginChange = this.date_begin.slice(0,-2)
                // Формируем строку запроса с параметрами clients
                const queryString = `?wagon_type=${this.wag_type}&report_date=${this.date_begin}&${clientsParams}`;
                this.loader = true
                Promise.all([
                api.getDataForOperSpravka(queryString),
                api.getDataForOperSpravkaOtherClients(queryString),
                api.getBP(queryString), 
                api.getBusinessPlan(this.wag_type, dateBeginChange+'01'),
                api.getBudget(this.wag_type, dateBeginChange+'01'),

                ])
                    .then(([
                        response1, 
                        response2, 
                        response3,
                        response4, 
                        response5]) => {
                        this.loader = false
                        this.responseServerData =   response1.data

                        this.responseServerDataOtherClients = response2.data
                        let businessPlanData = response3.data
                        this.data3 =  response4.data
                        this.budget_data = response5.data
                       
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

                        console.log(this.responseServerData.report);
                        const clients = this.responseServerData.report.map(item => item.client)
                        this.responseServerData
                        this.allClientsInTable = clients.reduce((acc, client) => {
                            if (!acc.find(item => item.value === client)) {
                                acc.push({ value: client, label: client })
                            }
                            return acc
                        }, []).sort((a, b) => a.value.localeCompare(b.value))
                        this.$toast.info(`Успешно\nДанные для Оперативной справки получены\nПродолжается загрузка данных для Маржинальной доходности`, {
                            timeout: 8500
                        })
                    })
                    .catch(error => {
                     
                        this.$toast.error(`Ошибка\nДанные не получены\n${error.response.data?.detail}`, {
                            timeout: 2500
                        })
                        this.loader = false
                    })
                    .finally(() => {
                        this.loader = false
                    })

            } catch(error) {
                    this.$toast.error(`Ошибка\nДанные не получены\n${error.response.data?.detail}`, {
                                timeout: 2500
                    })
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
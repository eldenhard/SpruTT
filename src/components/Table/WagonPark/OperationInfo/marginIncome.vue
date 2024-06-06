<template>
    <section>
        <!-- <div class="filter_b">

            <label for="">
                Дата для БП<br>
                <input type="month" v-model="date_begin_create" class="textarea" style="background: white;width: 20vw ">
            </label>
            <p>Данные будут выведены в консоль</p>
            <br>
            <button class="Accept button" style="width: 20vw; margin-top: 4%;" @click="getBPData()">Запросить</button>

        </div> -->
        <button class="Request button" style="width: 20%; margin-left: auto" @click="downloadExcel()">Скачать в
            Excel</button>
        <!-- <button @click=getFines()>fines</button> -->
        <br>
        <table>

        </table>
        <div class="Container Flipped" ref="tableContainer">
            <div class="Content" ref="scrollTableContent">
                <table ref="theTable">
                    <thead>
                        <tr class="TableHeader">
                            <th rowspan="2">Клиент</th>
                            <th rowspan="2">Отправление</th>
                            <th rowspan="2">Груз</th>
                            <th rowspan="2">Назначение</th>
                            <th colspan="5">Объем</th>
                            <th colspan="5">Выручка (без штрафов)</th>
                            <th colspan="5">МД (без штрафов)</th>
                            <th colspan="2">Стат нагрузка</th>
                            <th colspan="2">Оборот</th>
                            <th colspan="2">Штрафы</th>
                            <th colspan="10">Доходность</th>
                        </tr>
                        <tr class="TableHeader">
                            <th>БП</th>
                            <th>Б</th>
                            <th>Факт</th>
                            <th>Откл. БП</th>
                            <th>Откл. Б</th>

                            <th>БП</th>
                            <th>Б</th>
                            <th>Факт</th>
                            <th>Откл. БП</th>
                            <th>Откл. Б</th>

                            <th>БП</th>
                            <th>Б</th>
                            <th>Факт</th>
                            <th>Откл. БП</th>
                            <th>Откл. Б</th>

                            <th>План</th>
                            <th>Факт</th>

                            <th>План</th>
                            <th>Факт</th>

                            <th>План</th>
                            <th>Факт</th>

                            <th>План(без штр) БП</th>
                            <th>План(без штр) Б</th>
                            <th>Факт(без штр)</th>
                            <th>План (со штр) БП</th>
                            <th>План (со штр) Б</th>
                            <th>Факт (со штр)</th>
                            <th>+/- БП(без штр)</th>
                            <th>+/- Б(без штр)</th>
                            <th>+/- БП(со штр)</th>
                            <th>+/- Б(со штр)</th>

                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in businessPlanData">
                            <tr :key='`${item.client}_${index}_${Math.random() * 100}`' v-if="index !== 'revenue'
                                || index !== 'weight'
                                || index !== 'volume'
                                || index !== 'aid'
                                || index !== 'shipments'
                                || index !== 'amo'
                                || index !== 'empty_tariff'
                                || index !== 'fot'
                                || index !== 'loaded_tariff'
                                || index !== 'margin_income'
                                || index !== 'other_charges'
                                || index !== 'pps'
                                || index !== 'repair'
                                || index !== 'vagonosutki'"
                                :class="{ Total_1: item.client.includes('Итого'), Total_grey: item.client.includes('Прочие') }"
                                @click="toggleRow(index)">

                                <td>
                                    <b-icon :icon="item.expanded ? 'x-square-fill' : 'plus-square'" aria-hidden="true"
                                        style="position: absolute; left: 10px; margin-top: 5px;"
                                        v-if="item.station_group"></b-icon>
                                    {{ item.client }}
                                </td>
                                <td></td>
                                <td>{{ item.product }}</td>
                                <td>{{ item.destination }}</td>
                                <td>{{ item.volume | format }}</td>
                                <td>{{ item.volume_budget | format }}</td>
                                <td>{{ item.total_volume_fact || calculateTotalVolume(item.station_group, 'weight') |
                                    format }}</td>
                                <td>{{ item.client.includes('Итого') ? item.total_volume_fact - item.volume :
                                    (isNaN(calculateTotalVolume(item.station_group, 'weight') - item.volume) ? 0 :
                                        calculateTotalVolume(item.station_group, 'weight') - item.volume) | format }}</td>
                                <td>{{ item.client.includes('Итого') ? item.total_volume_fact - item.volume_budget :
                                    (isNaN(calculateTotalVolume(item.station_group, 'weight') - item.volume_budget)) ? 0
                                        :
                                        (calculateTotalVolume(item.station_group, 'weight') - item.volume_budget) | format
                                    }}
                                </td>
                                <td>{{ item.revenue_wo_nds ?? 0 | format }}</td>
                                <td>{{ item.revenue_wo_nds_budget ?? 0 | format }}</td>
                                <td>{{ item.total_revenue_fact || calculateTotalVolume(item.station_group, 'revenue') |
                                    format }}</td>
                                <!-- Отклонение -->
                                <td>
                                    {{ item.client.includes('Итого') ?
                                        item.total_revenue_fact - item.revenue_wo_nds
                                        :
                                        (calculateTotalVolume(item.station_group, 'revenue') - item.revenue_wo_nds) ?? 0 |
                                        format
                                    }}
                                </td>
                                <td>
                                    {{ item.client.includes('Итого') ?
                                        item.total_revenue_fact - item.revenue_wo_nds_budget
                                        :
                                        (calculateTotalVolume(item.station_group, 'revenue') - item.revenue_wo_nds_budget)
                                        ??
                                        0 |
                                        format
                                    }}
                                </td>
                                <td>{{ item.md_wo_penalties ?? 0 | format }}</td>
                                <td>{{ item.md_wo_penalties_budget ?? 0 | format }}</td>
                                <td>{{ item.total_md_wo_penalties_fact ||
                                    calculateTotalVolume(item.station_group, 'margin_income') | format }}</td>
                                <!-- Отклонение -->
                                <td>{{
                                    item.client.includes('Итого') ? item.total_md_wo_penalties_fact -
                                        item.md_wo_penalties :
                                        (calculateTotalVolume(item.station_group, 'margin_income') - item.md_wo_penalties)
                                        ?? 0 |
                                        format
                                }}
                                </td>
                                <td>
                                    {{ item.client.includes('Итого') ?
                                        item.total_md_wo_penalties_fact - item.md_wo_penalties_budget
                                        :
                                        (calculateTotalVolume(item.station_group, 'revenue') -
                                            item.md_wo_penalties_budget) ?? 0
                                        | format
                                    }}
                                </td>
                                <!-- Стат нагрузка ПЛАН -->
                                <td>
                                    <!-- {{calculateTotalVolume(item.station_group, 'aid') == 0 
        ? 0 : 
     calculateTotalVolume(item.station_group, 'volume_budget') / calculateTotalVolume(item.station_group, 'aid') | format }} -->
                                </td>
                                <!-- Стат нагрузка ФАКТ -->
                                <td v-if="!item.client.includes('Итого')">{{ calculateTotalVolume(item.station_group,
                                    'aid') == 0 ? 0 :
                                    sumStatNagruzka(item.station_group) ?? 0 | format }}</td>
                                <td v-else>{{ item.total_stat_nagr_fact | format }} </td>
                                <td></td>
                                <!-- Оборот -->
                                <td v-if="!item.client.includes('Итого')">{{ calculateTotalVolume(item.station_group,
                                    'aid') == 0 ? 0 :
                                    sumOborot(item.station_group) ?? 0 | format }}</td>
                                <td v-else>{{ item.total_oborot_fact | format }} </td>


                                <!-- Факты -->
                                <td>{{ item.plan_total | format }} </td>

                                <td>{{ item.total | format }}
                                </td>

                                <!-- Факты -->

                                <!-- Доходность -->
                                <!-- План(без штр) БП -->
                                <td>{{ item.income_wo_penalties ?? 0 | format }}   </td>
                                <!-- План(без штр) Б	 -->
                                <td>{{ item.income_wo_penalties_budget ?? 0 | format }}  </td>
                                <!-- Факт(без штр) -->
                                <td v-if="!item.client.includes('Итого')">{{ 
                                calculateTotalVolume(item.station_group,'vagonosutki_total') == 0 ? 0 :
                                    calculateTotalVolume(item.station_group, 'margin_income') /
                                    calculateTotalVolume(item.station_group, 'vagonosutki_total') | format }}

                                </td>
                                <td v-else>
                                    {{ item.total_vagonosutki == 0 ? 0 : item.total_md_wo_penalties_fact /
                                    item.total_vagonosutki | format}}

                                </td>
                                <!-- План (со штр) БП	 -->
                                <td>{{ item.income_w_penalties | format }} </td>

                                <!-- План (со штр) Б	 -->
                                <td>{{ item.income_w_penalties_budget | format }}</td>
                                <!-- Факт (со штр)	 -->
                                <td v-if="!item.client.includes('Итого')">
                                    {{ calculateTotalVolume(item.station_group, 'vagonosutki_total') == 0 ? 0 :
                                        ((item.total_revenue_fact || calculateTotalVolume(item.station_group, 'margin_income')) + item.total) / calculateTotalVolume(item.station_group, 'vagonosutki_total') | format
                                    }}
<!--  -->
                                </td>
                                <td v-else>
                                    {{ (item.total_md_wo_penalties_fact + item.total) / item.total_vagonosutki | format }}

                                </td>

                                <!-- +/- БП(без штр) -->
                                <td v-if="!item.client.includes('Итого') && !item.client.includes('Прочие')">{{
                                    sumMarginIncomePerVagonosutki(item.station_group) - item.income_wo_penalties || 0|
                                    format }}</td>
                                <td v-if="item.client.includes('Прочие')">
                                    {{ calculateTotalVolume(item.station_group, 'vagonosutki_total') == 0 ? 0 :
                                        item.income_wo_penalties - calculateTotalVolume(item.station_group, 'margin_income')
                                        /
                                        calculateTotalVolume(item.station_group, 'vagonosutki_total') || 0 | format }}
                                </td>
                                <td v-if="item.client.includes('Итого')">{{
                                    item.total_vagonosutki == 0 ? sumMarginIncomePerVagonosutki(item.station_group) -
                                        item.income_wo_penalties : item.total_md_wo_penalties_fact / item.total_vagonosutki
                                        - item.income_wo_penalties || 0| format }}
                                </td>

                                <!-- +/- Б(без штр) -->
                                <td v-if="!item.client.includes('Итого') && !item.client.includes('Прочие')">{{
                                    sumMarginIncomePerVagonosutki(item.station_group) - item.income_wo_penalties_budget
                                    || 0| format }}</td>
                                <td v-if="item.client.includes('Прочие')">
                                    {{ calculateTotalVolume(item.station_group, 'vagonosutki_total') == 0 ? 0 :
                                        item.income_wo_penalties_budget - calculateTotalVolume(item.station_group,
                                            'margin_income') /
                                        calculateTotalVolume(item.station_group, 'vagonosutki_total') || 0 | format }}
                                </td>
                                <td v-if="item.client.includes('Итого')">{{
                                    item.total_vagonosutki == 0 ? sumMarginIncomePerVagonosutki(item.station_group) -
                                        item.income_wo_penalties_budget : item.total_md_wo_penalties_fact /
                                        item.total_vagonosutki - item.income_wo_penalties_budget || 0| format }}
                                </td>

                                <!-- +/- БП(со штр) -->
                                <td></td>
                                <!-- +/- Б(со штр) -->
                                <td></td>
                            </tr>

                            <template v-for="(value, key) in item.station_group">
                                <tr :key="`${item.client}_${key}_${Math.random() * 100}`" class="Total_blue" v-if="key !== 'revenue' && key !== 'weight' && key !== 'volume'
                                    && key !== 'amo'
                                    && key !== 'aid'
                                    && key !== 'shipments'
                                    && key !== 'empty_tariff'
                                    && key !== 'fot'
                                    && key !== 'loaded_tariff'
                                    && key !== 'margin_income'
                                    && key !== 'other_charges'
                                    && key !== 'pps'
                                    && key !== 'repair'
                                    && index !== 'vagonosutki'
                                    && key !== 'vagonosutki_empty'
                                    && key !== 'vagonosutki_total'" v-show="item.expanded">
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.station_name ?? key }}</td>
                                    <!-- наименование вложенной станции-->
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.weight | format }} </td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.revenue | format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.margin_income | format }}</td>
                                    <td style="border: 1px solid black;">{{ value.margin_income_budget | format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.aid == 0 ? 0 : value.weight /
                                        value.aid | format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.aid == 0 ? 0 : value.vagonosutki_total
                                        / value.aid | format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>

                                    <!-- Доходность -->
                                    <!-- План(без штр) БП -->
                                    <td style="border: 1px solid black;"></td>
                                    <!-- План(без штр) Б	 -->
                                    <td style="border: 1px solid black;"></td>
                                    <!-- Факт(без штр) -->
                                    <td style="border: 1px solid black;">{{ value.margin_income /
                                        value.vagonosutki_total | format }} </td>
                                    <!-- План (со штр) БП	 -->
                                    <td style="border: 1px solid black;">{{ value.income_w_penalties | format }}</td>
                                    <!-- План (со штр) Б	 -->
                                    <td style="border: 1px solid black;">{{ value.income_w_penalties_budget | format }}
                                    </td>
                                    <!-- Факт (со штр)	 -->
                                    <td style="border: 1px solid black;"></td>
                                    <!-- +/- БП(без штр) -->
                                    <td style="border: 1px solid black;"></td>
                                    <!-- +/- Б(без штр) -->
                                    <td style="border: 1px solid black;"></td>
                                    <!-- +/- БП(со штр) -->
                                    <td style="border: 1px solid black;"></td>
                                    <!-- +/- Б(со штр) -->
                                    <td style="border: 1px solid black;"></td>

                                </tr>
                            </template>

                        </template>

                    </tbody>
                </table>
            </div>
        </div>



    </section>
</template>


<script>
import api from '@/api/directory';
import apiWagon from "@/api/wagonPark";
import cp_work_names from './testData.js'
export default {
    props: ['bp_data', 'margin_income_data', 'budget_data', "date_begin", "fines_data"],
    data() {
        return {
            date_begin_create: "",
            businessPlanData: "",
            margin_income: "",
            data123: cp_work_names.cp_work_names.margin_incomes,
            memo: {},
            exampleObject: "",
            icon_type: "plus-square"

        }
    },
    computed: {
        filteredBusinessPlanData() {
            const result = [];
            for (let i = 0; i < this.businessPlanData.length; i++) {
                result.push(this.businessPlanData[i]);
                if (this.isLastClient(i)) {
                    result.push({ isTotalRow: true }); // Добавляем объект для строки "Итого"
                }
            }
            return result;
        },
    },
    mounted() {

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
    watch: {


        margin_income_data: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.getBPData();
                }
            },
            deep: true
        }
    },
    methods: {
        async getFines() {
            let response = await api.getAllFines()
            console.log(response)
        },
        toggleRow(index) {
            this.$set(this.businessPlanData[index], 'expanded', !this.businessPlanData[index].expanded);
        },
        isLastClient(index) {
            if (index === this.businessPlanData.length - 1) {
                return true; // Последний элемент
            } else {
                return this.businessPlanData[index].client !== this.businessPlanData[index + 1].client;
            }
        },

        deepVagonosutkiSum() {
            // Функция для поиска самого глубокого значения vagonosutki
            function findDeepestVagonosutki(obj) {
                let deepestVagonosutki = 0;

                function findDeepest(obj) {
                    for (let key in obj) {
                        if (typeof obj[key] === 'object') {
                            findDeepest(obj[key]); // Рекурсивный вызов для каждого вложенного объекта
                        } else if (key === 'vagonosutki_total') {
                            deepestVagonosutki += obj[key]; // Найдено значение vagonosutki, суммируем его
                        }
                    }
                }

                findDeepest(obj); // Начинаем поиск с корневого объекта

                return deepestVagonosutki;
            }

            // Вызываем функцию для объекта
            return findDeepestVagonosutki(this.exampleObject);
        },

        downloadExcel() {
            var table = this.$refs.theTable;
            var tableHTML = table.outerHTML;
            var fileName = "Таблица 'Маржинальная доходность'.xls";

            // var msie = window.navigator.userAgent.indexOf("MSIE ");

            var a = document.createElement("a");
            tableHTML = tableHTML.replace(/  /g, "").replace(/ /g, "%20");
            a.href = "data:application/vnd.ms-excel," + tableHTML;
            a.setAttribute("download", fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        sumAmountTable(fieldName) {
            if (!this.businessPlanData) return 0
            return this.businessPlanData.reduce((total, item) => total + item[fieldName] || 0, 0)
        },

        
        // Сумма для Факт со штрафом
        calculateTotalVolume(stationGroup, type) {
            if (!stationGroup) return 0;
                return stationGroup.reduce((acc, item) => acc + (item[type] || 0), 0);
            },
            calculateTotalVolume(stationGroup, type) {
        if (!stationGroup) return 0;
        return stationGroup.reduce((acc, item) => acc + (item[type] || 0), 0);
    },
    sumTotalFactWPenalties() {
        let totalSum = 0;

        for (let item of this.businessPlanData) {
            if (!item.client.includes('Итого')) {
                const totalRevenue = item.total_revenue_fact || this.calculateTotalVolume(item.station_group, 'revenue');
                const vagonosutkiTotal = this.calculateTotalVolume(item.station_group, 'vagonosutki_total');

                if (vagonosutkiTotal !== 0) {
                    totalSum += (totalRevenue + item.total) / vagonosutkiTotal;
                }
            }
        }

        return totalSum;
    },
    sumMiddleBPandBFact(item, stationGroup) {
        let sum = 0;
        let count = 0
            for (let key in stationGroup) {
                if (stationGroup.hasOwnProperty(key)) {
                    let value = stationGroup[key];
                    if (value.income_wo_penalties_budget !== 0) {
                        count += 1
                        sum += value.income_wo_penalties_budget 
                    }
                }
            }
            return sum;
            // return income_wo_penalties_budget
    },
        sumMarginIncomePerVagonosutki(stationGroup) {
            let sum = 0;
            for (let key in stationGroup) {
                if (stationGroup.hasOwnProperty(key)) {
                    let value = stationGroup[key];
                    if (value.vagonosutki_total !== 0) {
                        sum += value.margin_income / value.vagonosutki_total;
                    }
                }
            }
            return sum;
        },
        // Расчет стат нагрузки
        sumStatNagruzka(stationGroup) {
            let sum = 0;
            for (let key in stationGroup) {
                if (stationGroup.hasOwnProperty(key)) {
                    let value = stationGroup[key];
                    if (value.aid !== 0) {
                        sum += value.weight / value.aid;
                    }
                }
            }
            return sum;
        },
        sumOborot(stationGroup) {
            let sum = 0;
            for (let key in stationGroup) {
                if (stationGroup.hasOwnProperty(key)) {
                    let value = stationGroup[key];
                    if (value.aid !== 0) {
                        sum += value.vagonosutki_total / value.aid;
                    }
                }
            }
            return sum;
        },
        returnTotalFines(stationGroup, type, test) {
            if (test == 'zero') {
                if (!stationGroup) return 0
                const valuesArray = Object.values(stationGroup)
                const totalVolume = valuesArray.reduce((acc, item) => {
                    return acc = item[type]
                }, 0)
                return totalVolume
            }
            return stationGroup[type]
        },
        calculateTotalVolume(stationGroup, type) {
            if (!stationGroup) return 0
            const valuesArray = Object.values(stationGroup)

            const totalVolume = valuesArray.reduce((acc, item) => {
                return acc + item[type]
            }, 0)
            return totalVolume
        },
        calculateTotalVolume2(stationGroup, type, vagonosutki) {
            // Проверяем, что stationGroup не равен null или undefined
            if (!stationGroup) return 0;

            // Извлекаем массив значений из объекта stationGroup
            const valuesArray = Object.values(stationGroup);

            // Инициализируем переменную для суммирования общего объема
            const totalVolume = valuesArray.reduce((acc, item) => {
                // Проверяем, что у объекта item есть необходимые свойства (type и vagonosutki) и они являются числами
                if (item && typeof item[type] === 'number' && typeof item[vagonosutki] === 'number') {
                    // Добавляем к аккумулятору значение, поделенное на vagonosutki
                    return acc + (item[type] / item[vagonosutki]);
                } else {
                    // Возвращаем аккумулятор без изменений, если объект item не содержит нужные свойства
                    return acc;
                }
            }, 0);

            // Возвращаем общий объем, округленный или в нужном формате
            return totalVolume;
        },
        async getRoadForStation(val, destination,) {
            const memoKey = `${val}_${destination}`;
            if (this.memo[memoKey]) {
                return this.memo[memoKey];
            }

            try {
                let response = await apiWagon.getCurrentStation(val);
                let roadName = response.data.data.filter(item => item.name === val)[0].road.name.slice(0, -6);
                let directory = JSON.parse(localStorage.getItem('road'));

                // Преобразование ключа roadName и всех ключей в объекте directory к нижнему регистру
                let lowerCaseRoadName = roadName.toLowerCase();
                let lowerCaseDirectory = Object.keys(directory).reduce((acc, key) => {
                    acc[key.toLowerCase()] = directory[key];
                    return acc;
                }, {});

                this.memo[memoKey] = lowerCaseDirectory[lowerCaseRoadName];

                return this.memo[memoKey];
            } catch (error) {
                console.error('Error fetching station data:', error);
                return null;
            }
        },
        mergeArrays(array1, array2) {
        array2.forEach((item2) => {
            let item1 = array1.find((item1) => (
                item1.client === item2.client &&
                item1.destination === item2.destination &&
                item1.product === item2.product
            ));

            if (item1) {
                // Обновляем существующий объект
                Object.keys(item2).forEach((key) => {
                    if (key !== 'client' && key !== 'destination' && key !== 'product') {
                        item1[`${key}_budget`] = item2[key];
                    }
                });
            } else {
                // Создаем новый объект, включая все поля из array1 с значениями по умолчанию 0
                let newItem = {
                    client: item2.client,
                    destination: item2.destination,
                    product: item2.product,
                };

                // Добавляем поля из array1 с значением 0
                Object.keys(array1[0]).forEach((key) => {
                    if (key !== 'client' && key !== 'destination' && key !== 'product') {
                        newItem[key] = 0;
                    }
                });

                // Добавляем поля из item2 как поля _budget
                Object.keys(item2).forEach((key) => {
                    if (key !== 'client' && key !== 'destination' && key !== 'product') {
                        newItem[`${key}_budget`] = item2[key];
                    }
                });

                array1.push(newItem);
            }
        });
        return array1;
    },
        // mergeArrays(array1, array2) {
        //     array2.forEach((item2) => {
        //         let item1 = array1.find((item1) => (
        //             item1.client === item2.client &&
        //             item1.destination === item2.destination &&
        //             item1.product === item2.product
        //         ));

        //         if (item1) {
        //             Object.keys(item2).forEach((key) => {
        //                 if (key !== 'client' && key !== 'destination' && key !== 'product') {
        //                     item1[`${key}_budget`] = item2[key];
        //                 }
        //             });
        //         }
        //     });
        //     return array1;
        // },
        summarizeByClient(data) {
            const summarizedData = data.reduce((acc, item) => {
                const client = item.client;

                // Проверяем, есть ли уже объект для этого клиента в аккумуляторе, если нет - создаем
                if (!acc[client]) {
                    acc[client] = {
                        volume: 0,
                        volume_budget: 0,
                        total_volume_fact: 0,
                        total_revenue_fact: 0,
                        total_md_wo_penalties_fact: 0,
                        revenue_wo_nds: 0,
                        md_wo_penalties: 0,
                        income_wo_penalties_sum: 0,
                        income_wo_penalties_count: 0,

                        revenue_wo_nds_budget: 0,
                        md_wo_penalties_budget: 0,

                        income_wo_penalties: 0,
                        income_wo_penalties_sum: 0,
                        income_wo_penalties_count: 0,

                        income_wo_penalties_budget: 0,
                        income_wo_penalties_sum_budget: 0,
                        income_wo_penalties_count_budget: 0,
                    };
                }

                // Добавляем значения из текущего элемента данных к объекту сумм для этого клиента
                acc[client].volume += item.volume;
                acc[client].total_volume_fact += this.calculateTotalVolume(item.station_group, 'weight');
                acc[client].total_revenue_fact += this.calculateTotalVolume(item.station_group, 'revenue');
                acc[client].total_md_wo_penalties_fact += this.calculateTotalVolume(item.station_group, 'margin_income');
                acc[client].revenue_wo_nds += item.revenue_wo_nds;
                acc[client].volume_budget += item.volume_budget;
                acc[client].revenue_wo_nds_budget += item.revenue_wo_nds_budget;
                acc[client].md_wo_penalties += item.md_wo_penalties;
                acc[client].md_wo_penalties_budget += item.md_wo_penalties_budget;

                // Обновляем сумму и счетчик для income_wo_penalties, если значение не равно 0
                if (item.income_wo_penalties !== 0) {
                    acc[client].income_wo_penalties_sum += item.income_wo_penalties;
                    acc[client].income_wo_penalties_count += 1;
                }
                if (item.income_wo_penalties_budget !== 0) {
                    acc[client].income_wo_penalties_sum_budget += item.income_wo_penalties_budget;
                    acc[client].income_wo_penalties_count_budget += 1;
                }
                return acc;
            }, {});

            // Вычисление среднего значения для income_wo_penalties
            Object.keys(summarizedData).forEach(client => {
                const clientData = summarizedData[client];
                if (clientData.income_wo_penalties_count > 0) {
                    clientData.income_wo_penalties = clientData.income_wo_penalties_sum / clientData.income_wo_penalties_count;
                } else {
                    clientData.income_wo_penalties = 0; // или null, если нужно
                }
            });
            Object.keys(summarizedData).forEach(client => {
                const clientData = summarizedData[client];
                if (clientData.income_wo_penalties_count_budget > 0) {
                    clientData.income_wo_penalties_budget = clientData.income_wo_penalties_sum_budget / clientData.income_wo_penalties_count_budget;
                } else {
                    clientData.income_wo_penalties_budget = 0; // или null, если нужно
                }
            });
            return summarizedData;
        },
        // Сведение некоторых грузов по короткому наименвоанию
        containsAtLeastTwoMatches(product, cargo) {
            if ((product === "Бензин" &&
                (cargo === 'Бензин моторный (автомобильный) неэтилированный' || cargo === "Бензин стабильный газовый (газолин)"
                    || cargo === 'Бензины, не поименованные в алфавите' || cargo === "Бензин для промышленных целей")) ||

                (product === "Щебень" && (cargo === 'Щебень, не поименованный в алфавите' || cargo === "Щебень гранитный"
                    || cargo === 'Щебень для балластировки железнодорожного пути' || cargo === "Щебень из гравия")) ||

                (product === "Уголь" &&
                    (cargo === 'Уголь каменный марки Г-газовый' || cargo === "Уголь каменный"
                        || cargo === 'Уголь каменный марки СС-слабоспекающийся' || cargo === "Уголь каменный марки Д" ||
                        cargo === 'Уголь каменный марки К-коксовый' || cargo === "Уголь каменный марки ОС-отощенный спекающийся"
                        || cargo === 'Уголь каменный марки Т-тощий' || cargo === "Уголь каменный марки Ж-жирный" || cargo === "Уголь каменный марки ПЖ")) ||

                (product === "Кокс" &&
                    (cargo === 'Кокс,не поименованный в алфавите' || cargo === "Кокс доменный"
                        || cargo === 'Кокс нефтяной, не поименованный в алфавите' || cargo === "Кокс нефтяной"
                        || cargo === "Кокс литейный")) ||

                (product === "Сталь" &&
                    (cargo === 'Сталь сортовая' || cargo === "Сталь листовая"
                        || cargo === 'Сталь листовая кровельная, в том числе оцинкованная')) ||

                (product === "Металл" &&
                    (cargo === 'Прокат черных металлов, не поименованный в алфавите' || cargo === "Рельсы металлические новые, не поименованные в алфавите"
                        || cargo === 'Катанка стальная' || cargo === "Заготовка для переката качественная" ||
                        cargo === 'Сталь сортовая' || cargo === "Штрипсы листовые"
                        || cargo === 'Балки и швеллеры N 10-12' || cargo === "Сталь листовая, не поименованная в алфавите" ||
                        cargo === 'Заготовка стальная, не поименованная в алфавите' || cargo === "Слябы (заготовки стальные)"
                        || cargo === 'Рельсы металлические новые Р-50' || cargo === "Трубы металлические, не поименованные в алфавите" ||
                        cargo === 'Трубы металлические, не поименованные в алфавите' || cargo === "Проволока стальная (в том числе покрытая другими металлами)")) ||

                (product === "Цемент" && (cargo === 'Цемент,не поименованный в алфавите' || cargo === "Цемент тампонажный")) ||

                (product === "Мазут нефтяной и каменноугольный" && cargo === "Мазут топочный")) {
                return true
            }
            //    else {
            let productWords = product.split(" "); // Разбиваем строки на слова по пробелам
            let cargoWords = cargo.split(" ");
            let matchCount = 0; // Счетчик для подсчета количества совпадений
            for (let productWord of productWords) {
                for (let cargoWord of cargoWords) {
                    // Проверяем, содержится ли слово из product полностью в каком-либо слове из cargo
                    if (cargoWord.toLowerCase() == productWord.toLowerCase()) {
                        // console.log(cargoWord, productWord)
                        matchCount++; // Увеличиваем счетчик при нахождении совпадения
                        break; // Прерываем внутренний цикл, если совпадение найдено
                    }
                }

                // Возвращаем true, если найдено минимум два совпадения
                if (matchCount >= 2) {

                    return true;
                }
            }
            // Если функция дошла до этой точки, значит, не было найдено двух совпадений
            return false;
            //    }
        },

        async getBPData() {
            // this.businessPlanData = ""

            try {
                let response = await this.bp_data.data;
                this.margin_income = await this.margin_income_data.margin_incomes;

                let budgetData = await this.budget_data.data

                let preData = this.mergeArrays(response, budgetData).sort((a, b) => {
                    return a.client.localeCompare(b.client);
                })

                console.log(preData, 'preData')
                // Object.entries(sortedResponse).map(([client, data]) => ({ client, ...data }));
                this.$emit('startLoaderFromChildComponent', true)
                let station_group_west = ['ПРВ', 'МСК', 'ЮВС', 'ОКТ', 'СЕВ', 'КЛГ', 'СКВ', 'ГРК', 'КБШ', 'СВР', 'СКВ'];
                let station_group_east = ['ЗСБ', 'КРС', 'ВСБ', 'ЗАБ', 'ДВС', 'ЖДЯ'];
                let station_group_rf = ['ОКТ', 'КЛГ', 'МСК', 'ГОР', 'СЕВ', 'ЮЗП', 'ЮЖН', 'ДОН', 'СКВ', 'ЮКЖ', 'ЮВС', 'ПРВ', 'КБШ', 'СВР', 'ЮУР', 'ЗСБ', 'МЕЛ', 'ЛУГ', 'КРС', 'ЖДЯ', 'ВСБ', 'ЗАБ', 'ДВС', 'РБК']
                let all_station_group = Object.values(JSON.parse(localStorage.getItem('road')))
                // Создаем объект для мемоизации запросов
                let listExcluded = ['revenue', 'weight', 'volume', 'amo', 'empty_tariff', 'fot', 'loaded_tariff', 'margin_income', 'other_charges', 'pps', 'repair', 'vagonosutki', 'vagonosutki_empty', 'vagonosutki_total', 'aid', 'shipments']




                // Преобразование для быстрого доступа по ключам client
                const finesDataMap = this.fines_data.reduce((acc, obj) => {
                    acc[obj.counterparty] = obj;
                    return acc;
                }, {});

                preData.forEach(obj1 => {
                    const client = obj1.client;
                    // Если есть объект с таким же именем, то добавляем в него новые данные
                    if (finesDataMap[client]) {
                        const obj2 = finesDataMap[client];
                        for (let key in obj2) {
                            if (obj2.hasOwnProperty(key) && key !== 'counterparty') {
                                obj1[key] = obj2[key];
                            }
                        }
                    }
                })


                try {
                    // Получаем объект с суммами по клиентам
                    const anotherCargo = []
                    const handleStations = []

                    for (let item of preData) {
                        const client = item.client;

                        if (this.margin_income.hasOwnProperty(client)) {
                            const clientData = this.margin_income[client];
                            // Инициализируем объект для хранения данных станций
                            if (!item.station_group) {
                                item.station_group = {};
                            }
                            // Обходим данные по станциям, грузам и станциям групп
                            for (let station_departure in clientData) {

                                for (let cargo in clientData[station_departure]) {
                                    for (let station_group in clientData[station_departure][cargo]) {
                                        const stationListData = clientData[station_departure][cargo][station_group];
                                        // Обходим данные станций внутри станций групп
                                        for (let station_list in stationListData) {
                                            // Проверяем условия на совпадение destination и cargo

                                            if (
                                                station_list === item.destination &&
                                                (this.containsAtLeastTwoMatches(item.product, cargo) || item.product === cargo) &&
                                                !listExcluded.includes(station_list)
                                            ) {
                                                // Определяем уникальный ключ для станции (например, название станции)
                                                const stationKey = station_list;
                                                handleStations[stationKey] = true
                                                // Проверяем, существует ли уже объект с таким ключом в item.station_group
                                                if (!item.station_group[stationKey]) {
                                                    // Если объекта нет, создаем новый объект с копией данных станции
                                                    item.station_group[stationKey] = { ...stationListData[stationKey] };

                                                } else {
                                                    // Если объект существует, суммируем значения полей станции
                                                    const existingStation = item.station_group[stationKey];
                                                    for (let field in stationListData) {
                                                        if (typeof stationListData[field] === 'number') {
                                                            existingStation[field] += stationListData[field];
                                                        }
                                                    }
                                                    continue
                                                }
                                            }
                                            // ЕСЛИ назначение станции запад - восток
                                            else if (
                                                (item.destination === 'Станции РФ (Запад)' || item.destination === 'Станции РФ (Восток)') &&
                                                (this.containsAtLeastTwoMatches(item.product, cargo) || item.product === cargo) &&
                                                !listExcluded.includes(station_list)
                                            ) {
                                                const stationKey = station_list;
                                                let code = await this.getRoadForStation(station_list, item.destination);
                                                let isWest = item.destination === 'Станции РФ (Запад)';
                                                let isEast = item.destination === 'Станции РФ (Восток)';

                                                // Проверяем, соответствует ли код станции группе "Запад" или "Восток"
                                                if ((isWest && station_group_west.includes(code)) || (isEast && station_group_east.includes(code))
                                                && (this.containsAtLeastTwoMatches(item.product, cargo) || item.product == cargo)) {

                                                    // Инициализируем объект станции, если он еще не существует
                                                    if (!item.station_group[stationKey]) {
                                                        item.station_group[stationKey] = { ...stationListData[stationKey] }; // Создаем копию данных станции

                                                    } else {
                                                            // Если станция уже существует, суммируем только нужные поля
                                                            const existingStation = item.station_group[stationKey];
                                                            for (let field in stationListData[stationKey]) {
                                                                if (typeof stationListData[stationKey][field] === 'number') {
                                                                    // Суммируем поля, если они числовые
                                                                    existingStation[field] += stationListData[stationKey][field];
                                                                }
                                                            }
                                                            continue

                                                    }
                                                }
                                            }
                                            else if (
                                                item.destination === 'ДВС, КРС' &&
                                                (this.containsAtLeastTwoMatches(item.product, cargo) || item.product === cargo) &&
                                                !listExcluded.includes(station_list)
                                            ) {
                                                const stationKey = station_list;
                                                let code = await this.getRoadForStation(station_list, item.destination);

                                                if ((item.destination.includes(code))) {
                                                    if (!item.station_group[stationKey]) {
                                                        item.station_group[stationKey] = { ...stationListData[stationKey] }; // Создаем копию данных станции

                                                    } else {
                                                        // Если станция уже существует, суммируем только нужные поля
                                                        const existingStation = item.station_group[stationKey];
                                                        for (let field in stationListData[stationKey]) {
                                                            if (typeof stationListData[stationKey][field] === 'number') {
                                                                // Суммируем поля, если они числовые
                                                                existingStation[field] += stationListData[stationKey][field];
                                                            }
                                                        }
                                                        continue
                                                    }
                                                }
                                            }
                                            else if (
                                                (item.destination === 'Станции РФ' || item.destination === 'РФ') &&
                                                (this.containsAtLeastTwoMatches(item.product, cargo) || item.product === cargo) &&
                                                !listExcluded.includes(station_list)
                                            ) {
                                                const stationKey = station_list;
                                                let code = await this.getRoadForStation(station_list, item.destination);
                                                let isFull = item.destination === 'Станции РФ';
                                                let isLow = item.destination === 'РФ';


                                                if ((isFull && station_group_rf.includes(code)) || (isLow && station_group_rf.includes(code))) {
                                                    if (!item.station_group[stationKey]) {
                                                        item.station_group[stationKey] = { ...stationListData[stationKey] }; // Создаем копию данных станции

                                                    } else {
                                                        // Если станция уже существует, суммируем только нужные поля
                                                        const existingStation = item.station_group[stationKey];
                                                        for (let field in stationListData[stationKey]) {
                                                            if (typeof stationListData[stationKey][field] === 'number') {
                                                                // Суммируем поля, если они числовые
                                                                existingStation[field] += stationListData[stationKey][field];
                                                            }
                                                        }
                                                        continue
                                                    }
                                                }
                                            }
                                            // ЕСЛИ назначение сокращенное название дороги СВР ЗСБ и т.д.
                                            else if (
                                                all_station_group.includes(item.destination) &&
                                                !listExcluded.includes(station_list) &&
                                                (this.containsAtLeastTwoMatches(item.product, cargo) || item.product === cargo)
                                            ) {

                                                const stationKey = station_list;

                                                let code
                                                if (!listExcluded.includes(station_list)) {
                                                    code = await this.getRoadForStation(station_list, item.destination);
                                                }

                                                // Проверяем, что станция содержится в массиве all_station_group
                                                if (!item.station_group[stationKey] && item.destination == code && (this.containsAtLeastTwoMatches(item.product, cargo) || item.product == cargo)) {
                                                    // console.log(this.containsAtLeastTwoMatches(item.product, cargo), item.product == cargo)
                                                    // console.log(stationKey,  item.product,  cargo, 'То что должно сочитаться')
                                                    if (stationKey == 'Находка-восточная') {
                                                        console.log(this.containsAtLeastTwoMatches(item.product, cargo), item.product == cargo)
                                                        console.log(stationKey, item.product, cargo, 'То что должно сочитаться')
                                                    }
                                                    item.station_group[stationKey] = { ...stationListData[stationKey] }; // Создаем копию данных станции

                                                } else {
                                                    // Если станция уже существует, суммируем только нужные поля
                                                    if (item.destination == code && (this.containsAtLeastTwoMatches(item.product, cargo) || item.product === cargo)) {

                                                        const existingStation = item.station_group[stationKey];
                                                        for (let field in stationListData[stationKey]) {
                                                            if (typeof stationListData[stationKey][field] === 'number') {
                                                                // Суммируем поля, если они числовые
                                                                existingStation[field] += stationListData[stationKey][field];
                                                            }
                                                        }
                                                    } else {
                                                        continue
                                                    }
                                                }

                                            }
                                            else if (
                                                item.destination === 'экспорт' &&
                                                station_list.includes('эксп.') &&
                                                !listExcluded.includes(station_list) &&
                                                (this.containsAtLeastTwoMatches(item.product, cargo) || item.product === cargo)
                                            ) {
                                                handleStations[stationKey] = true
                                                const stationKey = station_list;
                                                if (!item.station_group[stationKey]) {
                                                    item.station_group[stationKey] = { ...stationListData[stationKey] }; // Создаем копию данных станции

                                                } else {
                                                    // Если объект существует, суммируем значения полей станции
                                                    const existingStation = item.station_group[stationKey];
                                                    for (let field in stationListData) {
                                                        if (typeof stationListData[field] === 'number') {
                                                            existingStation[field] += stationListData[field];
                                                        }
                                                    }
                                                    continue
                                                }

                                            }


                                            else {
                                                const stationKey = station_list;
                                                // Создаем уникальный ключ для client + cargo + stationKey, чтобы различать разные клиенты и грузы
                                                const uniqueKey = `${client}_${station_departure}_${cargo}_${stationKey}`;

                                                // Проверяем, что станция не была обработана в верхних блоках if и не содержится в anotherCargo или listExcluded
                                                if (!handleStations[stationKey] && !anotherCargo[uniqueKey] && !listExcluded.includes(stationKey) && !(this.containsAtLeastTwoMatches(item.product, cargo))) {
                                                    // Добавляем условие для проверки containsAtLeastTwoMatches
                                                    // Создаем новый объект с данными станции и добавляем его в anotherCargo
                                                    anotherCargo[uniqueKey] = { ...stationListData[stationKey], client: client, cargo: cargo, station_name: station_list, total: item.total, plan_total: item.plan_total };

                                                } else {
                                                    // Проверяем, существует ли поле station_group и производим суммирование
                                                    if (item.station_group && item.station_group[stationKey]) {
                                                        const existingStation = item.station_group[stationKey];
                                                        // Проверяем, совпадают ли клиент, груз и название станции
                                                        if (existingStation.client === client && existingStation.cargo === cargo && existingStation.station_name === station_list) {
                                                            for (let field in stationListData[stationKey]) {
                                                                if (typeof stationListData[stationKey][field] === 'number') {
                                                                    if (!existingStation.hasOwnProperty(field)) {
                                                                        existingStation[field] = 0;
                                                                    }
                                                                    existingStation[field] += stationListData[stationKey][field];
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        if (!listExcluded.includes(station_list) && !(this.containsAtLeastTwoMatches(item.product, cargo))) {
                                                            // Добавляем условие для проверки containsAtLeastTwoMatches перед добавлением в anotherCargo
                                                            // Добавляем в anotherCargo если station_group не существует
                                                            anotherCargo[uniqueKey] = { ...stationListData[stationKey], client: client, cargo: cargo, station_name: station_list, total: item.total, plan_total: item.plan_total };

                                                        }
                                                    }
                                                }
                                            }



                                        }
                                    }
                                }
                            }

                            // Проверяем, остался ли объект item.station_group пустым
                            if (Object.keys(item.station_group).length === 0) {
                                delete item.station_group; // Удаляем item.station_group
                            }
                        }
                    }

                    let result_data = []
                    for (let el in anotherCargo) {
                        result_data.push(anotherCargo[el])
                    }

                    const groupedData = result_data.reduce((acc, item) => {
                        const index = acc.findIndex(group => group.client === item.client && group.product === item.cargo);

                        if (index !== -1) {
                            acc[index].station_group.push(item);
                        } else {
                            acc.push({
                                client: item.client,
                                product: item.cargo,
                                station_group: [item]
                            });
                        }

                        return acc;
                    }, []);


                    // const summarizedData = this.summarizeByClient(preData);

                    // Создаем объект для хранения индексов последних объектов для каждого клиента
                    const lastIndexMap = {};

                    // Проходим по массиву preData и определяем индексы последних объектов для каждого клиента
                    for (let i = 0; i < preData.length; i++) {
                        const client = preData[i].client;
                        lastIndexMap[client] = i;
                    }

                    // Создаем массив для хранения результата с добавленными объектами "Итого"
                    const result = [];


                    let filterResultData = result.filter((item) => {
                        // Проверяем, что item не содержит station_group
                        if (!item.hasOwnProperty('station_group')) {
                            return true;
                        }

                        // Проверяем, что station_group существует и не является пустым массивом
                        if (Array.isArray(item.station_group) && item.station_group.length > 0) {
                            return true;
                        }
                        // Удаляем item, если station_group существует, но является пустым массивом
                        return false;
                    });


                    const clients = new Set(preData.map(item => item.client));

                    // Обрабатываем каждого клиента
                    for (let client of clients) {
                        // Получаем все объекты preData для текущего клиента
                        const clientItems = preData.filter(item => item.client === client);

                        // Добавляем все объекты item для текущего клиента в результат
                        clientItems.forEach(item => filterResultData.push(item));

                        // Обрабатываем объекты "Прочие" для текущего клиента
                        const otherData = groupedData.filter(group => group.client === client);
                        if (otherData.length > 0) {
                            // Добавляем объекты "Прочие" в результат РАБОТАЕТ ВЕРНО
                            otherData.forEach(data => {
                                data.destination = 'Общая группа'
                                data.client = 'Прочие ' + data.client
                                // Инициализируем счетчики для суммирования значений
                                let totalVolumeFact = 0;
                                let totalRevenueFact = 0;
                                let totalMdWoPenaltiesFact = 0;
                                let revenueWoNds = 0;
                                let mdWoPenalties = 0;
                                let incomeWoPenalties = 0;
                                let volumeBudget = 0;
                                let revenueWoNdsBudget = 0;
                                let mdWoPenaltiesBudget = 0;
                                let incomeWoPenaltiesBudget = 0;
                                let volumeBP = 0
                                // Добавляем суммы в объект "Прочие"
                                data.total_volume_fact = totalVolumeFact;
                                data.total_revenue_fact = totalRevenueFact;
                                data.total_md_wo_penalties_fact = totalMdWoPenaltiesFact;
                                data.revenue_wo_nds = revenueWoNds;
                                data.md_wo_penalties = mdWoPenalties;
                                data.income_wo_penalties = incomeWoPenalties;
                                data.volume_budget = volumeBudget;
                                data.volume = volumeBP
                                data.revenue_wo_nds_budget = revenueWoNdsBudget;
                                data.md_wo_penalties_budget = mdWoPenaltiesBudget;
                                data.income_wo_penalties_budget = incomeWoPenaltiesBudget;
                                // data.total = data.total
                                // data.plan_total  =  data.plan_total
                                filterResultData.push(data);
                            });
                        }

                        // Добавляем объект "Итого" для текущего клиента
                        const totalObject = {
                            client: "Итого по " + client,
                            volume: 0,
                            total_volume_fact: 0,
                            total_revenue_fact: 0,
                            total_md_wo_penalties_fact: 0,
                            revenue_wo_nds: 0,
                            md_wo_penalties: 0,
                            income_wo_penalties: 0, // среднее арифметическое при делении не учитываем позиции с 0
                            volume_budget: 0,
                            revenue_wo_nds_budget: 0,
                            md_wo_penalties_budget: 0,
                            income_wo_penalties_budget: 0, // среднее арифметическое
                            total_income_wo_penalties: 0, //Данные по доходности (не МД)
                            total_oborot_fact: 0,
                            total_stat_nagr_fact: 0,
                            total: 0,
                            plan_total: 0,
                        };

                        filterResultData.push(totalObject); // добавляем объект "Итого"
                    }
                    this.businessPlanData = this.removeMatchingStations(filterResultData);

                    let data_all_client = [];
                    for (let i in this.businessPlanData) {
                        if (this.businessPlanData[i].client.includes("Прочие")) {
                            data_all_client.push(this.businessPlanData[i]);
                        }
                    }
                    // Создаем объект для хранения итогов по клиентам
                    // const clientTotals = {};
                    // // Проходим по массиву this.businessPlanData и суммируем значения для каждого клиента
                    // this.businessPlanData.forEach(item => {
                    //     const client = item.client.includes("Прочие") ? item.client.replace("Прочие ", "") : item.client.replace("Итого по ", "");

                    //     if (!clientTotals[client]) {
                    //         clientTotals[client] = {
                    //             total_volume_fact: 0,
                    //             total_revenue_fact: 0,
                    //             total_md_wo_penalties_fact: 0,
                    //             revenue_wo_nds: 0,
                    //             md_wo_penalties: 0,
                    //             income_wo_penalties: 0,
                    //             volume: 0,
                    //             volume_budget: 0,
                    //             revenue_wo_nds_budget: 0,
                    //             md_wo_penalties_budget: 0,
                    //             income_wo_penalties_budget: 0,
                    //             total_vagonosutki: 0,
                    //             total_oborot_fact: 0,
                    //             total_stat_nagr_fact: 0,
                    //             total: 0,
                    //             plan_total: 0,
                    //             income_wo_penalties_budget_count: 0, // подсчет нулевых значений для план без штрафа БП
                    //             income_wo_penalties_bp_count: 0,

                    //             // sumOborot(item.station_group) 
                    //         };
                    //     }

                    //     clientTotals[client].total_volume_fact += this.calculateTotalVolume(item.station_group, 'weight') || 0;
                    //     clientTotals[client].total_revenue_fact += this.calculateTotalVolume(item.station_group, 'revenue') || 0;
                    //     clientTotals[client].total_md_wo_penalties_fact += this.calculateTotalVolume(item.station_group, 'margin_income') || 0;
                    //     clientTotals[client].revenue_wo_nds += item.revenue_wo_nds || 0;
                    //     clientTotals[client].md_wo_penalties += item.md_wo_penalties || 0;
                    //     clientTotals[client].income_wo_penalties += item.income_wo_penalties || 0;
                    //     clientTotals[client].volume += item.volume || 0
                    //     clientTotals[client].volume_budget += item.volume_budget || 0;
                    //     clientTotals[client].revenue_wo_nds_budget += item.revenue_wo_nds_budget || 0;
                    //     clientTotals[client].md_wo_penalties_budget += item.md_wo_penalties_budget || 0;
                    //     clientTotals[client].income_wo_penalties_budget += item.income_wo_penalties_budget  || 0;
                    //     clientTotals[client].total_vagonosutki += this.calculateTotalVolume(item.station_group, 'vagonosutki_total') || 0;
                    //     clientTotals[client].total_oborot_fact += this.sumOborot(item.station_group) || 0;
                    //     clientTotals[client].total_stat_nagr_fact += this.sumStatNagruzka(item.station_group) || 0;
                    //     clientTotals[client].total = item.total || 0;
                    //     clientTotals[client].plan_total = item.plan_total || 0;
                    // });

                    // // Проходим по массиву this.businessPlanData снова и обновляем значения для записей "Итого"
                    // this.businessPlanData.forEach(item => {
                    //     if (item.client.includes("Итого по ")) {
                    //         const client = item.client.replace("Итого по ", "");
                    //         if (clientTotals[client]) {
                    //             item.total_volume_fact = clientTotals[client].total_volume_fact;
                    //             item.total_revenue_fact = clientTotals[client].total_revenue_fact;
                    //             item.total_md_wo_penalties_fact = clientTotals[client].total_md_wo_penalties_fact;
                    //             item.revenue_wo_nds = clientTotals[client].revenue_wo_nds;
                    //             item.md_wo_penalties = clientTotals[client].md_wo_penalties;
                    //             item.income_wo_penalties = clientTotals[client].income_wo_penalties;
                    //             item.volume = clientTotals[client].volume;
                    //             item.volume_budget = clientTotals[client].volume_budget;
                    //             item.revenue_wo_nds_budget = clientTotals[client].revenue_wo_nds_budget;
                    //             item.md_wo_penalties_budget = clientTotals[client].md_wo_penalties_budget;
                    //             item.income_wo_penalties_budget =  clientTotals[client].income_wo_penalties_budget;
                    //             item.total_vagonosutki = clientTotals[client].total_vagonosutki;
                    //             item.total_oborot_fact = clientTotals[client].total_oborot_fact
                    //             item.total_stat_nagr_fact = clientTotals[client].total_stat_nagr_fact
                    //             item.total = clientTotals[client].total
                    //             item.plan_total = clientTotals[client].plan_total
                    //         }
                    //     }
                    // });

// Инициализация объекта для хранения суммарных значений по клиентам
let clientTotals = {};

this.businessPlanData.forEach(item => {
    const client = item.client.includes("Прочие") ? item.client.replace("Прочие ", "") : item.client.replace("Итого по ", "");

    if (!clientTotals[client]) {
        clientTotals[client] = {
            total_volume_fact: 0,
            total_revenue_fact: 0,
            total_md_wo_penalties_fact: 0,
            revenue_wo_nds: 0,
            md_wo_penalties: 0,
            income_wo_penalties: 0,
            volume: 0,
            volume_budget: 0,
            revenue_wo_nds_budget: 0,
            md_wo_penalties_budget: 0,
            income_wo_penalties_budget: 0,
            total_vagonosutki: 0,
            total_oborot_fact: 0,
            total_stat_nagr_fact: 0,
            total: 0,
            plan_total: 0,
            income_wo_penalties_budget_count: 0, // Для подсчета ненулевых значений
            income_wo_penalties_bp_count: 0
        };
    }

    clientTotals[client].total_volume_fact += this.calculateTotalVolume(item.station_group, 'weight') || 0;
    clientTotals[client].total_revenue_fact += this.calculateTotalVolume(item.station_group, 'revenue') || 0;
    clientTotals[client].total_md_wo_penalties_fact += this.calculateTotalVolume(item.station_group, 'margin_income') || 0;
    clientTotals[client].revenue_wo_nds += item.revenue_wo_nds || 0;
    clientTotals[client].md_wo_penalties += item.md_wo_penalties || 0;
    clientTotals[client].volume += item.volume || 0;
    clientTotals[client].volume_budget += item.volume_budget || 0;
    clientTotals[client].revenue_wo_nds_budget += item.revenue_wo_nds_budget || 0;
    clientTotals[client].md_wo_penalties_budget += item.md_wo_penalties_budget || 0;


    if(item.income_wo_penalties > 0){
        clientTotals[client].income_wo_penalties += item.income_wo_penalties;
        clientTotals[client].income_wo_penalties_bp_count++;
    }

    if (item.income_wo_penalties_budget > 0) {
        clientTotals[client].income_wo_penalties_budget += item.income_wo_penalties_budget;
        clientTotals[client].income_wo_penalties_budget_count++;
    }
    clientTotals[client].total_vagonosutki += this.calculateTotalVolume(item.station_group, 'vagonosutki_total') || 0;
    clientTotals[client].total_oborot_fact += this.sumOborot(item.station_group) || 0;
    clientTotals[client].total_stat_nagr_fact += this.sumStatNagruzka(item.station_group) || 0;
    clientTotals[client].total += item.total || 0;
    clientTotals[client].plan_total += item.plan_total || 0;
});

// Проходим по массиву this.businessPlanData снова и обновляем значения для записей "Итого"
this.businessPlanData.forEach(item => {
    if (item.client.includes("Итого по ")) {
        const client = item.client.replace("Итого по ", "");
        if (clientTotals[client]) {
            item.total_volume_fact = clientTotals[client].total_volume_fact;
            item.total_revenue_fact = clientTotals[client].total_revenue_fact;
            item.total_md_wo_penalties_fact = clientTotals[client].total_md_wo_penalties_fact;
            item.revenue_wo_nds = clientTotals[client].revenue_wo_nds;
            item.md_wo_penalties = clientTotals[client].md_wo_penalties;
          
            item.volume = clientTotals[client].volume;
            item.volume_budget = clientTotals[client].volume_budget;
            item.revenue_wo_nds_budget = clientTotals[client].revenue_wo_nds_budget;
            item.md_wo_penalties_budget = clientTotals[client].md_wo_penalties_budget;
            // План без штрафа Бюджет

            item.income_wo_penalties = clientTotals[client].income_wo_penalties_bp_count > 0 
            ?  clientTotals[client].income_wo_penalties / clientTotals[client].income_wo_penalties_bp_count 
            : 0;
            // План без штрафа Б
            item.income_wo_penalties_budget = clientTotals[client].income_wo_penalties_budget_count > 0
                ? clientTotals[client].income_wo_penalties_budget / clientTotals[client].income_wo_penalties_budget_count
                : 0;

            item.total_vagonosutki = clientTotals[client].total_vagonosutki;
            item.total_oborot_fact = clientTotals[client].total_oborot_fact;
            item.total_stat_nagr_fact = clientTotals[client].total_stat_nagr_fact;
            item.total = clientTotals[client].total;
            item.plan_total = clientTotals[client].plan_total;


        }
    }
});
                    // Обоработка штрафов
                    let total_weight_by_client = {};
                    for (let obj of this.businessPlanData) {
                        if (obj.client.includes('Итого')) {
                            const clientName = obj.client.slice(9);
                            total_weight_by_client[clientName] = {
                                total_volume_fact: obj.total_volume_fact
                            };
                        }
                    }

                    const total_weight_by_client_array = Object.entries(total_weight_by_client).map(([client, data]) => ({ client, ...data }));

                    let curent_client = "";
                    for (let obj of this.businessPlanData) {
                        let client = obj.client;

                        // Проверка для "Прочие"
                        if (client.includes('Прочие')) {
                            obj.total = 0;
                            obj.plan_total = 0;
                            if (obj.station_group) {
                                obj.station_group.sort((a, b) => a.station_name.localeCompare(b.station_name));
                            }

                            const baseClient = client.replace('Прочие ', '');
                            const baseClientData = this.businessPlanData.find(data => data.client === baseClient);
                            if (baseClientData) {
                                const clientData = total_weight_by_client[baseClient];
                                if (clientData && clientData.total_volume_fact) {
                                    const totalWeight = this.calculateTotalVolume(obj.station_group, 'weight');
                                    obj.total = (totalWeight / clientData.total_volume_fact) * baseClientData.total;
                                    obj.plan_total = (totalWeight / clientData.total_volume_fact) * baseClientData.plan_total;
                                }
                            }
                        } else if (client.includes('Итого по ')) {
                            const baseClient = client.replace('Итого по ', '');
                            obj.total = this.businessPlanData.find(data => data.client === baseClient)?.total || 0;
                            obj.plan_total = this.businessPlanData.find(data => data.client === baseClient)?.plan_total || 0;
                        }

                        if (curent_client.includes(client)) {
                            const clientData = total_weight_by_client_array.find(data => data.client === curent_client);
                            if (clientData && clientData.total_volume_fact) {
                                obj.total = (this.calculateTotalVolume(obj.station_group, 'weight') / clientData.total_volume_fact) * obj.total;
                                obj.plan_total = (this.calculateTotalVolume(obj.station_group, 'weight') / clientData.total_volume_fact) * obj.plan_total;
                            }
                        } else {
                            curent_client = client;
                        }
                    }
                    for (let client of Object.keys(total_weight_by_client)) {
                        let firstClientObj = this.businessPlanData.find(obj => obj.client === client);
                        if (firstClientObj) {
                            const clientData = total_weight_by_client[client];
                            if (clientData && clientData.total_volume_fact) {
                                const totalWeight = this.calculateTotalVolume(firstClientObj.station_group, 'weight');
                                firstClientObj.total = (totalWeight / clientData.total_volume_fact) * firstClientObj.total;
                                firstClientObj.plan_total = (totalWeight / clientData.total_volume_fact) * firstClientObj.plan_total;
                            }
                        }
                    }
                    console.log(this.businessPlanData, 'финальные данные');
                    this.$toast.success('Успешно\nДанные маржинальной доходности получены', { timeout: 3500 });
                } catch (error) {
                    console.log(error)
                    this.$toast.error('Ошибка получения данных\n' + error.response, { timeout: 6000 });
                }
            } catch (error) {
                console.log(error)
                this.$toast.error('Ошибка получения данных\n' + error.response, { timeout: 6000 });
            } finally {
                this.$emit('stateLoader', false);
                this.$emit('startLoaderFromChildComponent', false)
            }
        },
        removeMatchingStations(data) {
            const stationMap = {};

            // Проходим по всем элементам и заполняем stationMap
            data.forEach(item => {
                if (!item.client.startsWith("Прочие")) {
                    const client = item.client;
                    const product = item.product;

                    if (!stationMap[client]) {
                        stationMap[client] = {};
                    }

                    if (!stationMap[client][product]) {
                        stationMap[client][product] = new Set();
                    }

                    if (item.station_group) {
                        for (let station in item.station_group) {
                            stationMap[client][product].add(station);
                        }
                    }
                }
            });

            // Проходим по всем элементам "Прочие" и удаляем совпадающие станции
            data.forEach(item => {
                if (item.client.startsWith("Прочие")) {
                    const client = item.client.replace("Прочие ", "").trim();
                    const product = item.product;

                    if (stationMap[client] && stationMap[client][product]) {
                        item.station_group = item.station_group.filter(station => {
                            return !stationMap[client][product].has(station.station_name);
                        });
                    }
                }
            });
            return data
        },


    }
}
</script>

<style scoped>
.Container {
    overflow-y: auto;
    scrollbar-width: revert;
    scrollbar-color: grey lightgrey;
    /* Цвет скроллбара и его трека */
}

.Flipped,
.Flipped .Content {
    transform: rotateX(180deg);
    -ms-transform: rotateX(180deg);
    /* IE 9 */
    -webkit-transform: rotateX(180deg);
    /* Safari and Chrome */
}

th,
td {
    white-space: nowrap;
    padding: 2px 10px !important;
}

tr:hover {
    background-color: #f5f5f5;
}

.filter_b {
    width: 20vw;
}

/* Стили для таблицы */
.table-container {
    overflow-x: auto;
    /* Добавляем горизонтальную прокрутку, если содержимое таблицы выходит за пределы контейнера */
}
</style>
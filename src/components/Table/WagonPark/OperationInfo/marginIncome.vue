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
        <br>
        <table>

        </table>
        <div class="Container Flipped" ref="tableContainer">
            <div class="Content" ref="scrollTableContent">
                <table ref="theTable">
                    <thead>
                        <tr class="TableHeader">
                            <td rowspan="2">Клиент</td>
                            <td rowspan="2">Отправление</td>
                            <td rowspan="2">Груз</td>
                            <td rowspan="2">Назначение</td>
                            <td colspan="5">Объем</td>
                            <td colspan="5">Выручка (без штрафов)</td>
                            <td colspan="5">МД (без штрафов)</td>
                            <td colspan="2">Стат нагрузка</td>
                            <td colspan="2">Оборот</td>
                            <td colspan="2">Штрафы</td>
                            <td colspan="10">Доходность</td>
                        </tr>
                        <tr class="TableHeader">
                            <td>БП</td>
                            <td>Б</td>
                            <td>Факт</td>
                            <td>Откл. БП</td>
                            <td>Откл. Б</td>

                            <td>БП</td>
                            <td>Б</td>
                            <td>Факт</td>
                            <td>Откл. БП</td>
                            <td>Откл. Б</td>

                            <td>БП</td>
                            <td>Б</td>
                            <td>Факт</td>
                            <td>Откл. БП</td>
                            <td>Откл. Б</td>

                            <td>План</td>
                            <td>Факт</td>

                            <td>План</td>
                            <td>Факт</td>

                            <td>План</td>
                            <td>Факт</td>

                            <td>План(без штр) БП</td>
                            <td>План(без штр) Б</td>
                            <td>Факт(без штр)</td>
                            <td>План (со штр) БП</td>
                            <td>План (со штр) Б</td>
                            <td>Факт (со штр)</td>
                            <td>+/- БП(без штр)</td>
                            <td>+/- Б(без штр)</td>
                            <td>+/- БП(со штр)</td>
                            <td>+/- Б(со штр)</td>

                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in businessPlanData">
                            <tr :key='`${item.client}_${index}_${Math.random() * 100}`' v-if="index !== 'revenue'
                                || index !== 'weight'
                                || index !== 'volume'
                                || index !== 'amo'
                                || index !== 'empty_tariff'
                                || index !== 'fot'
                                || index !== 'loaded_tariff'
                                || index !== 'margin_income'
                                || index !== 'other_charges'
                                || index !== 'pps'
                                || index !== 'repair'
                                || index !== 'vagonosutki'" :class="{ Total_1: item.client.includes('Итого') }"
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
                                    (calculateTotalVolume(item.station_group, 'weight') - item.volume) | format }}</td>
                                <td>{{ item.client.includes('Итого') ? item.total_volume_fact - item.volume_budget :
                                    (calculateTotalVolume(item.station_group, 'weight') - item.volume_budget) | format
                                    }}</td>
                                <td>{{ item.revenue_wo_nds | format }}</td>
                                <td>{{ item.revenue_wo_nds_budget | format }}</td>
                                <td>{{ item.total_revenue_fact || calculateTotalVolume(item.station_group, 'revenue') |
                                    format }}</td>
                                <!-- Отклонение -->
                                <td>
                                    {{ item.client.includes('Итого') ?
                                        item.total_revenue_fact - item.revenue_wo_nds
                                        :
                                        (calculateTotalVolume(item.station_group, 'revenue') - item.revenue_wo_nds) | format
                                    }}
                                </td>
                                <td>
                                    {{ item.client.includes('Итого') ?
                                        item.total_revenue_fact - item.revenue_wo_nds_budget
                                        :
                                        (calculateTotalVolume(item.station_group, 'revenue') - item.revenue_wo_nds_budget) |
                                        format
                                    }}
                                </td>
                                <td>{{ item.md_wo_penalties | format }}</td>
                                <td>{{ item.md_wo_penalties_budget | format }}</td>
                                <td>{{ item.total_md_wo_penalties_fact ||
                                    calculateTotalVolume(item.station_group, 'margin_income') | format }}</td>
                                <!-- Отклонение -->
                                <td>{{
                                    item.client.includes('Итого') ?
                                        item.total_md_wo_penalties_fact - item.md_wo_penalties
                                        :
                                        (calculateTotalVolume(item.station_group, 'margin_income') - item.md_wo_penalties) |
                                        format
                                }}
                                </td>
                                <td>
                                    {{ item.client.includes('Итого') ?
                                        item.total_md_wo_penalties_fact - item.md_wo_penalties_budget
                                        :
                                        (calculateTotalVolume(item.station_group, 'revenue') - item.md_wo_penalties_budget)
                                        | format
                                    }}
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{{ item.income_wo_penalties | format }}</td>
                                <td>{{ item.income_wo_penalties_budget | format }}</td>
                                <!-- Итого маржинальной догходности -->
                                <!-- <td>{{ sumMarginIncomePerVagonosutki(item.station_group) | format }} </td> -->
                                <td>{{ calculateTotalVolume(item.station_group, 'margin_income') /
                                    calculateTotalVolume(item.station_group, 'vagonosutki_total') | format }}</td>
                                <td>{{ item.income_w_penalties | format }}</td>
                                <td>{{ item.income_w_penalties_budget | format }}</td>
                                <td></td>
                                <td>{{ sumMarginIncomePerVagonosutki(item.station_group) - item.income_wo_penalties || 0
                                    | format }}</td>
                                <td>{{ sumMarginIncomePerVagonosutki(item.station_group) -
                                    item.income_wo_penalties_budget || 0 | format }}</td>
                                <td></td>
                                <td></td>
                            </tr>

                            <template v-for="(value, key) in item.station_group">
                                <tr :key="`${item.client}_${key}_${Math.random() * 100}`" class="Total_blue" v-if="key !== 'revenue' && key !== 'weight' && key !== 'volume'
                                    && key !== 'amo'
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
                                    <td style="border: 1px solid black;">{{ key }}</td>
                                    <!-- наименование вложенной станции-->
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.weight | format }}</td>
                                    <td style="border: 1px solid black;">{{ value.weight_budget | format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.revenue | format }}</td>
                                    <td style="border: 1px solid black;">{{ value.revenue_budget | format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.margin_income | format }}</td>
                                    <td style="border: 1px solid black;">{{ value.margin_income_budget | format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ value.margin_income /
                                        value.vagonosutki_total |
                                        format }} </td>
                                    <td style="border: 1px solid black;">{{ value.income_w_penalties | format }}</td>
                                    <td style="border: 1px solid black;">{{ value.income_w_penalties_budget | format }}
                                    </td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
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
    props: ['bp_data', 'margin_income_data', 'budget_data', "date_begin"],
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

        async test() {
            let res = await api.getBudget(this.date_begin_create + '-01')
            console.log(res.data.data)
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
        calculateTotalVolume(stationGroup, type) {
            if (!stationGroup) return 0
            const valuesArray = Object.values(stationGroup)

            const totalVolume = valuesArray.reduce((acc, item) => {
                return acc + item[type]
            }, 0)
            return totalVolume
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
                    Object.keys(item2).forEach((key) => {
                        if (key !== 'client' && key !== 'destination' && key !== 'product') {
                            item1[`${key}_budget`] = item2[key];
                        }
                    });
                }
            });
            return array1;

        },
        summarizeByClient(data) {
            return data.reduce((acc, item) => {
                const client = item.client;

                // Проверяем, есть ли уже объект для этого клиента в аккумуляторе, если нет - создаем
                if (!acc[client]) {
                    acc[client] = {
                        volume: 0,
                        total_volume_fact: 0,
                        total_revenue_fact: 0,
                        total_md_wo_penalties_fact: 0,
                        revenue_wo_nds: 0,
                        md_wo_penalties: 0,
                        income_wo_penalties: 0,
                        volume_budget: 0,
                        revenue_wo_nds_budget: 0,
                        md_wo_penalties_budget: 0,
                        income_wo_penalties_budget: 0
                    };
                }

                // Добавляем значения из текущего элемента данных к объекту сумм для этого клиента
                acc[client].volume += item.volume;
                acc[client].total_volume_fact += this.calculateTotalVolume(item.station_group, 'weight');
                acc[client].total_revenue_fact += this.calculateTotalVolume(item.station_group, 'revenue');
                acc[client].total_md_wo_penalties_fact += this.calculateTotalVolume(item.station_group, 'margin_income');
                acc[client].revenue_wo_nds += item.revenue_wo_nds;
                acc[client].income_wo_penalties += item.income_wo_penalties;
                acc[client].volume_budget += item.volume_budget;
                acc[client].revenue_wo_nds_budget += item.revenue_wo_nds_budget;
                acc[client].md_wo_penalties += item.md_wo_penalties;
                acc[client].md_wo_penalties_budget += item.md_wo_penalties_budget;
                acc[client].income_wo_penalties_budget += item.income_wo_penalties_budget;

                // // Добавляем расчеты через функции, если они определены
                // if (item.station_group) {
                //     // acc[client].total_volume_fact += this.calculateTotalVolume(item.station_group, 'weight');
                //     acc[client].total_revenue_fact = this.calculateTotalVolume(item.station_group, 'revenue');
                //     acc[client].sum_margin_income = this.sumMarginIncomePerVagonosutki(item.station_group);
                // }

                return acc;
            }, {});
        },
        containsAtLeastTwoMatches(product, cargo) {
            if (product == "Бензин" && cargo == 'Бензин моторный (автомобильный) неэтилированный' || cargo == "Бензин стабильный газовый (газолин)") {
                return true
            }
            let productWords = product.split(" "); // Разбиваем строки на слова по пробелам
            let cargoWords = cargo.split(" ");
            let matchCount = 0; // Счетчик для подсчета количества совпадений
            for (let productWord of productWords) {
                for (let cargoWord of cargoWords) {
                    // Проверяем, содержится ли слово из product полностью в каком-либо слове из cargo
                    if (cargoWord.toLowerCase().includes(productWord.toLowerCase())) {
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
        },


        async getBPData() {
            // this.businessPlanData = ""

            try {
                let response = await this.bp_data.data;
                this.margin_income = await this.margin_income_data.margin_incomes;
                console.log(this.margin_income, 'margin_income')

                let budgetData = await this.budget_data.data

                let preData = this.mergeArrays(response, budgetData).sort((a, b) => {
                    return a.client.localeCompare(b.client);
                })

                // Object.entries(sortedResponse).map(([client, data]) => ({ client, ...data }));
                this.$emit('startLoaderFromChildComponent', true)
                let station_group_west = ['ПРВ', 'МСК', 'ЮВС', 'ОКТ', 'СЕВ', 'КЛГ', 'СКВ', 'ГРК', 'КБШ', 'СВР', 'СКВ'];
                let station_group_east = ['ЗСБ', 'КРС', 'ВСБ', 'ЗАБ', 'ДВС', 'ЖДЯ'];
                let station_group_rf = ['ОКТ', 'КЛГ', 'МСК', 'ГОР', 'СЕВ', 'ЮЗП', 'ЮЖН', 'ДОН', 'СКВ', 'ЮКЖ', 'ЮВС', 'ПРВ', 'КБШ', 'СВР', 'ЮУР', 'ЗСБ', 'МЕЛ', 'ЛУГ', 'КРС', 'ЖДЯ', 'ВСБ', 'ЗАБ', 'ДВС', 'РБК']
                let all_station_group = Object.values(JSON.parse(localStorage.getItem('road')))
                // Создаем объект для мемоизации запросов
                let listExcluded = ['revenue', 'weight', 'volume', 'amo', 'empty_tariff', 'fot', 'loaded_tariff', 'margin_income', 'other_charges', 'pps', 'repair', 'vagonosutki', 'vagonosutki_empty', 'vagonosutki_total']

                try {
                    // Получаем объект с суммами по клиентам

                    const result_boris = []
                    const cargoStationMap = {}

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
                                                (this.containsAtLeastTwoMatches(item.product, cargo)
                                                    || item.product === cargo) &&
                                                !listExcluded.includes(station_list)
                                            ) {
                                                // Определяем уникальный ключ для станции (например, название станции)
                                                const stationKey = station_list;

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
                                                }
                                            }
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
                                                if ((isWest && station_group_west.includes(code)) || (isEast && station_group_east.includes(code))) {
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
                                                    }
                                                }
                                            }
                                            else if (
                                                all_station_group.includes(item.destination) &&
                                                !listExcluded.includes(station_list) &&
                                                (this.containsAtLeastTwoMatches(item.product, cargo) || item.product === cargo)
                                            ) {
                                                const stationKey = station_list;

                                                let code = await this.getRoadForStation(station_list, item.destination);
                                                // Проверяем, что станция содержится в массиве all_station_group

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
                                                }

                                            }
                                           
                                            else if (
                                                item.destination === 'экспорт' &&
                                                station_list.includes('эксп.') &&
                                                !listExcluded.includes(station_list) &&
                                                (this.containsAtLeastTwoMatches(item.product, cargo) || item.product === cargo)
                                            ) {
                                                const stationKey = station_list;
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
                                                }

                                            }
                                            
                                            else {
                                                const cargoKey = cargo;
                                                const stationKey = station_list;

                                                // Проверяем, существует ли клиент в cargoStationMap
                                                if (!cargoStationMap[client]) {
                                                    cargoStationMap[client] = {}; // Инициализация объекта для клиента
                                                }

                                                // Проверяем, существует ли груз у текущего клиента
                                                if (!cargoStationMap[client][cargoKey]) {
                                                    cargoStationMap[client][cargoKey] = {}; // Инициализация объекта для груза
                                                }

                                                // Проверяем, существует ли станция у текущего груза
                                                if (!cargoStationMap[client][cargoKey][stationKey]) {
                                                    // Если объекта для станции в грузе нет, создаем новый объект с копией данных станции
                                                    cargoStationMap[client][cargoKey][stationKey] = { ...stationListData[stationKey] };
                                                }
                                                //  else {
                                                //     // Если объект существует, суммируем значения полей станции
                                                //     const existingStation = cargoStationMap[client][cargoKey][stationKey];
                                                //     for (let field in stationListData[stationKey]) {
                                                //         if (typeof stationListData[stationKey][field] === 'number') {
                                                //             existingStation[field] += stationListData[stationKey][field];
                                                //         }
                                                //     }
                                                // }
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
                    // После завершения всех операций добавляем этот блок кода
                    // Перебираем клиентов
                    for (const client in cargoStationMap) {
                        const clientData = cargoStationMap[client];

                        // Перебираем грузы у текущего клиента
                        for (const cargo in clientData) {
                            const cargoData = clientData[cargo];

                            // Перебираем станции у текущего груза
                            for (const station in cargoData) {
                                const stationData = cargoData[station];

                                // Проверяем, если станция пустая (не содержит ни одного поля кроме ключа)
                                const isEmptyStation = Object.keys(stationData).length === 0;
                                if (isEmptyStation) {
                                    delete cargoData[station]; // Удаляем пустую станцию
                                }
                            }

                            // Проверяем, если груз пустой (не содержит ни одной станции)
                            const isEmptyCargo = Object.keys(cargoData).length === 0;
                            if (isEmptyCargo) {
                                delete clientData[cargo]; // Удаляем пустой груз
                            }
                        }

                        // Проверяем, если клиент пустой (не содержит ни одного груза)
                        const isEmptyClient = Object.keys(clientData).length === 0;
                        if (isEmptyClient) {
                            delete cargoStationMap[client]; // Удаляем пустого клиента
                        }
                    }
                    console.log(cargoStationMap, 'result_for_boris')

                    const summarizedData = this.summarizeByClient(preData);

                    // Создаем объект для хранения индексов последних объектов для каждого клиента
                    const lastIndexMap = {};

                    // Проходим по массиву preData и определяем индексы последних объектов для каждого клиента
                    for (let i = 0; i < preData.length; i++) {
                        const client = preData[i].client;
                        lastIndexMap[client] = i;
                    }

                    // Создаем массив для хранения результата с добавленными объектами "Итого"
                    const result = [];

                    // Проходим по массиву preData и добавляем объекты "Итого" после последних объектов с каждым клиентом
                    for (let i = 0; i < preData.length; i++) {
                        const item = preData[i];
                        const client = item.client;

                        // Проверяем, был ли уже добавлен объект "Итого" для данного клиента
                        if (i === lastIndexMap[client]) {
                            const totalObject = {
                                client: "Итого по " + client,
                                volume: summarizedData[client].volume,
                                total_volume_fact: summarizedData[client].total_volume_fact,
                                total_revenue_fact: summarizedData[client].total_revenue_fact,
                                total_md_wo_penalties_fact: summarizedData[client].total_md_wo_penalties_fact,
                                revenue_wo_nds: summarizedData[client].revenue_wo_nds,
                                md_wo_penalties: summarizedData[client].md_wo_penalties,
                                income_wo_penalties: summarizedData[client].income_wo_penalties,
                                volume_budget: summarizedData[client].volume_budget,
                                revenue_wo_nds_budget: summarizedData[client].revenue_wo_nds_budget,
                                md_wo_penalties_budget: summarizedData[client].md_wo_penalties_budget,
                                income_wo_penalties_budget: summarizedData[client].income_wo_penalties_budget
                            };

                            // Добавляем объект "Итого" после последнего объекта с текущим клиентом
                            result.push(item); // добавляем текущий объект
                            result.push(totalObject); // добавляем объект "Итого"
                        } else {
                            result.push(item); // добавляем текущий объект без изменений
                        }
                    }


                    console.log(result)
                    // Выводим исходный массив с добавленными объектами "Итого" и общей суммой
                    this.businessPlanData = result;
                    this.$toast.success('Успешно\nДанные маржинальной доходности получены', { timeout: 3500 });
                    console.log(this.businessPlanData)
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
        }
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
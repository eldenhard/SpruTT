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
        <div style="overflow: auto; width: 100%;height: auto;">
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
                        <td colspan="11">Доходность</td>
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
                        <td>+/- Б(без штр)</td>
                        <td>+/- Б(со штр)</td>

                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in businessPlanData">
                        <tr :key="index" v-if="index !== 'revenue'
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
                            || index !== 'vagonosutki'
                        ">
                            <!-- Основные данные -->
                            <td style="border: 1px solid black;">{{ item.client }}</td>
                            <td style="border: 1px solid black;"></td>
                            <td style="border: 1px solid black;">{{ item.product }}</td>
                            <td style="border: 1px solid black;">{{ item.destination }}</td>
                            <td style="border: 1px solid black;">{{ item.volume | format }}</td>
                            <td style="border: 1px solid black;">{{ item.volume_budget | format }}</td>
                            <td style="border: 1px solid black;">{{ calculateTotalVolume(item.station_group, 'weight') |
                                format }}</td>
                            <td style="border: 1px solid black;">{{ (calculateTotalVolume(item.station_group, 'weight')
                                - item.volume) | format }}</td>
                            <td style="border: 1px solid black;">{{ (calculateTotalVolume(item.station_group, 'weight')
                                - item.volume_budget) | format }}</td>
                            <td style="border: 1px solid black;">{{ item.revenue_wo_nds | format }}</td>
                            <td style="border: 1px solid black;">{{ item.revenue_wo_nds_budget | format }}</td>
                            <td style="border: 1px solid black;">{{ calculateTotalVolume(item.station_group, 'revenue')
                                | format }}</td>
                            <td style="border: 1px solid black;">{{ (calculateTotalVolume(item.station_group, 'revenue')
                                - item.revenue_wo_nds) | format }}</td>
                            <td style="border: 1px solid black;">{{ (calculateTotalVolume(item.station_group, 'revenue')
                                - item.revenue_wo_nds_budget) | format }}</td>
                            <td style="border: 1px solid black;">{{ item.md_wo_penalties | format }}</td>
                            <td style="border: 1px solid black;">{{ item.md_wo_penalties_budget | format }}</td>
                            <td style="border: 1px solid black;">{{ calculateTotalVolume(item.station_group,
                                'margin_income') | format }}</td>
                            <td style="border: 1px solid black;">{{ (calculateTotalVolume(item.station_group,
                                'margin_income') - item.md_wo_penalties) | format }}</td>
                            <td style="border: 1px solid black;">{{ (calculateTotalVolume(item.station_group,
                                'margin_income') - item.md_wo_penalties_budget) | format }}</td>
                            <td style="border: 1px solid black;"></td>
                            <td style="border: 1px solid black;"></td>
                            <td style="border: 1px solid black;"></td>
                            <td style="border: 1px solid black;"></td>
                            <td style="border: 1px solid black;"></td>
                            <td style="border: 1px solid black;"></td>
                            <td style="border: 1px solid black;">{{ item.income_wo_penalties | format }}</td>
                            <td style="border: 1px solid black;">{{ item.income_wo_penalties_budget | format }}</td>

                            <td style="border: 1px solid black;">{{ calculateTotalVolume2(item.station_group,
                                'income_wo_penalties', 'vagonosutki') | format }}</td>
                            <td style="border: 1px solid black;">{{ item.income_w_penalties | format }}</td>
                            <td style="border: 1px solid black;">{{ item.income_w_penalties_budget | format }}</td>
                            <td style="border: 1px solid black;"></td>
                            <td style="border: 1px solid black;">{{ calculateTotalVolume2(item.station_group,
                                'income_wo_penalties', 'vagonosutki') - item.income_wo_penalties | format }}</td>
                            <td style="border: 1px solid black;">{{ calculateTotalVolume2(item.station_group,
                                'income_wo_penalties', 'vagonosutki') - item.income_w_penalties_budget | format }}</td>
                            <td style="border: 1px solid black;"></td>
                            <td style="border: 1px solid black;"></td>
                        </tr>
                        <!-- Итерация по ключам и значениям внутри объекта station -->
                        <template v-for="(value, key) in item.station_group">
                            <tr :key="key" class="Total_blue" v-if="key !== 'revenue' && key !== 'weight' && key !== 'volume'
                                && key !== 'amo'
                                && key !== 'empty_tariff'
                                && key !== 'fot'
                                && key !== 'loaded_tariff'
                                && key !== 'margin_income'
                                && key !== 'other_charges'
                                && key !== 'pps'
                                && key !== 'repair'
                                && index !== 'vagonosutki'">
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
                                <td style="border: 1px solid black;">{{ value.margin_income / value.vagonosutki | format
                                    }}</td>
                                <td style="border: 1px solid black;">{{ value.income_w_penalties | format }}</td>
                                <td style="border: 1px solid black;">{{ value.income_w_penalties_budget | format }}</td>
                                <td style="border: 1px solid black;"></td>
                                <td style="border: 1px solid black;"></td>
                                <td style="border: 1px solid black;"></td>
                                <td style="border: 1px solid black;"></td>
                                <td style="border: 1px solid black;"></td>
                                <!-- {{ value.margin_income / value.vagonosutki | format}} || {{ value.margin_income }} || {{ value.vagonosutki }} -->
                                <!-- {{ value.margin_income_budget / value.vagonosutki_budget | format}} -->
                            </tr>
                            <template v-for="(stationValue, stationKey) in value">
                                <tr :key="stationKey" class="Total_blue" v-if="stationKey !== 'revenue' && stationKey !== 'weight' && stationKey !== 'volume'
                                    && stationKey !== 'amo'
                                    && stationKey !== 'empty_tariff'
                                    && stationKey !== 'fot'
                                    && stationKey !== 'loaded_tariff'
                                    && stationKey !== 'margin_income'
                                    && stationKey !== 'other_charges'
                                    && stationKey !== 'pps'
                                    && stationKey !== 'repair'
                                    && stationKey !== 'vagonosutki'">
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ stationKey }}</td>
                                    <!-- наименование вложенной станции-->
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ stationValue.weight | format }}</td>
                                    <td style="border: 1px solid black;">{{ stationValue.weight_budget | format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ stationValue.revenue | format }}</td>
                                    <td style="border: 1px solid black;">{{ stationValue.revenue_budget | format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ stationValue.margin_income | format }}</td>
                                    <td style="border: 1px solid black;">{{ stationValue.margin_income_budget | format
                                        }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;">{{ stationValue.margin_income /
                                        stationValue.vagonosutki | format }}</td>
                                    <td style="border: 1px solid black;">{{ stationValue.income_w_penalties | format }}
                                    </td>
                                    <td style="border: 1px solid black;">{{ stationValue.income_w_penalties_budget |
                                        format }}</td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>
                                    <td style="border: 1px solid black;"></td>

                                </tr>
                            </template>
                        </template>
                    </template>
                </tbody>
            </table>
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
        }
    },
    // async mounted(){
    //     let res = await api.getBudget('2024-02-01')
    //     console.log(res.data.data)
    // },
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
                    Object.keys(item2).forEach((key) => {
                        if (key !== 'client' && key !== 'destination' && key !== 'product') {
                            item1[`${key}_budget`] = item2[key];
                        }
                    });
                }
            });
            return array1;

        },
        containsAtLeastTwoMatches(product, cargo) {
            let productWords = product.split(/s+/); // Разбиваем строки на слова по пробелам
            let cargoWords = cargo.split(/s+/);
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
        // const productLower = product.toLowerCase();
        // const cargoLower = cargo.toLowerCase();
        // const regex = new RegExp(`\\b${cargoLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        // return regex.test(productLower);
 
    // containsPartialMatch(mainString, searchString) {
    //     // Разбиваем строки на массивы слов
    //     let mainWords = mainString.split(' ');
    //     let searchWords = searchString.split(' ');

    //     // Проходим по каждому слову в основной строке
    //     for (let i = 0; i <= mainWords.length - searchWords.length; i++) {
    //         let matchFound = true;
    //         // Проверяем последовательность слов из searchString в mainString
    //         for (let j = 0; j < searchWords.length; j++) {
    //             if (mainWords[i + j] !== searchWords[j]) {
    //                 matchFound = false;
    //                 break;
    //             }
    //         }
    //         if (matchFound) {
    //             return true; // Найдено совпадение последовательности слов
    //         }
    //     }
    //     return false; // Не найдено совпадение последовательности слов
    // },

    async getBPData() {
        this.businessPlanData = ""
        this.$emit('stateLoader', true);
        try {
            let response = await this.bp_data.data;
            console.log(response)
            this.margin_income = await this.margin_income_data.margin_incomes;
            console.log(this.margin_income)

            let budgetData = await this.budget_data.data
            console.log(budgetData, this.budget_data, 'budget')

            let preData = this.mergeArrays(response, budgetData).sort((a, b) => {
                return a.client.localeCompare(b.client);
            })

            // Object.entries(sortedResponse).map(([client, data]) => ({ client, ...data }));
            this.$emit('stateLoader', true);
            let station_group_west = ['ПРВ', 'МСК', 'ЮВС', 'ОКТ', 'СЕВ', 'КЛГ', 'СКВ', 'ГРК', 'КБШ', 'СВР', 'СКВ'];
            let station_group_east = ['ЗСБ', 'КРС', 'ВСБ', 'ЗАБ', 'ДВС', 'ЖДЯ'];

            // Создаем объект для мемоизации запросов


            try {
                for (let i = 0; i < preData.length; i++) {
                    let item = preData[i];
                    let client = item.client;

                    if (this.margin_income.hasOwnProperty(client)) {
                        let clientData = this.margin_income[client];

                        for (let station_departure in clientData) {
                            for (let cargo in clientData[station_departure]) {
                                for (let station_group in clientData[station_departure][cargo]) {
                                    let stationListData = clientData[station_departure][cargo][station_group];

                                    for (let station_list in stationListData) {
                                        if (
                                            station_list === item.destination &&
                                            item.product.includes(cargo) ||
                                            this.containsAtLeastTwoMatches(item.product, cargo) &&
                                            station_list !== 'revenue' &&
                                            station_list !== 'weight' &&
                                            station_list !== 'volume' &&
                                            station_list !== 'amo'
                                            && station_list !== 'empty_tariff'
                                            && station_list !== 'fot'
                                            && station_list !== 'loaded_tariff'
                                            && station_list !== 'margin_income'
                                            && station_list !== 'other_charges'
                                            && station_list !== 'pps'
                                            && station_list !== 'repair'
                                            && station_list !== 'vagonosutki'
                                        ) {
                                            // Найдена подходящая станция для текущего элемента
                                            let data = stationListData[station_list];
                                            item.station_group = {
                                                [station_list]: data
                                            };
                                        } else if (
                                            (item.destination === 'Станции РФ (Запад)' || item.destination === 'Станции РФ (Восток)') &&
                                            station_list !== 'revenue' &&
                                            station_list !== 'weight' &&
                                            station_list !== 'volume' &&
                                            station_list !== 'amo'
                                            && station_list !== 'empty_tariff'
                                            && station_list !== 'fot'
                                            && station_list !== 'loaded_tariff'
                                            && station_list !== 'margin_income'
                                            && station_list !== 'other_charges'
                                            && station_list !== 'pps'
                                            && station_list !== 'repair'
                                            && station_list !== 'vagonosutki'
                                            && item.product.includes(cargo) ||
                                            this.containsAtLeastTwoMatches(item.product, cargo)
                                        ) {
                                            // Проверяем станцию запад или восток
                                            let code = await this.getRoadForStation(station_list, item.destination);
                                            let isWest = item.destination === 'Станции РФ (Запад)';
                                            let isEast = item.destination === 'Станции РФ (Восток)';

                                            if ((isWest && station_group_west.includes(code)) || (isEast && station_group_east.includes(code))) {
                                                if (!item.station_group) {
                                                    item.station_group = {};
                                                }
                                                item.station_group[station_list] = stationListData[station_list];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                console.log(preData);
                this.$toast.success('Успешно\nДанные маржинальной доходности получены', { timeout: 2000 });
                this.businessPlanData = preData;
                console.log(this.businessPlanData)
            } catch (error) {
                this.$toast.error('Ошибка получения данных\n' + error.response, { timeout: 2000 });
            }
        } catch (error) {
            this.$toast.error('Ошибка получения данных\n' + error.response, { timeout: 2000 });
        } finally {
            this.$emit('stateLoader', false);
        }
    }
}
}
</script>

<style scoped>
td {
    white-space: nowrap;
    padding: 2px 10px !important;
}

.filter_b {
    width: 20vw;
}

/* Стили для таблицы */
.table-container {
    overflow-x: auto;
    /* Добавляем горизонтальную прокрутку, если содержимое таблицы выходит за пределы контейнера */
}

/* Стили для заголовка таблицы */
.TableHeader {
    background-color: #f8f9fa;
    /* Цвет фона заголовка */
    position: sticky;
    top: 0;
    /* Закрепляем заголовок таблицы вверху контейнера */
    z-index: 1;
    /* Устанавливаем z-index для заголовка, чтобы он отображался над содержимым таблицы */
}
</style>
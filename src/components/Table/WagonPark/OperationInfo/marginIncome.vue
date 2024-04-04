<template>
    <section>
        <div class="filter_b">

            <label for="">
                Дата <br>
                <input type="month" v-model="date_begin_create" class="textarea" style="background: white;width: 20vw ">
            </label>
            <br>
            <button class="Accept button" style="width: 20vw; margin-top: 4%;" @click="getBPData">Запросить</button>
        </div>
        <br>
        <table>

        </table>
        <div style="overflow: auto; width: 100%">
            <table>
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
                        <td colspan="6">Доходность</td>
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

                        <td>План(без штр)</td>
                        <td>План(со штр)</td>
                        <td>Факт(без штр)</td>
                        <td>Факт(со штр)</td>
                        <td>+/-(без штр)</td>
                        <td>+/-(со штр)</td>

                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in businessPlanData">
                        <tr :key="index">
                            <!-- Основные данные -->
                            <td>{{ item.client }}</td>
                            <td></td>
                            <td>{{ item.product }}</td>
                            <td>{{ item.destination }}</td>
                            <td>{{ item.volume | format }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{ item.revenue_wo_nds | format }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{ item.md_wo_penalties | format }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <!-- Итерация по ключам и значениям внутри объекта station -->
                        <template v-for="(value, key) in item.station_group">
                            <template v-if="key !== 'revenue' && key !== 'volume'">
                                <template v-for="(stationValue, stationKey) in value">
                                    <tr v-if="stationKey !== 'revenue' && stationKey !== 'volume'" :key="stationKey" class="Total_blue">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{{ stationKey }}</td> <!-- наименование вложенной станции-->
                                        <td></td>
                                        <td></td>
                                        <td>{{ stationValue.volume | format }}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{{ stationValue.revenue | format }}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </template>
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
export default {
    props: ['bp_data', 'margin_income_data'],
    data() {
        return {
            date_begin_create: "",
            businessPlanData: "",
            margin_income: "",
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
    watch: {
        margin_income_data: {
            handler(newVal, oldVal){
                if (newVal) {
                    this.getBPData();
                }
            },
            deep: true
        }
    },
    methods: {
        async getRoadForStation(val, memo = {}) {
            if (memo[val]) {
                return memo[val];
            }

            try {
                let response = await apiWagon.getCurrentStation(val);
                let roadName = response.data.data.filter((item) => item.name === val)[0].road.name.slice(0, -6);
                let directory = JSON.parse(localStorage.getItem('road'));

                // Преобразование ключа roadName и всех ключей в объекте directory к нижнему регистру
                let lowerCaseRoadName = roadName.toLowerCase();
                let lowerCaseDirectory = Object.keys(directory).reduce((acc, key) => {
                    acc[key.toLowerCase()] = directory[key];
                    return acc;
                }, {});

                memo[val] = lowerCaseDirectory[lowerCaseRoadName];

                return memo[val];

            } catch (error) {
                console.error('Error fetching station data:', error);
                return null;
            }
        },

        async getBPData() {
    this.$emit('stateLoader', true);
    try {
        let response = await this.bp_data.data;
        this.margin_income = await this.margin_income_data.margin_incomes;
        console.log(response)
        // Получаем ключи объекта и сортируем их
        let sortedKeys = Object.keys(response).sort();

        // Создаем новый объект с отсортированными ключами
        let sortedResponse = {};
        for (let key of sortedKeys) {
            sortedResponse[key] = response[key];
        }

        let preData = Object.entries(sortedResponse).map(([client, data]) => ({ client, ...data }));

        let station_group_west = ['ПРВ', 'МСК', 'ЮВС', 'ОКТ', 'СЕВ', 'КЛГ', 'СКВ', 'ГРК', 'КБШ', 'СВР'];
        // Создаем объект для мемоизации запросов
        let memo = {};

        for (let i = 0; i < preData.length; i++) {
            let item = preData[i];
            let client = item.client;

            // Проверяем, что клиент есть в margin_income
            if (this.margin_income.hasOwnProperty(client)) {
                let clientData = this.margin_income[client];
                for (let station_departure in clientData) {
                    for (let cargo in clientData[station_departure]) {
                        for (let station_group in clientData[station_departure][cargo]) {
                            if (station_group === item.destination) {
                                // Добавляем значение station_group к элементу item
                                item.station_group = clientData[station_departure][cargo];
                            } else if (station_group !== item.destination && item.destination === 'Станции РФ (Запад)' && station_group !== 'revenue' && station_group !== 'volume') {
                                // Проверяем, есть ли значение для station_group в memo
                                if (!memo[station_group]) {
                                    // Если нет, то отправляем запрос и сохраняем результат в memo
                                    let code = await this.getRoadForStation(station_group, memo);
                                    // Добавляем значение station_group к элементу item
                                    if (station_group_west.includes(code)) {
                                        item.station_group = clientData[station_departure][cargo];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        this.$toast.success('Успешно\nДанные маржинальной доходности получены', { timeout: 2000 });
        this.businessPlanData = preData;
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
</style>
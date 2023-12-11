<template>
    <div>
        <p>Форма 4.16. "Операционные доходы и расходы в детализации «до вагона»"</p>
        <Periods @Action="Actioned" @data="getCurrentData" />
        <div style="overflow: auto; margin-top: 4%;">
            <table>
                <thead>
                    <th>&nbsp;Показатель/ Группа вагонов / Вагон&nbsp;</th>
                    <th>Всего в т.ч</th>
                    <template v-for="item in getCollection">
                        <th :key="item.id">{{ item }}</th>
                    </template>
                </thead>
                <tbody>
                    <tr>
                        <td v-if="CheckValue(wagon_type)" style="background: lightblue;" :colspan="HowManyNewCells">
                            Выручка от предоставления вагонов под погрузку
                        </td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>

                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Выручка от сдачи в аренду</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Штрафы к получению</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Тариф</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Привлеченеи ПС</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Подготовка вагонов</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Прочие условно-переменные расходы</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Амортизация</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Расходы на аренду ПС</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Ремонт, сервисное обслуживание и з/ч
                        </td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Расходы на оплату труда (произв.)</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Прочие условно-постоянные произв.
                            Расходы</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>
                    <tr>
                        <td style="background: lightblue;" :colspan="HowManyNewCells">Операционная прибыль</td>
                    </tr>
                    <template v-for="allDataByWagonType, wagon_type in data">
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>
                    </template>






                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import Periods from "./Periods.vue";
import api from "@/api/reportUO"
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
import AverageValue from '@/mixins/AverageValue'
export default {
    components: { Periods, Notifications, Loader, },
    mixins: [AverageValue],
    data() {
        return {
            loader: false,
            data: {
                "Полувагон": {
                    "loading_revenue": 400,
                    "rent_revenue": 400,
                    "penalties": 400,
                    "tariff": 340983409.19,
                    "attraction": 6124607.300000001,
                    "prepare": 11770.74,
                    "other_charges": 3267124.7800000063,
                    "amortization": 0,
                    "rent_expenses": 0,
                    "repair": 0,
                    "salary": 0,
                    "other_expenses": 0,
                    "profit": -350386912.01000035,
                    "1-2023": {
                        "loading_revenue": 1,
                        "rent_revenue": 2,
                        "penalties": 3,
                        "tariff": 340252420.19,
                        "attraction": 6124607.300000001,
                        "prepare": 11770.74,
                        "other_charges": 3267124.7800000063,
                        "amortization": 0,
                        "rent_expenses": 0,
                        "repair": 0,
                        "salary": 0,
                        "other_expenses": 0,
                        "profit": -349655923.01000035
                    },
                    "12-2022": {
                        "loading_revenue": 0,
                        "rent_revenue": 0,
                        "penalties": 0,
                        "tariff": 730989.0,
                        "attraction": 0,
                        "prepare": 0,
                        "other_charges": 0,
                        "amortization": 0,
                        "rent_expenses": 0,
                        "repair": 0,
                        "salary": 0,
                        "other_expenses": 0,
                        "profit": -730989.0
                    }
                },
                "loading_revenue": 500,
                "rent_revenue": 500,
                "penalties": 500,
                "tariff": 961112061.2800001,
                "attraction": 40206570.13000003,
                "prepare": 2437328.130000003,
                "other_charges": 3267124.7800000063,
                "amortization": 1968485.7800000047,
                "rent_expenses": 0,
                "repair": 0,
                "salary": 0,
                "other_expenses": 0,
                "profit": -1008991570.1000102,

                "Цистерна": {
                    "loading_revenue": 0,
                    "rent_revenue": 0,
                    "penalties": 0,
                    "tariff": 620128652.0899998,
                    "attraction": 34081962.830000006,
                    "prepare": 2425557.3900000034,
                    "other_charges": 0,
                    "amortization": 1968485.7800000047,
                    "rent_expenses": 0,
                    "repair": 0,
                    "salary": 0,
                    "other_expenses": 0,
                    "profit": -658604658.0900021,
                    "1-2023": {
                        "loading_revenue": 0,
                        "rent_revenue": 0,
                        "penalties": 0,
                        "tariff": 619673045.0899998,
                        "attraction": 34081962.830000006,
                        "prepare": 2425557.3900000034,
                        "other_charges": 0,
                        "amortization": 1968485.7800000047,
                        "rent_expenses": 0,
                        "repair": 0,
                        "salary": 0,
                        "other_expenses": 0,
                        "profit": -658149051.0900021
                    },
                    "12-2022": {
                        "loading_revenue": 0,
                        "rent_revenue": 0,
                        "penalties": 0,
                        "tariff": 455607.0,
                        "attraction": 0,
                        "prepare": 0,
                        "other_charges": 0,
                        "amortization": 0,
                        "rent_expenses": 0,
                        "repair": 0,
                        "salary": 0,
                        "other_expenses": 0,
                        "profit": -455607.0
                    }
                }
            },
            date_begin: "",
            date_end: "",

        }
    },
    computed: {
        HowManyNewCells() {
            return this.getCollection.length + 2
        },
        getCollection() {
            let newCollection = new Set()
            for (let i in this.data) {
                if (typeof this.data[i] == 'object') {
                    for (let month in this.data[i]) {
                        if (this.CheckValue(month)) {
                            newCollection.add(month)
                        }
                    }
                    return [...newCollection]
                }
                return
            }
        }
    },
    methods: {
        CheckValue(value) {
            let index = value;
            if (
                index != 'loading_revenue' &&
                index != 'rent_revenue' &&
                index != 'penalties' &&
                index != "tariff" &&

                index != 'attraction' &&
                index != 'prepare' &&
                index != 'other_charges' &&
                index != "amortization" &&

                index != 'rent_expenses' &&
                index != 'repair' &&
                index != 'salary' &&
                index != "other_expenses" &&
                index != "profit"
            ) {
                return true;
            }
        },
        getNextKey(obj) {
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let i of keys) {
                if (
                    i == 'loading_revenue' ||
                    i == 'rent_revenue' ||
                    i == 'penalties' ||
                    i == "tariff" ||

                    i == 'attraction' ||
                    i == 'prepare' ||
                    i == 'other_charges' ||
                    i == "amortization" ||

                    i == 'rent_expenses' ||
                    i == 'repair' ||
                    i == 'salary' ||
                    i == "other_expenses" ||
                    i == "profit") {
                    continue;
                } else {
                    correctKeys.push(i);
                }
            }
            return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
        },
        Actioned() {
            this.loader = true;
            api
                .getUO15(this.date_begin, this.date_end)
                .then((response) => {
                    this.loader = false;
                    this.data = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.loader = false;
                });


        },
        getCurrentData(data) {
            this.date_begin = data.date_begin;
            this.date_end = data.date_end;
        },
    }
}
</script>


<style scoped>
th {
    white-space: nowrap;
}
</style>
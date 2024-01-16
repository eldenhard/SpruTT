<template>
    <div>
        <Loader :loader="loader" />

        <p>Форма 4.24. "Простои в ремонте"</p>
        <div style="display: flex; justify-content: space-between;" class="filter_block">

            <div style="display: flex; flex-direction: column;">

                <label for="" style="color: gray;">
                    Тип вагона
                    <br />
                    <input type="checkbox" :id="'john' + today" value="ПВ" v-model="wag_type">
                    <label :for="'john' + today" style="color: black;">&nbsp;Полувагон</label>
                    <br>
                    <input type="checkbox" :id="'mike' + today" value="ЦС" v-model="wag_type">
                    <label :for="'mike' + today" style="color: black;">&nbsp;Цистерна</label>
                </label>
            </div>
            <Periods @Action="Actioned" @data="getCurrentData" style="width: 30%" />
        </div>


        <h4 class="NoData" v-show="NoData">По заданным параметрам нет данных</h4>
        <div style="margin: 2% auto; width: 100%; overflow: auto;">
            <table>
                <tbody v-if="Object.keys(data1).length > 1">
                    <template v-for="(item, index) in data1" v-if="CheckValue(index)">
                        <tr :key="item.id">
                        <tr style="background: rgb(242, 252, 241);">
                            <td colspan="4" @click="CheckClientOpen(index, $event)" style="font-weight: 700;">{{ index }}
                            </td>
                        </tr>
                        <tr :data-attr='index' class="block_element"
                            style="background: rgb(240, 240, 240); font-weight: 500;">
                            <td>Показатель</td>
                            <td>Всего</td>
                            <td>ПВ</td>
                            <td>ЦС</td>
                        </tr>
                        <tr :data-attr='index' class="block_element">
                            <td>Кол-во ремонтов</td>
                            <td>{{ data1[index]?.amount }}</td>
                            <template>
                                <td>{{ data1[index]['Полувагон']?.amount }}</td>
                                <td>{{ data1[index]['Цистерна']?.amount }}</td>
                            </template>
                        </tr>
                        <tr :data-attr='index' class="block_element">
                            <td>Средний простой в ремонте</td>
                            <td>{{ AverageValue(data1[index]['downtime']) }}</td>
                            <template>
                                <td>{{ AverageValue(data1[index]['Полувагон']?.downtime) }}</td>
                                <td>{{ AverageValue(data1[index]['Цистерна']?.downtime) }}</td>
                            </template>
                        </tr>
                        <tr :data-attr='index' class="block_element">
                            <td>Норматив простоя в ремонте</td>
                            <td>{{ data1[index]['standard'] }}</td>
                            <template>
                                <td>{{ data1[index]['Полувагон']?.standard }}</td>
                                <td>{{ data1[index]['Цистерна']?.standard }}</td>
                            </template>
                        </tr>
                        <tr :data-attr='index' class="block_element">
                            <td>Отклонение</td>
                            <td>{{ data1[index]['deviation'] }}</td>
                            <template>
                                <td>{{ data1[index]['Полувагон']?.deviation }}</td>
                                <td>{{ data1[index]['Цистерна']?.deviation }}</td>
                            </template>
                        </tr>
                        <tr :data-attr='index' class="block_element">
                            <td>Потери</td>
                            <td>{{ data1[index]['loss'] }}</td>
                            <template>
                                <td>{{ data1[index]['Полувагон']?.loss }}</td>
                                <td>{{ data1[index]['Цистерна']?.loss }}</td>
                            </template>
                        </tr>


                        </tr>
                    </template>
                    <br>
                    <tr style="background: lightgrey; font-weight: bold;">
                        <td>Показатель</td>
                        <td>Всего</td>
                        <td>ПВ</td>
                        <td>ЦС</td>
                    </tr>

                    <tr style="background: lightgrey;">
                        <td>Кол-во ремонтов</td>
                        <td>{{ data1['amount'] }}</td>
                        <template>
                            <td>{{ totalAmount('Полувагон') }}</td>
                            <td>{{ totalAmount('Цистерна') }}</td>
                        </template>
                    </tr>
                    <tr style="background: lightgrey;">
                        <td>Средний простой в ремонте</td>
                        <td>{{ AverageValue(data1['downtime']) }}</td>
                        <template>
                            <td>{{ totalDowntime('Полувагон') }}</td>
                            <td>{{ totalDowntime('Цистерна') }}</td>
                        </template>
                    </tr>
                    </tr>
                    <tr style="background: lightgrey;">
                        <td>Норматив простоя в ремонте</td>
                        <td>{{ data1['standard'] }}</td>
                        <template>
                            <td>{{ totalStandard('Полувагон') }}</td>
                            <td>{{ totalStandard('Цистерна') }}</td>
                        </template>
                    </tr>
                    </tr>
                    <tr style="background: lightgrey;">
                        <td>Отклонение</td>
                        <td>{{ data1['deviation'] }}</td>
                        <template>
                            <td>{{ totalDeviation('Полувагон') }}</td>
                            <td>{{ totalDeviation('Цистерна') }}</td>
                        </template>
                    </tr>
                    </tr>
                    <tr style="background: lightgrey;">
                        <td>Потери</td>
                        <td>{{ data1['loss'] }}</td>
                        <template>
                            <td>{{ totalLoss('Полувагон') }}</td>
                            <td>{{ totalLoss('Цистерна') }}</td>
                        </template>
                    </tr>
                    </tr>


                </tbody>
            </table>
        </div>

        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>

<style scoped>
.check_element {
    background: rgb(142, 182, 182);
    font-weight: bold;
}

.block_element {
    display: none;
}

.filter_block {
    display: flex;
    justify-content: space-between;
    padding: 2%;
    border: 1px solid lightgrey
}

.NoData {
    text-align: center;
    margin-top: 15%;
}
</style>
<script>
import Periods from "./Periods.vue";
import api from "@/api/reportUO"
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
import AverageValue from '@/mixins/AverageValue'
export default {
    components: { Periods, Notifications, Loader },
    mixins: [AverageValue],

    data() {
        return {
            today: "",
            NoData: false,
            data1: {
                "2. ТР-2": {
                    "amount": 261,
                    "cost": 1412209.3300000012,
                    "standard": 0,
                    "deviation": 0,
                    "loss": 0,
                    "downtime": [
                        5,
                        0,
                        0,
                        0,
                        0,
                        0,
                        16,
                        16,
                        16,
                    ],

                    "Полувагон": {
                        "amount": 116,
                        "cost": 772757.9000000001,
                        "downtime": [
                            5,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            14,
                            14,
                            14,
                            14,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            1,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            9,
                            9,
                            3,
                            3,
                            3,
                            3,
                            0,
                            0,
                            0,
                            0,
                            5,
                            5,
                            16,
                            16,
                            16,
                            16,
                            15,
                            15,
                            15,
                            15,
                            2,
                            2,
                            2,
                            2,
                            1,
                            1,
                            1,
                            1,
                            2,
                            2,
                            2,
                            2,
                            6,
                            6,
                            6,
                            6,
                            6,
                            6,
                            6,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            5,
                            5,
                            9,
                            9,
                            16,
                            16,
                            16,
                            16
                        ],
                        "standard": 0,
                        "deviation": 0,
                        "loss": 0
                    },
                    "Цистерна": {
                        "amount": 145,
                        "cost": 639451.43,
                        "downtime": [
                            0,
                            0,
                            0,
                            0,
                            16,
                            16,
                        ],
                        "standard": 0,
                        "deviation": 0,
                        "loss": 0
                    }
                },
                "amount": 291,
                "cost": 3318301.9899999974,
                "downtime": [
                    5,
                    0,
                    0,
                    0,
                    0,
                    0,
                    16,
                    16,
                    16,
                    16,
                    16,
                    16,
                    16,
                    0,
                    0,
                    0,
                    0,
                    0,
                    3,
                    3,
                    3,
                    3,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    3,
                    3,
                    3,
                    3,
                    3,
                    3,
                    3,
                    14,
                    14,
                    14,
                    14,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    7,
                    7,
                    7,
                    7,
                    7,
                    1,
                    1,
                    1,
                    3,
                    3,
                    3,
                    3,
                    2,
                    2,
                    2,
                    2,
                    2,
                    1,
                    1,
                    1,
                    1,
                    24,
                    24,
                    24,
                    24,
                    1,
                    1,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    3,
                    3,
                    3,
                    3,
                    3,
                    1,
                    1,
                    1,
                    4,
                    4,
                    4,
                    4,
                    4,
                    0,
                    0,
                    0,
                    9,
                    9,
                    3,
                    3,
                    3,
                    3,
                    2,
                    2,
                    15,
                    15,
                    15,
                    1,
                    1,
                    1,
                    0,
                    0,
                    0,
                    0,
                    5,
                    5,
                    16,
                    16,
                    16,
                    16,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    15,
                    15,
                    15,
                    15,
                    4,
                    4,
                    4,
                    9,
                    4,
                    4,
                    4,
                    4,
                    4,
                    4,
                    1,
                    1,
                    3,
                    0,
                    0,
                    0,
                    0,
                    9,
                    9,
                    9,
                    3,
                    3,
                    2,
                    2,
                    2,
                    1,
                    6,
                    1,
                    2,
                    2,
                    2,
                    3,
                    1,
                    1,
                    1,
                    1,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    6,
                    6,
                    6,
                    6,
                    6,
                    6,
                    6,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    5,
                    5,
                    30,
                    30,
                    30,
                    30,
                    30,
                    2,
                    2,
                    9,
                    9,
                    2,
                    2,
                    16,
                    16,
                    16,
                    16
                ],
                "standard": 0,
                "deviation": 0,
                "loss": 0,
                "3. ДР": {
                    "amount": 5,
                    "cost": 275992.66,
                    "downtime": [
                        0,
                        0,
                        0,
                        1,
                        1
                    ],
                    "standard": 0,
                    "deviation": 0,
                    "loss": 0,
                    "Полувагон": {
                        "amount": 1,
                        "cost": 81000,
                        "downtime": [
                            0
                        ],
                        "standard": 0,
                        "deviation": 0,
                        "loss": 0
                    },
                    "Цистерна": {
                        "amount": 4,
                        "cost": 194992.66,
                        "downtime": [
                            0,
                            0,
                            1,
                            1
                        ],
                        "standard": 0,
                        "deviation": 0,
                        "loss": 0
                    }
                },
                "4. КР": {
                    "amount": 11,
                    "cost": 1264000,
                    "downtime": [
                        3,
                        3,
                        3,
                        3,
                        1,
                        1,
                        1,
                        3
                    ],
                    "standard": 0,
                    "deviation": 0,
                    "loss": 0,
                    "Цистерна": {
                        "amount": 10,
                        "cost": 1129000,
                        "downtime": [
                            3,
                            3,
                            3,
                            3,
                            1,
                            1,
                            1
                        ],
                        "standard": 0,
                        "deviation": 0,
                        "loss": 0
                    },
                    "Полувагон": {
                        "amount": 1,
                        "cost": 135000,
                        "downtime": [
                            3
                        ],
                        "standard": 0,
                        "deviation": 0,
                        "loss": 0
                    }
                },
                "КР": {
                    "amount": 1,
                    "cost": 8100,
                    "downtime": [
                        3
                    ],
                    "standard": 0,
                    "deviation": 0,
                    "loss": 0,
                    "Цистерна": {
                        "amount": 1,
                        "cost": 8100,
                        "downtime": [
                            3
                        ],
                        "standard": 0,
                        "deviation": 0,
                        "loss": 0
                    }
                },
                "1. ТР-1": {
                    "amount": 13,
                    "cost": 358000,
                    "downtime": [
                        3,
                        3,
                        2,
                        1,
                        6,
                        1,
                        2,
                        3,
                        2,
                        2,
                        2,
                        2
                    ],
                    "standard": 0,
                    "deviation": 0,
                    "loss": 0,
                    "Полувагон": {
                        "amount": 13,
                        "cost": 358000,
                        "downtime": [
                            3,
                            3,
                            2,
                            1,
                            6,
                            1,
                            2,
                            3,
                            2,
                            2,
                            2,
                            2
                        ],
                        "standard": 0,
                        "deviation": 0,
                        "loss": 0
                    }
                }
            },
            date_begin: "",
            date_end: "",
            loader: false,
            wag_type: [],
            wagon_belong: "",
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",

            testtest: [],
        }
    },
    mounted() {
        this.today = new Date().getMilliseconds() + Math.random() * 150
    },

    methods: {

        totalDowntime(type1) {
            return Object.values(this.data1).reduce((total, item) => {
        const values = item[type1]?.downtime || []; // Получаем массив значений

        if (values.length > 0) {
            const sum = values.reduce((acc, value) => {
                const parsedValue = parseFloat(value); // Преобразуем значение в число

                if (!isNaN(parsedValue)) {
                    return acc + parsedValue; // Суммируем только числовые значения
                }

                return acc;
            }, 0);

            const average = sum / values.length; // Находим среднее арифметическое
            const roundedAverage = Math.round(average * 100) / 100; // Округляем до двух знаков после запятой

            return total + roundedAverage; // Добавляем округленное среднее арифметическое к общей сумме
        }

        return total;
    }, 0);
        },

  

        totalStandard(type1) {
            return Object.values(this.data1).reduce((total, item) => {
                return (
                    total + (item[type1]?.standard || 0)
                )
            }, 0)
        },
        totalAmount(type1) {
            return Object.values(this.data1).reduce((total, item) => {
                return (
                    total + (item[type1]?.amount || 0)
                )
            }, 0)
        },
        totalDeviation(type1) {
            return Object.values(this.data1).reduce((total, item) => {
                return (
                    total + (item[type1]?.deviation || 0)
                )
            }, 0)
        },
        totalLoss(type1) {
            return Object.values(this.data1).reduce((total, item) => {
                return (
                    total + (item[type1]?.loss || 0)
                )
            }, 0)
        },
        SumElement(val) {

            return val
        },
        CheckClientOpen(val, event) {
            event.target.classList.toggle('check_element')
            let trs = document.getElementsByTagName('tr')
            for (let tr of trs) {
                if (tr.getAttribute('data-attr') == val) {
                    tr.classList.toggle('block_element')
                } else {
                    continue
                }
            }
        },
        Translate(val) {
            switch (val) {
                case 'amount':
                    return 'Количество'
                    break
                case 'cost':
                    return 'Сумма'
                    break
                case 'downtime':
                    return 'Простой'
                    break
                case val:
                    return val
                    break
                case "":
                    return 'Не определено'
                    break

            }
        },
        FilterValue(val) {
            return String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        },
        TEST(obj) {
            let arr = []
            for (let i in obj) {
                arr.push([i, obj[i]])
            }
            arr.sort(function (a, b) {
                if (Array.isArray(a[1])) {
                    return 1
                }
                if (Array.isArray(b[1])) {
                    return -1
                }
                if (Array.isArray(a[1]) && Array.isArray(b[1])) {
                    return 0
                }
                if (typeof a[1] < typeof b[1]) {
                    return 1
                }
                if (typeof a[1] > typeof b[1]) {
                    return -1
                }
                return 0;
            });
            return arr
        },

        CheckValue(value) {
            let index = value;
            if (
                index != 'amount' &&
                index != 'cost' &&
                index != 'downtime' &&
                index != 'standard' &&
                index != 'deviation' &&
                index != 'loss'
            ) {
                return true;
            }
        },
        getNextKey(obj) {
            let correctKeys = [];
            for (let i of keys) {
                if (
                    index != 'amount' ||
                    index != 'cost' ||
                    index != 'downtime' ||
                    index != 'standard' ||
                    index != 'deviation' ||
                    index != 'loss') {
                    continue;
                } else {
                    correctKeys.push(i);
                }
            }
            return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
        },


        Actioned() {
            this.NoData = false
            if (this.wag_type.length == 0 || this.date_begin == "" || this.date_end == "") {
                this.notifyHead = "Ошибка";
                this.notifyMessage = 'Заполните все поля';
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 2000);
                return
            } else {

                this.loader = true;

                api
                    .getUO424(this.date_begin, this.date_end, this.wag_type.join(','))
                    .then((response) => {
                        this.loader = false;
                        this.data1 = response.data

                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
            }

        },
        getCurrentData(data) {
            this.date_begin = data.date_begin;
            this.date_end = data.date_end;
        },

    }
}
</script>
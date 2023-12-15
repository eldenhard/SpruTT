<template>
    <div>
        <p class="explanation">* По клику на строку таблицы вы можете дополнительно выделить её цветом, для собственных
            нужд, <br>
            для снятия выделения повторно кликните на этот элменет</p>
        <p>Форма 4.23. "Депо плановых ремонтов"</p>
        <Loader :loader="loader" />
        <Periods @Action="Actioned" @data="getCurrentData" />
        <div style="overflow: auto; margin-top: 4%;">
            <table>
                <thead>
                    <tr>
                        <th rowspan="2">Наименование ВРД</th>
                        <th rowspan="2">Доля, %</th>
                        <th rowspan="2">Всего в т.ч</th>
                        <th colspan="2">ПВ</th>
                        <th colspan="2">ЦС</th>
                    </tr>
                    <tr>
                        <th>Доля по ВРД, %</th>
                        <th>Всего в т.ч</th>
                        <th>Доля по ВРД, %</th>
                        <th>Всего в т.ч</th>
                    </tr>
                    <tr class="RowAlphabet">
                        <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                    </tr>
                </thead>
                <tbody v-if="Object.keys(this.data).length > 0">
                    <template v-for="item, index in data">
                        <tr @click="ChangeColorRow($event.target)">
                            <td v-if="CheckValue(index)">{{ index }}</td>
                            <td v-if="CheckValue(index)">{{ (item.hash_value / data.hash_value * 100)?.toFixed(2) }} %</td>
                            <td v-if="CheckValue(index)">{{ item.hash_value }}</td>

                            <td v-if="CheckValue(index)">
                                {{ isNaN(item['Полувагон']?.hash_value / item.hash_value) ? "0" :
                                    (item['Полувагон']?.hash_value / item.hash_value * 100)?.toFixed(2) }} %
                            </td>

                            <td v-if="CheckValue(index)">{{ item['Полувагон']?.hash_value ?? '0' }}</td>

                            <td v-if="CheckValue(index)">{{ isNaN(item['Цистерна']?.hash_value / item.hash_value) ? 0 :
                                (item['Цистерна']?.hash_value / item.hash_value * 100)?.toFixed(2) }} %</td>
                            <td v-if="CheckValue(index)">
                                {{ item['Цистерна']?.hash_value ?? '0' }}</td>
                        </tr>
                    </template>
                    <tr class="GrandTotal">
                        <td>Итого</td>
                        <td></td>
                        <td>{{ data.hash_value }}</td>
                        <td>{{ (sumPoluvagon / data.hash_value * 100)?.toFixed(2) }} %</td>
                        <td>{{ sumPoluvagon }}</td>
                        <td>{{ (sumTsisterna / data.hash_value * 100)?.toFixed(2) }} %</td>
                        <td>{{ sumTsisterna }}</td>
                    </tr>
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

            data: "",
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            amount_cols: 0,
            loader: false,
            sumPoluvagon: 0,
            sumTsisterna: 0,
            date_begin: "",
            date_end: "",

        }
    },
    
    computed: {
        getTh() {
            return this.alphabet.slice(0, 7)
        },
    },
    watch: {
        data: {
            immediate: true,
            handler() {
                this.calculateSums();
            },
        },
    },
    methods: {
        ChangeColorRow(element) {
            if (element.parentNode.classList.contains('active_row')) {
                element.parentNode.classList.remove('active_row')
            } else {
                element.parentNode.classList.add('active_row')
            }
        },
        calculateSums() {
            this.sumPoluvagon = Object.values(this.data).reduce((sum, item) => {
                return sum + (item['Полувагон']?.hash_value || 0);
            }, 0);

            this.sumTsisterna = Object.values(this.data).reduce((sum, item) => {
                return sum + (item['Цистерна']?.hash_value || 0);
            }, 0);
        },
        CheckValue(value) {
            let client = value;
            if (
                client != 'hash_value'
            ) {
                return true;
            }
        },
        Actioned() {
            this.loader = true;
            api
                .getUO423(this.date_begin, this.date_end)
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
        getNextKey(obj) {
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let i of keys) {
                if (
                    i == 'hash_value') {
                    continue;
                } else {
                    correctKeys.push(i);
                }
            }
            return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
        },
        getRowCount(obj) {
            let total = 0;
            let last_item = '';
            obj.attr1.forEach((item) => {
                total += item.attr3.length;
            });
            return total;
        }
    }
}
</script>

<style scoped>
@import '../../../style/UOTableStyle.css';

td,
th {
    white-space: nowrap;
    padding: 0 10px !important;
}

tr>td:first-child {
    text-align: left !important;
}

tr:hover {
    background: lightcyan;
}
</style>
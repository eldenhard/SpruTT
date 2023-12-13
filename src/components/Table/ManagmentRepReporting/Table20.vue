
<template>
    <div>
        <p>Форма 4.20. "Совокупная операционная прибыль от предоставления вагонов под погрузку"</p>
        <Loader :loader="loader" />
        <Periods @Action="Actioned" @data="getCurrentData" />
        <div style="overflow: auto; margin: 4% auto;">
            <table>
                <thead>
                    <tr>
                        <th>Принадлежность парка</th>
                        <th>Группа вагонов</th>
                        <th>Кол-во отправок</th>
                        <th>Объем перевозки, тн.</th>

                        <th>Операционная прибыль, в т.ч</th>
                        <th>Маржинальный доход (+)</th>
                        <th>Штрафы (+)</th>
                        <th>Расходы на аренду (-)</th>

                        <th>Расходы на текущий ремонт и з/ч (-)</th>
                        <th>Амортизация (-)</th>
                        <th>Расходы на оплату труда в составе произв. расходов (-)</th>
                        <th>Прочие произв. расходы (-)</th>
                    </tr>
                    <tr class="RowAlphabet">
                        <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                    </tr>
                </thead>
                <tbody v-if="Object.keys(data).length > 1">
                    <template v-for="item, belong_wagon in data">
                        <template v-for="dataBelongWagon, inxData in getNextKey(item)">
                            <tr>
                                <td v-if="CheckValue(belong_wagon)" :key="inxData">{{ TransLateBelong(belong_wagon) }}</td>
                                <td v-if="CheckValue(belong_wagon)">{{ dataBelongWagon }}</td>
                                <td>{{ item[dataBelongWagon]['aid'] | format }}</td>
                                <td>{{ item[dataBelongWagon]['weight'] | format }}</td>
                                <td>{{ item[dataBelongWagon]['oper_profit'] | format }}</td>
                                <td>{{ item[dataBelongWagon]['margin_income'] | format }}</td>
                                <td>{{ item[dataBelongWagon]['penalties'] | format }}</td>
                                <td>{{ item[dataBelongWagon]['rent_expenses'] | format }}</td>
                                <td>{{ item[dataBelongWagon]['current_repair_expenses'] | format }}</td>
                                <td>{{ item[dataBelongWagon]['amortization'] | format }}</td>
                                <td>{{ item[dataBelongWagon]['salary'] | format }}</td>
                                <td>{{ item[dataBelongWagon]['other_charges'] | format }}</td>
                            </tr>
                        </template>
                        <tr class="Total_1" v-if="CheckValue(belong_wagon)">
                        <td v-if="CheckValue(belong_wagon)" colspan="2">Итого: {{ TransLateBelong(belong_wagon) }}</td>
                        <td>{{ item['aid'] | format }}</td>
                        <td>{{ item['weight'] | format }}</td>
                        <td>{{ item['oper_profit'] | format }}</td>
                        <td>{{ item['margin_income'] | format }}</td>
                        <td>{{ item['penalties'] | format }}</td>
                        <td>{{ item['rent_expenses'] | format }}</td>
                        <td>{{ item['current_repair_expenses'] | format }}</td>
                        <td>{{ item['amortization'] | format }}</td>
                        <td>{{ item['salary'] | format }}</td>
                        <td>{{ item['other_charges'] | format }}</td>
                    </tr>
                    </template>
                    <tr class="Total_2">
                        <td  colspan="2">Общий итог</td>
                        <td>{{ data['aid'] | format }}</td>
                        <td>{{ data['weight'] | format }}</td>
                        <td>{{ data['oper_profit'] | format }}</td>
                        <td>{{ data['margin_income'] | format }}</td>
                        <td>{{ data['penalties'] | format }}</td>
                        <td>{{ data['rent_expenses'] | format }}</td>
                        <td>{{ data['current_repair_expenses'] | format }}</td>
                        <td>{{ data['amortization'] | format }}</td>
                        <td>{{ data['salary'] | format }}</td>
                        <td>{{ data['other_charges'] | format }}</td>
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
            loader: false,

            data: "",
            date_begin: "",
            date_end: "",
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            amount_cols: 0,

        }
    },
    computed: {
        getTh() {

            return this.alphabet.slice(0, 12)
        },
    },
    filters: {
        format(value) {
            if (value != "" && !!value) {
                let TwoSignNum = value?.toFixed(2)
                return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            }
            return value

        },
    },
    methods: {
        CheckValue(value) {
            let client = value;
            if (
                client != 'aid' &&
                client != 'weight' &&
                client != 'margin_income' &&
                client != 'penalties' &&
                client != "rent_expenses" &&
                client != 'current_repair_expenses' &&
                client != 'amortization' &&
                client != 'salary' &&
                client != "other_charges" &&
                client != 'oper_profit'
            ) {
                return true;
            }
        },
        getNextKey(obj) {
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let i of keys) {
                if (
                    i == 'aid' ||
                    i == 'weight' ||
                    i == 'margin_income' ||
                    i == 'penalties' ||
                    i == "rent_expenses" ||
                    i == 'current_repair_expenses' ||
                    i == 'amortization' ||
                    i == 'salary' ||
                    i == "other_charges" ||
                    i == 'oper_profit') {
                    continue;
                } else {
                    correctKeys.push(i);
                }
            }
            return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
        },
        TransLateBelong(val) {
            if (val != "" && !!val) {
                switch (val) {
                    case "А":
                        return "Арендованный";
                        break;
                    case "АА":
                        return "Арендованный сдан в аренду";
                        break;
                    case "АЛ":
                        return "Арендованный в лизинге";
                        break;
                    case "С":
                        return "Собственный";
                        break;
                    case "СЛ":
                        return "СЛ";
                        break;
                    case "СВ":
                        return "Взят в скрытую аренду";
                        break;
                    case "Ч":
                        return "Чужой";
                        break;
                    case "СА":
                        return "Собственный сдан в аренду";
                        break;

                    case "ЛА":
                        return "Взят в лизинг сдан в аренду";
                        break;

                }
            }
            return val
        },
        Actioned() {
            this.loader = true;
            api
                .getUO20(this.date_begin, this.date_end)
                .then((response) => {
                    this.loader = false;
                    console.log(this.data)
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
<template>
    <div>
        <p class="explanation">* По клику на строку таблицы вы можете дополнительно выделить её цветом, для собственных нужд, <br>
         для снятия выделения повторно кликните на этот элменет</p>

        <p>Форма 4.21. "Анализ маржинального дохода по сегменту вагоно-цистерн"</p>

        <Loader :loader="loader" />
        <Periods @Action="Actioned" @data="getCurrentData" />
        <div style="overflow: auto; margin: 4% auto;">
            <table>
                <thead>
                    <tr>
                        <th>Станция погрузки</th>
                        <th>Принадлежность парка</th>
                        <th>Группа вагонов</th>
                        <th>Объем перевозки, тн.</th>
                        <th>Вагонно-сутки</th>
                        <th>Доходность на в/с</th>
                        <th>Маржинальный доход </th>
                        <th>Выручка (+)</th>
                        <th>Штрафы (+)</th>
                        <th>Экспедирование </th>
                        <th>Тариф порожний (-) </th>
                        <th>Тариф груженый (-) </th>
                        <th>Тариф СТ (-) </th>
                        <th>ППС (-) </th>
                        <th>Прочие перем. расходы (-)</th>
                    </tr>
                    <tr class="RowAlphabet">
                        <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                    </tr>
                </thead>
                <tbody v-if="Object.keys(data).length > 1">
                    <template v-for="item, StationLoaded in data">
                        <template v-for="belongPark in getNextKey(item)">
                            <template v-for="wagonType in getNextKey(item[belongPark])">
                                <tr v-if="CheckValue(StationLoaded)">
                                    <td @click="ChangeColorRow($event.target)">{{ StationLoaded }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ TransLateBelong(belongPark) }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ wagonType }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['weight'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['travel_time'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['dohod_vs'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['margin_income'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['revenue'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['penalties'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['expedition'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['tariff_empty'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['tariff_loaded'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['tariff_inroad'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['pps'] | format }}</td>
                                    <td @click="ChangeColorRow($event.target)">{{ item[belongPark]['other_charges'] | format }}</td>
                                </tr>
                            </template>

                        </template>
                        <tr v-if="CheckValue(StationLoaded)" class="Total_1">
                            <td colspan="3">Итого: {{ StationLoaded }}</td>
                            <td>{{ item['weight'] | format }}</td>
                            <td>{{ item['travel_time'] | format }}</td>
                            <td>{{ item['dohod_vs'] | format }}</td>
                            <td>{{ item['margin_income'] | format }}</td>
                            <td>{{ item['revenue'] | format }}</td>
                            <td>{{ item['penalties'] | format }}</td>
                            <td>{{ item['expedition'] | format }}</td>
                            <td>{{ item['tariff_empty'] | format }}</td>
                            <td>{{ item['tariff_loaded'] | format }}</td>
                            <td>{{ item['tariff_inroad'] | format }}</td>
                            <td>{{ item['pps'] | format }}</td>
                            <td>{{ item['other_charges'] | format }}</td>
                        </tr>
                    </template>
                    <tr class="Total_2">
                        <td colspan="3">Итого: </td>
                        <td>{{ data['weight'] | format }}</td>
                        <td>{{ data['travel_time'] | format }}</td>
                        <td>{{ data['dohod_vs'] | format }}</td>
                        <td>{{ data['margin_income'] | format }}</td>
                        <td>{{ data['revenue'] | format }}</td>
                        <td>{{ data['penalties'] | format }}</td>
                        <td>{{ data['expedition'] | format }}</td>
                        <td>{{ data['tariff_empty'] | format }}</td>
                        <td>{{ data['tariff_loaded'] | format }}</td>
                        <td>{{ data['tariff_inroad'] | format }}</td>
                        <td>{{ data['pps'] | format }}</td>
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
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

            data: "",
            date_begin: "",
            date_end: "",
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            amount_cols: 0,

        }
    },
    computed: {
        getTh() {

            return this.alphabet.slice(0, 15)
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
        ChangeColorRow(element){
        if( element.parentNode.classList.contains('active_row')){
            element.parentNode.classList.remove('active_row')
        }else {
            element.parentNode.classList.add('active_row')
        }
    },
        CheckValue(value) {
            let client = value;
            if (
                client != 'travel_time' &&
                client != 'dohod_vs' &&
                client != 'expedition' &&
                client != 'margin_income' &&
                client != "other_charges" &&
                client != 'penalties' &&
                client != 'pps' &&
                client != 'revenue' &&
                client != "tariff_empty" &&
                client != 'tariff_inroad' &&
                client != 'travel_time' &&
                client != "weight" &&
                client != "tariff_loaded"
            ) {
                return true;
            }
        },
        getNextKey(obj) {
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let i of keys) {
                if (
                    i == 'travel_time' ||
                    i == 'dohod_vs' ||
                    i == 'expedition' ||
                    i == 'margin_income' ||
                    i == "other_charges" ||
                    i == 'penalties' ||
                    i == 'pps' ||
                    i == 'revenue' ||
                    i == "tariff_empty" ||
                    i == 'tariff_inroad' ||
                    i == 'travel_time' ||
                    i == "weight" ||
                    i == "tariff_loaded") {
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
                .getUO21(this.date_begin, this.date_end)
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
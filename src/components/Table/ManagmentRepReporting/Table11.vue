<template>
    <div>
        <Loader :loader="loader" />
      <p class="explanation">* По клику на строку таблицы вы можете дополнительно выделить её цветом, для собственных нужд, <br>
         для снятия выделения повторно кликните на этот элменет</p>
        <p>Форма 4.11. "Производство по наливным перевозкам (привлеченный парк)"</p>
        <Periods @Action="Actioned" @data="getCurrentData" />

        <br>
        <div  style="overflow: auto; max-height: 65vh;">
         
            <table>
                <thead>
                <tr class="TableHeader">
                    <th>Станций отпр</th>
                    <th>Станций назнач</th>
                    <th>Продукт</th>
                    <th>Ставка</th>
                    <th>Объем, тн</th>
                    <th>Выручка</th>
                    <th>Штрафы</th>
                    <th>Тариф груж.</th>
                    <th>Тариф порож.</th>
                    <th>Тариф СТ</th>
                    <th>Экспедирование</th>
                    <th>Подготовка</th>
                    <th>Доп услуги</th>
                    <th>МД</th>
                    <th>МД руб/тн</th>
                    <th>МД (без учета подготовки) руб.тн</th>
                </tr>
                <tr class="RowAlphabet">
                    <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                </tr>
            </thead>
                <tbody v-show="Object.keys(data).length > 0">
                    <template v-for="grandTotal, client in data">
                        <td  class="ClientRow" v-if="CheckValue(client)" @click="ChangeColorRow($event.target)" colspan="5">{{ client }}</td>
                        <td  class="ClientRow" v-if="CheckValue(client)" @click="ChangeColorRow($event.target)" colspan="5">{{ client }}</td>
                        <td  class="ClientRow" v-if="CheckValue(client)" @click="ChangeColorRow($event.target)" colspan="6">{{ client }}</td>

                        <template v-for="stationDepartment in getNextKey(grandTotal)">
                            <template v-for="stationDestination in getNextKey(grandTotal[stationDepartment])">
                                <template v-for="product in getNextKey(grandTotal[stationDepartment][stationDestination])">

                                <tr>
                                   
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ stationDepartment }}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ stationDestination }}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ product }}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ AverageValue(grandTotal[stationDepartment][stationDestination][product]['stavka_per_tone']) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['weight']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['revenue']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['penalties']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['tariff_loaded']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['tariff_empty']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['tariff_inroad']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['expedition']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['prepare']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['pps']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['md']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['md_per_tone']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ grandTotal[stationDepartment][stationDestination][product]['md_wo_prepare']?.toFixed(2) | format}}</td>

                                </tr>
                                </template>
          
                            </template>
                            <tr class="Total_1">
                                    <td v-if="CheckValue(client)" colspan="3">Итого: {{ stationDepartment }}</td>
                                    <td v-if="CheckValue(client)">{{ AverageValue(grandTotal[stationDepartment]['stavka_per_tone']) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['weight']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['revenue']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['penalties']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['tariff_loaded']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['tariff_empty']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['tariff_inroad']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['expedition']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['prepare']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['pps']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['md']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['md_per_tone']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal[stationDepartment]['md_wo_prepare']?.toFixed(2) | format}}</td>
                                </tr>
                        </template>
                        <tr class="Total_2">
                                    <td v-if="CheckValue(client)" colspan="3">Итого: {{ client }}</td>
                                    <td v-if="CheckValue(client)">{{ AverageValue(grandTotal['stavka_per_tone']) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['weight']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['revenue']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['penalties']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['tariff_loaded']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['tariff_empty']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['tariff_inroad']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['expedition']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['prepare']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['pps']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['md']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['md_per_tone']?.toFixed(2) | format}}</td>
                                    <td v-if="CheckValue(client)">{{ grandTotal['md_wo_prepare']?.toFixed(2) | format}}</td>
                                </tr>
                    </template>
                    <tr class="GrandTotal">
                                    <td colspan="3">Общий итог</td>
                                    <td>{{ AverageValue(data['stavka_per_tone']) | format}}</td>
                                    <td>{{ data['weight']?.toFixed(2) | format}}</td>
                                    <td>{{ data['revenue']?.toFixed(2) | format}}</td>
                                    <td>{{ data['penalties']?.toFixed(2) | format}}</td>
                                    <td>{{ data['tariff_loaded']?.toFixed(2) | format}}</td>
                                    <td>{{ data['tariff_empty']?.toFixed(2) | format}}</td>
                                    <td>{{ data['tariff_inroad']?.toFixed(2) | format}}</td>
                                    <td>{{ data['expedition']?.toFixed(2) | format}}</td>
                                    <td>{{ data['prepare']?.toFixed(2) | format}}</td>
                                    <td>{{ data['pps']?.toFixed(2) | format}}</td>
                                    <td>{{ data['md']?.toFixed(2) | format}}</td>
                                    <td>{{ data['md_per_tone']?.toFixed(2) | format}}</td>
                                    <td>{{ data['md_wo_prepare']?.toFixed(2) | format}}</td>
                                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
@import '../../../style/UOTableStyle.css';

td,
th {
    white-space: nowrap;

}

tr:hover {
    background: lightcyan;
}
</style>
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
            date_begin: "",
         date_end: "",
            wag_type: "",
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            loader: false,
            data: "",
        }
    },
    mounted() {
        // this.OpenChildren(document.getElementById('FuckingData11'), this.data)
    },
    filters: {
        format(value) {
          return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        },
      },
    computed:{
        getTh(){
            return this.alphabet.slice(0, 16)
        }
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
                client != "weight" &&
                client != "revenue" &&
                client != "penalties" &&
                client != "tariff_empty" &&
                client != "tariff_inroad" &&
                client != "tariff_loaded" &&
                client != "expedition" &&
                client != "prepare" &&
                client != "pps" &&
                client != "travel_time" &&
                client != "md" &&
                client != "stavka_per_tone" &&
                client != "income" &&
                client != "income_wo_prepare" &&
                client != 'md_per_tone' &&
                client != 'md_wo_prepare'
            ) {
                return true;
            }
        },
        getNextKey(obj) {
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let i of keys) {
                if (i == "weight" ||
                    i == "revenue" ||
                    i == "penalties" ||
                    i == "tariff_empty" ||
                    i == "tariff_inroad" ||
                    i == "tariff_loaded" ||
                    i == "expedition" ||
                    i == "prepare" ||
                    i == "pps" ||
                    i == "travel_time" ||
                    i == "stavka_per_tone" ||
                    i == "income" ||
                    i == "md" ||
                    i == "income_wo_prepare" ||
                    i == 'md_per_tone' ||
                    i == 'md_wo_prepare') {
                    continue;
                } else {
                    correctKeys.push(i);
                }
            }
            return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
        },
        Translate(val) {
            switch (val) {
                case 'amount':
                    return 'Количество'
                    break
                case 'cost':
                    return 'Сумма'
                    break
                case "product":
                    return 'Продукт'
                    break
                case "fine":
                    return 'Штраф'
                    break
                case "":
                    return 'Не определено'
                    break
                case val:
                    return val
                    break

            }
        },
        FilterValue(val) {
            return String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        },


        Actioned() {



            this.loader = true;
            api
                .getUO11(this.date_begin, this.date_end)
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
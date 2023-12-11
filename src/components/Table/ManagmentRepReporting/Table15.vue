<template>
    <div>
        <Loader :loader="loader" />
      <p class="explanation">* По клику на строку таблицы вы можете дополнительно выделить её цветом, для собственных нужд, <br>
         для снятия выделения повторно кликните на этот элменет</p>
        <p>Форма 4.15. "Анализ доходности по направлениям по сегменту вагоно-цистерн (привлеченный парк)"</p>
        <Periods @Action="Actioned" @data="getCurrentData" />
  
        <br>
        <div  style="overflow: auto; max-height: 65vh;">
         
            <table>
                <thead>
                <tr class="TableHeader">
                    <th>Груз</th>
                    <th>Станция выгрузки</th>
                    <th>Кол-во вагонов</th>
                    <th>Объем тн.</th>
                    <th>МД</th>
                    <th>Удельный МД, руб/тн</th>

                </tr>
                <tr class="RowAlphabet">
                    <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                </tr>
            </thead>
                <tbody v-show="Object.keys(data).length > 0">
                    <template v-for="AmountTotal, owner in data">
                        <td v-if="CheckValue(owner)" class="ClientRow" colspan="4">Станция погрузки: {{ owner }}</td>
                        <td v-if="CheckValue(owner)" class="ClientRow" colspan="3">Станция погрузки: {{ owner }}</td>
                        <template v-for="cargo in getNextKey(AmountTotal)">
                            <template v-for="stationDeparture in getNextKey(AmountTotal[cargo])">
                                <!-- <template v-for="stationDestination in getNextKey(AmountTotal[cargo][stationDeparture])"> -->
                                    <tr>
                                        <td v-if="CheckValue(owner)" @click="ChangeColorRow($event.target)">{{ cargo }}</td>
                                        <td v-if="CheckValue(owner)" @click="ChangeColorRow($event.target)">{{ stationDeparture }}</td>
                                        <td v-if="CheckValue(owner)" @click="ChangeColorRow($event.target)">{{ AmountTotal[cargo][stationDeparture]['wagon']?.toFixed(2) | format}}</td>
                                        <td v-if="CheckValue(owner)" @click="ChangeColorRow($event.target)">—</td>
                                        <td v-if="CheckValue(owner)" @click="ChangeColorRow($event.target)">{{ AmountTotal[cargo][stationDeparture]['md']?.toFixed(2) | format}}</td>
                                        <td v-if="CheckValue(owner)" @click="ChangeColorRow($event.target)">{{ AverageValue(AmountTotal[cargo][stationDeparture]['udelnii_md']) | format}}</td>
                                        <!-- <td v-if="CheckValue(owner)">{{ AmountTotal[cargo][stationDeparture] ?? "-" }}</td> -->
                                    </tr>
                                <!-- </template> -->
                            </template>
                            <tr class="Total_1">
                                <td v-if="CheckValue(owner)" colspan="2">Итого: {{ cargo }}</td>
                                <td v-if="CheckValue(owner)">{{ AmountTotal[cargo]['wagon']?.toFixed(2) | format}}</td>
                                <td v-if="CheckValue(owner)">—</td>
                                <td v-if="CheckValue(owner)">{{ AmountTotal[cargo]['md']?.toFixed(2) | format}}</td>
                                <td v-if="CheckValue(owner)">{{ AverageValue(AmountTotal[cargo]['udelnii_md']) | format}}</td>
                            </tr>

                        </template>
                        <tr class="Total_2">
                                <td v-if="CheckValue(owner)" colspan="2">Итого: {{ owner }}</td>
                                <td v-if="CheckValue(owner)">{{ AmountTotal['wagon']?.toFixed(2) | format}}</td>
                                <td v-if="CheckValue(owner)">—</td>
                                <td v-if="CheckValue(owner)">{{ AmountTotal['md']?.toFixed(2) | format}}</td>
                                <td v-if="CheckValue(owner)">{{ AverageValue(AmountTotal['udelnii_md']) | format}}</td>
                            </tr>
                    </template>
                    <tr class="GrandTotal">
                                <td v-if="CheckValue(owner)" colspan="2">Общий итог</td>
                                <td v-if="CheckValue(owner)">{{ data['wagon']?.toFixed(2) | format}}</td>
                                <td v-if="CheckValue(owner)">—</td>
                                <td v-if="CheckValue(owner)">{{ data['md']?.toFixed(2) | format}}</td>
                                <td v-if="CheckValue(owner)">{{ AverageValue(data['udelnii_md']) | format}}</td>
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
    padding: 0 10px !important;
  
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
          loader: false,
            wag_type: "",
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            loader: false,
            data: "",
           date_begin: "",
           date_end: "",
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
            return this.alphabet.slice(0, 6)
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
    TransLateBelong(val){
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
  },
        CheckValue(value) {
            let client = value;
            if (
                client !=  'wagon' &&
                client !=  'md' &&
                client != 'udelnii_md' &&
                client != "weight" 
            ) {
                return true;
            }
        },
        getNextKey(obj) {
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let i of keys) {
                if (
                i ==  'weight'  ||
                i ==  'md'  ||
                i == 'udelnii_md'  ||
                i == "wagon" ) {
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
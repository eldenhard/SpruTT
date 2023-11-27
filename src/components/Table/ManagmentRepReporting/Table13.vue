<template>
    <div>
        <Loader :loader="loader" />
      <p class="explanation">* По клику на строку таблицы вы можете дополнительно выделить её цветом, для собственных нужд, <br>
         для снятия выделения повторно кликните на этот элменет</p>
        <p>Форма 4.13. "Анализ доходности по сегменту вагоно-цистерн"</p>
        <Periods @Action="Actioned" @data="getCurrentData" />
  
        <br>
        <div  style="overflow: auto; max-height: 65vh;">
         
            <table>
                <thead>
                <tr class="TableHeader">
                  <th>Клиент</th>
                  <th>Станция погрузки</th>
                  <th>Объем, тн</th>
                  <th>Выручка</th>
                  <th>Штрафы</th>
                  <th>Тариф порож.</th>
                  <th>Тариф груж</th>
                  <th>Тариф СТ</th>
                  <th>Привлечение</th>
                  <th>Подготовка</th>
                  <th>Прочие услуги</th>
                  <th>Вагоно-сутки</th>
                  <th>МД</th>
                  <th>Доходность, руб./сут</th>
                  <th>Удельный МД, руб/тн</th>
                </tr>
                <tr class="RowAlphabet">
                    <th v-for="item in getTh" :key="item.id">{{ item.toUpperCase() }}</th>
                </tr>
            </thead>
                <tbody v-show="Object.keys(data).length > 0">
                    <template v-for="AllParkResult, park in data">
                        <td v-if="CheckValue(park)" colspan="5" class="ClientRow">Парк: {{ TransLateBelong(park) }}</td>
                        <td v-if="CheckValue(park)" colspan="5" class="ClientRow">Парк: {{ TransLateBelong(park) }}</td>
                        <td v-if="CheckValue(park)" colspan="5" class="ClientRow">Парк: {{ TransLateBelong(park) }}</td>
                      <template v-for="client in getNextKey(AllParkResult)">
                        <template v-for="stationDeparture in getNextKey(AllParkResult[client])">
                          <tr>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ client }}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ stationDeparture }}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)"> {{ AllParkResult[client]['weight']?.toFixed(2) | format}} </td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['revenue']?.toFixed(2)  | format}}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['penalties']?.toFixed(2)  | format}}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['tariff_empty']?.toFixed(2)  | format}}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['tariff_loaded']?.toFixed(2) | format }}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['tariff_inroad']?.toFixed(2)  | format}}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['attracting']?.toFixed(2) | format }}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['prepare']?.toFixed(2) | format }}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['pps']?.toFixed(2)  | format}}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['travel_time']?.toFixed(2) | format }}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AllParkResult[client]['md']?.toFixed(2)  | format}}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AverageValue(AllParkResult[client]['income']) | format}}</td>
                              <td v-if="CheckValue(park)" @click="ChangeColorRow($event.target)">{{ AverageValue(AllParkResult[client]['md_per_tone']) | format}}</td>
                          </tr>
                        </template>
                      </template>
                      <tr class="Total_1">
                        <td  v-if="CheckValue(park)" colspan="2">Итого: {{ TransLateBelong(park) }} парк</td>
                        <td v-if="CheckValue(park)"> {{ AllParkResult['weight']?.toFixed(2) | format}} </td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['revenue']?.toFixed(2)  | format}}</td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['penalties']?.toFixed(2)  | format}}</td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['tariff_empty']?.toFixed(2)  | format}}</td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['tariff_loaded']?.toFixed(2) | format }}</td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['tariff_inroad']?.toFixed(2)  | format}}</td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['attracting']?.toFixed(2) | format }}</td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['prepare']?.toFixed(2) | format }}</td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['pps']?.toFixed(2)  | format}}</td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['travel_time']?.toFixed(2) | format }}</td>
                        <td v-if="CheckValue(park)">{{ AllParkResult['md']?.toFixed(2)  | format}}</td>
                        <td v-if="CheckValue(park)">{{ AverageValue(AllParkResult['income']) | format}}</td>
                        <td v-if="CheckValue(park)">{{ AverageValue(AllParkResult['md_per_tone']) | format}}</td>
                      </tr>
                    </template>
                    <tr class="Total_2">
                        <td  colspan="2">Итого по всему парку</td>
                        <td> {{ data['weight']?.toFixed(2) | format}} </td>
                        <td>{{ data['revenue']?.toFixed(2)  | format}}</td>
                        <td>{{ data['penalties']?.toFixed(2)  | format}}</td>
                        <td>{{ data['tariff_empty']?.toFixed(2)  | format}}</td>
                        <td>{{ data['tariff_loaded']?.toFixed(2) | format }}</td>
                        <td>{{ data['tariff_inroad']?.toFixed(2)  | format}}</td>
                        <td>{{ data['attracting']?.toFixed(2) | format }}</td>
                        <td>{{ data['prepare']?.toFixed(2) | format }}</td>
                        <td>{{ data['pps']?.toFixed(2)  | format}}</td>
                        <td>{{ data['travel_time']?.toFixed(2) | format }}</td>
                        <td>{{ data['md']?.toFixed(2)  | format}}</td>
                        <td>{{ AverageValue(data['income']) | format}}</td>
                        <td>{{ AverageValue(data['md_per_tone']) | format}}</td>
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
            return this.alphabet.slice(0, 15)
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
                client !=  'weight' &&
                client !=  'penalties' &&
                client != 'tariff_empty' &&
                client !=  'tariff_loaded' &&
                client != 'tariff_inroad' &&
                client != 'attracting' &&
                client != 'prepare'  &&
                client != 'pps' &&
                client != 'md_per_tone' &&
                client != "aid" &&
                client != "revenue" &&
                client != "travel_time" &&
                client != "mean_turnover" &&
                client != "md" &&
                client != "income"
            ) {
                return true;
            }
        },
        getNextKey(obj) {
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let i of keys) {
                if (i == "weight" ||
                i == "aid" ||
                i == "revenue" ||
                i == "travel_time" ||
                i == "mean_turnover" ||
                i == "md" ||
                i == "income" ||
                  i ==  'weight' ||
                  i ==  'penalties' ||
                  i == 'tariff_empty' ||
                  i ==  'tariff_loaded' ||
                  i == 'tariff_inroad' ||
                  i == 'attracting' ||
                  i == 'prepare'  ||
                  i == 'pps' ||
                  i == 'md_per_tone') {
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
                .getUO13(this.date_begin, this.date_end)
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
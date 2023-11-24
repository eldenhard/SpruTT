<template>
    <div>
      <Loader :loader="loader" />
      <p class="explanation">* По клику на строку таблицы вы можете дополнительно выделить её цветом, для собственных нужд, <br>
         для снятия выделения повторно кликните на этот элменет</p>
        <p>Форма 4.10. "Производство по наливным перевозкам (собственный парк)"</p>
        <Periods @Action="Actioned" @data="getCurrentData" />
<br>
       <div style="overflow: auto; max-height: 65vh;">

        <table>
            <thead>
                <tr class="TableHeader">
                    <th>Станция отправления</th>
                    <th>Станция назначения</th>
                    <th>Продукт</th>
                    <th>Станция возврата</th>
                    <th>Ставка</th>
                    <th>Объем,тн</th>
                    <th>Выручка</th>
                    <th>Штрафы</th>
                    <th>Тариф груженый</th>
                    <th>Тариф порож.</th>
                    <th>Тариф СТ</th>
                    <th>Экспедирование</th>
                    <th>Подготовка</th>
                    <th>ППС</th>
                    <th>Вагоно-сутки</th>
                    <th>МД</th>
                    <th>Доходность, руб/сутки</th>
                    <th>Доходность (без подготовки)</th>
                </tr>
                <tr class="RowAlphabet ">
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                    <th>F</th>
                    <th>G</th>
                    <th>H</th>
                    <th>I</th>
                    <th>J</th>
                    <th>K</th>
                    <th>L</th>
                    <th>M</th>
                    <th>N</th>
                    <th>O</th>
                    <th>P</th>
                    <th>Q</th>
                    <th>R</th>
            </tr>
            </thead>
            <tbody v-show="Object.keys(data).length > 0">
              <template v-for="ClientValue, client in data">
                <td class="ClientRow" v-if="CheckValue(client)" colspan="6">{{ client }}</td>
                <td class="ClientRow" v-if="CheckValue(client)" colspan="6">{{ client }}</td>
                <td class="ClientRow" v-if="CheckValue(client)" colspan="7">{{ client }}</td>
                <template v-for="stationDeparture in getNextKey(ClientValue)">
                  <template v-for="stationDestination in getNextKey(ClientValue[stationDeparture])">
                    <template v-for="product in getNextKey(ClientValue[stationDeparture][stationDestination])">
                      <template v-for="stationBack in getNextKey(ClientValue[stationDeparture][stationDestination][product])">
                        <tr>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ stationDeparture }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ stationDestination }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ product }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ stationBack }}</td>
                          <!-- цифры -->
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ AverageValue(ClientValue[stationDeparture][stationDestination][product]['stavka_per_tone'])?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['weight']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['revenue']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['penalties']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['tariff_loaded']?.toFixed(2) | format }}</td>

                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['tariff_empty']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['tariff_inroad']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['expedition']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['prepare']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['pps']?.toFixed(2) | format }}</td>

                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['travel_time']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['md']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['income']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)" @click="ChangeColorRow($event.target)">{{ ClientValue[stationDeparture][stationDestination][product]['income_wo_prepare']?.toFixed(2) | format }}</td>
                        </tr>
                      </template>
       
                    </template>
                     
                  </template>
                      <tr class="Total_1">
                           <td v-if="CheckValue(client)" colspan="4">Итого: {{ stationDeparture }}</td>
                                 
                          <td v-if="CheckValue(client)">{{ AverageValue(ClientValue[stationDeparture]['stavka_per_tone']) | format}}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['weight']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['revenue']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['penalties']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['tariff_loaded']?.toFixed(2) | format }}</td>

                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['tariff_empty']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['tariff_inroad']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['expedition']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['prepare']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['pps']?.toFixed(2) | format }}</td>

                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['travel_time']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['md']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['income']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue[stationDeparture]['income_wo_prepare']?.toFixed(2) | format }}</td>
 
                    </tr>
                </template>
                    <tr class="Total_2">
                          <td v-if="CheckValue(client)" colspan="4">Итого: {{ client }}</td>

                          <td v-if="CheckValue(client)">{{ AverageValue(ClientValue['stavka_per_tone']) | format}}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['weight']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['revenue']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['penalties']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['tariff_loaded']?.toFixed(2) | format }}</td>

                          <td v-if="CheckValue(client)">{{ ClientValue['tariff_empty']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['tariff_inroad']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['expedition']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['prepare']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['pps']?.toFixed(2) | format }}</td>

                          <td v-if="CheckValue(client)">{{ ClientValue['travel_time']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['md']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['income']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ ClientValue['income_wo_prepare']?.toFixed(2) | format }}</td>
                    </tr>
              </template>
              <tr class="GrandTotal">
                          <td colspan="4">Всего по погрузке (собственный парк)</td>
                          <td>{{ AverageValue(data?.stavka_per_tone)}}</td>
                          <td>{{ data?.weight?.toFixed(2) | format }}</td>
                          <td>{{ data?.revenue?.toFixed(2) | format }}</td>
                          <td>{{ data?.penalties?.toFixed(2) | format }}</td>
                          <td>{{ data?.tariff_loaded?.toFixed(2) | format }}</td>

                          <td>{{ data?.tariff_empty?.toFixed(2) | format }}</td>
                          <td>{{ data?.tariff_inroad?.toFixed(2) | format }}</td>
                          <td>{{ data?.expedition?.toFixed(2) | format }}</td>
                          <td>{{ data?.prepare?.toFixed(2) | format }}</td>
                          <td>{{ data?.pps?.toFixed(2) | format }}</td>

                          <td>{{ data?.travel_time?.toFixed(2) | format }}</td>
                          <td>{{ data?.md?.toFixed(2) | format }}</td>
                          <td>{{ data?.income?.toFixed(2) | format }}</td>
                          <td>{{ data?.income_wo_prepare?.toFixed(2) | format }}</td>
                    </tr>
            </tbody>
        </table>
       </div>
    </div>
</template>

<style scoped>
@import '../../../style/UOTableStyle.css';
td,th{
    white-space: nowrap;
   
}
tr:hover{
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
    components: { Periods, Notifications, Loader },
    mixins: [AverageValue],

    data() {
        return {
            loader: false,
            wag_type: "",
            date_begin: "",
            date_end: "",
            data: "",

        }
    },
    mounted() {
        // this.OpenChildren(document.getElementById('FuckingData10'), this.data)
    },
    filters: {
        format(value) {
          return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
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
        client!= "md" &&
        client!= "stavka_per_tone" &&
        client!= "income" &&
        client != "income_wo_prepare"
      ) {
        return true;
      }
    },
      getNextKey(obj) {
      const keys = Object.keys(obj);
      let correctKeys = [];
      for (let i of keys) {
        if ( i == "weight" ||
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
        i == "income_wo_prepare") {
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
                .getUO10(this.date_begin, this.date_end)
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

    },


}

</script>


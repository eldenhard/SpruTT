<template>
  <div>
    <Loader :loader="loader" />

<Periods @Action="Actioned" @data="getCurrentData" />

    <p>
      Форма 4.9. "Производство по универсальным перевозкам (привлеченный парк)"
    </p>
    <div style="overflow: auto">
      <table>
        <thead>
          <tr  class="TableHeader">
            <th>Клиент</th>
            <th>Дорога отправления</th>
            <th>Станция отправления</th>
            <th>Дорога назначения</th>
            <th>Станция назначения</th>
            <th>Груз</th>
            <th>Вагоны</th>
            <th>Штрафы</th>
            <th>Экспедирование</th>
            <th>Тариф порожний</th>
            <th>Тариф по ин. дорогам</th>
            <th>Тариф груженый</th>
            <th>Подготовка</th>
            <th>ППС</th>
            <th>Время в пути</th>
            <th>Доход</th>
            <th>Выручка</th>
            <th>Ставка руб за вагон</th>
            <th>Оборот</th>
          </tr>
          <tr style="background: #FFD453;">
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
            <th>S</th>
          </tr>
        </thead>
        <tbody v-show="Object.keys(data).length > 0">
          <template v-for="(item, client) in data">
            <template v-for="road of getNextKey(item)">
              <template v-for="station_dest of getNextKey(item[road])">
                <template v-for="CountryDep of getNextKey(item[road][station_dest])">
                  <template
                    v-for="StationDep of getNextKey(
                      item[road][station_dest][CountryDep]
                    )"
                  >
                    <template
                      v-for="Cargo of getNextKey(
                        item[road][station_dest][CountryDep][StationDep]
                      )"
                    >
                      <tr>
                        <td v-if="CheckValue(client)">{{ client }}</td>
                        <td v-if="CheckValue(client)">{{ road }}</td>
                        <td v-if="CheckValue(client)">{{ station_dest }}</td>
                        <td v-if="CheckValue(client)">{{ CountryDep }}</td>
                        <td v-if="CheckValue(client)">{{ StationDep }}</td>
                        <td v-if="CheckValue(client)">{{ Cargo }}</td>
                        <td v-if="CheckValue(client)">
                          {{ item[road][station_dest][CountryDep][StationDep]?.wagon?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.penalties?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.expedition?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.tariff_empty?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.tariff_inroad?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.tariff_loaded?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.prepare?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.pps?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.travel_time?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.income?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{item[road][station_dest][CountryDep][StationDep]?.revenue?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{ AverageValue(item[road][station_dest][CountryDep][StationDep]?.stavka_rub_wagons)?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{ AverageValue(item[road][station_dest][CountryDep][StationDep]?.oborot)?.toFixed(2) | format}}
                        </td>
                      </tr>
                    </template>
                  </template>
                </template>
              </template>
            </template>
            <tr class="Total_1">
              <td colspan="6" v-if="CheckValue(client)">Итого {{ client }}</td>
              <td v-if="CheckValue(client)">{{ item?.wagon?.toFixed(2) }}</td>
              <td v-if="CheckValue(client)">
                {{ item?.penalties?.toFixed(2) | format}}
              </td>
              <td v-if="CheckValue(client)">
                {{ item?.expedition?.toFixed(2)| format }}
              </td>
              <td v-if="CheckValue(client)">
                {{ item?.tariff_empty?.toFixed(2) | format}}
              </td>
              <td v-if="CheckValue(client)">
                {{ item?.tariff_inroad?.toFixed(2) | format}}
              </td>
              <td v-if="CheckValue(client)">
                {{ item?.tariff_loaded?.toFixed(2) | format}}
              </td>
              <td v-if="CheckValue(client)">{{ item?.prepare?.toFixed(2) | format}}</td>
              <td v-if="CheckValue(client)">{{ item?.pps?.toFixed(2) | format}}</td>
              <td v-if="CheckValue(client)">
                {{ item?.travel_time?.toFixed(2) | format}}
              </td>
              <td v-if="CheckValue(client)">{{ item?.income?.toFixed(2) | format}}</td>
              <td v-if="CheckValue(client)">{{ item?.revenue?.toFixed(2) | format}}</td>
              <td v-if="CheckValue(client)">
                {{ AverageValue(item?.stavka_rub_wagons)?.toFixed(2) | format }}
              </td>
              <td v-if="CheckValue(client)">
                {{ AverageValue(item?.oborot)?.toFixed(2) | format }}
              </td>
            </tr>
          </template>

          <tr class="Total_2">
            <td colspan="6">
              Всего по погрузке 
            </td>
            <td>{{ data.wagon }}</td>
            <td>{{ data.penalties ?.toFixed(2) | format}}</td>
            <td>{{ data.expedition?.toFixed(2) | format}}</td>
            <td>{{data.tariff_empty?.toFixed(2) | format}}</td>
            <td>{{data.tariff_inroad?.toFixed(2) | format}}</td>
            <td>{{data.tariff_loaded?.toFixed(2) | format}}</td>
            <td>{{data.prepare?.toFixed(2) | format}}</td>
            <td>{{data.pps?.toFixed(2) | format}}</td>
            <td>{{data.travel_time?.toFixed(2) | format}}</td>
            <td>{{data.income?.toFixed(2) | format}}</td>
            <td>{{data.revenue?.toFixed(2) | format}}</td>
            <td>{{AverageValue(data.stavka_rub_wagons) | format}}</td>
            <td>{{AverageValue(data.oborot)| format}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import jsonData from "@/components/Table/ManagmentRepReporting/response9.json";
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
          data: "",
            loader: false,
            wag_type: "",
            date_begin: "",
            date_end: "",
          

        }
    },
  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
  },
  methods: {
    Actioned() {

this.loader = true;
api
    .getUO49(this.date_begin, this.date_end)
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
          i === "expedition" ||
          i === "income" ||
          i === "oborot" ||
          i === "penalties" ||
          i === "pps" ||
          i === "prepare" ||
          i === "revenue" ||
          i === "stavka_rub_wagons" ||
          i === "tariff_empty" ||
          i === "tariff_inroad" ||
          i === "tariff_loaded" ||
          i === "travel_time" ||
          i === "wagon"
        ) {
          continue;
        } else {
          correctKeys.push(i);
        }
      }
      // console.log(correctKeys);
      return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
    },

    CheckValueAMOUNT(val) {
      let client = val;
      if (
        client == "wagon" ||
        client == "penalties" ||
        client == "expedition" ||
        client == "tariff_empty" ||
        client == "tariff_inroad" ||
        client == "tariff_loaded" ||
        client == "prepare" ||
        client == "travel_time" ||
        client == "income" ||
        client == "stavka_rub_wagons" ||
        client == "oborot" ||
        client == "pps" ||
        client == "stavka_per_ton" ||
        client == "weight" ||
        client == "revenue"
      ) {
        return true;
      }
    },
    CheckValue(value) {
      let client = value;
      if (
        client != "wagon" &&
        client != "penalties" &&
        client != "expedition" &&
        client != "tariff_empty" &&
        client != "tariff_inroad" &&
        client != "tariff_loaded" &&
        client != "prepare" &&
        client != "travel_time" &&
        client != "income" &&
        client != "stavka_rub_wagons" &&
        client != "oborot" &&
        client != "pps" &&
        client != "stavka_per_ton" &&
        client != "weight" &&
        client != "revenue"
      ) {
        return true;
      }
    },
  },
};
</script>


<style scoped>
@import '../../../style/UOTableStyle.css';
td,th{
    white-space: nowrap;
   
}
tr:hover{
    background: lightcyan;
}
</style>
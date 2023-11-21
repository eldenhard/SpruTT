<template>
  <div>
    <p>
      Форма 4.9. "Производство по универсальным перевозкам (привлеченный парк)"
    </p>
    <div style="overflow: auto">
      <table>
        <thead>
          <tr>
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
        <tbody>
          <template v-for="(item, client) in jsonData">
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
                          {{ CheckValueMath(item[road][station_dest][CountryDep][StationDep]?.stavka_rub_wagons)?.toFixed(2) | format}}
                        </td>
                        <td v-if="CheckValue(client)">
                          {{ CheckValueMath(item[road][station_dest][CountryDep][StationDep]?.oborot)?.toFixed(2) | format}}
                        </td>
                      </tr>
                    </template>
                  </template>
                </template>
              </template>
            </template>
            <tr style="background:#FDFFDA">
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
                {{ CheckValueMath(item?.stavka_rub_wagons)?.toFixed(2) | format }}
              </td>
              <td v-if="CheckValue(client)">
                {{ CheckValueMath(item?.oborot)?.toFixed(2) | format }}
              </td>
            </tr>
          </template>

          <tr style="background:#DDFCCF">
            <td colspan="6">
              Всего по погрузке 
            </td>
            <td>{{ jsonData.wagon }}</td>
            <td>{{ jsonData.penalties ?.toFixed(2) | format}}</td>
            <td>{{ jsonData.expedition?.toFixed(2) | format}}</td>
            <td>{{jsonData.tariff_empty?.toFixed(2) | format}}</td>
            <td>{{jsonData.tariff_inroad?.toFixed(2) | format}}</td>
            <td>{{jsonData.tariff_loaded?.toFixed(2) | format}}</td>
            <td>{{jsonData.prepare?.toFixed(2) | format}}</td>
            <td>{{jsonData.pps?.toFixed(2) | format}}</td>
            <td>{{jsonData.travel_time?.toFixed(2) | format}}</td>
            <td>{{jsonData.income?.toFixed(2) | format}}</td>
            <td>{{jsonData.revenue?.toFixed(2) | format}}</td>
            <td>{{CheckValueMath(jsonData.stavka_rub_wagons)?.toFixed(2) | format}}</td>
            <td>{{CheckValueMath(jsonData.oborot)?.toFixed(2) | format}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import jsonData from "@/components/Table/ManagmentRepReporting/response9.json";

export default {
  data() {
    return {
      jsonData,
    };
  },
  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
  },
  methods: {
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
      console.log(correctKeys);
      return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
    },

    CheckValueMath(value) {
      console.log(value);
      let sumMean = 0
      for(let i of value){
        sumMean += i
      }
      return sumMean/value.length.toFixed(2)
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
.total {
  background: #fdffd9;
}
.total_2 {
  background: #ddface;
}
tr:hover {
  background: rgb(236, 236, 236);
}
.itogo {
  font-weight: bold;
  border-right: none !important;
}
.all_total {
  background: #eaf1dd;
}
/* .last:nth-last-of-type(3n) {
   border-bottom: 2px solid rgb(0, 0, 0) !important
} */
.total_row {
  background: #daeef3;
}
td,
th {
  border: 1px solid rgb(102, 102, 102) !important;
  color: black !important;
}
.all_total {
  background: #eaf1dd;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table > tbody > tr > td,
table > tbody > tr > td.inner > div {
  vertical-align: top;
  border: 1px solid #ddd;
}
table > tbody > tr > td.inner {
  padding: 0;
  border-right: 0;
}
table > tbody > tr > td.inner > div {
  padding: 5px;
  border-width: 0 0 1px 0;
}
table > tbody > tr > td.inner > div:last-child {
  border: 0;
}
table > tbody > tr > td.inner > table {
  margin-bottom: 0;
}
table > tbody > tr > td.inner > table td {
  border-width: 0 1px 1px 0;
}
table > tbody > tr > td.inner > table tr:last-child td {
  border-bottom: 0;
}

table > tbody > tr > td.inner > div {
  border-right: 0;
}
thead > th {
  border: 1px solid black;
}
</style>
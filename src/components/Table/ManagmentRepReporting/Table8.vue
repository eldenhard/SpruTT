<template>
  <div>
    <p>Форма 4.8 "Производство по универсальным перевозкам (собственный парк)"</p>

    <Loader :loader="loader" />
    <Periods @Action="Actioned" @data="getCurrentData">

    </Periods>
    <br>
    <div style="overflow: auto; max-height: 65vh;" >
    <table style="margin: 0 auto;" >
        <thead>
          <tr class="TableHeader">
            <!-- <th>Клиент</th> -->
            <th>Полигон </th>
            <th>Дорога отправления</th>
            <th>Станция отправления</th>
            <th>Дорога назначения</th>
            <th>Станция назначения</th>
            <th>Груз</th>
            <th>Вагоны</th>
            <th>Доход</th>
            <th>Штрафы</th>
            <th>Экспедирование</th>
            <th>Тариф порожний</th>
            <th>Тариф иногородний??</th>
            <th>Тариф груженый</th>
            <th>Подготовка</th>
            <th>ППС</th>
            <th>Время в пути</th>
            <th>Прибыль</th>
            <th>Ставка руб за вагон</th>
            <th>Оборот</th>
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
            <th>S</th>
          </tr>
        </thead>
        <tbody v-show="Object.keys(dataReport8).length > 0">
          <template v-for="(item, client) in dataReport8">
            <td class="ClientRow" v-if="CheckValue(client)" colspan="6">{{ client }}</td>
            <td class="ClientRow" v-if="CheckValue(client)" colspan="6">{{ client }}</td>
            <td class="ClientRow" v-if="CheckValue(client)" colspan="7">{{ client }}</td>
            <template v-for="polygon in getNextKey(item)">
          
              <!-- <td v-if="CheckValue(client)" colspan="6" style="font-weight: bold; background: rgb(221, 238, 238);">{{ client }}</td> -->
              <template v-for="roadDeparture in getNextKey(item[polygon])">
                <template v-for="stationDeparture in getNextKey(item[polygon][roadDeparture])">
                  <template v-for="roadDestination in getNextKey(item[polygon][roadDeparture][stationDeparture])">
                    <template v-for="stationdDestination in getNextKey(item[polygon][roadDeparture][stationDeparture][roadDestination])">
                      <template v-for="cargo in getNextKey(item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination])">
                        <tr>
                        
                          <td v-if="CheckValue(client)">{{ polygon == 'null' ? 'Не определено' : polygon }}</td>
                          <td v-if="CheckValue(client)">{{ roadDeparture }}</td>
                          <td v-if="CheckValue(client)">{{ stationDeparture }}</td>
                          <td v-if="CheckValue(client)">{{ roadDestination }}</td>
                          <td v-if="CheckValue(client)">{{ stationdDestination }}</td>
                          <td v-if="CheckValue(client)">{{ cargo }}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['wagon']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['revenue']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['penalties']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['expedition']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['tariff_empty']?.toFixed(2)| format }}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['tariff_inroad']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['tariff_loaded']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['prepare']?.toFixed(2) | format }}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['pps']?.toFixed(2)| format }}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['travel_time']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['income']?.toFixed(2)| format }}</td>
                          <td v-if="CheckValue(client)">{{ AverageValue(item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['stavka_rub_wagons'])?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ AverageValue(item[polygon][roadDeparture][stationDeparture][roadDestination][stationdDestination][cargo]['oborot'])?.toFixed(2) | format}}</td>

                        </tr>
                      </template>
                  
                    </template>
                </template>
           
              </template>
              <!-- Полигоны -->
                    <tr class="Total_1">
                          <td v-if="CheckValue(client)" colspan="6" >Итого: {{ polygon == 'null' ? 'Не определено' : polygon }}</td>
                           <td v-if="CheckValue(client)">{{ item[polygon]['wagon']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['revenue']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['penalties']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['expedition']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['tariff_empty']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['tariff_inroad']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['tariff_loaded']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['prepare']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['pps']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['travel_time']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item[polygon]['income']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ AverageValue(item[polygon]['stavka_rub_wagons'])?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ AverageValue(item[polygon]['oborot'])?.toFixed(2) | format}}</td>
                    </tr>
              

            </template>
          

          </template>
            <!-- Итого по клиенту -->
            <tr class="Total_2">
                  <td v-if="CheckValue(client)" colspan="6">Итого: {{client }}</td>
                  <td v-if="CheckValue(client)">{{ item['wagon']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['revenue']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['penalties']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['expedition']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['tariff_empty']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['tariff_inroad']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['tariff_loaded']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['prepare']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['pps']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['travel_time']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ item['income']?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ AverageValue(item['stavka_rub_wagons'])?.toFixed(2) | format}}</td>
                          <td v-if="CheckValue(client)">{{ AverageValue(item['oborot'])?.toFixed(2) | format}}</td>
                </tr>
        </template>
        <tr class="GrandTotal">
                  <td colspan="6">Общий итог: </td>
                  <td>{{ dataReport8['wagon']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['revenue']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['penalties']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['expedition']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['tariff_empty']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['tariff_inroad']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['tariff_loaded']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['prepare']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['pps']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['travel_time']?.toFixed(2) | format}}</td>
                  <td>{{ dataReport8['income']?.toFixed(2) | format}}</td>
                  <td>{{ AverageValue(dataReport8['stavka_rub_wagons']) | format}}</td>
                  <td>{{ AverageValue(dataReport8['oborot']) | format}}</td>
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

import api from "@/api/reportUO";
import Periods from "./Periods.vue";
import Loader from "@/components/loader/loader.vue";
import AverageValue from '@/mixins/AverageValue'
export default {
  components: { Periods, Loader },
  mixins: [AverageValue],
  data() {
    return {
      id_page: new Date(),
      jsonData,
      dataReport8: "",
      loader: false,
      date_begin: "",
      date_end: "",
    }
  },
  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
  },
  updated() {
    this.processTables();
  },
  methods: {
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
    getNextKey(obj) {
      const keys = Object.keys(obj);
      let correctKeys = [];
      for (let i of keys) {
        if ( i == "wagon" ||
        i == "penalties" ||
        i == "expedition" ||
        i == "tariff_empty" ||
        i == "tariff_inroad" ||
        i == "tariff_loaded" ||
        i == "prepare" ||
        i == "travel_time" ||
        i == "income" ||
        i == "stavka_rub_wagons" ||
        i == "oborot" ||
        i == "pps" ||
        i == "stavka_per_ton" ||
        i == "weight" ||
        i == "revenue") {
          continue;
        } else {
          correctKeys.push(i);
        }
      }
      return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
    },
    Actioned() {
      // if(document.getElementById(`TableReport8${this.id_page}`)){
      //   let blockDiv = document.getElementById(`TableReport8${this.id_page}`)
      //   blockDiv.innerHTML = ''
      // }
      this.loader = true;
      api
        .getUO48(this.date_begin, this.date_end, this.wag_type)
        .then((response) => {
          this.loader = false;
          this.dataReport8 = response.data;
      // document.getElementById(`TableReport8${this.id_page}`).innerHTML = ""
      //   this.OpenChildren(document.getElementById(`TableReport8${this.id_page}`), this.jsonData)

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
    Translate(val) {
      switch (val) {
        case 'null':
          return 'Не определено'
          break
        case 'wagon':
          return 'Вагоны'
          break
        case 'penalties':
          return 'Штрафы'
          break
        case 'expedition':
          return 'Экспедирование'
          break
        case 'tariff_inroad':
          return 'Тариф СТ'
          break
        case 'tariff_empty':
          return 'Тариф порож'
          break
        case 'tariff_loaded':
          return 'Тариф груж'
          break
        case 'prepare':
          return 'Подготовка'
          break
        case 'pps':
          return 'ППС'
          break
        case 'travel_time':
          return 'Время в пути'
          break
        case 'income':
          return 'Доход'
          break
        case 'stavka_rub_wagons':
          return 'Ставка за вагон, руб.'
          break
        case 'oborot':
          return 'Оборот'
          break


        case 'amount':
          return 'Количество'
          break
        case 'cost':
          return 'Сумма'
          break
        case 'weight':
          return 'Вес'
          break
        case 'stavka_per_ton':
          return 'Ставка за тонну'
          break
        case 'revenue':
          return 'Доход'
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


  OpenChildren(eventDiv = null, val) {
    // console.log(document.getElementById('TableReport8'))
  
  let collapse = "+";
  let val_copy = this.TEST(val);
  let hr = null;
  let resultName = eventDiv.innerHTML;
  // Проверяем наличие класса, указывающего на раскрытие
  let isOpened = eventDiv.classList.contains('opened');

  // Удаляем дочерние элементы, если вложенность уже раскрыта
  if (isOpened) {
    eventDiv.classList.remove('opened');
    while (eventDiv.childNodes.length > 1) {
      eventDiv.removeChild(eventDiv.lastChild);
    }
    return;
  }

  // Создаем таблицу
  let thead = [];
  let tbody = [];

  for (let i in val_copy) {
    let key = val_copy[i][0];
    let value = val_copy[i][1];

    if (typeof value == 'number' || typeof value == 'string' || Array.isArray(value)) {
      hr = null;
      let name = this.Translate(key);
      let value123 = Array.isArray(value)
        ? this.FilterValue(value.reduce((acc, item) => acc + item)?.toFixed(2))
        : this.FilterValue(value?.toFixed(2));

      thead.push(name);
      tbody.push(value123);
    } else {
      let div = document.createElement('div');
      div.innerHTML = `${this.Translate(key)} ${collapse}`;
      div.style = 'padding-left: 2% !important; font-weight: 500; color: darkblue; border: 1px solid lightgrey; padding: 1%;';

      div.addEventListener('click', (event) => {
        event.stopPropagation();
        this.OpenChildren(div, value);
      });

      eventDiv.appendChild(div);
    }
  }

  if (thead.length > 0 && tbody.length > 0) {
    let div = document.createElement('div');
    div.innerHTML = `
      <span style="margin: 0 1%; font-size: 20px">${resultName != "" ? `Итого ${resultName.slice(0, -1)}` : 'Общий итог'}</span>
      <table>
        <thead>
          <tr>
            ${thead.map((header, ind) => `<th style="white-space: nowrap; background: white">${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            ${tbody.map(value => `<td style="white-space: nowrap; background: white">${value}</td>`).join('')}
          </tr>
        </tbody>
      </table>
    `;
    div.style = 'font-weight: 500; color: black; padding: 1% 0; background: #dddddd;';

    // Добавляем класс, указывающий на раскрытие
    eventDiv.classList.add('opened');
    this.$nextTick(() => eventDiv.innerHTML.split('<')[0].slice(0, -1))

    eventDiv.appendChild(div);
  }
},

    async processTables() {
      // Дождитесь, пока данные полностью накопятся
      await this.$nextTick();

      let childTables = this.$el.querySelectorAll('table');
      let tablesArray = Array.from(childTables);
      let uniqueTables = new Set();

      // Функция для получения строки из таблицы
      const getTableString = (table) => {
        let tableString = '';
        table.querySelectorAll('tr').forEach(row => {
          row.querySelectorAll('th, td').forEach(cell => {
            tableString += cell.textContent.trim();
          });
        });
        return tableString;
      };

      // Удалить повторяющиеся таблицы
      tablesArray.forEach((table, index) => {
        let tableString = getTableString(table);
        if (!uniqueTables.has(tableString)) {
          uniqueTables.add(tableString);
        } else {
          table.parentElement.removeChild(table);
        }
      });
    },





  }
}
</script>


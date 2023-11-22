<template>
  <div>
    <!-- <div style="display: flex; justify-content: space-between;">
  <pre>{{ obj }}</pre>
  <pre>{{ norm }}</pre>
</div> -->

    <!-- {{ object }} -->

    <Loader :loader="loader" />
    <Periods @Action="Actioned" @data="getCurrentData">
      <label for="">
        Тип вагона
        <br />
        <select name="" id="" v-model="wag_type" style="width: 100%">
          <option value="Полувагон">Полувагон</option>
          <option value="Цистерна">Цистерна</option>
        </select>
      </label>
    </Periods>
    <br />

    <p>Форма 4.7. "Анализ перевозки и выручки по сегменту полувагонов"</p>
    <!-- <div :id="'TableReport7'+id_page" ></div> -->
    <table style="margin: 0 auto;">
        <thead>
          <tr class="stickyBlock">
            <!-- <th>Клиент</th> -->
            <th>Дорога </th>
            <th>Принадлежность</th>
            <th>Полигон</th>
            <th>Кол-во погрузок</th>
            <th>Выручка, руб. без НДС</th>
           
          </tr>
          <tr style="background: #FFD453;">
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
            <!-- <th>F</th> -->
            
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, client) in dataReport7">
            <template v-for="road in getNextKey(item)">
            
              <td v-if="CheckValue(client)" colspan="6" style="font-weight: bold; background: rgb(221, 238, 238);">{{ client }}</td>
              <template v-for="belong in getNextKey(item[road])">
                <template v-for="polygon in getNextKey(item[road][belong])">
           
               <tr>
              <td v-if="CheckValue(client)">{{ road }}</td>
              <td v-if="CheckValue(client)">{{ TransLateBelong(belong) }}</td>
              <td v-if="CheckValue(client)">{{ polygon == 'null' ? '—' : polygon }}</td>
              <td v-if="CheckValue(client)">{{ item[road][belong][polygon]['wagon']?.toFixed(2) | format }}</td>
              <td v-if="CheckValue(client)">{{ item[road][belong][polygon]['revenue']?.toFixed(2) | format }}</td>
            </tr>
              </template>
              <tr style="background:#FDFFDA" >
                <td colspan="3" style="font-weight: bold;">Итого {{ TransLateBelong(belong) }}</td>
                <td>{{item[road][belong]['wagon']?.toFixed(2) | format }}</td>
                <td>{{item[road][belong]['revenue']?.toFixed(2) | format }}</td>
              </tr>
            </template>
            <tr style="background:#DDFCCF" >
                <td colspan="3" style="font-weight: bold;">Итого {{ client }}</td>
                <td>{{ item?.wagon?.toFixed(2) | format }}</td>
                <td>{{ item?.revenue?.toFixed(2) | format }}</td>
              </tr>
          </template>
        </template>
        <tr style="background:#a9ada6; ">
                <td colspan="3" style="font-weight: bold; color: white !important; ">Всего {{  }}</td>
                <td>{{ dataReport7?.wagon?.toFixed(2) | format }}</td>
                <td>{{  dataReport7?.revenue?.toFixed(2) | format }}</td>
              </tr>
        </tbody>
      </table>

  </div>
</template>
  
  
<script>
import api from "@/api/reportUO";
import Periods from "./Periods.vue";
import Loader from "@/components/loader/loader.vue";
export default {
  components: { Periods, Loader },
  data() {
    return {
      normalized: [],
      norm: [],
      objects2: "",
      id_page: new Date(),

      loader: false,
      date_begin: "",
      date_end: "",
      wag_type: "Полувагон",

      dataReport7: ""



    };
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
        if (i === "wagon" || i === "revenue") {
          continue;
        } else {
          correctKeys.push(i);
        }
      }
      console.log(correctKeys);
      return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
    },
    Translate(val) {
      switch (val) {
        case 'amount':
          return 'Количество'
          break
          case 'wagon':
          return 'Вагоны'
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

    Actioned() {
      // if(document.getElementById(`TableReport7${this.id_page}`)){
      //   let blockDiv = document.getElementById(`TableReport7${this.id_page}`)
      //   blockDiv.innerHTML = ''
      // }
    
      // document.getElementById('FuckingData15').innerHTML = ""

      // this.OpenChildren(document.getElementById('FuckingData15'), this.data)


      this.loader = true;
      api
        .getUO47(this.date_begin, this.date_end, this.wag_type)
        .then((response) => {
          this.loader = false;
          this.dataReport7 = response.data;
          // this.OpenChildren(document.getElementById(`TableReport7${this.id_page}`), this.dataReport7)

        })
        .catch((error) => {
          console.log(error);
          this.loader = false;
        });


    },
    rowspan: (attr2) => attr2.reduce((acc, n) => acc + n.attr3.length + 1, 0),

    normalizeObject() {
      const test = Object.keys(this.objects2).map((key) => {
        const obj = {
          road: key,

          attr1: Object.keys(this.objects2[key]).map((client) => {
            return {
              client,
              attr3: Object.keys(this.objects2.data[key][client]).map(
                (road) => {
                  return {
                    road,
                    cargo: Object.keys(
                      this.objects2.data[key][client][road]
                    ).map((cargo) => {
                      return {
                        name: cargo,
                        name_weight: Object.keys(this.objects2.data[key][client][road][cargo]),
                        name_cargo: Object.keys(this.objects2.data[key][client][road][cargo]).map(item => {
                          return {
                            ...this.objects2.data[key][client][road][cargo][item]
                          }
                        })
                        // cargo:  this.objects2.data[key].data[client].data[road].data[cargo]
                      };
                    }),
                  };
                }
              ),
              total: this.objects2.data[key][client]?.total,
            };
          }),
          TOTAL_ROAD: this.objects2[key]?.total,
        };
        return obj;
      });

      this.normalized = [
        {
          data: test,
          total: this.objects2.total,
        },
      ];
    },
    // Actioned() {
    //   this.loader = true;
    //   api
    //     .getUO46(this.date_begin, this.date_end, this.wag_type)
    //     .then((response) => {
    //       this.loader = false;
    //       this.objects2 = response;

    //       this.normalizeObject();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.loader = false;
    //     });
    // },
    getCurrentData(data) {
      this.date_begin = data.date_begin;
      this.date_end = data.date_end;
    },
  },

  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
    ifNull(value) {
      if (value == null || value == 'null') {
        return 'Неопределенно'
      }
      return value
    }
  },
}
</script>

<style scoped>

.stickyBlock{
  position: sticky;
  top:0;
}
.stickyBlock th{
  background: rgb(240, 240, 240);
  border: 1px solid black;
}
td{
  white-space: nowrap;
  padding: 10px; 
  color: black;
}
tr:hover{
  background: lightcyan;
}
</style>

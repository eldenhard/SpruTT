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

    <p>Форма 4.6. "Справка о выполнении перевозок {{ wag_type == 'Цистерна'  ?  wag_type.toLowerCase() + 'ми' : wag_type.toLowerCase() + 'ами'}}"</p>
    <!-- <div :id="'TableReport6'+id_page" ></div> -->
    <div class="block-table" >
      <table style="margin: 0 auto !important;">


        <tbody v-if="Object.keys(dataReport6).length > 1">
          <template v-for="(valueClient, client) in dataReport6" >
            <tr :key="valueClient.id">
              <tr >
                <td v-if="client !== 'stavka_per_ton' && client !== 'weight' && client !== 'revenue'" colspan="7"
                 @click="CheckClientOpen(client, $event)" style="font-weight: 700;">{{ client }}</td>
              </tr>
            <tr style="background: #F0F0F0" :data-attr='client' class="block_element">
              <th v-if="client !== 'stavka_per_ton' && client !== 'weight' && client !== 'revenue'">Дорога отправления</th>
              <th v-if="client !== 'stavka_per_ton' && client !== 'weight' && client !== 'revenue'">Дорога назначения</th>
              <th v-if="client !== 'stavka_per_ton' && client !== 'weight' && client !== 'revenue'">Принадлежность</th>
              <th v-if="client !== 'stavka_per_ton' && client !== 'weight' && client !== 'revenue'">Груз</th>
              <th v-if="client !== 'stavka_per_ton' && client !== 'weight' && client !== 'revenue'">Вес</th>
              <th v-if="client !== 'stavka_per_ton' && client !== 'weight' && client !== 'revenue'">Ставка за тонну</th>
              <th v-if="client !== 'stavka_per_ton' && client !== 'weight' && client !== 'revenue'">Выручка</th>
            </tr>

            <template v-for="road in getNextKey(dataReport6[client])"  :data-attr='client' class="block_element">

              <template v-for="clientRoad in getNextKey(dataReport6[client][road])"  :data-attr='client' class="block_element">

                <template v-for="clientRoadRoad in getNextKey(dataReport6[client][road][clientRoad])"  :data-attr='client' class="block_element">

                  <template v-for="cargo in getNextKey(dataReport6[client][road][clientRoad][clientRoadRoad])"  :data-attr='client' class="block_element">

                    <tr :key="road.id" class="block_element"  :data-attr='client'>
                      <td>{{ road }}</td>
                      <td>{{ clientRoadRoad }}</td>
                      <td>{{ TransLateBelong(clientRoad) }}</td>
                      <td>{{ cargo }}</td>
                      <td>{{ dataReport6[client][road][clientRoad][clientRoadRoad][cargo]['weight']?.toFixed(2) | format }}
                      </td>
                      <td>{{ dataReport6[client][road][clientRoad][clientRoadRoad][cargo]['stavka_per_ton']?.toFixed(2) |
                        format }}</td>
                      <td>{{ dataReport6[client][road][clientRoad][clientRoadRoad][cargo]['revenue']?.toFixed(2) |
                        format }}</td>
                    </tr>

                  </template>

                </template>
                <tr style="background:#FDFFDA" class="block_element"  :data-attr='client'>

                  <td colspan="4">ИТОГО {{ TransLateBelong(clientRoad) }}</td>
                  <td style="font-weight: 500;">{{ dataReport6[client][road][clientRoad]['weight']?.toFixed(2) | format }}
                  </td>
                  <td style="font-weight: 500;">{{ dataReport6[client][road][clientRoad]['stavka_per_ton']?.toFixed(2) |
                    format }}</td>
                  <td style="font-weight: 500;">{{ dataReport6[client][road][clientRoad]['revenue']?.toFixed(2) | format }}
                  </td>
                </tr>
              </template>
              <tr style="background: #DDFCCF" class="block_element"  :data-attr='client'>
                <td colspan="4">ИТОГО {{ road }}</td>
                <td style="font-weight: 700;">{{ dataReport6[client][road]['weight']?.toFixed(2) | format }}</td>
                <td style="font-weight: 00;">{{ dataReport6[client][road]['stavka_per_ton']?.toFixed(2) | format }}</td>
                <td style="font-weight: 700;">{{ dataReport6[client][road]['revenue']?.toFixed(2) | format }}</td>
              </tr>
            </template>

            </tr>
          </template>
          <tr style="background: lightgrey;">
            <td style="font-weight: 700;">Общий итог</td>
            <td style="font-weight: 500;">Вес</td>
            <td style="font-weight: 500;">Ставка за тонну</td>
            <td style="font-weight: 500;">Выручка</td>
          </tr>
          <tr style="background: lightgrey;">
            <td></td>
            <td style="font-weight: 700;">{{ dataReport6['weight']?.toFixed(2) | format }}</td>
            <td style="font-weight: 700;">{{ dataReport6['stavka_per_ton']?.toFixed(2) | format }}</td>
            <td style="font-weight: 700;">{{ dataReport6['revenue']?.toFixed(2) | format }}</td>
          </tr>
        </tbody>

      </table>
    </div>
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
      id_page: new Date(),
      widthFirstElement: "",
      normalized: [],
      norm: [],
      objects2: "",
      loader: false,
      date_begin: "",
      date_end: "",
      wag_type: "Полувагон",

      dataReport6: "",
    };
  },
  mounted() {
  },
  methods: {
    CheckClientOpen(val, event){
      event.target.classList.toggle('check_element')
      let trs = document.getElementsByTagName('tr')
      console.log(event.target)
      for(let tr of trs){
        if(tr.getAttribute('data-attr') == val){
         tr.classList.toggle('block_element')
        } else {
          continue
        }
      }
    },
    TransLateBelong(val) {
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
    // countRows(obj) {
    //   return Object.keys(obj).filter(key => key !== 'stavka_per_ton' && key !== 'weight' && key !== 'revenue').length;
    // },
    // isObject(val) {
    //   return typeof val === 'object' && val !== null;
    // },
    // getNextKey(obj) {
    //   const keys = Object.keys(obj);
    //   let correctKeys = []
    //   for (let i of keys) {
    //     if (i === 'stavka_per_ton' || i === 'weight' || i === 'revenue') {
    //       continue
    //     }
    //     else {
    //       correctKeys.push(i)
    //     }
    //   }
    //   return correctKeys // предполагая, что следующий ключ - первый ключ в объекте
    // },
    countRows(obj) {
      return Object.keys(obj).filter(
        (key) =>
          key !== "stavka_per_ton" && key !== "weight" && key !== "revenue"
      ).length;
    },
    isObject(val) {
      if (typeof val !== "object" || val === null) {
        return false;
      }

      const keys = Object.keys(val);
      for (let i of keys) {
        if (val[i] === undefined) {
          return false;
        }
      }

      return true;
    },
    // isObject(val) {
    //   return typeof val === 'object' && val !== null;
    // },
    getNextKey(obj) {
      const keys = Object.keys(obj);
      let correctKeys = [];
      for (let i of keys) {
        if (i === "stavka_per_ton" || i === "weight" || i === "revenue") {
          continue;
        } else {
          correctKeys.push(i);
        }
      }
      // console.log(correctKeys);
      return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
    },

    Translate(val) {
      switch (val) {
        case "amount":
          return "Количество";
          break;
        case "cost":
          return "Сумма";
          break;
        case "weight":
          return "Вес";
          break;
        case "stavka_per_ton":
          return "Ставка за тонну";
          break;
        case "revenue":
          return "Доход";
          break;
        case "product":
          return "Продукт";
          break;
        case "fine":
          return "Штраф";
          break;
        case "":
          return "Не определено";
          break;
        case val:
          return val;
          break;
      }
    },
    FilterValue(val) {
      return String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
    TEST(obj) {
      let arr = [];
      for (let i in obj) {
        arr.push([i, obj[i]]);
      }

      arr.sort(function (a, b) {
        if (Array.isArray(a[1])) {
          return 1;
        }
        if (Array.isArray(b[1])) {
          return -1;
        }
        if (Array.isArray(a[1]) && Array.isArray(b[1])) {
          return 0;
        }
        if (typeof a[1] < typeof b[1]) {
          return 1;
        }
        if (typeof a[1] > typeof b[1]) {
          return -1;
        }
        return 0;
      });
      return arr;
    },
    //     OpenChildren(eventDiv = null, val) {
    //     // console.log(document.getElementById('TableReport8'))

    //   let collapse = "+";
    //   let val_copy = this.TEST(val);
    //   let hr = null;
    //   let resultName = eventDiv.innerHTML;
    //   // Проверяем наличие класса, указывающего на раскрытие
    //   let isOpened = eventDiv.classList.contains('opened');

    //   // Удаляем дочерние элементы, если вложенность уже раскрыта
    //   if (isOpened) {
    //     eventDiv.classList.remove('opened');
    //     while (eventDiv.childNodes.length > 1) {
    //       eventDiv.removeChild(eventDiv.lastChild);
    //     }
    //     return;
    //   }

    //   // Создаем таблицу
    //   let thead = [];
    //   let tbody = [];

    //   for (let i in val_copy) {
    //     let key = val_copy[i][0];
    //     let value = val_copy[i][1];

    //     if (typeof value == 'number' || typeof value == 'string' || Array.isArray(value)) {
    //       hr = null;
    //       let name = this.Translate(key);
    //       let value123 = Array.isArray(value)
    //         ? this.FilterValue(value.reduce((acc, item) => acc + item)?.toFixed(2))
    //         : this.FilterValue(value?.toFixed(2));

    //       thead.push(name);
    //       tbody.push(value123);
    //     } else {
    //       let div = document.createElement('div');
    //       div.innerHTML = `${this.Translate(key)} ${collapse}`;
    //       div.style = 'padding-left: 2% !important; font-weight: 500; color: darkblue; border: 1px solid lightgrey; padding: 1%;';

    //       div.addEventListener('click', (event) => {
    //         event.stopPropagation();
    //         this.OpenChildren(div, value);
    //       });

    //       eventDiv.appendChild(div);
    //     }
    //   }

    //   if (thead.length > 0 && tbody.length > 0) {
    //     let div = document.createElement('div');
    //     div.innerHTML = `
    //       <span style="margin: 0 1%; font-size: 20px">${resultName != "" ? `Итого ${resultName.slice(0, -1)}` : 'Общий итог'}</span>
    //       <table>
    //         <thead>
    //           <tr>
    //             ${thead.map((header, ind) => `<th style="white-space: nowrap; background: white">${header}</th>`).join('')}
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             ${tbody.map(value => `<td style="white-space: nowrap; background: white">${value}</td>`).join('')}
    //           </tr>
    //         </tbody>
    //       </table>
    //     `;
    //     div.style = 'font-weight: 500; color: black; padding: 1% 0; background: #dddddd;';

    //     // Добавляем класс, указывающий на раскрытие
    //     eventDiv.classList.add('opened');
    //     this.$nextTick(() => eventDiv.innerHTML.split('<')[0].slice(0, -1))

    //     eventDiv.appendChild(div);
    //   }
    // },

    // async processTables() {
    //   // Дождитесь, пока данные полностью накопятся
    //   await this.$nextTick();

    //   let childTables = this.$el.querySelectorAll('table');
    //   let tablesArray = Array.from(childTables);
    //   let uniqueTables = new Set();

    //   // Функция для получения строки из таблицы
    //   const getTableString = (table) => {
    //     let tableString = '';
    //     table.querySelectorAll('tr').forEach(row => {
    //       row.querySelectorAll('th, td').forEach(cell => {
    //         tableString += cell.textContent.trim();
    //       });
    //     });
    //     return tableString;
    //   };

    //   // Удалить повторяющиеся таблицы
    //   tablesArray.forEach((table, index) => {
    //     let tableString = getTableString(table);
    //     if (!uniqueTables.has(tableString)) {
    //       uniqueTables.add(tableString);
    //     } else {
    //       table.parentElement.removeChild(table);
    //     }
    //   });
    // },

    Actioned() {
      // if(document.getElementById(`TableReport6${this.id_page}`)){
      //   let blockDiv = document.getElementById(`TableReport6${this.id_page}`)
      //   blockDiv.innerHTML = ''
      // }

      this.loader = true;
      api
        .getUO46(this.date_begin, this.date_end, this.wag_type)
        .then((response) => {
          this.loader = false;
          this.dataReport6 = response.data;
          // this.OpenChildren(document.getElementById(`TableReport6${this.id_page}`), this.dataReport6)
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
                        name_weight: Object.keys(
                          this.objects2.data[key][client][road][cargo]
                        ),
                        name_cargo: Object.keys(
                          this.objects2.data[key][client][road][cargo]
                        ).map((item) => {
                          return {
                            ...this.objects2.data[key][client][road][cargo][
                            item
                            ],
                          };
                        }),
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
      if (value == null || value == "null") {
        return "Неопределенно";
      }
      return value;
    },
  },
};
</script>

<style scoped>
.check_element {
  background: rgb(142, 182, 182);
  font-weight: bold;
}
td,
th {
  white-space: nowrap;
  
}
.block_element{
  display: none;
}
tr:hover {
  background: lightcyan;
}</style>

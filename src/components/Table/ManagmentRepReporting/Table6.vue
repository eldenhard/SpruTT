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

    <p>Форма 4.6. "Справка о выполнении перевозок вагоно-цистернами"</p>
    <div id="TableReport6" ></div>
    <div class="block-table">
      <!-- <table class="table_search">
        <thead>
          <th>Парк</th>
          <th>Станция погрузки</th>
          <th style="width: 200px">Клиент</th>
          <th style="width: 200px">Станция выгрузки</th>

          <th style="width: 200px">Груз</th>
          <th style="width: 200px">Погрузка, тн</th>
          <th style="width: 200px">Ставка, руб/тн без НДС</th>

          <th style="width: 200px">Выручка, руб, без НДС</th>

        </thead>
        <tbody>
           <template v-for="obj in normalized">
          <template v-for="{ road, attr1, TOTAL_ROAD } in obj.data">
            <template v-for="({ client, attr3, total }, iAttr1) in attr1">
              <tr v-for="(attr3Item, iAttr3) in attr3">
                <td :rowspan="rowspan(attr1)" v-if="!iAttr1 && !iAttr3">
                  {{ road | ifNull}}
                </td>
                <td :rowspan="attr3.length" v-if="!iAttr3">{{ client }}</td>
                <td >{{ attr3Item.road }}</td>
          
                <td>
                  <tr v-for="item in attr3Item.cargo" :key="item.id">
                    <td style="border: none !important">{{ item.name }}</td>
                  </tr>
                </td>
          
                <td>
                  <template v-for="item in attr3Item.cargo" >
                    <tr v-for="i in item.name_weight" :key="i.id">
                      <td style="border: none !important">{{ i }}</td>
                    </tr>
    
                  </template>
                </td>
                <td>
                  <template v-for="item in attr3Item.cargo" >
                    <tr v-for="i in item.name_cargo" :key="i.id">
                     <td style="border: none !important">{{ i?.amount.toFixed(2) | format}}</td>
                    </tr>
                  </template>
                </td>
                <td>
                  <template v-for="item in attr3Item.cargo" >
                    <tr v-for="i in item.name_cargo" :key="i.id">
                     <td style="border: none !important">{{ i?.stavka.toFixed(2) | format}}</td>
                    </tr>
                  </template>
                </td>
                <td>
                  <template v-for="item in attr3Item.cargo" >
                    <tr v-for="i in item.name_cargo" :key="i.id">
                     <td style="border: none !important">{{ i?.revenue.toFixed(2) | format}}</td>
                    </tr>
                  </template>
                </td>
              <td>
           
              </td>
              </tr>
              <tr class="total">
                <td colspan="2">Итого {{ client }}:</td>
                <td></td>
                <td></td>
                <td>{{ total?.amount.toFixed(2) | format }}</td>
                <td>{{ total?.stavka.toFixed(2) | format }}</td>
                <td>{{ total?.revenue.toFixed(2) | format }}</td>
              </tr>
            </template>
            <tr class="total_2">
              <td colspan="3">Итого {{ road }}:</td>
              <td></td>
              <td></td>
              <td>{{ TOTAL_ROAD?.amount.toFixed(2) | format }}</td>
              <td>{{ TOTAL_ROAD?.stavka.toFixed(2) | format }}</td>
              <td>{{ TOTAL_ROAD?.revenue.toFixed(2) | format }}</td>
            </tr>
          </template>
        </template>
        <tr
          v-for="obj in normalized"
          :key="obj.id"
          style="border: 1px solid black"
          class="all_total"
        >
          <td colspan="3">Всего погрузки</td>
          <td></td>
          <td></td>
          <td>{{ obj.total?.amount.toFixed(2) | format }}</td>
          <td>{{ obj.total?.stavka.toFixed(2) | format }}</td>
          <td>{{ obj.total?.revenue.toFixed(2) | format }}</td>
        </tr>
        </tbody> 



      </table> -->
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
  methods: {
    Translate(val) {
      switch (val) {
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
      let collapse = "+"
      let val_copy = this.TEST(val)
      let hr = null
      let children = []
      try {
        children = eventDiv.target.childNodes
      }
      catch (error) {
        children = eventDiv.childNodes
      }
      if (children.length > 1) {
        while (children.length != 1) {
          try {
            eventDiv.target.removeChild(children[1])

          }
          catch {
            eventDiv.removeChild(children[1])

          }
        }
      }
      else {
        for (let i in val_copy) {
          let key = val_copy[i][0]
          let value = val_copy[i][1]
          let div = document.createElement('div')
          if (typeof value == 'number' || typeof value == 'string') {
            hr = null
            let name = this.Translate(key)
            let value123 = value
            if (typeof value == 'number') {
              value123 = this.FilterValue(value?.toFixed(2))
            }

            div.innerHTML = `${name}: ${value123}`
            div.style = 'padding-left: 2% !important; font-weight: 500; color: black; padding: 0; background: #D2ECDE;'
          }
          else {
            hr = document.createElement('hr')
            div.innerHTML = `${this.Translate(key)} ${collapse}`
            div.style = 'padding-left: 2% !important; font-weight: 500; color: darkblue; border: 1px solid lightgrey; padding: 1%;'

          }
          div.addEventListener('click', () => {

            event.stopPropagation()
            this.OpenChildren(div, value)
          })
          try {
            eventDiv.target.append(div)
            // if(hr != null) eventDiv.target.append(hr)
          } catch {
            eventDiv.append(div)
            // if(hr != null) eventDiv.append(hr)
          }
        }
      }
    },
    Actioned() {
      // document.getElementById('FuckingData15').innerHTML = ""

      // this.OpenChildren(document.getElementById('FuckingData15'), this.data)


      this.loader = true;
      api
        .getUO46(this.date_begin, this.date_end, this.wag_type)
        .then((response) => {
          this.loader = false;
          this.dataReport6 = response.data;
          this.OpenChildren(document.getElementById('TableReport6'), this.dataReport6)

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
};
</script>

<style scoped>
.block-table {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  overflow: auto;
}

.table_search {
  width: 50%;
  max-width: 50% !important;
}

th {
  font-size: 12px !important;
}

.total {
  background: #fdffd9;
}

.total_2 {
  background: #ddface;
}

tr:hover {
  background: rgb(236, 236, 236);
}

td {
  border: 1px solid black !important;
  color: black !important;
  font-size: 13px;
}

table {
  width: 50%;
  max-width: 50% !important;
  border-collapse: collapse;
  background: yellow;
}

table>tbody>tr>td,
table>tbody>tr>td.inner>div {
  vertical-align: top;
  border: 1px solid #ddd;
}

table>tbody>tr>td.inner {
  padding: 0;
  border-right: 0;
}

table>tbody>tr>td.inner>div {
  padding: 3px;
  border-width: 0 0 1px 0;
}

table>tbody>tr>td.inner>div:last-child {
  border: 0;
}

table>tbody>tr>td.inner>table {
  margin-bottom: 0;
}

table>tbody>tr>td.inner>table td {
  border-width: 0 1px 1px 0;
}

table>tbody>tr>td.inner>table tr:last-child td {
  border-bottom: 0;
}

table>tbody>tr>td.inner>div {
  border-right: 0;
}

thead>th {
  border: 1px solid black;
}

.total_row {
  background: #ddface;
}

.total_road {
  background: greenyellow;
}
</style>
<template>
  <div>
    <Loader :loader="loader" />
    <Periods @Action="Actioned" @data="getCurrentData">
      <label for="">
        Тип вагона
        <br />
        <select name="" id="" v-model="wag_type">
          <option value="Полувагон">Полувагон</option>
          <option value="Цистерна">Цистерна</option>
        </select>
      </label>
    </Periods>
    <br />

    <!-- <pre>{{ normalized }}</pre> -->
    <p>Форма 4.5. "Справка о выполнении перевозок полувагонами"</p>
    <div style="overflow: auto">
      <table class="tbl_search">
        <thead>
          <th>Дорога погрузки</th>
          <th>Клиент</th>
          <th>Дорога выгрузки</th>
          <th style="width: 250px">Груз</th>
          <th style="width: 200px">Вес</th>
          <th style="width: 200px">Кол-во погрузок</th>
          <th style="width: 200px">Выручка руб, без НДС</th>
        </thead>

        <template v-for="obj in normalized">
          <template v-for="{ road, attr1, TOTAL_ROAD } in obj.data">
            <template v-for="({ client, attr3, total }, iAttr1) in attr1">
              <tr v-for="(attr3Item, iAttr3) in attr3">
                <td :rowspan="rowspan(attr1)" v-if="!iAttr1 && !iAttr3">
                  {{ road }}
                </td>
                <td :rowspan="attr3.length" v-if="!iAttr3">{{ client }}</td>
                <td>{{ attr3Item.road }}</td>
                <table>
                  <tr v-for="item in attr3Item.cargo" :key="item.id">
                    <td style="width: 250px">{{ item.name }}</td>
                    <td style="width: 200px">{{ item?.cargo?.toFixed(2) }}</td>
                    <td style="width: 200px">{{ item.loads | format }}</td>
                    <td style="width: 200px">
                      {{ item?.revenue?.toFixed(2) | format }}
                    </td>
                  </tr>
                </table>
              </tr>
              <tr class="total">
                <td colspan="2">Итого {{ client }}:</td>
                <td></td>
                <td>{{ total?.cargo.toFixed(2) | format }}</td>
                <td>{{ total?.amount | format }}</td>
                <td>{{ total?.revenue.toFixed(2) | format }}</td>
              </tr>
            </template>
            <tr class="total_2">
              <td colspan="3">Итого {{ road }}:</td>
              <td></td>
              <td>{{ TOTAL_ROAD?.cargo.toFixed(2) | format }}</td>
              <td>{{ TOTAL_ROAD?.amount | format }}</td>
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
          <td>{{ obj.total?.cargo.toFixed(2) | format }}</td>
          <td>{{ obj.total?.amount | format }}</td>
          <td>{{ obj.total?.revenue.toFixed(2) | format }}</td>
        </tr>
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
      normalized: [],
      loader: false,
      date_begin: "",
      date_end: "",
      wag_type: "Полувагон",

      //     objects:
      //   [
      // {
      //   "data": [
      //     {
      //       "road": "Белорусская ж. д.",
      //       "attr1": [
      //         {
      //           "client": "РУСНЕРУДТРЕЙД, ООО",
      //           "attr3": [
      //             {
      //               "road": "Московская ж. д.",
      //               "cargo": [
      //                 {
      //                   "name": "Щебень гранитный не поименованный в 123",
      //                   "loads": 26,
      //                   "revenue": 76214000,
      //                   "cargo:": 1783
      //                 },
      //                 {
      //                   "name": "Щебень гранитный фракции 5х20",
      //                   "loads": 5,
      //                   "revenue": 3604000,
      //                   "cargo": 341
      //                 }
      //               ]
      //             },
      //             {
      //               "road": "Московская ж. д.",
      //               "cargo": [
      //                 {
      //                   "name": "Щебень гранитный не поименованный в ал;.y.,mfhgndfdzahsфавите",
      //                   "loads": 26,
      //                   "revenue": 76214000,
      //                   "cargo:": 1783
      //                 },
      //                 {
      //                   "name": "Щебень гранитный фракции 12321 24gх20",
      //                   "loads": 5,
      //                   "revenue": 3604000,
      //                   "cargo:": 341
      //                 }
      //               ]
      //             }
      //           ],
      //           "total": {
      //             "amount": 31,
      //             "revenue": 79818000,
      //             "cargo": 2124
      //           }
      //         }
      //       ],
      //       "TOTAL_ROAD": {
      //         "amount": 31,
      //         "revenue": 79818000,
      //         "cargo": 2124
      //       }
      //     },
      //         ],
      //         ALL_TOTAL: {
      //           cargo: 'ALL_TOTAL',
      //           amount: 'ALL_TOTALA',
      //           wo_nds: 'ALL_TOTALWO'
      //         }
      //       }],
      objects2: "",
      //   objects2: {
      //     "data": {
      //       "Белорусская ж. д.": {
      //           "data": {
      //               "РУСНЕРУДТРЕЙД, ООО": {
      //                   "data": {
      //                       "Московская ж. д.": {
      //                           "data": {
      //                               "Щебень гранитный не поименованный в алфавите": {
      //                                   "loads": 26,
      //                                   "revenue": 76214000.0,
      //                                   "cargo:": 1783.0
      //                               },
      //                               "Щебень гранитный фракции 5х20": {
      //                                   "loads": 5,
      //                                   "revenue": 0.0,
      //                                   "cargo:": 341.0
      //                               }
      //                           },
      //                           "total": {
      //                               "amount": 0,
      //                               "revenue": 0,
      //                               "cargo": 0
      //                           }
      //                       }
      //                   },
      //                   "total": {
      //                       "amount": 31,
      //                       "revenue": 76214000.0,
      //                       "cargo": 2124.0
      //                   }
      //               },
      //   },

      //     }

      // },
      // "total": {
      //       "amount": 4304,
      //       "revenue": 28475659670.8505,
      //       "cargo": 295255.06500000006
      //   }
      //   }
    };
  },
  methods: {
    rowspan: (attr2) => attr2.reduce((acc, n) => acc + n.attr3.length + 1, 0),

    normalizeObject() {
      const test = Object.keys(this.objects2.data).map((key) => {
        const obj = {
          road: key,
          attr1: Object.keys(this.objects2.data[key].data).map((client) => {
            return {
              client,
              attr3: Object.keys(this.objects2.data[key].data[client].data).map(
                (road) => {
                  return {
                    road,
                    cargo: Object.keys(
                      this.objects2.data[key].data[client].data[road].data
                    ).map((cargo) => {
                      return {
                        name: cargo,
                        ...this.objects2.data[key].data[client].data[road].data[
                          cargo
                        ],
                        // cargo:  this.objects2.data[key].data[client].data[road].data[cargo]
                      };
                    }),
                  };
                }
              ),
              total: this.objects2.data[key].data[client].total,
            };
          }),
          TOTAL_ROAD: this.objects2.data[key].total,
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
    Actioned() {
      this.loader = true;
      api
        .getUO45(this.date_begin, this.date_end, this.wag_type)
        .then((response) => {
          this.loader = false;
          this.objects2 = response.data;
          this.normalizeObject();
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
  mounted() {
    // this.normalizeObject()
  },
  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
  },
};
</script>
<!-- 
<style lang="scss" scoped>
tr{
    background : red;
    &:hover {
      background: green;
    } 
  }
</style> -->
<style scoped>
.table_search {
  width: 100%;
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

.total_row {
  background: #ddface;
}

.total_road {
  background: greenyellow;
}
</style>
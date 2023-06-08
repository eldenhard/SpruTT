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
        <select name="" id="" v-model="wag_type">
          <option value="Полувагон">Полувагон</option>
          <option value="Цистерна">Цистерна</option>
        </select>
      </label>
    </Periods>
    <br />

    <p>Форма 4.6. "Справка о выполнении перевозок вагоно-цистернами"</p>
    <div style="overflow: auto;">
      <table class="tbl_search">
        <thead>
          <th>Парк</th>
          <th>Станция погрузки</th>
          <th style="width: 200px">Клиент</th>
          <th style="width: 200px">Станция выгрузки</th>
          <th style="width: 200px">Продукт</th>
          <th style="width: 200px">Погрузка, тн</th>
          <th style="width: 200px">Ставка, руб/тн без НДС</th>

          <th style="width: 200px">Выручка, руб, без НДС</th>

        </thead>
        <tbody>
          <template v-for="item,park in obj.data">
            <template v-for="cl in park.data">
              {{ cl }}
            </template>
          </template>
        </tbody>
        <!-- <template v-for="obj in objects211">
          <template v-for="park in  Object.keys(obj)">
            <template v-for="road1 in Object.values(obj)">
              <template v-for="road2 in Object.values(road1)">
              <tr>
                <td>{{ park }}</td>
                <td>{{ Object.keys(road2) }}</td>
              </tr>
            </template>
            </template>
          </template>
        </template> -->
        <!-- <template v-for="park in Object.keys(obj)">
              <template v-for="road in   Object.values(park)">
              <tr>
                <td>{{ park }}</td>
                <td>{{ road }}</td>
              </tr>
            </template>
            </template> -->

        <!-- <template v-for="obj in norm">
              <template v-for="{park, attr1, TOTAL_ROAD} in obj.data">
                <template v-for="({ road_start, attr3, total }, iAttr1) in attr1">
                  <template v-for="{ road, station } in attr3">
                    <template v-for="{ road_end, cargo } in station">
                        <template v-for="item in cargo">
                           <tr>
                              <td>{{ park }}</td>
                              <td>{{ road_start }}</td>
                              <td>{{ road }}</td>
                              <td>{{ road_end }}</td>
                              <td>{{ item.cargo_name }}</td>
                              <td>{{ item.amount }}</td>
                              <td>{{ item.stavka }}</td>
                              <td>{{ item.revenue }}</td>
                           </tr>
                           <tr>
                            <td colspan="2">Итого {{ road }}</td>
                            <td>{{ total.amount }}</td>
                            <td>{{ total.stavka }}</td>
                            <td>{{ total.revenue }}</td>
                           </tr>
                           <tr>
                            <tr>
                            <td colspan="2">Итого {{ road_start }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                           </tr>
                           <tr>
                            <td colspan="2">Итого {{ park }}</td>
                            <td>{{ TOTAL_ROAD.amount }}</td>
                            <td>{{ TOTAL_ROAD.stavka }}</td>
                            <td>{{ TOTAL_ROAD.revenue }}</td>
                           </tr>
                     
                        </template>
                    </template>
                  </template>
                </template>
              </template>
              <tr>
                <td colspan="2">Итого {{ park }}</td>
                <td>{{ obj.total.amount }}</td>
                <td>{{ obj.total.stavka }}</td>
                <td>{{ obj.total.revenue }}</td>
                </tr>
          </template> -->


        <!-- <template  v-for="obj in normalized">
        <template v-for="{ park, attr1 } in obj.data">
          <template v-for="({ road_start, attr3, TOTAL_ROAD }, iAtrr1) in attr1">
              <template v-for="({ road, station, total }, iAttr2) in attr3">
                <tr v-for="(attr3Item, iAttr3) in attr3">
                  <td>{{ park }}</td>
                  <td :rowspan="attr3.length +1 "  v-if="!iAttr3">{{ road_start }}</td>
                  <td :rowspan="attr3.length"  v-if="!iAttr3">{{ road }}</td>
                  <table>
                    <tr v-for="item in attr3Item.station" :key="item.id">
                     <td style="width: 200px">{{ item.road_end }}</td> 
                     <template  v-for="cargo in item.cargo" >
                      
                        <td style="width: 200px">{{ cargo.cargo_name }}</td> 
                        <td style="width: 200px">{{ cargo.amount.toFixed(2) | format }}</td> 
                        <td style="width: 200px">{{ cargo.stavka.toFixed(2) | format }}</td> 
                        <td style="width: 200px">{{ cargo.revenue.toFixed(2) | format }}</td> 
                      
                     

                      </template>
              
                    </tr>
                  </table>
                  <tr class="total">
                  <td></td>
                  <td colspan="2">Итого {{ road }}:</td>
                  <td></td>
                  <td>{{ TOTAL_ROAD }}</td>
                  <td>{{ total?.cargo.toFixed(2) | format }}</td>
                  <td>{{ total?.amount | format }}</td>
                  <td>{{ total?.revenue.toFixed(2) | format }}</td>
                </tr>
                  </tr>
                </template>
                <tr class="total_2">
                <td></td>
                <td colspan="3">Итого {{ road_start }}:</td>
                <td></td>
                <td>{{ TOTAL_ROAD?.cargo.toFixed(2) | format }}</td>
                <td>{{ TOTAL_ROAD?.amount | format }}</td>
                <td>{{ TOTAL_ROAD?.revenue.toFixed(2) | format }}</td>
              </tr>
              </template>
           
        </template>
     </template> -->


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
      norm: [],
      objects2: "",

      loader: false,
      date_begin: "",
      date_end: "",
      wag_type: "Полувагон",

    obj: {
  "data": {
    "Слежение": {
      "data": {
        "Донецкая ж. д.": {
          "data": {
            "ФЕРРУМ ТРЕЙД": {
              "data": {
                "Московская ж. д.": {
                  "data": {
                    "Щебень гранитный не поименованный в алфавите": {
                      "amount": 68.8,
                      "stavka": 872.093023255814,
                      "revenue": 60000
                    }
                  },
                  "total": {
                    "amount": 1,
                    "stavka": 872.093023255814,
                    "revenue": 60000
                  }
                }
              },
              "total": {
                "amount": 2,
                "stavka": 872.093023255814,
                "revenue": 60000
              }
            }
          },
          "total": {
            "amount": 3,
            "stavka": 872.093023255814,
            "revenue": 60000
          }
        },
        "Забайкальская ж. д.": {
          "data": {
            "ТК РУТ Логистик": {
              "data": {
                "Юго-Восточная ж. д.": {
                  "data": {
                    "Щебень, не поименованный в алфавите": {
                      "amount": 67.8,
                      "stavka": 0,
                      "revenue": 0
                    }
                  },
                  "total": {
                    "amount": 67.8,
                    "stavka": 0,
                    "revenue": 0
                  }
                }
              },
              "total": {
                "amount": 67.8,
                "stavka": 0,
                "revenue": 0
              }
            }
          },
          "total": {
            "amount": 67.8,
            "stavka": 0,
            "revenue": 0
          }
        },
      },
      "total": {
        "amount": 4,
        "stavka": 7371.291788131439,
        "revenue": 510300
      }
    },
  },
  "total": {
    "amount": 5,
    "stavka": 313430.76072340476,
    "revenue": 21803996.889999997
  }
}

    

    };
  },
  methods: {
    rowspan(attr) {
      attr.reduce((acc, item) =>
        acc += item.attr1.length + 1, 0)
    },
    // rowspan: (attr0) => attr0.reduce((acc, n) => acc + n.attr1.length + 1, 0),

    normalizeObject() {
      const test = Object.keys(this.objects2.data).map((key) => {
        const obj = {
          park: key,
          attr1: Object.keys(this.objects2.data[key].data).map((road_start) => {
            return {
              road_start,
              attr3: Object.keys(this.objects2.data[key].data[road_start].data).map(
                (client) => {
                  return {
                    client,
                    station: Object.keys(
                      this.objects2.data[key].data[road_start].data[client].data).map((station) => {
                      return {
                        road_end: station,
                     
                        cargo: Object.keys(
                          this.objects2.data[key].data[road_start].data[client].data[station].data).map((cargo) => {
                          return {
                            cargo_name: cargo,
                            ...this.objects2.data[key].data[road_start].data[client].data[station].data[cargo],
                          }
                        })

                      };
                    }),
                    
                  };
                }
              ),
              total: this.objects2.data[key].data[road_start].total,
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
        .getUO46(this.date_begin, this.date_end, this.wag_type)
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
    this.norm = Object.keys(this.obj.data).map((key) => {
      const obj = {
        park: key,
        attr1: Object.keys(this.obj.data[key].data).map((road_start) => {
          return {
            road_start: road_start,
            client: Object.keys(this.obj.data[key].data[road_start].data).map((client) => {
              return {
                client_name: client,
                road_end: Object.keys(this.obj.data[key].data[road_start].data[client].data).map((road_end) => {
                  return{
                      road_end: road_end,
                      cargo:  Object.keys(this.obj.data[key].data[road_start].data[client].data[road_end].data).map((cargo) => {
                        return{
                          cargo_name: cargo,
                          ...this.obj.data[key].data[road_start].data[client].data[road_end].data[cargo]
                        }
                      }),
                      total_client: this.obj.data[key].data[road_start].data[client].total

                  }
                }),
                total_road_end: this.obj.data[key].data[road_start].total
              }
            }),
            total_park: this.obj.data[key].total,

          }
        }),
       
        all_total: this.obj.total
      }
  return obj
    })
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
  padding: 5px;
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
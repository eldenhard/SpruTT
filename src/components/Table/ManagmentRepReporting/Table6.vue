<template>
  <div>
<!-- <div style="display: flex; justify-content: space-between;">
  <pre>{{ obj }}</pre>
  <pre>{{ norm }}</pre>
</div> -->
   <!-- <pre>{{ normalized }}</pre> -->
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
                    <!-- <td style="width: 250px">{{ item.name_weight[0] }}</td> -->
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
                        name_weight: Object.keys(this.objects2.data[key].data[client].data[road].data[cargo].data),
                        name_cargo: Object.keys(this.objects2.data[key].data[client].data[road].data[cargo].data).map(item => {
                          return{
                           ...this.objects2.data[key].data[client].data[road].data[cargo].data[item]
                          }
                        })
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

  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
    ifNull(value){
      if(value == null || value == 'null'){
        return 'Неопределенно'
      }
        return value
    }
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
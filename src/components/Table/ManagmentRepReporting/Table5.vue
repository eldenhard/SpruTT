<template>
  <div>
    <!-- <pre>{{normalized}}</pre> -->
    <Loader :loader="loader" />
    <Periods @Action="Actioned" @data="getCurrentData" >
      <label for="">
        Тип вагона
        <br />
        <select name="" id="" v-model="wag_type"  style="width: 100%" >
          <option value="Полувагон">Полувагон</option>
          <option value="Цистерна">Цистерна</option>
        </select>
      </label>
    </Periods>
    <br />

    <!-- <pre>{{ normalized }}</pre> -->
    <p>Форма 4.5. "Справка о выполнении перевозок {{ wag_type == 'Цистерна'  ?  wag_type.toLowerCase() + 'ми' : wag_type.toLowerCase() + 'ами'}}"</p>
    <div  class="block-table">
      <table class="table_search" >
        <thead>
          <th>Дорога погрузки</th>
          <th>Клиент</th>
          <th>Дорога выгрузки</th>
          <th style="width:220px">Груз</th>
          <th style="width: 180px">Вес</th>
          <th style="width: 180px">Кол-во погрузок</th>
          <th style="width: 180px">Выручка руб, без НДС</th>
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
                    <td style="width:220px">{{ item.name }}</td>
                    <td style="width: 180px">{{ item?.cargo?.toFixed(2) }}</td>
                    <td style="width: 180px">{{ item.loads | format }}</td>
                    <td style="width: 180px">
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
          <td></td>

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

    
      objects2: "",

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
          console.log( this.objects2, '5')
          console.log(response, '5')
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
.block-table{
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  overflow:auto;
}
.table_search {
  width: 50%;
  max-width: 50% !important;
}
th{
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
  padding: 3px;
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
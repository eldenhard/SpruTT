<template>
  <div>
    <p>Форма 4.5. "Справка о выполнении перевозок полувагонами"</p>
    <table class="tbl_search">
      <thead>
        <th>Дорога погрузки</th>
        <th>Клиент</th>
        <th>Дорога выгрузки</th>
        <th>Груз</th>
        <th>Кол-во погрузок</th>
        <th>Выручка руб, без НДС</th>
        <!-- <th>Всего</th> -->
      </thead>

      <template v-for="obj in objects">
  <template v-for="{ road, attr1, TOTAL_CLIENT } in obj.data">
    <template v-for="({ client, attr3, total }, iAttr1) in attr1">
      <tr v-for="(attr3Item, iAttr3) in attr3">
        <td :rowspan="rowspan(attr1)" v-if="!iAttr1 && !iAttr3">{{ road }}</td>
        <td :rowspan="attr3.length" v-if="!iAttr3">{{ client }}</td>
        <td>{{ attr3Item.road }}</td>
        <td>{{ attr3Item.cargo }}</td>
        <td>{{ attr3Item.amount }}</td>
        <td>{{ attr3Item.wo_nds }}</td>
      </tr>
      <tr class="total">
        <td colspan="2">Итого {{ client }}:</td>
        <td>{{ total.cargo }}</td>
        <td>{{ total.amount }}</td>
        <td>{{ total.wo_nds }}</td>
      </tr>
    </template>
    <tr class="total_2">
      <td colspan="3">Итого {{ road }}:</td>
      <td>{{ TOTAL_CLIENT.cargo }}</td>
      <td>{{ TOTAL_CLIENT.amount }}</td>
      <td>{{ TOTAL_CLIENT.wo_nds }}</td>
    </tr>
  </template>
</template>
<tr v-for="obj in objects" :key="obj.id" style="border: 1px solid black" class="all_total">
  <td colspan="3">Всего погрузки</td>
      <td>{{ obj.ALL_TOTAL.cargo }}</td>
      <td>{{ obj.ALL_TOTAL.amount }}</td>
      <td>{{ obj.ALL_TOTAL.wo_nds }}</td>
  </tr>

    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      objects: [{
        data: [
        {
          road: "Дорога_1",
          attr1: [
            {
              client: "Клиент_1",
              attr3: [{ road: "Дорога_2", cargo: "нефть1", amount: "1", wo_nds: "1" },
                      { road: "Дорога_3", cargo: "нефть2", amount: "12", wo_nds: "12"},
                      { road: "Дорога_4",cargo: "нефть3",amount: "3",wo_nds: "31" },
              ],
              total: {cargo: "СУММА", amount: "СУММА", wo_nds: "СУММА"}
            },
            {
              client: "Клиент_2",
              attr3: [{ road: "Дорога_5", cargo: "рис1", amount: "14", wo_nds: "41" },
                      { road: "Дорога_6", cargo: "рис2", amount: "15", wo_nds: "61" },
              ],
              total: {cargo: "СУММА", amount: "СУММА", wo_nds: "СУММА"}

            },
          ],
          TOTAL_CLIENT : {
            cargo: 'TOTAL',
            amount: 'TOTALA',
            wo_nds: 'TOTALWO'
          }
        },
        {
          road: "Дорога_1",
          attr1: [
            {
              client: "Клиент_1",
              attr3: [{ road: "Дорога_2", cargo: "нефть1", amount: "1", wo_nds: "1" },
                      { road: "Дорога_3", cargo: "нефть2", amount: "12", wo_nds: "12"},
                      { road: "Дорога_4",cargo: "нефть3",amount: "3",wo_nds: "31" },
              ],
              total: {cargo: "СУММА", amount: "СУММА", wo_nds: "СУММА"}
            },
            {
              client: "Клиент_2",
              attr3: [{ road: "Дорога_5", cargo: "рис1", amount: "14", wo_nds: "41" },
                      { road: "Дорога_6", cargo: "рис2", amount: "15", wo_nds: "61" },
              ],
              total: {cargo: "СУММА", amount: "СУММА", wo_nds: "СУММА"}

            },
          ],
          TOTAL_CLIENT : {
            cargo: 'TOTAL',
            amount: 'TOTALA',
            wo_nds: 'TOTALWO'
          }
        },
],
        ALL_TOTAL: {
            cargo: 'ALL_TOTAL',
            amount: 'ALL_TOTALA',
            wo_nds: 'ALL_TOTALWO'
          }
      }
     
   ],
    };
  },
mounted(){
  
},
  methods: {
    rowspan: attr1 => attr1.reduce((acc, n) => acc + n.attr3.length + 1, 0),
    // getRowCount(obj) {
    //   let total = 0;
    //   let last_item = '';
    //   obj.attr1.forEach((item) => {
    //     total += item.attr3.length;
    //   });
    //   return total;
    // },
  },
};
</script>


<style scoped>
.total{
  background: #FDFFD9;
}
.total_2{
  background: #DDFACE;
}
tr:hover{
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
  background: #DDFACE;
}
.total_road{
  background: greenyellow;
}
/* .road:nth-last-child(n){
  background: red;
}
.road2:last-child{
  background: green;
} */
</style>
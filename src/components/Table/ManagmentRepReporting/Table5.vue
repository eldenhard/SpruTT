<template>
  <div>
    <table class="table">
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
        <tr :key="obj.id">
          <td :rowspan="getRowCount(obj)">{{ obj.road }}</td>
          <td :rowspan="obj.attr1[0].attr3.length">{{ obj.attr1[0].attr2 }}</td>
          <td>{{ obj.attr1[0].attr3[0].road }}</td>
          <td>{{ obj.attr1[0].attr3[0].cargo }}</td>
          <td>{{ obj.attr1[0].attr3[0].amount }}</td>
          <td>{{ obj.attr1[0].attr3[0].wo_nds }}</td>
        </tr>

        <tr v-for="val2 in obj.attr1[0].attr3.slice(1)" :key="val2.id">
          <td>{{ val2.road }}</td>
          <td>{{ val2.cargo }}</td>
          <td>{{ val2.amount }}</td>
          <td>{{ val2.wo_nds }}</td>
        </tr>

        <template v-for="subkey in obj.attr1.slice(1)">
          <tr :key="subkey.id">
            <td :rowspan="subkey.attr3.length">{{ subkey.attr2 }}</td>
            <td>{{ subkey.attr3[0].road }}</td>
            <td>{{ subkey.attr3[0].cargo }}</td>
            <td>{{ subkey.attr3[0].amount }}</td>
            <td>{{ subkey.attr3[0].wo_nds }}</td>
          </tr>

          <tr v-for="value3 in subkey.attr3.slice(1)" :key="value3.id">
            <td>{{ value3.road }}</td>
            <td>{{ value3.cargo }}</td>
            <td>{{ value3.amount }}</td>
            <td>{{ value3.wo_nds }}</td>
          </tr>
        </template>
        <tr style="background: lightgray;">
            <td>Итого {{ obj.road }}</td>
            <td></td>
            <td></td>
            <td>{{ obj.TOTAL.cargo }}</td>
            <td>{{ obj.TOTAL.amount }}</td>
            <td>{{ obj.TOTAL.wo_nds }}</td>

        </tr>
      </template>
      <tr v-for="obj in objects">
        <td>Всего погрузки</td>
        <td>{{ obj.ALL_TOTAL }}</td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      first: [],
      second: [],
      objects: [
         {
          road: "Дорога_1",
          attr1: [
            {
              attr2: "Клиент_1",
              attr3: [
                { road: "Дорога_2", cargo: "нефть1", amount: "1", wo_nds: "1" },
                {
                  road: "Дорога_3",
                  cargo: "нефть2",
                  amount: "12",
                  wo_nds: "12",
                },
                {
                  road: "Дорога_4",
                  cargo: "нефть3",
                  amount: "3",
                  wo_nds: "31",
                },
                {
                  road: "Итого",
                  cargo: "СУММА",
                  amount: "СУММА",
                  wo_nds: "СУММА",
                },
              ],
            },
            {
              attr2: "Клиент_2",
              attr3: [
                { road: "Дорога_5", cargo: "рис1", amount: "14", wo_nds: "41" },
                { road: "Дорога_6", cargo: "рис2", amount: "15", wo_nds: "61" },
                { road: "Итого", cargo: "СУММА", amount: "СУММА", wo_nds: "СУММА"},
              ],
            },
          ],
          TOTAL : {
            cargo: 'TOTAL',
            amount: 'TOTALA',
            wo_nds: 'TOTALWO'
          }
        },
        {
          road: "Дорога_2",
          attr1: [
            {
              attr2: "Клиент_3",
              total: "Итого Клиент_3",
              attr3: [
                { road: "Дорога_7", cargo: "лом1", amount: "16", wo_nds: "19" },
                { road: "Дорога_8", cargo: "лом2", amount: "17", wo_nds: "10" },
                { road: "Дорога_9", cargo: "лом3", amount: "18", wo_nds: "12" },
                {
                  road: "Итого",
                  cargo: "СУММА",
                  amount: "СУММА",
                  wo_nds: "СУММА",
                },
              ],
            },
            {
              attr2: "Клиент_4",
              total: "Итого Клиент_4",
              attr3: [
                {
                  road: "Дорога_10",
                  cargo: "рыба1",
                  amount: "19",
                  wo_nds: "145",
                },
                {
                  road: "Дорога_11",
                  cargo: "рыба2",
                  amount: "20",
                  wo_nds: "15",
                },
                {
                  road: "Итого",
                  cargo: "СУММА",
                  amount: "СУММА",
                  wo_nds: "СУММА",
                },
              ],
            },
          ],
          TOTAL : {
            cargo: 'TOTAL',
            amount: 'TOTALA',
            wo_nds: 'TOTALWO'
          },
         
        },
        // 'ALL_TOTAL': {
        //     cargo: 'ALL_TOTAL',
        //     amount: 'ALL_TOTALA',
        //     wo_nds: 'ALL_TOTALWO'
        //   }
      ],
    };
  },
  methods: {
    getRowCount(obj) {
      let total = 0;
      obj.attr1.forEach((item) => {
        total += item.attr3.length;
      });
      return total;
    },
  },
};
</script>


<style scoped>
td {
  border: 1px solid black !important;
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
</style>
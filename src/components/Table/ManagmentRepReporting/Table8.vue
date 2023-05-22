<template>
  <div>
    <p>Форма 4.8 "Производство по универсальным перевозкам (собственный парк)"</p>
    <div style="overflow: auto;">
      <table>
        <thead>
          <tr>
            <th>Основной клиент</th>
            <th>Схема</th>
            <th>Клиент</th>
            <th>Дорога отпр.</th>
            <th>Станция отпр.</th>
            <th>Дорога назнач.</th>
            <th>Станция назнач.</th>
            <th>Продукт</th>
            <th>Кол-во погр.</th>
            <th>Выручка</th>
            <th>Штрафы</th>
            <th>Экспедирование</th>
            <th>Тариф порож.</th>
            <th>Тариф CT</th>
            <th>Тариф груж</th>
            <th>Подготовка</th>
            <th>Доп. услуги</th>
            <th>Вагоно-сутки</th>
            <th>МД</th>
            <th>Доходность</th>
            <th>Ставка, руб./ваг</th>
            <th>Оборачиваемость, сут</th>

          </tr>
        </thead>
        <template v-for="obj in objects">
          <template v-for="{ client_main, attr1, TOTAL } in obj.data">
            <template v-for="({ scheme, attr3, total }, iAttr1) in attr1">
              <tr v-for="(attr3Item, iAttr3) in attr3" :key="attr3Item.id">
                <td :rowspan="rowspan(attr1)" v-if="!iAttr1 && !iAttr3">{{ client_main }}</td>
                <td :rowspan="attr3.length" v-if="!iAttr3">{{ scheme }}</td>
                <td>{{ attr3Item?.client }}</td>
                <td>{{ attr3Item?.road_dep }}</td>
                <td>{{ attr3Item?.station_dep }}</td>
                <td>{{ attr3Item?.road_dest }}</td>

                <td>{{ attr3Item?.station_dest }}</td>
                <td>{{ attr3Item?.product }}</td>
                <td>{{ attr3Item?.amount }}</td>
                <td>{{ attr3Item?.proceeds }}</td>

                <td>{{ attr3Item?.fines }}</td>
                <td>{{ attr3Item?.forwarding }}</td>
                <td>{{ attr3Item?.tf_empty }}</td>
                <td>{{ attr3Item?.tf_st }}</td>

                <td>{{ attr3Item?.tf_laden }}</td>
                <td>{{ attr3Item?.preparation }}</td>
                <td>{{ attr3Item?.add_service }}</td>
                <td>{{ attr3Item?.wag_day }}</td>

                <td>{{ attr3Item?.md }}</td>
                <td>{{ attr3Item?.profit }}</td>
                <td>{{ attr3Item?.stavka }}</td>
                <td>{{ attr3Item?.turnover }}</td>
              </tr>
              <tr class="total">
                <td colspan="2">Итого {{ scheme }}:</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{ total?.amount }}</td>
                <td>{{ total?.proceeds }}</td>

                <td>{{ total?.fines }}</td>
                <td>{{ total?.forwarding }}</td>
                <td>{{ total?.tf_empty }}</td>
                <td>{{ total?.tf_st }}</td>

                <td>{{ total?.tf_laden }}</td>
                <td>{{ total?.preparation }}</td>
                <td>{{ total?.add_service }}</td>
                <td>{{ total?.wag_day }}</td>

                <td>{{ total?.md }}</td>
                <td>{{ total?.profit }}</td>
                <td>{{ total?.stavka }}</td>
                <td>{{ total?.turnover }}</td>
              </tr>
            </template>
            <tr class="total_2">
              <td colspan="3">Итого {{ client_main }}:</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ TOTAL?.amount }}</td>
              <td>{{ TOTAL?.proceeds }}</td>

              <td>{{ TOTAL?.fines }}</td>
              <td>{{ TOTAL?.forwarding }}</td>
              <td>{{ TOTAL?.tf_empty }}</td>
              <td>{{ TOTAL?.tf_st }}</td>

              <td>{{ TOTAL?.tf_laden }}</td>
              <td>{{ TOTAL?.preparation }}</td>
              <td>{{ TOTAL?.add_service }}</td>
              <td>{{ TOTAL?.wag_day }}</td>

              <td>{{ TOTAL?.md }}</td>
              <td>{{ TOTAL?.profit }}</td>
              <td>{{ TOTAL?.stavka }}</td>
              <td>{{ TOTAL?.turnover }}</td>
            </tr>
          </template>
        </template>
        <tr v-for="obj in objects" :key="obj.id" style="border: 1px solid black" class="all_total">
          <td colspan="3">Всего погрузки</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ obj.ALL_TOTAL?.amount }}</td>
          <td>{{ obj.ALL_TOTAL?.proceeds }}</td>

          <td>{{ obj.ALL_TOTAL?.fines }}</td>
          <td>{{ obj.ALL_TOTAL?.forwarding }}</td>
          <td>{{ obj.ALL_TOTAL?.tf_empty }}</td>
          <td>{{ obj.ALL_TOTAL?.tf_st }}</td>

          <td>{{ obj.ALL_TOTAL?.tf_laden }}</td>
          <td>{{ obj.ALL_TOTAL?.preparation }}</td>
          <td>{{ obj.ALL_TOTAL?.add_service }}</td>
          <td>{{ obj.ALL_TOTAL?.wag_day }}</td>

          <td>{{ obj.ALL_TOTAL?.md }}</td>
          <td>{{ obj.ALL_TOTAL?.profit }}</td>
          <td>{{ obj.ALL_TOTAL?.stavka }}</td>
          <td>{{ obj.ALL_TOTAL?.turnover }}</td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      objects: [{
        data: [
          {
            client_main: "Клиент_1!",
            attr1: [
              {
                scheme: "Схема_1",
                attr3: [
                  { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789', wag_day: '567', md: "980", profit: ' 10000', stavka: '560', turnover: '67' },
                  { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789', wag_day: '567', md: "980", profit: ' 10000', stavka: '560', turnover: '67' },
                  { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789', wag_day: '567', md: "980", profit: ' 10000', stavka: '560', turnover: '67' },
                ],
                total: { amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789', wag_day: '567', md: "980", profit: ' 10000', stavka: '560', turnover: '67' }
              },
              {
                scheme: "Схема_2",
                attr3: [
                  { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789', wag_day: '567', md: "980", profit: ' 10000', stavka: '560', turnover: '67' },
                  { client: "Клиент 1", road_dep: 'РЖД', station_dep: 'Биклянь', road_dest: 'КЖД', station_dest: "Астана", product: 'Уголь', amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789', wag_day: '567', md: "980", profit: ' 10000', stavka: '560', turnover: '67' },
                ],
                total: { amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789', wag_day: '567', md: "980", profit: ' 10000', stavka: '560', turnover: '67' }

              },
            ],
            TOTAL: {
              amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789', wag_day: '567', md: "980", profit: ' 10000', stavka: '560', turnover: '67'
            }

          },

        ],
        ALL_TOTAL: {
          amount: '1000', proceeds: '2500', fines: '90', forwarding: '11', tf_empty: '123', tf_st: "445", tf_laden: '456', preparation: '12345', add_service: '789', wag_day: '567', md: "980", profit: ' 10000', stavka: '560', turnover: '67'
        }
      }

      ],
    }
  },
  methods: {
    //     getRowCount(obj) {
    //   let total = 0;
    //   let last_item = '';
    //   obj.attr1.forEach((item) => {
    //     total += item.attr3.length;
    //   });
    //   return total;
    // },
    rowspan: attr1 => attr1.reduce((acc, n) => acc + n.attr3.length + 1, 0),

  }
}
</script>

<style scoped>
.total {
  background: #FDFFD9;
}

.total_2 {
  background: #DDFACE;
}

tr:hover {
  background: rgb(236, 236, 236);
}

.itogo {
  font-weight: bold;
  border-right: none !important;

}

.all_total {
  background: #EAF1DD;
}

/* .last:nth-last-of-type(3n) {
   border-bottom: 2px solid rgb(0, 0, 0) !important
} */
.total_row {
  background: #DAEEF3;
}

td,
th {
  border: 1px solid rgb(102, 102, 102) !important;
  color: black !important;
}

.all_total {
  background: #EAF1DD;
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
}</style>
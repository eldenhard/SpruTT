<template>
  <div>
   <Periods />

    <div style="overflow: auto; margin-top: 5%">
      <table border="1" align="center">
        <thead>
          <tr>
            <th class="widthFirst"></th>
            <th>Подвижной состав, ед</th>
            <template v-for="(data, key) in responseData">
              <th :key="data.id">{{ key | getCorrectData }}</th>
              <tr :key="data.id">
                <td colspan="2">{{ key | GetNameMounth }}</td>
              </tr>
              <tr :key="data.id">
                <th class="col1" style="font-size: 13px !important">Ввод</th>
                <th class="col1" style="font-size: 13px !important">Вывод</th>
              </tr>
            </template>
          </tr>

          <tr>
            <th class="number">1</th>
            <th class="styles">Оперерирование</th>
            <template v-for="data in responseData">
              <th :key="data.id">{{ data?.operating?.on_date }}</th>
              <tr :key="data.id">
                <th class="col1">{{ data?.operating?.in }}</th>
                <th class="col1">{{ data?.operating?.out }}</th>
              </tr>
            </template>
          </tr>

          <tr>
            <th class="number">2</th>
            <th class="styles">Сдача в аренду</th>
            <template v-for="data in responseData">
              <th :key="data.id">{{ data?.renting?.on_date }}</th>
              <tr :key="data.id">
                <th class="col1">{{ data?.renting?.in }}</th>
                <th class="col1">{{ data?.renting?.out }}</th>
              </tr>
            </template>
          </tr>

          <tr @click="highlightRow(this)">
            <th class="number">3</th>
            <th class="styles">Итого</th>
            <template v-for="data in responseData">
              <th :key="data.id">{{ data.total?.on_date }}</th>
              <tr :key="data.id">
                <th class="col1">{{ data?.total?.in }}</th>
                <th class="col1">{{ data?.total?.out }}</th>
              </tr>
            </template>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
import responseData from "@/components/Table/ManagmentRepReporting/response42";
import Periods from "./Periods.vue";
export default {
  components: {Periods},
  data() {
    return {
      index_font_size: "1%",
      responseData: responseData.responseData,
    };
  },
 
  filters: {
    getCorrectData(value) {
      let date = new Date(value);
      return date.toLocaleDateString();
    },
    GetNameMounth(value) {
      let date = new Date(value);
      let monthName = date
        .toLocaleString("default", { month: "long" })
        .slice(0, 3);
      let getYear = date.getFullYear();
      return `${monthName}. ${getYear}`;
    },
  },
 
};
</script>
<style scoped>

.number {
  background: #b6df89;
  color: #41766f;
}
/* tr:hover:nth-child(n+2){
    background: rgba(196, 196, 196, 0.5);
    cursor: pointer;
} */

.col1 {
  min-width: 60px;
  max-width: 60px;
  /* border: lightgray; */
}

th {
  font-weight: 400 !important;
}

</style>
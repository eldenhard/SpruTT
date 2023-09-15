<template>
  <div>
    <Loader :loader="loader" />
    <h4>Просмотр ранее сохраненных данных</h4>
    <div class="filter_block">
      <button class="Accept" @click="getData()">Запросить данные</button>
    </div>
    <table class="table-hover">
      <thead>
        <tr class="table-secondary" style="background: #E1E1E2;">
          <th>Вагон</th>
          <th>Из под груза</th>
          <th>Дата прибытия</th>
          <th>Дата начала отстоя</th>
          <th>Дата вывода вагонов с под. пути</th>
          <th>Расчетное время (сут)</th>
          <th>Ремонт запорного мех. люка</th>
          <th>Уборка вагона от снега без зач.</th>
          <th>Удаление остатков ранее перев. груза</th>
          <th>Проведение сварочных работ</th>
          <th>Маневровые работы</th>
          <th>Осмотр вагонов</th>

          <th>Услуги по подаче и уборке вагонов</th>
          <th>Комплекс работ и услуг по ком. осмотру и подг. ваг.</th>
          <th>Услуги по отстою</th>

          <th>Цена</th>
          <th>НДС</th>
          <th>№ дог</th>
          <th>Дата дог</th>
          <th>Контрагент</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.wagon }}</td>
          <td>{{ item.from_cargo }}</td>
          <td>{{ item.arrival_date | filterData}}</td>
          <td>{{ item.parking_begin_date | filterData}}</td>
          <td>{{ item.departure_date | filterData}}</td>
          <td>{{ item.days }}</td>
          <td>{{ item.service1 }}</td>
          <td>{{ item.service2 }}</td>
          <td>{{ item.service3 }}</td>
          <td>{{ item.service4 }}</td>
          <td>{{ item.service5 }}</td>
          <td>{{ item.service6 }}</td>
          <td>{{ item.service7 }}</td>
          <td>{{ item.service8 }}</td>
          <td>{{ item.service9 }}</td>
          <td>{{ item.cost }}</td>
          <td>{{ item.nds }}</td>
          <td>{{ item.act_number }}</td>
          <td>{{ item.act_date| filterData }}</td>
          <td style="white-space: nowrap;">{{ item.contractor }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Loader from "../../../loader/loader.vue";
import api from "@/api/directory";

export default {
  components: { Loader },
  data() {
    return {
      data: "",
      loader: false,
    };
  },
  filters:{
    filterData(value){
     return value ? value.split('-').reverse().join('.') : value
    }
  },
  methods: {
    getData() {
      this.loader = true;
      api
        .getOtherChanges()
        .then((response) => {
          this.data = response.data.data;
          this.loader = false;
        })
        .catch((error) => {
          console.log(error);
          this.loader = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.filter_block {
  position: relative;
}
button {
  width: 25%;
  margin-left: auto;
  height: 40px;
}
</style>
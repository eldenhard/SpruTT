<template>
  <div>
    <Loader :loader="loader" />
    <h4>Просмотр ранее сохраненных данных</h4>
    <div class="filter_block">
      <button class="Accept" @click="getData()">Запросить данные</button>
    </div>
    <div style="max-width: 100% !important; overflow: auto;">
      <table>
        <thead>
          <tr class="table-secondary" style="background: #E1E1E2;">
            <th>Вагон</th>
            <th>Из под груза</th>
            <th>Дата прибытия</th>
            <th>Дата отстоя</th>
            <th>Дата вывода </th>
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
            <td>
              <input type="number" name="wagon" v-model="item.wagon"
                @keydown.enter="changeThisValueByID(item.id, 'wagon', item.wagon, $event)" />
              <div class="load_mini" v-if="isLoading['wagon_' + item.id]"></div>
            </td>



            <td><input type="text" name="from_cargo" v-model="item.from_cargo"
                @keydown.enter="changeThisValueByID(item.id, 'from_cargo', item.from_cargo, $event)">
              <div class="load_mini" v-if="isLoading['from_cargo_' + item.id]"></div>
            </td>

            <td><input type="date" name="arrival_date" v-model="item.arrival_date"
                @keydown.enter="changeThisValueByID(item.id, 'arrival_date', item.arrival_date, $event)">
              <div class="load_mini" v-if="isLoading['arrival_date_' + item.id]"></div>
            </td>
            <td><input type="date" name="parking_begin_date" v-model="item.parking_begin_date"
                @keydown.enter="changeThisValueByID(item.id, 'parking_begin_date', item.parking_begin_date, $event)">
              <div class="load_mini" v-if="isLoading['parking_begin_date_' + item.id]"></div>
            </td>
            <td><input type="date" name="departure_date" v-model="item.departure_date"
                @keydown.enter="changeThisValueByID(item.id, 'departure_date', item.departure_date, $event)">
              <div class="load_mini" v-if="isLoading['departure_date_' + item.id]"></div>
            </td>

            <td><input type="number" name="days" v-model="item.days"
                @keydown.enter="changeThisValueByID(item.id, 'days', item.days, $event)">
              <div class="load_mini" v-if="isLoading['days_' + item.id]"></div>
            </td>



            <td><input type="number" name="service1" v-model="item.service1"
                @keydown.enter="changeThisValueByID(item.id, 'service1', item.service1, $event)">
              <div class="load_mini" v-if="isLoading['service1_' + item.id]"></div>

            </td>
            <td><input type="number" name="service2" v-model="item.service2"
                @keydown.enter="changeThisValueByID(item.id, 'service2', item.service2, $event)">
              <div class="load_mini" v-if="isLoading['service2_' + item.id]"></div>

            </td>
            <td><input type="number" name="service3" v-model="item.service3"
                @keydown.enter="changeThisValueByID(item.id, 'service3', item.service3, $event)">
              <div class="load_mini" v-if="isLoading['service3_' + item.id]"></div>

            </td>
            <td><input type="number" name="service4" v-model="item.service4"
                @keydown.enter="changeThisValueByID(item.id, 'service4', item.service4, $event)">
              <div class="load_mini" v-if="isLoading['service4_' + item.id]"></div>

            </td>
            <td><input type="number" name="service5" v-model="item.service5"
                @keydown.enter="changeThisValueByID(item.id, 'service5', item.service5, $event)">
              <div class="load_mini" v-if="isLoading['service5_' + item.id]"></div>

            </td>
            <td><input type="number" name="service6" v-model="item.service6"
                @keydown.enter="changeThisValueByID(item.id, 'service6', item.service6, $event)">
              <div class="load_mini" v-if="isLoading['service6_' + item.id]"></div>

            </td>
            <td><input type="number" name="service7" v-model="item.service7"
                @keydown.enter="changeThisValueByID(item.id, 'service7', item.service7, $event)">
              <div class="load_mini" v-if="isLoading['service7_' + item.id]"></div>

            </td>
            <td><input type="number" name="service8" v-model="item.service8"
                @keydown.enter="changeThisValueByID(item.id, 'service8', item.service8, $event)">
              <div class="load_mini" v-if="isLoading['service8_' + item.id]"></div>

            </td>
            <td><input type="number" name="service9" v-model="item.service9"
                @keydown.enter="changeThisValueByID(item.id, 'service9', item.service9, $event)">
              <div class="load_mini" v-if="isLoading['service9_' + item.id]"></div>

            </td>

            <td><input type="number" name="cost" v-model="item.cost"
                @keydown.enter="changeThisValueByID(item.id, 'cost', item.cost, $event)">
              <div class="load_mini" v-if="isLoading['cost_' + item.id]"></div>

            </td>
            <td><input type="number" name="nds" v-model="item.nds"
                @keydown.enter="changeThisValueByID(item.id, 'nds', item.nds, $event)">
              <div class="load_mini" v-if="isLoading['nds_' + item.id]"></div>

            </td>
            <td><input type="text" name="act_number" v-model="item.act_number"
                @keydown.enter="changeThisValueByID(item.id, 'act_number', item.act_number, $event)">
              <div class="load_mini" v-if="isLoading['act_number_' + item.id]"></div>

            </td>
            <td><input type="date" name="act_date" v-model="item.act_date"
                @keydown.enter="changeThisValueByID(item.id, 'act_date', item.act_date, $event)">
              <div class="load_mini" v-if="isLoading['act_date_' + item.id]"></div>

            </td>
            <td style="white-space: nowrap;"><input type="text" name="contractor" v-model="item.contractor"
                @keydown.enter="changeThisValueByID(item.id, 'contractor', item.contractor, $event)">
              <div class="load_mini" v-if="isLoading['contractor_' + item.id]"></div>

            </td>

          </tr>
        </tbody>
      </table>
    </div>
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
      isLoading: {},
    };
  },
  filters: {
    filterData(value) {
      return value ? value.split('-').reverse().join('.') : value
    }
  },
  methods: {
    changeThisValueByID(id, inputName, value, event) {
      // console.log(id, value, inputName);
      let loader_key = `${inputName}_${id}`
      if (!this.isLoading[loader_key]) {
        this.$set(this.isLoading, loader_key, true)
        let data = {
          [inputName]: value
        }
        api.putOtherChanges(id, data)
          .then(response => {

            this.$set(this.isLoading, loader_key, false)
            event.target.classList.add('success')
            setTimeout(() => {
              event.target.classList.remove('success')
            }, 1000)
          }).catch((error) => {
            this.$set(this.isLoading, loader_key, false)
            event.target.classList.add('errorColor')
            setTimeout(() => {
              event.target.classList.remove('errorColor')
            }, 1000)

          })
      }
    },
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
.load_mini {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #636363;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  position: absolute;
  right: 10px;
  top: 5px;

  /* Изначально скрыт */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.success {
  background: lightgreen;
  transition: 0.5s ease;
}

.errorColor {
  background: lightcoral;
  transition: 0.5s ease;
}

th {
  font-size: 12px !important;
}

td {
  white-space: nowrap;
  min-width: 5vw;
  position: relative;
}

input {
  width: 100%;
  white-space: nowrap;
}

.filter_block {
  position: relative;
}

button {
  width: 25%;
  margin-left: auto;
  height: 40px;
}
</style>
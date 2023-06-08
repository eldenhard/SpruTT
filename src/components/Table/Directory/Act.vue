<template>
  <div>
    <div class="filter">
      <label for="">
        Контрагент<br />
        <input type="text" class="textarea" v-model="counterparties" />
      </label>
      <label for="">
        Дата акта<br />
        <input type="date" v-model="act_date" id="act_date" class="textarea" />
      </label>
      <label for="">
        Подготовлено под груз<br />
        <input type="text" v-model="for_cargo" class="textarea" />
      </label>
      <label for="">
        Из под груза<br />
        <input type="text" v-model="from_cargo" class="textarea" />
      </label>
      <label for="">
        <br />
        <button class="button Accept" style="height: 3rem" @click="sendData()">Отправить</button>
      </label>
    </div>

    <div
      class="textarea"
      style="
        height: auto;
        width: 80%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
      v-show="ten_visible"
    >
      <ul id="root_tenant">
        <li
          v-for="item in filter_client"
          :key="item.id"
          @click="checkCounterpartie(item.work_name)"
        >
          <span>{{ item.work_name }}</span>
          <hr />
        </li>
      </ul>
    </div>

    <div
      class="textarea"
      style="
        height: auto;
        width: 80%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
      v-show="ten_visible2"
    >
      <ul id="root_tenant">
        <li
          v-for="item in filter_forcargo"
          :key="item.id"
          @click="checkForCargo(item.name)"
        >
          <span>{{ item.name }}</span>
          <hr />
        </li>
      </ul>
    </div>

    <div
      class="textarea"
      style="
        height: auto;
        width: 80%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
      v-show="ten_visible3"
    >
      <ul id="root_tenant">
        <li
          v-for="item in filter_fromcargo"
          :key="item.id"
          @click="checkFromCargo(item.name)"
        >
          <span>{{ item.name }}</span>
          <hr />
        </li>
      </ul>
    </div>
    <table border="1">
      <thead>
  <tr>
    <th></th>
    <th><button class="delete_col" @click="delete_col('wagon')">Удалить столб.</button></th>
    <th><button class="delete_col" @click="delete_col('date_pp_in')">Удалить столб.</button></th>
    <th><button class="delete_col" @click="delete_col('date_work')">Удалить столб.</button></th>
    <th><button class="delete_col" @click="delete_col('date_pp_out')">Удалить столб.</button></th>
    <th><button class="delete_col" @click="delete_col('days')">Удалить столб.</button></th>
    <th><button class="delete_col" @click="delete_col('date_processing')">Удалить столб.</button></th>
    <th><button class="delete_col" @click="delete_col('application_number')">Удалить столб.</button></th>
    <th><button class="delete_col" @click="delete_col('operation')">Удалить столб.</button></th>
    <th><button class="delete_col" @click="delete_col('price_wo_nds')">Удалить столб.</button></th>
  </tr>
        <tr>
        <th>№</th>
        <th>
          <input
            type="text"
            @keyup.enter="save($event)"
            id="wagon"
            class="in_data"
            style="border: 1px solid black !important"
          />
          <br />
          Вагон
        </th>
        <th>
          <input
            type="text"
             @keyup.enter="save($event)"
            id="date_pp_in"
            class="in_data"
            style="border: 1px solid black !important"
          />
          <br />Дата передачи вагона на подъездной путь
        </th>
        <th>
          <input
            type="text"
             @keyup.enter="save($event)"
            id="date_work"
            class="in_data"
            style="border: 1px solid black !important"
          />
          <br />Дата проведения работ
        </th>
        <th>
          <input
            type="text"
             @keyup.enter="save($event)"
            id="date_pp_out"
            class="in_data"
            style="border: 1px solid black !important"
          />
          <br />Дата вывода вагона с подъездного пути
        </th>
        <th>
          <input
            type="text"
             @keyup.enter="save($event)"
            id="days"
            class="in_data"
            style="border: 1px solid black !important"
          />
          <br />Расчетное время в сутках
        </th>
        <th>
          <input
            type="text"
             @keyup.enter="save($event)"
            id="date_processing"
            class="in_data"
            style="border: 1px solid black !important"
          />
          <br />Дата обработки
        </th>
        <th>
          <input
            type="text"
             @keyup.enter="save($event)"
            id="application_number"
            class="in_data"
            style="border: 1px solid black !important"
          />
          <br />Номер заявки
        </th>
        <th>
          <input
            type="text"
             @keyup.enter="save($event)"
            id="operation"
            class="in_data"
            style="border: 1px solid black !important"
          />
          <br />Операция
        </th>
        <th>
          <input
            type="text"
             @keyup.enter="save($event)"
            id="price_wo_nds"
            class="in_data"
            style="border: 1px solid black !important"
          />
          <br />Цена без НДС
        </th>
</tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id">
          <td @click="deleteRow(index)">{{ index + 1 }}</td>
          <td><input type="number" :value="item.wagon" /></td>
          <td><input type="date" v-model="item._date_pp_in" /></td>
          <td><input type="date" v-model="item._date_work" /></td>
          <td><input type="date" v-model="item._date_pp_out" /></td>
          <!-- <td>{{ item.act_date }}</td> -->
          <td><input type="number" :value="item.days" /></td>
          <td><input type="date" v-model="item._date_processing" /></td>
          <td><input type="text" :value="item.application_number" /></td>
          <td><input type="text" :value="item.operation" /></td>
          <td><input type="number" :value="item.price_wo_nds" /></td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<!-- 12.01.1998 -->
<script>
import api from '@/api/directory'
class MyClass {
  constructor() {
    this.date_pp_in = null;
    this.date_work = null;
    this.date_pp_out = null;
    this.days = 0;
    this.date_processing = null;
    this.application_number = null;
    this.operation = null;
    this.price_wo_nds = 0;
    this.counterparty = null;
    this.wagon = 0;
    this.for_cargo = null;
    this.from_cargo = null;
    this.act_date = null;
  }
  set date_pp_in(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._date_pp_in = reverse;
  }
  set date_work(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._date_work = reverse;
  }
  set date_pp_out(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._date_pp_out = reverse;
  }
  set date_processing(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._date_processing = reverse;
  }
}
export default {
  data() {
    return {
      data: [],
      act_date: "",
      counterparties: "",
      from_cargo: "",
      for_cargo: "",
      ten_visible: false,
      ten_visible2: false,
      ten_visible3: false,
    };
  },
  mounted() {
    document.body.addEventListener("click", () => {
      this.ten_visible = false;
      this.ten_visible2 = false;
      this.ten_visible3 = false;
    });
  },
  computed: {
    filter_client() {
      if (this.counterparties.length > 1) {
        this.ten_visible = true;
      }
      return this.counterparties.length > 1
        ? this.$store.state.counterparties.counterparties.filter((item) =>
            item.work_name
              .toLowerCase()
              .includes(this.counterparties.toLowerCase())
          )
        : "";
    },
    filter_forcargo() {
      if (this.for_cargo.length > 1) {
        this.ten_visible2 = true;
      }
      return this.for_cargo.length > 1
        ? this.$store.state.cargo_code.cargo_code.filter((item) =>
            item.name
              .toLowerCase()
              .includes(this.for_cargo.toLowerCase())
          )
        : "";
    },
    filter_fromcargo(){
      if (this.from_cargo.length > 1) {
        this.ten_visible3 = true;
      }
      return this.from_cargo.length > 1
        ? this.$store.state.cargo_code.cargo_code.filter((item) =>
            item.name
              .toLowerCase()
              .includes(this.from_cargo.toLowerCase())
          )
        : "";
    }
  },
  methods: {
    delete_col(value){
      for(let i in this.data){
       this.data[i][value] = null
      }
    },
    checkCounterpartie(value) {
      this.counterparties = value;
    },
    checkForCargo(value) {
      this.for_cargo = value;
    },
    checkFromCargo(value) {
      this.from_cargo = value;
    },
    deleteRow(index) {
      this.data.splice(index, 1);
      console.log(this.data);
    },
    saveActDate(caller) {
      this.act_date = caller;
    },
    save(type) {
      let data_in = type.target.value.split(" ");
      if (data_in[0] == "") {
        return;
      }
      for (let i in data_in) {
        if (this.data[i] == undefined) {
          let newObj = new MyClass();
          newObj[type.target.id] = data_in[i];
          this.data.push(newObj);
        } else {
          this.data[i][type.target.id] = data_in[i];
        }
      }
      type.target.value = ''
      console.log(this.data);
    },
    sendData() {
      for (let i in this.data) {
        this.data[i].act_date = this.act_date;
        this.data[i].counterparty = this.counterparties;
        this.data[i].from_cargo = this.from_cargo;
        this.data[i].for_cargo = this.for_cargo;
      }
      api.postpps(this.data)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.rent_information_button {
  display: grid;
  gap: 2px;
  grid-template-columns: 0.7fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
.delete_col {
  height: auto;
  font-size: 12px;
  background: transparent;
  color: black;
}
.delete_col:hover {
  font-weight: 500;
}
li {
  cursor: pointer;
}
li:hover {
  font-weight: 600;
}
th {
  position: relative;
}
input {
  border: none;
  width: 100%;
}
.in_data {
  border: 1px solid black !important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.filter {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
}
.col3{
  border: none;
}
</style>
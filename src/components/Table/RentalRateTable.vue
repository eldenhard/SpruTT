<template>
  <div>
    <p class="explanation">
      * Ввод данных по вагонам, датам, дням и ставкам вводить через Enter
      <br />&nbsp;&nbsp;(при копировании из MS Excel, оставить введенные данные
      неизменными)
      <br />
      * Ввод дат осуществлять только в строгом формате <b>21.01.2023</b> (через
      точку). <br />
      &nbsp;&nbsp;<u>Другой формат ввода даты не допускается. </u>
    </p>
    <div class="rent_person">

      <label for="tenant"
        >Арендатор
        <br />
        <input type="text" id="tenant" class="textarea" v-model="tenant" />
      </label>

      <label for="landlord"
        >Арендодатель
        <br />
        <input type="text" id="landlord" class="textarea" v-model="landlord" />
      </label>

      <label for="">
        <br />
        <button class="button textarea" @click="dataCollection()">
          Отправить данные
        </button>
      </label>
    </div>

    <div class="rent_person_answer" style="height: auto">
      <div class="textarea m0p0" style="height: auto" v-show="ten_visible">
        <ul id="root_tenant">
          <li
            v-for="item in filter_tenant"
            :key="item.id"
            @click="checkTenant(item.work_name)"
          >
            <span>{{ item.work_name }}</span>
            <hr />
          </li>
        </ul>
      </div>
      <div class="textarea m0p0" style="height: auto" v-show="land_visible">
        <ul id="root_landlord">
          <li
            v-for="item in filter_landlord"
            :key="item.id"
            @click="checkLanlord(item.work_name)"
          >
            <span>{{ item.work_name }}</span>
            <hr />
          </li>
        </ul>
      </div>
      <div class="textarea" style="background: transparent; border: none"></div>
    </div>
    <div class="rent_information_placeholder">
      <p class="amount">№ вагона</p>
      <p class="amount">Дата начала аренды</p>
      <p class="amount">Дата окончания аренды</p>
      <p class="amount">Кол-во дней</p>
      <p class="amount">Ставка</p>
    </div>
    <div class="rent_information_lenght">
      <p class="amount">Всего: {{ wagon_len }}</p>
      <p class="amount">Всего: {{ start_date_len }}</p>
      <p class="amount">Всего: {{ end_date_len }}</p>
      <p class="amount">Всего: {{ days_amount_len }}</p>
      <p class="amount">Всего: {{ stavka_len }}</p>
    </div>
    <div class="rent_information">
      <textarea name="" id="" cols="10" rows="10" v-model="wagon"></textarea>

      <textarea name="" id="" cols="10" rows="10" v-model="start_date">
      </textarea>

      <textarea name="" id="" cols="10" rows="10" v-model="end_date"></textarea>

      <textarea
        name=""
        id=""
        cols="10"
        rows="10"
        v-model="days_amount"
      ></textarea>

      <textarea name="" id="" cols="10" rows="10" v-model="stavka"></textarea>
    </div>
  </div>
</template>

<script>
import api from "@/api/directory";
import { mapState } from "vuex";
export default {
  name: "rental-rate",
  data() {
    return {
      wagon: "",
      stavka: "",
      start_date: "",
      end_date: "",
      days_amount: "",
      landlord: "",
      tenant: "",

      wagon_arr: [],
      stavka_arr: [],
      start_date_arr: [],
      end_date_arr: [],
      days_amount_arr: [],
      all_length: [],

      wagon_len: "0",
      stavka_len: "0",
      start_date_len: "0",
      end_date_len: "0",
      days_amount_len: "0",

      ten_ans: [],

      ten_visible: false,
      land_visible: false,
    };
  },

  watch: {
    wagon() {
      // console.log(this.wagon[this.wagon.length - 1])
      let wagon_array = this.wagon.split("\n");
      this.wagon_arr = wagon_array.filter((item) => item !== "");
      this.wagon_len = this.wagon_arr.length;
      console.log("вагон");
    },
    stavka() {
      let stavka_arr = this.stavka.split("\n");
      this.stavka_arr = stavka_arr.filter((item) => item !== "");
      this.stavka_len = this.stavka_arr.length;
      console.log("stavka");
    },
    start_date() {
      let start_date_arr = this.start_date.split("\n");
      this.start_date_arr = start_date_arr.filter((item) => item !== "");
      this.start_date_len = this.start_date_arr.length;
      console.log("start_date");
    },
    end_date() {
      let end_date_arr = this.end_date.split("\n");
      this.end_date_arr = end_date_arr.filter((item) => item !== "");
      this.end_date_len = this.end_date_arr.length;
      console.log("end_date");
    },
    days_amount() {
      let days_amount_arr = this.days_amount.split("\n");
      this.days_amount_arr = days_amount_arr.filter((item) => item !== "");
      this.days_amount_len = this.days_amount_arr.length;
      console.log("days_amount");
    },
  },
  computed: {
     filter_tenant() {
      if(this.tenant.length > 1) {
        this.ten_visible = true
      }
      
      return this.tenant.length > 1
        ? this.$store.state.counterparties.counterparties.filter((i) =>
            i.work_name.includes(this.tenant)
          )
        : "";
    },
    filter_landlord() {
      if(this.landlord.length > 1) {
        this.land_visible = true
      }
      return this.landlord.length > 1
        ? this.$store.state.counterparties.counterparties.filter((i) =>
            i.work_name.includes(this.landlord)
          )
        : "";
    },
  },
  methods: {
    checkTenant(value) {
      this.tenant = value;
      this.ten_visible = false
      // document.getElementById('root_tenant').innerHTML = ''
    },
    checkLanlord(value) {
      this.landlord = value;
      this.land_visible = false
      // document.getElementById('root_landlord').innerHTML = ''
    },
    helper(a) {
      return [...new Set(a)].length == 1;
    },
    dataCollection() {
      let wagon = [];
      this.wagon_arr.forEach((item) => {
        wagon.push({
          wagon: item,
        });
      });

      let stavka = [];
      this.stavka_arr.forEach((item) => {
        stavka.push({
          stavka: item,
        });
      });

      let start_date = [];
      this.start_date_arr.forEach((item) => {
        start_date.push({
          start_date: item.replace(/\./g, "-").split("-").reverse("").join("-"),
        });
      });
      console.log(start_date);

      let end_date = [];
      this.end_date_arr.forEach((item) => {
        end_date.push({
          end_date: item.replace(/\./g, "-").split("-").reverse("").join("-"),
        });
      });

      let days_amount = [];
      this.days_amount_arr.forEach((item) => {
        days_amount.push({
          days_amount: item,
        });
      });
      let tenant = [];
      tenant.push({
        tenant: this.tenant,
      });
      let landlord = [];
      landlord.push({
        landlord: this.landlord,
      });
      this.all_length.push(
        this.wagon_len,
        this.stavka_len,
        this.start_date_len,
        this.end_date_len,
        this.days_amount_len
      );

      if (this.helper(this.all_length) == true) {
        let all_array = wagon.map((item, index) => ({
          tenant,
          landlord,
          ...item,
          ...tenant[index],
          ...landlord[index],
          ...stavka[index],
          ...start_date[index],
          ...end_date[index],
          ...days_amount[index],
        }));
        // console.log(all_array)
 
        api.postSaveMany(all_array)
        .then(response => {
          console.log(response)
        });
      } else {
        console.log("выкинь ошибку");
      }
      this.all_length = [];
    },
  },
};
</script>

<style scoped>
li {
  cursor: pointer;
  list-style-type: none;
  width: 100%;
  margin: 0;
  padding: 0 0 0 0;
}
li > span {
  padding-left: 5%;
  text-align: center;
}
ul {
  margin: 0;
  padding: 0;
}
.m0p0 {
  padding: 0;
}

li:hover {
  background: lightgrey;
}
.button {
  float: right;
  background: #18842a !important;
}
.explanation {
  font-size: 13px;
  color: grey;
  text-align: left;
  padding: 0 0 2% 0%;
}
.rent_person {
  display: flex;
  justify-content: space-between;
}
.rent_person_answer {
  display: flex;
  justify-content: space-between;
}
.rent_information {
  display: grid;
  gap: 2%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.rent_information_lenght {
  display: grid;
  gap: 2%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.rent_information_placeholder {
  margin-top: 7%;
  display: grid;
  gap: 2%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>
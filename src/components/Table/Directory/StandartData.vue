<template>
  <div style="margin-top: 5% !important">
    <Loader :loader="loader" />
    <div class="air_block">
      <div class="air_block_header">
        <h5>Данные по нормативам</h5>
        <hr />
      </div>
      <br />
      <div class="row-column">
        <div class="label-col">
          <span>Договор</span>
          <span :class="{ errorNote: isError }"> Дата договоренности</span>
          <span> Актуальность</span>
          <span> ДС </span>
          <span> Примечание </span>
          <span :class="{ errorNote: isError }"> Норматив по выгрузке, дн</span>
          <span :class="{ errorNote: isError3 }">
            Норматив на погрузке, дн
          </span>
          <span :class="{ errorNote: isError2 }"> Штраф по выгрузке, руб </span>
          <span :class="{ errorNote: isError1 }"> Штраф на погрузке, руб </span>
          <span> Примечание по расчету </span>
          <span> Тип вагона </span>
          <span> Клиент </span>
        </div>
        <div class="label-col2">
          <input type="text" class="textarea" v-model="Standard.agreement" placeholder="№ договора"/>
          <input type="date"  class="textarea" v-model="Standard.agreement_date"/>
          <input type="checkbox" name="" class="textarea" id="" v-model="Standard.is_actual">
          <input type="text" class="textarea" v-model="Standard.agreement_addictions"  placeholder="№ ДС"/>
          <input type="text" class="textarea" v-model="Standard.note"  placeholder="Примечание"/>
          <input type="number" class="textarea" v-model="Standard.standard_unloading"  placeholder="Норматив в днях"/>
          <input type="number" class="textarea" v-model="Standard.standard_loading" placeholder="Норматив в днях"/>
          <input type="number" class="textarea" v-model="Standard.penalty_unloading" placeholder="Штраф в руб"/>
          <input type="number" class="textarea" v-model="Standard.penalty_loading" placeholder="Штраф в руб"/>
          <input type="text" class="textarea" v-model="Standard.note_calc" placeholder="Примечание"/>
          <select v-model="Standard.wagon_type" class="textarea" :placeholder="'выберите тип вагона'">
            <option :value="'Полувагон'">ПВ</option>
            <option :value="'Цистерна'">ЦС</option>
          </select>
          <input type="text" class="textarea" v-model="Standard.client" placeholder="Введите наименование клиента" />
          <br>
        <br>
        </div>
      
        <!-- <label for="" >
            <span>Договор</span> 
            <input type="text" class="textarea" v-model="Standard.agreement" />
          </label>

          <label for="">
            <span :class="{errorNote: isError}"> Дата договоренности</span> 
            <input
              type="date"
              class="textarea"
              v-model="Standard.agreement_date"
            />
          </label>

          <label for="">
            <span> Актуальность</span> 
            <input type="checkbox" name="" id="" v-model="Standard.is_actual">
   
          </label>

          <label for="">
            <span> ДС </span>
            <input
              type="text"
              class="textarea"
              v-model="Standard.agreement_addictions"
            />
          </label>

          <label for="">
            <span> Примечание </span>
            <input type="text" class="textarea" v-model="Standard.note" />
          </label>

          <label for="">
            <span :class="{errorNote: isError}">  Норматив по выгрузке, дн</span> 
            <input
              type="number"
              class="textarea"
              v-model="Standard.standard_unloading"
            />
          </label>
          <label for="">
            <span :class="{errorNote: isError1}">  Штраф на погрузке, руб </span>
            <input
              type="number"
              class="textarea"
              v-model="Standard.penalty_loading"
            />
          </label>
          <label for="">
            <span :class="{errorNote: isError2}">  Штраф по выгрузке, руб </span>
            <input
              type="number"
              class="textarea"
              v-model="Standard.penalty_unloading"
            />
          </label>

          <label for="">
            <span :class="{errorNote: isError3}">  Норматив на погрузке, дн </span>
            <input
              type="number"
              class="textarea"
              v-model="Standard.standard_loading"
            />
          </label>
          <label for="">
            <span>  Примечание по расчету </span>
            <input type="text" class="textarea" v-model="Standard.note_calc" />
          </label>
     
          <label for="">
            <span>  Клиент </span>
            <input type="text" class="textarea" v-model="Standard.client" />
          </label>
          <label for="">
            <span> Тип вагона </span>
            <select v-model="Standard.wagon_type" class="textarea" style="width: 80%">
              <option :value="'Полувагон'">ПВ</option>
              <option :value="'Цистерна'">ЦС</option>
            </select>
          </label> -->
      </div>

      <!-- <div
            class="textarea"
            style="height: auto; width: 100%; min-height: 1px;"
            v-show="ten_visible"
          >
            <ul id="root_tenant">
              <li
                v-for="item in filter_client"
                :key="item.id"
                @click="chechClient(item.work_name)"
              >
                <span>{{ item.work_name }}</span>
                <hr />
              </li>
            </ul>
          </div>
         
    
        <button class="button Accept" @click="postData(Standard)">
            Отправить данные
          </button> -->
    </div>
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
    />
  </div>
</template>

<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  name: "StandartData",
  components: { Loader, Notifications },
  data() {
    return {
      rows: 1,
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      ten_visible: false,
      isError: false,

      Standard: {
        agreement: "",
        agreement_date: "",
        is_actual: true,
        agreement_addictions: "",
        note: "",
        standard_loading: "",
        standard_unloading: "",
        penalty_loading: "",
        penalty_unloading: "",
        note_calc: "",
        client: "",
        wagon_type: "",
      },
    };
  },
  computed: {
    filter_client() {
      if (this.Standard.client.length > 1) {
        this.ten_visible = true;
      }
      return this.Standard.client.length > 1
        ? this.$store.state.counterparties.counterparties.filter((item) =>
            item.work_name
              .toLowerCase()
              .includes(this.Standard.client.toLowerCase())
          )
        : "";
    },
  },
  methods: {
    chechClient(item) {
      this.Standard.client = item;
      this.ten_visible = false;
    },
    postData(arr) {
      if (this.Standard.agreement_date == "") {
        this.isError = true;
      }
      if (this.Standard.penalty_loading == "") {
        this.isError = true;
      }
      if (this.Standard.penalty_unloading == "") {
        this.isError = true;
      }
      if (this.Standard.standard_loading == "") {
        this.isError = true;
      }
      if (this.Standard.standard_unloading == "") {
        this.isError = true;
      } else {
        api
          .postPenaltyStandards(arr)
          .then((response) => {
            this.notifyHead = "Успешно";
            this.notifyMessage = "Данные отправлены";
            this.notifyClass = "wrapper-success";
            this.showNotify = true;
            setTimeout(() => (this.showNotify = false), 2000);
          })
          .catch((error) => {
            this.notifyHead = "Ошибка";
            this.notifyMessage = error.response.data;
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            setTimeout(() => (this.showNotify = false), 3000);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row-column {
  display: flex;
  justify-content: flex-start;
  position: relative;
  left: -5%;
  // background: #cfcfcf;
  // width: 80%;
  // left: 5%;
  // transform: translate(5%, 0);
}
.label-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // border: 1px solid black;
  padding-left: 10%;
  span{
    margin-top: 11%;
    font-family: 'Montserrat', sans-serif;
    color: rgb(61, 61, 61);
    font-weight: 500;
  }
}
.label-col2 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  // border: 1px solid black;
  margin: 0;
  margin-right: auto !important;
  justify-content: flex-start !important;
  padding-right: 55%;
  input{
    margin-top: 5%;
  
  }
  select{
    margin-top: 5%;
  }
}
input[type=checkbox]{
  width: 25px;
  height: 25px
}
.errorNote {
  color: red;
}
select {
  border: none;
}
.Accept {
  margin-left: auto;
  width: 25%;
}

.air_block {
  width: 100%;
  height: auto;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.air_block_header > h5 {
  padding: 1% 0 0 2%;
  color: rgb(202, 202, 202);
}

input,
select {
  margin-left: 25%;
}

li {
  cursor: pointer;
}
input, select {
  height: 30px;
  width: 100%;
  border: none;
}
</style>
<template>
    <div>
  <!-- <b-button id="show-btn" @click="$bvModal.show("bv-modal-example")">Open Modal</b-button> -->

  <b-modal id="bv-modal-example" hide-footer size="lg">
    <template #modal-title>
     Добавление договора
    </template>


    
    
<form  v-on:submit="createReport" >

    <div class="d-block text-center">
      <div  style="display: flex; justify-content: space-around;">
        <label for="">Номер договора <br>
          <input type="text" class="textarea" name="number"  v-model="Documents.number">
        </label>
        <label for="">Статус ТТ по договору <br>
          <input type="text" class="textarea" name="company_status" v-model="Documents.company_status">
        </label>
        <label for="">Дата заключения <br>
          <input type="date" class="textarea" name="created_at" v-model="Documents.created_at">
        </label>
      </div>

      <div  style="display: flex; justify-content: space-around;">
        <label for="">Подразделение инициатора <br>
          <input type="text" class="textarea" name="department" v-model="Documents.department">
        </label>
        <label for="">Вид договора  <br>
          <input type="text" class="textarea" name="contract_type" v-model="Documents.contract_type">
        </label>
        <label for="">Предмет договора <br>
          <input type="text" class="textarea" name="contract_object" v-model="Documents.contract_object">
        </label>
      </div>
      <div  style="display: flex; justify-content: space-around;">
        <label for="">Сумма договора  <br>
          <input type="text" class="textarea" name="fiat_amount" v-model="Documents.fiat_amount">
        </label>
        <label for="">Срок действия договора  <br>
          <input type="text" class="textarea" name="expiration_date" v-model="Documents.expiration_date">
        </label>
        <label for="">Пролонгация <br>
          <select type="text" name="prolongation"  v-model="Documents.prolongation">
            <option disabled>Пролонгация</option>
            <option value="true">Да</option>
            <option value="false">Нет</option>

            </select>
        </label>
      </div>
<div  style="display: flex; justify-content: space-around;">
        <label for="">Статус <br>
          <select type="text"  v-model="Documents.is_active">
              <option disabled>Активность</option>
              <option value="true">Активный</option>
              <option value="false">Неактивный</option>
            </select>
        </label>
        <!-- ДОБАВИТЬ ПЕРЕДАЧУ ДАННЫХ ФАЙЛА -->
        <label for="">Скан-копия  <br>
          <input type="file" ref="file"  class="textarea" name="scan"  style="background: transparent; border: none !important; padding: none;"/>
        </label>
        <label for="">Категория <br>
          <select type="text"  v-model="Documents.category">
            <option value="economic">Общехозяйственные</option>
            <option value="repair">Ремонтные</option>
            <option value="buyer">С покупателем</option>
            <option value="financial">Финансовые</option>
            <option value="other">Дургие</option>

            </select>
        </label>
      </div>
<div  style="display: flex; justify-content: space-around;">

      <label for="">Контрагент<br>
        <div class="inputcontainer">
            <input class="textarea" v-model="user_counterparty" v-on:input="debouncedHandler" 
            style=" background: white; border: 1px solid grey !important; position: relative; box-sizing: border-box;" />
            <input type="text" style="display: none" name="counterparty" v-model="Documents.counterparty">
            <div class="icon-container" v-if="loaderInputDep">
              <i class="loader"></i>
            </div>
        </div>
      </label>

      <div class="dataDeparture" v-if="variants">
        <ul>
          <li v-for="counterparty in counterparties" :key="counterparty.id" 
          @click="checkCounterparty(counterparty.work_name, counterparty.id)"
        >
            {{ counterparty.work_name }}
          </li>
        </ul>
      </div>
 </div>

    </div>
  <div style="display: flex; justify-content: space-around; margin-top: 9%;">
    <button  type="submit" style="width: 15%" class="button Accept"  @click="createReport()">Создать</button><br>
    <button style="width: 15%" class="button Delete"  block variant="danger" @click="$bvModal.hide('bv-modal-example')">Закрыть</button>
  </div>
</form>

<annexes :ContractAnnexes="ContractAnnexes"></annexes>
  


  </b-modal>
  <Notifications
        :show="showNotify"
        :header="notifyHead"
        :message="notifyMessage"
        :block-class="notifyClass"
        id="notif"
      />
</div>
</template>
<style scoped>

ul {
  width: 100%;
  padding: 0 !important;
}
li {
  border: 1px solid lightgrey;
  list-style-type: none;
  cursor: pointer;
  width: 100%;
}
li:hover {
  background: white;
  color: black;
  border: 1px solid rgb(143, 143, 143);
}
.dataDeparture {
  width: 20%;
  height: 90px;
  overflow: auto;
  border: 1px solid grey;
  position: absolute;
  left: 50%;
  border-top: none;
  background: rgb(245, 245, 245);
  transform: translate(-50%, 0);
  /* z-index: 10; */
  margin-top: 4%;
}
.inputcontainer {
  position: relative;
}

.icon-container {
  position: absolute;
  right: 15px;
  top: calc(50% - 10px);
}
.loader {
  position: relative;
  z-index: 1000000000000000000000;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

.loader::after, .loader::before {
  content: "";
  background: white;
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #646464 #646464 transparent transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  right: 0;
  animation: around 0.7s ease-in-out infinite;
}

.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}


.textarea{
  background: transparent;
  height: 30px;
  border: #bdc3c7 0.1rem solid !important;
  color: black
}
label{
  color:grey;
  font-size: 1.1rem;
  float: left;
  text-align: left;
}
.mt-3{
  float: right;
  width:10%
}
select{
  /* background: white; */
  position: relative;
  border-radius: 0.4rem;
  background-color: #efefef;
  border: #bdc3c7 0.1rem solid;
  width: 20rem;
  height: 30px;
  padding: 0rem 1rem;

}
</style>
<script>
import { getGroupName } from "@/helpers/getGroupName";
import { mapState } from "vuex";
import groups from "@/helpers/groups";
import api from "@/api/report"
import annexes from "./Annexes.vue"
import debounce from "lodash.debounce";
import apiCounter from "@/api/counterparties"
import Notifications from "@/components/notifications/Notifications.vue";

export default{
  components: {annexes, Notifications},
  data(){
    return{
      groups: groups.groups,
      formData: {},
      ContractAnnexes: [],
      nextTodoId:0,
      loaderInputDep: false,
      variants: false,
      counterparties: '',
      user_counterparty: '',

      Documents: {
        number:"",
        company_status: "",
        created_at: "",
        department: "",
        contract_type: "",
        contract_object: "",
        fiat_amount: "",
        expiration_date: "",
        prolongation: "",
        is_active : "",
        counterparty: "",
      },

      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      }  
  },
    props: ["modal"],
    computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      allGroups: (state) => state.auth.groups,
      staffGlobal: (state) => state.auth.users,
    }),

  },
  methods: {
    checkCounterparty(data_name, data_id) {
      this.user_counterparty = data_name
      this.Documents.counterparty = data_id
      this.variants = false
    },
    getGroupName(id) {
      const group = getGroupName(this.allGroups, id);
      return group[0]?.name;
    },

    getGroupName(group) {
      // console.log(groups)
      return groups.groups[group] ;
    },
    createReport(e){
      e.preventDefault();
      let data = new FormData(e.target);
      api.createDocument(data)
      .then(response => {
        this.notifyHead = "Успешно";
        this.notifyMessage = "Договор составлен";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
      }).catch(error => {
        this.notifyHead = "Ошибка";
        this.notifyMessage = error.response.data;
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
      })
    },

   
  },
  created() {
    this.debouncedHandler = debounce(event => {
      this.loaderInputDep = true
      apiCounter.getAllcounterpartie(event.target.value)
      .then(response => {
        this.counterparties = response.data.data
        this.loaderInputDep = false
        this.variants = true
      }).catch(error => {
        this.loaderInputDep = false
      })
    }, 500);
  },
  beforeUnmount() {
    this.debouncedHandler.cancel();
  }
}
</script>
<template>
    <div>
      <Loader :loader="loader" />
  <!-- <b-button id="show-btn" @click="$bvModal.show("bv-modal-example")">Open Modal</b-button> -->

  <b-modal :id="id" ref="example-contract" size="md" hide-footer >
    <template #modal-title>
     Редактирование договора № {{ contract }}
    </template>


    
    
<form   v-on:submit="createReport">

    <div class="d-block text-center">
      <div  style="display: flex; justify-content: space-around;">
        <label for="">Номер договора <br>
          <input type="text" class="textarea" name="number"  v-model="contract_data.number" readonly>
        </label>
        <label for="">Статус ТТ по договору <br>
          <input type="text" class="textarea" name="company_status" v-model="contract_data.company_status">
        </label>
        <label for="">Дата заключения <br>
          <input type="date" class="textarea" name="created_at" v-model="contract_data.created_at">
        </label>
      </div>

      <div  style="display: flex; justify-content: space-around;">
        <label for="">Подразделение инициатора <br>
          <input type="text" class="textarea" name="department" v-model="contract_data.department">
        </label>
        <label for="">Вид договора  <br>
          <input type="text" class="textarea" name="contract_type" v-model="contract_data.contract_type">
        </label>
        <label for="">Предмет договора <br>
          <input type="text" class="textarea" name="contract_object" v-model="contract_data.contract_object">
        </label>
      </div>
      <div  style="display: flex; justify-content: space-around;">
        <label for="">Сумма договора  <br>
          <input type="text" class="textarea" name="fiat_amount" v-model="contract_data.fiat_amount">
        </label>
        <label for="">Срок действия договора  <br>
          <input type="text" class="textarea" name="expiration_date" v-model="contract_data.expiration_date">
        </label>
        <label for="">Пролонгация <br>
          <select type="text" name="prolongation"  v-model="contract_data.prolongation">
            <option disabled>Пролонгация</option>
            <option value="true">Да</option>
            <option value="false">Нет</option>

            </select>
        </label>
      </div>
<div  style="display: flex; justify-content: space-around;">
        <label for="">Статус <br>
          <select type="text"  v-model="contract_data.is_active">
              <option disabled>Активность</option>
              <option value="true">Активный</option>
              <option value="false">Неактивный</option>
            </select>
        </label>
        <!-- ДОБАВИТЬ ПЕРЕДАЧУ ДАННЫХ ФАЙЛА -->
        <label for="">Скан-копия  <br>
        <div style="position: relative">
          <button type="button" class="Accept textarea" style="background: green; color: white;" >{{ contract_data.scan ? 'Заменить' : 'Добавить' }}</button>
          <input type="file" ref="scan" name="scan" :class="{'displayNone': isdisplayNone}" @change="ReadFile()">
        </div>
        {{ pre_scan.name }}  
      </label>
       
        <label for="">Категория <br>
          <select type="text"  v-model="contract_data.category">
            <option value="economic">Общехозяйственные</option>
            <option value="repair">Ремонтные</option>
            <option value="buyer">С покупателем</option>
            <option value="financial">Финансовые</option>
            <option value="other">Другие</option>

            </select>
        </label>
      </div>
<div class="my-flex-cont"  style="display: flex; justify-content: space-evenly;">
<div  >
  <label for="">Контрагент<br>
        <div class="inputcontainer">
            <input class="textarea" :placeholder="Counterparties" v-model="user_counterparty" v-on:input="debouncedHandler" 
            style=" background: white; border: 1px solid grey !important; position: relative; box-sizing: border-box;" />
            <input type="text" style="display: none" name="counterparty" v-model="contract_data.counterparty">
            <div class="icon-container" v-if="loaderInputDep">
              <i class="loader"></i>
            </div>
        </div>
      </label>
      <div class="dataDeparture" v-if="variants"  style="margin-left: 16%;">
        <ul>
          <li v-for="counterparty in counterparties" :key="counterparty.id" 
          @click="checkCounterparty(counterparty.work_name, counterparty.id)">
            {{ counterparty.work_name }}
          </li>
        </ul>
      </div>
</div>

      
<div    >
  <label for="">Ответственный<br>
  <div class="inputcontainer">
      <input class="textarea"  :placeholder="Users" v-model="responsible" v-on:input="debouncedHandler2" 
      style=" background: white; border: 1px solid grey !important; position: relative; box-sizing: border-box;" />
      <input type="text" style="display: none" name="responsible" v-model="contract_data.responsible">
      <div class="icon-container" v-if="loaderInputDep2">
        <i class="loader"></i>
      </div>
  </div>
</label>
<!-- @click="checkUser(user.last_name, user.id)" -->
  <div class="dataDeparture" v-if="variantsUser2" style="margin-left: 16%;">
    <ul>
      <li v-for="user in all_user" :key="user.id" 
      @click="checkUser(user.last_name, user.id)"
>
        {{ user.last_name }} {{ user.first_name }}


      </li>
    </ul>
  </div>
 </div>
</div>
      




    </div>
<div style="display: flex; justify-content: space-around; margin-top: 7%;">
    <button  type="submit" style="width: 15%" class="button Accept">Редактировать</button><br>
    <a style="width: 15%; height: 25px; text-decoration: none; color: white !important; outline: none; border: none !important;" class="button Delete"
      block variant="danger" @click="hideModal">Закрыть</a>
  </div>
</form>

  


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
.displayNone{
  display: inline-block;
  position: absolute; 
  top: 0%; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  width: 100%; 
  height: 100%; 
  opacity: 0;
}
.my-flex-cont {
 display: flex;
 justify-content: space-around;

}
a:hover{
  outline: none !important;
  border-bottom: none !important;
}
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
  width: 32%;
  height: auto;
  max-height: 90px;
  overflow: auto;
  border: 1px solid grey;
  position: absolute;
  /* left: 25%; */
  border-top: none;
  background: rgb(245, 245, 245);
  transform: translate(-50%, 0);
  /* z-index: 10; */
  margin-top: 6%;
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
import groups from "@/helpers/groups";
import debounce from "lodash.debounce";
import apiCounter from "@/api/counterparties"
import Notifications from "@/components/notifications/Notifications.vue";
import { getUserById } from "@/helpers/getAllUsers";
import api from "@/api/report"
import Loader from "@/components/loader/loader.vue";
export default {
    name: 'editContract',
    props: ['contract', 'contract_data', 'id', 'btnClickHandler'],
    components: { Notifications, Loader },

    data(){
        return{
      isdisplayNone: true,
      loader: false,
      ContractAnnexes: [],
      loaderInputDep: false,
      loaderInputDep2: false,
      variants: false,
      variantsUser: false,
      variantsUser2: false,

      counterparties: '',
      all_user: '',
      user_counterparty: '',
      responsible: '',
      users: [],
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      pre_scan: "",
        }
    },
    mounted(){
    this.users = this.$store.state.users.users
    },

    methods: {
        hideModal() {
        this.$refs['example-contract'].hide()
      },
      ReadFile(){
        this.pre_scan = this.$refs.scan.files[0];
      },
      createReport(e){
      this.loader = true
      if (e && e.preventDefault) { e.preventDefault(); }
      let data_inform = new FormData(e.target);
      api.putContract(this.contract_data.id, data_inform)
      .then(response => {
        this.hideModal()
        this.loader = false
        this.btnClickHandler()
        this.notifyHead = "Успешно";
        this.notifyMessage = "Договор составлен";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
        
      }).catch(error => {
        this.loader = false
        this.notifyHead = "Ошибка";
        this.notifyMessage = Object.values(error.response?.data);
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
      })
    },
    ChangeIdCounterByName(id){
      let count_data = this.$store.state.counterparties.counterparties
      const counterpart = getUserById(count_data, id)
     if (counterpart[0]) {
        return counterpart[0]?.work_name;
      }
      return "";
    },
    checkCounterparty(data_name, data_id) {
      this.user_counterparty = data_name
      this.contract_data.counterparty = data_id
      this.variants = false
    },
    checkUser(data_name, data_id) {
      this.responsible = data_name
      this.contract_data.responsible = data_id
      // console.log( this.contract_data.responsible)
      this.variantsUser2 = false
    },
    getGroupName(id) {
      const group = getGroupName(this.allGroups, id);
      return group[0]?.name;
    },
    getGroupName(group) {
      // console.log(groups)
      return groups.groups[group] ;
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
    this.debouncedHandler2 = debounce(event => {
      this.loaderInputDep2 = true
      apiCounter.getAllUser(event.target.value)
      .then(response => {
        this.all_user = response.data.data
        this.loaderInputDep2 = false
        this.variantsUser2 = true
      }).catch(error => {
        this.loaderInputDep2 = false
      })
    }, 500);
  },
  computed: {
    Counterparties(){
     return this.ChangeIdCounterByName(this.contract_data.counterparty)
    },
    Users(){
    const users = getUserById(this.users, this.contract_data.responsible)
     if (users[0]) {
        return users[0]?.last_name + " " + users[0]?.first_name[0] + ".";
      }
      return "";
    }
  },

  beforeUnmount() {
    this.debouncedHandler.cancel();
    this.debouncedHandler2.cancel();
  }
}
</script>
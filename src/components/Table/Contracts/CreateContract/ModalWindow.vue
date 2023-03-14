<template>
    <div>
  <!-- <b-button id="show-btn" @click="$bvModal.show("bv-modal-example")">Open Modal</b-button> -->

  <b-modal id="bv-modal-example" hide-footer size="lg">
    <template #modal-title>
     Добавление договора
    </template>


    
    
<form  v-on:submit="createReport">

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
          <input type="text" class="textarea"  name="counterparty" v-model="Documents.counterparty">
      </label>

 </div>
 
 
    </div>
  <div style="display: flex; justify-content: space-around; margin-top: 3%;">
    <button  type="submit" style="width: 15%" class="button Accept"  @click="createReport()">Создать</button><br>
    <button style="width: 15%" class="button Delete"  block variant="danger" @click="$bvModal.hide('bv-modal-example')">Закрыть</button>
  </div>
</form>

<annexes :ContractAnnexes="ContractAnnexes"></annexes>
  


  </b-modal>
</div>
</template>
<style scoped>
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
export default{
  components: {annexes},
  data(){
    return{
      groups: groups.groups,
      formData: {},
      ContractAnnexes: [],
      nextTodoId:0,
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
      } 
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
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

   
  }
}
</script>
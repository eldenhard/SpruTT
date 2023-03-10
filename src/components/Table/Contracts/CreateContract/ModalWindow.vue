<template>
    <div>
  <!-- <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Open Modal</b-button> -->

  <b-modal id="bv-modal-example" hide-footer size="lg">
    <template #modal-title>
     Добавление договора
    </template>


    
    
<h4>Договор</h4>
    <div class="d-block text-center">
      <div  style="display: flex; justify-content: space-around;">
        <label for="">Номер договора <br>
          <input type="text" class="textarea" v-model="Documents.number">
        </label>
        <label for="">Статус ТТ по договору <br>
          <input type="text" class="textarea" v-model="Documents.company_status">
        </label>
        <label for="">Дата заключения <br>
          <input type="date" class="textarea" v-model="Documents.created_at">
        </label>
      </div>

      <div  style="display: flex; justify-content: space-around;">
        <label for="">Подразделение инициатора <br>
          <input type="text" class="textarea" v-model="Documents.department">
        </label>
        <label for="">Вид договора  <br>
          <input type="text" class="textarea" v-model="Documents.contract_type">
        </label>
        <label for="">Предмет договора <br>
          <input type="text" class="textarea" v-model="Documents.contract_object">
        </label>
      </div>
      <div  style="display: flex; justify-content: space-around;">
        <label for="">Сумма договора  <br>
          <input type="text" class="textarea" v-model="Documents.fiat_amount">
        </label>
        <label for="">Срок действия договора  <br>
          <input type="text" class="textarea" v-model="Documents.expiration_date">
        </label>
        <label for="">Пролонгация <br>
          <select type="text" class="textarea" v-model="Documents.prolongation">
            <option disabled>Пролонгация</option>
            <option value="true">Да</option>
            <option value="false">Нет</option>

            </select>
        </label>
      </div>
<div  style="display: flex; justify-content: space-around;">
        <label for="">Статус <br>
          <select type="text" class="textarea" v-model="Documents.is_active">
              <option disabled>Активность</option>
              <option value="true">Активный</option>
              <option value="false">Неактивный</option>
            </select>
        </label>
        <!-- ДОБАВИТЬ ПЕРЕДАЧУ ДАННЫХ ФАЙЛА -->
        <label for="">Скан-копия  <br>
          <input type="file" class="textarea"  style="background: transparent; border: none; padding: none;">
        </label>
        <label for="">Категория <br>
          <select type="text" class="textarea" v-model="Documents.category">
            <option value="economic">Общехозяйственные</option>
            <option value="repair">Ремонтные</option>
            <option value="buyer">С покупателем</option>
            <option value="financial">Финансовые</option>
            <option value="other">Дургие</option>

            </select>
        </label>
      </div>
<!-- counterarty -->
<div  style="display: flex; justify-content: space-around;">
        <label for="">Дата создания  <br>
          <input type="date" class="textarea" v-model="Documents.counterparty.created_at">
        </label>
        <label for="">Рабочее наименование  <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.work_name">
        </label>
        <label for="">Краткое наименование <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.short_name">
        </label>
      </div>
<div  style="display: flex; justify-content: space-around;">
        <label for="">Полное наименование <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.full_name">
        </label>
        <label for="">ЕЛС <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.els">
        </label>
        <label for="">ОГРН/ЕГРПОУ/БИН  <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.ogrn">
        </label>
      </div>
<div  style="display: flex; justify-content: space-around;">
        <label for="">ИНН/РНН  <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.inn">
        </label>
        <label for="">КПП/№ Св-ва НДС  <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.kpp">
        </label>
        <label for="">Юридический адрес <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.legal_address">
        </label>
      </div>
<div  style="display: flex; justify-content: space-around;">
        <label for="">Руководитель <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.manager">
        </label>
        <label for="">Телефон <br>
          <input type="text" class="textarea" v-model="Documents.counterparty.phone">
        </label>
        <label for="">Группа  <br>
          <select type="text" class="textarea" v-model="Documents.counterparty.group">
            <option value="" disabled>Выберите группу</option>
            <option :value="g[0]" v-for="g in Object.entries(groups)" :key="g[0]">
                {{ g[1] }}
              </option>
            </select>
        </label>
      </div>

</div>
<!-- <label for="text" v-for="(guest, index) in ContractAnnexes" :key="guest.id">Гость: {{ index }} <br>
                <input type="text" v-model="ContractAnnexes[index]">
            </label> -->

<div class="d-block text-center"  v-for="(guest, index) in ContractAnnexes" :key="guest.id" style="margin-top: 3%;">
  <h4>Приложение {{ index+1 }}</h4>
      <div  style="display: flex; justify-content: space-around;">
        <label for="">Тип приложения <br>
          <input type="text" class="textarea" v-model="Documents.annexes.ContractAnnexes.doc_type">
        </label>
        <label for="">Номер приложения <br>
          <input type="text" class="textarea" v-model="Documents.annexes.ContractAnnexes.number">
        </label>
        <label for="">Дата <br>
          <input type="date" class="textarea" v-model="Documents.annexes.ContractAnnexes.created_at">
        </label>
      </div>

      <div  style="display: flex; justify-content: space-around;">
        <label for="">Примечание<br>
          <input type="text" class="textarea" v-model="Documents.annexes.ContractAnnexes.comment">
        </label>
        <label for="">Скан-копия  <br>
          <input type="text" class="textarea" v-model="Documents.annexes.ContractAnnexes.scan">
        </label>
        <label for="">Номер договора <br>
          <input type="text" class="textarea" v-model="Documents.annexes.ContractAnnexes.contract">
        </label>
      </div>
     <div style="display: flex; justify-content: space-between; margin-top: 2%;">
      <button style="width: 15%" class="button Delete" @click="DeleteContractAnnexes(index)">Удалить приложение</button>
      <button style="width: 15%" class="button Cancel" @click="AddContractAnnexes()">Добавить приложение</button>

     </div>
     <hr>
  </div>  
  <b-button  @click="AddContractAnnexes()" v-if="ContractAnnexes.length == 0">Добавить приложение к договору</b-button><br>
         
<b-button class="mt-3" @click="createReport()">Создать</b-button><br>
<b-button class="mt-3" block variant="danger" @click="$bvModal.hide('bv-modal-example')">Закрыть</b-button>
  </b-modal>
</div>
</template>
<style scoped>
.textarea{
  background: white;
  height: 30px;
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
</style>
<script>
import { getGroupName } from "@/helpers/getGroupName";
import { mapState } from "vuex";
import groups from "@/helpers/groups";
import api from '@/api/report'
export default{
  data(){
    return{
      groups: groups.groups,
      ContractAnnexes: [],
      Documents: {
        annexes: {
          ContractAnnexes: {
            doc_type: '',
            number: '',
            comment: '',
            scan: '',
            contract: ''
          }
        },
        number:'',
        company_status: '',
        created_at: '',
        department: '',
        contract_type: '',
        contract_object: '',
        fiat_amount: '',
        expiration_date: '',
        prolongation: '',
        is_active : '',
            counterparty: {
              created_at: '',
              work_name: '',
              short_name: '',
              full_name: '',
              els: '',
              ogrn: '',
              inn: '',
              kpp: '',
              legal_address: '',
              manager: '',
              phone: '',
              group: '',
            }
         } 
      }  
  },
    props: ['modal'],
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
    createReport(){
      api.createDocument(this.Documents)
      .then(response => {
        console.log(response.data)
      })
    },
    AddContractAnnexes(){
      this.ContractAnnexes.push('')
      console.log(this.Documents.annexes.ContractAnnexes)
    },
    DeleteContractAnnexes(index){
      this.Documents.annexes.ContractAnnexes.splice(index,1)
    }
  }
}
</script>
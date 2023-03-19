<template>
  <div>
    <FilterFarms @updateFilterDataFarms="updateFilterDataFarms"></FilterFarms>
    <ModalContractCreate :id="CurrentPathApi"/>
    <Annexes :contract="contract_number" :btnClickHandler="getFarmContract"/>
    <EditAnnexe :contract="contract_number" :annex="editAnnexe" :btnClickHandler="getFarmContract"/>
    <EditContract :contract="contract_number" :contract_data="editContract"/>
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
      id="notif"
    />
    <Loader :loader="loader"></Loader>
    <button
      class="Accept"
      @click="getFarmContract()"
      style="width: 100%;position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
    >
   
      Запросить договора
    </button>
    <br /><br />
    <p class="amount">всего записей: {{ total_objects }}</p>
    <p class="amount">всего на странице: {{ amount }}</p>
    <button
      class="Cancel"
      style="border-top-left-radius: 10px; border-top-right-radius: 10px" @click="CreateContract()">
      Добавить договор
    </button>


    <div
      style="
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        max-height: 70vh;
      "
    >
      <table
        class="table table-sm table-bordered table-hover" id="table"
        style="margin: 0; border: 1px solid black">
        <thead class="thead-light" style="background: #e9ecef !important">
          <tr>
            <th>Действие</th>
            <th>Номер договора</th>
            <th>Статус ТТ по договору</th>
            <th>Дата заключения</th>
            <th>Отдел инициатора</th>
            <th>Вид договора</th>
            <th>Предмет договора</th>
            <th>Сумма договора</th>
            <th>Срок действия договора</th>
            <th>Пролонгация</th>
            <th>Статус</th>
            <th>Скан-копия</th>
            <th>Категория</th>
            <th>Примечание</th>
            <th>Контрагент</th>
            <th>Ответственный</th>
          </tr>
        </thead>
        <tbody id="tableMain">
          <template v-for=" el in this.farmDirecory">
          <tr :key="el.id">
            <td>
                <b-dropdown id="dropdown-1" text="Действие договор" size="sm" style="width: 95% !important;">
                        <b-dropdown-item @click="DeleteCurrentContract(el.id)">Удалить</b-dropdown-item>
                        <b-dropdown-item @click="EditCurrentContract(el.number, el.id)">Редактировать</b-dropdown-item>
                </b-dropdown>
            </td>
            <td>{{ el.number }}</td>
            <td>{{ el.company_status }}</td>
            <td>{{ el.created_at }}</td>
            <td>{{ el.department }}</td>
            <td>{{ el.contract_type }}</td>
            <td>{{ el.contract_object }}</td>
            <td>{{ el.fiat_amount }}</td>
            <td>{{ el.expiration_date }}</td>
            <td >{{el.prolongation}}</td>
            <td>{{el.is_active}}</td>
            <td>
             <a href="el.scan" target="_blank"><img style="height: 20px" src="@/assets/pdf.png" alt="скан"/></a>
            </td>
            <td>{{ el.category }}</td>
            <td>{{ el.comment }}</td>
            <td>{{ ChangeIdCounterByName(el.counterparty) }} </td>
            <td>{{ ChangeIdByName(el.responsible) }}</td>
          </tr>
                <template >
                  <tr>
                    <th>
                      <b-button variant="success" size="sm" style="width: 100% !important; margin: 0 !important;" @click=" CreateAnnex(el.number)">Добавить приложение</b-button>
                    </th>
                      <th style="cursor: pointer" @click="el.hhh = !el.hhh" >
                          <img :src="el.hhh ? require('@/assets/arrow-down.png') : require('@/assets/arrow-up2.png')" alt="">
                      </th>
                      <th style="background: burlywood !important">Тип приложения</th>
                      <th style="background: burlywood !important">Номер  приложения</th>
                      <th style="background: burlywood !important">Дата</th>
                      <th style="background: burlywood !important">Примечание</th>
                      <th style="background: burlywood !important">Скан-копия</th>
                      <th style="background: burlywood !important">Номер договора</th>

                  </tr>
                  <template >
                    <tr v-for="e in el.annexes" :key="e.id" :class="{ 'red' : el.hhh }"> 
                      <td>
                        <b-dropdown id="dropdown-1" text="Действие приложение" size="sm" style="width: 95% !important;">
                          <b-dropdown-item @click="deleteCurrentAnnexes(e.id)">Удалить</b-dropdown-item>
                          <b-dropdown-item @click="OpenModalEditAnnexe(el.number, e.id)">Редактировать</b-dropdown-item>
                        </b-dropdown>
                      </td>
                      <td style="border: none !important; font-style: italic">Приложение</td>
                      <td style="background: lightgrey !important">{{ e.number }}</td>
                      <td style="background: lightgrey !important"> {{e.doc_type }}</td>
                      <td style="background: lightgrey !important">{{ new Date(e.created_at).toLocaleString() }}</td>
                      <td style="background: lightgrey !important">{{ e.comment }}</td>
                      <td style="background: lightgrey !important">
                        <a href="el.scan" target="_blank"
                          ><img src="@/assets/pdf.png" style="height: 20px"
                        /></a>
                      </td>
                        <td style="background: lightgrey !important">{{ e.contract }}</td>
                    </tr>
                  </template>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </template>
            </template>
        </tbody>
      </table>
    </div>

    <div style="display: flex; justify-content: space-around; margin-top: 2%">
      <button
        class="Cancel"
        style="width: 20%"
        v-if="prevLink"
        @click="goToPage(prevLink)"
      >
        назад
      </button>
      <button
        class="Cancel"
        style="width: 20%"
        v-if="nextLink"
        @click="goToPage(nextLink)"
      >
        вперед
      </button>
    </div>
  </div>
</template>
    
<script>
import api from "@/api/directory";
import apiCounter from "@/api/counterparties"
import apiRep from '@/api/report'
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import groups from "@/helpers/groups";
import FilterFarms from "@/components/filter/contractFilter/filter_farms.vue";
import ModalContractCreate from '@/components/Table/Contracts/CreateContract/ModalWindow.vue'
import Annexes from "./CreateContract/Annexes.vue";
import { getUserById } from "@/helpers/getAllUsers";
import EditAnnexe from "@/components/Table/Contracts/CreateContract/EditAnnexe.vue"
import EditContract from "./CreateContract/EditContract.vue";
export default {
  name: "PartnerTable",
  props: ['named'],
  components: { Loader, Notifications, FilterFarms, ModalContractCreate, Annexes, EditAnnexe, EditContract },
  data() {
    return {
      // Для модальных окон
      current_id_by_modal: '',


      nextLink: null,
      prevLink: null,
      loader: false,
      total_objects: "",
      amount: "",
      farmDirecory: [],
      comput: '',
      groups: groups.groups,
      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      // modal: false,
      contract_number: '',
      filter_farms: {
        number: "",
      },
      users: [],
      // Для компонента editAnnexe
      editAnnexe: [],
      // Для компонента editContract
      editContract: [],
    };
  },
mounted(){
  this.loader = true
  apiCounter.getUsers()
  .then(response => {

      this.users = response.data.data
      // console.log(response.data.data ,"AAAAA")
      this.loader = false
  }).catch(error => {
    this.loader = false
  })
},
  methods: {
    ChangeIdByName(id){
     const users = getUserById(this.users, id)
     if (users[0]) {
        return users[0]?.last_name + " " + users[0]?.first_name[0] + ".";
      }
      return "";
    },
    ChangeIdCounterByName(id){
      let count_data = this.$store.state.counterparties.counterparties
      const counterpart = getUserById(count_data, id)
     if (counterpart[0]) {
        return counterpart[0]?.work_name;
      }
      return "";
    },
    DeleteCurrentContract(id){
      this.loader = true
      api.deleteCurrentContract(id)
      .then(response => {
        this.getFarmContract()
        this.loader = false
      }).catch(error => {
        console.log(error)
        this.loader = false
      })
    },
    deleteCurrentAnnexes(id){
      this.loader = true
      api.deleteCurrentAnnex(id)
      .then(response => {
        this.getFarmContract()
        this.loader = false
      }).catch(error => {
        console.log(error)
        this.loader = false
      })
    },
    CreateContract(){
      console.log(this.CurrentPathApi)
      this.$bvModal.show(this.CurrentPathApi)
    },
    CreateAnnex(number){
      this.contract_number = number
      this.$bvModal.show('bv-modal-annex-modal')
    },
    EditCurrentContract(number, id){
      this.loader = true
      this.contract_number = number
      api.getCurrentContract(id)
      .then(response => {
        this.editContract = response.data
        console.log(response.data)
        this.loader = false
        this.$bvModal.show('bv-modal-editContract')
      }).catch(error => {
        console.log(error)
        this.loader = false
      })
     
    },
    OpenModalEditAnnexe(number, id){
      this.loader = true
      this.contract_number = number
      apiRep.getContractAnnex(id)
      .then(response => {
        this.editAnnexe = response.data
        this.loader = false
        this.$bvModal.show('bv-modal-annexEdit-modal')
      }).catch(error => {
        console.log(error)
        this.loader = false
      })
    },
    getGroupName(group) {
      return groups.groups[group] ;
    },
    goToPage(link) {
      let url = new URL(link);
      let pageNumber = url.searchParams.get("page");
      if (pageNumber != null) {
        this.filter_farms.page = pageNumber;
      } else {
        delete this.filter_farms.page;
      }
      this.getFarmContract();
    },
    getFarmContract() {
      this.loader = true;
      api.getDirectoryFarm(this.CurrentPathApi, this.filter_farms)
        .then((response) => {
          this.loader = false;
          let l_data = response.data.data;
          l_data.forEach((item)=>{
            item.hhh = true;
          })
          this.farmDirecory = l_data;
          this.total_objects = response.data.total_objects;
          this.amount = response.data.amount;
          this.nextLink = response.data.links.next;
          this.prevLink = response.data.links.previous;
         
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные отфильтрованы";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
  })
    .catch((err) => {
          this.loader = false;
          console.log(err)
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Данные не отфильтрованы, попробуйте еще раз";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        });
    },

    closeNotification() {
      this.showNotify = false;
    },
    updateFilterDataFarms(filter_farms) {
      this.filter_farms = filter_farms;
    },
 
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      allGroups: (state) => state.auth.groups,
      staffGlobal: (state) => state.auth.users,
    }),
    CurrentPathApi(){
      switch(this.named) {
            case 'Общехозяйственные': 
            return 'economic'
          break;
            case 'Ремонтные': 
            return 'repair'
          break;
            case 'Прочие': 
            return 'other'
          break;
            case 'Финансовые': 
            return 'financial'
          break;
      }
    },
    CurrentIdByModalWindow(){
      switch(this.named) {
            case 'Общехозяйственные': 
            this.current_id_by_modal = 'economic'
          break;
            case 'Ремонтные': 
            this.current_id_by_modal = 'repair'
          break;
            case 'Прочие': 
            this.current_id_by_modal = 'other'
          break;
            case 'Финансовые': 
            this.current_id_by_modal = 'financial'
          break;
      }
    },
    countAnnexes() {
      let count = 0;
      if (this.farmDirecory.length) {
        this.farmDirecory.forEach((el) => {
          if (el.annexes.length > count) count = el.annexes.length;
        });
      }
      return count;
    },
  },
};
</script>
    
    
<style>
.red{
  display: none;
}
.amount {
  text-align: left;
}
.td-btr {
  padding: 0 !important;
  vertical-align: middle !important;
}
.annexes{
  display: none;
}
</style>
    
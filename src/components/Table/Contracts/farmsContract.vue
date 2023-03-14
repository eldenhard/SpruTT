<template>
  <div>
    <FilterFarms @updateFilterDataFarms="updateFilterDataFarms"></FilterFarms>
    <ModalContractCreate />
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
      id="notif"
    />
    <!-- <Loader :loader="loader"></Loader> -->
    <button
      class="Accept"
      @click="getFarmContract()"
      style="width: 100%;position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
    >
   
      Запросить общехозяйственные договора
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
        max-height: 150vh;
      "
    >
      <table
        class="table table-sm table-bordered table-hover"
        style="margin: 0; border: 1px solid black">
        <thead class="thead-light" style="background: #e9ecef !important">
          <tr>
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

            <th>
              Рабочее наименование
            </th>
            <th>
              Краткое наименование
            </th>
            <th>
              Полное наименование
            </th>
            <th>ЕЛС</th>
            <th>ОГРН/ЕГРПОУ/БИН</th>
            <th>ИНН/РНН</th>
            <th>КПП/№ Св-ва НДС</th>
            <th>Юридический адрес</th>
            <th>Дата создания</th>
            <th>Руководитель</th>
            <th>Телефон</th>
            <th>Группа</th>

          </tr>
        </thead>
        <tbody id="tableMain">

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
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import groups from "@/helpers/groups";
import FilterFarms from "@/components/filter/contractFilter/filter_farms.vue";
import ModalContractCreate from '@/components/Table/Contracts/CreateContract/ModalWindow.vue'
export default {
  name: "PartnerTable",
  components: { Loader, Notifications, FilterFarms,ModalContractCreate },
  data() {
    return {
      nextLink: null,
      prevLink: null,
      loader: false,
      total_objects: "",
      amount: "",
      farmDirecory: [],
      groups: groups.groups,
      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      // modal: false,

      filter_farms: {
        number: "",
        counterparty__full_name: "",
      },
    };
  },
  methods: {
    CreateContract(){
      this.$bvModal.show('bv-modal-example')
    },
    getGroupName(group) {
      // console.log(groups)
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
      
      // this.loader = true;
      api
        .getDirectoryFarm(this.filter_farms)
        .then((response) => {
          this.total_objects = response.data.total_objects;
          this.amount = response.data.amount;
          this.nextLink = response.data.links.next;
          this.prevLink = response.data.links.previous;
          this.farmDirecory = response.data.data;
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные отфильтрованы";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);

          let table = document.querySelector('#tableMain')
          table.innerHTML = ""
          this.farmDirecory.forEach((el => {
            let doc = `
            <tr id="doc_${el.id}">
            <td>${ el.number }</td>
            <td>${ el.company_status }</td>
            <td>${ el.created_at }</td>
            <td>${ el.department }</td>
            <td>${ el.contract_type }</td>
            <td>${ el.contract_object }</td>
            <td>${ el.fiat_amount }</td>
            <td>${ el.expiration_date }}</td>
            <td >${el.prolongation}</td>
            <td>${el.is_active}</td>
            <td>
             <a href="${el.scan}" target="_blank"><img style="height: 20px" src="@/assets/pdf.png" alt="скан"/></a>
            </td>
            <td>${ el.category }</td>
            <td>${ el.comment }</td>
            <td>${ el.counterparty?.work_name } </td>
            <td>${ el.counterparty?.short_name }</td>
            <td>${ el.counterparty?.full_name }</td>
            <td >${ el.counterparty?.els }</td>
            <td >${ el.counterparty?.ogrn }</td>
            <td>${ el.counterparty?.inn }</td>
            <td>${ el.counterparty?.kpp }</td>
            <td>${ el.counterparty?.legal_address }</td>
            <td>${ new Date(el.counterparty?.created_at).toLocaleString() }</td>
            <td>${ el.counterparty?.manager }</td>
            <td>${ el.counterparty?.phone }</td>
            <td>${ this.getGroupName(el.counterparty?.group) }</td> 
              </tr>`;
            table.insertAdjacentHTML('beforeend', doc)
    

if(el.annex != []){
  let annex_head = `<tr>
                  <th><button class="button Accept" style="height: 25px" onclick="console.log(${el.id})">Скрыть</button></th>
                  <th style="background: burlywood !important">Номер приложения</th>
                  <th style="background: burlywood !important">Тип приложения</th>
                  <th style="background: burlywood !important">Дата</th>
                  <th style="background: burlywood !important">Примечание</th>
                  <th style="background: burlywood !important">Скан-копия</th>
                  <th style="background: burlywood !important">Номер договора</th>
              </tr>`

            table.insertAdjacentHTML('beforeend', annex_head)
           el.annexes.forEach((a_el) => {
              let annex = `<tr id="annex_${a_el.id}">
                  <td style="border: none !important; font-style: italic">Приложение</td>
                  <td style="background: lightgrey !important">${ a_el.doc_type }</td>
                  <td style="background: lightgrey !important">${ a_el.number }</td>
                  <td style="background: lightgrey !important">${ new Date(a_el.created_at).toLocaleString() }</td>
                  <td style="background: lightgrey !important">${ a_el.comment }</td>
                  <td style="background: lightgrey !important">
                    <a href="${a_el.scan}" target="_blank"
                      ><img src="@/assets/excel.png"
                    /></a>
                  </td>
                  <td style="background: lightgrey !important">${ a_el.contract }</td>
               </tr>`;
               table.insertAdjacentHTML('beforeend', annex);
            })
      } 
    }))
  })
    .catch((err) => {
          // this.loader = false;
          console.log(err.response.data)
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
    amen(a){
      alert(a)
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      allGroups: (state) => state.auth.groups,
      staffGlobal: (state) => state.auth.users,
    }),
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
.amount {
  text-align: left;
}
.td-btr {
  padding: 0 !important;
  vertical-align: middle !important;
}
</style>
    
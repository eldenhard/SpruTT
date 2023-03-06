<template>
  <div style=" width: 100% !important">
    <FilterFarms @updateFilterDataFarms="updateFilterDataFarms"></FilterFarms>
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
      style="width: 100%;
        position: relative;
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
      style="border-top-left-radius: 10px; border-top-right-radius: 10px"
    
    >
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
        max-height: 60vh;
      "
    >
      <table
        class="table table-sm table-bordered table-hover"
        style="margin: 0; border: 1px solid black"
      >
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

            <th style="background: burlywood !important">
              Рабочее наименование
            </th>
            <th style="background: burlywood !important">
              Краткое наименование
            </th>
            <th style="background: burlywood !important">
              Полное наименование
            </th>
            <th style="background: burlywood !important">ЕЛС</th>
            <th style="background: burlywood !important">ОГРН/ЕГРПОУ/БИН</th>
            <th style="background: burlywood !important">ИНН/РНН</th>
            <th style="background: burlywood !important">КПП/№ Св-ва НДС</th>
            <th style="background: burlywood !important">Юридический адрес</th>
            <th style="background: burlywood !important">Дата создания</th>
            <th style="background: burlywood !important">Руководитель</th>
            <th style="background: burlywood !important">Телефон</th>
            <th style="background: burlywood !important">Группа</th>
            <template v-for="(el, idx) in countAnnexes">
              <th :key="idx" style="background: wheat !important">
                Тип приложения
              </th>
              <th style="background: wheat !important">Номер приложения</th>
              <th style="background: wheat !important">Дата</th>
              <th style="background: wheat !important">Примечание</th>
              <th style="background: wheat !important">Скан-копия</th>
              <th style="background: wheat !important">Номер договора</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="farm in farmDirecory" :key="farm.id">
            <td>{{ farm.number }}</td>
            <td>{{ farm.company_status }}</td>
            <td>{{ farm.created_at }}</td>
            <td>{{ farm.department }}</td>
            <td>{{ farm.contract_type }}</td>
            <td>{{ farm.contract_object }}</td>
            <td>{{ farm.fiat_amount }}</td>
            <td>{{ farm.expiration_date }}</td>
            <td v-if="farm.prolongation == true">Да</td>
            <td v-else>Нет</td>
            <td v-if="farm.is_active == true">Да</td>
            <td v-else>Нет</td>
            <td>
              <a :href="farm.scan" target="_blank"
                ><img style="height: 20px" src="@/assets/pdf.png" alt="скан"
              /></a>
            </td>
            <td>{{ farm.category }}</td>
            <td>{{ farm.comment }}</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.work_name }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.short_name }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.full_name }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.els }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.ogrn }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.inn }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.kpp }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.legal_address }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ new Date(farm.counterparty.created_at).toLocaleString() }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.manager }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ farm.counterparty.phone }}
            </td>
            <td v-else>—</td>

            <td v-if="farm.counterparty != null">
              {{ getGroupName(farm.counterparty.group) }}
            </td>
            <td v-else>—</td>

            <template v-for="f in farm.annexes">
              <td>{{ f.doc_type }}</td>
              <td>{{ f.number }}</td>
              <td>{{ new Date(f.created_at).toLocaleString() }}</td>
              <td>{{ f.comment }}</td>
              <td>
                <a :href="f.scan" target="_blank"
                  ><img src="@/assets/excel.png"
                /></a>
              </td>
              <td>{{ f.contract }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <div
      style="width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        max-height: 60vh;
      "
    >
    <table   class="table table-sm table-bordered">
  <thead>
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

      <th style="background: burlywood !important">
        Рабочее наименование
      </th>
      <th style="background: burlywood !important">
        Краткое наименование
      </th>
      <th style="background: burlywood !important">
        Полное наименование
      </th>
      <th style="background: burlywood !important">ЕЛС</th>
      <th style="background: burlywood !important">ОГРН/ЕГРПОУ/БИН</th>
      <th style="background: burlywood !important">ИНН/РНН</th>
      <th style="background: burlywood !important">КПП/№ Св-ва НДС</th>
      <th style="background: burlywood !important">Юридический адрес</th>
      <th style="background: burlywood !important">Дата создания</th>
      <th style="background: burlywood !important">Руководитель</th>
      <th style="background: burlywood !important">Телефон</th>
      <th style="background: burlywood !important">Группа</th>
    </tr>
  </thead>
  <tbody id="body-table"> -->
    <!-- <tr v-for="farm in farmDirecory" :key="farm.id">
            <td>{{ farm.number }}</td>
            <td>{{ farm.company_status }}</td>
            <td>{{ farm.created_at }}</td>
            <td>{{ farm.department }}</td>
            <td>{{ farm.contract_type }}</td>
            <td>{{ farm.contract_object }}</td>
            <td>{{ farm.fiat_amount }}</td>
            <td>{{ farm.expiration_date }}</td>
            <td v-if="farm.prolongation == true">Да</td>
            <td v-else>Нет</td>
            <td v-if="farm.is_active == true">Да</td>
            <td v-else>Нет</td>
            <td>
              <a :href="farm.scan" target="_blank"
                ><img style="height: 20px" src="@/assets/pdf.png" alt="скан"
              /></a>
            </td>
            <td>{{ farm.category }}</td>
            <td>{{ farm.comment }}</td>
            <td>{{ farm.counterparty?.work_name }} </td>
            <td>{{ farm.counterparty.short_name }}</td>
            <td>{{ farm.counterparty.full_name }}</td>
            <td >{{ farm.counterparty.els }}</td>
            <td >{{ farm.counterparty.ogrn }}</td>
            <td>{{ farm.counterparty.inn }}</td>
            <td>{{ farm.counterparty.kpp }}</td>
            <td>{{ farm.counterparty.legal_address }}</td>
            <td>{{ new Date(farm.counterparty.created_at).toLocaleString() }}</td>
            <td> {{ farm.counterparty.manager }}</td>
            <td>{{ farm.counterparty.phone }}</td>
            <td>{{ getGroupName(farm.counterparty.group) }}</td> 
    </tr> -->
  <!-- </tbody>
       
</table>
    </div> -->


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

export default {
  name: "PartnerTable",
  components: { Loader, Notifications, FilterFarms },
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

      // name: '',
      // number: '',
      // company_status: '',
      // created_at: '',
      // department: '',
      // contract_type: '',
      // contract_object: '',
      // fiat_amount: '',
      // expiration_date: '',
      // prolongation: '',
      // is_active: '',
      // category: '',
      // comment: '',

      // work_name: '',
      // short_name: '',
      // full_name: '',
      // els: '',
      // ogrn: '',
      // inn: '',
      // kpp: '',
      // legal_address: '',
      // manager: '',
      // phone: '',
      // group: '',

      filter_farms: {
        number: "",
        counterparty__full_name: "",
      },
    };
  },
  methods: {
    getGroupName(group) {
      // console.log(groups)
      return groups.groups[group];
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
      api
        .getDirectoryFarm(this.filter_farms)
        .then((response) => {
          this.nextLink = response.data.links.next;
          this.prevLink = response.data.links.previous;
          this.farmDirecory = response.data.data;
          // console.log(this.farmDirecory)
          // let aaaa = ''
          // for(let i in this.farmDirecory){
          //   aaaa= this.farmDirecory[i]
          // } 
          // let tablesApplication = document.getElementById('body-table')
          // tablesApplication.appendChild('tr')
          // let table = document.querySelector('#body-table');

          //   for (let i = 0; i < this.farmDirecory.length; i++) {
          //     let tr = document.createElement('tr');
              
          //     for (let i = 0; i < 25; i++) {
          //       let td = document.createElement('td');
          //       td.innerHTML = this.farmDirecory
          //       tr.appendChild(td);
          //     }
              
          //     table.appendChild(tr);
          //   }
        
          this.total_objects = response.data.total_objects;
          this.amount = response.data.amount;

          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные отфильтрованы";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
          this.loader = false;
        })
        .catch((err) => {
          this.loader = false;
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

.td-btr {
  padding: 0 !important;
  vertical-align: middle !important;
}
</style>
    
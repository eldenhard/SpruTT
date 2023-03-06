<template>
  <div>
    <FilterRenovation
      @updateFilterDataRenovation="updateFilterDataRenovation"
    ></FilterRenovation>
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
      @click="getRenovationContract()"
      style=" width: 100%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
    >
      Запросить договора на ремонт
    </button>
    <br /><br />
    <p class="amount">всего записей: {{ total_objects }}</p>
    <p class="amount">всего на странице: {{ amount }}</p>
    <button
      class="Cancel"
      style="border-top-left-radius: 10px; border-top-right-radius: 10px"
      @click="showModal()"
    >
      Добавить контрагента
    </button>
    <div
      style="
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        height: 80vh;
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

            <div v-for="(el, idx) in countAnnexes" :key="el">
              <th :key="idx" style="background: wheat !important">
                Тип приложения
              </th>
              <th style="background: wheat !important">Номер приложения</th>
              <th style="background: wheat !important">Дата</th>
              <th style="background: wheat !important">Примечание</th>
              <th style="background: wheat !important">Скан-копия</th>
              <th style="background: wheat !important">Номер договора</th>
            </div>
          </tr>
        </thead>
        <tbody>
          <tr v-for="renovation in renovationDirectory" :key="renovation.id">
            <td>{{ renovation.number }}</td>
            <td>{{ renovation.company_status }}</td>
            <td>{{ renovation.created_at }}</td>
            <td>{{ renovation.department }}</td>
            <td>{{ renovation.contract_type }}</td>
            <td>{{ renovation.contract_object }}</td>
            <td>{{ renovation.fiat_amount }}</td>
            <td>{{ renovation.expiration_date }}</td>
            <td v-if="renovation.prolongation == true">Да</td>
            <td v-else>Нет</td>
            <td v-if="renovation.is_active == true">Да</td>
            <td v-else>Нет</td>
            <td>
              <a :href="renovation.scan" target="_blank"
                ><img style="height: 20px" src="@/assets/pdf.png" alt="скан"
              /></a>
            </td>
            <td>{{ renovation.category }}</td>
            <td>{{ renovation.comment }}</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.work_name }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.short_name }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.full_name }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.els }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.ogrn }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.inn }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.kpp }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.legal_address }}
            </td>
            <td v-else>—</td>

            <td
              v-if="renovation.counterparty != null"
              style="font-size: 15px; text-align: center"
            >
              {{
                new Date(renovation.counterparty.created_at).toLocaleString()
              }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.manager }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ renovation.counterparty.phone }}
            </td>
            <td v-else>—</td>

            <td v-if="renovation.counterparty != null">
              {{ getGroupName(renovation.counterparty.group) }}
            </td>
            <td v-else>—</td>

            <div v-for="f in renovation.annexes" :key="f">
              <td>{{ f.doc_type }}</td>
              <td>{{ f.number }}</td>
              <td style="font-size: 15px; text-align: center">
                {{ new Date(f.created_at).toLocaleString() }}
              </td>
              <td>{{ f.comment }}</td>
              <td>
                <a :href="f.scan" target="_blank"
                  ><img src="@/assets/excel.png" style="height: 20px"
                /></a>
              </td>
              <td>{{ f.contract }}</td>
            </div>
          </tr>
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
import FilterRenovation from "@/components/filter/contractFilter/renovation_filter.vue";
import groups from "@/helpers/groups";

export default {
  name: "PartnerTable",
  components: { Loader, Notifications, FilterRenovation },
  data() {
    return {
      nextLink: null,
      prevLink: null,
      loader: false,
      total_objects: "",
      amount: "",
      renovationDirectory: [],

      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",

      filter_renovation: {
        groups: [],
        number: "",
        counterparty: {
          full_name: "",
        },
      },
    };
  },
  methods: {
    getGroupName(group) {
      console.log(groups);
      return groups.groups[group];
    },
    goToPage(link) {
      let url = new URL(link);
      let pageNumber = url.searchParams.get("page");
      if (pageNumber != null) {
        this.filter_renovation.page = pageNumber;
      } else {
        delete this.filter_renovation.page;
      }
      this.getRenovationContract();
    },
    getRenovationContract() {
      this.loader = true;
      api
        .getDirectoryRenovation(this.filter_renovation)
        .then((response) => {
          this.nextLink = response.data.links.next;
          this.prevLink = response.data.links.previous;
          this.renovationDirectory = response.data.data;
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
          this.notifyClass = "wrapper-alert";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        });
    },

    closeNotification() {
      this.showNotify = false;
    },
    updateFilterDataRenovation(filter_renovation) {
      this.filter_renovation = filter_renovation;
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
      if (this.renovationDirectory.length) {
        this.renovationDirectory.forEach((el) => {
          if (el.annexes.length > count) count = el.annexes.length;
        });
      }

      return count;
    },
  },
};
</script>
    
    
<style>
.input-filter {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  border: none;
  text-decoration: none;
  outline: none;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
}
</style>
    
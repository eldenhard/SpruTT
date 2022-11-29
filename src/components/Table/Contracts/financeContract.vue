<template>
  <div>
    <FilterFinance
      @updateFilterDataFinance="updateFilterDataFinance"
    ></FilterFinance>

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
      @click="getFinanceContract()"
      style="
        width: 100%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
    >
      Запросить финансовые договора
    </button>
    <br /><br />
    <p class="amount">всего записей: {{ total_objects }}</p>
    <p class="amount">всего на странице: {{ amount }}</p>
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

            <!-- <template v-if="countAnnexes"> -->

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
            <!-- </template> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="finance in financeDirecory" :key="finance.id">
            <td>{{ finance.number }}</td>
            <td>{{ finance.company_status }}</td>
            <td style="font-size: 15px; text-align: center">
              {{ new Date(finance.created_at).toLocaleString() }}
            </td>
            <td>{{ finance.department }}</td>
            <td>{{ finance.contract_type }}</td>
            <td>{{ finance.contract_object }}</td>
            <td>{{ finance.fiat_amount }}</td>
            <td>{{ finance.expiration_date }}</td>
            <td v-if="finance.prolongation == true">Да</td>
            <td v-else>Нет</td>
            <td v-if="finance.is_active == true">Да</td>
            <td v-else>Нет</td>
            <td v-if="finance.scan != null">
              <a :href="finance.scan" target="_blank"
                ><img style="height: 20px" src="@/assets/pdf.png" alt="скан"
              /></a>
            </td>
            <td v-else>—</td>
            <td>{{ finance.category }}</td>
            <td>{{ finance.comment }}</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.work_name }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.short_name }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.full_name }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.els }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.ogrn }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.inn }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.kpp }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.legal_address }}
            </td>
            <td v-else>—</td>

            <td
              v-if="finance.counterparty != null"
              style="font-size: 15px; text-align: center"
            >
              {{ new Date(finance.counterparty.created_at).toLocaleString() }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.manager }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ finance.counterparty.phone }}
            </td>
            <td v-else>—</td>

            <td v-if="finance.counterparty != null">
              {{ getGroupName(finance.counterparty.group) }}
            </td>
            <td v-else>—</td>

            <template v-for="f in finance.annexes">
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
            </template>
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
import FilterFinance from "@/components/filter/contractFilter/filter_finance.vue";
import groups from "@/helpers/groups";
export default {
  name: "FinanceContract",
  components: { Loader, Notifications, FilterFinance },
  data() {
    return {
      nextLink: null,
      prevLink: null,
      loader: false,
      total_objects: "",
      amount: "",
      financeDirecory: [],

      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",

      filter_finance: {
        counterparty__full_name: "",
        number: "",
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
        this.filter_finance.page = pageNumber;
      } else {
        delete this.filter_finance.page;
      }
      this.getFinanceContract();
    },
    getFinanceContract() {
      this.loader = true;
      api
        .getDirectoryFinance(this.filter_finance)
        .then((response) => {
          this.nextLink = response.data.links.next;
          this.prevLink = response.data.links.previous;
          this.financeDirecory = response.data.data;
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
    updateFilterDataFinance(filter_finance) {
      this.filter_finance = filter_finance;
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
      if (this.financeDirecory.length) {
        this.financeDirecory.forEach((el) => {
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
    
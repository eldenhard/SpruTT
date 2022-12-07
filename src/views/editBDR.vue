<template>
  <div>
    <h2>БДР отчет</h2>

    <!-- PUT /api/reports/bdr-row/update/365 -->
    <br />
    <div
      style="
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
    >
      <table class="table table-sm table-bordered table-hover" style="margin:0; border: 1px solid black">
        <thead class="thead-light" style="background: #e9ecef !important">
          <tr>
            <th>Название</th>
            <th>План</th>
            <th>Ожидаемый факт</th>
            <th>Отклонение</th>
            <th>Комментарии по отклонениям</th>
            <th>Ответственный за статью в целом</th>
            <th>Лицо, которому Ответственный делегировал заполнение</th>
            <th>Заполняет ожидаемый факт</th>
            <th>Дата последнего обновления</th>
            <th>Действие</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(bdr, index) in data"
            :key="bdr.id"
            :class="{
              l0: bdr.level === 0,
              l1: bdr.level === 1,
              l2: bdr.level === 2,
            }"
          >
            <td clas="lc groups">{{ bdr.name }}</td>
            <td><input class="input-filter"  v-model="data[index].plan" /></td>
            <td><input class="input-filter"  v-model="data[index].fact" /></td>
            <td>
              {{result}}
              <!--  v-model="data[index].deviation" -->
              <!-- <input class="input-filter" :value="result" /> -->
            </td>
            <td>
              <input class="input-filter" v-model="data[index].comment" />
            </td>
            <td>
              <span
                class=""
                v-for="user in data[index].responsible_users"
                :key="user"
                style="margin-bottom: 5px"
              >
                {{ getName(user) }}<br
              /></span>

              <MultiSelect
                :selected="data[index].responsible_users"
                :variants="staffGlobal"
              ></MultiSelect>
            </td>

            <td class="td-btr" style="position: relative">
              <span
                class=""
                v-for="user in data[index].delegated_users"
                :key="user"
                style="margin-bottom: 5px"
              >
                {{ getName(user) }}<br
              /></span>

              <MultiSelect
                :selected="data[index].delegated_users"
                :variants="staffGlobal"
              ></MultiSelect>
            </td>
            <td class="td-btr">
              <span
                class=""
                v-for="user in data[index].filling_users"
                :key="user"
                style="margin-bottom: 5px"
              >
                {{ getName(user) }}<br
              /></span>

              <MultiSelect
                :selected="data[index].filling_users"
                :variants="staffGlobal"
              ></MultiSelect>
            </td>
            <!-- <td class="td-btr"><input class="input-filter" v-model="data[index].filling_users"></td> -->
            <td class="td-btr" style="font-weight: normal !important">
              {{ new Date(bdr.updated_at).toLocaleString() }}
            </td>
            <td class="td-btr">
              <button
                class="Accept"
                style="height: 100%"
                @click="saveBDRchange(index)"
              >
                Сохранить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      class="Accept"
      @click="saveBDRreport()"
      style="
        width: 95%;
        margin: 5% 0;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
    >
      Сохранить отчет
    </button>
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
      id="notif"
    />
    <Loader :loader="loader"></Loader>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/report";
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
import MultiSelect from "@/components/ui/MultiSelect.vue";
import { getUserById } from "@/helpers/getAllUsers";
export default {
  template: `{{ $route.params.id }}`,

  data() {
    return {
      data: {},
      all_table_data: [],
      name: "",
      plan: 0,
      fact: 0,
      deviation: "",
      comment: "",
      level: "",
      updated_at: "",

      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",

      loader: false,

      // вычисляемые переменные
      result: ''
    };
  },
  components: { Notifications, Loader, MultiSelect },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      allGroups: (state) => state.auth.groups,
      staffGlobal: (state) => state.auth.users,
    }),
    result(){
      this.result = this.plan + this.fact
    }
  },



  mounted() {
    this.loader = true;
    api.getBDRreportByID(this.$route.params.id).then((response) => {
      this.all_table_data = response.data.bdr_report_rows;

      this.loader = false;

      this.all_table_data.forEach((el) => {
        this.data = { ...this.data, [el.id]: el };
      });
    });
  },
  methods: {
    getName(id) {
      const user = getUserById(this.staffGlobal, id);
      console.log(user);
      return user[0].first_name + " " + user[0].last_name;
    },

    saveBDRchange(index) {
      this.loader = true;
      const dateForSave = this.data[index];
      console.log(dateForSave);
      api.putBDRreportsave(index, dateForSave).then((response) => {
        this.notifyHead = "Успешно";
        this.notifyMessage = "Данные сохранены";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
        this.loader = false;
      });
    },
    saveBDRreport() {
      this.loader = true;
      let dataForAllSave = [];
      Object.entries(this.data).forEach((element) => {
        const [key, value] = element;
        dataForAllSave.push(value);
      });
      console.log(dataForAllSave);
      api
        .saveBDRreport(this.$route.params.id, dataForAllSave)
        .then((response) => {
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные Преобразованы в отчет";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
          this.loader = false;
        });
    },
    closeNotification() {
      this.showNotify = false;
    },
  },
};
</script>

<style>
.lc {
  background: #ebebeb;
  font-size: normal;
}
.groups {
  text-align: left;
  font-weight: bold;
}
.groups-amount {
  background: #ddebf7;
  font-size: 14px;
}
.input-filter {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  border: none;
  text-decoration: none;
  outline: none;
  text-align: center;
  font-size: 13px;
}
.td-btr {
  padding: 0 !important;
  vertical-align: middle !important;
}
.l0 {
  font-weight: 700;
  font-size: 15px !important;
}
.l0 input {
  font-size: 13px !important;
  text-align: center !important;
  background: #ddebf7 !important;
}
</style>
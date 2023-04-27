<template>
  <div>
    <Loader :loader="loader"></Loader>
    <wagonModal v-if="showReportModal" :OnceReport="OnceReport" @close="closeChangeReport"></wagonModal>
    <div style="width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        height: 50vh;
        max-height: 50vh;
        transform: translate(-50%, 0);
      ">
      <table class="table table-sm table-bordered table-hover" style="margin: 0">
        <thead class="thead-light" style="background: #e9ecef !important">
          <tr>
            <th style="width: 70px !important">Кто создал</th>
            <th style="width: 70px !important">На кого создано</th>
            <th style="width: 70px !important">Дата создания</th>
            <th style="width: 70px !important">Дата изменения</th>
            <th style="width: 70px !important">Доплата</th>
            <th style="width: 70px !important">Файл</th>
            <th style="width: 70px !important">Изменить</th>
            <th style="width: 70px !important">Удалить</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reports in reports_creator" :key="reports.id">
            <td>
              {{ getUserById(reports.creator) }}
              <br />
            </td>
            <td>
              {{ getUserById(reports.employee) }}
              <br />
            </td>
            <td>{{ new Date(reports.created_at).toLocaleString() }}<br /></td>
            <td>{{ new Date(reports.updated_at).toLocaleString() }}<br /></td>
            <td>{{ reports.rate }} %<br /></td>
            <td>
              <a download target="_blank" :href="reports.file" v-if="reports.file"><img src="@/assets/excel.png" alt=""
                  width="50px !important" /></a>
            </td>
            <td>
              <button style="height: 100%; vertical-align: middle;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: none;
                " @click="OpenChangeReport(reports.id)">
                <img src="@/assets/edit5.png" class="icon-active" alt="">
              </button>
            </td>
            <td>
              <button style="
                  height: 100%;
                  vertical-align: middle;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: none;
                " @click="DeleteReport(reports.id)">
                <img src="@/assets/delete.png" class="icon-active" alt="">
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass">
    </Notifications>
  </div>
</template>

<script>
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import { mapState } from "vuex";
import { getUserById } from "@/helpers/getAllUsers";
import wagonModal from "@/components/modalReport/modal.vue";

import api from "@/api/report";

export default {
  data() {
    return {
      loader: false,
      reports_creator: "",
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      OnceReport: null,
      showReportModal: false,

    };
  },
  components: { Loader, Notifications, wagonModal },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      staffGlobal: (state) => state.auth.users,

    }),
  },
  mounted() {
    const preid = JSON.parse(localStorage.getItem("vuex"));
    const id = preid.auth.uid;

    this.loader = true;
    api.getReportByIdCreator(id).then((response) => {
      this.reports_creator = response.data;
    });
    this.loader = false;
  },
  methods: {
    OpenChangeReport(id) {
      this.loader = true;
      api.getReportById(id).then((response) => {
        this.showReportModal = true;
        this.loader = false;
        this.OnceReport = response.data;
      });
    },
    closeChangeReport() {
      this.showReportModal = false;
      this.downloadData()
    },
    closeCreatedReport() {
      this.ShowCreatedReport = false;
    },
    getUserById(id) {
      const user = getUserById(this.staffGlobal, id);
      if (user[0]) {
        return user[0]?.last_name + " " + user[0]?.first_name;
      }
      return "";
    },
    DeleteReport(id) {
      this.loader = true;
      api.deleteReport(id)
        .then((response) => {
          this.loader = false;
          this.notifyHead = "Успешно";
          this.notifyMessage = "Отчет удален";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          this.downloadData()
          setTimeout(() => (this.showNotify = false), 2000);
        }).catch(error => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Попробуйте удалить отчет позже";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 2000);

        })

    },
    downloadData() {
      const preid = JSON.parse(localStorage.getItem("vuex"));
      const id = preid.auth.uid;
      api.getReportByIdCreator(id).then((response) => {
        this.reports_creator = response.data.data;
      });
    }
  },

};
</script>
<template>
  <div>
    <Loader :loader="loader"></Loader>
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
      <table
        class="table table-sm table-bordered table-hover"
        style="margin: 0; border: 1px solid black"
      >
        <thead class="thead-light" style="background: #e9ecef !important">
          <tr>
            <th style="width: 70px !important">Кто создал</th>
            <th style="width: 70px !important">На кого создано</th>
            <th style="width: 70px !important">Дата создания</th>
            <th style="width: 70px !important">Дата изменения</th>
            <th style="width: 70px !important">Доплата</th>
            <th style="width: 70px !important">Файл</th>
            <th style="width: 70px !important">Действие</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="reports in reports_creator" :key="reports.id">
            <td>
              {{ reports.creator.first_name }} {{ reports.creator.last_name }}
              <br />
            </td>
            <td>
              {{ reports.employee.first_name }} {{ reports.employee.last_name }}
              <br />
            </td>
            <td>{{ new Date(reports.created_at).toLocaleString() }}<br /></td>
            <td>{{ new Date(reports.updated_at).toLocaleString() }}<br /></td>
            <td>{{ reports.rate }} %<br /></td>
            <td>
              <a
                download
                target="_blank"
                :href="reports.file"
                v-if="reports.file"
                ><img src="@/assets/excel.png" alt="" width="50px !important"
              /></a>
            </td>
            <td>
              <button
                class="Delete"
                style="
                  height: 100%;
                  vertical-align: middle;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
                @click="DeleteReport(reports.id)"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
    ></Notifications>
  </div>
</template>

<script>
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import { mapState } from "vuex";
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
    };
  },
  components: { Loader, Notifications },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  mounted() {
    const preid = JSON.parse(localStorage.getItem("vuex"));
    const id = preid.auth.uid;

    this.loader = true;
    api.getReportByIdCreator(id)
    .then((response) => {
      this.reports_creator = response.data.data;
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
  },
  DeleteReport(id) {
    this.loader = true;
    api.deleteReport(id).then((response) => {
      window.location.reload();
      this.loader = false;
    });
  },
};
</script>
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
        height: 50vh;
        max-height: 50vh;
        transform: translate(-50%, 0);
      "
    >
      <table
        class="table table-sm table-bordered table-hover"
        style="margin: 0;  "
      >
        <thead class="thead-light" style="background: #e9ecef !important">
          <tr>
            <th style="width: 70px !important">Файл</th>
            <th style="width: 70px !important">Дата создания</th>
            <th style="width: 70px !important">Создатель</th>
            <th style="width: 70px !important">Тип вагона</th>
            <th style="width: 70px !important">Формат</th>
            <th style="width: 70px !important">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reports in report_abandoned" :key="reports.id">
            <td style="width: 70px !important">
              <a
                download
                target="_blank"
                :href="reports.file"
                v-if="reports.file"
                ><img src="@/assets/excel.png" alt="" width="50px !important"
              /></a>
            </td>
            <td style="font-size: 15px; text-align: center">
              {{ new Date(reports.created_at).toLocaleString() }}
            </td>
            <td style="width: 70px !important">
              {{ getUserById(reports.creator) }}
              
            </td>
            <td style="width: 70px !important">{{ reports.wagon_type }}</td>
            <td
              style="width: 70px !important"
              v-if="reports.format === 'classic'"
            >
              Стандартный
            </td>
            <td style="width: 70px !important" v-if="reports.format === 'disp'">
              Диспетчерский
            </td>
            <td
              style="width: 70px !important"
              v-if="reports.format === 'legal'"
            >
              Юридический
            </td>
            <td v-if="reports.format === null">—</td>
            <td style="width: 70px !important">
              <button
                style=" height: 70px;height: 100%;
                  vertical-align: middle;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: none;
                "
                @click="DeleteReportAbandoned(reports.id)"
              >
              <img src="@/assets/delete.png" class="icon-active" alt="">

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
      id="notif"
    />
  </div>
</template>

<script>
import Loader from "@/components/loader/loader.vue";
import api from "@/api/report";
import { mapState } from "vuex";
import { getUserById } from "@/helpers/getAllUsers";
import Notifications from "@/components/notifications/Notifications.vue";
export default {
  data() {
    return {
      report_abandoned: "",
      loader: false,
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
      staffGlobal: (state) => state.auth.users,
    }),
  },
  methods: {
      getUserById(id) {
        const user = getUserById(this.staffGlobal, id);
        if (user[0]) {
          return user[0]?.last_name + " " + user[0]?.first_name;
        }
        return "";
      },
    DownloadReportAbandones() {
      this.loader = true;
      api
        .GetReportAbandone()
        .then((response) => {
          this.report_abandoned = response.data.data;
          this.total_objects_report = response.data.total_objects;
          this.loader = false;
          this.notifyHead = "Успешно";
          this.notifyMessage = "Отчеты загружены";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Отчеты не получены";
          this.notifyClass = "wrapper-alert";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        });
    },
    DeleteReportAbandoned(id) {
      this.loader = true;
      api
        .deleteReportAbandon(id)
        .then((response) => {
          this.loader = false;
          this.notifyHead = "Успешно";
          this.notifyMessage = "Отчет удален";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
          this.DownloadReportAbandones();
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Отчет не удален";
          this.notifyClass = "wrapper-alert";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        });
    },
    closeNotification() {
      this.showNotify = false;
    },

  },
  mounted() {
    this.loader = true;
    api
      .GetReportAbandone()
      .then((response) => {
        this.report_abandoned = response.data.data;
        this.loader = false;
      })
      .catch((error) => {
        this.loader = false;
      });
  },

};
</script>
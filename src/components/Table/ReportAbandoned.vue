<template>
  <div>
    <h2>Брошенные вагоны</h2>

    <br /><br />
    <Loader :loader="loader"></Loader>
    <FilterReportAbandon @update-filter="updateFilter"></FilterReportAbandon>

    <b-modal ref="ModalTypeReport" hide-footer title="Выберите тип создаваемого отчета">
      <div class="bg">
        <select class="textarea" id="input-filter-staff1" name="Pwd" v-model="format" style="width: 100%">
          <option disabled>Выберите тип создаваемого отчета</option>
          <option value="classic">Стандартный</option>
          <option value="disp">Диспетчерский</option>
          <!-- <option value="legal">Юридический</option> -->
        </select>
        <br />
        <label for="input-filter-staff1" class="label" style="margin-left: 10%">Тип отчета</label>
      </div>


      <b-button class="mt-2" variant="success" block @click="CreateReportAbandones()">Создать отчет
      </b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-button>
    </b-modal>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <button class="button Request" @click="showModal()" style="font-weight: 500;
              width: 100%;
              position: relative;
              left: 50%;
              transform: translate(-50%, 0);
              font-size: 17px;
              margin-top: 3%;
              height: 35px;            ">
            Создать отчет
          </button>
        </b-col>

        <b-col>
          <button class="button Accept" @click="DownloadReportAbandones()" style="
              width: 100%;
              position: relative;
              left: 50%;
              transform: translate(-50%, 0);
              font-size: 17px;
              margin-top: 3%;
              height: 35px;
            ">
            Загрузить отчеты
          </button>
        </b-col>
      </b-row>
    </b-container>
    <br /><br />
    <p class="amount">всего отчетов: {{ total_objects_report }}</p>
    <br>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div style="
              width: 100%;
              overflow-x: auto;
              overflow-y: auto;
              position: relative;
              left: 50%;
              transform: translate(-50%, 0);
              height: 40vh;
            ">
            <table class="table table-sm table-bordered table-hover" style="margin: 0;  ">
              <thead class="thead-light" style="background: #e9ecef !important">
                <tr>
                  <th style="width: 50px !important">Файл</th>
                  <th>Дата создания</th>
                  <th>Создатель</th>
                  <th style="width: 95px !important">Тип вагона</th>
                  <th>Формат</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reports in report_abandoned" :key="reports.id">
                  <td style="width: 50px !important">
                    <a download target="_blank" :href="reports.file" v-if="reports.file"><img src="@/assets/excel.png"
                        alt="" width="20px !important" /></a>
                  </td>
                  <td style="font-size: 15px; text-align: center">
                    {{ new Date(reports.created_at).toLocaleString() }}
                  </td>
                  <td>
                    {{ getUserById(reports.creator) }}
                   
                  </td>
                  <td>{{ reports.wagon_type }}</td>
                  <td v-if="reports.format === 'classic'">Стандартный</td>
                  <td v-if="reports.format === 'disp'">Диспетчерский</td>
                  <td v-if="reports.format === 'legal'">Юридический</td>
                  <td v-if="reports.format === null">—</td>
                  <td>
                    <button style=" height: 100%;
                  vertical-align: middle;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: none;
                " @click="DeleteReportAbandoned(reports.id)">
                <img src="@/assets/delete.png" class="icon-active" alt="">
              </button>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
      id="notif" />
  </div>
</template>

<style>

.close {
  display: none !important;
}

.modal-body {
  background: #efefef !important;
}
</style>

<script>
import api from "@/api/report";
import apiWagon from "@/api/wagonPark";
import { mapState } from "vuex";
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
import FilterReportAbandon from "@/components/filter/FilterReportAbandon.vue";
import { getUserById } from "@/helpers/getAllUsers";

export default {
  name: "ReportAbandoned",
  components: { Notifications, Loader, FilterReportAbandon },
  data() {
    return {
      report_abandoned: "",
      loader: false,

      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      total_objects: "",
      total_objects_report: "",

      throwWagons: [],
      // filter_FilterReportAbandon: {},
      filter: {},
      format: "",
    };
  },
  methods: {
    getUserById(id) {
      const user = getUserById(this.staffGlobal, id);
      if (user[0]) {
        return user[0]?.last_name + " " + user[0]?.first_name;
      }
      return "";
    },

    showModal() {
      this.$refs["ModalTypeReport"].show();
    },
    hideModal() {
      this.$refs["ModalTypeReport"].hide();
    },
    CreateReportAbandones() {
      this.loader = true;
      api
        .getFilterWafonAbadone(this.format, this.filter = {
        ...this.filter, wagon__wagon_type: this.filter.wagon__wagon_type?.name
      })
        .then((response) => {
          this.notifyHead = "Успешно";
          this.notifyMessage = "Задача передана в обработку";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 2000);
          this.hideModal();
          this.loader = false;
          setTimeout(() => this.DownloadReportAbandones(), 2500)
          document.getElementById('input_filter_wagon_dislocation').value = ''
        })
        .catch((error) => {
          this.hideModal();
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Нет данных для отчета";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        });
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
          this.updateFilter(filter)
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Отчет не удален";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        });
    },
    updateFilter(filter) {
      this.filter = filter;
    },
    closeNotification() {
      this.showNotify = false;
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      staffGlobal: (state) => state.auth.users,

    }),
  },
};
</script>
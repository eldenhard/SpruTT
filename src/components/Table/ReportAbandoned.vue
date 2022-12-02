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
          <option value="legal">Юридический</option>
        </select>
        <br />
        <label for="input-filter-staff1" class="label" style="margin-left: 10%">Тип отчета</label>
      </div>

      <!-- <input type="date" v-model="filter.current_station_arrival_end" style="width: 40%"> -->

      <b-button class="mt-2" variant="success" block @click="CreateReportAbandones">Создать отчет
      </b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-button>
    </b-modal>

    <!-- <button
      class="button Action"
      style="
        width: 100%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 17px;
        margin: 2% 0 1%;
      "
      @click="ThrowWagons()"
    >
      Предварительный запрос вагонов
    </button> -->
    <!-- <p class="amount">всего записей: {{ total_objects }}</p> -->
    <!-- <div
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
        <thead class="thead-light" style="background: #e9ecef !important"> -->
    <!-- <div
      style="
        width: 100%;
        overflow-x: auto;
        height: 80vh;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        margin-bottom: 3%;
      "
    >
      <table
        class="table table-sm table-bordered table-hover"
        style="table-layout: fixed"
      >
        <thead class="thead-light" style="background: #e9ecef"> -->
    <!-- <tr>
            <th>Тип вагона</th>
            <th>Номер вагона</th>
            <th>Полигон</th>
            <th>Государство</th>
            <th>Код бросания</th>
            <th>Причина бросания</th>
            <th>Собственник</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="broc in throwWagons" :key="broc.id">
            <td v-if="broc != null">
              {{ broc.wagon_type }}
            </td>
            <td v-if="broc != null">
              {{ broc.wagon }}
            </td>
            <td>
              {{ broc.polygon }}
            </td>
            <td>
              {{ broc.current_country }}
            </td>
            <td v-if="broc.drop != null">
              {{ broc.drop }}
            </td>
            <td v-else>—</td>

            <td v-if="broc.drop != null">
              <textarea
                name=""
                id=""
                cols="20"
                rows="1"
                :value="broc.drop_reason"
              ></textarea>
            </td>
            <td v-else>—</td>

            <td v-if="broc != null">
              {{ broc.wagon_owner }}
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-button class="button Action" @click="showModal()" style="
              background: #ff9f55;
              border: none;
              font-weight: 500;
              width: 100%;
              position: relative;
              left: 50%;
              transform: translate(-50%, 0);
              font-size: 17px;
              margin-top: 3%;
            ">
            Создать отчет</b-button>
        </b-col>

        <b-col>
          <button class="button Action" @click="DownloadReportAbandones()" style="
              width: 100%;
              position: relative;
              left: 50%;
              transform: translate(-50%, 0);
              font-size: 17px;
              margin-top: 3%;
            ">
            Загрузить отчеты
          </button>
        </b-col>
      </b-row>
    </b-container>
    <br /><br />
    <p class="amount">всего отчетов: {{ total_objects_report }}</p>
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
              height: 80vh;
            ">
            <table class="table table-sm table-bordered table-hover" style="margin: 0; border: 1px solid black">
              <thead class="thead-light" style="background: #e9ecef !important">
                <tr>
                  <th>Файл</th>
                  <th>Дата создания</th>
                  <th>Создатель</th>
                  <th>Тип вагона</th>
                  <th>Формат</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reports in report_abandoned" :key="reports.id">
                  <td>
                    <a download target="_blank" :href="reports.file" v-if="reports.file"><img src="@/assets/excel.png"
                        alt="" width="20px !important" /></a>
                  </td>
                  <td style="font-size: 15px; text-align: center">
                    {{ new Date(reports.created_at).toLocaleString() }}
                  </td>
                  <td>
                    {{ reports.creator.last_name }}
                    {{ reports.creator.first_name }}
                  </td>
                  <td>{{ reports.wagon_type }}</td>
                  <td v-if="reports.format === 'classic'">Стандартный</td>
                  <td v-if="reports.format === 'disp'">Диспетчерский</td>
                  <td v-if="reports.format === 'legal'">Юридический</td>
                  <td v-if="reports.format === null">—</td>
                  <td>
                    <button class="Delete" style="
                        height: 100%;
                        height: 20px;
                        vertical-align: middle;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      " @click="DeleteReportAbandoned(reports.id)">
                      Удалить
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
      filter: {
        current_station_arrival_begin: '',
        current_station_arrival_end: '',
      },
      format: "",
    };
  },
  methods: {
    showModal() {
      this.$refs["ModalTypeReport"].show();
      // this.ModalTypeReport = true
    },
    hideModal() {
      // this.ModalTypeReport = false

      this.$refs["ModalTypeReport"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["ModalTypeReport"].toggle("#toggle-btn");
    },

    CreateReportAbandones() {
      this.loader = true;
      api
        .getFilterWafonAbadone(this.format, this.filter)
        .then((response) => {
          // this.report_abandoned = response.data.data
          this.notifyHead = "Успешно";
          this.notifyMessage = "Отчет направлен Вам на почту";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
          this.hideModal();
          this.loader = false;
          this.DownloadReportAbandones();
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Нет данных для отчета";
          this.notifyClass = "wrapper-alert";
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

    // ThrowWagons(url = null, clear = true) {
    //   if (url == null) url = "wagon-park/dislocations?operation=БРОС";
    //   if (clear) this.throwWagons = [];

    //   this.loader = true;

    //   apiWagon
    //     .getWagonsThrow(url, this.filter) //this.filter_abadon)
    //     .then((response) => {
    //       this.throwWagons = [...this.throwWagons, ...response.data.data];
    //       if (response.data.links.next != null) {
    //         this.ThrowWagons(response.data.links.next, false);
    //         this.loader = false;
    //         this.total_objects = response.data.total_objects;
    //       } else {
    //         this.loader = false;
    //         this.total_objects = response.data.total_objects;

    //         // this.throwWagons = response.data.data
    //         // this.notifyHead = 'Успешно'
    //         // this.notifyMessage = 'Данные отфильтрованы'
    //         // this.notifyClass = 'wrapper-success'
    //         // this.showNotify = true
    //         // setTimeout(this.closeNotification, 1500)
    //       }
    //     })
    //     .catch((error) => {
    //       this.loader = false;
    //       this.notifyHead = "Ошибка";
    //       this.notifyMessage = "Данные не получены";
    //       this.notifyClass = "wrapper-alert";
    //       this.showNotify = true;
    //       setTimeout(this.closeNotification, 1500);
    //       // console.log(error.response); вывод ошибок получаемых от сервера
    //     });
    // },
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
    }),
  },
};
</script>
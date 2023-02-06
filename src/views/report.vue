<template>
  <div class="lk">
    <wagonModal
      v-if="showReportModal"
      :OnceReport="OnceReport"
      @close="closeChangeReport"
    ></wagonModal>
    <Loader :loader="loader"></Loader>
    <Modal
      v-if="ShowCreatedReport"
      :CreatedReport="CreatedReport"
      :emplyee ='emplyee'
      @close="closeCreatedReport"
    ></Modal>

    <b-card no-body style="margin-top: 1%">
      <b-tabs pills card vertical style="background: white">
        <b-container class="bv-example-row">
          <b-tab title="Отчеты KPI" active>
            <b-card-text style="min-height: 100vh !important">
              <h2>Отчеты KPI</h2>
              <br /><br />

              <br />
                <button style="width: 100%;
                 background: none;
                  color: black !important;
                   font-size: 18px;
                    height: 25px;
                     position: relative;
                      left: 50%;
                       transform: translate(-50%,0)" @click="showModal()" v-if="this.WatchMark">Для загрузки всех оценок <span style="color: blue;">нажмите сюда</span></button>
              <div class="filterStaff" id="block-answer" style="width: 120% !important; background-color: white !important;">
                <div class="bg">
                  <select
                    class="textarea"
                    id="admin"
                    name="Pwd"
                    v-model="selectedAdminId"
                    style="background: white !important"
                  >
                    <option v-bind:value="admin.id">
                      {{ admin.first_name }} {{ admin.last_name }}
                    </option>
                  </select>
                  <br />
                  <label for="admin" class="label" style="background: white !important">Копия письма: кадровая служба</label>
                </div>

                <div class="bg">
                  <select
                    class="textarea"
                    id="staff"
                    name="Pwd"
                    v-model="emplyee"
                    :class="{ error: this.errors.staff }"
                    style="background: white !important"

                  >
                    <option value="" disabled="disabled" selected="selected">
                      Сотрудник
                    </option>
                    <option
                      v-for="staf in staff"
                      :key="staf.id"
                      :value="staf.id"
                    >
                      {{ staf.first_name }}
                      {{ staf.last_name }}
                    </option>
                  </select>
                  <br />
                  <label for="staff" class="label" style="background: white !important" >Выберите сотрудника</label>
                </div>
              </div>
              <br />
              <div
                v-if="aboutThisReport"
                style="display: flex;
                  justify-content: space-between;
                  margin: 0 0 -2%;
                "
              >
                <p style="color: grey !important">Ранее созданый отчет:</p>
                <p style="color: grey !important">
                  Файл:
                  <a
                    target="_blank"
                    :href="currentUserReport.file"
                    v-if="currentUserReport.file"
                  >
                    <img
                      src="@/assets/excel.png"
                      alt=""
                      width="25px !important"
                    />
                  </a>
                </p>
                <p style="color: grey !important">
                  Доплата: {{ currentUserReport.rate }}%
                </p>
                <p style="color: grey !important">
                  Дата:
                  {{ new Date(currentUserReport.created_at).toLocaleString() }}
                </p>
                <a
                  class="button Action"
                  style="width: 20%; height: 20px; font-size: 15px; color: blue; background: none"
                  @click="MoreCurrentReport()"
                >
                  Подробнее
              </a>
                <!-- <input
                    type="button"
                    class="button Cancel"
                    style="width: 15%"
                    @click="MoreCurrentReport(emplyee)"
                    value="Подробнее"
                  /> -->
              </div>
              <!-- :class="{error: this.errors.answer1}" -->
              <!-- Обернуто в форму чтобы после отправки запроса форма очищалась -->
        <form  id="Anketa">
              <div id="block-answer" style="width: 120% !important">
                <h2>Анкета сотрудника</h2>
                <p class="answer" name="a1">
                  1. Готовность неукоснительно выполнять все производственные
                  задания, порученные руководителем.
                </p>
                <p
                  v-if="this.errors.answer1"
                  style="font-weight: bold; color: red"
                >
                  {{ this.errors.answer1 }}
                </p>

                <input
                  type="radio"
                  name="first-question"
                  id="first-question-1"
                  value="c1"
                  v-model="answer1"
                />
                <label for="first-question-1" style="font-size: 14px"
                  >&nbsp;Неисполнителен, склонен под любыми предлогами избегать
                  получения новых заданий. Были случаи прямого отказа от
                  выполнения заданий.</label
                ><br />

                <input
                  type="radio"
                  name="first-question"
                  id="first-question-2"
                  value="c2"
                  v-model="answer1"
                />
                <label for="first-question-2" style="font-size: 14px"
                  >&nbsp;Низкий уровень исполнительности. Иногда пытается
                  избежать получения новых заданий, умело находя предлоги</label
                ><br />

                <input
                  type="radio"
                  name="first-question"
                  id="first-question-3"
                  value="c3"
                  v-model="answer1"
                />
                <label for="first-question-3" style="font-size: 14px"
                  >&nbsp;Хороший уровень исполнительности, но нельзя сказать,
                  что каждый день без исключений. Берется за выполнение любых
                  производственных заданий, но не всегда охотно.</label
                ><br />

                <input
                  type="radio"
                  name="first-question"
                  id="first-question-4"
                  value="c4"
                  v-model="answer1"
                />
                <label for="first-question-4" style="font-size: 14px"
                  >&nbsp;Безукоризненный уровень исполнительности. Всегда охотно
                  берется за выполнение всех производственных заданий,
                  порученных руководителем.</label
                ><br />
                <hr />
                <p class="answer" name="a2">
                  2. Способность справляться со своими обязанностями и
                  поручениями. Умение выявлять и решать возникающие в работе
                  проблемы
                </p>
                <p
                  v-if="this.errors.answer2"
                  style="font-weight: bold; color: red"
                >
                  {{ this.errors.answer2 }}
                </p>

                <input
                  type="radio"
                  name="second-question"
                  id="second-question-1"
                  value="c1"
                  v-model="answer2"
                />
                <label for="second-question-1" style="font-size: 14px"
                  >&nbsp;Часто не справляется со своими обязанностями и
                  поручениями или заданиями. Не умеет выявлять проблемы и с
                  трудом решает их</label
                ><br />

                <input
                  type="radio"
                  name="second-question"
                  id="second-question-2"
                  value="c2"
                  v-model="answer2"
                />
                <label for="second-question-2" style="font-size: 14px"
                  >&nbsp;Как правило справляется со своими обязанностями, но
                  порой не выполняет их так как надо или с трудом решает
                  возникающие проблемы</label
                ><br />

                <input
                  type="radio"
                  name="second-question"
                  id="second-question-3"
                  value="c3"
                  v-model="answer2"
                />
                <label for="second-question-3" style="font-size: 14px">
                  &nbsp;Практически всегда хорошо справляется со всеми
                  обязанностями, умело решает проблемы, но нельзя сказать, что
                  каждый день без исключений</label
                ><br />

                <input
                  type="radio"
                  name="second-question"
                  id="second-question-4"
                  value="c4"
                  v-model="answer2"
                />
                <label for="second-question-4" style="font-size: 14px">
                  &nbsp;Проявляет отличную способность справляться со всеми
                  обязанностями и производственными заданиями. Всегда умело
                  выявляет и быстро решает возникающие проблемы</label
                ><br />

                <hr />

                <p class="answer" name="a3">
                  3. Компетентность. Знание используемых приемов и методов
                  работы и умение в точности им следовать, наличие необходимых
                  навыков
                </p>
                <p
                  v-if="this.errors.answer3"
                  style="font-weight: bold; color: red"
                >
                  {{ this.errors.answer3 }}
                </p>

                <input
                  type="radio"
                  name="third-question"
                  id="third-question-1"
                  value="c1"
                  v-model="answer3"
                />
                <label for="third-question-1" style="font-size: 14px"
                  >&nbsp;Некомпетентен. Не знает используемые приемы и методы
                  работы и не стремится быстро освоить их</label
                ><br />

                <input
                  type="radio"
                  name="third-question"
                  id="third-question-2"
                  value="c2"
                  v-model="answer3"
                />
                <label for="third-question-2" style="font-size: 14px"
                  >&nbsp;Недостаточно хорошо знает нужные приемы работы, пока
                  имеет слабые навыки и медленно их развивает</label
                ><br />

                <input
                  type="radio"
                  name="third-question"
                  id="third-question-3"
                  value="c3"
                  v-model="answer3"
                />
                <label for="third-question-3" style="font-size: 14px"
                  >&nbsp;Хорошо знает используемые методы работы, но нельзя
                  сказать, что всегда в точности следует им</label
                ><br />

                <input
                  type="radio"
                  name="third-question"
                  id="third-question-4"
                  value="c4"
                  v-model="answer3"
                />
                <label for="third-question-4" style="font-size: 14px"
                  >&nbsp;Компетентен. Отлично знает все методы работы и
                  неукоснительно следует им каждый рабочий день</label
                ><br />
                <hr />

                <p class="answer" name="a4">
                  4. Заинтересованность и активность в вопросах повышения
                  качества, производительности труда и освоения эффективных
                  методов работы
                </p>
                <p
                  v-if="this.errors.answer4"
                  style="font-weight: bold; color: red"
                >
                  {{ this.errors.answer4 }}
                </p>

                <input
                  type="radio"
                  name="fourth-question"
                  id="fourth-question-1"
                  value="c1"
                  v-model="answer4"
                />
                <label for="fourth-question-1" style="font-size: 14px"
                  >&nbsp;Часто сопротивляется внедрению новых технологий,
                  методов работы, направленных на повышение качества и
                  производительности труда</label
                ><br />

                <input
                  type="radio"
                  name="fourth-question"
                  id="fourth-question-2"
                  value="c2"
                  v-model="answer4"
                />
                <label for="fourth-question-2" style="font-size: 14px"
                  >&nbsp;Не сопротивляется, но и не проявляет интереса к
                  вопросам повышения качества и производительности труда</label
                ><br />

                <input
                  type="radio"
                  name="fourth-question"
                  id="fourth-question-3"
                  value="c3"
                  v-model="answer4"
                />
                <label for="fourth-question-3" style="font-size: 14px"
                  >&nbsp;Всегда поддерживает все нововведения, помогает
                  осваивать новые методы работы, но не в достаточной степени
                  активно</label
                ><br />

                <input
                  type="radio"
                  name="fourth-question"
                  id="fourth-question-4"
                  value="c4"
                  v-model="answer4"
                />
                <label for="fourth-question-4" style="font-size: 14px">
                  &nbsp;Не только активно помогает осваивать новые методы
                  работы, но и сам часто выдвигает различные рационализаторские
                  предложения</label
                ><br />
                <hr />

                <p class="answer" name="a5">
                  5. Выполнение планового объема работ по выданным
                  производственным заданиям.
                </p>
                <p
                  v-if="this.errors.answer5"
                  style="font-weight: bold; color: red"
                >
                  {{ this.errors.answer5 }}
                </p>

                <input
                  type="radio"
                  name="fifth-question"
                  id="fifth-question-1"
                  value="c1"
                  v-model="answer5"
                />
                <label for="fifth-question-1" style="font-size: 14px"
                  >&nbsp;Не выполнялись запланированные работы по заданиям в
                  срок</label
                ><br />

                <input
                  type="radio"
                  name="fifth-question"
                  id="fifth-question-2"
                  value="c2"
                  v-model="answer5"
                />
                <label for="fifth-question-2" style="font-size: 14px"
                  >&nbsp;Имели место случаи недовы-полнения в полном объеме
                  запланированных работ по заданиям</label
                ><br />

                <input
                  type="radio"
                  name="fifth-question"
                  id="fifth-question-3"
                  value="c3"
                  v-model="answer5"
                />
                <label for="fifth-question-3" style="font-size: 14px"
                  >&nbsp;Выполнялся весь объем запланированных работ, но были
                  случаи нарушения сроков</label
                ><br />

                <input
                  type="radio"
                  name="fifth-question"
                  id="fifth-question-4"
                  value="c4"
                  v-model="answer5"
                />
                <label for="fifth-question-4" style="font-size: 14px"
                  >&nbsp;Все запланированные работы по заданиям выполнялись в
                  полном объеме и в установленные сроки </label
                ><br />
                <hr />

                <p class="answer" name="a6">
                  6. Качество выполненных работ, поручений.
                </p>
                <p
                  v-if="this.errors.answer6"
                  style="font-weight: bold; color: red"
                >
                  {{ this.errors.answer6 }}
                </p>

                <input
                  type="radio"
                  name="sixth-question"
                  id="sixth-question-1"
                  value="c1"
                  v-model="answer6"
                />
                <label for="sixth-question-1" style="font-size: 14px"
                  >&nbsp;Работы выполнялись некачественно. Имелись случаи брака
                  и возврата заданий на доработку</label
                ><br />

                <input
                  type="radio"
                  name="sixth-question"
                  id="sixth-question-2"
                  value="c2"
                  v-model="answer6"
                />
                <label for="sixth-question-2" style="font-size: 14px"
                  >&nbsp;Хотя и очень редки случаи брака в работе, но были
                  погрешности и недоработки</label
                ><br />

                <input
                  type="radio"
                  name="sixth-question"
                  id="sixth-question-3"
                  value="c3"
                  v-model="answer6"
                />
                <label for="sixth-question-3" style="font-size: 14px"
                  >&nbsp;Работы выполнялись достаточно качественно, но имели
                  место небольшие погрешности.</label
                ><br />

                <input
                  type="radio"
                  name="sixth-question"
                  id="sixth-question-4"
                  value="c4"
                  v-model="answer6"
                />
                <label for="sixth-question-4" style="font-size: 14px"
                  >&nbsp;Работы выполнялись безукоризненно, аккуратно, четко,
                  без брака, всегда в строгом соответствии со стандартами</label
                ><br />
                <hr />

                <br />
                <button
                  class="Accept button"
                  style="
                    position: relative;
                    left: 50%;
                    width: 90%;
                    transform: translate(-50%, 0);
                    margin-bottom: 2%;
                    margin-top: 3%;
                    height: 80px;
                    font-size: 22px;
                  "
                  type="submit"
                  @click="Send()"
                >
                  Отправить
                </button>
              </div>
            </form>
              <br /><br /><br />

              <br /><br />

              <div
                v-if="allReportHistory"
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
                <h5 align="center">Созданные Вами отчеты</h5>
                <div style="overflow-x: auto">
                  <table class="table table-sm table-bordered table-hover">
                    <thead class="thead-light">
                      <tr>
                        <th>Кто создал</th>
                        <th>На кого создано</th>
                        <th>Дата создания</th>
                        <th>Дата последнего изменения</th>
                        <th>Доплата</th>
                        <th>Файл</th>
                        <th>Действие</th>
                        <th>Удалить</th>
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
                        <td>
                          {{ new Date(reports.created_at).toLocaleString()
                          }}<br />
                        </td>
                        <td>
                          {{ new Date(reports.updated_at).toLocaleString()
                          }}<br />
                        </td>
                        <td>{{ reports.rate }} %<br /></td>
                        <td>
                          <a
                            download
                            target="_blank"
                            :href="reports.file"
                            v-if="reports.file"
                            ><img
                              src="../assets/excel.png"
                              alt=""
                              width="50px!important"
                          /></a>
                        </td>
                        <td>
                          <button
                            class="Request"
                            style="
                              height: 100%;
                              vertical-align: middle;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                            "
                            @click="OpenChangeReport(reports.id)"
                          >
                            Подробнее
                          </button>
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
                <br /><br />

                <h5 align="center">Созданные на Вас отчеты</h5>
                <div style="overflow-x: auto">
                  <table class="table table-sm table-bordered table-hover">
                    <thead class="thead-light">
                      <tr>
                        <th>Кто создал</th>
                        <th>На кого создано</th>
                        <th>Дата создания</th>
                        <th>Дата последнего изменения</th>
                        <th>Доплата</th>
                        <th>Файл</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="reporte in reports_employee" :key="reporte.id">
                        <td>
                          {{ getUserById(reporte.creator) }}
                        </td>
                        <td>
                          {{ getUserById(reporte.employee) }}
                          <br />
                        </td>
                        <td style="font-size: 14px; text-align: center">
                          {{ new Date(reporte.created_at).toLocaleString()
                          }}<br />
                        </td>
                        <td style="font-size: 14px; text-align: center">
                          {{ new Date(reporte.updated_at).toLocaleString()
                          }}<br />
                        </td>
                        <td>{{ reporte.rate }} % <br /></td>
                        <td>
                          <a
                            download
                            target="_blank"
                            :href="reporte.file"
                            v-if="reporte.file"
                            ><img
                              src="../assets/excel.png"
                              alt=""
                              width="20px !important"
                          /></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </b-card-text>
          </b-tab>

          <b-tab title="Отчеты BDR">
            <b-card-text>
              <BDRreport></BDRreport>
            </b-card-text>
          </b-tab>
          <b-tab title="Отчеты БРОС. вагоны">
            <b-card-text>
              <ReportAbandoned></ReportAbandoned>
            </b-card-text>
          </b-tab>
        </b-container>
      </b-tabs>
    </b-card>

    <!-- Модальное окно для дат -->
    <b-modal ref="my-modal" hide-footer title="Выберите диапозон дат">
      <div class="d-block text-center">
        <label for="a1">Начало периода</label>
        <input
          type="date"
          class="textarea"
          id="a1"
          v-model="period_begin"
          style="width: 90%"
        />

        <label for="a2" style="margin-top: 5%">Конец периода</label>
        <input
          type="date"
          class="textarea"
          id="a2"
          v-model="period_end"
          style="width: 90%"
        />
      </div>
      <br />
      <!-- http://10.1.5.20/api/reports/kpi/get-all-last?date_begin=${this.period_begin}&date_end=${this.period_end} -->

      <b-button
        class="button"
        variant="success"
        style="height: 50px"
        @click="getMark()"
        >Создать</b-button
      >

      <b-button
        class="button"
        variant="danger"
        style="height: 50px; margin: 5% 0"
        @click="hideModal"
        >Закрыть</b-button
      >
    </b-modal>

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
import { mapState } from "vuex";
import api from "@/api/report";
import wagonModal from "@/components/modalReport/modal.vue";
import Modal from "@/components/ui/Modal.vue";
import BDRreport from "@/views/BDRreport.vue";
import ReportAbandoned from "@/components/Table/ReportAbandoned.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
import { getUserById } from "@/helpers/getAllUsers";

export default {
  name: "report",
  components: {
    wagonModal,
    BDRreport,
    Notifications,
    Loader,
    ReportAbandoned,
    Modal,
  },
  title: "Отчеты",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      staffGlobal: (state) => state.auth.users,
    }),
  //   normalizedEmplyee: function () {
  //   return this.emplyee
  // }
  },
  data() {
    return {
      emplyee: "",
      selectedAdminId: "104",
      WatchMark: false,
      staff: [],
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      answer5: "",
      answer6: "",

      answer11: "",
      answer22: "",
      answer33: "",
      answer44: "",
      answer55: "",
      answer66: "",
      btnName: "Создать отчет по KPI сотрудника",
      downloadReport: "Загрузить отчеты",
      current_staff: "",
      admin: [],
      reports_creator: [],
      reports_employee: [],
      showReportModal: false,
      ShowCreatedReport: false,
      loader: false,
      OnceReport: null,
      CreatedReport: null,
      allReportHistory: false,
      all_grades: "",
      file_port: false,
      errors: {},

      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",

      aboutThisReport: false,
      currentUserReport: "",
      period_begin: "",
      period_end: "",
    };
  },
  watch: {
    emplyee() {
      this.loader = true;
      api
        .getLastDataReports(this.emplyee)
        .then((response) => {
          if (response.data == "404") {
            this.aboutThisReport = false;
            this.loader = false;
          } else {
            this.aboutThisReport = true;
            this.currentUserReport = response.data;
            this.loader = false;
          }
        })
        .catch((error) => {
          (this.loader = false),
            (notifyHead = "Ошибка"),
            (notifyMessage = "Данные не получены"),
            (this.notifyClass = "wrapper-error");
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
          showNotify = true;
        });
    },
  },

  mounted() {
    // console.log(this.date)
    this.loader = true;
    // api.getUsers()
    const pretoken = JSON.parse(localStorage.getItem("vuex"));
    const token = pretoken.auth.user.token;
    const preid = JSON.parse(localStorage.getItem("vuex"));
    const id = preid.auth.uid;
    if(id == 104 || id == 102 || id == 1){
      this.WatchMark = true
    } else {
      this.WatchMark = false

    }
    // Получить все отчеты созданные сотрудником
    // fetch("http://10.1.5.20/api/reports/kpi?" + `creator=${id}`, {
      fetch('/api/reports/kpi?'+ `creator=${id}`, {

      headers: {
        Authorization: `Basic ${token}`,
      },
      method: "GET",
    }).then((response) => {
      if (response.ok) {
        return response.json().then((r) => {
          this.reports_creator = r.data;
        });
      } else {
        console.log("NOT OK");
      }
    }),
      // Получить все отчеты созданные на сотрудника
      // fetch("http://10.1.5.20/api/reports/kpi?" + `employee=${id}`, {
        fetch('/api/reports/kpi?'+ `employee=${id}`, {

        headers: {
          Authorization: `Basic ${token}`,
        },
        method: "GET",
      }).then((response) => {
        if (response.ok) {
          return response.json().then((r) => {
            this.reports_employee = r.data;
          });
        } else {
          console.log("NOT OK");
        }
      }),
      // получить данные по сотруднику за полсдение 2 месяца
      // fetch(
      //   "http://10.1.5.20/api/personal/users/?page_size=200&manager=" +
      //     `${id}` +
      //     "&last_kpi_graded__lte=" +
      //     `${new Date(new Date().setDate(new Date().getDate() - 60))
      //       .toISOString()
      //       .substring(0, 10)}`,
      //   {
          fetch('/api/personal/users/?page_size=200&manager=' + `${id}` + '&last_kpi_graded__lte=' + `${new Date(new Date().setDate(new Date().getDate() - 60)).toISOString().substring(0, 10)}`, {

          headers: {
            Authorization: `Basic ${token}`,
          },
          method: "GET",
        }
      ).then((response) => {
        if (response.ok) {
          return response.json().then((r) => {
            this.staff = r.data;
            for (let i in this.staff) {
              this.current_staff = this.staff[i].id;
            }

            this.loader = false;
          });
        } else {
          console.log("NOT OK");
        }
      }),
      // получить данные по начальнику кадровой службы
      api.getUser104().then((response) => {
        this.admin = response.data;
      });
    api.getAllKPI().then((response) => {
      this.all_reports = response.data;
      this.loader = false;
    });

    document.title = "Отчеты";
  },
  methods: {
    getMark() {
      window.location.href = `http://10.1.5.20/api/reports/kpi/get-all-last?date_begin=${this.period_begin}&date_end=${this.period_end}`;
      this.hideModal();
    },
    showModal() {
      const preid = JSON.parse(localStorage.getItem("vuex"));
      const id = preid.auth.uid;
      if (id == 104 || id == 102 || id == 1) {
        this.$refs["my-modal"].show();
      } else {
        this.notifyHead = "Ошибка";
        this.notifyMessage = "У вас нет прав доступа";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
      }
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    getUserById(id) {
      const user = getUserById(this.staffGlobal, id);
      if (user[0]) {
        return user[0]?.last_name + " " + user[0]?.first_name;
      }
      return "";
    },
    MoreCurrentReport() {
      this.ShowCreatedReport = true;
  },

    allGrades() {
      this.loader = true;
      api.getAllgrades().then((response) => {
        this.all_grades = response.data;
        window.open(this.all_grades);
        this.loader = false;
      });
    },
    OpenReport() {
      const pretoken = JSON.parse(localStorage.getItem("vuex"));
      const token = pretoken.auth.user.token;
      const preid = JSON.parse(localStorage.getItem("vuex"));

      const id = preid.auth.uid;
      this.loader = true;
      this.allReportHistory = true;
      this.downloadReport = "Загрузить отчеты";
      // fetch("http://10.1.5.20/api/reports/kpi?" + `creator=${id}`, {
        fetch('/api/reports/kpi?'+ `creator=${id}`, {

        headers: {
          Authorization: `Basic ${token}`,
        },
        method: "GET",
      }).then((response) => {
        if (response.ok) {
          return response.json().then((r) => {
            this.reports_creator = r.data;
          });
        } else {
          console.log("NOT OK");
        }
      }),
        // fetch("http://10.1.5.20/api/reports/kpi?" + `employee=${id}`, {
          fetch('/api/reports/kpi?'+ `employee=${id}`, {

          headers: {
            Authorization: `Basic ${token}`,
          },
          method: "GET",
        }).then((response) => {
          if (response.ok) {
            return response.json().then((r) => {
              this.reports_employee = r.data;
              this.loader = false;
            });
          } else {
            console.log("NOT OK");
          }
        });
    },
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
    },
    closeCreatedReport() {
      this.ShowCreatedReport = false;
    },

    Send() {
      event.preventDefault();
      const pretoken = JSON.parse(localStorage.getItem("vuex"));
      const token = pretoken.auth.user.token;
      // document.getElementById('loading-page-lk').style.display = 'block'
      //let admin = document.getElementById('admin').value.split(' ')[0]
      let admin = this.selectedAdminId;
      //let staff = document.getElementById('staff').value.split(' ')[0]
      let staff = this.emplyee;
      this.errors = {};

      if (this.answer1 == "") {
        this.errors = { ...this.errors, answer1: "Выберите ответ" };
      }
      if (this.answer2 == "") {
        this.errors = { ...this.errors, answer2: "Выберите ответ" };
      }

      if (this.answer3 == "") {
        this.errors = { ...this.errors, answer3: "Выберите ответ" };
      }
      if (this.answer4 == "") {
        this.errors = { ...this.errors, answer4: "Выберите ответ" };
      }
      if (this.answer5 == "") {
        this.errors = { ...this.errors, answer5: "Выберите ответ" };
      }
      if (this.answer6 == "") {
        this.errors = { ...this.errors, answer6: "Выберите ответ" };
      }
      if (this.emplyee == "") {
        this.errors = { ...this.errors, staff: "Выберите ответ" };
      }

      if (!Object.keys(this.errors).length) {
        this.loader = true;
        // fetch("http://10.1.5.20/api/reports/kpi/", {
          fetch('/api/reports/kpi/', {

          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Basic ${token}`,
          },
          body: JSON.stringify({
            results: {
              a1: this.answer1,
              a2: this.answer2,
              a3: this.answer3,
              a4: this.answer4,
              a5: this.answer5,
              a6: this.answer6,
            },
            employee: staff,
            manager: admin,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json().then((data) => {
                this.loader = false;

                this.notifyHead = "Успешно";
                this.notifyMessage = "Ваша анкета отправлена";
                this.notifyClass = "wrapper-success";
                this.showNotify = true;
                setTimeout(this.closeNotification, 1500);
                document.getElementById("Anketa").reset();
              });
            } else {
              this.loader = false;
              this.notifyHead = "Ошибка";
              this.notifyMessage = "У вас нет прав доступа на предоставление";
              this.notifyClass = "wrapper-error";
              this.showNotify = true;
              setTimeout(this.closeNotification, 1500);
            }
          })
          .catch((error) => {
            this.loader = false;
            this.notifyHead = "Успешно";
            this.notifyMessage = "Ваша анкета отправлена";
            this.notifyClass = "wrapper-success";
            this.showNotify = true;
            setTimeout(this.closeNotification, 1500);
            document.getElementById("Anketa").reset();
          });
      } else {
        this.loader = false;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Заполните все поля анкеты";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
        // TODO: Нотификатор
      }
    },
    closeNotification() {
      this.showNotify = false;
    },

    DeleteReport(id) {
      this.loader = true;
      api.deleteReport(id).then((response) => {
        window.location.reload();
        this.loader = false;
      });
    },
  },
};
</script>

<style>
.form-btn {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  margin-bottom: 2%;
  margin-top: 3%;
  height: 80px;
  font-size: 22px;
}

#block-answer {
  border-radius: 2px;
  background: #ffffff;
  box-shadow: 10px 10px 30px #d0d0d0, -10px -10px 30px #ffffff;
  width: 90%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 2%;
  padding: 3% 2%;
}

.staffs {
  margin-left: 25%;
}

.borough {
  font-size: 17px;
}

.form-btn {
  width: 90%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  margin-bottom: 2%;
  margin-top: 3%;
  height: 80px;
  font-size: 22px;
}

#admin,
#staff {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.answer {
  text-align: left;
  padding-top: 5%;
  font-size: 18px;
  font-weight: 600;
}

.answer.error {
  color: red;
}

.error {
  color: red;
  font-weight: bold;
}

.lk h2 {
  text-align: center;
  padding-top: 2%;
}

.form {
  width: 70%;
  border: 1px solid black;
}

.select-form {
  width: 50%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 2%;
}

.description-form {
  text-align: center;
}

.block-answer h2 {
  text-align: center;
}

.tablesRep {
  width: 100%;
}

.tablesRep2 {
  width: 100%;
}

.tableRep {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 17px;
  width: 100%;
}

.phone {
  display: none;
}

@media screen and (max-width: 550px) {
  .table {
    width: 90% !important;
    overflow-x: auto;
  }

  .Action {
    width: 90% !important;
  }
}
</style>

    
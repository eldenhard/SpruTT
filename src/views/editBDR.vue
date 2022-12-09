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
      <table
        class="table table-sm table-bordered table-hover"
        style="margin: 0; border: 1px solid black"
      >
        <thead class="thead-light" style="background: #e9ecef !important">
          <tr>
            <th>№</th>
            <th>Название</th>
            <th>План</th>
            <th>Ожидаемый факт</th>
            <th>Отклонение</th>
            <th>Комментарии по отклонениям</th>
            <th>Ответственный за статью в целом</th>
            <th>Лицо, которому Ответственный делегировал заполнение</th>
            <th>Заполняет план</th>
            <th>Заполняет ожидаемый факт</th>
            <th>Дата последнего обновления</th>
            <!-- <th>Действие</th> -->
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
            <td>{{ bdr.number }}</td>
            <td clas="lc groups">{{ bdr.name }}</td>
            <td>
              <input
                @input="calc"
                class="input-filter"
                v-model="data[index].plan"
                type="number"
                :disabled="bdr.is_active === false"
                :class="{ disable: bdr.is_active === false }"
              />
            </td>
            <td>
              <input
                @input="calc"
                class="input-filter"
                v-model="data[index].fact"
                type="number"
                :disabled="bdr.is_active === false"
                :class="{ disable: bdr.is_active === false }"
              />
            </td>
            <td
              style="background: #d8d8d8"
              :class="{ negative: data[index].deviation < 0 }"
            >
              <!-- <input class="input-filter" v-model="data[index].deviation" /> -->
              {{ data[index].deviation }}
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
              {{ data.responsible_users }}
              <!-- <MultiSelect :selected="data[index].responsible_users" :variants="staffGlobal"></MultiSelect> -->
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
                v-for="user in data[index].filling_plan_users"
                :key="user"
                style="margin-bottom: 5px"
              >
                {{ getName(user) }}<br
              /></span>

              <!-- <MultiSelect :selected="data[index].filling_plan_users" :variants="staffGlobal"></MultiSelect> -->
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

              <!-- <MultiSelect :selected="data[index].filling_users" :variants="staffGlobal"></MultiSelect> -->
            </td>
            <!-- <td class="td-btr"><input class="input-filter" v-model="data[index].filling_users"></td> -->
            <td class="td-btr" style="font-weight: normal !important">
              {{ new Date(bdr.updated_at).toLocaleString() }}
            </td>
            <!-- <td class="td-btr">
              <button
                class="Accept"
                style="height: 100%"
                @click="saveBDRchange(index, bdr.id)"
              >
                Сохранить
              </button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>

    <button
      class="Accept"
      style="
        width: 95%;
        margin: 2% 0;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
      @click="saveChange()"
    >
      Сохранить отчет
    </button>

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
      Сохранить в файл
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
import { switch_deviation } from "@/helpers/switchBDR";
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
      // result: ''
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
    // result() {
    //   this.result = this.plan + this.fact
    // }
  },

  mounted() {
    this.loader = true;
    document.addEventListener("keydown", this.listen);

    api.getBDRreportByID(this.$route.params.id).then((response) => {
      this.all_table_data = response.data.bdr_report_rows;
      this.loader = false;
      this.all_table_data.forEach((el) => {
        el = switch_deviation(el);
        if (el.number === 0) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [97],
          });
        }
        if (el.number === 1) {
          Object.assign(el, {
            ...el,
            responsible_users: [67, 107],
            filling_plan_users: [67, 107],
            filling_users: [67, 107],
          });
        }
        if (el.number === 2) {
          Object.assign(el, {
            ...el,
            responsible_users: [67],
            filling_plan_users: [67],
            filling_users: [67],
          });
        }
        if (el.number === 3) {
          Object.assign(el, {
            ...el,
            responsible_users: [67],
            filling_plan_users: [67],
            filling_users: [67],
          });
        }
        if (el.number === 4) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 5) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 6) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107, 97],
          });
        }
        if (el.number === 7) {
          Object.assign(el, {
            ...el,
            responsible_users: [109],
            filling_plan_users: [109],
            filling_users: [109, 97],
          });
        }
        if (el.number === 8) {
          Object.assign(el, {
            ...el,
            responsible_users: [67, 107],
            filling_plan_users: [67, 107],
            filling_users: [67, 107],
          });
        }
        if (el.number === 9) {
          Object.assign(el, {
            ...el,
            responsible_users: [67],
            filling_plan_users: [67],
            filling_users: [67],
          });
        }
        if (el.number === 10) {
          Object.assign(el, {
            ...el,
            responsible_users: [67],
            filling_plan_users: [67],
            filling_users: [67],
          });
        }
        if (el.number === 11) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 12) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 13) {
          Object.assign(el, {
            ...el,
            responsible_users: [109],
            filling_plan_users: [109],
            filling_users: [97, 107],
          });
        }
        if (el.number === 14) {
          Object.assign(el, {
            ...el,
            responsible_users: [109, 107],
            filling_plan_users: [109, 107],
            filling_users: [97, 107],
          });
        }
        if (el.number === 15) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 16) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 17) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 18) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 19) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 20) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 21) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 22) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 23) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 24) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 25) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 26) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 27) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 28) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 29) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 30) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 31) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 32) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 33) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [8],
            filling_users: [8],
          });
        }
        if (el.number === 34) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [8],
            filling_users: [8],
          });
        }
        if (el.number === 35) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [8],
            filling_users: [8],
          });
        }
        if (el.number === 36) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [8],
            filling_users: [8],
          });
        }
        if (el.number === 37) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [8],
            filling_users: [8],
          });
        }
        if (el.number === 38) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [8],
            filling_users: [8],
          });
        }
        if (el.number === 39) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [8],
            filling_users: [8],
          });
        }
        if (el.number === 40) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [8],
            filling_users: [8],
          });
        }
        if (el.number === 41) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [8],
            filling_users: [8],
          });
        }
        if (el.number === 42) {
          Object.assign(el, {
            ...el,
            responsible_users: [107, 109, 113, 69],
            filling_plan_users: [107, 109, 113, 69],
            filling_users: [107, 109, 113, 69],
          });
        }
        if (el.number === 43) {
          Object.assign(el, {
            ...el,
            responsible_users: [107, 113, 69],
            filling_plan_users: [107, 113, 69],
            filling_users: [107, 113, 69],
          });
        }
        if (el.number === 44) {
          Object.assign(el, {
            ...el,
            responsible_users: [109, 113, 69],
            filling_plan_users: [109, 113, 69],
            filling_users: [109, 113, 69],
          });
        }
        if (el.number === 45) {
          Object.assign(el, {
            ...el,
            responsible_users: [112],
            filling_plan_users: [35],
            filling_users: [35],
          });
        }
        if (el.number === 46) {
          Object.assign(el, {
            ...el,
            responsible_users: [112],
            filling_plan_users: [35],
            filling_users: [35],
          });
        }
        if (el.number === 47) {
          Object.assign(el, {
            ...el,
            responsible_users: [112],
            filling_plan_users: [35],
            filling_users: [35],
          });
        }
        if (el.number === 48) {
          Object.assign(el, {
            ...el,
            responsible_users: [112],
            filling_plan_users: [35],
            filling_users: [35],
          });
        }
        if (el.number === 49) {
          Object.assign(el, {
            ...el,
            responsible_users: [63],
            filling_plan_users: [63],
            filling_users: [63],
          });
        }
        if (el.number === 50) {
          Object.assign(el, {
            ...el,
            responsible_users: [190],
            filling_plan_users: [15],
            filling_users: [15],
          });
        }
        if (el.number === 51) {
          Object.assign(el, {
            ...el,
            responsible_users: [190],
            filling_plan_users: [94],
            filling_users: [94],
          });
        }
        if (el.number === 52) {
          Object.assign(el, {
            ...el,
            responsible_users: [67, 107, 113],
            filling_plan_users: [67, 107, 113],
            filling_users: [67, 107, 113],
          });
        }
        if (el.number === 53) {
          Object.assign(el, {
            ...el,
            responsible_users: [67, 107, 113],
            filling_plan_users: [67, 107, 113],
            filling_users: [67, 107, 113],
          });
        }
        if (el.number === 54) {
          Object.assign(el, {
            ...el,
            responsible_users: [67],
            filling_plan_users: [67],
            filling_users: [67],
          });
        }
        if (el.number === 55) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 56) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 57) {
          Object.assign(el, {
            ...el,
            responsible_users: [67, 107, 113],
            filling_plan_users: [67, 107, 113],
            filling_users: [67, 107, 113],
          });
        }
        if (el.number === 58) {
          Object.assign(el, {
            ...el,
            responsible_users: [67],
            filling_plan_users: [67],
            filling_users: [67],
          });
        }
        if (el.number === 59) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 60) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 62) {
          Object.assign(el, {
            ...el,
            responsible_users: [107, 109, 63],
            filling_plan_users: [107, 109, 63],
            filling_users: [107, 109, 63],
          });
        }
        if (el.number === 63) {
          Object.assign(el, {
            ...el,
            responsible_users: [107, 109, 63],
            filling_plan_users: [107, 109, 63],
            filling_users: [107, 109, 63],
          });
        }
        if (el.number === 64) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 65) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 66) {
          Object.assign(el, {
            ...el,
            responsible_users: [63],
            filling_plan_users: [63],
            filling_users: [63],
          });
        }
        if (el.number === 67) {
          Object.assign(el, {
            ...el,
            responsible_users: [107, 109, 63],
            filling_plan_users: [107, 109, 63],
            filling_users: [107, 109, 63],
          });
        }
        if (el.number === 68) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 69) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [107],
          });
        }
        if (el.number === 70) {
          Object.assign(el, {
            ...el,
            responsible_users: [63],
            filling_plan_users: [63],
            filling_users: [63],
          });
        }
        if (el.number === 72) {
          Object.assign(el, {
            ...el,
            responsible_users: [190, 67, 113, 69],
            filling_plan_users: [190, 67, 113, 69],
            filling_users: [190, 67, 113, 69],
          });
        }
        if (el.number === 73) {
          Object.assign(el, {
            ...el,
            responsible_users: [190],
            filling_plan_users: [94],
            filling_users: [94],
          });
        }
        if (el.number === 74) {
          Object.assign(el, {
            ...el,
            responsible_users: [190],
            filling_plan_users: [71],
            filling_users: [71],
          });
        }
        if (el.number === 75) {
          Object.assign(el, {
            ...el,
            responsible_users: [190],
            filling_plan_users: [71],
            filling_users: [71],
          });
        }
        if (el.number === 76) {
          Object.assign(el, {
            ...el,
            responsible_users: [190],
            filling_plan_users: [94],
            filling_users: [94],
          });
        }
        if (el.number === 77) {
          Object.assign(el, {
            ...el,
            responsible_users: [190],
            filling_plan_users: [71],
            filling_users: [71],
          });
        }
        if (el.number === 78) {
          Object.assign(el, {
            ...el,
            responsible_users: [67, 113, 69],
            filling_plan_users: [67, 113, 69],
            filling_users: [67, 113, 69],
          });
        }
        if (el.number === 79) {
          Object.assign(el, {
            ...el,
            responsible_users: [67],
            filling_plan_users: [67],
            filling_users: [67],
          });
        }
        if (el.number === 80) {
          Object.assign(el, {
            ...el,
            responsible_users: [113],
            filling_plan_users: [113],
            filling_users: [113],
          });
        }
        if (el.number === 81) {
          Object.assign(el, {
            ...el,
            responsible_users: [69],
            filling_plan_users: [69],
            filling_users: [69],
          });
        }
        if (el.number === 83) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [97],
          });
        }
        if (el.number === 84) {
          Object.assign(el, {
            ...el,
            responsible_users: [109],
            filling_plan_users: [109],
            filling_users: [97],
          });
        }
        if (el.number === 85) {
          Object.assign(el, {
            ...el,
            responsible_users: [107],
            filling_plan_users: [107],
            filling_users: [97],
          });
        }
        if (el.number === 86) {
          Object.assign(el, {
            ...el,
            responsible_users: [109],
            filling_plan_users: [109],
            filling_users: [97],
          });
        }
        if (el.number === 87) {
          Object.assign(el, {
            ...el,
            responsible_users: [107, 109],
            filling_plan_users: [107, 109],
            filling_users: [97],
          });
        }
        this.data = { ...this.data, [el.number]: el };
      });
      this.calc();
    });
  },
  methods: {
    listen(e) {
      if (e.keyCode == 83 && e.ctrlKey) {
        console.log(e);
        e.preventDefault();
        this.saveChange();
      }
    },
    calc() {
      for (let el in this.data) {
        // console.log(this.data[el].plan_formula);
        // console.log('AAAAAAAAAA', this.data[2].plan , this.data[3].plan, this.data[4].plan, this.data[5].plan);
        try {
          let res = Number(eval(this.data[el].plan_formula));
          if (isNaN(res)) {
            this.data[el].plan = 0;
          } else {
            this.data[el].plan = Number(res.toFixed(2));
          }
        } catch (error) {
          console.log("error", error);
          this.data[el].plan = 0;
        }

        try {
          let res = Number(eval(this.data[el].fact_formula));
          if (isNaN(res)) {
            this.data[el].fact = 0;
          } else {
            this.data[el].fact = Number(res.toFixed(2));
          }
        } catch {
          this.data[el].fact = 0;
        }

        try {
          let res = Number(this.data[el].fact - this.data[el].plan);
          if (isNaN(res)) {
            this.data[el].deviation = 0;
          } else {
            this.data[el].deviation = Number(res.toFixed(2));
          }
        } catch {
          this.data[el].deviation = 0;
        }
      }
    },
    saveChange() {
      this.loader = true;
      let data_to_send = [];

      for (let el in this.data) {
        data_to_send.push(this.data[el]);
      }

      api.changeBDRreport(data_to_send).then((response) => {
        this.notifyHead = "Успешно";
        this.notifyMessage = "Отчет сохранен";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
        this.loader = false;
      });
    },
    getName(id) {
      const user = getUserById(this.staffGlobal, id);
      // console.log(user);
      return user[0].first_name + " " + user[0].last_name;
    },

    saveBDRchange(index, bdr_id) {
      this.loader = true;
      const dateForSave = this.data[index];
      console.log(dateForSave);
      api.putBDRreportsave(bdr_id, dateForSave).then((response) => {
        this.notifyHead = "Успешно";
        this.notifyMessage = "Данные обновлены";
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

/* .l0 input {
  text-align: center !important;
  background: #ddebf7 !important;

}

.l2 input {
  background: #C6E0B4;
} */
.disable {
  background: #d8d8d8;
}
.negative {
  color: red !important;
}
</style>
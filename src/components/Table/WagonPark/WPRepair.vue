<template>
  <div>
    <Loader :loader="loader" />
    <div style="display: flex; justify-content: space-between;" >
    <p class="explanation"> * Для просмотра изменений по вагону кликните на строку с этим вагоном <br>
                            *  Для просмотра всех вагонов, очистите строку поиска и нажмите найти <br>
                            *  Для поиска определенныхх вагонов укажите вагоны через 1 пробел (12345678 12345678...)  </p>
      <button class="Accept" style="width:25%; height: 50px" @click="downloadReport()">Скачать</button> 
    </div>
    <br>
    <div style="display:flex; justify-content: start; height:50px;" >
      <b-button variant="primary" style="width: 12%; height: 80%; margin-top: 14px; float: left" class="search" @click="getCurrentWagon()">Найти</b-button>
    </div>
    <br>
    <div style="display: flex; justify-content: space-between;">
      <div>
        <textarea rows="1" class="textarea"  v-model="SearchRepairWagon"  placeholder="Номера вагонов через 1 пробел" style="width: 85% !important; text-align: center; height: 500px; font-size: 18px;"></textarea>
      </div>
<div style="width: 84%">
  <table class="table-bordered table-sm">
      <thead>
        <tr>
          <th colspan="1">Номер вагона</th>
          <th colspan="2">Ось 1
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 2
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 3
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 4
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 5
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 6
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 7
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 8
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="1">Сектор</th>
          <th colspan="1">Дата</th>
        </tr>
      </thead>
      <!-- <tbody v-if="allData">
        <tr  v-for="rep in repair_data" :key="rep.id" @click="openInform(rep.wagon)">
                <td >{{ rep.wagon }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis1_left_flange }}</td>
                <td :class="{redColor: rep.isRed1}">{{ rep.axis1_right_flange }}</td>
                <td :class="{redColor: rep.isRed2}">{{ rep.axis2_left_flange }}</td>
                <td :class="{redColor: rep.isRed3}">{{ rep.axis2_right_flange }}</td>
                <td :class="{redColor: rep.isRed4}">{{ rep.axis3_left_flange }}</td>
                <td :class="{redColor: rep.isRed5}">{{ rep.axis3_right_flange }}</td>
                <td :class="{redColor: rep.isRed6}">{{ rep.axis4_left_flange }}</td>
                <td :class="{redColor: rep.isRed7}">{{ rep.axis4_right_flange }}</td>
                <td :class="{redColor: rep.isRed8}">{{ rep.axis5_left_flange }}</td>
                <td :class="{redColor: rep.isRed9}">{{ rep.axis5_right_flange }}</td>
                <td :class="{redColor: rep.isRed10}">{{ rep.axis6_left_flange }}</td>
                <td :class="{redColor: rep.isRed11}">{{ rep.axis6_right_flange }}</td>
                <td :class="{redColor: rep.isRed12}">{{ rep.axis7_left_flange }}</td>
                <td :class="{redColor: rep.isRed13}">{{ rep.axis7_right_flange }}</td>
                <td :class="{redColor: rep.isRed14}">{{ rep.axis8_left_flange }}</td>
                <td :class="{redColor: rep.isRed15}">{{ rep.axis8_right_flange }}</td>
                <td >{{ rep.sector }}</td>
                <td >{{ rep.created_at.slice(0,10) }}</td>
        </tr>
      </tbody> -->
      <tbody v-if="searchData">
        <tr v-for="rep in responseWagon" :key="rep.id" @click="openInform(rep.wagon)">
          <td >{{ rep.wagon }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis1_left_flange }}</td>
                <td :class="{redColor: rep.isRed1}">{{ rep.axis1_right_flange }}</td>
                <td :class="{redColor: rep.isRed2}">{{ rep.axis2_left_flange }}</td>
                <td :class="{redColor: rep.isRed3}">{{ rep.axis2_right_flange }}</td>
                <td :class="{redColor: rep.isRed4}">{{ rep.axis3_left_flange }}</td>
                <td :class="{redColor: rep.isRed5}">{{ rep.axis3_right_flange }}</td>
                <td :class="{redColor: rep.isRed6}">{{ rep.axis4_left_flange }}</td>
                <td :class="{redColor: rep.isRed7}">{{ rep.axis4_right_flange }}</td>
                <td :class="{redColor: rep.isRed8}">{{ rep.axis5_left_flange }}</td>
                <td :class="{redColor: rep.isRed9}">{{ rep.axis5_right_flange }}</td>
                <td :class="{redColor: rep.isRed10}">{{ rep.axis6_left_flange }}</td>
                <td :class="{redColor: rep.isRed11}">{{ rep.axis6_right_flange }}</td>
                <td :class="{redColor: rep.isRed12}">{{ rep.axis7_left_flange }}</td>
                <td :class="{redColor: rep.isRed13}">{{ rep.axis7_right_flange }}</td>
                <td :class="{redColor: rep.isRed14}">{{ rep.axis8_left_flange }}</td>
                <td :class="{redColor: rep.isRed15}">{{ rep.axis8_right_flange }}</td>
                <td >{{ rep.sector }}</td>
                <td >{{ rep.created_at.slice(0,10) }}</td>
        </tr>
      </tbody>
    </table>
</div>
     </div>
 
    <b-modal ref="ModalHistoryWagon" hide-footer title="Последние изменения">
      <div class="bg">
        <table class="table-bordered table-sm">
      <thead>
        <tr>
          <th colspan="1">№</th>
          <th colspan="1">Номер вагона</th>
          <th colspan="2">Ось 1
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 2
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 3
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 4
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 5
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 6
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 7
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="2">Ось 8
            <td class="border-none">Л</td>
            <td class="border-none">П</td>
          </th>
          <th colspan="1">Сектор</th>

          <th colspan="1">Дата</th>
        </tr>
      </thead>
      <!-- <tbody v-if="allData">
        <tr v-for="data, index in history_data" :key="data.id" >
                <td>{{ index+1 }}</td>
                <td>{{ data.wagon }}</td>
                <td>{{ data.axis1_left_flange }}</td>
                <td>{{ data.axis1_right_flange }}</td>
                <td>{{ data.axis2_left_flange }}</td>
                <td>{{ data.axis2_right_flange }}</td>
                <td>{{ data.axis3_left_flange }}</td>
                <td>{{ data.axis3_right_flange }}</td>
                <td>{{ data.axis4_left_flange }}</td>
                <td>{{ data.axis4_right_flange }}</td>
                <td>{{ data.axis5_left_flange }}</td>
                <td>{{ data.axis5_right_flange }}</td>
                <td>{{ data.axis6_left_flange }}</td>
                <td>{{ data.axis6_right_flange }}</td>
                <td>{{ data.axis7_left_flange }}</td>
                <td>{{ data.axis7_right_flange }}</td>
                <td>{{ data.axis8_left_flange }}</td>
                <td>{{ data.axis8_right_flange }}</td>
                <td>{{ data.sector }}</td>
          <td >{{ (data.created_at).slice(0,10) }}</td>
        </tr>
      </tbody> -->
      <tbody v-if="searchData">
        <tr v-for="data, index in history_data" :key="data.id" >
                <td>{{ index+1 }}</td>
                <td>{{ data.wagon }}</td>
                <td>{{ data.axis1_left_flange }}</td>
                <td>{{ data.axis1_right_flange }}</td>
                <td>{{ data.axis2_left_flange }}</td>
                <td>{{ data.axis2_right_flange }}</td>
                <td>{{ data.axis3_left_flange }}</td>
                <td>{{ data.axis3_right_flange }}</td>
                <td>{{ data.axis4_left_flange }}</td>
                <td>{{ data.axis4_right_flange }}</td>
                <td>{{ data.axis5_left_flange }}</td>
                <td>{{ data.axis5_right_flange }}</td>
                <td>{{ data.axis6_left_flange }}</td>
                <td>{{ data.axis6_right_flange }}</td>
                <td>{{ data.axis7_left_flange }}</td>
                <td>{{ data.axis7_right_flange }}</td>
                <td>{{ data.axis8_left_flange }}</td>
                <td>{{ data.axis8_right_flange }}</td>
                <td>{{ data.sector }}</td>
          <td >{{ (data.created_at).slice(0,10) }}</td>
        </tr>
      </tbody>
    </table>
      </div>

      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-button>
    </b-modal>
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
    />
  </div>
</template>



<script>
import { mapState } from "vuex";
import api from "@/api/wagonPark";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  name: "WPRepair",
  data() {
    return {
      SearchRepairWagon: [],
      responseWagon: [],
      repair_data: [],
      history_data: [],
      loader: false,
      isRed: false,
      isRed1: false,
      isRed2: false,
      isRed3: false,
      isRed4: false,
      isRed5: false,
      isRed6: false,
      isRed7: false,
      isRed8: false,
      isRed9: false,
      isRed10: false,
      isRed11: false,
      isRed12: false,
      isRed13: false,
      isRed14: false,
      isRed15: false,
      allData: true,
      searchData: false,
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
  // watch: {
  //   SearchRepairWagon() {
  //     console.log('1')
  //     this.SearchRepairWagon.replace(/ /ig, ',');
  //   },
  // },

  methods: {

    getCurrentWagon() {
      // console.log(this.SearchRepairWagon)
let regExps = /\s/g
// console.log(typeof this.SearchRepairWagon)
      this.loader = true;
      if (this.SearchRepairWagon.length == 0) {
        this.showNotify = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Не введен номер вагона";
        this.notifyClass = "wrapper-error";
        this.loader = false
        setTimeout(() =>  this.showNotify = false, 2000)
      } else {
        this.allData = false;
        this.searchData = true;
        let trim_data = this.SearchRepairWagon.trim()
        let data = trim_data.replace(regExps, ',');
        api
          .getRepairWagon(data)
          .then((response) => {
            this.loader = false;
            this.responseWagon = response.data.data;
            let a = this.responseWagon.map((element) => {
              if (
                element.axis1_left_flange <= 25 &&
                element.axis1_left_flange > 0
              ) {
                element.isRed = true;
              }
              if (
                element.axis1_right_flange <= 25 &&
                element.axis1_right_flange > 0
              ) {
                element.isRed1 = true;
              }
              if (
                element.axis2_left_flange <= 25 &&
                element.axis2_left_flange > 0
              ) {
                element.isRed2 = true;
              }
              if (
                element.axis2_right_flange <= 25 &&
                element.axis2_right_flange > 0
              ) {
                element.isRed3 = true;
              }
              if (
                element.axis3_left_flange <= 25 &&
                element.axis3_left_flange > 0
              ) {
                element.isRed4 = true;
              }
              if (
                element.axis3_right_flange <= 25 &&
                element.axis3_right_flange > 0
              ) {
                element.isRed5 = true;
              }
              if (
                element.axis4_left_flange <= 25 &&
                element.axis4_left_flange > 0
              ) {
                element.isRed6 = true;
              }
              if (
                element.axis4_right_flange <= 25 &&
                element.axis4_right_flange > 0
              ) {
                element.isRed7 = true;
              }
              if (
                element.axis5_left_flange <= 25 &&
                element.axis5_left_flange > 0
              ) {
                element.isRed8 = true;
              }
              if (
                element.axis5_right_flange <= 25 &&
                element.axis5_right_flange > 0
              ) {
                element.isRed9 = true;
              }
              if (
                element.axis6_left_flange <= 25 &&
                element.axis6_left_flange > 0
              ) {
                element.isRed10 = true;
              }
              if (
                element.axis6_right_flange <= 25 &&
                element.axis6_right_flange > 0
              ) {
                element.isRed11 = true;
              }
              if (
                element.axis7_left_flange <= 25 &&
                element.axis7_left_flange > 0
              ) {
                element.isRed12 = true;
              }
              if (
                element.axis7_right_flange <= 25 &&
                element.axis7_right_flange > 0
              ) {
                element.isRed13 = true;
              }
              if (
                element.axis8_left_flange <= 25 &&
                element.axis8_left_flange > 0
              ) {
                element.isRed14 = true;
              }
              if (
                element.axis8_right_flange <= 25 &&
                element.axis8_right_flange > 0
              ) {
                element.isRed15 = true;
              }
            });
           
          })
          .catch((error) => {
            console.log(Object.entries(this.responseWagon))
            this.loader = false;
          });
      }
    },
    openInform(wagon) {
      this.loader = true;
      api
        .getWagonRepairHistory(wagon)
        .then((response) => {
          this.history_data = response.data.slice(0, 4);
          console.log(this.history_data);
          this.showModal();
          this.loader = false;
        })
        .catch((error) => {
          this.loader = false;
        });
    },
    showModal() {
      this.$refs["ModalHistoryWagon"].show();
    },
    hideModal() {
      this.$refs["ModalHistoryWagon"].hide();
    },
    toggleModal() {
      this.$refs["ModalHistoryWagon"].toggle("#toggle-btn");
    },
    downloadReport() {
      this.loader = true;
      let regExps = /\s/g
      if (this.SearchRepairWagon == "") {
        api
          .getReportRepairData()
          .then((response) => {
            window.location.href = response.data;
            this.loader = false;
          })
          .catch((error) => {
            this.loader = false;
          });
      } else {
        let trim_data = this.SearchRepairWagon.trim()
        let data = trim_data.replace(regExps, ',');
        api
          .getReportRepair(data)
          .then((response) => {
            window.location.href = response.data;
            this.loader = false;
          })
          .catch((error) => {
            this.loader = false;
          });
      }
    },
  },
};
</script>

<style scoped>
td {
  height: 45px !important;
}
.redColor {
  background: rgb(194, 66, 66) !important;
  color: white !important;
}
.explanation {
  font-size: 13px;
  color: grey;
}
.border-none {
  border: none !important;
}
tr:hover {
  background: lightgray;
}
.content-history {
  display: flex;
}
.textarea {
  background: white;
  border: 1px solid grey !important;
  margin-top: 1%;
}
.bg {
  background: white;
  -webkit-box-shadow: 3px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 3px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 3px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
.created-at {
  color: rgb(146, 146, 146);
  margin: 2% 2% 0 0;
  text-align: right;
}
</style>
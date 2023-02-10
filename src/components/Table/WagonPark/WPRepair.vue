<template>
  <div>
    <Loader :loader="loader" />
    <div style="display: flex; justify-content: space-around;" @click="downloadReport()">
    <p class="explanation"> * Для просмотра изменений по вагону кликните на строку с этим вагоном</p>
      <button class="Accept">Скачать</button> 
    </div>
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
      <tbody>
        <tr :class="{redColor: rep.isRed}" v-for="rep in repair_data" :key="rep.id" @click="openInform(rep.wagon)">
                <td :class="{redColor: rep.isRed}">{{ rep.wagon }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis1_left }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis1_right }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis2_left }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis2_right }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis3_left }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis3_right }}</td>
                 <td :class="{redColor: rep.isRed}">{{ rep.axis4_left }}</td>
                 <td :class="{redColor: rep.isRed}">{{ rep.axis4_right }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis5_left }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis5_right }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis6_left }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis6_right }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis7_left }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis7_right }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis8_left }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.axis8_right }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.sector }}</td>
                <td :class="{redColor: rep.isRed}">{{ rep.created_at.slice(0,10) }}</td>
        </tr>
      </tbody>
    </table>
    <b-modal ref="ModalHistoryWagon" hide-footer title="Последние изменения">
      <div class="bg">
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
      <tbody>
        <tr v-for="data in history_data" :key="data.id">
                <td>{{ data.wagon }}</td>
                <td>{{ data.axis1_left }}</td>
                <td>{{ data.axis1_right }}</td>
                <td>{{ data.axis2_left }}</td>
                <td>{{ data.axis2_right }}</td>
                <td>{{ data.axis3_left }}</td>
                <td>{{ data.axis3_right }}</td>
                <td>{{ data.axis4_left }}</td>
                <td>{{ data.axis4_right }}</td>
                <td>{{ data.axis5_left }}</td>
                <td>{{ data.axis5_right }}</td>
                <td>{{ data.axis6_left }}</td>
                <td>{{ data.axis6_right }}</td>
                <td>{{ data.axis7_left }}</td>
                <td>{{ data.axis7_right }}</td>
                <td>{{ data.axis8_left }}</td>
                <td>{{ data.axis8_right }}</td>
                <td>{{ data.sector }}</td>
          <td >{{ (data.created_at).slice(0,10) }}</td>
        </tr>
      </tbody>
    </table>
      </div>

      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-button>
    </b-modal>
  </div>
</template>



<script>
import { mapState } from "vuex";
import api from "@/api/wagonPark";
import Loader from "@/components/loader/loader.vue";
export default {
  name: "WPRepair",
  data() {
    return {
      repair_data: [],
      history_data: [],
      loader: false,
      isRed: false,
    };
  },
  components: { Loader },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  mounted() {
    this.loader = true;
    api
      .getWagonRepair()
      .then((response) => {
        this.repair_data = response.data.data;
        this.loader = false;
        let a = this.repair_data.map(element =>{
            if(Math.trunc(element.axis1_left) === 25){
                element.isRed= true
            }
            else if(Math.trunc(element.axis1_left) === 25){
                element.isRed= true
            }
            else if(Math.trunc(element.axis1_right) === 25){
                element.isRed= false
            }
            else if(Math.trunc(element.axis2_left) === 25){
                element.isRed= false
            }
            else if(Math.trunc(element.axis2_right) === 25){
                element.isRed= false
            }
            else if(Math.trunc(element.axis3_left) === 25){
                element.isRed= false
            }
            else if(Math.trunc(element.axis3_right) === 25){
                element.isRed= false
            }
            else  if(Math.trunc(element.axis4_left) === 25){
                element.isRed= false
            }
            else if(Math.trunc(element.axis4_right) === 25){
                element.isRed= false
            }
            else  if(Math.trunc(element.axis5_left) === 25){
                element.isRed= false
            }
            else  if(Math.trunc(element.axis5_right) === 25){
                element.isRed= false
            }
            else  if(Math.trunc(element.axis6_left) === 25){
                element.isRed= false
            }
            else  if(Math.trunc(element.axis6_right) === 25){
                element.isRed= false
            }
            else if(Math.trunc(element.axis7_left) === 25){
                element.isRed= false
            }
            else  if(Math.trunc(element.axis7_right) === 25){
                element.isRed= false
            }
            else if(Math.trunc(element.axis8_left) === 25){
                element.isRed= false
            }
            else if(Math.trunc(element.axis8_right) === 25){
                element.isRed= false
            }
            else {
                this.isRed = false
            }
        })
      })
      .catch((error) => {
        this.loader = false;
      });
  },
  methods: {
    openInform(wagon) {
      this.loader = true;
      api
        .getWagonRepairHistory(wagon)
        .then((response) => {
          this.history_data = response.data;
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
    downloadReport(){
        this.loader = true
        window.location.href = 'api/wagon-park/repair-axis-wheels/export/'
        this.loader = false

    }
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
/* tr:hover {
  background: lightgray;
} */
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
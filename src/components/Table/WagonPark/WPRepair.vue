<template>
  <div>
    <Loader :loader="loader" />
    <p class="explanation"> * Для просмотра изменений по вагону кликните на строку с этим вагоном</p>
       
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
          <th colspan="1">Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rep in repair_data" :key="rep.id" @click="openInform(rep.wagon)">
            <td>{{ rep.wagon }}</td>

                <td>{{ rep.axis1_left }}</td>
                <td>{{ rep.axis1_right }}</td>
                <td>{{ rep.axis2_left }}</td>
                <td>{{ rep.axis2_right }}</td>
                <td>{{ rep.axis3_left }}</td>
                <td>{{ rep.axis3_right }}</td>
                 <td>{{ rep.axis4_left }}</td>
                 <td>{{ rep.axis4_right }}</td>
                <td>{{ rep.axis5_left }}</td>
                <td>{{ rep.axis5_right }}</td>
                <td>{{ rep.axis6_left }}</td>
                <td>{{ rep.axis6_right }}</td>
                <td>{{ rep.axis7_left }}</td>
                <td>{{ rep.axis7_right }}</td>
                <td>{{ rep.axis8_left }}</td>
                <td>{{ rep.axis8_right }}</td>
           
          <td>{{ rep.created_at.slice(0,10) }}</td>
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
          <th colspan="1">Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in history_data" :key="data.id" @click="openInform(data.wagon)">
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
  },
};
</script>

<style scoped>
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
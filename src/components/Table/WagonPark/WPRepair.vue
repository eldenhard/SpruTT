<template>
  <div>
    <Loader :loader="loader" />
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
           
          <td>{{ rep.created_at }}</td>
        </tr>
      </tbody>
    </table>
    <b-modal ref="ModalHistoryWagon" hide-footer title="Последние изменения">
      <div class="bg" v-for="data in history_data" :key="data.id">
        <h3>{{ data.wagon }}</h3>


<h1>Данные</h1>
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
    openInform(wagon){
        api.getWagonRepairHistory(wagon)
        .then(response => {
            this.history_data = response.data
            this.showModal()
        })
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
  }
};
</script>

<style scoped>
.border-none{
    border: none !important
}
tr:hover{
    background: lightgray;
}
</style>
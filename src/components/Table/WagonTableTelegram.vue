<template>
  <div>
    <Loader :loader="loader"></Loader>
    <h2>Телеграммы</h2>
    <div class="telegram-block">
      <div class="bg" style="background: white">
        <div class="row">
          <div class="col-md-6">
            <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              :value="all_information.is_loaded == true ? 'Груженый': 'Порожний'"
              style="background: white"
              disabled
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Груж/Порожн</label
            >
          </div>
          <div class="col-md-6">
            <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="all_information.contract"
              style="background: white"
              disabled
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >№ Договора</label
            >
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6">
            <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="all_information.departure_station"
              style="background: white"
              disabled
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Станция отправления</label
            >
          </div>
          <div class="col-md-6">
            <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="all_information.destination_station"
              style="background: white"
              disabled
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Станция назначения</label
            >
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6">
            <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="all_information.cargo_code"
              style="background: white"
              disabled
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Код груза</label
            >
          </div>
          <div class="col-md-6">
            <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="all_information.cargo_sender"
              style="background: white"
              disabled
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Грузоотправитель</label
            >
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6">
            <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="all_information.cargo_recipient"
              style="background: white"
              disabled
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Грузополучатель</label
            >
          </div>
          <div class="col-md-6">
            <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="wagon"
              style="background: white"
              placeholder="номер вагона"
            />
            <br />

            <button
              class="textarea Accept"
              style="margin-top: 2%; background: #10691f !important"
              @click="getInfoByWagon()"
            >
              Информация по вагону
            </button>
          </div>
        </div>
      </div>
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
  
  <style scoped>
.telegram-block {
  width: 50%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
  
  <script>
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import api from "@/api/wagonPark";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  name: "Telegram",
  components: { Loader, Notifications },
  data() {
    return {
      loader: false,
      is_loaded: "",
      contract: "",
      departure_station: "",
      destination_station: "",
      cargo_code: "",
      cargo_sender: "",
      cargo_recipient: "",
      wagon: "",
      all_information: "",
       // Уведомления
       showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      allGroups: (state) => state.auth.groups,
    }),
  },
  methods: {
    // Номер вагона 51037059
    getInfoByWagon() {
      this.loader = true
      api.postTelegram(this.wagon)
      .then((response) => {
        this.all_information = response.data;
        this.showNotify = true;
        this.notifyHead = "Успешно";
        this.notifyMessage = "Данные получены";
        this.notifyClass = "wrapper-success";
        this.loader = false;
        setTimeout(this.closeNotification, 1500);
        this.loader = false
      }).catch(error => {
        this.loader = false
        this.showNotify = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Данные не получены";
        this.notifyClass = "wrapper-alert";
        this.loader = false;
        setTimeout(this.closeNotification, 1500);
      })
    },
    closeNotification() {
      this.showNotify = false;
    },
  },
};
</script>
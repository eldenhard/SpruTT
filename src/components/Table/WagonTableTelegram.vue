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
              :value="
                all_information.is_loaded == true ? 'Груженый' : 'Порожний'
              "
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
            <!-- <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="all_information.departure_station"
              style="background: white"
              disabled
            /> -->
            <!-- <multi-select-search @change="updateSelectedStations" :placeholder="'Станция отправления'"
                        :variants="stations" :variant-title="'work_name'"
                        style="width: 170px !important;cursor: pointer;">
            </multi-select-search> -->
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
              v-model="all_information.cargo_recipient"
              style="background: white"
              disabled
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Тип вагона</label
            >
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-md-6">
            <input
              type="date"
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="period_begin"
              style="background: white; border: 1px solid grey"
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Начало периода</label
            >
          </div>
          <div class="col-md-6">
            <input
              type="date"
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="period_end"
              style="background: white; border: 1px solid grey"
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Конец периода</label
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
              v-model="all_information.wagon_type"
              style="background: white"
            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Тип вагона</label
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
              class="textarea Action"
              style="
                margin-top: 2%;
                background: #ff9f55 !important;
                text-decoration: none !important;
                outline: none !important;
              "
              @click="getInfoByWagon()"
            >
              Информация по вагону
            </button>
            <button
              class="textarea Action"
              style="
                margin-top: 2%;
                background: #ff9f55 !important;
                text-decoration: none !important;
                outline: none !important;
              "
              @click="addCurrentWagon()"
            >
              Добавить вагон
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="selected-wagons">
      <template v-if="selected_wagon">
        <span
          class="option_select_block_check"
          v-for="p in selected_wagon"
          :key="p.id"
          @click="removeThisWagon(p.index)"
        >
          <span style="color: black; font-size: 15px"> &#43;</span>
          {{ p }}
        </span>
      </template>
    </div>

    <button
      class="Accept"
      style="margin-top: 2%;
        width: 45%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        border-radius: 10px;
        text-decoration: none !important;
        outline: none !important;
      "
      @click="createTelegram()"
    >
      Создать телеграмму
    </button>
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
.selected-wagons {
  width: 45%;
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
import MultiSelectSearch from '../ui/MultiSelectSearch.vue'

export default {
  name: "Telegram",
  components: { Loader, Notifications, MultiSelectSearch },
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
      wagon: [],
      all_information: "",
      selected_wagon: [],
      errors: {},
      period_begin: '',
        period_end: '',
      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",

      selectedStationsIds: []
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      stations: state => state.stations

    }),
  },
// mounted(){
//   const info = JSON.parse(localStorage.getItem("station"))
//   console.log(info)
// },
  methods: {
    // Номер вагона 51037059
    getInfoByWagon() {
      this.loader = true;
      api
        .postTelegram(Number(this.wagon))
        .then((response) => {
          this.all_information = response.data;
          this.showNotify = true;
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные получены";
          this.notifyClass = "wrapper-success";
          this.loader = false;
          setTimeout(this.closeNotification, 1500);
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Данные не получены";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        });
    },
    
    updateSelectedStations(selected) {
            this.selectedStationsIds = selected
            this.sendEmit()
        },
    closeNotification() {
      this.showNotify = false;
    },
    // Добавить вагон
    addCurrentWagon() {
      this.selected_wagon.push(this.wagon);
      this.selected_wagon.forEach((el, i) => {
        console.log(el);
      });
    },
    // Удалить вагон из массива
    removeThisWagon(index) {
      this.selected_wagon.splice(this.selected_wagon.indexOf(index), 1);
      // this.sendEmit()
    },
    // Создать телеграмму
    createTelegram() {
      this.loader = true;
      api.postTelegram2(this.selected_wagon, time).then((response) => {
        this.showNotify = true;
        this.notifyHead = "Успешно";
        this.notifyMessage = "Телеграмма создана";
        this.notifyClass = "wrapper-success";
        this.loader = false;
        setTimeout(this.closeNotification, 1500);
      });
    },
  },
};
</script>
<template>
  <div>
    <Loader :loader="loader"></Loader>
    <h2>Телеграммы</h2>
    <div class="telegram-block">
      <div class="bg" style="background: white">
        <div class="row">
          <div class="col-md-6">

            <select name="" id="input-filter-staff1" v-model="all_information.is_loaded" class="textarea"
              style="background: white">
              <option :value="true">Груженый</option>
              <option :value="false">Порожний</option>

            </select>
            <!-- <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              :value="
                all_information.is_loaded == true ? 'Груженый' : 'Порожний'
              "
              style="background: white"
              disabled
            /> -->

            <br />
            <label for="input-filter-staff1" class="label"
              style="margin-left: 5% !important; background: white">Груж/Порожн</label>
          </div>
          <div class="col-md-6">
            <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="all_information.contract"
              style="background: white" />
            <br />
            <label for="input-filter-staff1" class="label" style="margin-left: 5% !important; background: white">№
              Договора</label>
          </div>
        </div>
        <br />



        <div class="row">
          <div class="col-md-6">
            <autocomplete-input :variants="stations" :variantKey="'id'" :label="'Станция отправления'"
              :variantTitle="'name'" v-model="all_information.departure_station_name" :need-full="true" @selected="getFullStationDeparture"></autocomplete-input>
            <!-- <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="all_information.departure_station"
              style="background: white" disabled />
             -->
            <!-- <multi-select-search @change="updateSelectedStations" :placeholder="'Станция отправления'"
                        :variants="stations" :variant-title="'work_name'"
                        style="width: 170px !important;cursor: pointer;">
            </multi-select-search> -->
            <br />
            <!-- <label for="input-filter-staff1" class="label" style="margin-left: 5% !important; background: white">Станция
              отправления</label> -->
          </div>
          <div class="col-md-6">
            <autocomplete-input :variants="stations" :variantKey="'id'" :label="'Станция назначения'"
              :variantTitle="'name'" v-model="all_information.destination_station_name" :need-full="true" @selected="getFullStationDestination"></autocomplete-input>

            <!-- <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="all_information.destination_station"
              style="background: white" disabled />
            <br />
            <label for="input-filter-staff1" class="label" style="margin-left: 5% !important; background: white">Станция
              назначения</label> -->
          </div>
        </div>



        <br />
        <div class="row">
          <div class="col-md-6">
            <autocomplete-input :variants="cargo_codes" :variantKey="'id'" :label="'Код груза'" :variantTitle="'code6'"
              v-model="all_information.cargo_code"></autocomplete-input>

            <!-- <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="all_information.cargo_code"
              style="background: white" disabled />
            <br />
            <label for="input-filter-staff1" class="label" style="margin-left: 5% !important; background: white">Код
              груза</label> -->
          </div>
          <div class="col-md-6">
            <autocomplete-input :variants="counterparties" :variantKey="'id'" :label="'Грузоотправитель'"
              :variantTitle="'work_name'" v-model="all_information.cargo_sender"></autocomplete-input>

            <!-- <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="all_information.cargo_sender"
              style="background: white" disabled />
            <br />
            <label for="input-filter-staff1" class="label"
              style="margin-left: 5% !important; background: white">Грузоотправитель</label> -->
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6">
            <autocomplete-input :variants="counterparties" :variantKey="'id'" :label="'Грузополучатель'"
              :variantTitle="'work_name'" v-model="all_information.cargo_recipient"></autocomplete-input>

            <!-- <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="all_information.cargo_recipient"
              style="background: white" disabled /> -->
            <!-- <br />
            <label for="input-filter-staff1" class="label"
              style="margin-left: 5% !important; background: white">Грузополучатель</label> -->
          </div>
          <div class="col-md-6">
            <select id="input-filter-staff1" v-model="all_information.wagon_type" class="textarea"
              style="background: white">
              <option v-for="wagType in wagonTypes" :key="wagType">{{ wagType }}</option>
            </select>

            <br />
            <label for="input-filter-staff1" class="label" style="margin-left: 5% !important; background: white">Тип
              вагона</label>
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-md-6">
            <input type="date" class="textarea" id="input-filter-staff1" name="Pwd" v-model="period_begin"
              style="background: white; border: 1px solid grey" :class="{'has-error' : this.errors.period_begin }" />
            <br />
            <label for="input-filter-staff1" class="label" style="margin-left: 5% !important; background: white">Начало
              периода</label>
          </div>
          <div class="col-md-6">
            <input type="date" class="textarea" id="input-filter-staff1" name="Pwd" v-model="period_end"
              style="background: white; border: 1px solid grey" />
            <br />
            <label for="input-filter-staff1" class="label" style="margin-left: 5% !important; background: white">Конец
              периода</label>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6">

          </div>
          <div class="col-md-6">
            <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="wagon" style="background: white"
              placeholder="номер вагона" />

            <br />

            <button class="textarea Action" style="
                margin-top: 2%;
                background: #ff9f55 !important;
                text-decoration: none !important;
                outline: none !important;
              " @click="getInfoByWagon()">
              Информация по вагону
            </button>
            <button class="textarea Action" style="
                margin-top: 2%;
                background: #ff9f55 !important;
                text-decoration: none !important;
                outline: none !important;
              " @click="addCurrentWagon()">
              Добавить вагон
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="selected-wagons">
      <template v-if="selected_wagon">
        <span class="option_select_block_check" v-for="(p, idx) in selected_wagon" :key="idx"
          @click="removeThisWagon(p)">
          <span style="color: black; font-size: 15px"> &#43;</span>
          {{ p }}
        </span>
      </template>
    </div>

    <button class="Accept" style="
    margin-top: 2%;
        width: 45%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        border-radius: 10px;
        text-decoration: none !important;
        outline: none !important;
      " @click="createTelegram()">
      Создать телеграмму
    </button>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
      id="notif" />
  </div>
</template>
  
<style scoped>
.telegram-block {
  width: 50%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  /* color: #dddddd; */
}

.selected-wagons {
  width: 45%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.has-error{
  background: red;
}
</style>
  
<script>
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import api from "@/api/wagonPark";
import Notifications from "@/components/notifications/Notifications.vue";
import MultiSelectSearch from '../ui/MultiSelectSearch.vue'
import AutocompleteInput from '../ui/AutocompleteInput.vue';
import { getItem } from "@/helpers/persistanseStorage";

export default {
  name: "Telegram",
  components: { Loader, Notifications, MultiSelectSearch, AutocompleteInput },
  data() {
    return {
      loader: false,
      wagon: '',
      wagonTypes: '',
      all_information: {
        is_loaded: "",
        contract: "",
        departure_station_name: "",
        destination_station_name: "",
        cargo_code: "",
        cargo_sender: "",
        cargo_recipient: "",
        wagon_type: [],
        departure_station_object: null,
        destionation_station_object: null
      },
      selected_wagon: [],
      period_begin: '',
      period_end: '',
      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",

      errors: {
        period_begin: true
      },
      selectedStationsIds: [],
      stations: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      //stations: state => state.stations
      counterparties: state => state.counterparties.counterparties,
      cargo_codes: state => state.cargo_code.cargo_code
    }),
  },
  // mounted(){
  //   const info = JSON.parse(localStorage.getItem("station"))
  //   console.log(info)
  // },
  mounted() {
    this.loader = true
    api.getWagonType()
      .then(response => {
        this.wagonTypes = response.data.wagon_types
        this.loader = false
      })
    this.stations = getItem('station')
  },
  methods: {
    // Номер вагона 51037059
    getFullStationDeparture(station){
      this.all_information.departure_station_object = station
    },
    getFullStationDestination(station){
      this.all_information.destionation_station_object = station
    }
,    getInfoByWagon() {
      this.loader = true;
      api
        .postTelegram(Number(this.wagon))
        .then((response) => {
          //this.all_information = response.data;
          Object.assign(this.all_information, response.data)
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
    removeThisWagon(val) {
      this.selected_wagon.splice(this.selected_wagon.indexOf(val), 1);
      // this.sendEmit()
    },
    // Создать телеграмму
    createTelegram() {
      this.loader = true;
      const request =
      {
        "wagons": this.selected_wagon,
        "is_loaded": this.all_information.is_loaded,
        "contract": this.all_information.contract,
        "period_begin": new Date(this.period_begin),
        "period_end": new Date(this.period_end),
        "wagon_type": this.all_information.wagon_type,
        "departure_station": this.all_information.departure_station_object.code,
        "destination_station": this.all_information.destionation_station_object.code,
        "cargo_code": this.all_information.cargo_code,
        "cargo_sender": this.all_information.cargo_sender,
        "cargo_recipient": this.all_information.cargo_recipient
      }
      if(this.period_begin == null ){
        this.errors.period_begin = true
      }
      api.createTelegram(request)
        .then(response => {
          this.loader = false
          this.notifyHead = "Успешно";
          this.notifyMessage = "Телеграмма создана";
          this.notifyClass = "wrapper-success";
          setTimeout(this.closeNotification, 1500);
          console.log(response)
        }).catch(error => {
          this.loader = false
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Телеграмма не создана";
          this.notifyClass = "wrapper-alert";
          setTimeout(this.closeNotification, 1500);
        })
    }
  },
};
</script>
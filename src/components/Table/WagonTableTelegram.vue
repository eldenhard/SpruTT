<template>
  <div>
    <Loader :loader="loader"></Loader>
    <h2>Телеграммы</h2>
    <div class="telegram-block">
      <div class="bg" style="background: white">
        <div class="row">
          <div class="col-md-6">
            <select
              name=""
              id="input-filter-staff1"
              v-model="all_information.is_loaded"
              class="textarea"
              style="background: white"
            >
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
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white; "
              >Груж/Порожн</label
            >
            <p v-if="this.telegram_error.is_loaded" style="font-weight: bold; color: red">
                {{ this.telegram_error.is_loaded }}</p>
          </div>
          <div class="col-md-6">
            <input
              class="textarea"
              id="input-filter-staff1"
              name="Pwd"
              v-model="all_information.contract"
              style="background: white"
              :placeholder="this.telegram_error.contract"

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
            <autocomplete-input
              :variants="stations"
              :variantKey="'id'"
              :label="'Станция отправления'"
              :variantTitle="'name'"
              v-model="all_information.departure_station_name"
              :need-full="true"
              @selected="getFullStationDeparture"
              :placeholder="this.telegram_error.departure_station_name"
            ></autocomplete-input>

          </div>
          <div class="col-md-6">
            <autocomplete-input
              :variants="stations"
              :variantKey="'id'"
              :label="'Станция назначения'"
              :variantTitle="'name'"
              v-model="all_information.destination_station_name"
              :need-full="true"
              @selected="getFullStationDestination"
              :placeholder="this.telegram_error.destination_station_name"
            ></autocomplete-input>
          </div>
        </div>

        <br />
        <div class="row">
          <div class="col-md-6">
            <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="all_information.cargo_recipient"
              style="background: white"  :placeholder="this.telegram_error.cargo_recipient" />
            <br />
            <label for="input-filter-staff1" class="label"
              style="margin-left: 5% !important; background: white">Грузополучатель</label>
            
          </div>
          <div class="col-md-6">
            <!-- <autocomplete-input
              :variants="counterparties"
              :variantKey="'id'"
              :label="'Грузоотправитель'"
              :variantTitle="'work_name'"
              v-model="all_information.cargo_sender"
            ></autocomplete-input> -->

            <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="all_information.cargo_sender"
              style="background: white"  :placeholder=" this.telegram_error.cargo_sender"/>
            <br />
            <label for="input-filter-staff1" class="label"
              style="margin-left: 5% !important; background: white">Грузоотправитель</label>
            
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6">
            <!-- <autocomplete-input
              :variants="counterparties"
              :variantKey="'id'"
              :label="'Грузополучатель'"
              :variantTitle="'work_name'"
              v-model="all_information.cargo_recipient"
            ></autocomplete-input> -->
            <autocomplete-input
              :variants="cargo_codes"
              :variantKey="'id'"
              :label="'Код груза'"
              :variantTitle="'code6'"
              v-model="all_information.cargo_code"
              :placeholder="this.telegram_error.cargo_code"
            ></autocomplete-input>
            <!-- <input class="textarea" id="input-filter-staff1" name="Pwd" v-model="all_information.cargo_recipient"
              style="background: white" />
            <br />
            <label for="input-filter-staff1" class="label"
              style="margin-left: 5% !important; background: white">Грузополучатель</label> -->
          </div>


          <div class="col-md-6">
            <select
              id="input-filter-staff1"
              v-model="all_information.wagon_type"
              class="textarea"
              style="background: white"
            >
              <option v-for="wagType in wagonTypes" :key="wagType">
                {{ wagType }}
              </option>
            </select>

            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Тип вагона</label
            >
            <!-- <p v-if="this.telegram_error.wagon_type" style="font-weight: bold; color: red">
                {{ this.telegram_error.wagon_type }}</p> -->
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
              :placeholder="this.telegram_error.period_begin"

            />
            <br />
            <label
              for="input-filter-staff1"
              class="label"
              style="margin-left: 5% !important; background: white"
              >Начало периода</label
            >
            <!-- <p v-if="this.telegram_error.period_begin" style="font-weight: bold; color: red">
                {{ this.telegram_error.period_begin }}</p> -->
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
            <!-- <p v-if="this.telegram_error.period_end" style="font-weight: bold; color: red">
                {{ this.telegram_error.period_end }}</p> -->
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6"></div>
          <div class="col-md-6">
            <input
              class="textarea"
              name="Pwd"
              v-model="wagon"
              id="123r"
              style="background: white"
              :class="{ 'has-error': this.errors.wagon }"
            
            />

            <br />
            <label for="123r" class="label" style="  position: absolute !important;
  transform: translate(1.0rem, -3.8rem) !important;
  font-size: 1rem !important;
  padding: 0 5px !important;
  background-color: #ffffff !important;
  color: #757575 !important;">Номер вагона</label>
            <p v-if="this.telegram_error.wagon" style="font-weight: bold; color: red">
                {{ this.telegram_error.wagon }}</p>
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
            <!-- <button class="textarea Action" style="
                margin-top: 2%;
                background: #ff9f55 !important;
                text-decoration: none !important;
                outline: none !important;
              " @click="addCurrentWagon()">
              Добавить вагон
            </button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="selected-wagons">
      <template v-if="selected_wagon">
        <span
          class="option_select_block_check"
          v-for="(p, idx) in selected_wagon"
          :key="idx"
          @click="removeThisWagon(p)"
        >
          <span style="color: black; font-size: 15px"> &#43;</span>
          {{ p }}
        </span>
      </template>
    </div>

    <button
      class="Accept"
      style="
        margin-top: 2%;
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
  /* color: #dddddd; */
}
.selected-wagons {
  width: 45%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.has-error{
  color: rgb(190, 33, 33) !important;
  border: 1px solid rgb(190, 33, 33) !important;
}
::placeholder{
    color: red !important;
}
</style>
  
<script>
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import api from "@/api/wagonPark";
import Notifications from "@/components/notifications/Notifications.vue";
import MultiSelectSearch from "../ui/MultiSelectSearch.vue";
import AutocompleteInput from "../ui/AutocompleteInput.vue";
import { getItem } from "@/helpers/persistanseStorage";
export default {
  name: "Telegram",
  components: { Loader, Notifications, MultiSelectSearch, AutocompleteInput },
  // props: ['class'],
  data() {
    return {
      loader: false,
      wagon: [],
      wagonTypes: "",
      all_information: {
        is_loaded: [],
        contract: "",
        departure_station_name: "",
        destination_station_name: "",
        cargo_code: "",
        cargo_sender: "",
        cargo_recipient: "",
        wagon_type: [],
        departure_station_object: null,
        destionation_station_object: null,
      },
      selected_wagon: [],
      period_begin: "",
      period_end: "",
      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      errors: {
        wagon: false,
      },
      telegram_error : {},
      selectedStationsIds: [],
      stations: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      //stations: state => state.stations
      counterparties: (state) => state.counterparties.counterparties,
      cargo_codes: (state) => state.cargo_code.cargo_code,
    }),
  },

  mounted() {
    this.loader = true;
    api.getWagonType().then((response) => {
      this.wagonTypes = response.data.wagon_types;
      this.loader = false;
    });
    this.stations = getItem("station");
  },
  methods: {
    // Номер вагона 51037059
    getFullStationDeparture(station) {
      this.all_information.departure_station_object = station;
    },
    getFullStationDestination(station) {
      this.all_information.destionation_station_object = station;
    },
    getInfoByWagon() {
      this.loader = true;
      if(this.wagon == ''){
          this.errors.wagon = true;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Введите номер вагона";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
          this.loader = false;
      }
      else{
        if(this.wagon != ''){
          this.errors.wagon = false;
        }
      let wagonSplit = this.wagon;
      let wagonArray = wagonSplit.split(" ");
      api
        .postTelegram(wagonArray)
        .then((response) => {
          //this.all_information = response.data;
          Object.assign(this.all_information, response.data);
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные получены";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          this.loader = false;
          setTimeout(this.closeNotification, 1500);
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = `${error.response.data}`;
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        });
      }
    },
    updateSelectedStations(selected) {
      this.selectedStationsIds = selected;
      this.sendEmit();
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
      if (this.all_information.is_loaded == '' || this.all_information.is_loaded == null) {
            this.errors = { ...this.errors, is_loaded: 'Выберите состояние' }
      } 
      this.telegram_error= {}
      if (this.period_begin == '') {
            this.telegram_error = { ...this.telegram_error, period_begin: 'Выберите дату' }
        }
      if (this.period_end == '') {
            this.telegram_error = { ...this.telegram_error, period_end: 'Выберите дату' }
      } 
      if (this.all_information.cargo_sender == '') {
            this.telegram_error = { ...this.telegram_error, cargo_sender: 'Выберите отправителя' }
      } 
      if (this.all_information.cargo_recipient == '') {
            this.telegram_error = { ...this.telegram_error, cargo_recipient: 'Выберите получателя' }
      }
      if (this.all_information.contract == '' || this.all_information.contract == null) {
            this.telegram_error = { ...this.telegram_error, contract: 'Введите № договора' }
      } 
      if (this.all_information.wagon_type == '') {
            this.telegram_error = { ...this.telegram_error, wagon_type: 'Выберите тип вагона' }
      } 
      if (this.all_information.cargo_code == '') {
            this.telegram_error = { ...this.telegram_error, cargo_code: 'Введите код' }
      } 
      if (this.all_information.departure_station_name == '') {
            this.telegram_error = { ...this.telegram_error, departure_station_name: 'Введите станцию' }
      }
      if (this.all_information.destination_station_name == '') {
            this.telegram_error = { ...this.telegram_error, destination_station_name: 'Введите станцию' }
      }
      if (this.wagon == '') {
            this.telegram_error = { ...this.telegram_error, wagon: 'Введите вагон' }
      }
      if (!Object.keys(this.telegram_error).length) {
      this.loader = true;
      let wagonSplit = this.wagon;
      let wagonArray = wagonSplit.split(" ");
      const request = {
        wagons: wagonArray,
        is_loaded: this.all_information.is_loaded,
        contract: this.all_information.contract,
        period_begin: new Date(this.period_begin),
        period_end: new Date(this.period_end),
        wagon_type: this.all_information.wagon_type,
        departure_station: this.all_information.departure_station_object.code,
        destination_station: this.all_information.destionation_station_object.code,
        cargo_code: this.all_information.cargo_code,
        cargo_sender: this.all_information.cargo_sender,
        cargo_recipient: this.all_information.cargo_recipient,
      };

      api.createTelegram(request)
        // Номер вагона 51037059
        .then((response) => {
          this.loader = false;
          this.notifyHead = "Успешно";
          this.notifyMessage = "Телеграмма создана";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Телеграмма не создана";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
        })
      }
      else {
                this.loader = false
                this.notifyHead = 'Ошибка'
                this.notifyMessage = 'Заполните все поля анкеты и повторите создание телеграммы'
                this.notifyClass = 'wrapper-error'
                this.showNotify = true
                setTimeout(this.closeNotification, 1500)
                // TODO: Нотификатор
            }
    }
  }
}
</script>
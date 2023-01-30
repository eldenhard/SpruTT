<template>
  <div>
    <Loader :loader="loader"></Loader>
    <WagonTelegramSearch @updateSearchTelegram="updateSearchTelegram" />
    <b-button variant="primary" class="search" @click="getCurrentWagon()"
      >Найти
    </b-button>

    <table class="table table-striped table-sm" style="margin-top: 5%">
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Груж/Порож</th>
          <th scope="col">№ Договора</th>
          <th scope="col">Станция отправ.</th>
          <th scope="col">Станция назнач.</th>
          <th scope="col">Грузоотправитель</th>
          <th scope="col">Грузополучатель</th>
          <th scope="col">Код груза</th>
          <th scope="col">Тип вагона</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in AllInformation" :key="i.id">
          <td>{{ i.data.number }}</td>
          <td>{{ i.data?.flight?.is_loaded }}</td>
          <td>{{ i.data?.flight?.agreement_number }}</td>
          <td>{{ i.data?.flight?.departure_station_name }}</td>
          <td>{{ i.data?.flight?.destination_station_name }}</td>
          <td>{{ i.data?.flight?.invoice?.cargo_sender_name }}</td>
          <td>{{ i.data?.flight?.invoice?.cargo_recipient_name }}</td>
          <td>{{ i.data?.flight?.cargo_code }}</td>
          <td>{{ i.data.wagon_type }}</td>
        </tr>
        <!-- <tr>
          <td>{{ all_information.is_loaded }}</td>
          <td>{{ all_information.contract }}</td>
          <td>{{ all_information.departure_station_name }}</td>
          <td>{{ all_information.destination_station_name }}</td>
          <td>{{ all_information.cargo_sender }}</td>
          <td>{{ all_information.cargo_recipient }}</td>
          <td>{{ all_information.cargo_code }}</td>
          <td>{{ all_information.wagon_type }}</td>
        </tr> -->
      </tbody>
    </table>

    <!-- <div class="row" style="margin-top: 5%">
      <div class="col-md-6">
            <div class="row">
              <div class="col-md-6">
                <select
                  id="input-filter-staff1"
                  v-model="all_information.is_loaded"
                  class="textarea"
                  style="background: white"
                >
                  <option value="true">Груженый</option>
                  <option value="false">Порожний</option>
                </select>

                <br />
                <label
                  for="input-filter-staff1"
                  class="label"
                  style="margin-left: 45% !important; background: white"
                  :class="{ error_label: this.telegram_error.is_loaded }"
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
                />
                <br />
                <label
                  for="input-filter-staff1"
                  class="label"
                  style="margin-left: 45% !important; background: white"
                  :class="{ error_label: this.telegram_error.contract }"
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
                  :myClass="{
                    error_label: this.telegram_error.departure_station_name,
                  }"
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
                  :myClass="{
                    error_label: this.telegram_error.destination_station_name,
                  }"
                ></autocomplete-input>
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
                />
                <br />
                <label
                  for="input-filter-staff1"
                  class="label"
                  style="margin-left: 45% !important; background: white"
                  :class="{ error_label: this.telegram_error.cargo_recipient }"
                  >Грузополучатель</label
                >
              </div>
              <div class="col-md-6">
  

                <input
                  class="textarea"
                  id="input-filter-staff1"
                  name="Pwd"
                  v-model="all_information.cargo_sender"
                  style="background: white"
                />
                <br />
                <label
                  for="input-filter-staff1"
                  class="label"
                  style="margin-left: 45% !important; background: white"
                  :class="{ error_label: this.telegram_error.cargo_sender }"
                  >Грузоотправитель</label
                >
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-6">
                <autocomplete-input
                  :variants="cargo_codes"
                  :variantKey="'id'"
                  :label="'Код груза'"
                  :variantTitle="'code6'"
                  v-model="all_information.cargo_code"
                  :myClass="{ error_label: this.telegram_error.cargo_code }"
                ></autocomplete-input>
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
                  style="margin-left: 45% !important; background: white"
                  :class="{ error_label: this.telegram_error.wagon_type }"
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
                  :placeholder="this.telegram_error.period_begin"
                />
                <br />
                <label
                  for="input-filter-staff1"
                  class="label"
                  style="margin-left: 45% !important; background: white"
                  :class="{ error_label: this.telegram_error.period_begin }"
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
                  style="margin-left: 45% !important; background: white"
                  :class="{ error_label: this.telegram_error.period_end }"
                  >Конец периода</label
                >
              </div>
            </div>
            <br />

            <div>
              <input
                class="textarea"
                name="Pwd"
                v-model="wagon"
                placeholder="номер вагона"
                id="123r"
                style="background: white; width: 91%"
                :class="{ 'has-error': this.errors.wagon }"
              />

              <br />
              <p
                v-if="this.telegram_error.wagon"
                style="font-weight: bold; color: red"
              >
                {{ this.telegram_error.wagon }}
              </p>

            </div>
            <br />
            <div class="row">
              <div class="col-md-6">
                <button
                  class="textarea Action"
                  style="
                    background: #ff9f55 !important;
                    text-decoration: none !important;
                    outline: none !important;
                  "
                  @click="getInfoByWagon()"
                >
                  Информация по вагону
                </button>
              </div>
              <div class="col-md-6">
                <button
                  class="textarea Accept"
                  style="
                    border-radius: 10px;
                    text-decoration: none !important;
                    outline: none !important;
                    background-color: #158127;
                  "
                  @click="createTelegram()"
                >
                  Добавить в таблицу
                </button>
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
      </div>
      <div class="col-md-6">
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </div>
    </div> -->

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
label.label {
  margin-left: 45% !important;
}
.selected-wagons {
  width: 45%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.has-error {
  color: rgb(190, 33, 33) !important;
  border: 1px solid rgb(190, 33, 33) !important;
}
.error_label {
  color: red !important;
}
</style>
  
<script>
import WagonTelegramSearch from "./WagonTelegram/WagonTelegramSearch.vue";
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import api from "@/api/wagonPark";
import Notifications from "@/components/notifications/Notifications.vue";
import MultiSelectSearch from "../ui/MultiSelectSearch.vue";
import AutocompleteInput from "../ui/AutocompleteInput.vue";
import { getItem } from "@/helpers/persistanseStorage";
export default {
  name: "Telegram",
  components: {
    Loader,
    Notifications,
    MultiSelectSearch,
    AutocompleteInput,
    WagonTelegramSearch,
  },
  data() {
    return {
      loader: false,
      wagon: [],
      wagonTypes: [],
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
      telegram_error: {},
      selectedStationsIds: [],
      stations: [],

      items: [],
      WagonNumber: "",
      wagonData: "",
      AllInformation: [],
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
      let preData = response.data.data;
      for (let i in preData) {
        this.wagonTypes.push(preData[i].name);
      }
      this.loader = false;
    });
    this.stations = getItem("station");
  },
  methods: {
    updateSearchTelegram(WagonNumber) {
      this.WagonNumber = WagonNumber;
    },
    getCurrentWagon() {
      this.loader = true;
      let wagonSplit = this.WagonNumber;
      let wagonArray = wagonSplit.split(" ");
      console.log(wagonArray.length);
      let newWagonArray = wagonArray.map((element) =>
        api.postTelegram(element)
      );
      Promise.all(newWagonArray)
        .then((responses) => {
          for (let i in responses) {
            this.AllInformation.push(responses[i]);
          }
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = `${error.response.data}`;
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 1500);
          console.log(new Error("Ошибка"));
        });

      this.loader = false;
    },

    // Номер вагона 51037059 57135303

    getFullStationDeparture(station) {
      this.all_information.departure_station_object = station;
    },
    getFullStationDestination(station) {
      this.all_information.destionation_station_object = station;
    },
    getInfoByWagon() {
      this.loader = true;
      console.log("1");
      if (this.wagon == "") {
        this.errors.wagon = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Введите номер вагона";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
        this.loader = false;
      } else {
        if (this.wagon != "") {
          this.errors.wagon = false;

          let wagonSplit = this.wagon;
          let wagonArray = wagonSplit.split(" ");
          api
            .postTelegram(wagonArray)
            .then((response) => {
              console.log(response.data);
              // this.all_information = response.data;
              Object.assign(this.all_information, response.data);
              // Object.assign(this.all_information, response.data);
              this.all_information.contract =
                response.data.flight.agreement_number;
              this.all_information.departure_station_name =
                response.data.flight?.departure_station_name;
              this.all_information.destination_station_name =
                response.data.flight?.destination_station_name;
              this.all_information.cargo_code =
                response.data.flight?.cargo_code;
              this.all_information.cargo_sender =
                response.data.flight?.invoice?.cargo_sender_name;
              this.all_information.cargo_recipient =
                response.data?.flight?.invoice?.cargo_recipient_name;
              this.all_information.is_loaded = response.data.flight?.is_loaded;
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
              console.log(new Error("Ошибка"));
            });
        }
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
      this.telegram_error = {};

      if (
        this.all_information.is_loaded == "" ||
        this.all_information.is_loaded == null
      ) {
        this.telegram_error = {
          ...this.telegram_error,
          is_loaded: "Выберите состояние",
        };
      }
      if (
        this.all_information.contract == "" ||
        this.all_information.contract == null
      ) {
        this.telegram_error = {
          ...this.telegram_error,
          contract: "Введите № договора",
        };
      }
      if (this.all_information.departure_station_name == "") {
        this.telegram_error = {
          ...this.telegram_error,
          departure_station_name: "Введите станцию",
        };
      }
      if (this.all_information.destination_station_name == "") {
        this.telegram_error = {
          ...this.telegram_error,
          destination_station_name: "Введите станцию",
        };
      }
      if (this.all_information.cargo_recipient == "") {
        this.telegram_error = {
          ...this.telegram_error,
          cargo_recipient: "Выберите получателя",
        };
      }
      if (this.all_information.cargo_sender == "") {
        this.telegram_error = {
          ...this.telegram_error,
          cargo_sender: "Выберите отправителя",
        };
      }

      if (this.all_information.wagon_type == "") {
        this.telegram_error = {
          ...this.telegram_error,
          wagon_type: "Выберите тип вагона",
        };
      }
      if (this.all_information.cargo_code == "") {
        this.telegram_error = {
          ...this.telegram_error,
          cargo_code: "Введите код",
        };
      }

      if (this.period_begin == "") {
        this.telegram_error = {
          ...this.telegram_error,
          period_begin: "Выберите дату",
        };
      }
      if (this.period_end == "") {
        this.telegram_error = {
          ...this.telegram_error,
          period_end: "Выберите дату",
        };
      }
      if (this.wagon == "") {
        this.telegram_error = {
          ...this.telegram_error,
          wagon: "Введите вагон",
        };
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
          destination_station:
            this.all_information.destionation_station_object.code,
          cargo_code: this.all_information.cargo_code,
          cargo_sender: this.all_information.cargo_sender,
          cargo_recipient: this.all_information.cargo_recipient,
        };

        api
          .createTelegram(request)
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
          });
      } else {
        this.loader = false;
        this.notifyHead = "Ошибка";
        this.notifyMessage =
          "Заполните все поля анкеты и повторите создание телеграммы";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
        // TODO: Нотификатор
      }
    },
  },
};
</script>
<template>
  <div>
    <Loader :loader="loader"></Loader>
    <WagonTelegramSearch @updateSearchTelegram="updateSearchTelegram" />
    <div style="display: flex; justify-content: space-between">
      <b-button variant="success" class="search" @click="createTelegram()"
        >Создать телеграмму</b-button
      >
      <b-button variant="primary" class="search" @click="getCurrentWagon()"
        >Найти
      </b-button>
    </div>

    <div
      class="table-responsive text-nowrap"
      style="margin-top: 5%; width: 100%"
    >
      <table class="table table-hover table-bordered table-sm table-responsive">
        <thead>
          <tr>
            <th>№</th>
            <th>Груж/Порож</th>
            <th>№ Договора</th>
            <th>Станция отправ.</th>
            <th>Станция назнач.</th>
            <th>Грузоотправитель</th>
            <th>Грузополучатель</th>
            <th>Код груза</th>
            <th>Тип вагона</th>
            <th>Начало периода</th>
            <th>Конец периода</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <!--      Номер вагона 51037059 57135303 -->
          <tr v-for="i in AllInformation" :key="i.id" :id="i.data.number">
            <td><input type="text" readonly v-model="i.data.number" /></td>
            <td>
              <select
                v-model="i.data.flight.is_loaded"
                style="max-width: 125px !important"
              >
                <option value="true">Груженый</option>
                <option value="false">Порожний</option>
              </select>
            </td>
            <td>
              <input
                class="telegram-input"
                type="text"
                v-model="i.data.flight.agreement_number"
                style="margin: 0 !important"
              />
            </td>
            <td>
              <autocomplete-input
                :variants="stations"
                :variantKey="'id'"
                :label="'Станция отправления'"
                :variantTitle="'name'"
                v-model="i.data.flight.departure_station_name"
                :need-full="true"
                @selected="getFullStationDeparture"
                style="width: 100%; height: 100%"
              ></autocomplete-input>
            </td>
            <td>
              <autocomplete-input
                :variants="stations"
                :variantKey="'id'"
                :label="'Станция назначения'"
                :variantTitle="'name'"
                v-model="i.data.flight.destination_station_name"
                :need-full="true"
                @selected="getFullStationDestination"
                style="width: 100%; height: 100%"
              ></autocomplete-input>
            </td>
            <td>
              <input
                class="telegram-input"
                type="text"
                v-model="i.data.flight.invoice.cargo_sender_name"
                style="margin: 0 !important"
              />
            </td>
            <td>
              <input
                class="telegram-input"
                type="text"
                v-model="i.data.flight.invoice.cargo_recipient_name"
                style="margin: 0 !important"
              />
            </td>
            <td>
              <autocomplete-input
                :variants="cargo_codes"
                :variantKey="'id'"
                :label="'Код груза'"
                :variantTitle="'code6'"
                v-model="i.data.flight.cargo_code"
                style="width: 100%; height: 100%"
              ></autocomplete-input>
            </td>
            <td>
              <select
                name=""
                id=""
                style="max-width: 125px !important"
                v-model="i.data.wagon_type"
              >
                <option v-for="wagType in wagonTypes" :key="wagType">
                  {{ wagType }}
                </option>
              </select>
            </td>
            <td>
              <input type="date" v-model="i.data.period_begin">
            </td>
            <td>
              <input type="date" v-model="i.data.period_end"/>
            </td>
            <td>
              <button
                class="Delete"
                style="margin: 0 !important"
                @click="deleteCurrentRow(i.data.number)"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

input,
select {
  width: 100%;
  height: 100%;
  border: none !important;
}

.search {
  margin-top: 0.5%;
  width: 15%;
}

table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  vertical-align: middle;
}

table.table tr th:first-child {
  width: 60px;
}

table.table tr th:last-child {
  width: 100px;
}

table.table th i {
  font-size: 13px;
  cursor: pointer;
}

table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
}

table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}

table.table td i {
  font-size: 19px;
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
      selected_wagon: [],

       


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
      period_begin: "",
      period_end: "",
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
    // Номер вагона 51037059 57135303
    updateSearchTelegram(WagonNumber) {
      this.WagonNumber = WagonNumber;
    },
    // Получить данные о вагоне
    getCurrentWagon() {
      this.loader = true;
      if (this.WagonNumber.length == 0) {
        this.loader = false;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Введите номер вагона";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 1500);
      } else {
        let wagonArray = this.WagonNumber.split(" ");
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
            setTimeout(() => (this.showNotify = false), 1500);
            console.log(new Error("Ошибка"));
          });
        // document.getElementById('input-live').value = ''
        this.loader = false;
      }
    },
    // Удалить текущую строку отчета по телеграммам
    deleteCurrentRow(wagon) {
      document.getElementById(wagon).remove();
    },
    // Создание телеграммы
    createTelegram() {
      let telegram = [];
      for (let i of this.AllInformation) {
        telegram.push({
          wagon_number: String(i.data.number) ?? "",
          wagon_type: String(i.data.wagon_type) ?? "",
          departure_station_name: String(i.data.flight.departure_station_name) ?? "",
          destination_station_name: String(i.data.flight.destination_station_name) ?? "",
          contract_number: String(i.data.flight.agreement_number) ?? "",
          period_begin: i.data.period_begin ?? "",
          period_end:  i.data.period_end ?? "",
          is_loaded: i.data.flight.is_loaded ?? "",
          cargo_code: String(i.data.flight.cargo_code) ?? "",
          cargo_sender: String(i.data.flight.invoice.cargo_sender_name) ?? "",
          cargo_recipient: String(i.data.flight.invoice.cargo_recipient_name) ?? "",
        });
      }
      api
        .createTelegram(telegram)
        .then((response) => {
          this.loader = false;
          this.notifyHead = "Успешно";
          this.notifyMessage = "Телеграмма создана";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 1500);
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = `${error.response.data}`;
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 1500);
        });
    },

    getFullStationDeparture(station) {
      this.all_information.departure_station_object = station;
    },
    getFullStationDestination(station) {
      this.all_information.destionation_station_object = station;
    },
    getInfoByWagon() {
      this.loader = true;
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
    // createTelegram() {
    //     this.loader = true;
    //     let wagonSplit = this.wagon;
    //     let wagonArray = wagonSplit.split(" ");
    //     const request = {
    //       wagons: wagonArray,
    //       is_loaded: this.all_information.is_loaded,
    //       contract: this.all_information.contract,
    //       period_begin: new Date(this.period_begin),
    //       period_end: new Date(this.period_end),
    //       wagon_type: this.all_information.wagon_type,
    //       departure_station: this.all_information.departure_station_object.code,
    //       destination_station:
    //         this.all_information.destionation_station_object.code,
    //       cargo_code: this.all_information.cargo_code,
    //       cargo_sender: this.all_information.cargo_sender,
    //       cargo_recipient: this.all_information.cargo_recipient,
    //     };
    //     api
    //       .createTelegram(request)
    //       .then((response) => {
    //         this.loader = false;
    //         this.notifyHead = "Успешно";
    //         this.notifyMessage = "Телеграмма создана";
    //         this.notifyClass = "wrapper-success";
    //         this.showNotify = true;
    //         setTimeout(this.closeNotification, 1500);
    //       })
    //       .catch((error) => {
    //         this.loader = false;
    //         this.notifyHead = "Ошибка";
    //         this.notifyMessage = "Телеграмма не создана";
    //         this.notifyClass = "wrapper-error";
    //         this.showNotify = true;
    //         setTimeout(this.closeNotification, 1500);
    //       });

    // },
  },
};
</script>
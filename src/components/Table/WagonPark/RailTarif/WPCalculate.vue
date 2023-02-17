<template>
  <div>
    <Loader :loader="loader" />
    <b-modal ref="modalRailTariff" size="xl" hide-footer>
      <h2>Расчет тарифа</h2>
      <br />
      <div class="pretable">
        <table class="table-sm table-bordered">
          <thead>
            <tr>
              <th>название страны</th>
              <th>тип тарифа</th>
              <th>расстояние, которое пойдет в расчет</th>
              <th>транзитное расстояние, если есть</th>
              <th>расстояние по ТРН№4</th>
              <th>стоимость перевозки за все транспортные средства</th>
              <th>НДС на стоимость перевозки</th>
              <th>стоимость перевозки за 1т</th>
              <th>НДС на стоимость перевозки за 1т</th>
              <th>вагон прикрытия</th>
              <th>НДС на вагон прикрытия</th>
              <th>локомотив</th>
              <th>НДС на локомотив</th>
              <th>Вагон-дизель-электростанция</th>
              <th>охрана и договорная охрана</th>
              <th>НДС на охрану</th>
              <th>доп. сборы</th>
              <th>НДС на доп. сборы</th>
              <th>сопровождение</th>
              <th>НДС на сопровождение</th>
              <th>итого без НДС</th>
              <th>итоговая стоимость</th>
              <th>суммарный НДС</th>
              <th>стоимость за 1т</th>
              <th>стоимость за 1т без НДС</th>
              <th>аббревиатура валюты</th>
              <th>код валюты</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tarif in result" :key="tarif.id">
              <td>1{{ tarif.country_name }}</td>
              <td>1{{ tarif.calc_type }}</td>
              <td>1{{ tarif.distance }}</td>
              <td>1{{ tarif.distance_transit }}</td>
              <td>11{{ tarif.distance_real }}</td>
              <td>11{{ tarif.base_price }}</td>
              <td>11{{ tarif.base_price_nds }}</td>
              <td>11{{ tarif.base_pert }}</td>
              <td>11{{ tarif.base_pert_nds }}</td>
              <td>11{{ tarif.buffer_car_price }}</td>
              <td>11{{ tarif.buffer_car_price_nds }}</td>
              <td>11{{ tarif.locomotive_price }}</td>
              <td>11{{ tarif.locomotive_price_nds }}</td>
              <td>11{{ tarif.wagon_diesel_el_price }}</td>
              <td>11{{ tarif.guard_price }}</td>
              <td>11{{ tarif.guard_price_nds }}</td>
              <td>11{{ tarif.add_dues }}</td>
              <td>11{{ tarif.add_dues_nds }}</td>
              <td>11{{ tarif.sopr_price }}</td>
              <td>11{{ tarif.sopr_cost_nds }}</td>
              <td>11{{ tarif.total_cost_wo_nds }}</td>
              <td>11{{ tarif.total_price }}</td>
              <td>11{{ tarif.nds }}</td>
              <td>11{{ tarif.pert }}</td>
              <td>11{{ tarif.pert_wo_nds }}</td>
              <td>11{{ tarif.abbr }}</td>
              <td>11{{ tarif.currency_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="button Delete" style="width: 10%; float: right; margin-top: 3%  !important; margin-right: 10% !important;" block @click="hideModal">Закрыть</button>

    </b-modal>
    <div style="display: flex">
      <div style="width: 80%">
        <b-card
          no-body
          style="margin-left: -5% !important; height: 90vh !important"
        >
          <b-tabs pills card vertical style="height: 90vh !important">
            <b-tab title="Станции отправления/назначения" active>
              <b-card-text>
                <Stations
                  @destination="getDestinationStation"
                  @departure="getDepartureStation"
                  @is_loaded="getIsLoaded"
                  @international="getInternational"
                  @on_date="getDate"
                />
              </b-card-text>
            </b-tab>
            <b-tab title="Отправка">
              <b-card-text>
                <Shipment
                  @shipment="getShipment"
                  @is_exit_route="getIsExitRoute"
                  @speed="getSpeed"
                />
              </b-card-text>
            </b-tab>
            <b-tab title="Груз">
              <b-card-text>
                <Cargo @weight="getWeight" @estng="getESTNG" @gng="getGNG" />
              </b-card-text>
            </b-tab>
            <b-tab title="Вагон">
              <b-card-text>
                <Wagon
                  @wagon="wagonType"
                  @belong="wagonBelong"
                  @amount="wagonAmount"
                />
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
      <div class="result">
        <p>
          Дата: <span>{{ date }}</span>
        </p>
        <p>
          Ст. отправ: <span>{{ departure.departure }}</span>
        </p>
        <p>
          Ст. назнач: <span>{{ destination.destination }}</span>
        </p>
        <p>
          Груж/Порожний:<span>{{ translateBoolIsLoaded(is_loaded) }}</span>
        </p>
        <p>
          Международный<span>{{ translateInternational(international) }}</span>
        </p>

        <!-- Отправка -->
        <p>
          Отправка: <span>{{ shipment.shipment }}</span>
        </p>
        <p>
          Скорость: <span>{{ speed }}</span>
        </p>
        <p>
          Вид маршрута: <span>{{ getIsExitRouteById(is_exit_route) }}</span>
        </p>

        <!-- Груз -->
        <p>
          ЕСТНГ: <span>{{ estng }}</span>
        </p>
        <p>
          Вес: <span>{{ weight }}</span>
        </p>
        <p>
          ГНГ: <span>{{ gng }}</span>
        </p>
        <!-- Вагон -->
        <p>
          Тип вагона: <span>{{ wagon.wagon_type }}</span>
        </p>
        <p>
          Количество: <span>{{ amount }}</span>
        </p>
        <p>
          Принадлежность: <span>{{ getBelongById(belong.belong) }}</span>
        </p>

        <button class="button Accept" @click="Calculation()">
          Рассчитать тариф
        </button>
        <br />
        <!-- v-if="modalData" -->
        <button @click="showModal()" class="button Request">
          Открыть расчет
        </button>
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
* {
  padding: 0 !important;
  margin: 0 !important;
}
table{
  background: white;
}
th{
  padding: 5px !important;
  max-height: 85px;
  font-size: 12px;
  min-width: 70px;
  font-family: 'Montserrat', sans-serif;
}
.pretable {
  max-width: 80% !important;
  overflow: auto;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.result {
  border-left: 1px solid #c2c2c2;
  height: 90vh;
  width: 20%;
  text-align: center;
}
.result p {
  color: #dfdfdf;
  font-weight: 600;
  text-align: left;
  padding-left: 2% !important;
}
.result span {
  color: #949494;
}
</style>
<script>
import Stations from "./WPCalculateComponents/Stations.vue";
import Shipment from "./WPCalculateComponents/Shipment.vue";
import Wagon from "./WPCalculateComponents/Wagon.vue";
import Cargo from "./WPCalculateComponents/Cargo.vue";
import api from "@/api/wagonPark";
import { getItem } from "@/helpers/persistanseStorage";
import Loader from "@/components/loader/loader.vue";
// import ModalRailTariff from "./WPCalculateComponents/ModalRailTariff.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  name: "WPCalculate",
  components: { Stations, Shipment, Wagon, Cargo, Loader, Notifications },
  data() {
    return {
      destination: "",
      departure: "",
      is_loaded: "",
      international: "",
      shipment: "",
      wagon: "",
      belong: "",
      amount: "",
      date: "",
      is_exit_route: "",
      speed: "",
      weight: "",
      estng: "",
      gng: "",
      loader: false,

      stations: [],
      result: [],
      route: "",
      modalData: false,

      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  mounted() {
    this.loader = true;
    setTimeout(() => (this.loader = false), 1800);
    this.stations = getItem("station");
  },
  methods: {
    showModal() {
      this.$refs["modalRailTariff"].show();
    },
    hideModal() {
      this.$refs["modalRailTariff"].hide();
    },
    toggleModal() {
      this.$refs["modalRailTariff"].toggle("#toggle-btn");
    },
    Calculation() {
      this.loader = true;
      let data = {
        on_date: this.date,
        is_empty: this.is_loaded,
        is_international: this.international,
        departure: {
          station_code: this.getCodeStation(this.departure.departure),
        },
        destination: {
          station_code: this.getCodeStation(this.destination.destination),
        },
        shipment: {
          shipment_id: this.shipment.id,
          is_exit_route: this.is_exit_route,
          speed: this.speed,
        },
        cargo: {
          code_etsng: this.estng,
          weight: this.weight,
          code_gng: this.gng,
        },
        wagon: {
          type_id: this.wagon.wagon_id,
          belong_id: this.belong.belong,
          amount: this.amount,
        },
      };
      // console.log(data)
      api
        .postRailTarif(data)
        .then((response) => {
          this.result = response.data.result;
          this.loader = false;
          this.notifyHead = "Успешно";
          this.notifyMessage = 'Нажмите кнопку "открыть расчет" для просмотра';
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 1500);
        })
        .then((response) => {
          this.modalData = true;
        })
        .catch((error) => {
          console.log(error);
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "По данным невозможно расчитать тариф";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 1500);
        });
    },
    getCodeStation(station) {
      if (station == null || station == undefined) {
        return "";
      }
      if (typeof station === "number") {
        return station;
      } else {
        return this.stations.find((item) => item.name === station).code6;
      }
    },
    getDestinationStation(data) {
      this.destination = data;
    },
    getDepartureStation(data) {
      this.departure = data;
    },
    getIsLoaded(data) {
      this.is_loaded = data;
    },
    getInternational(data) {
      this.international = data;
    },
    getShipment(data) {
      this.shipment = data;
    },
    wagonType(data) {
      this.wagon = data;
    },
    translateBoolIsLoaded(data) {
      return data == true ? "Груженый" : "Порожний";
    },
    translateInternational(data) {
      return data == true ? "Международный" : "Внутренний";
    },
    wagonBelong(data) {
      this.belong = data;
    },
    wagonAmount(data) {
      this.amount = data;
    },
    getDate(data) {
      this.date = data;
    },
    getIsExitRoute(data) {
      this.is_exit_route = data;
    },
    getSpeed(data) {
      this.speed = data;
    },
    getWeight(data) {
      this.weight = data;
    },
    getESTNG(data) {
      this.estng = data;
    },
    getGNG(data) {
      this.gng = data;
    },
    getIsExitRouteById(id) {
      if (id == 0) {
        return "Немаршрутная";
      }
      if (id == 1) {
        return "Прямой отправительский маршрут";
      }
      if (id == 2) {
        return "Замкнутый кольцевой маршрут";
      }
      if (id == 3) {
        return "ЗКМ ПОМ";
      }
      if (id == 4) {
        return "Отправительский маршрут с распыл.";
      }
      if (id == 5) {
        return "Кольцевая маршрутная";
      } else {
        return "Отдельным поездом по спец. разработ. расписанию";
      }
    },
    getBelongById(id) {
      if (id == 1) {
        return "Инвентарный парк";
      }
      if (id == 2) {
        return "Собственный";
      }
      if (id == 3) {
        return "Арендованный";
      } else {
        return "Привлеченный ОАО 'РЖД'";
      }
    },
  },
};
</script>
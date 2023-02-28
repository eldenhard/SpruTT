<template>
  <div>
    <Loader :loader="loader" />
    <b-modal
      ref="modalRailTariff"
      size="md"
      hide-footer
      style="width: 95% !important"
    >
      <template #modal-title> Расчет тарифа </template>
      <br />

      <div class="pretable" v-for="tarif in result" :key="tarif.id">
        <h4 style="text-align: left; margin-bottom: 2%">Расстоянние и срок</h4>
        <div
          style="display: flex; align-items: flex-start; justify-content: flex-start"
        >
          <label for="f1"
            >Страна <br />
            <input type="text" readonly class="textarea" :value="tarif.country_name">
          </label>
          <label for="f1"
            >Тип тарифа <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.calc_type" />
          </label>
          <label for="f1"
            >Расстояние <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.distance"/>
          </label>
        </div>
        <div
          style="display: flex; align-items: flex-start; justify-content: flex-start"
        >
          <label for="f1"
            >Транзитное расстояние <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.distance_transit"/>
          </label>
          <label for="f1"
            >Расстояние по ТРН№4 <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.distance_real"/>
          </label>
          <label for="f1"
            >Срок <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.delivery_days"/>
          </label>
        </div>

        <div>
          <h4 style="text-align: left; margin-bottom: 2%">НДС</h4>
          <div
            style="display: flex;
              align-items: flex-start;
              justify-content: start;
            "
          >
            <label for="f1"
              >НДС на стоимость перевозки <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.base_price_nds.toFixed(2)"/>
            </label>
            <label for="f1"
              >НДС на стоимость перевозки за 1т <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.base_pert_nds.toFixed(2)"/>
            </label>
            <label for="f1"
              >НДС на вагон прикрытия <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.buffer_car_price_nds.toFixed(2)"/>
            </label>
          </div>
          <div
            style="
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
            "
          >
            <label for="f1"
              >НДС на локомотив <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.locomotive_price_nds.toFixed(2)"/>
            </label>
            <label for="f1"
              >НДС на охрану <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.guard_price_nds.toFixed(2)"/>
            </label>
            <label for="f1"
              >НДС на доп. сборы <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.add_dues_nds.toFixed(2)"/>
            </label>
          </div>
          <div
            style="display: flex;
              align-items: flex-start;
              justify-content: flex-start;
            "
          >
            <label for="f1"
              >НДС на сопровождение <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.sopr_cost_nds.toFixed(2)"/>
            </label>
            <label for="f1"
              >суммарный НДС <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.nds.toFixed(2)"/>
            </label>
          </div>
        </div>

        <h4 style="text-align: left; margin-bottom: 2%">Доп траты</h4>
        <div
          style="display: flex; align-items: flex-start; justify-content: start"
        >
          <label for="f1"
            >Вагон прикрытия <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.buffer_car_price.toFixed(2)"/>
          </label>
          <label for="f1"
            >Локомотив <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.locomotive_price.toFixed(2)"/>
          </label>
          <label for="f1"
            >Вагон-дизель-электростанция <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.wagon_diesel_el_price.toFixed(2)"/>
          </label>
        </div>
        <div
          style="display: flex; align-items: flex-start; justify-content: start"
        >
          <label for="f1"
            >Охрана и дог. охрана <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.guard_price.toFixed(2)"/>
          </label>
          <label for="f1"
            >Доп. сборы <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.add_dues.toFixed(2)"/>
          </label>
          <label for="f1"
            >Сопровождение <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.sopr_price.toFixed(2)"/>
          </label>
        </div>
        <div
          style="display: flex; align-items: flex-start; justify-content: start"
        >
          <label for="f1"
            >Итого без НДС <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.total_cost_wo_nds.toFixed(2)"/>
          </label>
        </div>
        <h4 style="text-align: left; margin-bottom: 2%">Стоимости</h4>
        <div
          style="display: flex; align-items: flex-start; justify-content: flex-start"
        >
          <label for="f1"
            >Стоимость перевозки за все т/с <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.base_price.toFixed(2)"/>
          </label>
          <label for="f1"
            >Стоимость перевозки за 1т <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.base_pert.toFixed(2)"/>
          </label>
          <label for="f1"
            >Итоговая стоимость <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.total_price.toFixed(2)"/>
          </label>
        </div>
        <div
          style="display: flex; align-items: flex-start; justify-content: start"
        >
          <label for="f1"
            >Стоимость за 1т <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.pert.toFixed(2)"/>
          </label>
          <label for="f1"
            >Стоимость за 1т без НДС <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.pert_wo_nds.toFixed(2)"/>
          </label>
          <label for="f1"
            >Аббревиатура валюты <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.abbr.toFixed(2)"/>
          </label>
        </div>
        <div
          style="display: flex; align-items: flex-start; justify-content: start"
        >
          <label for="f1"
            >Код валюты <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.currency_id"/>
          </label>
        </div>
      </div>
      <button
        class="button Delete railbtn"
        style="width: 10%;
          float: right;
          margin-top: 3% !important;
          margin-right: 1% !important;
        "
        block
        @click="hideModal"
      >
        Закрыть
      </button>
    </b-modal>
    <div style="display: flex">
      <div style="width: 80% !important">
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
        <p>Дата: <span>{{ date }}</span></p>
        <p>Ст. отправ: <span>{{ departure.departure }}</span></p>
        <p>Ст. назнач: <span>{{ destination.destination }}</span></p>
        <p>Груж/Порожний:<span>{{ translateBoolIsLoaded(is_loaded) }}</span></p>
        <p> Международный<span>{{ translateInternational(international) }}</span></p>
        <!-- Отправка -->
        <p>Отправка: <span>{{ shipment.shipment }}</span></p>
        <p> Скорость: <span>{{ speed }}</span></p>
        <p>Вид маршрута: <span>{{ getIsExitRouteById(is_exit_route) }}</span></p>
        <!-- Груз -->
        <p>ЕСТНГ: <span>{{ estng.estng }}</span></p>
        <p>Вес: <span>{{ weight }}</span></p>
        <p>ГНГ: <span>{{ gng.gng }}</span></p>
        <!-- Вагон -->
        <p>Тип вагона: <span>{{ wagon.wagon_type }}</span></p>
        <p>Количество: <span>{{ amount }}</span></p>
        <p>Принадлежность: <span>{{ getBelongById(belong.belong) }}</span> </p>
        <br />
        <button class="button Accept railbtn" @click="Calculation()">
          Рассчитать тариф
        </button>
        <br />
        <button @click="showModal()" class="button Request railbtn" v-show="WatchCost">
          Открыть расчет
        </button>
        <div class="resultCost" v-show="WatchCost">
         <h4 class="totalAll">Итоговая стоимость: {{ split_number(cost) }}</h4>  
            <br />
          <h4  class="totalAll">Кол-во дней: {{ days }}</h4> 
            <br />
          <h4  class="totalAll">Расстояние: {{ distance }} </h4>
        </div>
        <!-- v-show="WatchCost" -->
        <!-- v-if="modalData" -->
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
label {
  color: grey;
  font-size: 1rem;
}
.resultCost {
  position: absolute;
  bottom: 25%;
  font-weight: 500;
  font-family: "Montserrat", sans-serif;
  color: grey;
}
.resultCost h4{
  text-align: left;
  font-size: 0.8rem;
  margin-left: 10px !important;
}
.textarea {
  background: white;
  margin-right: 2px !important;
  height: 30px;
}
.railbtn {
  height: 40px;
  margin-top: 5% !important;
  margin-left: 10px !important;
}

table {
  background: white;
}

th {
  font-family: "Montserrat", sans-serif;
  font-size: 13px !important;
  padding: 0 !important;
  margin: 0 !important;
}

.pretable {
  max-width: 100% !important;
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
      WatchCost: false,
      cost: "",
      days: "",
      distance: "",

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
    split_number(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
          code_etsng: this.estng.estng,
          weight: this.weight,
          code_gng: this.estng.gng,
        },
        wagon: {
          type_id: this.wagon.wagon_id,
          belong_id: this.belong.belong,
          amount: this.amount,
        },
      };

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
          this.modalData = true;
          this.WatchCost = true;
          for (let i in this.result) {
            this.cost = this.result[i].total_price + " руб";
            this.days = this.result[i].delivery_days + " дней";
            this.distance = this.result[i].distance + " км";
          }
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
      console.log(isFinite(station))
      console.log('1')
      if (station == null || station == undefined) {
        return "";
      }
      if (/[0-9]/.test(station)) {
        return station;
      } else {
        return this.stations.find((item) => item.name === station)?.code6;
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
      this.gng = data
    },
    getGNG(data) {
      this.estng = data;
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
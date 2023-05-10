<template>
  <div>
    <Loader :loader="loader" />

    <b-modal
      ref="modalRoute"
      size="lg"
      hide-footer
      style="width: 95% !important"
    >
      <template #modal-title> Маршрут </template>
      <br />
      <b-tabs content-class="mt-3">
    <b-tab title="Прямой" active>
      <div class="pretable">
        <table class="table table-sm table-bordered">
          <thead>
            <th>код станции</th>
            <th>название станции </th>
            <th>расстояние</th>
            <th>код страны</th>
            <th>код дороги</th>
            <th>признак того, что станция является экспортной</th>
          </thead>
          <tbody>
            <tr v-for="rt in route" :key="rt.id">
              <td>{{ rt.station_code }}</td>
              <td>{{ rt.station_name }}</td>
              <td>{{ rt.distance }}</td>
              <td>{{ rt.country_code }}</td>
              <td>{{ rt.road_code }}</td>
              <td>{{ rt.is_exp }}</td>
            </tr>
          </tbody>
        </table>
        <button
        class="button Delete railbtn" style="width: 10%; float: right;margin-top: 2% !important; margin-bottom: 1% !important;
          margin-right: 1% !important; " block @click="hideModalRoute()">Закрыть
      </button>
      </div>
    </b-tab>
    <b-tab title="Обратный">
      <div class="pretable">
        <table class="table table-sm table-bordered">
          <thead>
            <th>код станции</th>
            <th>название станции </th>
            <th>расстояние</th>
            <th>код страны</th>
            <th>код дороги</th>
            <th>признак того, что станция является экспортной</th>
          </thead>
          <tbody>
            <tr v-for="bwr in backward_route" :key="bwr.id">
              <td>{{ bwr.station_code }}</td>
              <td>{{ bwr.station_name }}</td>
              <td>{{ bwr.distance }}</td>
              <td>{{ bwr.country_code }}</td>
              <td>{{ bwr.road_code }}</td>
              <td>{{ bwr.is_exp }}</td>
            </tr>
          </tbody>
        </table>
        <button
        class="button Delete railbtn" style="width: 10%; float: right;margin-top: 2% !important; margin-bottom: 1% !important;
          margin-right: 1% !important; " block @click="hideModalRoute()">Закрыть
      </button>
      </div>
    </b-tab>
  </b-tabs>

      </b-modal>
    <b-modal
      ref="modalRailTariff"
      size="lg"
      hide-footer
      style="width: 95% !important; background: #FFFFFF !important;"
    >
      <template #modal-title> Расчет тарифа </template>
      <br />
      <div style="background: #FFFFFF !important;">
    <b-card no-body style="background: #FFFFFF !important;">
    <b-tabs pills card vertical style="background: #FFFFFF !important;">
      <b-tab title="Прямой" active style="background: #FFFFFF !important;">
        <b-card-text style="background: #FFFFFF !important;">
          <b-tabs content-class="mt-3">
              <b-tab :title="tarif.country_name"  v-for="tarif in result" :key="tarif.id">
      <div class="pretable">
        <h4 style="text-align: left; margin-bottom: 2%">Расстоянние и срок</h4>
        <div style="display: flex; align-items: flex-start; justify-content: flex-start">
          <label for="f1">Страна <br />
            <input type="text" readonly class="textarea" :value="tarif.country_name">
          </label>
          <label for="f1">Тип тарифа <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.calc_type" />
          </label>
          <label for="f1">Расстояние <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.distance"/>
          </label>
        </div>
        <div style="display: flex; align-items: flex-start; justify-content: flex-start">
          <label for="f1">Транзитное расстояние <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.distance_transit"/>
          </label>
          <label for="f1">Расстояние по ТРН№4 <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.distance_real"/>
          </label>
          <label for="f1">Срок <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.delivery_days"/>
          </label>
        </div>
        <div>
          <h4 style="text-align: left; margin-bottom: 2%">НДС</h4>
          <div style="display: flex; align-items: flex-start; justify-content: start;">
            <label for="f1">НДС на стоимость перевозки <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.base_price_nds?.toFixed(2)"/>
            </label>
            <label for="f1">НДС на стоимость перевозки за 1т <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.base_pert_nds?.toFixed(2)"/>
            </label>
            <label for="f1">НДС на вагон прикрытия <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.buffer_car_price_nds?.toFixed(2)"/>
            </label>
          </div>
          <div style="display: flex; align-items: flex-start; justify-content: flex-start;">
            <label for="f1">НДС на локомотив <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.locomotive_price_nds?.toFixed(2)"/>
            </label>
            <label for="f1">НДС на охрану <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.guard_price_nds?.toFixed(2)"/>
            </label>
            <label for="f1">НДС на доп. сборы <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.add_dues_nds?.toFixed(2)"/>
            </label>
          </div>
          <div
            style="display: flex;align-items: flex-start;justify-content: flex-start;">
            <label for="f1">НДС на сопровождение <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.sopr_cost_nds?.toFixed(2)"/>
            </label>
            <label for="f1">суммарный НДС <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.nds?.toFixed(2)"/>
            </label>
          </div>
        </div>

        <h4 style="text-align: left; margin-bottom: 2%">Доп траты</h4>
        <div style="display: flex; align-items: flex-start; justify-content: start">
          <label for="f1">Вагон прикрытия <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.buffer_car_price?.toFixed(2)"/>
          </label>
          <label for="f1">Локомотив <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.locomotive_price?.toFixed(2)"/>
          </label>
          <label for="f1">Вагон-дизель-электростанция <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.wagon_diesel_el_price?.toFixed(2)"/>
          </label>
        </div>
        <div style="display: flex; align-items: flex-start; justify-content: start">
          <label for="f1"
            >Охрана и дог. охрана <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.guard_price?.toFixed(2)"/>
          </label>
          <label for="f1">Доп. сборы <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.add_dues?.toFixed(2)"/>
          </label>
          <label for="f1">Сопровождение <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.sopr_price?.toFixed(2)"/>
          </label>
        </div>
        <div style="display: flex; align-items: flex-start; justify-content: start">
          <label for="f1">Итого без НДС <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.total_cost_wo_nds?.toFixed(2)"/>
          </label>
        </div>
        <h4 style="text-align: left; margin-bottom: 2%">Стоимости</h4>
        <div style="display: flex; align-items: flex-start; justify-content: flex-start">
          <label for="f1">Стоимость перевозки за все т/с <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.base_price?.toFixed(2)"/>
          </label>
          <label for="f1">Стоимость перевозки за 1т <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.base_pert?.toFixed(2)"/>
          </label>
          <label for="f1">Итоговая стоимость <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.total_price?.toFixed(2)"/>
          </label>
        </div>
        <div style="display: flex; align-items: flex-start; justify-content: start">
          <label for="f1"
            >Стоимость за 1т <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.pert?.toFixed(2)"/>
          </label>
          <label for="f1"
            >Стоимость за 1т без НДС <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.pert_wo_nds?.toFixed(2)"/>
          </label>
          <label for="f1"
            >Аббревиатура валюты <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.abbr"/>
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
        <div style="display: flex; justify-content: space-around; margin-top: 2%">
    </div>
      </div>
              </b-tab>
      </b-tabs>
        </b-card-text>
      </b-tab>
      <b-tab title="Обратный" style="background: #FFFFFF !important;">
        <b-card-text style="background: #FFFFFF !important;">
      <b-tabs content-class="mt-3" style="background: #FFFFFF !important;">
    <b-tab :title="tarif.country_name"  v-for="tarif in backward_result" :key="tarif.id" style="background: #FFFFFF !important;">
      <div class="pretable">
        <h4 style="text-align: left; margin-bottom: 2%">Расстоянние и срок</h4>
        <div style="display: flex; align-items: flex-start; justify-content: flex-start">
          <label for="f1">Страна <br />
            <input type="text" readonly class="textarea" :value="tarif.country_name">
          </label>
          <label for="f1">Тип тарифа <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.calc_type" />
          </label>
          <label for="f1">Расстояние <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.distance"/>
          </label>
        </div>
        <div style="display: flex; align-items: flex-start; justify-content: flex-start">
          <label for="f1">Транзитное расстояние <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.distance_transit"/>
          </label>
          <label for="f1">Расстояние по ТРН№4 <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.distance_real"/>
          </label>
          <label for="f1">Срок <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.delivery_days"/>
          </label>
        </div>
        <div>
          <h4 style="text-align: left; margin-bottom: 2%">НДС</h4>
          <div style="display: flex; align-items: flex-start; justify-content: start;">
            <label for="f1">НДС на стоимость перевозки <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.base_price_nds?.toFixed(2)"/>
            </label>
            <label for="f1">НДС на стоимость перевозки за 1т <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.base_pert_nds?.toFixed(2)"/>
            </label>
            <label for="f1">НДС на вагон прикрытия <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.buffer_car_price_nds?.toFixed(2)"/>
            </label>
          </div>
          <div style="display: flex; align-items: flex-start; justify-content: flex-start;">
            <label for="f1">НДС на локомотив <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.locomotive_price_nds?.toFixed(2)"/>
            </label>
            <label for="f1">НДС на охрану <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.guard_price_nds?.toFixed(2)"/>
            </label>
            <label for="f1">НДС на доп. сборы <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.add_dues_nds?.toFixed(2)"/>
            </label>
          </div>
          <div
            style="display: flex;align-items: flex-start;justify-content: flex-start;">
            <label for="f1">НДС на сопровождение <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.sopr_cost_nds?.toFixed(2)"/>
            </label>
            <label for="f1">суммарный НДС <br />
              <input type="text" id="f1" class="textarea" readonly :value="tarif.nds?.toFixed(2)"/>
            </label>
          </div>
        </div>

        <h4 style="text-align: left; margin-bottom: 2%">Доп траты</h4>
        <div style="display: flex; align-items: flex-start; justify-content: start">
          <label for="f1">Вагон прикрытия <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.buffer_car_price?.toFixed(2)"/>
          </label>
          <label for="f1">Локомотив <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.locomotive_price?.toFixed(2)"/>
          </label>
          <label for="f1">Вагон-дизель-электростанция <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.wagon_diesel_el_price?.toFixed(2)"/>
          </label>
        </div>
        <div style="display: flex; align-items: flex-start; justify-content: start">
          <label for="f1"
            >Охрана и дог. охрана <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.guard_price?.toFixed(2)"/>
          </label>
          <label for="f1">Доп. сборы <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.add_dues?.toFixed(2)"/>
          </label>
          <label for="f1">Сопровождение <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.sopr_price?.toFixed(2)"/>
          </label>
        </div>
        <div style="display: flex; align-items: flex-start; justify-content: start">
          <label for="f1">Итого без НДС <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.total_cost_wo_nds?.toFixed(2)"/>
          </label>
        </div>
        <h4 style="text-align: left; margin-bottom: 2%">Стоимости</h4>
        <div style="display: flex; align-items: flex-start; justify-content: flex-start">
          <label for="f1">Стоимость перевозки за все т/с <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.base_price?.toFixed(2)"/>
          </label>
          <label for="f1">Стоимость перевозки за 1т <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.base_pert?.toFixed(2)"/>
          </label>
          <label for="f1">Итоговая стоимость <br />
            <input type="text" id="f1" class="textarea" readonly :value="tarif.total_price?.toFixed(2)"/>
          </label>
        </div>
        <div style="display: flex; align-items: flex-start; justify-content: start">
          <label for="f1"
            >Стоимость за 1т <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.pert?.toFixed(2)"/>
          </label>
          <label for="f1"
            >Стоимость за 1т без НДС <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.pert_wo_nds?.toFixed(2)"/>
          </label>
          <label for="f1"
            >Аббревиатура валюты <br />
            <input type="text" id="f1" class="textarea" readonly  :value="tarif.abbr"/>
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
        <div style="display: flex; justify-content: space-around; margin-top: 2%">
    </div>
      </div>
        </b-tab>
  
      </b-tabs>

        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>

      </div>
     
      <button
        class="button Delete railbtn" style="width: 10%; float: right; margin-top: 1% !important;
    margin-right: 1% !important; " block @click="hideModal">Закрыть
      </button>
    </b-modal>

    <!-- ПОЛУЧЕНИЕ ДАННЫХ ОТ ДОЧЕРНЕГО ЭЛЕМЕНТА -->
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
                  @reverse="getReverseStation"
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
        <p>Ст. отправ: <span>{{ departure.departure }}</span> <span v-if="departure.code6">({{ departure.code6 }})</span></p>
        <p>Ст. назнач: <span>{{ destination.destination }}</span> <span v-if="destination.code6">({{ destination.code6 }})</span></p>
        <p>Ст. возврата: <span>{{ reverse.reverse }}</span></p>

        <p>Груж/Порожний: <span>{{ translateBoolIsLoaded(is_loaded) }}</span></p>
        <p> Международный: <span>{{ translateInternational(international) }}</span></p>
        <!-- Отправка -->
        <p>Отправка: <span>{{ shipment.shipment }}</span></p>
        <p> Скорость: <span>{{ TranslateSpeed(speed) }}</span></p>
        <p>Вид маршрута: <span>{{ getIsExitRouteById(is_exit_route) }}</span></p>
        <!-- Груз -->
        <p>ЕСТНГ: <span>{{ estng.estng }}</span></p>
        <p>Вес: <span >{{ weight }} т</span></p>
        <p>ГНГ: <span>{{ gng.gng }}</span></p>
        <!-- Вагон -->
        <p>Тип вагона: <span>{{ wagon.wagon_type }}</span></p>
        <p>Количество: <span>{{ amount }} шт</span></p>
        <p>Принадлежность: <span>{{ getBelongById(belong.belong) }}</span> </p>
        <br />
        <button class="button Accept railbtn" @click="Calculation()">
          Рассчитать тариф
        </button>
        <button @click="showModal()" class="button Request railbtn"  v-show="WatchCost">
          Открыть расчет
        </button>
        <!-- v-show="WatchCost" -->
        <button @click="showModalRoute()" class="button Request railbtn"  v-show="WatchCost">
          Открыть маршрут
        </button>
        <br>
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
  margin-top: 10%;
  position: absolute;
  /* bottom: 5%; */
  font-family: "Montserrat", sans-serif;
  color: grey;
  line-height: 10px;
}
.resultCost h4{
  text-align: left;
  font-size: 1rem;
  font-weight: 700;
  margin-left: 10px !important;
}
.textarea {
  background: white;
  margin-right: 2px !important;
  height: 30px;
  border: 1px solid grey !important;
  text-indent: 15px !important;
  text-align: left  !important;
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
  background: #FFFFFF !important;
  margin-bottom: 1% !important;
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
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
export default {
  name: "WPCalculate",
  components: { Stations, Shipment, Wagon, Cargo, Loader, Notifications },
  data() {
    return {
      destination: "",
      departure: "",
      reverse: "",
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
      backward_result: [],
      backward_route: [],
      route: "",
      modalData: false,
      WatchCost: false,
      cost: "",
      days: "",
      distance: "",
      route: "",

      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",

      alert: false,
    };
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
      let result = number.replace(/\.[^.]+$/, '')
      return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    showModalRoute(){
      this.$refs["modalRoute"].show();
    },
    hideModalRoute(){
      this.$refs["modalRoute"].hide();

    },
    TranslateSpeed(a){
      return a==1 ? 'Большая': 'Грузовая'
    },
    Calculation() {
      this.loader = true;
      let data = {
        on_date: this.date,
        is_empty: this.is_loaded,
        is_international: this.international,
        departure: {
          station_code: this.departure.code6 ?? null,
        },
        destination: {
          station_code: this.destination.code6 ?? null,
        },
        reverse: {
            station_code: this.reverse.code6 ?? null
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
      // let data = {
      //   on_date: "",
      //   is_empty: false,
      //   is_international: "",
      //   departure: {
      //     station_code: "648202",
      //   },
      //   destination: {
      //     station_code: "000010",
      //   },
      //   shipment: {
      //     shipment_id: 1,
      //     is_exit_route: "1",
      //     speed: "4",
      //   },
      //   reverse: {
      //       station_code:  '254905'
      //   },
      //   cargo: {
      //     code_etsng: "017035",
      //     weight: "3",
      //     code_gng: "10063000",
      //   },
      //   wagon: {
      //     type_id: 3,
      //     belong_id: "2",
      //     amount: "2",
      //   },
      // };
//       this.result = [
//     {
//         "abbr": "RUB",
//         "add_dues": 0,
//         "add_dues_nds": 0,
//         "base_pert": 32442,
//         "base_pert_nds": 0,
//         "base_price": 194652,
//         "base_price_nds": 0,
//         "buffer_car_price": 0,
//         "buffer_car_price_nds": 0,
//         "calc_type": 18,
//         "country_name": "Россия",
//         "currency_id": 810,
//         "delivery_days": 0,
//         "distance": 2042,
//         "distance_real": 2042,
//         "distance_transit": 0,
//         "guard_price": 0,
//         "guard_price_nds": 0,
//         "locomotive_price": 0,
//         "locomotive_price_nds": 0,
//         "nds": 0,
//         "pert": 32442,
//         "pert_wo_nds": 32442,
//         "sopr_cost_nds": 0,
//         "sopr_price": 0,
//         "total_cost_wo_nds": 194652,
//         "total_price": 194652,
//         "wagon_diesel_el_price": 0
//     },
//      {
//         "abbr": "",
//         "add_dues": 0,
//         "add_dues_nds": 0,
//         "base_pert": 0,
//         "base_pert_nds": 0,
//         "base_price": 0,
//         "base_price_nds": 0,
//         "buffer_car_price": 0,
//         "buffer_car_price_nds": 0,
//         "calc_type": 0,
//         "country_name": "Финляндия",
//         "currency_id": 0,
//         "delivery_days": 0,
//         "distance": 260,
//         "distance_real": 260,
//         "distance_transit": 0,
//         "guard_price": 0,
//         "guard_price_nds": 0,
//         "locomotive_price": 0,
//         "locomotive_price_nds": 0,
//         "nds": 0,
//         "pert": 0,
//         "pert_wo_nds": 0,
//         "sopr_cost_nds": 0,
//         "sopr_price": 0,
//         "total_cost_wo_nds": 0,
//         "total_price": 0,
//         "wagon_diesel_el_price": 0
//     }
// ]
// console.log(this.result.length)
      api
        .postRailTarif(data)
        .then((response) => {
          // обратный
          this.backward_result = response.data.result.backward
          this.backward_route = response.data.route.backward.short
          console.log(this.backward_route)
          // прямой
          this.result = response.data.result.forward;
          this.route = response.data.route.forward.short
          console.log(response.data)
          this.loader = false;
          this.notifyHead = "Успешно";
          this.notifyMessage = 'Нажмите кнопку "открыть расчет" для просмотра';
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 1500);
          this.modalData = true;
          this.WatchCost = true;
          for (let i in this.result) {
            this.days = this.result[i].delivery_days + " дней";
          }
  
          this.cost = response.data.total_cost + " руб";
          this.distance = response.data.total_distance + " км"
        })
        .catch((error) => {
          console.log(error);
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "По данным невозможно расчитать тариф";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 1000);
          // alert(error.response.data)
          setTimeout(() => alert(error.response.data), 1100);  
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
    getReverseStation(data){
      this.reverse = data
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
<template>
  <div>
    <Loader :loader="loader"></Loader>
    <FilterWagonTablePoligon
      @updateFilterDataWagonDislocation="updateFilterDataWagonDislocation"
    >
    </FilterWagonTablePoligon>
    <button
      class="Accept"
      @click="getWagonPolygon()"
      style="
        width: 80%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      "
    >
      Запросить вагоны
    </button>
    <br /><br />

    <p class="amount">всего записей: {{ total_objects }}</p>
    <p class="amount">всего на странице: {{ amount }}</p>
    <div
      style="
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        height: 80vh;
      "
    >
      <table
        class="table table-sm table-bordered table-hover"
        style="margin: 0;  "
      >
        <thead class="thead-light" style="background: #e9ecef !important">
          <tr>
            <th>Тип вагона</th>
            <th>№ вагона</th>
            <th>Полигон</th>
            <th>Государство</th>
            <th>Операция</th>

            <!-- 
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Квитанция</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Простой на станции дислокации</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Простой от последней операции</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Простой после оформления</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Расстояние осталось (от текущей дислокации)</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Расстояние всего (от станции отправления)</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Индекс поезда</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Груж/порож</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Вес</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Государтсво текущей дислокации</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Полигон обращения</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дата и время последней операции</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Расчетная дата прибытия</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дата прибытия на станцию дислокации</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дата и время отправления</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Прибытие на станцию назначения</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дата прибытия на станцию отправления</th>

                    <th style="background: darkslategrey !important; width: 150px !important; height: 50px !important; vertical-align: middle !important;">Номер накладная</th>
                    <th style="background: darkslategrey !important; width: 150px !important; height: 50px !important; vertical-align: middle !important;">Тип накладной</th>
                    <th style="background: darkslategrey !important; width: 150px !important; height: 50px !important; vertical-align: middle !important;">Тип отправки</th>
                    <th style="background: darkslategrey !important; width: 150px !important; height: 50px !important; vertical-align: middle !important;">Грузоотправитель, наименование организации</th>
                    <th style="background: darkslategrey !important; width: 150px !important; height: 50px !important; vertical-align: middle !important;">Грузоотправитель, ОКПО</th>
                    <th style="background: darkslategrey !important; width: 150px !important; height: 50px !important; vertical-align: middle !important;">Грузополучатель, наименование организации</th>
                    <th style="background: darkslategrey !important; width: 150px !important; height: 50px !important; vertical-align: middle !important;">Грузополучатель, ОКПО</th>
                    <th style="background: darkslategrey !important; width: 150px !important; height: 50px !important; vertical-align: middle !important;">Тариф</th>
                    <th style="background: darkslategrey !important; width: 150px !important; height: 50px !important; vertical-align: middle !important;">Наименование плательщика</th>

                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Наименование</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Код</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Код 6</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Порт</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Наименование (англ.)</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Станция промывки</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Строить рейс с/на эту станцию</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Ремонтная</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Широта</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Долгота</th>
                    <th style="background: black !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дорога</th>

                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Наименование</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Код</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Код 6</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Порт</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Наименование (англ.)</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Станция промывки</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Строить рейс с/на эту станцию</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Ремонтная</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Широта</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Долгота</th>
                    <th style="background: goldenrod !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дорога</th>

 
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Наименование</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Код</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Код 6</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Порт</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Наименование (англ.)</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Станция промывки</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Строить рейс с/на эту станцию</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Ремонтная</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Широта</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Долгота</th>
                    <th style="background: blueviolet !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дорога</th>
                                                                                                                

                    <th style="background: burlywood !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Номер вагона</th>
                    <th style="background: burlywood !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Проблемность</th>
                    <th style="background: burlywood !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Объем вагона</th>
                    <th style="background: burlywood !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Активный</th>
                    <th style="background: burlywood !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Тип вагона</th>

                    <th style="background: brown !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Наименование</th>
                    <th style="background: brown !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Класс груза</th>
                    <th style="background: brown !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Описание</th>
                    <th style="background: brown !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Код</th>
                    <th style="background: brown !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Код 6</th>
                    
                    <th style="background: darkolivegreen !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Наименование</th>
                    <th style="background: darkolivegreen !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Полное наименование</th>
                   
                    <th style="background: darkkhaki !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Код причины бросания</th>
                    <th style="background: darkkhaki !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Причина бросания</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="polygon in polygonWagon" :key="polygon.id">
            <td>{{ polygon.wagon_type }}</td>
            <td>{{ polygon.wagon }}</td>
            <td>{{ polygon.polygon }}</td>
            <td>
              {{ polygon.current_country }}
            </td>
            <td>{{ polygon.operation }}</td>
          </tr>
          <!-- <tr v-for="polygon in polygonWagon" :key="polygon.id">
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.receipt}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station_downtime}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.last_operation_downtime}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.documents_registration_downtime}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.distance_left_from_current_polygon}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.distance_all_from_departure_station}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.train_index}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.is_loaded = true">Груженый</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>Порожний</td>

                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.weight}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_country}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.polygon}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{new Date(polygon.last_operation_datetime).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{new Date(polygon.calc_arrival_date).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{new Date(polygon.current_station_arrival).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.arrival_date}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station_arrival}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station_arrival}}</td>

                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.invoice">{{polygon.invoice.number}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.invoice">{{polygon.invoice.invoice_type}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.invoice">{{polygon.invoice.shipment_type}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.invoice">
                    <textarea name="" id="" cols="15" rows="1" :value="polygon.invoice.shipper_company"></textarea>
                </td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.shipper_okpo}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">
                    <textarea name="" id="" cols="15" rows="1" :value="polygon.invoice.consignee_company"></textarea>
                </td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.consignee_okpo}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.tariff}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.payer_name}}</td>

                
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.code6}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.current_station.is_port = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.name_en}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.current_station.is_washing_station = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>

                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.current_station.build_flight = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.current_station.is_repairing = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>

                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.latitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.longitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.road}}</td>
                

                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.code6}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.departure_station.is_port = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.name_en}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.departure_station.is_washing_station = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.departure_station.build_flight = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.departure_station.is_repairing = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.latitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.longitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.road}}</td>


                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.code6}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.destination_station.is_port = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.name_en}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.destination_station.is_washing_station">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.destination_station.build_flight">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.destination_station.is_repairing">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.latitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.longitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.road}}</td>
               
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.wagon.number}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.wagon.is_problem">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.wagon.volume}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="polygon.wagon.is_active = true">активный</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>неактивный</td>

                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.wagon.wagon_type}}</td>
                

                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.cargo.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.cargo.cargo_class}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.wagon.volume}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.cargo.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.cargo.code6}}</td>

                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.operation.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.operation.full_name}}</td>

                <td v-if="polygon.drop != null" style="height: 50px !important; vertical-align: middle !important;">{{polygon.drop.code}}</td>
                <td v-else> </td>
                <td v-if="polygon.drop != null" style="height: 50px !important; vertical-align: middle !important;">
                    <textarea name="" id="" cols="15" rows="1" :value="polygon.drop.reason"></textarea>
                    </td>
                <td v-else> </td>
            </tr> -->
        </tbody>
      </table>
    </div>
    <div style="display: flex; justify-content: space-around; margin-top: 2%">
      <button
        class="Cancel"
        style="width: 20%"
        v-if="prevLink"
        @click="goToPage(prevLink)"
      >
        назад
      </button>
      <button
        class="Cancel"
        style="width: 20%"
        v-if="nextLink"
        @click="goToPage(nextLink)"
      >
        вперед
      </button>
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

<style>
</style>

<script>
import { mapState } from "vuex";
import api from "@/api/wagonPark";
import FilterWagonTablePoligon from "../filter/FilterWagonTablePoligon.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
export default {
  name: "WagonTablePoligon",
  components: { FilterWagonTablePoligon, Notifications, Loader },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  data() {
    return {
      nextLink: null,
      prevLink: null,
      loaderPoligon: false,
      filter_wagonpolygon: {
        wagon__wagon_type: "",
        polygon: "",
      },
      polygonWagon: "",
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",

      amount: null,
      total_objects: null,

      loader: false,
    };
  },
  methods: {
    goToPage(link) {
      let url = new URL(link);
      let pageNumber = url.searchParams.get("page");
      if (pageNumber != null) {
        this.filter_wagonpolygon.page = pageNumber;
      } else {
        delete this.filter_wagonpolygon.page;
      }
      this.getWagonPolygon();
    },
    closeNotification() {
      this.showNotify = false;
    },
    updateFilterDataWagonDislocation(filter_wagonpolygon) {
      this.filter_wagonpolygon = filter_wagonpolygon;
    },
    closeNotification() {
      this.showNotify = false;
    },
    getWagonPolygon() {
      this.loader = true;
      api.getPolygon(this.filter_wagonpolygon).then((response) => {
        this.polygonWagon = response.data.data;
        this.loader = false;
        this.nextLink = response.data.links.next;
        this.prevLink = response.data.links.previous;
        this.amount = response.data.amount;
        this.total_objects = response.data.total_objects;
        this.notifyHead = "Успешно";
        this.notifyMessage = "Данные отфильтрованы";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(this.closeNotification, 1500);
      });
    },
  },
};
</script>
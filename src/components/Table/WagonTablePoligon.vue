<template>
    <div>
        <FilterWagonTablePoligon @updateFilterDataWagonDislocation="updateFilterDataWagonDislocation"></FilterWagonTablePoligon>
        <button class="Accept" @click="getWagonPolygon()">Запросить вагоны</button>
        <br><br>
<section  style="display:block" id="loaderAbandon" v-if="loaderPoligon">
<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
 <path fill="#C04945" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#ECECEC" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="-360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#3D70A8" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>
  
</section>   
  <div style="width: 100%; overflow-x: auto; height: 80vh; overflow-y: auto;"> 
    <p class="amount">всего: {{amount}}</p>

    <table class="table" style="table-layout: fixed;">
        <thead>
            <tr>
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
                    <th style="background: darkkhaki !important; color: white !important;  width: 150px !important; height: 50px !important; vertical-align: middle !important;">Причина бросания</th>



                </tr>
        </thead>
        <tbody>
            <tr v-for="polygon in polygonWagon" :key="polygon.id">
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.receipt}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station_downtime}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.last_operation_downtime}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.documents_registration_downtime}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.distance_left_from_current_polygon}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.distance_all_from_departure_station}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.train_index}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.is_loaded}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.weight}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_country}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.polygon}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{new Date(polygon.last_operation_datetime).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{new Date(polygon.calc_arrival_date).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{new Date(polygon.current_station_arrival).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.arrival_date}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station_arrival}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station_arrival}}</td>

                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.number}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.invoice_type}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.shipment_type}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">
                    <textarea name="" id="" cols="15" rows="1" :value="polygon.invoice.shipper_company"></textarea>
                </td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.shipper_okpo}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">
                    <textarea name="" id="" cols="15" rows="1" :value="polygon.invoice.consignee_company"></textarea>
                </td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.consignee_okpo}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.tariff}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="polygon.invoice">{{polygon.invoice.payer_name}}</td>

                <!-- departure_station -->
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.code6}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.is_port}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.name_en}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.is_washing_station}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.build_flight}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.is_repairing}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.latitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.longitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.current_station.road}}</td>
                

                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.code6}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.is_port}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.name_en}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.is_washing_station}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.build_flight}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.is_repairing}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.latitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.longitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.departure_station.road}}</td>


                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.code6}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.is_port}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.name_en}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.is_washing_station}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.build_flight}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.is_repairing}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.latitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.longitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.destination_station.road}}</td>
               
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.wagon.number}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.wagon.is_problem}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.wagon.volume}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{polygon.wagon.is_active}}</td>
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
            </tr>

        </tbody>
</table>
  </div>
  <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" id="notif"/>

    </div>
</template>

<style>

</style>

<script>
import {mapState} from 'vuex'
import api from '@/api/wagonPark'
import FilterWagonTablePoligon from '../filter/FilterWagonTablePoligon.vue'
import Notifications from '@/components/notifications/Notifications.vue'
export default {
    name: 'WagonTablePoligon',
    components: {FilterWagonTablePoligon, Notifications},
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
        })
    },
    data(){
        return {
            loaderPoligon: false,
            filter_wagonpolygon:{
                wagon__wagon_type: '',
                polygon: ''
            },
            polygonWagon: '',
            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',

            amount: null
        }
    },
    methods: {
        updateFilterDataWagonDislocation(filter_wagonpolygon){
            this.filter_wagonpolygon = filter_wagonpolygon
        },
        closeNotification(){
            this.showNotify = false
        },
        getWagonPolygon(){
            this.loaderPoligon = true
            api.getPolygon(this.filter_wagonpolygon)
            .then((response) => {
                this.polygonWagon = response.data.data
                this.loaderPoligon = false
                this.amount = response.data.amount
                this.notifyHead = 'Успешно'
                this.notifyMessage = 'Данные отфильтрованы'
                this.notifyClass = 'wrapper-success'
                this.showNotify = true
                setTimeout(this.closeNotification, 1500)


            })
        }
    }
}
</script>
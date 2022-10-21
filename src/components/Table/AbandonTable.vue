<template>
    <div>
        <FilterAbadon @updateFilterDataAbadon="updateFilterDataAbadon"></FilterAbadon>
        <button class="Accept" @click="ThrowWagons()">Запросить вагоны</button>
        <br><br>
<section  style="display:block" id="loaderAbandon" v-if="loaderAbandon">
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

<p class="amount">всего записей: {{total_objects}}</p>
<p class="amount">всего на странице: {{amount}}</p>
    <div style="width: 100%; overflow-x: auto; height: 80vh; overflow-y: auto;"> 
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
            <tr v-for="broc in throwWagons" :key="broc.id">
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.receipt}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.current_station_downtime}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.last_operation_downtime}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.documents_registration_downtime}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.distance_left_from_current_broc}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.distance_all_from_departure_station}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.train_index}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.is_loaded = true">Груженый</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>Порожний</td>

                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.weight}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.current_country}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.polygon}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{new Date(broc.last_operation_datetime).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{new Date(broc.calc_arrival_date).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{new Date(broc.current_station_arrival).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.arrival_date}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.destination_station_arrival}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.departure_station_arrival}}</td>

                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.invoice">{{broc.invoice.number}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.invoice">{{broc.invoice.invoice_type}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.invoice">{{broc.invoice.shipment_type}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.invoice">
                    <textarea name="" id="" cols="15" rows="1" :value="broc.invoice.shipper_company"></textarea>
                </td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="broc.invoice">{{broc.invoice.shipper_okpo}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="broc.invoice">
                    <textarea name="" id="" cols="15" rows="1" :value="broc.invoice.consignee_company"></textarea>
                </td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="broc.invoice">{{broc.invoice.consignee_okpo}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="broc.invoice">{{broc.invoice.tariff}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;"  v-if="broc.invoice">{{broc.invoice.payer_name}}</td>

                <!-- departure_station -->
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.current_station.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.current_station.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.current_station.code6}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.current_station.is_port = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.current_station.name_en}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.current_station.is_washing_station = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>

                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.current_station.build_flight = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.current_station.is_repairing = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>

                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.current_station.latitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.current_station.longitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.current_station.road}}</td>
                

                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.departure_station.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.departure_station.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.departure_station.code6}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.departure_station.is_port = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.departure_station.name_en}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.departure_station.is_washing_station = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.departure_station.build_flight = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.departure_station.is_repairing = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.departure_station.latitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.departure_station.longitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.departure_station.road}}</td>


                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.destination_station.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.destination_station.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.destination_station.code6}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.destination_station.is_port = true">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.destination_station.name_en}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.destination_station.is_washing_station">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.destination_station.build_flight">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.destination_station.is_repairing">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.destination_station.latitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.destination_station.longitude}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.destination_station.road}}</td>
               
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.wagon.number}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.wagon.is_problem">да</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>нет</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.wagon.volume}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-if="broc.wagon.is_active = true">активный</td>
                <td style="height: 50px !important; vertical-align: middle !important;" v-else>неактивный</td>

                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.wagon.wagon_type}}</td>
                

                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.cargo.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.cargo.cargo_class}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.wagon.volume}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.cargo.code}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.cargo.code6}}</td>

                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.operation.name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{broc.operation.full_name}}</td>

                <td v-if="broc.drop != null" style="height: 50px !important; vertical-align: middle !important;">{{broc.drop.code}}</td>
                <td v-else> </td>
                <td v-if="broc.drop != null" style="height: 50px !important; vertical-align: middle !important;">
                    <textarea name="" id="" cols="15" rows="1" :value="broc.drop.reason"></textarea>
                    </td>
                <td v-else> </td>
            </tr>

        </tbody>
    </table>
</div>

<div style="display: flex; justify-content: space-around; margin-top: 2%;">
            <button class="Cancel" style="width: 20%"  v-if="prevLink" @click="goToPage(prevLink)">назад</button>
            <button class="Cancel" style="width: 20%" v-if="nextLink" @click="goToPage(nextLink)">вперед</button>
</div> 
<Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" id="notif"/>

    </div>
</template>


<script>
import api from '@/api/wagonPark'
import { mapState } from 'vuex'
import FilterAbadon from '@/components/filter/FilterAbadon.vue'
import Notifications from '@/components/notifications/Notifications.vue'

export default {
    name: 'Abandon',
    components: {FilterAbadon, Notifications},
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
        })
    },
    data(){
        return{
            nextLink: null,
            prevLink: null,

            throwWagons: '',
            loaderAbandon: false,
            amount: null,
            total_objects: null,
            
            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',
            
            filter_abadon: {
                wagon__wagon_type: '',
                page_size: ''
            }
        }
    },

    methods: {
        goToPage(link){
        let url = new URL(link)
        let pageNumber  = url.searchParams.get("page")
        if(pageNumber != null){
            this.filter_abadon.page = pageNumber 
        }else{
            delete(this.filter_abadon.page)
        }
        this.ThrowWagons()
    },
        closeNotification(){
            this.showNotify = false
        },
        ThrowWagons(){
            this.loaderAbandon = true
            api.getWagonsThrow(this.filter_abadon)
            .then((response) => {
                this.throwWagons = response.data.data
                this.amount = response.data.amount
                this.total_objects = response.data.total_objects
                this.nextLink = response.data.links.next
                this.prevLink = response.data.links.previous
                this.notifyHead = 'Успешно'
                this.notifyMessage = 'Данные отфильтрованы'
                this.notifyClass = 'wrapper-success'
                this.showNotify = true
                setTimeout(this.closeNotification, 1500)
                this.loaderAbandon = false
            })
        },
        updateFilterDataAbadon(filter_abadon){
            this.filter_abadon = filter_abadon
        },
    }
}
</script>

<style>
.tablAbadon {
    table-layout: fixed;
}
#loaderAbandon{
    width: 100vw;
    height: 100vh;
    background: rgb(17, 17, 17, 0.1);
    display: flex;
    position: fixed !important;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 9999999999999;

}
#loaderAbandon svg{
    width: 120px;
    height: 120px;
    display: inline-block;
    position: relative !important;
    left: 50% !important;
    transform: translate(-50%,0) !important;
    margin-top: 15%;
}
thead th {
  position: sticky;
  top: 0;
  /* background: white; */
}
</style>


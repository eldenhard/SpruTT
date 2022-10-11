<template>
<div id="tableMain">
    <br>
<button class="button Accept" style="width: 20%; height: 60px;" @click="Wagon()">Запросить данные</button>
<br><br>
    <div class="table1" style="display: flex;">
    <table style="margin-top: -0.1px;">
      <thead>
        <tr>
          <th>{{WagonModel.number}}</th>
          <th> {{WagonModel.is_problem}}</th>
          <th>{{WagonModel.volume}}</th>
          <th>{{WagonModel.type}}</th>
          <th>Актуальность</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for="wagon in WagonsModel" :key="wagon.id" -->
        <tr v-for="wagon in WagonsModel" :key="wagon.id">
          <td>{{wagon.number}}</td>
          <td v-if="wagon.is_problem == false">нет</td>
          <td v-else>да</td>
          <td>{{wagon.volume}}</td>
          <td>{{wagon.wagon_type}}</td>
          <td v-if="wagon.is_active = true">☑️</td>
          <td v-else>🚫</td>
          
       </tr>

       
      </tbody>

    </table>


<b-card no-body style="background: #ECECEC; border: none; text-decoration: none; width: 100%;">
    <b-tabs card  style="background: #ECECEC;"  small card>
        <!-- <b-tab title="Состояние" active style="color: black;" >
                <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                            <tr>
                            <th>{{WagonModel.number}}</th>
                            <th> {{WagonStateModel.state}}</th>
                            <th>{{WagonStateModel.state_value}}</th>
                            <th>{{WagonStateModel.state_value_digital}}</th>
                            <th>{{WagonStateModel.updated_at}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="wagontype in WagonStatesModel" :key="wagontype.id">
                            <td>{{wagontype.number}}</td>
                            <td>{{wagontype.state}}</td>
                            <td>{{wagontype.state_value}}</td>
                            <td>{{wagontype.state_value_digital}}</td>
                            <td>{{wagontype.updated_at}}</td>

                            </tr>
                        </tbody>
                    </table>  
                </div>       
            </b-card-text>
        </b-tab> -->
        <b-tab title="Тип" @click="WagonType()">
                <b-card-text style="margin-top: -30px;">
                    <div style="width:100%; overflow: auto; ">
                    <table>
                        <thead>
                            <tr>
                            <th>{{WagonTypeModel.name}}</th>
                            <th>{{WagonTypeModel.short_name}}</th>
                            <th>{{WagonTypeModel.in_use}}</th>


                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for=" wagontype in WagonsType" :key="wagontype.id" >
                                <td>{{wagontype.name}}</td>
                                <td>{{wagontype.short_name}}</td>
                                <td v-if="wagontype.in_use = true">☑️</td>
                                <td v-else>🚫</td>
                            </tr>
                        
                        </tbody>
                    </table>  
                </div>                                       
                </b-card-text>
        </b-tab>
        <b-tab title="Паспорт" @click="passport()">
            <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                        <tr>
                            <th>{{WagonPassportModel.next_planed_repair_date}}</th>
                            <th>{{WagonPassportModel.last_planed_repair_date}}</th>
                            <th>{{WagonPassportModel.capacity}}</th>
                            <th>{{WagonPassportModel.model}}</th>
                            <th>{{WagonPassportModel.days_before_date_plan_repair}}</th>
                            <th>{{WagonPassportModel.next_plan_repair_kind}}</th>
                            <th>{{WagonPassportModel.build_date}}</th>
                            <th>{{WagonPassportModel.lifetime}}</th>
                            <th>{{WagonPassportModel.wagon}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="wagonpasport in WagonsPassportModel" :key="wagonpasport.id">
                            <td>{{wagonpasport.next_planed_repair_date}}</td>
                            <td>{{wagonpasport.last_planed_repair_date}}</td>
                            <td>{{wagonpasport.capacity}}</td>
                            <td>{{wagonpasport.model}}</td>
                            <td>{{wagonpasport.days_before_date_plan_repair}}</td>
                            <td>{{wagonpasport.next_plan_repair_kind}}</td>
                            <td>{{wagonpasport.build_date}}</td>
                            <td>{{wagonpasport.lifetime}}</td>
                            <th>{{wagonpasport.wagon}}</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </b-card-text>
        </b-tab>
        <b-tab title="Принадлежность" @click="belong()">
            <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                        <tr>
                            <th>{{WagonBelongModel.hash_value}}</th>
                            <th>{{WagonBelongModel.name}}</th>
                            <th>{{WagonBelongModel.owner}}</th>
                            <th>{{WagonBelongModel.in_company_control}}</th>
                            <th>{{WagonBelongModel.wagon_source_company}}</th>
                            <th>{{WagonBelongModel.event_name}}</th>
                            <th>{{WagonBelongModel.agreement}}</th>
                            <th>{{WagonBelongModel.created_at}}</th>
                            <th>{{WagonBelongModel.description}}</th>
                            <th>{{WagonBelongModel.wagon}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="wagonbelong in WagonsBelongModel" :key="wagonbelong.id">
                            <td>{{wagonbelong.hash_value}}</td>
                            <td>{{wagonbelong.name}}</td>
                            <td>{{wagonbelong.owner}}</td>
                            <td>{{wagonbelong.in_company_control}}</td>
                            <td>{{wagonbelong.wagon_source_company}}</td>
                            <td>{{wagonbelong.event_name}}</td>
                            <td>{{wagonbelong.agreement}}</td>
                            <td>{{wagonbelong.created_at}}</td>
                            <td>{{wagonbelong.description}}</td>
                            <td>{{wagonbelong.wagon}}</td>

                        </tr>
                        </tbody>
                    </table>  
                </div>                                   
                </b-card-text>
        </b-tab>
        <b-tab title="Ремонт">
            <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                        <tr>
                            <th>{{WagonModel.number}}</th>
                            <th>{{WagonRepairModel.nrp}}</th>
                            <th>{{WagonRepairModel.malfunction_current}}</th>
                            <th>{{WagonRepairModel.repair_type}}</th>
                            <th>{{WagonRepairModel.nrp_date}}</th>
                            <th>{{WagonRepairModel.repair_kind}}</th>
                            <th>{{WagonRepairModel.next_planed_repair_date}}</th>
                            <th>{{WagonRepairModel.next_planed_repair_depot}}</th>
                            <th>{{WagonRepairModel.status}}</th>
                            <th>{{WagonRepairModel.repair_station_downtime}}</th>
                            <th>{{WagonRepairModel.malfunction_code}}</th>
                            <th>{{WagonRepairModel.malfunction_kind}}</th>
                            <th>{{WagonRepairModel.repair_compensation}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                       

                        </tr>
                        </tbody>
                </table> 
                </div>                                    
            </b-card-text>
        </b-tab>
        <b-tab title="Остаточный пробег">
            <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                            <tr>
                                <th>{{WagonModel.number}}</th>
                                <th>{{WagonRestRunModel.actual_run}}</th>
                                <th>{{WagonRestRunModel.rest_run}}</th>
                                <th>{{WagonRestRunModel.run_limit}}</th>
                                <th>{{WagonRestRunModel.run_over_limit}}</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="wagon in WagonsRestRunModel" :key="wagon.id">
                                <td>{{wagon.number}}</td>
                                <td>{{wagon.actual_run}}</td>
                                <td>{{wagon.rest_run}}</td>
                                <td>{{wagon.run_limit}}</td>
                                <td>{{wagon.run_over_limit}}</td>

                            </tr>
                        </tbody>
                    </table>  
                </div>                                   
                </b-card-text>
        </b-tab>
        <b-tab title="Модернизация">
            <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                        <tr>
                            <th>{{WagonModel.number}}</th>
                            <th>{{WagonModernisationModel.last_date}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="wagon in WagonsModernisationModel" :key="wagon.id">
                            <td>{{wagon.number}}</td>
                            <td>{{wagon.last_date}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>                                   
                </b-card-text>
        </b-tab>
        <b-tab title="Аренда" @click="arenda()">
            <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                        <tr>
                            <th>{{WagonRentModel.rent_doc}}</th>
                            <th>{{WagonRentModel.rent_doc_counterparty}}</th>
                            <th>{{WagonRentModel.acceptance_certificate_number}}</th>
                            <th>{{WagonRentModel.acceptance_certificate_date}}</th>
                            <th>{{WagonRentModel.rent_start_date}}</th>
                            <th>{{WagonRentModel.wagon}}</th>
                            <th>{{WagonRentModel.acceptance_station}}</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="wagonrent in WagonsRentModel" :key="wagonrent.id">
                            <td>{{wagonrent.rent_doc}}</td>
                            <td>{{wagonrent.rent_doc_counterparty}}</td>
                            <td>{{wagonrent.acceptance_certificate_number}}</td>
                            <td>{{wagonrent.acceptance_certificate_date}}</td>
                            <td>{{wagonrent.rent_start_date}}</td>
                            <td>{{wagonrent.wagon}}</td>
                            <td>{{wagonrent.acceptance_station}}</td>

                        </tr>
                        </tbody>
                    </table>    
                </div>                                 
                </b-card-text>
        </b-tab>
        <b-tab title="Лизинг">
            <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                        <tr>
                            <th>{{WagonModel.number}}</th>
                            <th>{{WagonLeasingModel.leasing_doc}}</th>
                            <th>{{WagonLeasingModel.leasing_doc_lifetime}}</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="wagon in WagonsLeasingModel" :key="wagon.id">
                            <td>{{wagon.number}}</td>
                            <td>{{wagon.leasing_doc}}</td>
                            <td>{{wagon.leasing_doc_lifetime}}</td>
                        </tr>
                        </tbody>
                    </table>  
                </div>                                   
                </b-card-text>
        </b-tab>
        <b-tab title="Страхование">
            <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                        <tr>
                            <th>{{WagonModel.number}}</th>
                            <th>{{WagonInsuranceModel.insurance_doc}}</th>
                            <th>{{WagonInsuranceModel.insurance_doc_lifetime}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="wagon in WagonsInsuranceModel" :key="wagon.id">
                            <td>{{wagon.number}}</td>
                            <td>{{wagon.insurance_doc}}</td>
                            <td>{{wagon.insurance_doc_lifetime}}</td>
                        </tr>
                        </tbody>
                    </table>  
                </div>                                   
                </b-card-text>
        </b-tab>
        <b-tab title="ЭТРАН">
            <b-card-text style="margin-top: -30px;">
                <div style="width:100%; overflow: auto;">
                <table>
                        <thead>
                            <tr>
                                <th>{{WagonModel.number}}</th>
                                <th>{{WagonEtranInfoModel.owner}}</th>
                                <th>{{WagonEtranInfoModel.tenant}}</th>
                                <th>{{WagonEtranInfoModel.signing}}</th>
                                <th>{{WagonEtranInfoModel.parking}}</th>
                                <th>{{WagonEtranInfoModel.telegram_number}}</th>
                                <th>{{WagonEtranInfoModel.number_from_expeditor}}</th>
                                

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="wagon in WagonsEtranInfoModel" :key="wagon.id">
                                <td>{{wagon.number}}</td>
                                <td>{{wagon.owner}}</td>
                                <td>{{wagon.tenant}}</td>
                                <td>{{wagon.signing}}</td>
                                <td>{{wagon.parking}}</td>
                                <td>{{wagon.telegram_number}}</td>
                                <td>{{wagon.number_from_expeditor}}</td>
                            </tr>
                        </tbody>
                    </table> 
                </div>                                    
                </b-card-text>
        </b-tab>
    </b-tabs>
</b-card>
    </div>



<section id="loading-page-lk" style="display:none">

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

</div>
</template>
    
    
    
<script>
import { mapState } from 'vuex'

import api from "@/api/wagonPark"

export default{
    name: 'WagonTable',
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        })
    },
    data(){
        return{
            WagonModel:{
                number: 'Номер вагона',
                is_problem : 'Проблемность',
                volume: 'Объем вагона',
                type: 'Тип вагона'
            },
            WagonStateModel:{
                number: 'Номер вагона',
                state: 'Состояние',
                state_value: 'Значение "Состояние"',
                state_value_digital: 'Значение "Состояние" числовое',
                updated_at: "Дата изменения состояния"
            },
            WagonTypeModel:{
                name: 'Наименование',
                short_name: 'Краткое наименование',
                in_use: 'Используется',
                name_rp: 'Наименование в р.п.',
                foot_length: 'Футовость контейнера',
                code_ustng_empty: 'Код УСТНГ для порожнего',
                code_gng_empty: 'Код ГНГ для порожнего',
                code_etsng_empty_repair: 'Код ЕСТНГ для порожнего в ремонте',
                trf_code: 'Код типа п.с. в Рейл-Тариф',
                rtf_equal_container_code: 'Код экв. типа кнт. в Рейл-Тариф'
            },
            WagonPassportModel:{
                next_planed_repair_date: 'Дата следующего планового ремонта',
                last_planed_repair_date: 'Дата последнего планового ремонта',
                capacity: 'Грузоподъемность',
                model: 'Модель вагона',
                days_before_date_plan_repair: 'Дней до следующего планового ремонта',
                next_plan_repair_kind: 'Вид следующего планового ремонта',
                build_date: 'Дата постройки', 
                lifetime: 'Срок службы',
                wagon: 'Вагон'

            },
            WagonBelongModel:{
                hash_value: 'Значение',
                name: 'Принадлежность',
                owner: 'Собственник',
                in_company_control: 'В управлении',
                wagon_source_company: 'Источник поступления вагона, организация',
                event_name: '',
                agreement: '',
                created_at: 'Дата создания',
                description : 'Описание',
                wagon : 'Вагон'
            },
            WagonRepairModel:{
                nrp: 'НРП (вагон в нерабочем парке)',
                malfunction_current: 'Неисправность текущая',
                repair_type: 'Тип ремонта (для НРП)',
                nrp_date: 'Дата НРП (перевода в нерабочий парк)',
                REPAIR_TYPES: [
                    ('Текущий', 'current'),
                    ('Плановый', 'plan')
                ],
                repair_kind: 'Текущий/Плановый',
                next_planed_repair_date: 'Дата следующего запланированного ремонта',
                next_planed_repair_depot: 'Депо следующего запланированного ремонта',
                status: 'Статус ремонта',
                repair_station_downtime: 'Простой на станции рмонта (дни)',
                malfunction_code: 'Код неисправности (НРП)',
                malfunction_kind: 'Вид неисправности (НРП)',
                repair_compensation: 'Ремонт возмещается (текущий)'

            },
            WagonRestRunModel:{
                actual_run: 'Фактический пробег',
                rest_run: 'Остаточный пробег',
                run_limit: 'Лимит пробега',
                run_over_limit: 'Пробег свыше лимита'
            },
            WagonModernisationModel:{
                last_date: 'Дата последней модернизации'
            },
            WagonRentModel:{
                rent_doc: 'Договор аренды',
                rent_doc_counterparty: 'Контрагент по договору',
                acceptance_certificate_number: 'Номер акта приема-передачи',
                acceptance_certificate_date: 'Дата акта приема-передачи',
                rent_start_date: 'Дата аренды',
                wagon: 'Вагон',
                acceptance_station: 'Станция приема-передачи'

            },
            WagonLeasingModel:{
                leasing_doc: 'Договор лизинга',
                leasing_doc_lifetime: 'Срок действия договора лизинга',

            },
            WagonInsuranceModel:{
                insurance_doc: 'Договор страхования',
                insurance_doc_lifetime: 'Срок действия договора страхования'
            },
           WagonEtranInfoModel:{
            owner: 'Собственник (по данным ЭТРАН, ГВЦ)',
            tenant: 'Арендатор (по данным ЭТРАН, ГВЦ)',
            signing: 'Визирование',
            parking: 'Отстой',
            telegram_number: '№ телеграммы',
            number_from_expeditor: '№ от экспедитора'

           },
           
           WagonsModel:[],
           WagonsType:[],
           WagonStatesModel: [],
           WagonsPassportModel: [],
           WagonsBelongModel: [],
           WagonsRepairModel: [],
           WagonsRestRunModel: [],
           WagonsModernisationModel: [],
           WagonsRentModel: [],
           WagonsLeasingModel: [],
           WagonsInsuranceModel: [],
           WagonsEtranInfoModel: [],
        }
    },


methods: {
    Wagon(){
    document.getElementById('loading-page-lk').style.display = 'block'
    // const pretoken = JSON.parse(localStorage.getItem("vuex"))
    // const token = pretoken.auth.user.token
    // fetch('http://10.1.5.65/api/wagon-park/wagons/', {
    //     headers: {
    //         'Authorization': `Basic ${token}` 
    //     },
    //     method: 'GET'
    // })

    api.getWagons()
    .then((response) => {
                if (response.ok){
                    return response.json().then(r=>{
                        //console.log(data);
                        // 1-е это сваойство Respone, второе свойство JSON
                        this.WagonsModel = r.data.data;
                        document.getElementById('loading-page-lk').style.display = 'none'
                        console.log(this.WagonsModel)
               })
           }
           else{
               console.log('NOT OK')
           }
       })
    },
    WagonType(){
        document.getElementById('loading-page-lk').style.display = 'block';
        api.getWagonType()
        .then((response) => {
                    if (response.ok){
                        return response.json().then(r=>{
                            this.WagonsType = r.data.data;
                            document.getElementById('loading-page-lk').style.display = 'none'
                            console.log(this.WagonsType)
                })
            }
            else{
                console.log('NOT OK')
            }
        })
    },
    passport(){
    document.getElementById('loading-page-lk').style.display = 'block'
    api.getPassport()
    .then((response) => {
                if (response.ok){
                    return response.json().then(r=>{
                        this.WagonsPassportModel = r.data.data;
                        document.getElementById('loading-page-lk').style.display = 'none'
                        console.log(this.WagonsPassportModel)
               })
           }
           else{
               console.log('NOT OK')
           }
       })
    },
    arenda() {
    document.getElementById('loading-page-lk').style.display = 'block'
    api.getArenda()
    .then((response) => {
                if (response.ok){
                    return response.json().then(r=>{
                        this.WagonsRentModel = r.data;
                        document.getElementById('loading-page-lk').style.display = 'none'
                        console.log(this.WagonsRentModel)
               })
           }
           else{
               console.log('NOT OK')
           }
       })
    },
    belong(){
    document.getElementById('loading-page-lk').style.display = 'block'
    api.getBelong()
    .then((response) => {
                if (response.ok){
                    return response.json().then(r=>{
                        this.WagonsBelongModel = r.data.data;
                        document.getElementById('loading-page-lk').style.display = 'none'
                        console.log(this.WagonsBelongModel)
               })
           }
           else{
               console.log('NOT OK')
           }
       })
    }
}
}

   
        

</script>
    

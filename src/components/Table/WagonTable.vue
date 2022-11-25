<template>
    <div id="tableMain" style="background: white">
        <Loader :loader="loader"></Loader>
        <FilterWagon @updateFilters="updateFilters"></FilterWagon>

        <button class="Accept" style="width: 80%; position: relative; left: 50%; transform: translate(-50%,0);"
            @click="Wagon()">Запросить данные</button>



        <br><br>
        <br>




        <p class="amount">всего: {{ amount }}</p>
        <!-- <div style="display: flex;" > -->
        <div class="row">
            <div class="col-md-5">
                <table class="table table-sm table-bordered table-hover" 
                    style="table-layout: fixed;margin-top: -0.1px;">
                    <thead class="thead-light"  style="background:#E9ECEF; z-index:1">
                        <tr>
                            <th style="width: 70px !important"><input type="number" v-model="numberWagon"
                                    placeholder="номер вагона" id="searchWagonPlace" @keydown.enter="searchWagon()"
                                    class="input-filter"></th>
                            <!-- <th>{{WagonModel.number}}</th> -->
                            <th style="width: 70px !important"> {{ WagonModel.is_problem }}</th>
                            <th style="width: 70px !important">{{ WagonModel.volume }}</th>
                            <th style="width: 70px !important">{{ WagonModel.type }}</th>
                            <th style="width: 70px !important">Актуальность</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- v-for="wagon in WagonsModel" :key="wagon.id" -->
                        <tr v-for="wagon in WagonsModel" :key="wagon.id" @click="getMoreData(wagon.number)">
                            <td>{{ wagon.number }}</td>
                            <td v-if="wagon.is_problem == false">нет</td>
                            <td v-else>да</td>
                            <td>{{ wagon.volume }}</td>
                            <td>{{ wagon.wagon_type }}</td>
                            <td v-if="wagon.is_active == true">☑️</td>
                            <td v-else>🚫</td>

                        </tr>

                    </tbody>

                </table>
            </div>
            <div class="col-md-7">
                <b-card no-body style="background: #fff; border: none; text-decoration: none; width: 100%;">
                    <b-tabs card style="background: #fff; font-size: 12px !important;">

                        <!--  v-if="WagonPassportModel.count > 0" -->
                        <b-tab title="Паспорт">
                            <b-card-text>
                                <div
                                    style="width: 100%; overflow-x: auto;overflow-y: auto; position: relative; left: 50%; transform: translate(-50%,0); margin-bottom: 3%;">

                                    <table class="table table-sm table-bordered table-hover"  style="table-layout: fixed;">
                                        <thead class="thead-light"  style="background:#E9ECEF; z-index:1">
                                            <tr>
                                                <th style="width: 150px !important">Скан паспорта</th>
                                                <th style="width: 150px !important">Дата следующего планового ремонта</th>
                                                <th style="width: 150px !important"> Дата последнего
                                                    планового ремонта</th>
                                                <th style="width: 150px !important">Грузоподъемность</th>
                                                <th style="width: 150px !important">Модель вагона</th>
                                                <th style="width: 150px !important">Дней до следующего планового ремонта</th>
                                                <th style="width: 150px !important">Вид следующего планового ремонта</th>
                                                <th style="width: 150px !important">Дата постройки</th>
                                                <th style="width: 150px !important">Срок службы</th>
                                                <th style="width: 150px !important">Вагон</th>





                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="wagonpasport in WagonsPassportModel" :key="wagonpasport.id">
                                                <td style="width: 150px !important"><a target="_blank" :href="wagonpasport.document"
                                                        v-if="wagonpasport.document"><img src="@/assets/pdf.png" alt=""
                                                            width="20px!important"></a></td>
                                                <td style="width: 150px !important">{{ wagonpasport.next_planed_repair_date }}</td>
                                                <td style="width: 150px !important">{{ wagonpasport.last_planed_repair_date }}</td>
                                                <td style="width: 150px !important">{{ wagonpasport.capacity }}</td>
                                                <td style="width: 150px !important">{{ wagonpasport.model }}</td>
                                                <td style="width: 150px !important">{{ wagonpasport.days_before_date_plan_repair }}</td>
                                                <td style="width: 150px !important">{{ wagonpasport.next_plan_repair_kind }}</td>
                                                <td style="width: 150px !important">{{ wagonpasport.build_date }}</td>
                                                <td style="width: 150px !important">{{ wagonpasport.lifetime }}</td>
                                                <td style="width: 150px !important;font-weight: normal">{{ wagonpasport.wagon }}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <!-- <p v-else><br>Нет данных</p> -->
                                </div>
                            </b-card-text>
                        </b-tab>
                        <!-- <b-tab title="Принадлежность">
                            <b-card-text>
                                <div style="width:100%; overflow: auto;">
                                    <table class="table table-sm table-bordered table-hover"  style="table-layout: fixed;">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>{{ WagonBelongModel.name }}</th>
                                                <th>{{ WagonBelongModel.owner }}</th>
                                                <th>{{ WagonBelongModel.in_company_control }}</th>
                                                <th>{{ WagonBelongModel.wagon_source_company }}</th>
                                                <th>{{ WagonBelongModel.event_name }}</th>
                                                <th>{{ WagonBelongModel.agreement }}</th>
                                                <th>{{ WagonBelongModel.created_at }}</th>
                                                <th>{{ WagonBelongModel.description }}</th>
                                                <th>{{ WagonBelongModel.wagon }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="wagonbelong in WagonsBelongModel" :key="wagonbelong.id">
                                                <td>{{ wagonbelong.name }}</td>
                                                <td>{{ wagonbelong.owner }}</td>
                                                <td>{{ wagonbelong.in_company_control }}</td>
                                                <td>{{ wagonbelong.wagon_source_company }}</td>
                                                <td>{{ wagonbelong.event_name }}</td>
                                                <td>{{ wagonbelong.agreement }}</td>
                                                <td>{{ wagonbelong.created_at }}</td>
                                                <td>{{ wagonbelong.description }}</td>
                                                <td>{{ wagonbelong.wagon }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </b-card-text>
                        </b-tab> -->
                        <!-- <b-tab title="Ремонт">
                            <b-card-text>
                                <div style="width:100%; overflow: auto;">
                                    <table class="table table-sm table-bordered table-hover"  style="table-layout: fixed;">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>{{ WagonModel.number }}</th>
                                                <th>{{ WagonRepairModel.nrp }}</th>
                                                <th>{{ WagonRepairModel.malfunction_current }}</th>
                                                <th>{{ WagonRepairModel.repair_type }}</th>
                                                <th>{{ WagonRepairModel.nrp_date }}</th>
                                                <th>{{ WagonRepairModel.repair_kind }}</th>
                                                <th>{{ WagonRepairModel.next_planed_repair_date }}</th>
                                                <th>{{ WagonRepairModel.next_planed_repair_depot }}</th>
                                                <th>{{ WagonRepairModel.status }}</th>
                                                <th>{{ WagonRepairModel.repair_station_downtime }}</th>
                                                <th>{{ WagonRepairModel.malfunction_code }}</th>
                                                <th>{{ WagonRepairModel.malfunction_kind }}</th>
                                                <th>{{ WagonRepairModel.repair_compensation }}</th>
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
                            <b-card-text>
                                <div style="width:100%; overflow: auto;">
                                    <table class="table table-sm table-bordered table-hover"  style="table-layout: fixed;">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>{{ WagonModel.number }}</th>
                                                <th>{{ WagonRestRunModel.actual_run }}</th>
                                                <th>{{ WagonRestRunModel.rest_run }}</th>
                                                <th>{{ WagonRestRunModel.run_limit }}</th>
                                                <th>{{ WagonRestRunModel.run_over_limit }}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="wagon in WagonsRestRunModel" :key="wagon.id">
                                                <td>{{ wagon.number }}</td>
                                                <td>{{ wagon.actual_run }}</td>
                                                <td>{{ wagon.rest_run }}</td>
                                                <td>{{ wagon.run_limit }}</td>
                                                <td>{{ wagon.run_over_limit }}</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Модернизация">
                            <b-card-text>
                                <div style="width:100%; overflow: auto;">
                                    <table class="table table-sm table-bordered table-hover"  style="table-layout: fixed;">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>{{ WagonModel.number }}</th>
                                                <th>{{ WagonModernisationModel.last_date }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="wagon in WagonsModernisationModel" :key="wagon.id">
                                                <td>{{ wagon.number }}</td>
                                                <td>{{ wagon.last_date }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </b-card-text>
                        </b-tab> -->
                        <b-tab title="Аренда" @click="arenda()">
                            <b-card-text>
                                <div
                                    style="width: 100%; overflow-x: auto; overflow-y: auto; position: relative; left: 50%; transform: translate(-50%,0); margin-bottom: 3%;">
                                    <table class="table table-sm table-bordered table-hover"  style="table-layout: fixed;">
                                        <thead class="thead-light"  style="background:#E9ECEF; z-index:1">
                                            <tr>
                                                <th>{{ WagonRentModel.rent_doc }}</th>
                                                <th>{{ WagonRentModel.rent_doc_counterparty }}</th>
                                                <th>{{ WagonRentModel.acceptance_certificate_number }}</th>
                                                <th>{{ WagonRentModel.acceptance_certificate_date }}</th>
                                                <th>{{ WagonRentModel.rent_start_date }}</th>
                                                <th>{{ WagonRentModel.wagon }}</th>
                                                <th>{{ WagonRentModel.acceptance_station }}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="wagonrent in WagonsRentModel" :key="wagonrent.id">
                                                <td>{{ wagonrent.rent_doc }}</td>
                                                <td>{{ wagonrent.rent_doc_counterparty }}</td>
                                                <td>{{ wagonrent.acceptance_certificate_number }}</td>
                                                <td>{{ wagonrent.acceptance_certificate_date }}</td>
                                                <td>{{ wagonrent.rent_start_date }}</td>
                                                <td>{{ wagonrent.wagon }}</td>
                                                <td>{{ wagonrent.acceptance_station }}</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </b-card-text>
                        </b-tab>
                        <!-- <b-tab title="Лизинг">
                            <b-card-text>
                                <div style="width:100%; overflow: auto;">
                                    <table class="table table-sm table-bordered table-hover"  style="table-layout: fixed;">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>{{ WagonModel.number }}</th>
                                                <th>{{ WagonLeasingModel.leasing_doc }}</th>
                                                <th>{{ WagonLeasingModel.leasing_doc_lifetime }}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="wagon in WagonsLeasingModel" :key="wagon.id">
                                                <td>{{ wagon.number }}</td>
                                                <td>{{ wagon.leasing_doc }}</td>
                                                <td>{{ wagon.leasing_doc_lifetime }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Страхование">
                            <b-card-text>
                                <div style="width:100%; overflow: auto;">
                                    <table class="table table-sm table-bordered table-hover"  style="table-layout: fixed;">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>{{ WagonModel.number }}</th>
                                                <th>{{ WagonInsuranceModel.insurance_doc }}</th>
                                                <th>{{ WagonInsuranceModel.insurance_doc_lifetime }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="wagon in WagonsInsuranceModel" :key="wagon.id">
                                                <td>{{ wagon.number }}</td>
                                                <td>{{ wagon.insurance_doc }}</td>
                                                <td>{{ wagon.insurance_doc_lifetime }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="ЭТРАН">
                            <b-card-text>
                                <div style="width:100%; overflow: auto;">
                                    <table class="table table-sm table-bordered table-hover"  style="table-layout: fixed;">
                                        <thead class="thead-light">
                                            <tr>
                                                <th>{{ WagonModel.number }}</th>
                                                <th>{{ WagonEtranInfoModel.owner }}</th>
                                                <th>{{ WagonEtranInfoModel.tenant }}</th>
                                                <th>{{ WagonEtranInfoModel.signing }}</th>
                                                <th>{{ WagonEtranInfoModel.parking }}</th>
                                                <th>{{ WagonEtranInfoModel.telegram_number }}</th>
                                                <th>{{ WagonEtranInfoModel.number_from_expeditor }}</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="wagon in WagonsEtranInfoModel" :key="wagon.id">
                                                <td>{{ wagon.number }}</td>
                                                <td>{{ wagon.owner }}</td>
                                                <td>{{ wagon.tenant }}</td>
                                                <td>{{ wagon.signing }}</td>
                                                <td>{{ wagon.parking }}</td>
                                                <td>{{ wagon.telegram_number }}</td>
                                                <td>{{ wagon.number_from_expeditor }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </b-card-text>
                        </b-tab> -->
                    </b-tabs>
                </b-card>
            </div>
        </div>










        <div style="display: flex; position: relative; left: 50%; transform: translate(-50%,0); margin-top: 1%; height: 50px; width: 100%"
            id="pagination">
            <div class="row" style="display: flex; position: relative; left: 10%; transform: translate(-10%,0);">
                <div class="col-md-6">
                    <button style="float: left" class="button Cancel" v-if="prevLink"
                        @click="goToPage(prevLink)">назад</button>
                </div>
                <div class="col-md-6">
                    <button style="float: right; margin-left: 20%;" class="button Cancel" v-if="nextLink"
                        @click="goToPage(nextLink)">вперед</button>
                </div>
            </div>
        </div>

    </div>
</template>
    
<style>
.amount {
    color: grey;
    margin-bottom: -0.1%;
    padding-left: 1%;

}

.searchWagon {
    display: flex;
    width: 30%;
    height: 30px;
    margin-bottom: 10px;
    margin-top: 1%;
    margin-left: 1%;
}
</style>

    
<script>
import { mapState } from 'vuex'
import api from "@/api/wagonPark"
import FilterWagon from '@/components/filter/FilterWagon.vue'
import Loader from '@/components/loader/loader.vue'
export default {
    name: "WagonTable",
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        })
    },
    components: { FilterWagon, Loader },
    data() {
        return {
            nextLink: null,
            prevLink: null,
            activeWagonId: null,
            filters: null,
            numberWagon: '57135303',
            amount: null,
            loader: false,
            loader: false,
            // checked: [],
            WagonModel: {
                number: "Номер вагона",
                is_problem: "Проблемность",
                volume: "Объем вагона",
                type: "Тип вагона"
            },
            WagonStateModel: {
                number: "Номер вагона",
                state: "Состояние",
                state_value: "Значение \"Состояние\"",
                state_value_digital: "Значение \"Состояние\" числовое",
                updated_at: "Дата изменения состояния"
            },
            WagonPassportModel: {
                next_planed_repair_date: "Дата следующего планового ремонта",
                last_planed_repair_date: "Дата последнего планового ремонта",
                capacity: "Грузоподъемность",
                model: "Модель вагона",
                days_before_date_plan_repair: "Дней до следующего планового ремонта",
                next_plan_repair_kind: "Вид следующего планового ремонта",
                build_date: "Дата постройки",
                lifetime: "Срок службы",
                document: "Скан паспорта",
                wagon: "Вагон"
            },
            WagonBelongModel: {
                hash_value: "Значение",
                name: "Принадлежность",
                owner: "Собственник",
                in_company_control: "В управлении",
                wagon_source_company: "Источник поступления вагона, организация",
                event_name: "Событие",
                agreement: "Соглашение",
                created_at: "Дата создания",
                description: "Описание",
                wagon: "Вагон"
            },
            WagonRepairModel: {
                nrp: "НРП (вагон в нерабочем парке)",
                malfunction_current: "Неисправность текущая",
                repair_type: "Тип ремонта (для НРП)",
                nrp_date: "Дата НРП (перевода в нерабочий парк)",
                REPAIR_TYPES: [
                    ("Текущий", "current"),
                    ("Плановый", "plan")
                ],
                repair_kind: "Текущий/Плановый",
                next_planed_repair_date: "Дата следующего запланированного ремонта",
                next_planed_repair_depot: "Депо следующего запланированного ремонта",
                status: "Статус ремонта",
                repair_station_downtime: "Простой на станции рмонта (дни)",
                malfunction_code: "Код неисправности (НРП)",
                malfunction_kind: "Вид неисправности (НРП)",
                repair_compensation: "Ремонт возмещается (текущий)"
            },
            WagonRestRunModel: {
                actual_run: "Фактический пробег",
                rest_run: "Остаточный пробег",
                run_limit: "Лимит пробега",
                run_over_limit: "Пробег свыше лимита"
            },
            WagonModernisationModel: {
                last_date: "Дата последней модернизации"
            },
            WagonRentModel: {
                rent_doc: "Договор аренды",
                rent_doc_counterparty: "Контрагент по договору",
                acceptance_certificate_number: "Номер акта приема-передачи",
                acceptance_certificate_date: "Дата акта приема-передачи",
                rent_start_date: "Дата аренды",
                wagon: "Вагон",
                acceptance_station: "Станция приема-передачи"
            },
            WagonLeasingModel: {
                leasing_doc: "Договор лизинга",
                leasing_doc_lifetime: "Срок действия договора лизинга",
            },
            WagonInsuranceModel: {
                insurance_doc: "Договор страхования",
                insurance_doc_lifetime: "Срок действия договора страхования"
            },
            WagonEtranInfoModel: {
                owner: "Собственник (по данным ЭТРАН, ГВЦ)",
                tenant: "Арендатор (по данным ЭТРАН, ГВЦ)",
                signing: "Визирование",
                parking: "Отстой",
                telegram_number: "№ телеграммы",
                number_from_expeditor: "№ от экспедитора"
            },
            WagonsModel: [],
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
        };
    },
    methods: {
        goToPage(link) {

            let url = new URL(link)
            let pageNumber = url.searchParams.get("page")
            if (pageNumber != null) {
                this.filters.page = pageNumber
            } else {
                delete (this.filters.page)
            }
            this.Wagon()
        },
        getMoreData(wagonNumber) {

            this.passport(wagonNumber)
            this.belong(wagonNumber)
        },
        updateFilters(filters) {
            this.filters = filters
        },

        Wagon() {
            this.loader = true
            api.getWagons(this.filters)
                .then((response) => {
                    this.WagonsModel = response.data.data;
                    this.nextLink = response.data.links.next
                    this.prevLink = response.data.links.previous
                    this.amount = response.data.total_objects
                    this.loader = false
                }).catch(err => {
                    console.log(err)
                    this.loader = false
                });
        },

        passport(wagonNumber = null) {
            this.loader = true
            api.getPassport({ wagon: wagonNumber })
                .then((response) => {
                    this.WagonsPassportModel = response.data.data;
                    this.loader = false

                }).catch(error => {
                    console.log(error)
                    this.loader = false
                })
        },

        arenda() {
            this.loader = true
            api.getArenda()
                .then((response) => {
                    this.WagonsBelongModel = response.data.data;
                    this.loader = false
                }).catch(error => {
                    console.log(error)
                    this.loader = false
                })
        },
        belong(wagonNumber = null) {
            this.loader = true
            api.getBelong({ wagon: wagonNumber })
                .then((response) => {
                    this.WagonsBelongModel = response.data.data;
                    this.loader = false
                }).catch(error => {
                    console.log(error)
                    this.loader = false
                })
        },
        searchWagon() {
            this.loader = true
            api.getCurrentWagon(this.numberWagon)

                .then((response) => {
                    this.WagonsModel = response.data.data;
                    this.amount = response.data.total_objects
                    this.passport(this.numberWagon)
                    this.belong(this.numberWagon)

                    // document.getElementById('pagination').style.display = 'none'
                    this.loader = false
                    document.getElementById("searchWagonPlace").value = '';
                }).catch(error => {
                    console.log(error)
                    this.loader = false
                });

        }
    }
}


// belong(wagonNumber = null) {
//             document.getElementById("loading-page-lk").style.display = "block";
//             api.getBelong({wagon: wagonNumber})
//             const pretoken = JSON.parse(localStorage.getItem("vuex"));
//             const token = pretoken.auth.user.token;
//             fetch("http://10.1.5.65/api/wagon-park/wagon-belong/", {
//                 headers: {
//                     "Authorization": `Basic ${token}`
//                 },
//                 method: "GET"
//             })
//                 .then((response) => {
//                     this.WagonsBelongModel = response.data.data.data;
//                     document.getElementById("loading-page-lk").style.display = "none";
//                 if (response.ok) {
//                     return response.json().then(r => {
//                         this.WagonsBelongModel = r.data.data;
//                         document.getElementById("loading-page-lk").style.display = "none";
//                         console.log(this.WagonsBelongModel);
//                     });
//                 }
//                 else {
//                     console.log("NOT OK");
//                 }
//             });
//         }        

</script>
    

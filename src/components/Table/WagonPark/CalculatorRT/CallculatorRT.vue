<template>
    <div>
        <Loader :loader="loader" />
        <div class="air_block">
            <p class="WatchAllArenda">Калькулятор ставок РТ</p>
            <div class="grid_block">
                <div class="departure">
                    <h5 style="margin: 2% 0 0 2%; color: darkgrey;">Маршрут груза (Груженый)</h5>
                    <div class="ToGOBlock">
                        <label for="">&nbsp;Откуда <br>
                            <div class="inputcontainer">
                                <input v-model="departure_station" @input="getStationDeparture()"
                                    placeholder="Наименование станции " />
                                <div class="icon-container" v-if="loaderInputDep">
                                    <i class="loader"></i>
                                </div>
                            </div>
                        </label>

                        <label for="">&nbsp;Куда <br>
                            <div class="inputcontainer">
                                <input v-model="destination_station" @input="getStationDestination()"
                                    placeholder="Наименование станции " />
                                <div class="icon-container" v-if="loaderInputDest">
                                    <i class="loader"></i>
                                </div>
                            </div>
                        </label>
                    </div>
                    <!-- Появляющиеся данные для станций отправление -->
                    <div class="ToGOBlock">
                        <div class="dataDeparture" v-if="warning">
                            <ul>
                                <li v-for="departure in station_departure_search" :key="departure.id"
                                    @click="checkThisDeparture(departure.name, String(departure.code))">
                                    {{ departure.name }}
                                </li>
                            </ul>
                        </div>
                        <div class="dataDeparture" v-if="warningDest">
                            <ul>
                                <li v-for="destination in station_destination_search" :key="destination.id"
                                    @click="checkThisDestination(destination.name, String(destination.code))">
                                    {{ destination.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- КОНЕЦ -->
                    <h5 style="margin: 0 0 0 2%; color: darkgrey;">Параметры груза (Груженый)</h5>
                    <div class="Cargo_block">
                        <label for="">&nbsp;Наименование груза <br>
                            <div class="inputcontainer">
                                <input class="textarea" v-model="cargo" @input="getCargo()" style="background: white;"
                                    placeholder="Введит груз" />
                                <div class="icon-container" v-if="loaderInputCargo">
                                    <i class="loader"></i>
                                </div>
                            </div>
                        </label>
                        <label for="">Вес <br>
                            <input type="number" placeholder="Укажите вес" v-model="cargo_weight">
                        </label>
                    </div>
                    <!-- ГРУЗ -->
                    <div class="ToGOBlock" style=" margin-top: -1%;">
                        <div class="dataDeparture" v-if="warningCargo">
                            <ul>
                                <li v-for="cargo in cargo_search" :key="cargo.id"
                                    @click="checkThisCargo(cargo.name, String(cargo.code6))">
                                    {{ cargo.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- КОНЕЦ -->

                    <div class="ToGOBlock" style=" margin-top: -2%;">
                        <label for="">&nbsp;Тип <br>
                            <select name="" id="" v-model="wagon_type" style="font-weight: normal;">
                                <option value="Полувагон">Полувагон</option>
                                <option value="Цистерна">Цистерна</option>
                            </select>
                        </label>
                        <label for="">&nbsp;Принадлежность<br>
                            <select name="" id="" v-model="wagon_belong" placeholder="Выберите принадлежность"
                                style="font-weight: normal;">
                                <option value="1">Инвентарный парк</option>
                                <option value="2">Собственный</option>
                                <option value="3">Арендованный</option>
                                <option value="7">Привлеченный ОАО "РЖД"</option>
                            </select>
                        </label>
                    </div>
                    <div class="ToGOBlock">
                        <label for="">&nbsp;Дней на погрузке <br>
                            <input type="number" placeholder="Укажите кол-во" v-model="loadings_days">
                        </label>
                        <label for="">&nbsp;Дней на выгрузке<br>
                            <input type="number" placeholder="Укажите кол-во" v-model="unloading_days">
                        </label>
                    </div>
                    <div class="ToGOBlock">
                        <label for="">&nbsp;Подготовка ваг (сут) <br>
                            <input type="number" placeholder="Укажите кол-во" v-model="prepare_volume">
                        </label>
                        <label for="">&nbsp;Сумма подготовки<br>
                            <input type="number" placeholder="Укажите кол-во" v-model="prepare_amount">
                        </label>
                    </div>
                    <div class="ToGOBlock">
                        <label for="">&nbsp;Доп. затраты <br>
                            <input type="number" placeholder="Укажите кол-во" v-model="add_expenses">
                        </label>
                        <label for="">&nbsp;Ставка<br>
                            <input type="number" placeholder="Укажите ставку" v-model="stavka">
                        </label>

                    </div>
                </div>
                <div class="destination">
                    <h5 style="margin: 2% 0 0 2%; color: darkgrey;">Маршрут груза (Порожний)</h5>
                    <div class="ToGOBlock">
                        <label for="">&nbsp;Откуда <br>
                            <div class="inputcontainer">
                                <input v-model="departure_stationEmpty" @input="getStationDepartureEmpty()"
                                    placeholder="Наименование станции " />
                                <div class="icon-container" v-if="loaderInputDepEmpty">
                                    <i class="loader"></i>
                                </div>
                            </div>
                        </label>

                        <label for="">&nbsp;Куда <br>
                            <div class="inputcontainer">
                                <input v-model="destination_stationEmpty" @input="getStationDestinationEmpty()"
                                    placeholder="Наименование станции " />
                                <div class="icon-container" v-if="loaderInputDestEmpty">
                                    <i class="loader"></i>
                                </div>
                            </div>
                        </label>
                    </div>
                    <!-- Появляющиеся данные для станций отправление -->
                    <div class="ToGOBlock" style="margin-top: -1%;">
                        <div class="dataDeparture" v-if="warningEmpty" style="width: 44% !important;margin-top: -1%; ">
                            <ul>
                                <li v-for="departure in station_departure_searchEmpty" :key="departure.id"
                                    @click="checkThisDepartureEmpty(departure.name, String(departure.code))">
                                    {{ departure.name }}
                                </li>
                            </ul>
                        </div>
                        <div class="dataDeparture" v-if="warningDestEmpty" style="width: 44% !important; margin-top: -1%;">
                            <ul>
                                <li v-for="destination in station_destination_searchEmpty" :key="destination.id"
                                    @click="checkThisDestinationEmpty(destination.name, String(destination.code))">
                                    {{ destination.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- КОНЕЦ -->
                    <h5 style="margin: 0 0 0 2%; color: darkgrey;">Параметры груза (Порожний)</h5>
                    <div class="Cargo_block">
                        <label for="">&nbsp;Наименование груза <br>
                            <div class="inputcontainer">
                                <input class="textarea" v-model="cargoEmpty" @input="getCargoEmpty()"
                                    style="background: white;" placeholder="Введите груз" />
                                <div class="icon-container" v-if="loaderInputCargoEmpty">
                                    <i class="loader"></i>
                                </div>
                            </div>
                        </label>
                        <label for="">&nbsp;Доп. затраты <br>
                            <input type="number" placeholder="Укажите кол-во" v-model="add_expensesEmpty">
                        </label>
                           <!-- <label for="">&nbsp;Ставка<br>
                            <input type="number" placeholder="Укажите ставку" v-model="stavkaEmpty">
                        </label> -->
                        <!-- <label for="">Вес <br>
                            <input type="number" placeholder="Укажите вес" v-model="cargo_weightEmpty">
                        </label> -->
                    </div>
                    <!-- ГРУЗ -->
                    <div class="ToGOBlock" style=" margin-top: -1%;">
                        <div class="dataDeparture" v-if="warningCargoEmpty" style="width: 44% !important;margin-top: -1%; ">
                            <ul>
                                <li v-for="cargo in cargo_searchEmpty" :key="cargo.id"
                                    @click="checkThisCargoEmpty(cargo.name, String(cargo.code6))">
                                    {{ cargo.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- КОНЕЦ -->

                    <div class="ToGOBlock" style=" margin-top: -2%;">
                        <label for="">&nbsp;Тип <br>
                            <select name="" id="" v-model="wagon_typeEmpty" style="font-weight: normal;">
                                <option value="Полувагон">Полувагон</option>
                                <option value="Цистерна">Цистерна</option>
                            </select>
                        </label>
                        <label for="">&nbsp;Принадлежность<br>
                            <select name="" id="" v-model="wagon_belongEmpty" placeholder="Выберите принадлежность"
                                style="font-weight: normal;">
                                <option value="1">Инвентарный парк</option>
                                <option value="2">Собственный</option>
                                <option value="3">Арендованный</option>
                                <option value="7">Привлеченный ОАО "РЖД"</option>
                            </select>
                        </label>
                    </div>
                    <!-- <div class="ToGOBlock">
                        <label for="">&nbsp;Дней на погрузке <br>
                            <input type="number" placeholder="Укажите кол-во" v-model="loadings_daysEmpty">
                        </label>
                        <label for="">&nbsp;Дней на выгрузке<br>
                            <input type="number" placeholder="Укажите кол-во" v-model="unloading_daysEmpty">
                        </label>
                    </div> -->
                    <div class="ToGOBlock">
                        <!-- <label for="">&nbsp;Доп. затраты <br>
                            <input type="number" placeholder="Укажите кол-во" v-model="add_expensesEmpty">
                        </label> -->
                        <!-- <label for="">&nbsp;Ставка<br>
                            <input type="number" placeholder="Укажите ставку" v-model="stavkaEmpty">
                        </label> -->

                    </div>
                </div>
            </div>

            <button class="Accept" style="width: 20%; margin-left: auto; margin-top: 2%;"
                @click="CalculateValue()">Рассчитать</button>



            <div style="overflow: auto; margin-top: 4%;">
                <table>
                    <thead>
                        <tr>
                            <th>Станция отправления</th>
                            <th>Дорога отправления</th>
                            <th>Станция назначения</th>
                            <th>Дорога назначения</th>
                            <th>Груз</th>
                            <th>Расстояние</th>
                            <th>Погрузка, сут</th>
                            <th>В ходу</th>
                            <th>Выгрузка, сут</th>
                            <th>Время рейса, сут</th>
                            <th>Ставка, руб</th>
                            <th>Затраты на порож.</th>
                            <th>Затраты без НДС</th>
                            <th>НДС</th>
                            <th>Доп. затраты</th>
                            <th>Доход</th>
                            <th>Доходность</th>

                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>{{ response1.departure_station }}</td>
                            <td>{{ response1.departure_road }}</td>
                            <td>{{ response1.destination_station }}</td>
                            <td>{{ response1.destination_road }}</td>
                            <td>{{ response1.cargo }}</td>
                            <td>{{ response1.distance }}</td>
                            <td>{{ response1.loading }}</td>
                            <td>{{ response1.travel_days }}</td>
                            <td>{{ response1.unloading }}</td>
                            <td>{{ response1.total_days }}</td>
                            <td style="background: lightskyblue;">{{ response1.stavka }}</td>
                            <td>0</td>
                            <td>{{ response1.cost_wo_nds?.toFixed(2) }}</td>
                            <td>{{ response1.nds?.toFixed(2) }}</td>
                            <td>{{ response1.add_expenses?.toFixed(2) }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{{ response2.departure_station }}</td>
                            <td>{{ response2.departure_road }}</td>
                            <td>{{ response2.destination_station }}</td>
                            <td>{{ response2.destination_road }}</td>
                            <td>{{ response2.cargo }}</td>
                            <td>{{ response2.distance }}</td>
                            <td>{{ response2.loading }}</td>
                            <td>{{ response2.travel_days }}</td>
                            <td>{{ response2.unloading }}</td>
                            <td>{{ response2.total_days }}</td>
                            <td>{{ response2.stavka }}</td>
                            <td>{{ response2.cost }}</td>
                            <td>{{ response2.cost_wo_nds?.toFixed(2) }}</td>
                            <td>{{ response2.nds?.toFixed(2) }}</td>
                            <td>{{ response2.add_expenses?.toFixed(2) }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr v-if="Object.keys(this.response2).length > 1 && Object.keys(this.response1).length > 1">
                            <td>Итого</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{ Math.ceil(response1.distance + response2.distance) ?? "" }}</td>
                            <td>{{  Math.ceil(response1.loading + response2.loading) ?? "" }}</td>
                            <td>{{  Math.ceil(response1.travel_days + response2.travel_days) ?? "" }}</td>
                            <td>{{  Math.ceil(response1.unloading + response2.unloading) ?? "" }}</td>
                            <td>{{  Math.ceil(response1.total_days + response2.total_days - this.prepare_volume) ?? "" }}</td>
                            <td></td>
                            <td>{{  Math.ceil(response2.cost) }}</td>
                            <td>{{  Math.ceil((response1.cost_wo_nds + response2.cost_wo_nds)) ?? "" }}</td>
                            <td>{{  Math.ceil((response1.nds + response2.nds)) ?? "" }}</td>
                            <td>{{  Math.ceil((response1.add_expenses + response2.add_expenses)) ?? "" }}</td>
                            <td>{{  Math.ceil((response1.income + response2.income - this.prepare_amount)) ?? "" }}</td>
                            <td style="background: lightsalmon;">
                            {{  Math.ceil(((response1.income + response2.income - this.prepare_amount) 
                                        / 
                            (response1.total_days + response2.total_days - this.prepare_volume))) ?? "" }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
    </div>
</template>


<style scoped>
input[type='number']:focus {
    border: none;
    outline: none;
}

.grid_block {
    display: grid;
    gap: 4%;
    grid-template-columns: repeat(2, 1fr);
}

.Cargo_block {
    padding: 2%;
    gap: 5%;
    display: flex;
    justify-content: space-between;
}

.Cargo_block input,
select {
    height: 30px;
    border-radius: 5px;
    padding-left: 2%;
    width: 15vw;
    border: 1px solid lightgrey !important;
    margin-top: 2%;
}

.ToGOBlock {
    padding: 2%;
    display: flex;
    justify-content: space-between;
}

.ToGOBlock4 {
    padding: 2%;
    display: flex;
    justify-content: space-between;
}

.ToGOBlock4 input,
select {
    height: 30px;
    border-radius: 5px;
    width: 6vw;
    padding-left: 2%;
    border: 1px solid lightgrey !important;
    margin-top: 2%;


}

label {
    font-weight: 700;
    color: #2c2c2c;

}

.explanation h5 {
    margin: 2%;
}

.ToGOBlock input,
select {
    height: 30px;
    border-radius: 5px;
    width: 15vw;
    padding-left: 2%;
    border: 1px solid lightgrey !important;
    margin-top: 2%;

}

.departure {
    height: auto;
    border: 2px solid #8398ac;
    border-radius: 5px;
    position: relative;
    box-sizing: border-box;
}

.destination {
    height: auto;
    border: 2px solid #8398ac;
    border-radius: 5px;

}

.WatchAllArenda {
    color: #929292;
    padding: 1%;
    font-size: 25px;
    cursor: pointer;
    outline: none;
}

.WatchAllArenda:hover {
    outline: none;
    text-decoration: none;
}

.air_block {
    width: 95%;
    padding: 2%;
    height: auto;
    min-height: 40vh;
    border-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
}

.dataDeparture li:hover {
    background: rgb(182, 182, 214);
}

.dataDeparture {
    margin: -4% 0 0 0%;
    width: 96%;
    /* height: 90px; */
    overflow: auto;
    border: 1px solid grey;
    position: absolute;
    border-top: none;
    background: rgb(245, 245, 245);
    z-index: 10;
}

input {
    height: 100%;
    width: 100%;
    border: none;
}

.inputcontainer {
    position: relative;
    background: white;
}





.icon-container {
    position: absolute;
    right: 5px;
    top: calc(50% - 10px);
}

.loader {
    position: relative;
    height: 20px;
    width: 20px;
    display: inline-block;
    animation: around 5.4s infinite;
}

@keyframes around {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}

.loader::after,
.loader::before {
    content: "";
    background: white;
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-width: 2px;
    border-color: #646464 #646464 transparent transparent;
    border-style: solid;
    border-radius: 20px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    animation: around 0.7s ease-in-out infinite;
}

.loader::after {
    animation: around 0.7s ease-in-out 0.1s infinite;
    background: transparent;
}
</style>
<script>


import Notifications from "@/components/notifications/Notifications.vue";



import api from "@/api/wagonPark";
import Loader from '@/components/loader/loader.vue';

export default {
    components: { Notifications, Loader },
    data() {
        return {
            prepare_volume: 0,
            prepare_amount: 0,
            loader: false,
            // уведомление
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",

            departure_station: "",
            departure_station_code: "",
            destination_station: "",
            destination_station_code: "",
            cargo: "",
            cargo_code: "",
            cargo_weight: "",
            wagon_belong: "2",
            wagon_type: "Полувагон",
            is_empty: "false",
            loadings_days: "",
            unloading_days: "",
            add_expenses: "",
            stavka: "",
            responseData: "",

            loaderInputDep: false,
            loaderInputDest: false,
            loaderInputCargo: false,

            warning: false,
            warningDest: false,
            warningCargo: false,

            timeoutId: null,
            timeoutIdDest: null,
            timeoutIdCargo: null,
            station_departure_search: [],
            station_destination_search: [],
            cargo_search: [],

            // ПОРОЖНИЙ
            departure_stationEmpty: "",
            departure_station_codeEmpty: "",
            destination_stationEmpty: "",
            destination_station_codeEmpty: "",
            cargoEmpty: "",
            cargo_codeEmpty: "",
            cargo_weightEmpty: "",
            wagon_belongEmpty: "2",
            wagon_typeEmpty: "Полувагон",
            is_emptyEmpty: "true",
            loadings_daysEmpty: "",
            unloading_daysEmpty: "",
            add_expensesEmpty: "",
            stavkaEmpty: "",
            responseDataEmpty: "",

            loaderInputDepEmpty: false,
            loaderInputDestEmpty: false,
            loaderInputCargoEmpty: false,

            warningEmpty: false,
            warningDestEmpty: false,
            warningCargoEmpty: false,

            timeoutIdEmpty: null,
            timeoutIdDestEmpty: null,
            timeoutIdCargoEmpty: null,
            station_departure_searchEmpty: [],
            station_destination_searchEmpty: [],
            cargo_searchEmpty: [],


            response1: "",
            response2: "",
        }
    },
    watch: {
        destination_station() {
            if (this.destination_station.length < 2) {
                this.warning = false
            }
        },
        departure_station() {
            if (this.departure_station.length < 2) {
                this.warningDest = false
            }
        },
        cargo() {
            if (this.cargo.length < 2) {
                this.warningCargo = false
            }
        },
        destination_stationEmpty() {
            if (this.destination_stationEmpty.length < 2) {
                this.warningEmpty = false
            }
        },
        departure_stationEmpty() {
            if (this.departure_stationEmpty.length < 2) {
                this.warningDestEmpty = false
            }
        },
        cargoEmpty() {
            if (this.cargoEmpty.length < 2) {
                this.warningCargoEmpty = false
            }
        }
    },
    mounted() {
        document.body.addEventListener('click', this.onClick);
    },
    beforeDestroy() {
        document.body.removeEventListener('click', this.onClick);
    },
    methods: {
        CalculateValue() {
            this.loader = true
            let dataObjects = [
                {
                    'departure_station_code': String(this.departure_station_code),
                    'destination_station_code': String(this.destination_station_code),
                    'cargo_code': String(this.cargo_code),
                    'cargo_weight': Number(this.cargo_weight),
                    'wagon_belong': Number(this.wagon_belong),
                    'wagon_type': String(this.wagon_type),
                    'is_empty': Boolean(this.is_empty),
                    'loadings_days': Number(this.loadings_days),
                    'unloading_days': Number(this.unloading_days),
                    'add_expenses': Number(this.add_expenses),
                    'stavka': Number(this.stavka)
                }, {
                    'departure_station_code': String(this.departure_station_codeEmpty),
                    'destination_station_code': String(this.destination_station_codeEmpty),
                    'cargo_code': String(this.cargo_codeEmpty),
                    'cargo_weight': Number(this.cargo_weightEmpty),
                    'wagon_belong': Number(this.wagon_belongEmpty),
                    'wagon_type': String(this.wagon_typeEmpty),
                    'is_empty': Boolean(this.is_emptyEmpty),
                    'loadings_days': Number(this.loadings_daysEmpty),
                    'unloading_days': Number(this.unloading_daysEmpty),
                    'add_expenses': Number(this.add_expensesEmpty),
                    'stavka': Number(this.stavkaEmpty)
                }
            ]
            console.log(dataObjects)
            const promises = dataObjects.map((dataObject, index) => {
                return api.getCalculateValue(dataObject)
                    .then(response => {
                        if (index === 0) {
                            this.response1 = response.data;
                        } else if (index === 1) {
                            this.response2 = response.data;
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        this.notifyHead = "Ошибка";
                        this.notifyMessage = `Введены некорректные данные. Таблица не может быть расчитана полностью! ${err}`;
                        this.notifyClass = "wrapper-error";
                        this.showNotify = true;
                        setTimeout(() => (this.showNotify = false), 2000);
                        throw err;
                    });
            });

            Promise.allSettled(promises)
                .then(() => {
                    console.log('Response 1:', this.response1);
                    console.log('Response 2:', this.response2);
                    this.loader = false;
                })
                .catch((err) => {
                    this.loader = false;
                });

            // api.getCalculateValue(dataObject)
            //     .then(response => {
            //         this.responseData = response.data
            //         this.loader = false
            //     }).catch((err) => {
            //         console.error(err)
            //         this.loader = false
            //     })
        },
        onClick(ev) {
            this.warning = false;
            this.warningDest = false;
            this.warningCargo = false;
            this.warningEmpty = false;
            this.warningDestEmpty = false;
            this.warningCargoEmpty = false;
        },

        checkThisDeparture(name, code) {
            this.departure_station = name
            this.departure_station_code = code
        },
        checkThisDestination(name, code) {
            this.destination_station = name
            this.destination_station_code = code
        },
        checkThisCargo(name, code6) {
            this.cargo = name
            this.cargo_code = code6
        },


        checkThisDepartureEmpty(name, code) {
            this.departure_stationEmpty = name
            this.departure_station_codeEmpty = code
        },
        checkThisDestinationEmpty(name, code) {
            this.destination_stationEmpty = name
            this.destination_station_codeEmpty = code
        },
        checkThisCargoEmpty(name, code6) {
            this.cargoEmpty = name
            this.cargo_codeEmpty = code6
        },


        // Груз
        getCargo() {
            // Сброс таймера, чтобы начать заново при каждом вводе
            clearTimeout(this.timeoutIdCargo);

            // Установка нового таймера на 2 секунды
            this.timeoutIdCargo = setTimeout(() => {
                // Выполняется после остановки ввода на 2 секунды
                this.sendRequestToServerCargo();
            }, 1000);
        },
        sendRequestToServerCargo() {
            if (this.cargo.length < 2) {
                this.warningCargo = false
                return
            }
            this.loaderInputCargo = true
            api.getCargoCodeSearch(this.cargo)
                .then(response => {

                    const newArray = response.data.data.filter((obj, index, array) => {
                        return array.findIndex((o) => o.name === obj.name) === index;
                    });
                    this.cargo_search = newArray
                    this.warningCargo = true

                    this.loaderInputCargo = false
                }).catch((err) => {
                    console.error(err)
                    this.loaderInputCargo = false

                })

        },
        getCargoEmpty() {
            // Сброс таймера, чтобы начать заново при каждом вводе
            clearTimeout(this.timeoutIdCargoEmpty);

            // Установка нового таймера на 2 секунды
            this.timeoutIdCargoEmpty = setTimeout(() => {
                // Выполняется после остановки ввода на 2 секунды
                this.sendRequestToServerCargoEmpty();
            }, 1000);
        },

        sendRequestToServerCargoEmpty() {
            if (this.cargoEmpty.length < 2) {
                this.warningCargoEmpty = false
                return
            }
            this.loaderInputCargoEmpty = true
            api.getCargoCodeSearch(this.cargoEmpty)
                .then(response => {

                    const newArray = response.data.data.filter((obj, index, array) => {
                        return array.findIndex((o) => o.name === obj.name) === index;
                    });
                    this.cargo_searchEmpty = newArray
                    this.warningCargoEmpty = true

                    this.loaderInputCargoEmpty = false
                }).catch((err) => {
                    console.error(err)
                    this.loaderInputCargoEmpty = false

                })

        },




        // Назначение
        getStationDestination() {
            // Сброс таймера, чтобы начать заново при каждом вводе
            clearTimeout(this.timeoutIdDest);

            // Установка нового таймера на 2 секунды
            this.timeoutIdDest = setTimeout(() => {
                // Выполняется после остановки ввода на 2 секунды
                this.sendRequestToServerDest();
            }, 1000);
        },
        sendRequestToServerDest() {
            if (this.destination_station.length < 2) {
                this.warningDest = false
                return
            }
            this.loaderInputDest = true
            api.getCurrentStation(this.destination_station)
                .then(response => {
                    const newArray = response.data.data.filter((obj, index, array) => {
                        return array.findIndex((o) => o.name === obj.name) === index;
                    });
                    this.station_destination_search = newArray
                    this.warningDest = true
                    this.loaderInputDest = false
                }).catch((err) => {
                    console.error(err)
                    this.loaderInputDest = false

                })

        },
        getStationDestinationEmpty() {
            // Сброс таймера, чтобы начать заново при каждом вводе
            clearTimeout(this.timeoutIdDestEmpty);

            // Установка нового таймера на 2 секунды
            this.timeoutIdDestEmpty = setTimeout(() => {
                // Выполняется после остановки ввода на 2 секунды
                this.sendRequestToServerDestEmpty();
            }, 1000);
        },
        sendRequestToServerDestEmpty() {
            if (this.destination_stationEmpty.length < 2) {
                this.warningDestEmpty = false
                return
            }
            this.loaderInputDestEmpty = true
            api.getCurrentStation(this.destination_stationEmpty)
                .then(response => {
                    const newArray = response.data.data.filter((obj, index, array) => {
                        return array.findIndex((o) => o.name === obj.name) === index;
                    });
                    this.station_destination_searchEmpty = newArray
                    this.warningDestEmpty = true
                    this.loaderInputDestEmpty = false
                }).catch((err) => {
                    console.error(err)
                    this.loaderInputDestEmpty = false

                })

        },



        // Отправка
        getStationDeparture() {
            // Сброс таймера, чтобы начать заново при каждом вводе
            clearTimeout(this.timeoutId);

            // Установка нового таймера на 2 секунды
            this.timeoutId = setTimeout(() => {
                // Выполняется после остановки ввода на 2 секунды
                this.sendRequestToServer();
            }, 1000);
        },
        sendRequestToServer() {
            if (this.departure_station.length < 2) {
                this.warning = false
                return
            }
            this.loaderInputDep = true
            api.getCurrentStation(this.departure_station)
                .then(response => {
                    const newArray = response.data.data.filter((obj, index, array) => {
                        return array.findIndex((o) => o.name === obj.name) === index;
                    });
                    this.station_departure_search = newArray
                    this.warning = true

                    this.loaderInputDep = false
                }).catch((err) => {
                    console.error(err)
                    this.loaderInputDep = false

                })

        },
        getStationDepartureEmpty() {
            // Сброс таймера, чтобы начать заново при каждом вводе
            clearTimeout(this.timeoutIdEmpty);

            // Установка нового таймера на 2 секунды
            this.timeoutIdEmpty = setTimeout(() => {
                // Выполняется после остановки ввода на 2 секунды
                this.sendRequestToServerEmpty();
            }, 1000);
        },
        sendRequestToServerEmpty() {
            if (this.departure_stationEmpty.length < 2) {
                this.warningEmpty = false
                return
            }
            this.loaderInputDepEmpty = true
            api.getCurrentStation(this.departure_stationEmpty)
                .then(response => {
                    const newArray = response.data.data.filter((obj, index, array) => {
                        return array.findIndex((o) => o.name === obj.name) === index;
                    });
                    this.station_departure_searchEmpty = newArray
                    this.warningEmpty = true

                    this.loaderInputDepEmpty = false
                }).catch((err) => {
                    console.error(err)
                    this.loaderInputDepEmpty = false

                })

        },
    }
}
</script>
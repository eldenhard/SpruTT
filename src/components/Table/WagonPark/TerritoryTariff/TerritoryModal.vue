<template>
    <div>
        <b-modal id="territoryModal" ref="territoryModal" hide-footer size="md">
            <template #modal-title>
            Добавление строки отчета в ручную
            </template>
            <div class="d-block text-center modal-block">
                <table border="1">
                    <thead>
                        <tr>
                            <th>Источник</th>
                            <th>Ст. отправления</th>
                            <th>Ст. назначения</th>
                            <th>Груз</th>
                            <th>Предыдущий груз</th>
                            <th>Вес</th>
                            <th>Вагон</th>
                            <th>Дата отправ.</th>
                            <th>Валюта</th>
                            <th>Без ндс в вал.</th>
                            <th>НДС в вал.</th>
                            <th>НДС</th>
                            <th>Дата акта</th>
                            <th>Накладная</th>
                            <th>Сумма РТ</th>
                            <th>Тариф по РФ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select v-model="shipment_source">
                                    <option value="" disabled>Выберите вид файла</option>
                                    <option value="arktur">Арктур</option>
                                    <option value="bmp">БМП</option>
                                    <option value="btlc">БТЛЦ</option>
                                    <option value="glp">GLP</option>
                                    <option value="doom">ДУМ</option>
                                </select>
                            </td>
                            <!-- Отравка -->
                            <td>
                                <div class="inputcontainer" style="height: 100% !important;">
                                    <input class="changeRow" v-model="departure_station" :type="'станция'"
                                        @keypress="debounceHandlers()" />
                                    <div class="icon-container" v-if="loaderInputDep">
                                        <i class="loader"></i>
                                    </div>


                                    <div class="dataDeparture" v-if="warning">
                                        <ul>
                                            <li v-for="departure in station_departure_search" :key="departure.id"
                                                @click="checkThisDeparture(departure.name, departure.code6)">
                                                {{ departure.name }} ({{ departure.code6 }})
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                            <!-- Назначение станция -->
                            <td>
                                <div class="inputcontainer" style="height: 100% !important;">
                                    <input class="changeRow" v-model="destination_station" :type="'станция'" />
                                    <div class="icon-container" v-if="loaderInputDest">
                                        <i class="loader"></i>
                                    </div>

                                    <div class="dataDeparture" v-if="warningDest">
                                        <ul>
                                            <li v-for="destination in station_destination_search" :key="destination.id"
                                                @click="checkThisDestination(destination.name, destination.code6)">
                                                {{ destination.name }} ({{ destination.code6 }})
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                            <td><input type="text" class="changeRow cargo" v-model="cargo"></td>
                            <!-- <td><textarea v-model="cargo" class="changeRow" v-on:blur="handleBlur()" id="txter"></textarea></td> -->
                            <td><input class="changeRow" type="number" v-model="prev_cargo"></td>
                            <td><input class="changeRow" type="number" v-model="weight"></td>
                            <td><input class="changeRow" type="number" v-model="wagon"></td>
                            <td><input class="changeRow" type="date" v-model="shipment_date"></td>
                            <td><input class="changeRow" type="text" v-model="currency"></td>
                            <td><input class="changeRow" type="number" v-model="sum_wo_nds_currency"></td>
                            <td><input class="changeRow" type="number" v-model="sum_wo_nds"></td>
                            <td><input class="changeRow" type="number" v-model="nds"></td>
                            <td><input class="changeRow" type="date" v-model="act_date"></td>
                            <td><input class="changeRow" type="number" v-model="invoice"></td>
                            <td><input class="changeRow" type="number" v-model="rt_sum"></td>
                            <td><input class="changeRow" type="number" v-model="tariff_rf"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-button>
        </b-modal>
    </div>
</template>


<script >
import Notifications from "@/components/notifications/Notifications.vue";
import api from "@/api/wagonPark";
import debounce from "lodash.debounce";
export default {
    name: "stations-railtarif",

    data() {
        return {
            shipment_source: '',
            weight: '',
            shipment_date: '',
            currency : '',
            sum_wo_nds_currency  : '',
            nds_currency : '',
            sum_wo_nds   : '',
            nds  : '',
            act_date : '',
            rt_sum   : '',
            tariff_rf: '',
            departure_station: '',
            destination_station  : '',
            cargo: '',
            prev_cargo   : '',
            road : '',
            wagon: '',
            invoice: '',
   
            departure_station_object: "",
            destionation_station_object: "",

            // появление- сокрытие элементов выпадающего списка подходящих значений
            warning: false,
            warningDest: false,

            station_departure_search: [],
            station_destination_search: [],
            elementZ: '',

            // loaders
            loaderInputDep: false,
            loaderInputDest: false,


            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
            lengthRoute: "",
        };
    },
    components: { Notifications },
    watch: {
        departure_station(...args) {
            this.debouncedWatch(...args);
            if (this.departure_station_name == '') {
                this.warning = false
            }
        },
        destination_station(...args) {
            this.elementZ(...args);
            if (this.destination_station_name == '') {
                this.warningDest = false
            }
        },

    },
    beforeDestroy() {
        document.body.removeEventListener('click', this.onClick);
    },

    created() {



        this.elementZ = debounce((newValue, oldValue) => {
            if (this.destination_station.length > 1) {
                this.loaderInputDest = true
                api.getCurrentStation(this.destination_station)
                    .then((response) => {
                        this.station_destination_search = response.data.data;
                        this.loaderInputDest = false
                        this.warningDest = true;
                    }).catch(error => {
                        this.loaderInputDest = false
                        console.log(error.response)
                    })
            }
        }, 300)


    },
    beforeUnmount() {
        this.debouncedWatch.cancel();
        this.elementZ.cancel();

    },

    mounted() {
        // this.stations = getItem("station");
        document.body.addEventListener('click', this.onClick);
    },
    beforeDestroy() {
        document.body.removeEventListener('click', this.onClick);
    },
// Либо через метод, либо через создание (created)
    methods: {
        debounceHandlers(a) {
            console.log('1')
            this.debouncedWatch = debounce((newValue, oldValue) => {
                if (this.departure_station.length > 2) {
                    this.loaderInputDep = true
                    api.getCurrentStation(this.departure_station)
                        .then((response) => {
                            this.station_departure_search = response.data.data;
                            this.loaderInputDep = false
                            this.warning = true;
                        }).catch(error => {
                            this.loaderInputDep = false
                            console.log(error.response)
                        })
                }
            }, 300)
        },
        onClick(ev) {
            this.warning = false;
            this.warningDest = false;
        },
        hideModal() {
            this.$refs['territoryModal'].hide()
        },
        checkThisDeparture(name, code) {
            this.departure_station = name
            
        },
        checkThisDestination(name, code) {
            this.destination_station = name



        }
    }
};
</script>
<style scoped>
.dataDeparture {
    height: auto;
    max-height: 350px;
    overflow: auto;
    width: 100%;
    margin-top: 21%;
    position: absolute;
    top: 21%;
    z-index: 15;
    border: 1px solid grey;
    border-top: none;
    background: white;

}

ul {
    margin: 0;
    padding: 0;
}

ul>li {
    list-style-type: none;
    text-align: left;
    border-bottom: 1px solid grey;
}

li:hover {
    background: lightgrey;
}

/* Убрал стрелки у инпута */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

td {
    position: relative;
    width: 100%;

}

th {
    font-size: 12px !important;
    font-weight: 200;
    /* width: auto; */
}

.changeRow {
    /* width: 100%; */
    height: 100% !important;
    border: none;
    outline: none;
}

.modal-block {
    height: 50vh;
    overflow: auto;
    /* width: 100vw !important; */
}

.inputcontainer {
    position: relative;
}

select {
    border: none;
    outline: none;
    width: auto;
}


.icon-container {
    position: absolute;
    right: 15px;
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
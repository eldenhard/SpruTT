<template>
    <div>
        <Loader :loader="loader" />
        <div class="filter_block">
            <label for="">Выбор месяца и года<br>
                <input type="month" class="textarea" name="" id="" v-model="data_month">
            </label>
            <label for="">Источник <br>
                <select name="" id="" v-model="shipment_source">
                    <option value="btlc">БТЛЦ</option>
                    <option value="arktur">АРКТУР</option>
                    <option value="bmp">БМП</option>
                    <option value="doom">ДУМ</option>
                    <option value="glp">ГЛП</option>
                </select>
            </label>
            <button class="button Request" @click="sendFilterGetUO28()">Загрузить данные</button>
        </div>

        <div>
            <p>Форма 4.28. "Детализированное состояние взаиморасчетов с экспедиторами по сопредельным территориям"</p>
            <p class="explanation">* Для получения данных о грузе или о станциях, кликните на интересующие поле</p>
            <br>
            <div style="overflow: auto;">
                <table cellspacing="0" border="0">
                    <thead>
                        <tr>
                            <th>Источник</th>
                            <th>Вес</th>
                            <th>Дата отправки</th>
                            <th>Валюта</th>
                            <th>Сумма без НДС в валюте</th>
                            <th>Валюта НДС</th>
                            <th>Сумма без НДС</th>
                            <th>НДС</th>
                            <th>Дата акта</th>
                            <th>Акт</th>
                            <th>Сумма РТ</th>
                            <th>Тариф РФ</th>
                            <th>Станция отпр.</th>
                            <th>Станция назн.</th>
                            <th>Груз</th>
                            <th>Пред. груз</th>
                            <th>Дорога</th>
                            <th>Вагон</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="no_data_available">
                            <td colspan="18">
                                <h2>По вашему запросу нет данных</h2>
                            </td>
                        </tr>
                        <tr v-for="item in uo_28" :key="item.id">
                            <td>{{ item.shipment_source | filter_source }}</td>
                            <td>{{ item.weight?.toFixed(2) ?? '0' | format }}</td>
                            <td>{{ item.shipment_date | date_format }}</td>
                            <td>{{ item.currency }}</td>
                            <td>{{ item.sum_wo_nds_currency?.toFixed(2) | format }}</td>
                            <td>{{ item.nds_currency?.toFixed(2) | format }}</td>
                            <td>{{ item.sum_wo_nds?.toFixed(2) | format }}</td>
                            <td>{{ item.nds?.toFixed(2) | format }}</td>
                            <td>{{ item.act_date | date_format }}</td>
                            <td>{{ item.invoice }}</td>
                            <td>{{ item.rt_sum?.toFixed(2) | format }}</td>
                            <td>{{ item.tariff_rf?.toFixed(2) | format }}</td>
                            <td @click="getStation(item.departure_station)" class="whatData">{{ item.departure_station }}
                            </td>
                            <td @click="getStation(item.destination_station)" class="whatData">{{ item.destination_station
                            }}</td>
                            <td @click="filter_cargo(item.cargo)" class="whatData">{{ item.cargo }}</td>
                            <td @click="filter_cargo(item.prev_cargo)" class="whatData">{{ item.prev_cargo }}</td>
                            <td>{{ filter_road(item.road) }}</td>
                            <td>{{ item.wagon }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
            id="notif" />

    </div>
</template>


<script>
import api from '@/api/reportUO'
import api_wagon from '@/api/wagonPark'
import Loader from '@/components/loader/loader.vue';
import { mapState } from 'vuex';
import Notifications from "@/components/notifications/Notifications.vue";

export default {
    components: { Loader, Notifications },
    data() {
        return {
            tst_data: [],
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
            no_data_available: false,
            uo_28: "",
            loader: false,
            data_month: "",
            shipment_source: "",
            cashe: new Map(),
        }
    },
    computed: {
        ...mapState({
            road: (state) => state.road.roadAsCountries,
            cargo_code: (state) => state.cargo_code.cargo_code
        })
    },
    methods: {
        async sendFilterGetUO28() {
            this.no_data_available = false;
            this.loader = true;
            let date = `${this.data_month}-01`;

            try {
                const response = await api.getUO28(date, this.shipment_source);

                let arr_data = response.data.data;

                if (arr_data.length === 0) {
                    this.no_data_available = true;
                }

                const key = 'departure_station';
                const sorted = arr_data.sort((data1, data2) => data1[key] > data2[key] ? 1 : -1);

                const uniqueDepartureStations = [...new Map(sorted.map(item => item[key]))];
                // const apiRequests = uniqueDepartureStations.map(departureStation => this.memoizeData(departureStation));

                await Promise.all(this.memoizeData(uniqueDepartureStations));

                console.log(Array.from(this.cashe.keys()));
                // let Requests = sorted.map((item) => this.memoizeData(item))

                // await Promise.all(Requests)

                // console.log(this.cashe.keys(), this.cashe.values());
                this.loader = false;
                this.uo_28 = sorted;
            } catch (error) {
                this.loader = false;
                console.error(error);
            }
        },

        async memoizeData(val) {
            if (Array.isArray(val)) {
                val.forEach((item) => {
                    this.memoizeData(item);
                });
                return;
            }

            if (!this.cashe.has(val)) {
                try {
                    let response = await api_wagon.getCurrentStationByCode(val)
                    this.cashe.set(val, response);
                } catch (error) {
                    console.log(error)
                }
            }
            return this.cashe.get(val);
        },
        filter_road(value) {
            for (let i in this.road) {
                if (this.road[i].code == value) {
                    return value = this.road[i].name
                }
            }
        },
        // Долгое выполнение
        filter_cargo(value) {
            if (value === null) {
                this.notifyHead = ``;
                this.notifyMessage = `Нет данных о  грузе`;
                this.notifyClass = "wrapper-success";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 3500);
                return
            }
            for (let i in this.cargo_code) {
                if (this.cargo_code[i].code6 == value) {
                    this.notifyHead = `Данные по ${value}`;
                    this.notifyMessage = `${this.cargo_code[i].name}`;
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 4500);
                }
            }
        },
        getStation(value) {
            this.loader = true
            api_wagon.getCurrentStationByCode(value)
                .then(response => {
                    this.loader = false
                    this.notifyHead = `Данные по станции ${value}`;
                    this.notifyMessage = `${response.data.data[0].name}`;
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 4500);
                }).catch(error => {
                    this.loader = false
                    this.notifyHead = `Ошибка`;
                    this.notifyMessage = `Не удалось найти станцию с таким кодом`;
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3500);
                })
        }
    },
    filters: {
        filter_source(value) {
            switch (value) {
                case 'btlc':
                    return 'БТЛЦ'
                    break
                case 'arktur':
                    return 'АРКТУР'
                    break
                case 'bmp':
                    return 'БМП'
                    break
                case 'doom':
                    return 'ДУМ'
                    break
                case 'glp':
                    return 'ГЛП'
                    break
            }
        },
        format(value) {
            return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        },
        date_format(value) {
            return value.split('-').reverse().join('.')
        },

    }
}
</script>

<style  scoped>
.filter_block {
    display: flex;
    flex-direction: column;
    width: 30%;
    border: none;
    margin-left: auto;
}

.filter_block input,
.filter_block select {
    width: 100%;
    margin-top: 2%;
    height: 40px;
}

.filter_block button {
    margin-top: 2%;
}

.filter_block label {
    color: grey;
}

.whatData:hover {
    background: lightgray;
}

td {
    white-space: nowrap;
}
</style>
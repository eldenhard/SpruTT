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
                            <td>{{ item.weight | format }}</td>
                            <td>{{ item.shipment_date | date_format }}</td>
                            <td>{{ item.currency }}</td>
                            <td>{{ item.sum_wo_nds_currency | format }}</td>
                            <td>{{ item.nds_currency | format }}</td>
                            <td>{{ item.sum_wo_nds | format }}</td>
                            <td>{{ item.nds | format }}</td>
                            <td>{{ item.act_date | date_format }}</td>
                            <td>{{ item.invoice }}</td>
                            <td>{{ item.rt_sum | format }}</td>
                            <td>{{ item.tariff_rf | format }}</td>
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

        <div id="wrapper">
            <ul id="pagination">
                <li v-for="btn in total_pages" :key="btn.id">
                    <a @click="getPagination(btn)" :class="{
                        active123: Truefalse(btn),
                        active_new: pageNumber == btn,
                    }">{{ btn }}</a>
                </li>
            </ul>
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
            // Пагинация
            pagination: "",
            total_pages: "",
            total_objects: 0,
            interval: 2,


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
        }
    },
    computed: {
        ...mapState({
            road: (state) => state.road.roadAsCountries,
            cargo_code: (state) => state.cargo_code.cargo_code
        })
    },
    methods: {
        Truefalse(btn) {
            if (btn == this.pageNumber) {
                return true;
            }
            if (btn == 1) {
                return true;
            }
            if (btn == this.total_pages) {
                return true;
            }
            if (btn > this.pageNumber && btn < this.pageNumber + this.interval) {
                return true;
            }
            if (btn < this.pageNumber && btn > this.pageNumber - this.interval) {
                return true;
            }

            return false;
        },
        getPagination(pg_number) {
            console.log(pg_number)
            this.loader = true;
            let date = `${this.data_month}-01`;
            api
                .getUO28Pagination(date, this.shipment_source, pg_number)
                .then((response) => {
                    this.loader = false;
                    let arr_data = response.data.data;
                    if (arr_data.length === 0) {
                        this.no_data_available = true;
                    }
                    const key = 'departure_station';
                    const sorted = arr_data.sort((data1, data2) => data1[key] > data2[key] ? 1 : -1);
                    this.uo_28 = sorted;
                    this.pageNumber = response.data.page_number;
                })

                .catch((error) => {
                    this.loader = false;
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = error.response.data;
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2000);
                    console.log(error);
                });
        },

        async sendFilterGetUO28() {
            this.no_data_available = false;
            this.loader = true;
            let date = `${this.data_month}-01`;

            try {
                const response = await api.getUO28(date, this.shipment_source);
                this.pageNumber = response.data.page_number;
                this.total_pages = response.data.total_pages;
                this.total_objects = response.data.total_objects;
                let arr_data = response.data.data;

                if (arr_data.length === 0) {
                    this.no_data_available = true;
                }

                const key = 'departure_station';
                const sorted = arr_data.sort((data1, data2) => data1[key] > data2[key] ? 1 : -1);

                this.loader = false;
                this.uo_28 = sorted;
            } catch (error) {
                this.loader = false;
                console.error(error);
            }
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
            if (value != "" && !!value) {
                let TwoSignNum = value?.toFixed(2)
                return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            }
            return value

        },
        date_format(value) {
            return value.split('-').reverse().join('.')
        },

    }
}
</script>

<style  scoped>
#wrapper {
  margin: 0 auto;
  display: block;
  margin-top: 2%;
  max-width: 80%;
  width: 80%;
}

#pagination {
  margin: 0;
  padding: 0;
  text-align: center;
}

#pagination li {
  display: inline;
}

#pagination li a {
  display: inline-block;
  text-decoration: none;
  padding: 5px 10px;
  color: #000;
  cursor: pointer;
}

/* Active and Hoverable Pagination */
#pagination li a {
  border-radius: 5px;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
}

#pagination li a.active_new {
  background-color: #18842a;
  color: #fff;
}

#pagination li a:hover:not(.active_new) {
  background-color: #ddd;
}

#pagination li a:not(.active123) {
  display: none;
}

/* border-pagination */
.b-pagination-outer {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  display: flex;
}

#border-pagination {
  margin: 0 auto;
  padding: 0;
  text-align: center;
}

#border-pagination li {
  display: inline;
}

#border-pagination li a {
  display: block;
  text-decoration: none;
  color: #000;
  padding: 5px 10px;
  border: 1px solid #ddd;
  float: left;
}

#border-pagination li a {
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
}

#border-pagination li a.active_new {
  background-color: #18842a;
  color: #fff;
}

#border-pagination li a:hover:not(.active_new) {
  background: #ddd;
}

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
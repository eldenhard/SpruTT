<template>
    <div>
        <Loader :loader="loader" />
        <p class="explanation">
            * Для поиска необходимого <b>кода</b> станции зайдите в раздел <b>"Справочник станции"</b> <br>
            * Копирование и ввод данных в таблицу 1 должен осуществляться из <b>WORD</b>, после вставки значения в ячейку
            нажмите Enter чтобы значения были занесены в таблицу<br>
            * После ввода данных в таблицу, Вы можете отредактировать в ней любое поле, нажатие Enter Не требуется <br>
            &nbsp;Таблица 2. <br>
            * Чтобы узнать название груза, стации отправления/назначения нажмите правой кнопкой мыши на интересующее поле, и
            подождите несколько секунд
            <br>
            * Для сохранения отредатированных данных нажмите на Enter после того как окончили ввод <br>
            &nbsp;(если индикация зеленая - все хорошо, в противном случае ознакомьтесь с ошибкой)
            <br>
            * Для сохранения отредатированных данных нажмите на Enter после того как окончили ввод <br>


        </p>
        <div class="air_block">
            <div class="air_block_header" style="
          display: flex !important;
          justify-content: space-between !important;
          width: 100%;
        ">
                <h5>Данные по тарифам</h5>
                <h6 v-on:click="visible = !visible" style="padding-right: 4%; cursor: pointer">
                    {{ visible ? "Свернуть " : "Развернуть" }}
                </h6>
            </div>
            <hr />
            <br />

            <table v-show="visible">
                <tr>
                    <td>№ договора</td>
                    <td>
                        <input type="text" class="textarea" v-model.trim="Standard.agreement_number"
                            placeholder="№ договора" />
                    </td>
                </tr>
                <br />

                <tr>
                    <td class="col1">№ приложения</td>
                    <td>
                        <input type="text" id="ln" class="textarea" v-model.trim="Standard.annex_number"
                            placeholder="№ приложения" />
                    </td>
                </tr>
                <br />

                <tr>
                    <td class="col1">Дата</td>
                    <td>
                        <input type="date" id="a" class="textarea" v-model="Standard.on_date" placeholder="Дата" />
                    </td>
                </tr>
                <br />

                <tr>
                    <td class="col1">Дата окончания</td>
                    <td>
                        <input type="date" id="a" class="textarea" v-model="Standard.end_date" placeholder="Дата" />
                    </td>
                </tr>
                <br />

                <tr>
                    <td class="col1">Расстояние от</td>
                    <td>
                        <input type="number" id="a" class="textarea" v-model.number="Standard.distance_min"
                            placeholder="Расстояние от" />
                    </td>
                </tr>
                <br />

                <tr>
                    <td class="col1">Расстояние до</td>
                    <td>
                        <input type="number" id="a" class="textarea" v-model.number="Standard.distance_max"
                            placeholder="Расстояние до" />
                    </td>
                </tr>
                <br />

                <!-- <tr>
                    <td class="col1">Ставка</td>
                    <td>
                        <input type="number" id="a" class="textarea" v-model.number="Standard.stavka" placeholder="Ставка" />
                    </td>
                </tr>
                <br />

                <tr>
                    <td class="col1">Ставка предварительная</td>
                    <td>
                        <input type="number" id="a" class="textarea" v-model.number="Standard.stavka_pre"
                            placeholder="Ставка предварительная" />
                    </td>
                </tr> -->
                <br />

                <tr>
                    <td class="col1">Клиент</td>
                    <td>
                        <input type="text" id="a" class="textarea" v-model="Standard.client" placeholder="Клиент" />
                    </td>
                </tr>
                <br />
                <tr v-show="ten_visible">
                    <td></td>
                    <td>
                        <div class="textarea" style="height: auto; width: 100%; margin-bottom: 1%;" v-show="ten_visible">
                            <ul id="root_tenant">
                                <li v-for="item in filter_client" :key="item.id" @click="checkClient(item.client)">
                                    <span>{{ item.client }}</span>
                                    <hr />
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="col1">Груз</td>
                    <td>
                        <input type="text" id="a" class="textarea" v-model="cargo_user" placeholder="Груз" />
                    </td>
                </tr>
                <br />
                <tr v-show="cargo_list">
                    <td></td>
                    <td>
                        <div class="textarea" style="height: auto; width: 100%; margin-bottom: 1%;" v-show="cargo_list">
                            <ul id="root_tenant">
                                <li v-for="item in filter_cargo" :key="item.id" @click="checkCargo(item.name, item.code6)">
                                    <span>{{ item.name }}</span>
                                    <hr />
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>

                <!-- <tr>
                    <td class="col1">Станция отправления</td>
                    <td>
                        <input type="number" id="a" class="textarea" v-model="Standard.departure_station" 
                            placeholder="Станция отправления код" />
                    </td>
                </tr>
                <br>
                <tr>
                    <td class="col1">Станция назначения</td>
                    <td>
                        <input type="number" id="a" class="textarea" v-model="Standard.destination_station"
                            placeholder="Станция назначения код" />
                    </td>
                </tr> -->



            </table>




            <table border="1" class="table_stavka" v-show="visible">
                <tr>
                    <td style="border: 1px solid black;"><input type="text" name="" id="destination_station"
                            @keyup.enter="saveTarif($event)" placeholder="скопируйте и вставьте данные"></td>
                    <td style="border: 1px solid black;"><input type="text" name="" id="departure_station"
                            @keyup.enter="saveTarif($event)" placeholder="скопируйте и вставьте данные"></td>
                    <td style="border: 1px solid black;"><input type="text" name="" id="stavka"
                            @keyup.enter="saveTarif($event)" placeholder="скопируйте и вставьте данные"></td>
                    <td style="border: 1px solid black;"><input type="text" name="" id="stavka_pre"
                            @keyup.enter="saveTarif($event)" placeholder="скопируйте и вставьте данные"></td>
                </tr>
                <tr>
                    <th style="border: 1px solid black;">Станция отпр.</th>
                    <th style="border: 1px solid black;">Станция назн.</th>
                    <th style="border: 1px solid black;">Ставка</th>
                    <th style="border: 1px solid black;">Ставка предв.</th>
                </tr>
                <tr v-for="(item, index) in data" :key="index">
                    <td style="border: 1px solid black;"><input type="number" v-model="item.destination_station"></td>
                    <td style="border: 1px solid black;"><input type="number" v-model="item.departure_station"></td>
                    <td style="border: 1px solid black;"><input type="number" v-model="item.stavka"></td>
                    <td style="border: 1px solid black;"><input type="number" v-model="item.stavka_pre"></td>
                </tr>
            </table>
            <br>



            <br />
            <div class="btn-group_tarif" v-show="visible">
                <button class="button Accept" @click="data = []" v-show="visible">
                    Очистить таблицу
                </button>
                <button class="button Accept" @click="postData()" v-show="visible">
                    Отправить данные
                </button>
            </div>
            <br>
        </div>

        <TarifDirectoryCreated style="margin-top: 5%;" />
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
    </div>
</template>

<script>
import Loader from '@/components/loader/loader.vue';
import { mapState } from 'vuex';
import Notifications from "@/components/notifications/Notifications.vue";
import api from '@/api/directory'
import TarifDirectoryCreated from './TarifDirectoryCreated.vue';

class Stavki {
    constructor() {
        this.destination_station = null
        this.departure_station = null
        this.stavka = null
        this.stavka_pre = null
    }

}
export default {
    components: { Loader, Notifications, TarifDirectoryCreated },
    data() {
        return {
            loader: false,
            data: [],
            rows: 1,
            loader: false,
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
            ten_visible: false,
            visible: true,
            cargo_list: false,
            departure_station_list: false,
            destination_station_list: false,
            cargo_user: "",
            Standard: {
                agreement_number: null,
                annex_number: null,
                on_date: null,
                end_date: null,
                client: "",
                distance_min: null,
                distance_max: null,
                // stavka: null,
                // stavka_pre: null,
                cargo: "",
                // departure_station: null,
                // destination_station: null,
                responsible: null,

            },
        };
    },
    computed: {
        ...mapState({
            name_client: (state) => state.client.name_client,
            name_cargo: (state) => state.cargo_code.cargo_code,
            uid: (state) => state.auth.uid,

        }),

        filter_client() {

            if (this.Standard.client.length > 1) {
                this.ten_visible = true;
            }

            return this.Standard.client.length > 1
                ? this.name_client.filter((item) =>
                    item.client.toLowerCase().includes(this.Standard.client.toLowerCase())
                )
                : "";
        },
        filter_cargo() {
            if (this.cargo_user.length > 1) {
                this.cargo_list = true;
            }
            return this.cargo_user.length > 1
                ? this.name_cargo.filter(item => item.name.toLowerCase().includes(this.cargo_user.toLowerCase()))
                : ""
        }
    },
    mounted() {
        document.body.addEventListener('click', this.closeWindow)
    },
    methods: {
        saveTarif(event) {
            if (event.target.id == 'destination_station' || event.target.id == 'departure_station') {
                let operationBuffer = [];
                operationBuffer = event.target.value.split(' ')
                let clear_buffer = []
                for (let i of operationBuffer) {
                    clear_buffer.push(i.trim().replace(/ /g, ''))
                }
                if (clear_buffer.at(-1) == "") {
                    clear_buffer.pop()
                }
                if (clear_buffer[0] == "") {
                    return;
                }

                for (let i in clear_buffer) {
                    if (this.data[i] == undefined) {
                        let newObj = new Stavki()
                        newObj[event.target.id] = clear_buffer[i]
                        this.data.push(newObj)
                    } else {
                        this.data[i][event.target.id] = clear_buffer[i]
                    }
                    // this.data = table_data
                }
                event.target.value = ""
                return
            }
            let operationBuffer = [];
            operationBuffer = event.target.value.split(',00')
            let clear_buffer = []
            for (let i of operationBuffer) {
                clear_buffer.push(i.trim().replace(/ /g, ''))
            }
            if (clear_buffer.at(-1) == "") {
                clear_buffer.pop()
            }
            if (clear_buffer[0] == "") {
                return;
            }

            for (let i in clear_buffer) {
                if (this.data[i] == undefined) {
                    let newObj = new Stavki()
                    newObj[event.target.id] = clear_buffer[i]
                    this.data.push(newObj)
                } else {
                    this.data[i][event.target.id] = clear_buffer[i]
                }
                // this.data = table_data
            }
            event.target.value = ""
        },
        closeWindow() {
            this.ten_visible = false
            this.cargo_list = false
        },
        checkClient(value) {
            this.Standard.client = value
        },
        checkCargo(value, code6) {
            this.Standard.cargo = code6
            this.cargo_user = value
        },
         postData() {
            this.loader = true
            this.Standard.responsible = this.uid
            for (let i in this.data) {
                Object.assign(this.data[i], this.Standard)
            }

            api.postTarifData(this.data)
                .then(response => {
                    this.loader = false
                    this.notifyHead = "Успешно";
                    this.notifyMessage = 'Данные загружены';
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2000);
                    this.data = []
                }).catch(error => {
                    this.loader = false
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = error.response.data;
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3000);
                })
        },
    }
}
</script>

<style lang="scss" scoped>
.table_stavka {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
}

input,
select {
    height: 25px !important;
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
}

.errorNote {
    border: 1px solid red !important;
}

.Accept {
    margin-left: auto;
    width: 25%;
    margin-right: 2%;
    margin-bottom: 2% !important;
}

.air_block {
    width: 70%;
    height: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
}

.air_block_header {
    padding: 1% 0 0 2%;
    color: rgb(202, 202, 202);
}

.btn-group_tarif {
    // display: flex;
    margin-left: -10% !important;
    // justify-content: space-around !important;
}

li {
    cursor: pointer;
}</style>
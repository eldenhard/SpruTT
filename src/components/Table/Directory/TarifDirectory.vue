<template>
    <div>
        <Loader :loader="loader" />
        <p class="explanation">
            * Для поиска необходимого <b>кода</b> станции зайдите в раздел <b>"Справочник станции"</b> <br>
            * Копирование и ввод данных в таблицу 1 должен осуществляться из <b>WORD</b>, после вставки значения в ячейку
            нажмите Enter чтобы значения были занесены в таблицу<br>
            * После ввода данных в таблицу, Вы можете отредактировать в ней любое поле, нажатие Enter Не требуется <br>
            * Для удаления строки таблицы нажмите на порядковый номер строки
            <br>
            &nbsp;Таблица 2. <br>
            * <b>Данные по ставкам должны загружаться из WORD, числа должны быть в строгом формате. Пример: 1 599,00 </b><br>
            * <b>Данные по станциям должны быть указаны через пробел </b><br>
            * <b>Данные по дистанциям должны быть скопированы и вставлены из WORD в формате 0 - 5 6 - 8</b><br>
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
                    <td>№ документа</td>
                    <td>
                        <div style="display: flex; justify-content: space-between;">
                            <input type="radio" id="one" value="agreement_number" v-model="picked">
                            <label for="one">Договор</label>
                            <br>
                            <input type="radio" id="two" value="annex_number" v-model="picked">
                            <label for="two">Приложение</label>
                            <br>
                        </div>

                        <input type="text" class="textarea" v-model.trim="Standard.agreement_number"
                            :placeholder="placeholderAgreement" v-show="visible_inp_ag" />
                        <input type="text" class="textarea" v-model.trim="Standard.annex_number"
                            :placeholder="placeholderAgreement" v-show="visible_inp_an" />
                    </td>
                </tr>
                <br />

                <!-- <tr>
                    <td class="col1">№ приложения</td>
                    <td>
                        <input type="text" id="ln" class="textarea" v-model.trim="Standard.annex_number"
                            placeholder="№ приложения" />
                    </td>
                </tr>
                <br /> -->

                <tr v-show="visible_agreement">
                    <td class="col1">Все договора</td>
                    <td>
                        <select name="" id="" v-model="agreement_number_test" @change="test()">
                            <option :value="[item.agreement_number, item.client, item.id]"
                                v-for="item in all_agreement_number" :key="item.id">{{ item.agreement_number }} {{
                                    item.client }} {{ item.on_date }} </option>
                        </select>
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





            </table>




            <table border="1" class="table_stavka" v-show="visible">
                <tr>
                    <td style="border: 1px solid white !"></td>
                    <td style="border: 1px solid black;"><input type="text" name="" id="destination_station"
                            @keyup.enter="saveTarif($event)" placeholder="скопируйте и вставьте данные"></td>
                    <td style="border: 1px solid black;"><input type="text" name="" id="departure_station"
                            @keyup.enter="saveTarif($event)" placeholder="скопируйте и вставьте данные"></td>
                    <td style="border: 1px solid black;"><input type="text" name="" id="stavka"
                            @keyup.enter="saveTarif($event)" placeholder="скопируйте и вставьте данные"></td>
                    <td style="border: 1px solid black;"><input type="text" name="" id="stavka_pre"
                            @keyup.enter="saveTarif($event)" placeholder="скопируйте и вставьте данные"></td>
                    <td style="border: 1px solid black;" colspan="2">
                        <input type="text" id="distance" @keyup.enter="saveDistance($event)"
                            placeholder="скопируйте и вставьте данные">
                    </td>
                </tr>
                <tr>
                    <th>№</th>
                    <th style="border: 1px solid black;">Станция отпр.</th>
                    <th style="border: 1px solid black;">Станция назн.</th>
                    <th style="border: 1px solid black;">Ставка</th>
                    <th style="border: 1px solid black;">Ставка предв.</th>
                    <th style="border: 1px solid black;">Дистанция от</th>
                    <th style="border: 1px solid black;">Дистанция до</th>
                </tr>
                <tr v-for="(item, index) in data" :key="index">
                    <td style="border: 1px solid black;" @click="data.splice(index, 1);" class="delete"
                        :class="{ error: item.error != null }">{{ item.error != null ? item?.error : index + 1
                        }}
                    </td>

                    <td style="border: 1px solid black;"><input style="width: 100%;" type="number"
                            v-model="item.destination_station"></td>
                    <td style="border: 1px solid black;"><input style="width: 100%;" type="number"
                            v-model="item.departure_station"></td>
                    <td style="border: 1px solid black;"><input style="width: 100%;" type="number" v-model="item.stavka">
                    </td>
                    <td style="border: 1px solid black;"><input style="width: 100%;" type="number"
                            v-model="item.stavka_pre">
                    </td>

                    <td style="border: 1px solid black;"><input style="width: 100%;" type="number"
                            v-model="item.distance_min">
                    </td>

                    <td style="border: 1px solid black;"><input style="width: 100%;" type="number"
                            v-model="item.distance_max">
                    </td>
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
        this.destination_station = null;
        this.departure_station = null;
        this.stavka = null;
        this.stavka_pre = null;
        this.distance_min = null;
        this.distance_max = null;
        this.error = null;
    }

}
export default {
    components: { Loader, Notifications, TarifDirectoryCreated },
    data() {
        return {
            loader: false,
            visible_agreement: false,
            visible_inp_an: false,
            visible_inp_ag: true,
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
            picked: "agreement_number",
            placeholderAgreement: "введите номер договора",
            distance: [],
            all_agreement_number: "",
            agreement_number_test: "",
            Standard: {
                agreement_number: null,
                annex_number: null,
                on_date: null,
                end_date: null,
                client: "",
                base: null,
                // distance_min: null,
                // distance_max: null,
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
        // this.loader = true
        api.getAllDocuments()
            .then(response => {
                let data = response.data.data
                let arr = []
                for (let i in data) {

                    arr.push({
                        'agreement_number': data[i].agreement_number,
                        'client': data[i].client,
                        'on_date': data[i].on_date,
                        'id': data[i].id,
                    })
                }
               this.all_agreement_number = arr.reduce((acc, item) => {
                    if (!acc.find(value => value.agreement_number == item.agreement_number)) {
                        acc.push(item);
                    }
                    return acc;
                }, []);

                this.loader = false

            }).catch(error => {
                this.loader = false
                console.log(error)
            })
    },
    watch: {
        picked() {
            if (this.picked == 'agreement_number') {
                this.placeholderAgreement = 'введите номер договора'
                this.visible_agreement = false
                this.visible_inp_ag = true
                this.visible_inp_an = false
                this.Standard.annex_number = ""
                this.agreement_number_test = ""
            } else {
                this.placeholderAgreement = 'введите номер приложения'
                this.visible_agreement = true
                this.visible_inp_ag = false
                this.visible_inp_an = true
                this.Standard.agreement_number = ""
            }
        }
    },
    methods: {
        test() {
            this.Standard.agreement_number = this.agreement_number_test[0]
            this.Standard.client = this.agreement_number_test[1]
            this.Standard.base = this.agreement_number_test[2]
            // console.log(this.agreement_number_test)
        },
        saveDistance(event) {
            navigator.clipboard.readText()
                .then(response => {
                    this.distance = response.split('\r\n')
                    if (this.distance.at(-1) == "") {
                        this.distance.pop()
                    }
                    console.log(this.distance)
                    for (let i in this.distance) {
                        this.distance[i].replaceAll(" ", "")
                    }
                    let data = []
                    this.distance.forEach((value, index) => {
                        data.push(this.distance.slice(index, index + 1));
                    });
                    let arr = []
                    for (let i in data) {
                        arr.push(data[i][0].split(" - "))
                    }
                    if (arr[0] == "") {
                        return
                    }
                    let distance_min = []
                    let distance_max = []
                    for (let i of arr) {
                        distance_min.push(i[0])
                        distance_max.push(i[1])
                    }
                    for (let i in distance_min) {
                        if (this.data[i] == undefined) {
                            let newObj = new Stavki()
                            newObj[event.target.id + '_min'] = +distance_min[i]
                            this.data.push(newObj)
                        } else {
                            this.data[i][event.target.id + '_min'] = +distance_min[i]
                        }
                    }
                    for (let i in distance_max) {
                        if (this.data[i] == undefined) {
                            let newObj = new Stavki()
                            newObj[event.target.id + '_max'] = +distance_max[i]
                            this.data.push(newObj)
                        } else {
                            this.data[i][event.target.id + '_max'] = +distance_max[i]
                        }
                    }
                    event.target.value = ""
                    return
                })



        },
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
            if (this.picked == 'annex_number' && this.agreement_number_test == "") {
                console.log('123')
                this.notifyHead = "Ошибка";
                this.notifyMessage = 'Заполните поле с выбором договора для вашего приложения';
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 3000);
                return
            }
            else if (this.picked == 'annex_number' && this.Standard.annex_number == null) {
                console.log('123')
                this.notifyHead = "Ошибка";
                this.notifyMessage = 'Заполните номер приложения';
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 3000);
                return
            } else {
                this.Standard.responsible = this.uid
                for (let i in this.data) {
                    Object.assign(this.data[i], this.Standard)
                }
                this.loader = true

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
                        this.notifyMessage = 'Проверьте поле с ошибками';
                        this.notifyClass = "wrapper-error";
                        this.showNotify = true;
                        setTimeout(() => {
                            this.showNotify = false;
                        }, 3000);

                        for (let i in this.data) {
                            this.data[i]['error'] = null

                        }
                        for (let i in error.response.data) {
                            this.data[error.response.data[i][0] - 1].error =
                                error.response.data[i][1];
                        }

                        let filter_arr = [...this.data];
                        this.data = filter_arr.filter((item) => {
                            return item.error != null;
                        });
                    })
            }

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

.delete:hover {
    background: lightcoral;

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

.error {
    background: lightcoral;
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
    padding: 1%;
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
}
</style>
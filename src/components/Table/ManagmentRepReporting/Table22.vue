<template>
    <div>
        <Loader :loader="loader" />

        <p>Форма 4.22. "Сводные расходы на ремонт ПС"</p>
        <div style="display: flex; justify-content: space-between;" class="filter_block">

            <div style="display: flex; flex-direction: column;">

                <label for="" style="color: gray;">
                    Тип вагона
                    <br />
                    <input type="checkbox" id="john" value="ПВ" v-model="wag_type">
                    <label for="john" style="color: black;">&nbsp;Полувагон</label>
                    <br>
                    <input type="checkbox" id="mike" value="ЦС" v-model="wag_type">
                    <label for="mike" style="color: black;">&nbsp;Цистерна</label>
                </label>


            </div>
            <div style="display: flex; ">
                <div style="display: flex;  flex-direction: column;">
                    <label for="" style="color: gray; margin-left: -15%;">
                        Принадлежность
                        <br />

                        <input type="checkbox" value="Собственный" id="Собственный" v-model="wagon_belong">
                        <label for="Собственный" style="color: black;">&nbsp;Собственный</label>
                        <br>
                        <input type="checkbox" value="Арендованный" id="Арендованный" v-model="wagon_belong">
                        <label for="Арендованный" style="color: black;">&nbsp;Арендованный</label>
                        <br>
                        <input type="checkbox" value="Взят в лизинг" id="Взят в лизинг" v-model="wagon_belong">
                        <label for="Взят в лизинг" style="color: black;">&nbsp;Взят в лизинг</label>
                        <br>
                        <input type="checkbox" value="Взят в скрытую арненду" id="Взят в скрытую арненду"
                            v-model="wagon_belong">
                        <label for="Взят в скрытую арненду" style="color: black;">&nbsp;Взят в скрытую арненду</label>
                        <br>


                        <input type="checkbox" value="Слежение" id="Слежение" v-model="wagon_belong">
                        <label for="Слежение" style="color: black;">&nbsp;Слежение</label>
                        <br>

                    </label>
                </div>
                <div></div>
                <div style="display: flex;  flex-direction: column;">
                    <label for="" style="color: gray;">
                        Принадлежность
                        <br />
                        <input type="checkbox" value="Привлеченный" id="Привлеченный" v-model="wagon_belong">
                        <label for="Привлеченный" style="color: black;">&nbsp;Привлеченный</label>
                        <br>
                        <input type="checkbox" value="Собственный, сдан в аренду" id="Собственный, сдан в аренду"
                            v-model="wagon_belong">
                        <label for="Собственный, сдан в аренду" style="color: black;">&nbsp;Собственный, сдан в
                            аренду</label>
                        <br>


                        <input type="checkbox" value="Лизинговый, сдан в аренду" id="Лизинговый, сдан в аренду"
                            v-model="wagon_belong">
                        <label for="Лизинговый, сдан в аренду" style="color: black;">&nbsp;Лизинговый, сдан в аренду</label>
                        <br>
                        <input type="checkbox" value="Арендованный, сдан в аренду" id="Арендованный, сдан в аренду"
                            v-model="wagon_belong">
                        <label for="Арендованный, сдан в аренду" style="color: black;">&nbsp;Арендованный, сдан в
                            аренду</label>
                        <br>
                        <input type="checkbox" value="Чужой" id="Чужой" v-model="wagon_belong">
                        <label for="Чужой" style="color: black;">&nbsp;Чужой</label>
                        <br>

                    </label>
                </div>


            </div>
            <Periods @Action="Actioned" @data="getCurrentData" />
           
           
        </div>


        <h4 class="NoData" v-show="NoData">По заданным параметрам нет данных</h4>
        <button @click="DownloadExcel()" class="Accept" style="width: 20%; height: 40px; margin-top: 2%; margin-left: auto;">Скачать в эксель</button>
        <div style="overflow: auto; margin-top: 2%;">

       
        <table ref="theTable">
            <thead>
                <tr >
                    <td rowspan="2" style="text-align: center !important; background: rgb(231, 231, 231);  border: 1px solid black; ">Показатель</td>
                    <td rowspan="2" style="background: rgb(231, 231, 231);  border: 1px solid black; ">Кол-во</td>
                    <td rowspan="2" style="background: rgb(231, 231, 231);  border: 1px solid black; ">Цена</td>
                    <td rowspan="2" style="background: rgb(231, 231, 231);  border: 1px solid black; ">Ср. расход</td>
                    <td colspan="3" style="background: rgb(231, 231, 231);  border: 1px solid black; " >ПВ</td>
                    <td colspan="3" style="background: rgb(231, 231, 231);  border: 1px solid black; ">ЦС</td>
                </tr>
                <tr>

                    <td style="text-align: center !important; background: rgb(231, 231, 231);  border: 1px solid black; ">Кол-во</td>
                    <td style="background: rgb(231, 231, 231);  border: 1px solid black; ">Цена</td>
                    <td style="background: rgb(231, 231, 231);  border: 1px solid black; ">Ср. расход</td>
                    <td style="background: rgb(231, 231, 231); text-align: center !important;  border: 1px solid black;">Кол-во</td>
                    <td style="background: rgb(231, 231, 231);  border: 1px solid black;">Цена</td>
                    <td style="background: rgb(231, 231, 231);  border: 1px solid black;">Ср. расход</td>
                </tr>
                <tr class="RowAlphabet">
                    <th v-for="item in getTh" :key="item.id" style="background: #FFD453;  border: 1px solid black; text-align: center;">{{ item.toUpperCase() }}</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="item, inducation in data">
                    <template v-for="group in getNextKey(item)">
                       
                        <tr class="Total_blue" v-if="CheckValue(inducation)">
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ inducation }}</td>
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #DAEEF3;  border: 1px solid black; text-align: center;">{{ }}</td>
                        </tr>
                        <tr class="Total_1" v-if="CheckValue(inducation)">
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ group }}</td>
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ item[group]['amount'] }}</td>
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ item[group]['cost'] | format }}</td>
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ item[group]['cost'] / item[group]['amount'] | format }}</td>
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ }}</td>
                            <td style="background: #FDFFD9;  border: 1px solid black; text-align: center;">{{ }}</td>
                        </tr>
                        <template v-for="service in getNextKey(item[group])">
                            <tr v-if="CheckValue(inducation)">
                                <td style=" border: 1px solid black; text-align: center;">{{ service }}</td>
                                <td style=" border: 1px solid black; text-align: center;">{{ item[group][service]['amount'] }}</td>
                                <td style=" border: 1px solid black; text-align: center;">{{ item[group][service]['cost'] | format }}</td>
                                <td style=" border: 1px solid black; text-align: center;">{{ item[group][service]['cost'] / item[group][service]['amount'] | format }}</td>
                                <td style=" border: 1px solid black; text-align: center;">{{ item[group][service]['Полувагон']?.amount ?? 0 }}</td>
                                <td style=" border: 1px solid black; text-align: center;">{{ item[group][service]['Полувагон']?.cost ?? 0 | format }}</td>
                                <td style=" border: 1px solid black; text-align: center;">{{ isNaN(item[group][service]['Полувагон']?.cost / item[group][service]['Полувагон']?.amount) ? 0 : 
                                 item[group][service]['Полувагон']?.cost / item[group][service]['Полувагон']?.amount | format }}</td>
                                <td style=" border: 1px solid black; text-align: center;">{{ item[group][service]['Цистерна']?.amount ?? 0 }}</td>
                                <td style=" border: 1px solid black; text-align: center;">{{ item[group][service]['Цистерна']?.cost ?? 0 | format }}</td>
                                <td style=" border: 1px solid black; text-align: center;">{{ isNaN(item[group][service]['Цистерна']?.cost / item[group][service]['Цистерна']?.amount) ? 0 : 
                                 item[group][service]['Цистерна']?.cost / item[group][service]['Цистерна']?.amount | format }}</td>

                            </tr>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>
<style>
@import '../../../style/UOTableStyle.css';

td,
th {
    white-space: nowrap;
    padding: 0 10px !important;
}

tr>td:first-child {
    text-align: left !important;
}

tr:hover {
    background: lightcyan;
}

.filter_block {
    display: flex;
    justify-content: space-between;
    padding: 2%;
    border: 1px solid lightgrey
}

.NoData {
    text-align: center;
    margin-top: 15%;
}



tr,
td,
th {
    border: 1px solid black
}

div:hover {
    cursor: pointer;
}
</style>

<script>
import Periods from "./Periods.vue";
import api from "@/api/reportUO"
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "@/components/loader/loader.vue";
export default {
    components: { Periods, Notifications, Loader },
    data() {
        return {

            data: "",
            date_begin: "",
            date_end: "",
            loader: false,
            wag_type: [],
            wagon_belong: [],
            NoData: false,
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
            TOTAL: "",
            today: "",

            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            amount_cols: 0,

        }
    },
    computed: {
        getTh() {
            return this.alphabet.slice(0, 10)
        },
    },
    mounted() {
        this.today = new Date().getMilliseconds() + Math.random() * 150
    },
    filters: {
        format(value) {
            if (value != "" && !!value) {
                let TwoSignNum = value?.toFixed(2)
                return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            }
            return value

        },
    },
    methods: {
        DownloadExcel() {
      var table = this.$refs.theTable;
      var tableHTML = table.outerHTML;
      var fileName = "Таблица 'Форма 22'.xls";

      // var msie = window.navigator.userAgent.indexOf("MSIE ");

      var a = document.createElement("a");
      tableHTML = tableHTML.replace(/  /g, "").replace(/ /g, "%20");
      a.href = "data:application/vnd.ms-excel," + tableHTML;
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
        CheckValue(value) {
            let client = value;
            if (
                client != 'amount' &&
                client != 'cost'
            ) {
                return true;
            }
        },
        getNextKey(obj) {
            const keys = Object.keys(obj);
            let correctKeys = [];
            for (let i of keys) {
                if (
                    i == 'amount' ||
                    i == 'cost') {
                    continue;
                } else {
                    correctKeys.push(i);
                }
            }
            return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
        },
        Translate(val) {
            switch (val) {
                case 'amount':
                    return 'Количество'
                    break
                case 'cost':
                    return 'Сумма'
                    break

                case "":
                    return 'Не определено'
                    break
                case val:
                    return val
                    break

            }
        },
        FilterValue(val) {
            return String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        },


        Actioned() {

            if (this.wag_type.length == 0 || this.wagon_belong.length == 0 || this.date_begin == "" || this.date_end == "") {
                this.notifyHead = "Ошибка";
                this.notifyMessage = 'Заполните все поля';
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                    this.showNotify = false;
                }, 2000);
                return
            } else {
                this.loader = true;
                api
                    .getUO422(this.date_begin, this.date_end, this.wag_type.join(','), this.wagon_belong.toString())
                    .then((response) => {
                        this.loader = false;
                        this.data = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loader = false;
                    });
            }

        },
        getCurrentData(data) {
            this.date_begin = data.date_begin;
            this.date_end = data.date_end;
        },

    }
}
</script>
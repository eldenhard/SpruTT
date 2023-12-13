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

        {{ data }}
        <table>
            <thead>
                <tr>
                    <td rowspan="2">Показатель</td>
                    <td rowspan="2">Всего</td>
                    <td rowspan="2">Кол-во</td>
                    <td rowspan="2">Цена</td>
                    <td colspan="2">В т.ч. по типам ПС</td>
                </tr>
                <tr>
                    <td>ПВ</td>
                    <td>ЦС</td>
                </tr>
            </thead>
            <tbody>
                <template v-for="item, inducation in data">
                    <template v-for="group in getNextKey(item)">
                        <tr class="Total_blue" v-if="CheckValue(inducation)">
                                <td>{{ inducation }}</td>
                            </tr>
                            <tr class="Total_1" v-if="CheckValue(inducation)">
                                <td>{{ group }}</td>
                            </tr>
                        <template v-for="service in getNextKey(item[group])">
                            <tr v-if="CheckValue(inducation)">
                                <td >{{ service }}</td>
                            </tr>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>

        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>
<style scoped>
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

            data: {
                "Текущий 1":
                {
                    "amount": 13, "cost": 56984.29999999998,
                    "1. ТР-1": {
                        "amount": 13, "cost": 56984.29999999998,
                        "2. Подача-уборка вагона": {
                            "amount": 4, "cost": 5311.820000000001,
                            "Полувагон": { "amount": 4, "cost": 5311.820000000001 }
                        }, "1. Работа по ремонту вагона": { "amount": 9, "cost": 51672.47999999999, "Полувагон": { "amount": 9, "cost": 51672.47999999999 } }
                    }
                }, "amount": 39, "cost": 402946.41, "Текущий 2": { "amount": 23, "cost": 64495.350000000006, "2. ТР-2": { "amount": 23, "cost": 64495.350000000006, "1. Работа по ремонту вагона": { "amount": 6, "cost": 6060.790000000001, "Полувагон": { "amount": 6, "cost": 6060.790000000001 } }, "2. Подача-уборка вагона": { "amount": 7, "cost": 14303.159999999998, "Полувагон": { "amount": 7, "cost": 14303.159999999998 } }, "Контрольные и регламентные операции": { "amount": 6, "cost": 26278.879999999997, "Полувагон": { "amount": 6, "cost": 26278.879999999997 } }, "Услуга по оформлению рекламационно-претензионной документации": { "amount": 1, "cost": 1628, "Полувагон": { "amount": 1, "cost": 1628 } }, "3. Текущий ремонт колесной пары": { "amount": 2, "cost": 15588.62, "Полувагон": { "amount": 2, "cost": 15588.62 } }, "Колодка тормозная": { "amount": 1, "cost": 635.9, "Полувагон": { "amount": 1, "cost": 635.9 } } } }, "Капитальный": { "amount": 3, "cost": 281466.76, "4. КР": { "amount": 3, "cost": 281466.76, "1. Работа по ремонту вагона": { "amount": 2, "cost": 279000, "Полувагон": { "amount": 2, "cost": 279000 } }, "Работы по нанесению логотипа": { "amount": 1, "cost": 2466.76, "Полувагон": { "amount": 1, "cost": 2466.76 } } } }
            },
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
        }
    },
    mounted() {
        this.today = new Date().getMilliseconds() + Math.random() * 150




    },
    methods: {
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
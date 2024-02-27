<template>
    <div>
        <Loader :loader="loader" />
        <div class="air_block">
            <div class="air_block_header">
                <h5>Оперативная справка</h5>
            </div>
            <hr />
            <br />
            <div class="filter_block" style="width: 35%; display: flex; flex-direction: column; position: relative;">
                <label for="">Дата <br>
                    <input type="date" class="textarea" style="width: 20vw !important;" v-model="date_begin"
                        :min="'2024-01-01'">
                </label>
                <label for="">
                    Тип вагона
                    <br />
                    <select name="" id="" v-model="wag_type" class="textarea" style="width:20vw !important;">
                        <option value="Полувагон">Полувагон</option>
                        <option value="Цистерна">Цистерна</option>
                    </select>

                </label>
                <br>
                <button class="Accept button" @click="Actioned()" style="width:20vw !important; height: 40px;">Загрузить
                    данные</button>
            </div>
            <div>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Выполнение плана" active>
                            <b-card-text>
                                    <table style="margin-left: -5%;">
                                        <thead>
                                            <tr>
                                                <th class="greenCell">{{ wag_type == 'Полувагон' ? 'Клиент' : 'Клиент' }}</th>
                                                <th class="greenCell">{{ wag_type == 'Полувагон' ? 'Кол-во погрузок' : "Объемы,тн" }} </th>
    
                                                <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{ wag_type ==
                                                    'Полувагон' ?
                                                    'Объем на тек дату План' : 'Кол-во погр План на тек дату' }} </th>
                                                <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{ wag_type ==
                                                    'Полувагон' ?
                                                    'Объем на тек дату Факт' : 'Кол-во погр факт на тек дату' }} </th>
                                                <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{ wag_type ==
                                                    'Полувагон' ?
                                                    'Выполнение абсл.' : 'Отклонение кол-ва ваг' }} </th>
                                                <th :class="[wag_type == 'Полувагон' ? 'greyCell' : 'redCell']">{{ wag_type ==
                                                    'Полувагон' ?
                                                    'Выполнение отн.' : ' % выполнения плана' }} </th>
    
                                                <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{ wag_type
                                                    == 'Полувагон' ?
                                                    'Выручка без НДС, руб' : "Выручка без НДС, руб ПЛАН" }} </th>
                                                <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{ wag_type
                                                    == 'Полувагон' ?
                                                    'Объем на тек дату План' : 'Выручка без НДС, руб на тек дату ПЛАН' }} </th>
                                                <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{ wag_type
                                                    == 'Полувагон' ?
                                                    'Объем на тек дату Факт' : 'Выручка без НДС, руб на тек дату факт' }} </th>
                                                <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{ wag_type
                                                    == 'Полувагон' ?
                                                    'Выполнение абсл.' : 'отклонения в выручке' }} </th>
                                                <th :class="[wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell']">{{ wag_type
                                                    == 'Полувагон' ?
                                                    'Выполнение отн.' : ' % выполнения' }} </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="Array.isArray(responseServerData) && responseServerData.length == 0">
                                                <td colspan="11">По выбранным параметрам нет данных</td>
                                            </tr>
                                            <tr v-for="item, index in responseServerData" :key="index">
                                                <td>{{ item.client }}</td>
                                                <td>{{ item.metric | format }}</td>
                                                <td>{{ item.metric_current_plan | format }}</td>
                                                <td>{{ item.metric_current_fact | format }}</td>
                                                <td>{{ item.metric_complete_abs | format }}</td>
                                                <td>{{ item.metric_complete_rel | format }}</td>
                                                <td>{{ item.revenue_wo_nds | format }}</td>
                                                <td>{{ item.revenue_current_plan | format }}</td>
                                                <td>{{ item.revenue_current_fact | format }}</td>
                                                <td>{{ item.revenue_complete_abs | format }}</td>
                                                <td>{{ item.revenue_complete_rel | format }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Доходность">
                            <b-card-text>
                                <table style="margin-left: -5%;">
                                    <thead>
                                        <th>Показатель</th>
                                        <th style="background: lightskyblue;">БП на {{ date_begin }}</th>
                                        <th style="background: lightseagreen;">Бюджет на {{ date_begin }}</th>
                                        <th style="background: rgb(46, 11, 11); color: white; font-weight: 400;">Факт на {{ date_begin }}</th>
                                        <th style="background: darkred; color: white; font-weight: 400;">Отклонение бюджета от БП {{ date_begin }}</th>
                                        <th style="background: darkred; color: white; font-weight: 400;">Отклонение факта от БП {{ date_begin }}</th>
                                        <th style="background: darkred; color: white; font-weight: 400;">Отклонение факта от бюджета {{ date_begin }}</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Выручка</td>
                                            <td></td>
                                            <td></td>
                                            <td>{{ incomeServerData?.income | format }}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Тариф порож</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Тариф по сопред порож</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Тариф груж</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Доп. расходы</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Маржинальный доход</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Вагоносутки (раб)</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Вагоносутки (общ)</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Доходность (раб в/с)</td>
                                            <td style="background: lightskyblue;"></td>
                                            <td style="background: lightseagreen;"></td>
                                            <td style="background: rgb(46, 11, 11); color: white  !important;;"></td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                        </tr>
                                        <tr>
                                            <td>Доходность (общ в/с)</td>
                                            <td style="background: lightskyblue;"></td>
                                            <td style="background: lightseagreen;"></td>
                                            <td style="background: rgb(46, 11, 11);  color: white !important;"></td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred;  color: white !important;">-</td>
                                            <td style="background: darkred; color: white !important;">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>

        </div>

    </div>
</template>


<script>
import Periods from "../../ManagmentRepReporting/Periods.vue";
import api from '@/api/directory'
import Loader from "@/components/loader/loader.vue";
export default {
    components: { Periods, Loader },
    data() {
        return {
            wag_type: "Полувагон",
            date_begin: new Date().toISOString().slice(0, 10),
            date_end: "",
            loader: false,
            responseServerData: "",
            incomeServerData: "",
        }
    },
    filters: {
        format(value) {
            if (value != "" && !!value) {
                let TwoSignNum = value?.toFixed(0)
                return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
            }
            return value

        },
    },
    watch: {
        wag_type() {
            this.responseServerData = ""
        }
    },
    methods: {

        Actioned() {
            this.loader = true
            api.getDataForOperSpravka(this.wag_type, this.date_begin)
                .then(response => {
                    this.loader = false
                    this.responseServerData = response.data.report
                    this.incomeServerData = response.data.other_info
                   
                }).catch((err) => {
                    this.loader = false
                    console.log(err)

                })
        },
    }
}
</script>
<style scoped>
table {
    margin-top: 2%;
}

.greenCell {
    background: #C6E0B4;
}

.greyCell {
    background: #808080;
    color: white
}

.orangeCell {
    background: #FFCC99;
}

.redCell {
    background: #F0C4B9;

}

.blueCell {
    background: #DBCFC3;

}

.air_block {
    width: 100%;
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

select {
    width: 30%;
    margin-top: 2%;
}


.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}
 tr td:nth-child(1){
    text-align: left !important;
    padding-left: 10px !important;
}
</style>
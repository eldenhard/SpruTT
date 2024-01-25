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
                    <input type="date" class="textarea" style="width: 20vw !important;" v-model="date_begin" :min="'2024-01-01'">
                </label>
                <label for="" >
                    Тип вагона
                    <br />
                    <select name="" id="" v-model="wag_type" class="textarea" style="width:20vw !important;">
                        <option value="Полувагон">Полувагон</option>
                        <option value="Цистерна">Цистерна</option>
                    </select>
                  
                </label>
                <br>
                    <button class="Accept button" @click="Actioned()" style="width:20vw !important; height: 40px;">Загрузить данные</button>
            </div>
          
            <table>
                <thead>
                    <tr>
                        <th class="greenCell">{{ wag_type == 'Полувагон' ? 'Клиент' : 'Клиент'}}</th>
                        <th  class="greenCell">{{ wag_type == 'Полувагон' ? 'Объемы, тн' : "Кол-во погрузок"}} </th>

                        <th :class="[ wag_type == 'Полувагон' ? 'greyCell' : 'redCell' ]">{{ wag_type == 'Полувагон' ? 'Объем на тек дату План' : 'Кол-во погр План на тек дату'}} </th>
                        <th :class="[ wag_type == 'Полувагон' ? 'greyCell' : 'redCell' ]">{{ wag_type == 'Полувагон' ? 'Объем на тек дату Факт' : 'Кол-во погр факт на тек дату'}} </th>
                        <th :class="[ wag_type == 'Полувагон' ? 'greyCell' : 'redCell' ]">{{ wag_type == 'Полувагон' ? 'Выполнение абсл.' :  'Отклонение кол-ва ваг'}} </th>
                        <th :class="[ wag_type == 'Полувагон' ? 'greyCell' : 'redCell' ]">{{ wag_type == 'Полувагон' ? ' Выполнение отн.' : '% выполнения плана'}}  </th>

                        <th :class="[ wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell' ]">{{ wag_type == 'Полувагон' ? 'Выручка  без НДС, руб' : "Выручка без НДС, руб ПЛАН"}} </th>
                        <th :class="[ wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell' ]">{{ wag_type == 'Полувагон' ? 'Объем на тек дату План' : 'Выручка без НДС, руб на тек дату ПЛАН'}} </th>
                        <th :class="[ wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell' ]">{{ wag_type == 'Полувагон' ? 'Объем на тек дату Факт' : 'Выручка без НДС, руб на тек дату факт'}} </th>
                        <th :class="[ wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell' ]">{{ wag_type == 'Полувагон' ? 'Выполнение абсл.' :  'отклонения в выручке'}} </th>
                        <th :class="[ wag_type == 'Полувагон' ? 'orangeCell' : 'blueCell' ]">{{ wag_type == 'Полувагон' ? ' Выполнение отн.' : '% выполнения'}}  </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="Array.isArray(responseServerData) && responseServerData.length == 0">
                        <td colspan="11">По выбранным параметрам нет данных</td>
                    </tr>
                    <tr v-for="item, index in responseServerData" :key="index">
                        <td>{{ item.client }}</td>
                        <td>{{ item.metric?.toFixed(2) }}</td>
                        <td>{{ item.metric_current_plan?.toFixed(2) }}</td>
                        <td>{{ item.metric_current_fact?.toFixed(2) }}</td>
                        <td>{{ item.metric_complete_abs?.toFixed(2) }}</td>
                        <td>{{ item.metric_complete_rel?.toFixed(2) }}</td>
                        <td>{{ item.revenue_wo_nds?.toFixed(2) }}</td>
                        <td>{{ item.revenue_current_plan?.toFixed(2) }}</td>
                        <td>{{ item.revenue_current_fact?.toFixed(2) }}</td>
                        <td>{{ item.revenue_complete_abs?.toFixed(2) }}</td>
                        <td>{{ item.revenue_complete_rel?.toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
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
            date_begin: new Date().toISOString().slice(0,10),
            date_end: "",
            loader: false,
            responseServerData: ""
        }
    },
    watch:{
        wag_type(){
            this.responseServerData = ""
        }
    },
    methods: {
   
        Actioned() {
            this.loader = true
            api.getDataForOperSpravka(this.wag_type, this.date_begin)
            .then(response => {
                this.loader = false
               this.responseServerData = response.data
            }).catch((err) => {
                this.loader = false
                console.log(err)
              
            })
        },
    }
}
</script>
<style scoped>
table{
    margin-top: 2%;
}
.greenCell{
    background: #C6E0B4;
}
.greyCell{
    background: #808080;
    color: white
}
.orangeCell{
    background: #FFCC99;
}
.redCell{
    background: #F0C4B9;
 
}
.blueCell{
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
</style>
<template>
    <div>
        <div class="air_block">
            <div class="air_block_header">
                <h5>Оперативная справка</h5>
            </div>
            <hr />
            <br />
            <Periods @Action="Actioned" @data="getCurrentData">
                <label for="">
                    Тип вагона
                    <br />
                    <select name="" id="" v-model="wag_type" style="width: 100%">
                        <option value="Полувагон">Полувагон</option>
                        <option value="Цистерна">Цистерна</option>
                    </select>
                </label>
            </Periods>
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
            </table>
        </div>

    </div>
</template>


<script>
import Periods from "../../ManagmentRepReporting/Periods.vue";
export default {
    components: { Periods },
    data() {
        return {
            wag_type: "Полувагон",
            date_begin: "",
            date_end: "",
        }
    }, methods: {
        getCurrentData(data) {
            this.date_begin = data.date_begin;
            this.date_end = data.date_end;
        },
        Actioned() {

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
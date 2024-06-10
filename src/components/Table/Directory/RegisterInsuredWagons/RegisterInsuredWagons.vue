<template>
<div>
<Loader :loader="loader" />
    <div class="air_block">
        <div class="air_block_header">
            <h4>Реестр застрахованных вагонов</h4>
        </div>
        <br>
        <div>
            <PregisterIsuredwagonsSearch />
            <table>
                <thead>
                    <tr>
                        <th>Страховщик</th>
                        <th>Страхователь</th>
                        <th>№ договора</th>
                        <th>Дата договора страхования</th>
                        <th>Дата окончания договора страхования</th>
                        <th>Кол-во застрахованных вагонов</th>
                        <th>Страховая сумма</th>
                        <th>Страховая премия</th>
                        <th>Франшиза</th>
                    </tr>
                </thead>
            </table>
            <button @click="getInsuredWagons()">Получить данные</button>
        </div>
    </div>
</div>
</template>


<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import PregisterIsuredwagonsSearch from "./components/PregisterIsuredwagonsSearch.vue";
export default {
    components: {
        Loader,
        PregisterIsuredwagonsSearch
    },
    data(){
        return{
            loader: false
        }
    },
    // mounted(){
    //  this.getInsuredWagons()
        
    // },
    methods: {

       async getInsuredWagons(){
        this.loader = true
            let fullDataInsuredWagons = []
            let obj = {page: 1}
            let response = await api.getAllInsuranceWagons(obj)
            fullDataInsuredWagons = response.data.data
            while(response.data.total_pages > obj.page) {
                obj.page += 1
                response = await api.getAllInsuranceWagons(obj)
                fullDataInsuredWagons = fullDataInsuredWagons.concat(response.data.data)
            }
            this.loader = false
           
            console.log(fullDataInsuredWagons)  
        }
    },
}
</script>


<style scoped>
.air_block {
    width: 100%;
    height: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #e4e4e4;
    position: relative;
    left: 50%;
    padding: 1%;
    transform: translate(-50%, 0);
    box-sizing: border-box;
}

.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}
</style>

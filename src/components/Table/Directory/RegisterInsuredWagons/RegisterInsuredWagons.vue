<template>
<div>
<Loader :loader="loader" />
    <div class="air_block">
        <div>
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
export default {
    components: {
        Loader
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

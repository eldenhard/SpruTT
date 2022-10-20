<template>
    <div style="margin: 1%;">
        <table class="tableFilterWagon" >
            <tr>
                <td style="width: 150px !important; height: 80px !important;"> 
    <p>Используется</p>
    <input 
        type="checkbox" 
        id="activeWagon" 
        v-model="filters.is_active"
        @change="updateFilterData" checked>       
     <label for="activeWagon"> {{ activeWagonLabel }}</label>
    
    </td>

<td style="width: 150px !important; height: 80px !important;">
    <p>Тип</p>
 
    <select v-model="filters.wagon_type"  @change="updateFilterData">
    <option
        v-for="wagType in wagonTypes" :key="wagType.id">
        {{wagType.name}}
    </option>
    </select>
</td>

 </tr>

        </table>
      
    </div>
</template>


<style>
.tableFilterWagon{
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    width: 95%;
}
.tableFilterWagon td {
    background: rgb(255, 255, 255);
    box-shadow: 2px 3px rgb(218, 218, 218);
}
</style>

<script>
import {api} from '@/api/wagonPark'
export default{
    data(){
        return{
            filters: {
                is_active: true,
                wagon_type: []
            },
            wagonTypes: ''
        }
    },
    computed: {
        activeWagonLabel(){
            return this.filters.is_active ? ' Активный' : ' Активный'
        }
    },
    methods: {
        updateFilterData(){
            this.$emit('updateFilters', this.filters)
        },
    },
    mounted(){
        const pretoken = JSON.parse(localStorage.getItem("vuex"));
            const token = pretoken.auth.user.token;
            fetch("http://10.1.5.65/api/wagon-park/wagon-type/", {
            // fetch("/api/wagon-park/wagon-type/", {

                headers: {
                    "Authorization": `Basic ${token}`
                },
                method: "GET"
            })
                .then((response) => {
                    this.wagonTypes = response.data;
                if (response.ok) {
                    return response.json().then(r => {
                        this.wagonTypes = r.data;
                        console.log(this.wagonTypes);
                    });
                }
                else {
                    console.log("NOT OK");
                }
            }),
            this.updateFilterData()

    }
    // mounted: function() {
    //     this.updateFilterData()
    // }
}
</script>
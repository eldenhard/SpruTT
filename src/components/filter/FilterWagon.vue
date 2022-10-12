<template>
    <div style="margin: 1%;">
        <table>
            <tr>
                <td style="width: 150px !important; height: 80px !important;"> 
    <p>Используется</p>
    <input 
        type="checkbox" 
        id="activeWagon" 
        v-model="filters.is_active"
        @change="updateFilterData">       
     <label for="activeWagon"> {{ activeWagonLabel }}</label>
    
    </td>

    <!-- <td style="width: 150px !important; height: 80px !important;"> 
    <p>Номер вагона</p>
    <input type="number" v-model="filters.number" @input="updateFilterData">
    </td> -->
 </tr>
        </table>
      
    </div>
</template>

<script>
export default{
    data(){
        return{
            filters: {
                is_active: false,
                // number: '',
                
            }
        }
    },
    computed: {
        activeWagonLabel(){
            return this.filters.is_active ? 'Активный' : 'Неактивный'
        }
    },
    methods: {
        updateFilterData(){
            this.$emit('updateFilters', this.filters)
        }
    },
    // mounted: function() {
    //     this.updateFilterData()
    // }
}
</script>
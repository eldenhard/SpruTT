<template>
    <div class="filterFarms">
        <div style="display:flex; flex-direction:column;">
            <label for="input_filter_staff">Номер договора</label>
            <input type="text" id="input-filter-staff1" class="input_filter_staff" placeholder="127/01/80ур"
                v-model="filter_farms.number" @change="updateFilterDataFarms" style="margin-top: -1px">
        </div>
        <!-- <div style="display:flex; flex-direction:column; margin-left: 15%;">
            <label for="input_filter_staff">Полное наименование</label>
            <input type="text" id="input-filter-staff1" class="input_filter_staff" placeholder="ООО СК ВТБ СТРАХОВАНИЕ"
                v-model="filter_farms.counterparty__full_name" @change="updateFilterDataFarms" style="margin-top: -1px">
        </div> -->
    </div>
</template>
    
    
<style>
.input_filter_staff {
    width: 100% !important;
    height: 30px;

}

.filterFarms {
    width: 100% !important;
    display: flex;
    justify-content: space-around;
    background: #e0e0e0;
    box-shadow: 20px 20px 60px #cecece,
                -20px -20px 60px #f2f2f2;
    position: relative !important;
    left: 50% !important;
    transform: translate(-50%, 0) !important;
    margin: 1% 0;
}
</style>
    
<script>
import { mapState } from 'vuex'
import api from '@/api/staff'
export default {
    name: 'FilterFarms',
    data() {
        return {
            filter_farms: {
                number: '',

            },
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            groupsFilterStaff: state => state.auth.groups
        }),
    },
    methods: {
        updateFilterDataFarms() {

            this.$emit('updateFilterDataFarms', this.filter_farms)
        }
    },
}
</script>
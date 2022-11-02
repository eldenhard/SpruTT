<template>
    <div class="filterContract">
        <div style="display:flex; flex-direction:column; margin-left: 15%;">
            <label for="input_filter_staff">Номер договора</label>
            <input type="text" id="input-filter-staff1" class="input_filter_staff" placeholder="127/01/80ур"
                v-model="filter_finance.number" @change="updateFilterDataFinance" style="margin-top: -1px">
        </div>

        <!-- <div style="display:flex; flex-direction:column; margin-left: 15%;">
            <label for="input_filter_staff">Полное наименование</label>
            <input type="text" id="input-filter-staff1" class="input_filter_staff" placeholder="ООО СК ВТБ СТРАХОВАНИЕ"
                v-model="filter_finance.counterparty__full_name" @change="updateFilterDataFinance"
                style="margin-top: -1px">
        </div> -->
    </div>
</template>
    
    
<style>
.input_filter_staff {
    width: 100% !important;
    height: 30px;

}

.filterContract {
    width: 100% !important;
    display: flex;
    justify-content: space-around;
    background: #e0e0e0;
    box-shadow: 20px 20px 60px #cecece,
        -20px -20px 60px #f2f2f2;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin: 1% 0;
}
</style>
    
<script>
import { mapState } from 'vuex'
import api from '@/api/staff'
export default {
    name: 'FilterFinance',
    data() {
        return {
            filter_finance: {
                number: '',
                counterparty__full_name: '',


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
        updateFilterDataFinance() {
            this.$emit('updateFilterDataFinance', this.filter_finance)
        }
    },
}
</script>
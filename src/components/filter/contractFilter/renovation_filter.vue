<template>
    <div class="filterContract">
        <div style="display:flex; flex-direction:column;">
            <div class='bg'>
                <input class='textarea' id='contract-provider' name='Pwd' v-model="filter_renovation.number"
                    @change="updateFilterDataRenovation" />
                <br>
                <label for='contract-provider' class='label'>Номер договора</label>
            </div>
            <!-- <label for="input_filter_staff">Номер договора</label>
            <input type="text" id="input-filter-staff1" class="input_filter_staff" placeholder="127/01/80ур"
                v-model="filter_renovation.number" @change="updateFilterDataRenovation" style="margin-top: -1px"> -->
        </div>
        <!-- <div style="display:flex; flex-direction:column; margin-left: 15%;">
            <label for="input_filter_staff">Полное наименование</label>
            <input type="text" id="input-filter-staff1" class="input_filter_staff" placeholder="ООО СК ВТБ СТРАХОВАНИЕ"
                v-model="filter_renovation.counterparty.full_name" @change="updateFilterDataRenovation"
                style="margin-top: -1px">
        </div> -->
    </div>
</template>
    
    

    
<script>
import { mapState } from 'vuex'
export default {
    name: 'FilterRenovation',
    data() {
        return {
            filter_renovation: {
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
        updateFilterDataRenovation() {

            this.$emit('updateFilterDataRenovation', this.filter_renovation)
        }
    },
}
</script>
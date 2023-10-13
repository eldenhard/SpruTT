<template>
    <div class="filterFarms">
        <div style="display:flex; flex-direction:column;">
            <div class='bg'>
                <input class='textarea' id='contract-farms' name='Pwd' v-model="filter_farms.search"
                    @change="updateFilterDataFarms" v-on:keyup.enter="LoadData()"/>
                <br>
                <label for='contract-farms' class='label'>Номер договора</label>
            </div>

        </div>

    </div>
</template>
    
    
<style>

.filterFarms {
    width: 100% !important;
    display: flex;
    justify-content: space-around;
    background: #EFEFEF;
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
    props: [ 'btnClickHadlerEnter' ],
    data() {
        return {
            filter_farms: {
                search: '',
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
        LoadData(){
            this.btnClickHadlerEnter()
        },  
        updateFilterDataFarms() {

            this.$emit('updateFilterDataFarms', this.filter_farms)
        }
    },
}
</script>
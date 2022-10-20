<template>
<div class="filterStaff">

<div>
    <label for="input-filter-staff1" >Данные сотрудника</label>
    <br>
    <input type="text" id="input-filter-staff1" style="width: 100% !important; margin-top: -20px;"  class="input_filter_staff" placeholder="введите данные сотрудника" v-model="filter_staff.search" @change="updateFilterDataStaff">
</div>
    <!-- 
    <input type="text" class="input_filter_staff" placeholder="введите фамилию сотрудника"  v-model="filter_staff.last_name" @change="updateFilterDataStaff">

    <input type="text" class="input_filter_staff" placeholder="введите почту сотрудника"  v-model="filter_staff.email" @change="updateFilterDataStaff"> -->

   
    <!-- <input type="text" class="input_filter_staff" placeholder="введите отдел сотрудника"  v-model="filter_staff.groups" @change="updateFilterDataStaff"> -->
<div style="width: 20%">
    <label for="select-filter-staff2">Выберите отдел</label>
    <br>
    <select class="input_filter_staff" id="select-filter-staff2" style="cursor: pointer; width: 100% !important;"
     v-model="filter_staff.groups"
    @change="updateFilterDataStaff" >
        <!-- <option  style="text-align: center">--Выберите отдел--</option> -->
        <option
        v-for="groupsFilter in groupsFilterStaff" :key="groupsFilter.id"  :value="groupsFilter.id" >
        {{groupsFilter.name}}
    </option>
    </select>
</div>
</div>
</template>


<style>
.input_filter_staff {
    width: 20% !important;
    height: 30px;
}
.filterStaff {
    width: 95% !important;
    display: flex;
    justify-content: space-around;
    /* border-radius: 50px; */
background: #e0e0e0;
box-shadow:  20px 20px 60px #cecece,
             -20px -20px 60px #f2f2f2;
             position: relative;
             left: 50%;
             transform: translate(-50%,0);
             margin: 1% 0;
}
</style>

<script>
import { mapState } from 'vuex'
import api from '@/api/staff'
export default {
    name: 'FilterStaff',
    data(){
        return {
            filter_staff : {
                search: '',
                groups: [],
                // first_name: '',
                // last_name: '',
                // email: '',
            },
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            groupsFilterStaff: state => state.auth.groups
        })
    },
    methods: {
        updateFilterDataStaff(){
            this.$emit('updateFiltersStaff', this.filter_staff)
        }
    },
}
</script>
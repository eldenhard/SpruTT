<template>
<div class="filterStaff">
<div style="display:flex; flex-direction:column; margin-left: 15%;">
    <label for="input_filter_staff">Данные сотрудника</label>
    <input type="text" id="input-filter-staff1"
      class="input_filter_staff"
      placeholder="введите данные сотрудника"
      v-model="filter_staff.search"
      @change="updateFilterDataStaff"
      style="margin-top: -1px"
      
    >
</div>
<div  style="display:flex; flex-direction:column">
    <label for="input_filter_staff2">Выберите отдел</label>
    <select class="input_filter_staff" id="select-filter-staff2" style="margin-top: -1px; width: 50% !important; cursor: pointer;"
     v-model="filter_staff.groups"
    @change="updateFilterDataStaff">
    <option value="">Все отделы</option>
        <option
        v-for="groupsFilter in groupsFilterStaff"
         :key="groupsFilter.id"
           :value="groupsFilter.id">
        {{groupsFilter.name}}
    </option>
    </select>
</div>
</div>
</template>


<style>
.input_filter_staff {
    width: 100% !important;
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
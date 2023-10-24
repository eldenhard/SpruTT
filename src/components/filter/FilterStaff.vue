<template>
    <div class="filterStaff">
        <div style="display:flex; flex-direction:column; ">
            <div class='bg'>
                <input class='textarea' id='input-filter-staff1' name='Pwd' v-model.trim="filter_staff.search" @change="updateFilterDataStaff" style="background: white;"/>
                <br>
                <label for='input-filter-staff1' class='label' style="background: white;">Данные сотрудника</label>
            </div>

        </div>
        <div style="display:flex; flex-direction:column">
            <div class='bg'>
                <select class='textarea' id='input-filter-staff2' name='Pwd' v-model="filter_staff.groups"
                    @change="updateFilterDataStaff" style="background: white;">
                    <option value="">Все отделы</option>
                    <option v-for="groupsFilter in groupsFilterStaff" :key="groupsFilter.id" :value="groupsFilter.id">
                        {{ groupsFilter.name }}
                    </option>
                </select>
                <br>
                <label for='input-filter-staff2' class='label ' style="background: white;">Выберите отдел</label>
            </div>

        </div>
        
    </div>
</template>


<style>
.input_filter_staff {
    width: 100% !important;
    height: 30px;
    background: transparent !important;
}

.filterStaff {
    width: 90% !important;
    display: flex;
    justify-content: space-around;
    /* border-radius: 50px; */
    background: #ffffff !important;
    box-shadow: 20px 20px 60px #ebebeb,
        -20px -20px 60px #f2f2f2;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin: 1% 0;
    border-radius: 10px;
}
</style>

<script>
import { mapState } from 'vuex'
import api from '@/api/staff'
export default {
    name: 'FilterStaff',
    data() {
        return {
            filter_staff: {
                search: '',
                groups: '',
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
        updateFilterDataStaff() {
            const filters = { ...this.filter_staff }
            if (filters.groups.length == 0) {
                delete (filters.groups)
            }
            this.$emit('updateFiltersStaff', filters)
        }
    },
}
</script>
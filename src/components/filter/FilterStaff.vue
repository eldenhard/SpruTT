<template>
    <div class="filterStaff">
        <div style="display:flex; flex-direction:column; ">
            <div class='bg'>
                <input class='textarea' id='input-filter-staff1' name='Pwd' v-model="filter_staff.search"
                    @change="updateFilterDataStaff" />
                <br>
                <label for='input-filter-staff1' class='label'>Данные сотрудника</label>
            </div>
            <!-- <label for="input_filter_staff">Данные сотрудника</label>
            <input type="text" id="input-filter-staff1" class="input_filter_staff"
                placeholder="введите данные сотрудника" v-model="filter_staff.search" @change="updateFilterDataStaff"
                style="margin-top: -1px"> -->
        </div>
        <div style="display:flex; flex-direction:column">
            <div class='bg'>
                <select class='textarea' id='input-filter-staff2' name='Pwd' v-model="filter_staff.groups"
                    @change="updateFilterDataStaff">
                    <option value="">Все отделы</option>
                    <option v-for="groupsFilter in groupsFilterStaff" :key="groupsFilter.id" :value="groupsFilter.id">
                        {{ groupsFilter.name }}
                    </option>
                </select>
                <br>
                <label for='input-filter-staff2' class='label'>Выберите отдел</label>
            </div>
            <!-- <label for="input_filter_staff2">Выберите отдел</label>
            <select class="input_filter_staff" id="select-filter-staff2"
                style="margin-top: -1px; width: 50% !important; cursor: pointer;" v-model="filter_staff.groups"
                @change="updateFilterDataStaff">
                <option value="">Все отделы</option>
                <option v-for="groupsFilter in groupsFilterStaff" :key="groupsFilter.id" :value="groupsFilter.id">
                    {{ groupsFilter.name }}
                </option>
            </select> -->
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
    width: 80% !important;
    display: flex;
    justify-content: space-around;
    /* border-radius: 50px; */
    background: #EFEFEF !important;
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
    name: 'FilterStaff',
    data() {
        return {
            filter_staff: {
                search: '',
                groups: '',
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
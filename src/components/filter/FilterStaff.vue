<template>
<div class="filterStaff">
    <input type="text" class="input_filter_staff" placeholder="введите имя сотрудника" v-model="filter_staff.first_name" @change="updateFilterDataStaff">

    <input type="text" class="input_filter_staff" placeholder="введите фамилию сотрудника"  v-model="filter_staff.last_name" @change="updateFilterDataStaff">

    <input type="text" class="input_filter_staff" placeholder="введите почту сотрудника"  v-model="filter_staff.email" @change="updateFilterDataStaff">

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
export default {
    name: 'FilterStaff',
    data(){
        return {
            filter_staff : {
                first_name: '',
                last_name: '',
                email: ''
            }
        }
    },
    methods: {
        updateFilterDataStaff(){
            this.$emit('updateFiltersStaff', this.filter_staff)
        },
    }
}
</script>
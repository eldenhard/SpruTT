<template>
    <div>
        <select name="" class="select-range" v-model="selectSearch" @change="selectCurrentRange">
            <option value="1" selected>день</option>
            <option value="30">месяц</option>
            <!-- <option value="90">квартал</option> -->
        </select>

    </div>
</template>

<script>
export default {
    name: 'selectRange',
    data() {
        return {
            selectSearch: 1,
        }
    },
    methods: {
        selectCurrentRange() {
            this.$emit('selectCurrentRange', this.selectSearch)
        }
    }
}

</script>

<style>
.select-range {
    border: 1px solid grey;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
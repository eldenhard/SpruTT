<template>
    <div>
        <div class="air_block">
            <div class="air_block_header">
                <h5>Оперативная справка</h5>
            </div>
            <hr />
            <br />
            <Periods @Action="Actioned" @data="getCurrentData">
                <label for="">
                    Тип вагона
                    <br />
                    <select name="" id="" v-model="wag_type" style="width: 100%">
                        <option value="Полувагон">Полувагон</option>
                        <option value="Цистерна">Цистерна</option>
                    </select>
                </label>
            </Periods>

        </div>

    </div>
</template>


<script>
import Periods from "../../ManagmentRepReporting/Periods.vue";
export default {
    components: { Periods },
    data() {
        return {
            wag_type: "Полувагон",
            date_begin: "",
            date_end: "",
        }
    }, methods: {
        getCurrentData(data) {
            this.date_begin = data.date_begin;
            this.date_end = data.date_end;
        },
        Actioned() {

        },
    }
}
</script>
<style scoped>
.air_block {
    width: 100%;
    height: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    position: relative;
    left: 50%;
    padding: 1%;
    transform: translate(-50%, 0);
}

select {
    width: 30%;
    margin-top: 2%;
}


.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}
</style>
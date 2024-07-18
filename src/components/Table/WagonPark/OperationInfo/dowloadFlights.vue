<template>
    <div class="dowload_flights">

        <label for="" style="width: 15vw;">Дата <br>
            <input type="month" v-model="date_begin" class="textarea" style="width: 100%;" />
        </label>
        <label for="" style="width: 15vw;">Тип вагона <br>
            <select class="textarea" style="width: 100%;" v-model="wagon_type">
                <option value="Цистерна">Цистерна</option>
                <option value="Полувагон">Полувагон</option>
            </select>
        </label>
        <button class="Accept" @click="downloadFlights()">Выгрузить</button>
    </div>
</template>


<script>
import api from '@/api/directory'
export default {
    data() {
        return {
            date_begin: "",
            wagon_type: "Цистерна"
        }
    },
    methods: {
        async downloadFlights() {
            this.$emit('stateLoader', true)
            let last_date = this.date_begin + '-'+ this.getLastDayOfMonth(this.date_begin.split('-')[0], Number(this.date_begin.split('-')[1])-1)
            try{
                let response = await api.getWagonFlights(this.wagon_type, last_date)
                this.$emit('stateLoader', false)

                this.$toast.success("Выгрузка прошла успешно", {
                    timeout: 3500
                })
            } catch(err){
                this.$emit('stateLoader', false)

                this.$toast.error(`Произошла ошибка\n${err}`, {
                    timeout: 3500
                })
            } finally{
                this.$emit('stateLoader', false)

            }
        },
        getLastDayOfMonth(year, month) {
            let date = new Date(year, month + 1, 0);
            return date.getDate();
        }
    }
}
</script>

<style scoped>
.dowload_flights {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

button {
    width: 15vw;
    height: 5vh
}
</style>
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

        <br>

        <button class="Accept" @click="downloadFinancialData()">Выгрузить</button>
    </div>
</template>


<script>
import api from '@/api/directory'
import { mapState } from "vuex";
import vSelect from "vue-select";

export default {
    components: { vSelect },
    data() {
        return {
            date_begin: "",
            wagon_type: "Цистерна",
            currentClients: "",
        }
    },
    computed: {
        ...mapState({
            name_client: (state) => state.client.name_client,

        }),
    },
    methods: {
        async downloadFinancialData() {
            if (!this.date_begin) {
                this.$toast.error("Выберите дату выгрузки", {
                    timeout: 4000
                })
                return
            }
            this.$emit('stateLoader', true)
            let last_date = this.date_begin + '-' + this.getLastDayOfMonth(this.date_begin.split('-')[0], Number(this.date_begin.split('-')[1]) - 1)
            try {
                
                // console.log(this.currentClients)
                let queryParams = `?wagon_type=${this.wagon_type}&report_date=${last_date}`;
                for(let i in this.name_client){
                    queryParams += `&clients=${this.name_client[i].client}`
                }
                console.log('queryParams', queryParams)
                await api.getAllFinanceData(queryParams)
                this.$emit('stateLoader', false)

                this.$toast.success("Выгрузка прошла успешно. Проверьте файл в папке", {
                    timeout: 4000
                })
            } catch (err) {
                this.$emit('stateLoader', false)

                this.$toast.error(`Произошла ошибка\n${err}`, {
                    timeout: 3500
                })
            } finally {
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
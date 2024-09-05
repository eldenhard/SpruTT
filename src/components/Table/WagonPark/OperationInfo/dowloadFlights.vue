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
        <label>Клиент <br>
            <v-select v-model="currentClients" :options="name_client" label="client"
                style="width:15vw !important;"></v-select>
        </label>
        <br>

        <button class="Accept" @click="downloadFlights()">Выгрузить</button>
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
        async downloadFlights() {
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
                let queryParams
                if (this.currentClients.client !== undefined) {
                    queryParams = `?wagon_type=${this.wagon_type}&report_date=${last_date}&clients=${this.currentClients.client}`;
                } else {
                    queryParams = `?wagon_type=${this.wagon_type}&report_date=${last_date}`;
                }
//                let error_client = [
//     {
//         "client": "АКЦИОНЕРНОЕ ОБЩЕСТВО \"ЯДРАН\""
//     },
//     {
//         "client": "АО \"УРАЛЬСКАЯ СТАЛЬ\""
//     },
//     {
//         "client": "Научно-внедренческая фирма \"Грифон\" ЗАО"
//     },
//     {
//         "client": "Общество с ограниченной ответственностью \"Дельта-Трейд\""
//     },
//     {
//         "client": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ПАРМА ПЕТРОЛИУМ ОПЕРЕЙШН КЛМ\""
//     },
//     {
//         "client": "Общество с ограниченной ответственностью \"ПромИнвест\""
//     },
//     {
//         "client": "ООО \"Альфа-транс\""
//     },
//     {
//         "client": "ООО \"БалтТрансСервис\""
//     },
//     {
//         "client": "ООО \"ЕТК\""
//     },
//     {
//         "client": "ООО \"ЗСТК\""
//     },
//     {
//         "client": "ООО \"Парма Петролиум Оперейшн КЛМ\""
//     },
//     {
//         "client": "ООО \"ПРОМЖДСЕРВИС\""
//     },
//     {
//         "client": "ООО \"Рэйл Оператор\""
//     },
//     {
//         "client": "ООО \"Санторини Виктори\""
//     },
//     {
//         "client": "ООО \"СГК\""
//     },
//     {
//         "client": "ООО \"СИБАНТРАЦИТ ЛОГИСТИКА\""
//     },
//     {
//         "client": "ООО \"СОКАР РУС\""
//     },
//     {
//         "client": "ООО \"Татнефть-Транс\""
//     },
//     {
//         "client": "ООО \"Томская Топливная Компания\""
//     },
//     {
//         "client": "ПАО \"Газпром Нефть\""
//     },
//     {
//         "client": "ТК \"Славия\""
//     },
//     {
//         "client": "ТОО \"CITITRANS\""
//     },
//     {
//         "client": "ТОО \"Авион Норд\""
//     },

// ]
//                 const errorClients = []; // Массив для хранения клиентов, запросы к которым завершились ошибкой
//                 for (let i in error_client) {
//                     try {
//                         let queryParams = `?wagon_type=${this.wagon_type}&report_date=${last_date}&clients=${error_client[i].client}`;
//                         console.log(queryParams);
//                         await api.getWagonFlights(queryParams);
//                     } catch (error) {
//                         // Если запрос завершился ошибкой, добавляем клиента в массив errorClients
//                         errorClients.push(error_client[i]);
//                     }
//                 }
//                 // После завершения всех запросов, отправляем запросы к клиентам, которые не завершились ошибкой    if (errorClients.length > 0) {
//                 console.log('Ошибки при отправке запросов к следующим клиентам:', errorClients);
            
                // if (window.Worker) {
                //     let my_worker = new Worker('./web_workers/web_worker.js'); // Убедитесь, что путь правильный и доступен
                //     my_worker.onmessage = event => {
                //         // обрабатываем сообщение здесь
                //         console.log(event.data)
                //     };
                //     my_worker.onerror = err => {
                //         console.error('Worker error:', err.message);
                //     };
                //     my_worker.postMessage("Привет от родительского процесса");
                // }

                let response = await api.getWagonFlights(queryParams)
                this.$emit('stateLoader', false)

            this.$toast.success("Выгрузка прошла успешно. Проверьте файл в папке SpruTT", {
                timeout: 4000
            })
        } catch(err) {
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
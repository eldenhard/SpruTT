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

        <button class="Accept" @click="downloadFlights()" style="width: 21%; height: 35px;">Выгрузить</button>

        <!-- <button class="extra_button button" @click="getAllCS()">Выгрузить всех клиентов </button> -->
        <div class="buttons">
            <button class="blob-btn" @click="getAllCS()">
                Выгрузить всех клиентов
                <span class="blob-btn__inner">
                    <span class="blob-btn__blobs">
                        <span class="blob-btn__blob"></span>
                        <span class="blob-btn__blob"></span>
                        <span class="blob-btn__blob"></span>
                        <span class="blob-btn__blob"></span>
                    </span>
                </span>
            </button>
            <br />

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                            result="goo"></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                </defs>
            </svg>
        </div>

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
        // async getAllCS() {
        //     try {
        //         if (!this.date_begin) {
        //             this.$toast.error("Выберите дату выгрузки", {
        //                 timeout: 4000
        //             })
        //             return
        //         }
        //         this.$emit('stateLoader', true)
        //         let last_date = this.date_begin + '-' + this.getLastDayOfMonth(this.date_begin.split('-')[0], Number(this.date_begin.split('-')[1]) - 1)

        //         const queryString = `?wagon_type=${this.wagon_type}&report_date=${last_date}`;
        //         let data
        //         await Promise.all([
        //             api.getDataForOperSpravka(queryString),
        //             api.getDataForOperSpravkaOtherClients(queryString),
        //         ]).then(([
        //             response1,
        //             response2,
        //         ]) => {

        //             data = [...response1.data.report, ...response2.data.report]
        //             console.log(data)
        //             let predata = data.filter(item => {
        //                 return (
        //                     Number(item.loading_amount) == 0 &&
        //                     Number(item.metric_current_plan) == 0 &&
        //                     Number(item.metric_current_fact) == 0 &&
        //                     Number(item.metric_complete_abs) == 0 &&
        //                     Number(item.metric_complete_rel) == 0 &&
        //                     Number(item.revenue_wo_nds) == 0 &&
        //                     Number(item.revenue_current_plan) == 0 &&
        //                     Number(item.revenue_current_fact) == 0 &&
        //                     Number(item.revenue_complete_abs) == 0 &&
        //                     Number(item.revenue_complete_rel) == 0
        //                 );
        //             });

        //             const resultArray = data
        //             .filter(item => !predata.some(x => x.client === item.client))
        //             .map(item => item.client)
        //             console.log(resultArray)
        //         })
        //         let promises = resultArray.map(client => api.getWagonFlights(`?wagon_type=${this.wagon_type}&report_date=${last_date}&clients=${client}`))
        //         await Promise.all(promises)
        //     } catch (err) {
        //         console.log(err)
        //     }
        //     finally {
        //         this.$emit('stateLoader', false)
        //     }
        // },
        async getAllCS() {
            if (!this.date_begin) {
                this.$toast.error("Выберите дату выгрузки", { timeout: 4000 });
                return;
            }

            this.$emit('stateLoader', true);

            try {
                const last_date = `${this.date_begin}-${this.getLastDayOfMonth(
                    this.date_begin.split('-')[0],
                    Number(this.date_begin.split('-')[1]) - 1
                )}`;

                const queryString = `?wagon_type=${this.wagon_type}&report_date=${last_date}`;

                const [response1, response2] = await Promise.all([
                    api.getDataForOperSpravka(queryString),
                    api.getDataForOperSpravkaOtherClients(queryString)
                ]);

                const data = [...response1.data.report, ...response2.data.report];

                const predata = data.filter(item =>
                    [
                        'loading_amount',
                        'metric_current_plan',
                        'metric_current_fact',
                        'metric_complete_abs',
                        'metric_complete_rel',
                        'revenue_wo_nds',
                        'revenue_current_plan',
                        'revenue_current_fact',
                        'revenue_complete_abs',
                        'revenue_complete_rel'
                    ].every(field => Number(item[field]) === 0)
                );

                const resultArray = data
                    .filter(item => !predata.some(pre => pre.client === item.client))
                    .map(item => item.client);

                for (const client of resultArray) {
                    try {
                        await api.getWagonFlights(
                            `?wagon_type=${this.wagon_type}&report_date=${last_date}&clients=${client}`
                        );
                        this.$toast.info(`Клиент: ${client} загружен`, { timeout: 3000 });
                    } catch (err) {
                        console.error(`Ошибка при загрузке данных для клиента: ${client}`, err);
                        this.$toast.error(`Ошибка при загрузке данных для клиента: ${client}`, { timeout: 3000 });
                    }
                }
                this.$toast.success("Выгрузка завершена", { timeout: 3000 });
            } catch (err) {
                console.error(err);
                this.$emit('stateLoader', false);
            } finally {
                this.$emit('stateLoader', false);
            }
        },

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

/* button {
    width: 15vw;
    height: 5vh
} */

.extra_button {
    background: black;
}

.buttons {
    margin-top: 50px;
    text-align: center;
    border-radius: 30px;
}

.blob-btn {
    z-index: 1;
    position: relative;
    padding: 20px 46px;
    text-align: center;
    text-transform: uppercase;
    color: #161616;
    font-size: 16px;
    font-weight: bold;
    background-color: transparent;
    outline: none;
    border: none;
    transition: color 0.5s;
    cursor: pointer;
    border-radius: 30px;
}

.blob-btn:before {
    content: "";
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #161616;
    border-radius: 30px;
}

.blob-btn:after {
    content: "";
    z-index: -2;
    position: absolute;
    left: 3px;
    top: 3px;
    width: 100%;
    height: 100%;
    transition: all 0.3s 0.2s;
    border-radius: 30px;
}

.blob-btn:hover {
    color: #FFFFFF;
    border-radius: 30px;
}

.blob-btn:hover:after {
    transition: all 0.3s;
    left: 0;
    top: 0;
    border-radius: 30px;
}

.blob-btn__inner {
    z-index: -1;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background: #ffffff;
}

.blob-btn__blobs {
    position: relative;
    display: block;
    height: 100%;
    filter: url("#goo");
}

.blob-btn__blob {
    position: absolute;
    top: 2px;
    width: 25%;
    height: 100%;
    background: #161616;
    border-radius: 100%;
    transform: translate3d(0, 150%, 0) scale(1.7);
    transition: transform 0.45s;
}

@supports (filter: url("#goo")) {
    .blob-btn__blob {
        transform: translate3d(0, 150%, 0) scale(1.4);
    }
}

.blob-btn__blob:nth-child(1) {
    left: 0%;
    transition-delay: 0s;
}

.blob-btn__blob:nth-child(2) {
    left: 30%;
    transition-delay: 0.08s;
}

.blob-btn__blob:nth-child(3) {
    left: 60%;
    transition-delay: 0.16s;
}

.blob-btn__blob:nth-child(4) {
    left: 90%;
    transition-delay: 0.24s;
}

.blob-btn:hover .blob-btn__blob {
    transform: translateZ(0) scale(1.7);
}

@supports (filter: url("#goo")) {
    .blob-btn:hover .blob-btn__blob {
        transform: translateZ(0) scale(1.4);
    }
}
</style>
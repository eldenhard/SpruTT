<template>
    <div>
        <div style="display: flex; flex-direction: column; width: 30%; margin-left: auto; gap: 2vw;">
            <button class="Request button special" @click="checkEnterData()">Проверка введенных данных</button>
            <button class="Accept special" @click="saveNewBusinessPlan()" :disabled="isFlagError">Сохранить
                данные</button>
        </div>
        <br>
        <table>
            <thead>
                <th>Клиент</th>
                <th>Груз</th>
                <th>Назначение</th>
                <th>Выручка</th>
                <th>{{ wagon_type === 'Цистерна'? 'Вес' : 'Погрузки' }}</th>
                <th>Тариф порож </th>
                <th>Тариф СТ</th>
                <th>Тариф груж</th>
                <th>Доп. услуги</th>
                <th>Прочие услуги</th>
                <th>МД (без штрафа)</th>
                <th>Вагоносутки (раб)</th>
                <th>Вагоносутки (общ) </th>
                <th>Доходность (без штрафа)</th>
                <th>Доходность (с штрафом)</th>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                        {{ cell }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import api from '@/api/directory'

export default {

    props: {
        createNewProfitability: {
            type: Object
        },
        clients: {
            type: Array
        },
        tableData: {
            type: Array
        },
        wagon_type: {
            type: String
        },
        date_begin: {
            type: String
        },
        typeData: {
            type: String
        },
    },
    data() {
        return {
            // проверка на прохождение проверки
            isFlagError: true,
            resultData: "",
        }
    },

    methods: {
        checkEnterData() {
            this.loader = true
            let keys = Object.keys(this.createNewProfitability)
            let result = []
            for (let i = 0; i < this.tableData.length; i++) {
                let obj = {}
                for (let j = 0; j < keys.length; j++) {
                    if (keys[j] == "client" || keys[j] == "product" || keys[j] == "destination") {
                        obj[keys[j]] = this.tableData[i][j]
                    } else {
                        obj[keys[j]] = Number(this.tableData[i][j].replace(',', '.')) || 0
                    }

                    obj["on_date"] = this.date_begin + "-01"
                    obj["wagon_type"] = this.wagon_type
                }
                result.push(obj)
            }
            let errorList = []
            for (let i of result) {
                if (!this.clients.find(item => item.client == i.client)) {
                    errorList.push(i.client)
                }
            }
            this.resultData = result
            console.log(result, '111111')
            if (errorList.length > 0) {

                this.$toast.error(`Ошибка\nНе найдены данные по клиентам!\n${errorList.join('\n')}`, {
                    timeout: 3000
                })
            } else {
                this.$toast.success(`Успешно\nДанные прошли проверку!\nРазрешено сохранение`, {
                    timeout: 3000
                })

                this.isFlagError = false
            }
        },
        async saveNewBusinessPlan() {
            this.isFlagError = true

            this.$emit('stateLoader', true)
            // this.loader = true
            let keys = Object.keys(this.createNewProfitability)
            let result = []
            for (let i = 0; i < this.resultData.length; i++) {
                let obj = {}
                for (let j = 0; j < keys.length; j++) {
                    if (obj[keys[j]] == 'client') continue
                    obj[keys[j]] = Number(this.resultData[i][j]) || 0
                    obj["on_date"] = this.date_begin + "-01"
                    obj["wagon_type"] = this.wagon_type
                }
                result.push(obj)
            }
            let promises
            if (this.typeData == 'plan') {
                if(this.wagon_type === 'Полувагон'){
                    this.resultData.forEach((item) => {
                        item['loadings_amount'] = item.volume
                        item['volume'] = 0
                    })
                }
                promises = this.resultData.map((item) => api.postNewBusinessPlan(item))
                Promise.all(promises)
                    .then((result) => {
                        this.$emit('stateLoader', false)
                        this.$toast.success(`Успешно\nДанные Бизнес-плана сохранены`, {
                            timeout: 3000
                        })
                        this.$emit('update:tableData', [])
                    }).catch((err) => {
                        this.$toast.error(`Ошибка\n${err.response}`, {
                            timeout: 4000
                        })
                        this.$emit('stateLoader', false)

                    })
            } else {
                try {
                    if(this.wagon_type === 'Полувагон'){
                    this.resultData.forEach((item) => {
                        item['loadings_amount'] = item.volume
                        item['volume'] = 0
                    })
                }
                    promises = this.resultData.map((item) => api.sendDataForNewBudjet(item))
                Promise.all(promises)
                    .then((result) => {
                        this.$emit('stateLoader', false)
                        this.$toast.success(`Успешно\nДанные Бюджета сохранены`, {
                            timeout: 3000
                        })
                        this.$emit('update:tableData', [])
                    }).catch((err) => {
                        this.$toast.error(`Ошибка\n${err.response}`, {
                            timeout: 4000
                        })
                        this.$emit('stateLoader', false)

                    })
                }


                    // let result = await api.sendDataForNewBudjet(this.resultData)
                //     this.$toast.success(`Успешно\nДанные Бизнес-плана сохранены`, {
                //         timeout: 3000
                //     })
                //     this.$emit('update:tableData', [])
                //     this.$emit('stateLoader', false)
                // }
                catch (error) {
                    this.$toast.error(`Ошибка\n${err.response}`, {
                        timeout: 4000
                    })
                    this.$emit('stateLoader', false)
                }

                // promises = this.resultData.map((item) => api.sendDataForOperSpravka(item))
            }




        },
    },
}
</script>

<style scoped>
.Accept.special {
    width: 100%;
    height: 40px;
    margin: 2% 0 0 auto;
}

.Request.special {
    width: 100%;
    height: 40px;
    margin: 2% 0 0 auto;
}

button:disabled {
    background: rgb(184, 184, 184);
    color: white
}
</style>
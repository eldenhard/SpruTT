<template>
    <div>
        <table>
            <thead>
                <th>Клиент</th>
                <th>Выручка</th>
                <th>Вес</th>
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

        <button class="Request button special" @click="checkEnterData()">Проверка введенных данных</button>
        <button class="Accept special" @click="saveNewBusinessPlan()" :disabled="isFlagError">Сохранить данные</button>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
    </div>
</template>

<script>
import Notifications from "@/components/notifications/Notifications.vue";
import api from '@/api/directory'

export default {
    components: {
        Notifications,
    },
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
        date_begin_create: {
            type: String
        }
    },
    data() {
        return {
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
             // проверка на прохождение проверки
             isFlagError: true,
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
                    if (keys[j] == "client") {
                        obj[keys[j]] = this.tableData[i][j]
                    } else {
                        obj[keys[j]] = Number(this.tableData[i][j].replace(',', '.')) || 0
                    }

                    obj["on_date"] = this.date_begin_create + "-01"
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
            console.log(result, errorList)
            let notification 
            if (errorList.length > 0) {
                notification = ["Ошибка", `Не найдены данные по клиентам: <br> ${errorList.join("<br>")}`, "wrapper-error"]
                this.$emit('showError', notification)

            } else {
                notification = ["Успешно", `Данные прошли проверку! <br> Разрешено сохранение`, "wrapper-success"]
                this.$emit('showError', notification)
                this.isFlagError = false
            }
        },
        saveNewBusinessPlan() {
            this.isFlagError = true

            this.$emit('stateLoader', true)
            // this.loader = true
            let keys = Object.keys(this.createNewProfitability)
            let result = []
            for (let i = 0; i < this.tableData.length; i++) {
                let obj = {}
                for (let j = 0; j < keys.length; j++) {
                    obj[keys[j]] = Number(this.tableData[i][j].replace(',', '.')) || 0
                    obj["on_date"] = this.date_begin_create + "-01"
                    obj["wagon_type"] = this.wagon_type
                }
                result.push(obj)
            }

            console.log(result)
            let promises = result.map((item) => api.postNewBusinessPlan(item))
           
            Promise.allSettled(promises)
                .then((result) => {
                    this.$emit('stateLoader', false)
                    let notification = ["Успешно", `Данные Бизнес-плана сохранены`, "wrapper-success"]
                    this.$emit('showError', notification)
                    this.$emit('update:tableData', [])
                }).catch((err) => {
                    let notification = ["Ошибка", `${err.response}`, "wrapper-error"]
                    this.$emit('showError', notification)
                    this.$emit('stateLoader', false)

                })

        },
    },
}
</script>

<style scoped>
.Accept.special {
    width: 20%;
    height: 40px;
    margin: 2% 0 0 auto;
}

.Request.special {
    width: 20%;
    height: 40px;
    margin: 4% 0 0 auto;
}
button:disabled{
    background: rgb(184, 184, 184);
    color: white
}
</style>
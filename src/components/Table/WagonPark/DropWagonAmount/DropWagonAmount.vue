<template>
    <div>
        <Loader :loader="loader" />
        <div class="air_block">

            <a class="WatchAllArenda">Данные по количеству брошенных вагонов</a>

            <div class="table-content">

                <label for="tenant">Дата начала
                    <br />
                    <input type="date" class="textarea mini" style="margin-top: 3%;" v-model="date_begin" />
                </label>

                <label for="tenant">Дата конца
                    <br />
                    <input type="date" class="textarea mini" style="margin-top: 3%;" v-model="date_end" />
                </label>


                <button class="button Accept mini" @click="GetFile()">Запросить</button>
            </div>

            <p class="explanation" style="padding-left: 1%; position: absolute; bottom: 0">
                * Файл придет вам на почту
            </p>
        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
    </div>
</template>

<script>
import api from '@/api/wagonPark'
import Loader from '@/components/loader/loader.vue';
import Notifications from "@/components/notifications/Notifications.vue";

export default {
    components: { Notifications , Loader },
    data() {
        return {
            loader: false,
            date_begin: "",
            date_end: "",
            // уведомление
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }
    },



    methods: {
        GetFile() {
            if (this.date_begin == "" || this.date_end == "") {
                this.showNotify = true;
                this.notifyHead = "Ошибка";
                this.notifyMessage = "Не выбран диапозон дат";
                this.notifyClass = "wrapper-error";
                this.loader = false;
                setTimeout(() => (this.showNotify = false), 2000);
                return
            }
            this.loader = true

            api.getDropsAmount(this.date_begin, this.date_end)
                .then(response => {
                    this.showNotify = true;
                    this.date_begin = ""
                    this.date_end = ""
                    this.notifyHead = "Успешно";
                    this.notifyMessage = "Файл будет отправлен на вашу почту";
                    this.notifyClass = "wrapper-success";
                    this.loader = false;
                    setTimeout(() => (this.showNotify = false), 2000);
                    this.loader = false
                }).catch(error => {
                    this.showNotify = true;
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = "Повторите попытку позже";
                    this.notifyClass = "wrapper-error";
                    this.loader = false;
                    setTimeout(() => (this.showNotify = false), 2000);
                    this.loader = false
                })
        },

    }
}
</script>

<style  scoped>
.watchInformation {
    margin-top: 2%;
    margin-left: 1%;
    margin-right: 1%;
}

.air_block {
    width: 65%;
    height: auto;
    min-height: 40vh;
    border-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
}

tr,
td,
th {
    border: 1px solid black;
}

.table-content {
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    gap: 5%;
    flex-wrap: wrap;
    border: 1px solid lightgrey;
    padding: 1%;
}

.table-content label {
    color: #929292;
}

.table-content button {
    height: 45px;
    width: 20%;
    margin-top: 3%;
    float: right !important;
    margin-left: auto;
}

.mini {
    height: 45px;
}

.WatchAllArenda {
    color: #929292;
    margin-top: 20%;
    padding: 1%;
    font-size: 25px;
    cursor: pointer;
    outline: none;
}

.WatchAllArenda:hover {
    outline: none;
    text-decoration: none;
}
</style>
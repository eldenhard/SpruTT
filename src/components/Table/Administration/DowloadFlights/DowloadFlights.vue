<template>
    <div>
        <Loader :loader="loader" />
        <div style="margin: 4% 0" class="air_block">
            <div class="container_grid">
                <div class="input_block">
                    <label for="wag_type_wag"><input type="checkbox" id="wag_type_wag"
                            v-model="wagon_types['Полувагон']">&nbsp;Полувагон</label>
                    <label for="wag_type_cis"><input type="checkbox" id="wag_type_cis"
                            v-model="wagon_types['Цистерна']">&nbsp;Цистерна </label>
                </div>
                <div class="wagonBelongs">
                    <label :for="belong[index]" v-for="belong, index in belongWagon" :key="index">
                        <input type="checkbox" v-model="belongs[index]" :id="belong[index]"> {{ TransLateBelong(belong) }}
                    </label>
                </div>
                <div class="data_block">
                    <br>
                    <div style="width: 100%; display: flex; justify-content: space-between; gap: 20px;">
                        <label for="" style="width: 100%">Дата начала
                            <br>
                            <input type="date" style="width: 100%" class="textarea" v-model="date_begin">
                        </label>
                        <label for="" style=" width: 100%">Дата конца
                            <br>
                            <input type="date" style=" width: 100%" class="textarea" v-model="date_end">
                        </label>
                    </div>

                    <br>
                    <button class="Accept" @click="sendRequest()">Загрузить</button>
                </div>
            </div>
        </div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

    </div>
</template>


<script>
import api from "@/api/wagonPark";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
export default {
    components: { Loader, Notifications },
    data() {
        return {
            wagon_types: {
                'Полувагон': false,
                'Цистерна': false
            },
            date_begin: "",
            date_end: "",
            belongs: [],
            belongWagon: ["А", "АА", "АЛ", "ЛА", "С", "СА", "СВ", "СЛ", "Ч"],
            loader: false,
            showNotify: false,
            notifyHead: "",
            notifyMessage: "",
            notifyClass: "",
        }
    },

    methods: {
        TransLateBelong(val) {
            switch (val) {
                case "А":
                    return "Арендованный";
                    break;
                case "АА":
                    return "Арендованный сдан в аренду";
                    break;
                case "АЛ":
                    return "Арендованный в лизинге";
                    break;
                case "С":
                    return "Собственный";
                    break;
                case "СЛ":
                    return "Собственный в лизинге";
                    break;
                case "СВ":
                    return "Взят в скрытую аренду";
                    break;
                case "Ч":
                    return "Чужой";
                    break;
                case "СА":
                    return "Собственный сдан в аренду";
                    break;

                case "ЛА":
                    return "Взят в лизинг сдан в аренду";
                    break;

            }
        },
        sendRequest() {

            const selectedWagonTypes = Object.keys(this.wagon_types).filter(type => this.wagon_types[type]);
            const selectedBelongs = this.belongWagon.filter((_, index) => this.belongs[index]);

            this.loader = true
            api.getFileFlights(this.date_begin, this.date_end, selectedWagonTypes, selectedBelongs)
                .then((response) => {
                    this.loader = false
                    this.notifyHead = "Успешно";
                    this.notifyMessage = `Данные будут загружены в папку ${response.data}`;
                    this.notifyClass = "wrapper-success";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 3500);
                }).catch((err) => {
                    this.loader = false
                    this.notifyHead = "Ошибка";
                    this.notifyMessage = `Данные не загружены. Повторите попытку`;
                    this.notifyClass = "wrapper-error";
                    this.showNotify = true;
                    setTimeout(() => {
                        this.showNotify = false;
                    }, 2000);
                })
        }
    }
}
</script>

<style scoped>
.container_grid {
    display: grid;
    grid-template-columns: 0.4fr 1.2fr 1fr
}

.data_block {
    padding: 2% 5%;

}

.input_block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid lightgrey;

}

.wagonBelongs {
    display: grid;
    border-right: 1px solid lightgrey;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    padding: 5% 0 0 5%;
}

.air_block {
    width: 80vw;
    height: max(50vh, auto);
    border-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
    position: relative;
    left: 50%;
    padding: 2%;
    transform: translate(-50%, 0);
}
</style>
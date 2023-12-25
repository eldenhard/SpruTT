<template>
    <div>
        <div class="air_block">
            <div class="air_block_header">
                <h5>Загрузка актов</h5>
            </div>
            <hr />
            <br />
            <div class="first_level">
                <label for="">Договор <br>
                    <div class="inputcontainer">
                        <input type="text" class="inp_select mini">
                    </div>
                </label>
                <label for="">&nbsp;Продавец <br>
                    <div class="inputcontainer">
                        <input class="inp_select mini" v-model="seller" @input="getCounterparty($event, 'seller')"
                            style="background: white;" placeholder="Введите продавца" data-type="seller" />
                        <div class="icon-container" v-if="loaderInputSeller">
                            <i class="loader"></i>
                        </div>
                    </div>
                </label>
                <label for="">&nbsp;Покупатель <br>
                    <div class="inputcontainer">
                        <input class="inp_select mini" v-model="buyer" @input="getCounterparty($event, 'buyer')"
                            style="background: white;" placeholder="Введите покупателя" data-type="buyer" />
                        <div class="icon-container" v-if="loaderInputBuyer">
                            <i class="loader"></i>
                        </div>
                    </div>
                </label>
                <label for="">Тип акта <br>
                    <select type="text" class="inp_select mini">
                        <option value="Транспортный">Транспортный</option>
                        <option value="Аренда">Аренда</option>
                    </select>
                </label>
            </div>
            <div class="answer_block" v-if="responseCounterparty">
                <ul>
                    <li v-for="(counterparty, index) in responseCounterparty" :key="index"
                        @click="checkValue(counterparty.work_name)">{{ counterparty.work_name }}</li>
                </ul>
            </div>
            <div class="second_level">
                <LoadingActTableVue />
            </div>
        </div>
    </div>
</template>
  
<script>
import InputLoader from '../../../ui/InputLoader.vue'
import LoadingActTableVue from './components/LoadingActTable.vue'
import api from "@/api/directory";

export default {
    components: {
        LoadingActTableVue,
        InputLoader,
    },
    data() {
        return {
            seller: "",
            buyer: "",
            responseCounterparty: null,
            loaderInputSeller: false,
            loaderInputBuyer: false,
            currentInput: null, // Изменено
        }
    },
    mounted() {
        document.body.addEventListener('click', this.disabledShowResponseServer)
    },
    methods: {
        disabledShowResponseServer() {
            this.responseCounterparty = false
        },
        getCounterparty(event, inputType) {
            clearInterval(this.responseCounterparty)
            this.currentInput = event.target.getAttribute('data-type');
            this.responseCounterparty = setTimeout(() => {
                this.requestCounterparty(event, inputType)
            }, 600)
        },
        requestCounterparty(event, inputType) {
            if (inputType === 'seller') {
                this.loaderInputSeller = true;
            } else if (inputType === 'buyer') {
                this.loaderInputBuyer = true;
            }
            let filter = { 'search': event.target.value }
            api.getAllcounterparties(filter)
                .then(response => {
                    this.responseCounterparty = response.data.data
                    if (inputType === 'seller') {
                        this.loaderInputSeller = false;
                    } else if (inputType === 'buyer') {
                        this.loaderInputBuyer = false;
                    }
                }).catch((err) => {
                    console.error(err)
                })
        },
        checkValue(val) {
            return this.currentInput === 'seller' ? this.seller = val : this.buyer = val
        },
    },
}
</script>

<style scoped>
label{
    color: grey;
}
.air_block {
    width: 100%;
    height: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #ffffff;
    box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #e4e4e4;
    position: relative;
    left: 50%;
    padding: 1%;
    transform: translate(-50%, 0);
    box-sizing: border-box;
}

.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}

.inp_select {
    border: none !important;
    width: 100%;
    background: rgb(233, 233, 233) !important;
    border-radius: 5px;
    padding: 10px;
}

.inp_select:focus,
.inputcontainer:focus {
    border: none !important;
}

.first_level {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.answer_block {
    width: 100%;
    background: lightgray;
}

.second_level {
    margin-top: 4%;
    width: 100%;
}

.inputcontainer {
    position: relative;
    border: none !important;
    background: rgb(233, 233, 233);
    width: 100%;
    border-radius: 5px;
}

.mini {
    height: 40px;
}

.icon-container {
    position: absolute;
    right: 10px;
    top: calc(50% - 10px);
}

.loader {
    position: relative;
    height: 20px;
    width: 20px;
    display: inline-block;
    animation: around 5.4s infinite;
}

@keyframes around {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loader::after,
.loader::before {
    content: "";
    background: rgb(233, 233, 233) !important;
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-width: 2px;
    border-color: #333 #333 transparent transparent;
    border-style: solid;
    border-radius: 20px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    animation: around 0.7s ease-in-out infinite;
}

.loader::after {
    animation: around 0.7s ease-in-out 0.1s infinite;
    background: transparent;
}

.successStatus {
    background: rgba(42, 190, 67, 0.4);
    color: black;
}

.errorStatus {
    background: lightcoral;
    color: black;
}

ul {
    margin: 0;
    padding: 0;
}

li {
    width: 100%;
    list-style-type: none;
    padding-left: 5%;
}

li:hover {
    background: rgb(182, 182, 214);
}
</style>
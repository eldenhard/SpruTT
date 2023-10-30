<template>
    <div>

        <div class="filterFarms">
            <div style="display:flex; flex-direction:column;">
                <label for="" v-show="visible_start">Выберите тип фильтра <br>
                    <select v-model="start_filter">
                        <option :value="'№ Договора'">№ Договора</option>
                        <option :value="'Контрагент'">Контрагент</option>
                        <option :value="'Подразделение'">Подразделение</option>
                        <option :value="'Ответственный'">Ответственный</option>
                    </select>
                </label>

                <div class="filter_group">
                    <template v-for="(inp) in all_type_filter">
                        <label :key="inp.id"> <span class="label_delete" @click="deleteThisElement(inp, $event)">{{ inp }}
                            </span>
                            <br>
                            <div class="inp_block">
                                <div class="inputcontainer">
                                    <input class="changeRow textarea" v-model="const_of_filters[inp]"
                                        @input="debouncedSendRequest(const_of_filters[inp], inp)"
                                        @change="updateFilterDataFarms"
                                        @focus="saveVUEX(inp)"
                                        style="width: 100%; border-bottom: 1px solid rgb(0, 0, 0); padding: 5px;"
                                        type="text" />
                                    <div class="icon-container">
                                        <i class="loader" v-if="loaderInputDepStates[inp]"></i>
                                    </div>
                                </div>
                                <div class="dataDeparture" v-if="warning">
                                    <ul>
                                        <li v-for="val in response_data" :key="val.id" @click="checkThisValue(val)">
                                            {{ val }}
                                        </li>
                                    </ul>
                                </div>

                                <b-dropdown id="dropdown-dropright" dropright variant="primary"
                                    :disabled="isDropdownDisabled" @click="selectItem(index)">
                                    <template v-for="item, index in type_of_filters">
                                        <b-dropdown-item href="#" :key="item.id" @click="AddCell(index)">
                                            {{ index }}
                                        </b-dropdown-item>
                                    </template>
                                </b-dropdown>
                            </div>
                        </label>
                    </template>
                </div>

            </div>

        </div>
        <div class="answer" style="background: rgb(223, 222, 222);" v-show="answer_block">
            <ul>
                <li v-for="item in list_data" :key="item.id" @click="checkThisData(item)">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex'
import api from '@/api/directory'
import debounce from "lodash.debounce";

export default {
    name: 'FilterFarms',
    props: ['btnClickHadlerEnter'],
    data() {
        return {
            isDropdownDisabled: true,
            FLAG_CHECK: false,
            loaderInputDepStates: {
                '№ Договора': false,
                'Контрагент': false,
                'Подразделение': false,
                'Ответственный': false,
            },
            const_of_filters: {
                '№ Договора': '',
                'Контрагент': '',
                'Подразделение': '',
                'Ответственный': '',
            },
            type_of_filters: {
                '№ Договора': 'number',
                'Контрагент': 'counterparty',
                // 'Подразделение': 'department',
                // 'Ответственный': 'responsible',
            },
            number: "",
            counterparty: "",
            department: "",
            responsible: "",
            loaderInputDep: false,
            warning: false,

            NoData: true,
            activeFilters: {},
            start_filter: "",
            visible_start: true,
            filter_type: [],
            all_type_filter: [],
            response_data: [],
            filter_farms: {
                counterparty: '',
                number: "",
                responsible: '',
                department: "",
            },
            inputModels: {}, // Объект для хранения моделей для каждого inp
            debounceTimer: null,
            list_data: [],
            answer_block: false,
        }
    },
    mounted() {
        // document.body.addEventListener('click', this.answer_block = false)

    },
    watch: {
        FLAG_CHECK() {
            if (this.FLAG_CHECK == true) {
                this.isDropdownDisabled = false
            } else {
                this.isDropdownDisabled = true
            }
        },
        start_filter() {

            if (this.start_filter != "") {
                for (let i in this.type_of_filters) {
                    if (i == this.start_filter) {
                        delete this.type_of_filters[i]
                    }
                }
                this.all_type_filter.push(this.start_filter)
                this.$store.commit('setMycurrent_input', this.start_filter)

                this.visible_start = false
            }
        },
        all_type_filter() {
            if (this.all_type_filter.length == 0) {
                this.start_filter = ""
                this.visible_start = true
            }
        },
    },

    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            groupsFilterStaff: state => state.auth.groups
        }),
    },

    methods: {
        saveVUEX(val){
            this.$store.commit('setMycurrent_input', val)
        },
        selectItem(index) {
            if (this.FLAG_CHECK == true) {
                this.isDropdownDisabled = true
            } else {
                this.isDropdownDisabled = false
            }
        },
        checkThisData(val) {
            let type = this.$store.state.client.current_input
            this.answer_block = true
            this.const_of_filters[type] = val
            let typeDog = {
                '№ Договора': 'number',
                'Контрагент': 'counterparty',
                'Подразделение': 'department',
                'Ответственный': 'responsible',
            }
            let main = typeDog[type]

            this.filter_farms[main] = val
            this.FLAG_CHECK = true
            this.answer_block = false
            // console.log( this.type_of_filters['Контрагент'])
        },

        // Обработчик ввода данных
        debouncedSendRequest(val, name_inp) {
            if (val.length < 1) {
                console.log(val.length, val)
                this.answer_block = false
                return
            }
            // Если таймер уже установлен, отменить его
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }

            // Установить новый таймер на 500 миллисекунд
            this.debounceTimer = setTimeout(() => {
                // Вызвать функцию sendRequest после задержки
                this.sendRequest(val, name_inp);
            }, 500);
        },
        sendRequest(data, name_inp) {
            if (name_inp == '№ Договора') {
                this.loaderInputDepStates[name_inp] = true
                let filter_farms = {
                counterparty: this.filter_farms.counterparty,
                number: this.filter_farms.number,
                responsible: this.filter_farms.responsible,
                department: this.filter_farms.department,
            }
                // console.log("Отправка запроса на сервер с данными:", list, occurence, data,);
                api.getDirectoryFarm('economic',  this.filter_farms)
                    .then(response => {
                        this.loaderInputDepStates[name_inp] = false
                        let data = response?.data?.data
                        this.list_data = data.reduce((acc, item) => {
                            if (acc.includes(item.number)) {
                                return acc
                            } else {
                                return [...acc, item.number]
                            }
                        }, [])
                        this.answer_block = true
                        return
                    }).catch((err) => {
                        this.loaderInputDepStates[name_inp] = false
                        console.log(err)
                        return
                    })
                    return
            }
            if (data.length <= 1) {
                return
            }
            let list
            let occurence
            switch (name_inp) {
                case 'Контрагент':
                    list = 'cp-list'
                    occurence = 'counterparty_like'
                    break;
                case 'Подразделение':
                    list = 'dep-list'
                    occurence = 'department_like'
                    break;
                case 'Ответственный':
                    list = 'resp-list'
                    occurence = 'responsible_like'
                    break;
            }
            this.loaderInputDepStates[name_inp] = true
            // console.log("Отправка запроса на сервер с данными:", list, occurence, data,);
            api.getIncompleteOccurrence('economic', occurence, data)
                .then(response => {
                    this.loaderInputDepStates[name_inp] = false
                    this.list_data
                    let data = response.data.data
                    this.list_data = data.reduce((acc, item) => {
                        if (acc.includes(item.counterparty)) {
                            return acc
                        } else {
                            return [...acc, item.counterparty]
                        }
                    }, [])
                    this.answer_block = true
                }).catch((err) => {
                    this.loaderInputDepStates[name_inp] = false

                    console.log(err)
                })
        },

        getData() {
            console.log(this.const_of_filters['№ Договора'])
        },
        checkThisValue(val) {
            console.log(val)
        },
        deleteThisElement(inp, event) {
            this.FLAG_CHECK = true
            this.const_of_filters[inp] = ""

            let type = {
                '№ Договора': 'number',
                'Контрагент': 'counterparty',
                'Подразделение': 'department',
                'Ответственный': 'responsible',
            }
            this.filter_farms[type[inp]] = ""
            let index_elem = this.all_type_filter.indexOf(inp);
            if (index_elem !== -1) {
                this.all_type_filter.splice(index_elem, 1);
                this.type_of_filters[`${inp}`] = type[`${inp}`]
                console.log(this.type_of_filters)
                // Удаляем модель, связанную с удаляемым inp
                delete this.inputModels[inp];
            } else {
                console.log('Элемент не найден');
            }
        },
        AddCell(inx) {
            console.log(this.$store.state.client)
            this.$store.commit('setMycurrent_input', inx)
            // this.$store.client.commit('setMycurrent_input', inx)
            this.FLAG_CHECK = false
            for (let i in this.type_of_filters) {
                if (i == inx) {
                    delete this.type_of_filters[i]
                }
            }
            this.all_type_filter.push(inx)
            // Создаем новую модель и связываем её с добавляемым inp
            this.$set(this.inputModels, inx, '');
        },
        LoadData() {
            this.btnClickHadlerEnter()
        },
        updateFilterDataFarms() {
            this.$emit('updateFilterDataFarms', this.filter_farms)
        },

    },
}
</script>
  
    
<style scoped>
.inputcontainer {
    position: relative;

}

.dataDeparture {
    width: 100%;
    overflow: auto;
    border: 1px solid grey;

    background: rgb(245, 245, 245);

}

.changeRow {
    width: 100%;
    /* border: none; */
    /* outline: none; */
    background: white;
}

.icon-container {
    position: absolute;
    right: 15px;
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
    background: white;
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-width: 2px;
    border-color: #646464 #646464 transparent transparent;
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

.label_delete:hover {
    color: lightcoral;
}

.filter_group {
    display: flex;
    justify-content: center;
}

.filterFarms {
    width: 100% !important;
    display: flex;
    justify-content: center;
    background: #EFEFEF;
    box-shadow: 20px 20px 60px #cecece,
        -20px -20px 60px #f2f2f2;
    position: relative !important;
    left: 50% !important;
    transform: translate(-50%, 0) !important;
    margin: 1% 0;
}

.inp_block {
    display: flex;
    justify-content: center;
    margin-right: 6%;
}

.textarea {
    border: 1px solid grey;
    background: white;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    width: 80%;
}
</style>
    

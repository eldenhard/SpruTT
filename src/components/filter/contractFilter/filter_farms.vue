<template>
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
                <template v-for="inp, index in all_type_filter">
                    <label :key="inp.id"> <span class="label_delete" @click="deleteThisElement(inp)">{{ inp }} </span> <br>
                        <div class="inp_block">
                            <div class="inputcontainer">
                                <input class="changeRow textarea" v-model="const_of_filters[inp]"
                                @input="getData()"
                                    style="width: 100%; border-bottom: 1px solid rgb(0, 0, 0); padding: 5px;" type="text" />
                                <div class="icon-container" v-if="loaderInputDep">
                                    <i class="loader"></i>
                                </div>
                            </div>
                            <div class="dataDeparture" v-if="warning">
                                <ul>
                                    <li v-for="val in response_data" :key="val.id" @click="checkThisValue(val)">
                                        {{ val }}
                                    </li>
                                </ul>
                            </div>
                            <b-dropdown id="dropdown-dropright" dropright variant="primary">
                                <template v-for="item, index in type_of_filters">
                                    <b-dropdown-item href="#" :key="item.id" @click="AddCell(index)">{{ index }}</b-dropdown-item>
                                </template>
                            </b-dropdown>
                        </div>
                    </label>
                </template>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex'
import api from '@/api/staff'
import debounce from "lodash.debounce";

export default {
    name: 'FilterFarms',
    props: ['btnClickHadlerEnter'],
    data() {
        return {
            const_of_filters: {
                '№ Договора': '',
                'Контрагент': '',
                'Подразделение': '',
                'Ответственный': '',
            },
            type_of_filters: {
                '№ Договора': 'number',
                'Контрагент': 'counterparty',
                'Подразделение': 'department',
                'Ответственный': 'responsible',
            },
            number: "",
            counterparty: "",
            department: "",
            responsible: "",
            loaderInputDep: true,
            warning: false,

            NoData: true,
            activeFilters: {},
            start_filter: "",
            visible_start: true,
            filter_type: [],
            all_type_filter: [],
            response_data: [],
            filter_farms: {
                search: '',
            },
            inputModels: {}, // Объект для хранения моделей для каждого inp
        }
    },

    watch: {

        start_filter() {
            if (this.start_filter != "") {
                for (let i in this.type_of_filters) {
                    if (i == this.start_filter) {
                        delete this.type_of_filters[i]
                    }
                }
                this.all_type_filter.push(this.start_filter)
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
        getData(){
            console.log(this.const_of_filters['№ Договора'])
        },
        checkThisValue(val) {
            console.log(val)
        },
        deleteThisElement(inp) {
            let type = {
                '№ Договора': 'number',
                'Контрагент': 'counterparty',
                'Подразделение': 'department',
                'Ответственный': 'responsible',
            }
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
    

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
                <template v-for="inp in all_type_filter">
                    <label :key="inp.id"> <span class="label_delete" @click="deleteThisElement(inp)">{{ inp }}</span> <br>
                        <div class="inp_block">
                            <input type="text" class="textarea">
                            <b-dropdown id="dropdown-dropright" dropright variant="primary">
                                <template v-for="item, index in type_of_filters">
                                    <b-dropdown-item href="#" :key="item.id" @click="AddCell(index)">{{ index
                                    }}</b-dropdown-item>
                                </template>
                            </b-dropdown>
                        </div>
                    </label>
                </template>
            </div>
            <!-- <input class='textarea' id='contract-farms' name='Pwd' v-model="filter_farms.search"
                    @change="updateFilterDataFarms" v-on:keyup.enter="LoadData()"/>
                <br>
                <label for='contract-farms' class='label'>Номер договора</label> -->


        </div>

    </div>
</template>
    
    
<style scoped>
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
}

.textarea {
    border: 1px solid grey;
    background: white;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    width: 80%;
}
</style>
    
<script>
import { mapState } from 'vuex'
import api from '@/api/staff'
export default {
    name: 'FilterFarms',
    props: ['btnClickHadlerEnter'],
    data() {
        return {
            type_of_filters: {
                '№ Договора': 'number',
                'Контрагент': 'counterparty',
                'Подразделение': 'department',
                'Ответственный': 'responsible',
            },
            NoData: true,
            activeFilters: {},
            start_filter: "",
            visible_start: true,
            filter_type: [],
            all_type_filter: [],
            filter_farms: {
                search: '',
            },
        }
    },
    watch: {
        start_filter() {
            if (this.start_filter != "") {
                for (let i in this.type_of_filters) {
                    if (i == this.start_filter) {
                        console.log(this.type_of_filters[i])
                        delete this.type_of_filters[i]
                        this.start_filter = ""
                    }
                }
                this.all_type_filter.push(this.start_filter)
                this.visible_start = false
            }
        },
        all_type_filter() {
            // console.log(this.all_type_filter)
            if(this.all_type_filter.length == 0){
                this.visible_start = true
            }
            
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            groupsFilterStaff: state => state.auth.groups
        }),
    },
    methods: {
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
        },
        LoadData() {
            this.btnClickHadlerEnter()
        },
        updateFilterDataFarms() {

            this.$emit('updateFilterDataFarms', this.filter_farms)
        }
    },
}
</script>
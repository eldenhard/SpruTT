<template>
    <div>
        <!-- {{wagonsType}} -->
        <!-- <Loader :loader="loader"></Loader> -->
        <div class="FilterReportAbandon">

            <div style="display:flex; flex-direction:column; margin-bottom: 1%; ">
                <div class='bg'>
                    <select class='textarea' id='input_filter_wagon_dislocation' name='Pwd'
                        v-model="filter.wagon__wagon_type" @change="updateSelectedWagonType" style="cursor: pointer;">
                        <option value="">Все вагоны</option>
                        <option v-for="wagonDisl in wagonsType" :key="wagonDisl" :value="wagonDisl">
                            {{ wagonDisl }}
                        </option>
                    </select>
                    <br>
                    <label for='input_filter_wagon_dislocation' class='label'>Тип вагона</label>
                </div>
                <!-- <label for="input_FilterReportAbandon" style="cursor: pointer">Вагон</label>
                <multi-select-uni @change="updateSelectedWagonType" :placeholder="'Выберите...'"
                    :variants="wagontypeObj" :variant-title="'value'" style="width: 170px !important; ">
                </multi-select-uni> -->

            </div>
            <div style="display:flex; flex-direction:column;">
                <div class='bg'>
                    <!-- <label for="input_FilterReportAbandon" style="cursor: pointer">Полигон</label> -->
                    <multi-select-uni @change="updateSelectedPoligons" :placeholder="'Полигон'" :variants="poligonsObj"
                        :variant-title="'value'" style="width: 170px !important; cursor: pointer;">
                    </multi-select-uni>
                </div>

            </div>
            <div style="display:flex; flex-direction:column;">
                <div class='bg'>
                    <!-- <label for="input_FilterReportAbandon" style="cursor: pointer">Контрагент</label> -->
                    <multi-select-uni @change="updateSelectedCounterparties" :placeholder="'Контрагент'"
                        :variants="counterparties" :variant-title="'work_name'"
                        style="width: 170px !important;cursor: pointer;">
                    </multi-select-uni>
                </div>
            </div>

            <div style="display:flex; flex-direction:column;">
                <div class='bg'>
                    <input class='textarea' id='input-filter1' name='Pwd' type="date"
                        v-model="filter.current_station_arrival_begin" style="width: 125px; cursor: pointer; margin-top: 9%;" />
                </div>
            </div>
            <div style="display:flex; flex-direction:column;">
                <div class='bg'>


                    <input class='textarea' id='input-filter2' name='Pwd' type="date"
                        v-model="filter.current_station_arrival_end" style="width: 125px;cursor: pointer;margin-top: 9%;" />
                </div>
            </div>

        </div>

        <div class="option_select_block">
            <div class="row">
                <!-- <template v-if="selectedWagonType">
                    <span class="option_select_block_check" v-for="p in selectedWagonType" :key="p.id"
                        @click="removeSelectedWagonType(p.id)">
                        <span style="color: black; font-size: 15px;"> &#43;</span>
                        {{ p.value }}
                    </span>
                </template> -->


                <template v-if="selectedPoligons">
                    <span class="option_select_block_check" v-for="p in selectedPoligons" :key="p.id"
                        @click="removeSelectedPoligons(p.id)">
                        <span style="color: black; font-size: 15px;"> &#43;</span>
                        {{ p.value }}
                    </span>
                </template>

                <template v-if="selectedParties">
                    <span class="option_select_block_check" v-for="p in selectedParties" :key="p.id"
                        @click="removeSelectedParty(p.id)">
                        <span style="color: black"> &#43;</span>
                        {{ p.work_name }}
                    </span>
                </template>

            </div>






        </div>
    </div>
</template>
    
    
<style>
.input_FilterReportAbandon {
    width: 100% !important;
    height: 30px;

}

.FilterReportAbandon {
    width: 100% !important;
    display: flex;
    justify-content: space-around;
    /* border-radius: 50px; */
    background: #EFEFEF;
    box-shadow: 20px 20px 30px #cecece,
        -20px -20px 30px #f2f2f2;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin: 1% 0;
}

.option_select_block {
    margin-top: 3%;
    width: 100%;


}

.option_select_block_check {
    background: #bddbee;
    color: rgb(27, 27, 27);
    font-weight: 500;
    padding: 3px 4px;
    border-radius: 4px;
    margin: 0.5%;
    cursor: pointer;


}

.option_select_block_check:hover {
    background: #ec6f6f;
    color: white;


}

.placeholder {
    font-size: 200;
}
</style>
    
<script>
import { mapState } from 'vuex'
import api from '@/api/wagonPark'
import MultiSelectUni from '../ui/MultiSelectUni.vue'
// import Loader from '../loader/loader.vue'
export default {
    components: { MultiSelectUni },
    name: 'FilterReportAbandon',
    data() {
        return {
            filter: {
                polygon__in: '',
                // operation: 'БРОС',
                wagon_belong_owner__in: '',
                wagon__wagon_type: '',
                current_station_arrival_begin: '',
                current_station_arrival_end: '',
            },
            poligons: [],
            wagonsType: [],

            // selectedWagonTypeIds: [],
            selectedPolingonIds: [],
            selectedPartyIds: [],
            loader: false
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            groupsFilterStaff: state => state.auth.groups,
            counterparties: state => state.counterparties.counterparties
        }),
        selectedParties() {
            return this.counterparties.filter(el => this.selectedPartyIds.includes(el.id))
        },




        poligonsObj() { //1
            const result = []
            this.poligons.forEach((el, idx) => {
                el && result.push({ id: idx, value: el })
            })
            return result
        },
        selectedPoligons() { //2
            return this.poligonsObj.filter(el => this.selectedPolingonIds.includes(el.id))
        },




        // wagontypeObj() {
        //     const result = []
        //     this.wagonsType.forEach((el, idx) => {
        //         el && result.push({ id: idx, value: el.name })
        //     })
        //     return result

        // },
        // selectedWagonType() {
        //     return this.wagontypeObj.filter(el => this.selectedWagonTypeIds.includes(el.id))
        // }

    },
    methods: {
        updateFilterDataReportAbandon() {

        },
        getWagonType() {
            api.getWagonType().then(response => {
                this.wagonsType = response.data.wagon_types


            })
        },
        updateSelectedWagonType(selected) {
            this.selectedWagonTypeIds = selected
            this.sendEmit()

        },
        removeSelectedWagonType(id) {
            this.selectedWagonTypeIds.splice(this.selectedWagonTypeIds.indexOf(id), 1)
            this.sendEmit()
        },





        getPoligons() {
            api.getFilters().then(response => {
                this.poligons = response.data.polygons
            })
        },
        updateSelectedPoligons(selected) {
            this.selectedPolingonIds = selected
            this.sendEmit()

        },
        removeSelectedPoligons(id) {
            this.selectedPolingonIds.splice(this.selectedPolingonIds.indexOf(id), 1)
            this.sendEmit()
        },




        updateSelectedCounterparties(selected) {
            this.selectedPartyIds = selected
            this.sendEmit()
        },

        removeSelectedParty(id) {
            this.selectedPartyIds.splice(this.selectedPartyIds.indexOf(id), 1)
            this.sendEmit()
        },


        sendEmit() {
            const arr = []

            this.selectedPoligons.forEach(el => {
                arr.push(el.value)
            })
            this.filter.polygon__in = arr.join()



            const arr2 = []

            this.selectedParties.forEach(el => {
                arr2.push(el.work_name) //то что положили в фильтр
            })

            this.filter.wagon_belong_owner__in = arr2.join(';')

            // const arr3 = []
            // this.selectedWagonType.forEach(el => {
            //     arr3.push(el.value)
            // })

            // this.filter.wagon__wagon_type = arr3.join('')


            this.$emit('update-filter', this.filter)
        },

    },
    mounted() {
        this.loader = true
        this.getPoligons()
        this.getWagonType()
        this.loader = false
    }
}
</script>


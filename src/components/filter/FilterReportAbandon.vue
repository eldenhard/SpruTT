<template>
    <div>
        <div class="FilterReportAbandon">
            <!-- <div style="display:flex; flex-direction:column;">
                <label for="input_FilterReportAbandon">Тип вагона</label>
                <input type="text" id="input-FilterReportAbandon" class="input_FilterReportAbandon"
                    placeholder="введите тип вагона" v-model="filter_FilterReportAbandon.search"
                    @change="updateFilterDataReportAbandon" style="margin-top: -1px">
            </div> -->
            <div style="display:flex; flex-direction:column;">
                <label for="input_FilterReportAbandon">Полигон</label>
                <multi-select-uni @change="updateSelectedPoligons" :placeholder="'Выберите полигон'" :variants="poligonsObj" :variant-title="'value'">
                </multi-select-uni>
                <!-- <input type="text" id="input-FilterReportAbandon" class="input_FilterReportAbandon"
                    placeholder="введите полигон" v-model="filter_FilterReportAbandon.search"
                    @change="updateFilterDataReportAbandon" style="margin-top: -1px"> -->
            </div>
            <div style="display:flex; flex-direction:column;">
                <label for="input_FilterReportAbandon">Контрагент</label>
                <multi-select-uni @change="updateSelectedCounterparties" :placeholder="'выберите контрагента'" :variants="counterparties" :variant-title="'work_name'"></multi-select-uni>
            </div>


        </div>
        <div class="option_select_block">
            <template v-if="selectedPoligons">
                <span class="option_select_block_check" v-for="p in selectedPoligons" :key="p.id" @click="removeSelectedPoligons(p.id)">
                    <span style="color: black">&#10003;</span>
                    {{p.value}}
                </span>
            </template>
            <template v-if="selectedParties">
                <span class="option_select_block_check" v-for="p in selectedParties" :key="p.id" @click="removeSelectedParty(p.id)">
                    <span style="color: black">&#10003;</span>
                    {{p.work_name}}
                </span>
            </template>

          
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
    background: #e0e0e0;
    box-shadow: 20px 20px 30px #cecece,
        -20px -20px 30px #f2f2f2;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin: 1% 0;
}

.option_select_block {
    margin-top: 3%;

}

.option_select_block_check {
    background: #6b8798;
    color: white;
    font-weight: 400;
    padding: 3px 4px;
    border-radius: 4px;
    margin-right: 0.3%;
}
</style>
    
<script>
import { mapState } from 'vuex'
import api from '@/api/wagonPark'
import MultiSelectUni from '../ui/MultiSelectUni.vue'
export default {
    components: { MultiSelectUni },
    name: 'FilterReportAbandon',
    data() {
        return {
            filter: {
                polygon__in: '',
                operation: 'БРОС',
                wagon_belong_owner__in: ''
            },
            poligons: [],
            selectedPolingonIds: [],
            selectedPartyIds: []
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            groupsFilterStaff: state => state.auth.groups,
            counterparties: state => state.counterparties.counterparties
        }),
        poligonsObj() {
            const result = []
            this.poligons.forEach((el, idx) => {
                el && result.push({ id: idx, value: el })
            })
            return result
        },
        selectedPoligons(){
            return this.poligonsObj.filter(el => this.selectedPolingonIds.includes(el.id))
        },
        selectedParties(){
            return this.counterparties.filter(el=> this.selectedPartyIds.includes(el.id))
        }

    },
    methods: {
        updateFilterDataReportAbandon() {
           
        },
        getPoligons() {
            api.getFilters().then(response => {
                this.poligons = response.data.polygons
            })
        },
        updateSelectedPoligons(selected){
            this.selectedPolingonIds = selected
            this.sendEmit()
            
        },
        updateSelectedCounterparties(selected){
            this.selectedPartyIds = selected
            this.sendEmit()
        },
        removeSelectedPoligons(id){
            this.selectedPolingonIds.splice(this.selectedPolingonIds.indexOf(id), 1)
            this.sendEmit()
        },
        removeSelectedParty(id){
            this.selectedPartyIds.splice(this.selectedPartyIds.indexOf(id), 1)
            this.sendEmit()
        },
        sendEmit(){
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

            this.$emit('update-filter', this.filter)
        },
        
    },
    mounted() {
        this.getPoligons()
    }
}
</script>


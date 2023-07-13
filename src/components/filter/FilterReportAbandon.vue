<template>
  <div>
    <!-- {{wagonsType}} -->
    <!-- <Loader :loader="loader"></Loader> -->
    <div class="FilterReportAbandon">
      <div style="display: flex; flex-direction: column; margin-bottom: 1%">
        <div class="bg">
          <select
            class="textarea"
            id="input_filter_wagon_dislocation"
            name="Pwd"
            v-model="filter.wagon__wagon_type"
            @change="updateSelectedWagonType"
            style="cursor: pointer; background-color: white;">
            <!-- <option value="">Все вагоны</option> -->
            <option
              v-for="wagonDisl in wagonsType"
              :key="wagonDisl.id"
              :value="wagonDisl"
            >
              {{ wagonDisl.name }}
            </option>
          </select>
          <br />
          <label for="input_filter_wagon_dislocation" class="label"
          style="cursor: pointer; background-color: white;">Тип вагона</label
          >
        </div>
        <!-- <label for="input_FilterReportAbandon" style="cursor: pointer">Вагон</label>
                <multi-select-uni @change="updateSelectedWagonType" :placeholder="'Выберите...'"
                    :variants="wagontypeObj" :variant-title="'value'" style="width: 170px !important; ">
                </multi-select-uni> -->
      </div>
      <div style="display: flex; flex-direction: column">
        <div class="bg" style="background-color: white;">
          <!-- <label for="input_FilterReportAbandon" style="cursor: pointer">Полигон</label> -->
          <multi-select-uni
            @change="updateSelectedPoligons"
            :placeholder="'Полигон'"
            :variants="poligonsObj"
            :variant-title="'value'"
            style="width: 170px !important; cursor: pointer; background-color: white;"
          >
          </multi-select-uni>
        </div>
      </div>
      <div style="display: flex; flex-direction: column">
        <div class="bg" style="background-color: white;">
          <!-- <label for="input_FilterReportAbandon" style="cursor: pointer">Контрагент</label> -->
          <multi-select-search
            @change="updateSelectedCounterparties"
            :placeholder="'Контрагент'"
            :variants="counterparties"
            :variant-title="'work_name'"
            style="width: 170px !important; cursor: pointer; background-color: white;"
          >
          </multi-select-search>
        </div>
      </div>

      <div style="display: flex; flex-direction: column">
        <div class="bg" style="background-color: white;">
          <input
            class="textarea"
            type="datetime-local"
            step="1"
            v-model="filter.last_operation_datetime_begin"
            @change="updateSelected_arrival_begin"
            style="width: 125px; cursor: pointer; margin-top: 9%; background-color: white;"
          />
        </div>
      </div>

      <div style="display: flex; flex-direction: column">
        <div class="bg" style="background-color: white;">
          <input
            class="textarea"
            type="datetime-local"
            step="1"
            v-model="filter.last_operation_datetime_end"
            @change="updateSelectedWagonType_arrival_end"
            style="width: 125px; cursor: pointer; margin-top: 9%; background-color: white;"
          />
        </div>
      </div>
    </div>

    <div class="option_select_block">
      <div style="display: flex; justify-content: start; flex-wrap: wrap;">
        <template v-if="selectedPoligons">
          <span
            class="option_select_block_check"
            v-for="p in selectedPoligons"
            :key="p.id"
            @click="removeSelectedPoligons(p.id)"
          >
            <span style="color: black; font-size: 15px"> &#43;</span>
            {{ p.value }}
          </span>
        </template>

        <template v-if="selectedParties">
          <span
            class="option_select_block_check"
            v-for="p in selectedParties"
            :key="p.id"
            @click="removeSelectedParty(p.id)"
          >
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
  background: #ffffff;
  box-shadow: 10px 10px 30px #d0d0d0, -10px -10px 30px #ffffff; 
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
import MultiSelectSearch from '../ui/MultiSelectSearch.vue'
// import Loader from '../loader/loader.vue'
export default {
    components: { MultiSelectUni, MultiSelectSearch },
    name: 'FilterReportAbandon',
    data() {
        return {
            filter: {
                polygon__in: '',
                wagon_belong_manager__in: '',
                wagon__wagon_type: '',
                last_operation_datetime_begin: '',
                last_operation_datetime_end: '',
            },
            poligons: [],
            wagonsType: [],

            selectedWagonTypeIds: [],
            selectedPolingonIds: [],
            selectedArrival: '',
            selectedEnd: '',
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
        // Выбрать конкретного конратгента
        selectedParties() {
            return this.counterparties.filter(el => this.selectedPartyIds.includes(el.id))
        },
        // Собрать все полигоны в 1 список
        poligonsObj() { //1
            const result = []
            this.poligons.forEach((el, idx) => {
                el && result.push({ id: idx, value: el.name })
            })
            console.log(result)
            return result
        },
        // Получить необходимый полигон
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
        getPoligons() {
            api.getFilters()
            .then(response => {
                this.poligons = response.data
            })
        },
        getWagonType() {
            api.getWagonType().then(response => {
                this.wagonsType = response.data.data
                this.sendEmit()
            })
        },
        updateSelectedWagonType(selected) {
            this.selectedWagonTypeIds = selected
            this.sendEmit()

        },
        updateSelected_arrival_begin(selected){
            this.selectedArrival = selected
            this.sendEmit()
        },
        updateSelectedWagonType_arrival_end(selected){
            this.selectedEnd= selected
            this.sendEmit()
        },
        // removeSelectedWagonType(id) {
        //     this.selectedWagonTypeIds.splice(this.selectedWagonTypeIds.indexOf(id), 1)
        //     this.sendEmit()
        // },

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

            this.filter.wagon_belong_manager__in = arr2.join(';')
            const arr3 = []
            // this.selectedWagonType.forEach(el => {
            //     arr3.push(el.value)
            // })
            // this.filter.wagon_type = arr3.join('')

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


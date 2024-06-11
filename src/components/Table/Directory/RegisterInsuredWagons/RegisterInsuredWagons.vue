<template>
    <div>
        <Loader :loader="loader" />
        <div class="air_block">
            <div class="air_block_header">
                <h4>Реестр застрахованных вагонов</h4>
            </div>
            <hr>
            <br>
            <div>
                <PregisterIsuredwagonsSearch @getInsuredWagons="getInsuredWagons" />
                <PregisterInsuredWagonsAddColumnVue @add_column_el="addNewObjectInColumns" v-show="getInsuredWagonsData.length > 0"/>
                <br>
                <hot-table ref="hotTableComponent" :data="getInsuredWagonsData" :rowHeaders="true"  :columns="columns"
                    :preventOverflow="'horizontal'" :filters="true"  :language="'ru-RU'"
                    :manualColumnResize="true" :autoWrapRow="true" :autoWrapCol="true" :height="'60vh'"  :width="'100%'" :fillHandle="false"
                    :dropdownMenu="true"
                    v-show="getInsuredWagonsData.length > 0"
                    >
                </hot-table>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import PregisterIsuredwagonsSearch from "./components/PregisterIsuredwagonsSearch.vue";
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, getLanguagesDictionaries, ruRU } from 'handsontable/i18n';
registerLanguageDictionary(ruRU);
registerAllModules();
import 'handsontable/dist/handsontable.full.css';
import PregisterInsuredWagonsAddColumnVue from './components/PregisterInsuredWagonsAddColumn.vue';
export default {
    components: {
        Loader,
        PregisterIsuredwagonsSearch,
        PregisterInsuredWagonsAddColumnVue,
        HotTable,
    },
    data() {
        return {
            loader: false,
            columns: [
                { title: 'Номер вагона', data: 'wagon_number' },
                { title: 'Тип вагона', data: 'wagon_type' },
                { title: 'Собст. на момент страхования', data: 'owner_at_insurance_moment' },
                { title: 'Страховая компания', data: 'insurance_company', },
                { title: '№ договора', data: 'agr_number', type: 'numeric' },
                { title: 'Дата договора', data: 'agr_date', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
            ], 
            getInsuredWagonsData: [],
        }
    },
    mounted(){
        document.querySelector('.hot-display-license-info').style = 'display: none !important';
    },
    methods: {
        addNewObjectInColumns(data){
            this.$nextTick(() => {
                const hotInstance = this.$refs.hotTableComponent.hotInstance;
                this.columns = [
                    { title: 'Номер вагона', data: 'wagon_number' },
                    { title: 'Тип вагона', data: 'wagon_type' },
                    { title: 'Собст. на момент страхования', data: 'owner_at_insurance_moment' },
                    { title: 'Страховая компания', data: 'insurance_company', },
                    { title: '№ договора', data: 'agr_number', type: 'numeric' },
                    { title: 'Дата договора', data: 'agr_date', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
                    ...data
                ];
                hotInstance.updateSettings({ columns: this.columns });
                hotInstance.render();
            })
        },
        getInsuredWagons(data) {
            this.getInsuredWagonsData = data.data
            this.$nextTick(() => {
                const hotInstance = this.$refs.hotTableComponent.hotInstance
                hotInstance.loadData(this.getInsuredWagonsData)
                hotInstance.render()
            })
            console.log(this.getInsuredWagonsData)
        },
    },
}
</script>

<style scoped>

.air_block {
  width: 100%;
  height: auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  padding: 1%;
  transform: translate(-50%, 0);
}

.air_block_header {
  padding: 1% 0 0 2%;
  color: #cacaca;
}

</style>
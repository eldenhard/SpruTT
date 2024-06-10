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
                <br>
                <hot-table ref="hotTableComponent" :data="getInsuredWagonsData" :rowHeaders="true"  :columns="columns"
                    :preventOverflow="'horizontal'" :filters="true"  :language="'ru-RU'"
                    :manualColumnResize="true" :autoWrapRow="true" :autoWrapCol="true" :height="'60vh'"  :width="'100%'" :fillHandle="false"
                    :dropdownMenu="true"
                    >
                </hot-table>
                <!-- :dropdownMenu="true" -->

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
export default {
    components: {
        Loader,
        PregisterIsuredwagonsSearch,
        HotTable,
    },
// "54258546"
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

                { title: 'Уведомлено', data: 'is_notified' },
                { title: 'Модель вагона', data: 'wagon_model' },
                { title: 'Дата постройки', data: 'build_date' },
                { title: 'Срок службы', data: 'lifetime' },
                { title: 'Поставщик', data: 'provider' },
                { title: '№ Договора поставки', data: 'delivery_agr_number' },
                { title: 'Дата разделки', data: 'cutting_date' },
                { title: 'Примечание', data: 'note1' },
                { title: 'На балансе', data: 'on_balance' },
                { title: 'Собственник', data: 'owner' },
                { title: 'Собственник (ЭТРАН)', data: 'owner_etran' },
                { title: 'Группа', data: 'group' },
                { title: ' Дата прекращения действия договора страхования', data: 'agr_date_end' },
                { title: 'Страховая сумма, руб', data: 'insurance_sum' },
                { title: 'Франшиза', data: 'franchise' },
                { title: 'Примечание', data: 'note2' },
                { title: 'Финансисты', data: 'pr_33_finansists' },
                { title: 'В управлении компании', data: 'in_company_management' },
                { title: 'Арендатор', data: 'tenant' },
                { title: 'Арендатор (ЭТРАН)', data: 'tenant_etran' },
                { title: 'Дата изменения состояния', data: 'state_change_date' },
                { title: 'Дата последней операции', data: 'last_operation_date' },
                { title: '(Пр1)примечание по парку', data: '(Пр1)примечание по парку' },
                { title: '(Пр7)примечание по парку 2', data: '(Пр7)примечание по парку 2' },
                { title: '(Пр2)примечание диспетчера', data: 'pr2_note_dispatcher' },
            ], 
            // colHeaders: ["Номер вагона", "Тип вагона", "Собст. на момент страхования", "Страховая компания", "№ договора",
            //     "Дата договора"],
            getInsuredWagonsData: [],
        }
    },
    mounted(){
    document.querySelector('.hot-display-license-info').style = 'display: none !important';
    },
    methods: {
        getInsuredWagons(data) {
            
            this.getInsuredWagonsData = data.data.data
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
.hot-display-license-info,.hot-display-license-info,.hot-display-license-info{
    display: none !important;
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
</style>

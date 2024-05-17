<template>

    <hot-table :data="ppsData" :rowHeaders="true" :colHeaders="colHeaders" :columns="columns"
        :preventOverflow="'horizontal'" :filters="true" :dropdownMenu="true" :language="'ru-RU'"
        :manualColumnResize="true" :autoWrapRow="true" :autoWrapCol="true" :height="'400px'"  :width="'95%'">
    </hot-table>

</template>

<script>
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, getLanguagesDictionaries, ruRU } from 'handsontable/i18n';
registerLanguageDictionary(ruRU);
registerAllModules();
import 'handsontable/dist/handsontable.full.css';
export default {
    components: {
        HotTable
    },
    props: {
        ppsData: {
            type: Array
        }
    },
    data() {
        return {
            columns: [
                { data: 'wagon', title: 'Вагон' },
                { data: 'date_pp_in', title: 'Дата передачи на подъез. путь', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
                { data: 'date_work', title: 'Дата проведения работ', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
                { data: 'date_pp_out', title: 'Дата вывода с подъез. пути', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
                { data: 'days', title: 'Расчетное время в сутках', type: 'numeric' },
                { data: 'operation', title: 'Операция' },
                { data: 'station_name', title: 'Станция' },
                { data: 'price_wo_nds', title: 'Цена без НДС', type: 'numeric', numericFormat: { pattern: '0,0.00' } },
                { data: 'currency', title: 'Валюта' },
                { data: 'counterparty', title: 'Контрагент' },
                { data: 'agent_reward', title: 'Агентское вознаграждение', type: 'numeric', numericFormat: { pattern: '0,0.00' } },
                { data: 'application_number', title: '№ акта' },
                { data: 'act_date', title: 'Дата акта', type: 'date', dateFormat: 'YYYY-MM-DD', correctFormat: true },
                { data: 'fact_wagon_compensation', title: 'Факт по вагонам к возмещению', type: 'numeric', numericFormat: { pattern: '0,0.00' } }
            ],
            dataForHotTable: [],
            colHeaders: ["Вагон", "Дата передачи на подъез. путь", "Дата проведения работ", "Дата вывода с подъез. пути", "Расчетное время в сутках",
                "Операция", "Станция", "Цена без НДС", "Валюта", "Контрагент", "Агентское вознаграждение", "№ акта", "Дата акта", "Факт по вагонам к возмещению"
            ],

        }
    },
    watch: {
        ppsData() {
            console.log(this.ppsData)
        }
    }
}
</script>
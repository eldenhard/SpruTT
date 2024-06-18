<template>
    <div>

        <br>
        <h4 v-show="getOwnWagonsCompareData.length > 0"> Собственные вагоны</h4>
        <hot-table ref="hotTableComponent2" :data="getOwnWagonsCompareData" :rowHeaders="true" :columns="columns"
            :preventOverflow="'horizontal'" :filters="true" :language="'ru-RU'" :manualColumnResize="true"
            :autoWrapRow="true" :autoWrapCol="true" :height="'60vh'" :width="'100%'" :fillHandle="false"
            :dropdownMenu="true" v-show="getOwnWagonsCompareData.length > 0">
        </hot-table>
    </div>
</template>

<script>
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, getLanguagesDictionaries, ruRU } from 'handsontable/i18n';
registerLanguageDictionary(ruRU);
registerAllModules();
import 'handsontable/dist/handsontable.full.css';

export default {
    props: ['getOwnWagonsCompareData', 'columns'],
    components: {
        HotTable,
    },
    watch: {
        getOwnWagonsCompareData: {
            handler(newData) {
                this.updateTableData(newData);
            },
            deep: true,
        },
    },
    mounted() {
        this.updateTableData(this.getOwnWagonsCompareData);
        document.querySelector('.hot-display-license-info').style = 'display: none !important';

    },
    methods: {
        updateTableData(newData) {
            this.$nextTick(() => {
                const hotInstance = this.$refs.hotTableComponent2.hotInstance;
                hotInstance.loadData(newData)
                hotInstance.updateSettings({ data: newData })
                hotInstance.render()
            })
        },
    },
}
</script>

<style scoped>
.hot-display-license-info{
    display: none !important;
}
</style>
<template>
    <div>
        <hr>
        <div style="display: flex; vertical-align: middle; align-items: center;">
            <b-spinner :variant="'secondary'" style="width: 2rem; height: 2rem;" v-show="is_mini_loader"></b-spinner>
            <h4 v-show="getOwnWagonsCompareData.length > 0" class="air_block_header">Перечень незастрахованных вагонов
            </h4>

        </div>
        <div class="tables-container">

            <div class="table-container">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="is_show">
                    <label class="form-check-label " for="flexCheckDefault">
                        Показать вагоны с примечанием
                    </label>
                </div>
                <span class="description-text">Для сохранения примечания нажмите ENTER</span>
                <hot-table ref="hotTableComponent1" :data="checkApplication" :rowHeaders="true" :columns="columns"
                    :manualRowMove="true" :manualColumnMove="true" :preventOverflow="'horizontal'" :filters="true"
                    :language="'ru-RU'" :manualColumnResize="true" :height="'40vh'" :width="'100%'" :fillHandle="false"
                    :dropdownMenu="dropdownMenuOptions" @afterSelection="handleSelection">
                </hot-table>
            </div>
            <div class="table-container">
                <br>
                <span class="description-text">Скопируйте данные из левой таблицы и вставьте данные в эту таблицу</span>
                <hot-table ref="hotTableComponent2" :data="insuredWagonsData" :rowHeaders="true"
                    :columns="columns_table_copy" :manualRowMove="true" :manualColumnMove="true"
                    :preventOverflow="'horizontal'" :filters="true" :language="'ru-RU'" :manualColumnResize="true"
                    :height="'40vh'" :width="'100%'" :fillHandle="true" :dropdownMenu="dropdownMenuOptions"
                    @afterPaste="handlePaste" :contextMenu="contextMenuOptions">
                </hot-table>
            </div>
        </div>
        <br>
        <button class="Request button" style="width: 30%; margin-left: auto;" @click="getInfoByWagons()">Подгрузить
            данные</button>
        <br>
        <button class="Accept button" style="width: 30%; margin-left: auto;" @click="saveData()">Сохранить
            данные</button>
    </div>
</template>
<script>


import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, getLanguagesDictionaries, ruRU } from 'handsontable/i18n';
import api from "@/api/directory";
import api_wagon from "@/api/wagonPark";
registerLanguageDictionary(ruRU);
registerAllModules();
import 'handsontable/dist/handsontable.full.css';

export default {
    components: {
        HotTable,
    },
    props: ['getOwnWagonsCompareData', 'columns', 'columns_table_copy', 'dropdownMenuOptions', 'is_mini_loader'],
    data() {
        return {
            sortWagons: [],
            insuredWagonsData: [
                { title: 'Номер вагона', data: 'wagon_number' },
            ],

            contextMenuOptions: {
                items: {
                    'remove_row': {
                        name: 'Удалить строку'
                    }
                }
            },
            selectedWagons: [],
            status: false,
            is_show: false

        };

    },
    computed: {
        checkApplication() {
            if (this.is_show) {
                // Показывать только те данные, у которых есть примечание
                return this.getOwnWagonsCompareData.filter(item => item['Примечание'] !== null && item['Примечание'] !== '');
            } else if (!this.is_show) {
                console.log('HERE', this.getOwnWagonsCompareData.filter(item => item['Примечание'] === null || item['Примечание'] === ''))
                // Показывать все данные, кроме тех, у которых есть примечание
                return this.getOwnWagonsCompareData.filter(item => item['Примечание'] === null || item['Примечание'] === '');
            }
        }
    },
    watch: {
        is_show() {
            // Перезагружаем таблицу при изменении чекбокса
            this.$refs.hotTableComponent1.hotInstance.loadData(this.checkApplication);
        },
        getOwnWagonsCompareData: {
            async handler(newData) {
                this.updateTableData('hotTableComponent1', this.checkApplication);
                document.querySelectorAll('.hot-display-license-info').forEach(element => {
                    element.style.display = 'none';
                });
                // Обновляем таблицу, если исходные данные изменились
                this.$refs.hotTableComponent1.hotInstance.loadData(this.checkApplication);
                this.saveEditCellsInRow(newData)
            },
            deep: true,
        },

        insuredWagonsData: {
            handler(newData) {
                this.updateTableData('hotTableComponent2', newData);
                document.querySelectorAll('.hot-display-license-info').forEach(element => {
                    element.style.display = 'none';
                });
                console.log('newData', newData)

            },
            deep: true,
        },
    },
    created() {
        document.querySelectorAll('.hot-display-license-info').forEach(element => {
            element.style.display = 'none';
        });


    },
    mounted() {
        this.updateTableData('hotTableComponent1', this.checkApplication);
        this.updateTableData('hotTableComponent2', this.insuredWagonsData);
        document.querySelectorAll('.hot-display-license-info').forEach(element => {
            element.style.display = 'none';
        });

    },

    methods: {
        async saveEditCellsInRow(val) {
            let check_data = val.filter(item => item['Примечание'] != null)
            if (Array.isArray(check_data) && check_data.length > 0) {
                this.$emit('startStopLoader', true)
                try {
                    let promises = val
                        .filter(item => item['Примечание'] != null)
                        .map(el => api_wagon.postInsuranceNote(el['Номер вагона'], { insurance_comment: el['Примечание'] }));

                    await Promise.all(promises)
                    this.checkApplication
                    this.$emit('startStopLoader', false)
                    this.$toast.success(`Данные по вагону сохранены`, {
                        timeout: 3000
                    })
                } catch (err) {
                    console.log(err)
                    this.$emit('startStopLoader', false)
                    this.$toast.error(`Данные не сохранены\n${err}`, {
                        timeout: 3000
                    })
                }
            } else {
                return
            }
        },
        translateWagonType(type) {
            switch (type) {
                case 'Полувагон':
                    return 'ПВ'
                    break;
                case 'Цистерна':
                    return 'ЦС'

            }
        },
        async getInfoByWagons(data) {
            this.$emit('startStopLoader', true)
            try {
                console.log('insuredWagonsData', this.insuredWagonsData)
                let promises = this.insuredWagonsData.map((item) => {
                    return api_wagon.getWagon(item['wagon_number'])
                })
                let res = await Promise.all(promises)

                for (let i in this.insuredWagonsData) {
                    if (this.insuredWagonsData[i]['Номер вагона'] === res[i].data.wagon_number) {
                        this.insuredWagonsData[i].wagon_type = this.translateWagonType(res[i].data.wagon_type)
                        this.insuredWagonsData[i].owner_at_insurance_moment = res[i].data.last_owner
                    }
                }
                this.updateTableData('hotTableComponent2', this.insuredWagonsData);
                // await api_wagon.getWagon(data)
                this.$emit('startStopLoader', false)

            }
            catch (err) {
                console.log(err)
                this.$emit('startStopLoader', false)
            }
            finally {
                this.$emit('startStopLoader', false)

            }
        },
        async saveData() {
            this.$emit('startStopLoader', true)
            try {
                await api.sendNewDataInsuranceWagons(this.insuredWagonsData)

                this.$emit('startStopLoader', false)
                this.$toast.success('Данные сохранены\nДля отображения данных в таблице "Застрахованные вагоны", запросите данные повторно', {
                    timeout: 7000
                })
                this.insuredWagonsData = [{ title: 'Номер вагона', data: 'wagon_number' }]

            } catch (err) {
                console.log(err)
                this.$emit('startStopLoader', false)
                this.$toast.error('Данные не сохранены', {
                    timeout: 3000
                })
            }
        },
        updateTableData(componentRef, newData) {
            this.$nextTick(() => {
                document.querySelectorAll('.hot-display-license-info').forEach(element => {
                    element.style.display = 'none';
                });

                const hotInstance = this.$refs[componentRef]?.hotInstance;
                if (hotInstance) {
                    hotInstance.loadData(newData);
                    hotInstance.updateSettings({ data: newData });
                    hotInstance.render();
                    document.querySelectorAll('.hot-display-license-info').forEach(element => {
                        element.style.display = 'none';
                    });

                }
            });
        },
        handleSelection(row, column, row2, column2) {
            alert('123')
            const hotInstance = this.$refs.hotTableComponent1.hotInstance;
            const selected = [];
            for (let r = row; r <= row2; r++) {
                for (let c = column; c <= column2; c++) {
                    selected.push(hotInstance.getDataAtCell(r, c));
                }
            }
            this.selectedWagons = selected;
        },

        handlePaste(changes) {
            const hotInstance2 = this.$refs.hotTableComponent2.hotInstance;
            changes.forEach(change => {
                const [row, col, oldVal, newVal] = change;
                if (this.columns_table_copy[col].data === 'wagon_number') {
                    hotInstance2.setDataAtCell(row, col, newVal);

                }
            });
        },
    },
};
</script>

<style scoped>
.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
}

.tables-container {
    display: flex;

    gap: 10px;
}

.table-container:nth-child(2) {
    width: 100%;
    /* background: green; */
}

.table-container:first-child {
    width: 35%;
    /* background: lightgrey */
}
</style>
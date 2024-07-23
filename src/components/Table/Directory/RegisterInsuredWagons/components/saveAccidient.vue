<template>
    <div>
        <b-modal id="modal-1" title="Страховой случай" centered size="lg" cancel-disabled>
            <div class="modal-table">
                <hot-table :data="tableData" :columns="columns" :rowHeaders="false" :colHeaders="colHeaders"
                    :height="150" :manualColumnResize="true" :manualRowResize="true">
                </hot-table>
            </div>
            <template #modal-footer="{ ok, }">
                <b>Custom Footer</b>
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="md" variant="success" @click="saveAccidientByWagon()">
                    Сохранить
                </b-button>

            </template>
        </b-modal>
        <div style="display: flex; justify-content: space-between; gap: 5vw; height: 4vh;">
            <section class="search_bloc" style="width: 100%;">
                <div class="long_search">
                    <input type="text" placeholder="Введите номера вагонов..." v-model="search"
                        @input="IputProcessing(search)">
                    <button class="Request" @click="getRequestToServerData(search)">
                        <span v-if="isSearch">Найти</span>
                        <b-icon v-if="!isSearch" icon="three-dots" animation="cylon" font-scale="3"></b-icon>
                    </button>
                </div>
            </section>
        </div>
        <br><br>
        <table>
            <thead>
                <tr>
                    <th>№ вагона</th>
                    <th>Тип вагона</th>
                    <th>Собст. на момент страхования</th>
                    <th>Страховая компания</th>
                    <th>№ договора</th>
                    <th>Дата договора</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in responseData" :key="item.id" @click="openModalPage(item)">
                    <td>{{ item.wagon_number }}</td>
                    <td>{{ item.wagon_type }}</td>
                    <td>{{ item.owner_at_insurance_moment }}</td>
                    <td>{{ item.insurance_company }}</td>
                    <td>{{ item.agr_date }}</td>
                    <td>{{ item.agr_number }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import api from "@/api/directory";
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();

export default {
    components: {
        HotTable,
    },
    data() {
        return {
            isSearch: true,
            search: "",
            intervalResponse: null,
            responseData: "",
            tableData: [
                { wagon_number: '', wagon_type: 'ПВ', owner: '', insurance_company: '', contract_number: '', repair_type: '', repair_station: '', repair_road: '', repair_date: '' }
            ],
            columns: [
                { data: 'wagon_number', type: 'text' },
                { data: 'wagon_type', type: 'dropdown', source: ['ПВ', 'ЦС'] },
                { data: 'owner', type: 'text' },
                { data: 'insurance_company', type: 'text' },
                { data: 'contract_number', type: 'text' },
                { data: 'repair_type', type: 'text' },
                { data: 'repair_station', type: 'text' },
                { data: 'repair_road', type: 'text' },
                { data: 'repair_date', type: 'date', dateFormat: 'YYYY-MM-DD' }
            ],
            colHeaders: ['Номер вагона', 'Тип вагона', 'Собственник', 'Страховая компания', 'Договор страхования', 'Вид ремонта', 'Станция НРП (ВУ-23)', 'Дорога НРП (ВУ-23)', 'Дата НРП (дата ВУ-23)'],
        }
    },
    created() {
        document.querySelectorAll('.hot-display-license-info').forEach(element => {
            element.style.display = 'none';
        });

    },
    mounted() {
        document.querySelectorAll('.hot-display-license-info').forEach(element => {
            element.style.display = 'none';
        });
    },
    watch: {
        search() {
            return this.search.length <= 1 ? this.responseSearchData = null : this.responseSearchData
        }
    },
    methods: {
        saveAccidientByWagon() {
            alert('Сохранение в разработке')
        },
        IputProcessing(val) {
            clearInterval(this.intervalResponse)
            this.intervalResponse = setTimeout(() => {
                this.getRequestToServerData(val)
            }, 500)
        },
        openModalPage(item) {
            // Загрузите данные строки в tableData
            this.$bvModal.show("modal-1")
            this.$nextTick(() => {

                document.querySelectorAll('.hot-display-license-info').forEach(element => {
                    element.style.display = 'none';
                });
            })
            this.tableData = [{ ...item }];
        },
        async getRequestToServerData(search) {
            this.isSearch = false
            let obj = { wagons: search.replace(/[^.\d]+/g, "").replace(/(\d{8})(?=\d)/g, '$1,') }
            let today = new Date().toISOString().slice(0, 10)
            try {
                let response = await api.getAllInsuranceWagons(obj)
                this.responseData = response.data
                this.isSearch = true
            }
            catch (err) {
                console.log(err)
                this.isSearch = true
            }
        }
    }
}
</script>

<style scoped>
.long_search {
    position: relative;
    width: 90%;
    margin: 0 auto;
}

.long_search {
    position: relative;
    width: 100%;
    height: 110%;
}

.long_search input {
    width: 100%;
    height: 100%;
    border: 1px solid #007BFF !important;
    border-radius: 10px;
    text-align: left !important;
    padding-left: 2% !important;
}

.long_search button {
    width: 15%;
    height: 80%;
    position: absolute;
    top: 4px;
    right: 5px;
    border-radius: 8px;
}

.modal-table {
    width: 100%;
    height: auto;
    min-height: 15vh;
}

tr:hover {
    background: lightgray;
}

.air_block {
    width: 100%;
    margin: 0 auto;
}

.table th,
.table td {
    text-align: center;
    vertical-align: middle;
}
</style>
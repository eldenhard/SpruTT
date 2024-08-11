<template>
    <div>
        <b-modal id="modal-1" :title="is_insurances_cases" centered size="xl" cancel-disabled>
            <div class="modal-table">
                <hot-table ref="hotTable"  :data="tableData" :columns="columns" :rowHeaders="false" :colHeaders="colHeaders"
                    :height="150" :manualColumnResize="true" :manualRowResize="true"  className="custom-table" >
                </hot-table>
            </div>
            <template #modal-footer="{ ok }">
                <b-button size="md" variant="success" @click="saveAccidientByWagon()">Сохранить</b-button>
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

        <hot-table ref="hotTable" :data="responseData" :columns="columns" :colHeaders="colHeaders"
            :contextMenu="customContextMenu" :manualColumnResize="true" :manualRowResize="true" :height="'30vh'">
        </hot-table>

        <br><br>
        <!-- <hr>
        <div class="air_block_header">
            <h4>Ранее введенные данные</h4>
            <b-button variant="success" @click="getData()">Загрузить данные</b-button>
        </div>

        <div style="overflow: auto; height: 30vh; margin-top: 5%;">
            <table>
                <thead>
                    <tr>
                        <th>№ вагона</th>
                        <th>Тип вагона</th>
                        <th>Собственник</th>
                        <th>Страховая компания</th>
                        <th>Договор страхования</th>
                        <th>Вид ремонта</th>
                        <th>Станция НРП (ВУ-23)</th>
                        <th>Дорога НРП (ВУ-23)</th>
                        <th>Дата НРП (дата ВУ-23)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in responseOldData" :key="item.id">
                        <td>{{ item.wagon_number }}</td>
                        <td>{{ item.wagon_type }}</td>
                        <td>{{ item.owner }}</td>
                        <td>{{ item.insurance_company }}</td>
                        <td>{{ item.agr_number }}</td>
                        <td>{{ item.repair_kind }}</td>
                        <td>{{ item.station_nrp_vu_23 }}</td>
                        <td>{{ item.road_nrp_vu_23 }}</td>
                        <td>{{ item.date_nrp_vu_23?.split("-").reverse().join(".") }}</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>
</template>

<script>
import api from "@/api/directory";
import { HotTable } from '@handsontable/vue';
import { registerAllModules } from 'handsontable/registry';
import { Theme } from '@amcharts/amcharts5';

registerAllModules();

export default {
    components: {
        HotTable,
    },
    data() {
        return {
            isSearch: true,
            search: "",
            is_insurances_cases: "",
            intervalResponse: null,
            responseData: [],
            responseOldData: [],
            tableData: {
                wagon_number: "",
                wagon_type: "",
                owner: "",
                insurance_company: "",
                agr_number: "",
                agr_date: "",
                franchise_sum: "",
                conditional: "",
                insure_case_date: "",
                vu23_date: "",
                vu36_date: "",
                fault_code: "",
                repair_exclusion_loss: "",
                status: "",
                damage_causer: "",
                client: "",
                sk_notification_date: "",
                out_application_number: "",
                application_date: "",
                last_request_response_date: "",
                refund_date: "",
                estimated_insurance_indemnity: "",
                franchise: "",
                deduction_of_balances: "",
                fact_insurance_indemnity: "",
                refused: "",
                repair_downtime_pending_amount: "",
                railway_fare_to_from_repair: "",
                additional_compensation_due: "",
                total_loss_tt: "",
                reimbursed: "",
                reimbursed_ost: "",
                comment: "",
                repair_kind: "",
                station_nrp_vu_23: "",
                road_nrp_vu_23: "",
                date_nrp_vu_23: "",
                is_closed: ""
            },

            columns: [
                { data: 'wagon_number', type: 'text',editor: false },
                { data: 'wagon_type', editor: false },
                { data: 'owner', type: 'text' },
                { data: 'insurance_company', type: 'text' },
                { data: 'agr_number', type: 'text' },
                { data: 'franchise_sum', type: 'numeric' },
                { data: 'conditional', editor: 'select', selectOptions: ['Условная', 'Безусловная'] },
                { data: 'insure_case_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
                { data: 'vu23_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
                { data: 'vu36_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
                { data: 'fault_code', type: 'text' },
                { data: 'repair_exclusion_loss', type: 'text' },
                { data: 'status', type: 'text' },
                { data: 'damage_causer', type: 'text' },
                { data: 'client', type: 'text' },
                { data: 'sk_notification_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
                { data: 'out_application_number', type: 'text' },
                { data: 'application_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
                { data: 'last_request_response_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
                { data: 'refund_date', type: 'date', dateFormat: 'YYYY-MM-DD' },
                { data: 'estimated_insurance_indemnity', type: 'text' },
                { data: 'franchise', type: 'text' },
                { data: 'deduction_of_balances', type: 'numeric' },
                { data: 'fact_insurance_indemnity', type: 'numeric' },
                { data: 'refused', type: 'numeric' },
                { data: 'repair_downtime_pending_amount', type: 'numeric' },
                { data: 'railway_fare_to_from_repair', type: 'numeric' },
                { data: 'additional_compensation_due', type: 'numeric' },
                { data: 'total_loss_tt', type: 'numeric' },
                { data: 'reimbursed', type: 'numeric' },
                { data: 'reimbursed_ost', type: 'numeric' },
                { data: 'comment', type: 'text' },
                // { data: 'repair_kind', type: 'text' },
                // { data: 'station_nrp_vu_23', type: 'text' },
                // { data: 'road_nrp_vu_23', type: 'text' },
                // { data: 'date_nrp_vu_23', type: 'date', dateFormat: 'YYYY-MM-DD' },
                // { data: 'is_closed', type: 'dropdown', source: ['Да', 'Нет'] }
            ],
            colHeaders: [
                'Номер вагона',
                'Тип вагона',
                'Собственник',
                'Договор страхования',
                'Дата договора',
                'Сумма франшизы',
                'Условная/ Безусловная',
                'Дата страхового случая (ВУ_25)',
                'Дата ВУ-23',
                'Дата ВУ-36/ИСКЛ',
                'Код неисправности',
                'Ремонт/исключение/утеря',
                'Виновник в повреждении',
                'Клиент',
                'Дата уведомления в СК',
                'Исх. Номер заявления',
                'Дата заявления',
                'Дата направления ответа по крайнему запросу',
                'Дата возмещения',
                'Предполагаемое/ Причитающееся страховое возмещение',
                'Франшиза',
                'Вычет остатков',
                'Факт возмещения от страховой, руб.',
                'Отказано СК, руб.',
                'Сумма за простой в ремонте',
                'ж.д тариф в/из ремонта',
                'Причитающееся довозмещение',
                'ИТОГО потери ТТ',
                'Возмещено ВСЕГО',
                'Осталось возместить',
                'Статус',
                'Примечание'
            ],
            customContextMenu: {
                items: {
                    'new_case': {
                        name: 'Новый страховой случай',
                        callback: () => this.handleContextMenuClick('new')
                    },
                    'old_cases': {
                        name: 'Старые страховые случаи',
                        callback: () => this.handleContextMenuClick('old')
                    },
                    'archived_cases': {
                        name: 'Архивные страховые случаи',
                        callback: () => this.handleContextMenuClick('archived')
                    },
                    // 'sep1': '---------',
                    // 'remove_row': {
                    //     name: 'Удалить строку',
                    //     callback: (key, selection) => {
                    //         this.$refs.hotTable.hotInstance.alter('remove_row', selection[0].start.row);
                    //     }
                    // }
                }
            }
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
    methods: {
        handleContextMenuClick(type) {
            const selected = this.$refs.hotTable.hotInstance.getSelectedLast();
            if (selected) {
                const rowIndex = selected[0];
                const rowData = this.responseData[rowIndex];
                this.is_insurances_cases = type == 'new' ? 'Новый страховой случай' : type == 'old' ? 'Старые страховые случаи' : 'Архивные страховые случаи';
                this.openModalPage(rowData, type)
                console.log(`Selected row data for ${type}:`, rowData);
            }
        },
        async getData() {
            try {
                this.$emit('startStopLoader', true);
                let response = await api.getDataInsuranceCases();
                this.responseOldData = response.data.data;
                if (this.responseOldData.length > 0) {
                    this.$toast.success('Данные загружены', {
                        timeout: 3000
                    });
                } else {
                    this.$toast.warning('Нет ранее введенных данных', {
                        timeout: 4000
                    });
                }
            } catch (err) {
                this.$toast.error(`Данные не загружены\n ${err}`, {
                    timeout: 3000
                });
                this.$emit('startStopLoader', false);
            } finally {
                this.$emit('startStopLoader', false);
            }
        },
        async saveAccidientByWagon() {
            try {
                this.$emit('startStopLoader', true);
                let test = this.tableData[0];
                await api.saveDataInsuranceCases(test);
                this.$emit('startStopLoader', false);
                this.$bvModal.hide("modal-1");
                this.$toast.success('Данные сохранены', {
                    timeout: 3000
                });
                let response = await api.getDataInsuranceCases();
                this.responseOldData = response.data.data;
            } catch (err) {
                console.log(err);
                this.$emit('startStopLoader', false);
                this.$toast.error(`Данные не сохранены\n ${err}`, {
                    timeout: 3000
                });
            } finally {
                this.$emit('startStopLoader', false);
            }
        },
        IputProcessing(val) {
            clearInterval(this.intervalResponse);
            this.intervalResponse = setTimeout(() => {
                this.getRequestToServerData(val);
            }, 500);
        },
        openModalPage(item) {
            this.$bvModal.show("modal-1");
            this.$nextTick(() => {
                document.querySelectorAll('.hot-display-license-info').forEach(element => {
                    element.style.display = 'none';
                });
            });
            this.tableData = [{ ...item }];
        },
        async getRequestToServerData(search) {
            this.isSearch = false
            let obj = { wagons: search.replace(/[^.\d]+/g, "").replace(/(\d{8})(?=\d)/g, '$1,') }
            let today = new Date().toISOString().slice(0, 10)
            let allData = []
            try {
                // let response = await api.getAllInsuranceWagons(obj)
                let last_page = 1
                let response = await api.getAllInsuranceWagons(obj, last_page);
                allData.push(...response.data.data)
                while (last_page < response.data.total_pages) {
                    last_page += 1
                    let res = await api.getAllInsuranceWagons(obj, last_page);
                    allData.push(...res.data.data)
                }
                this.responseData = allData
                console.log('allData: ', allData)
                this.$nextTick(() => {
                    const hotInstance = this.$refs.hotTable.hotInstance
                    hotInstance.loadData(this.responseData)
                    hotInstance.updateSettings({ data: this.responseData })
                    hotInstance.render()
                })
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
.air_block_header {
    padding: 1% 0 0 2%;
    color: #cacaca;
    display: flex;
    justify-content: space-between
}

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
<template>

    <div>
        <FilterFarms @updateFilterDataFarms="updateFilterDataFarms"></FilterFarms>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
            id="notif" />
        <Loader :loader="loader"></Loader>
        <button class="Accept" @click="getFarmContract()"
            style="width: 100%; position: relative; left: 50%; transform: translate(-50%,0)">Запросить
            общехозяйственные договора</button>
        <br><br>
        <p class="amount">всего записей: {{ total_objects }}</p>
        <p class="amount">всего на странице: {{ amount }}</p>
        <div
            style="width: 100%; overflow-x: auto; height: 80vh; overflow-y: auto; position: relative; left: 50%; transform: translate(-50%,0); margin-bottom: 3%;">
            <table class="table" style="table-layout: fixed;">
                <thead>
                    <tr>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Номер договора</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Статус ТТ по договору</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Дата заключения</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Подразделение инициатора</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Вид договора</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Предмет договора</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Сумма договора</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Срок действия договора</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Пролонгация</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Статус</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Скан-копия</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Категория</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">
                            Примечание</th>

                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            Рабочее наименование</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            Краткое наименование</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            Полное наименование</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            ЕЛС</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            ОГРН/ЕГРПОУ/БИН</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            ИНН/РНН</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            КПП/№ Св-ва НДС</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            Юридический адрес</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            Дата создания</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            Руководитель</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            Телефон</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: burlywood !important;">
                            Группа</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: wheat !important;">
                            Тип приложения</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: wheat !important;">
                            Номер приложения</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: wheat !important;">
                            Дата</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: wheat !important;">
                            Примечание</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: wheat !important;">
                            Скан-копия</th>
                        <th
                            style="width:  200px !important; height: 50px !important; vertical-align: middle !important; background: wheat !important;">
                            Номер договора</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(farm) in farmDirecory" :key="farm.id">
                        <td class="td-btr">{{ farm.number }}</td>
                        <td class="td-btr">{{ farm.company_status }}</td>
                        <td class="td-btr">{{ farm.created_at }}</td>
                        <td class="td-btr">{{ farm.department }}</td>
                        <td class="td-btr">{{ farm.contract_type }}</td>
                        <td class="td-btr">{{ farm.contract_object }}</td>
                        <td class="td-btr">{{ farm.fiat_amount }}</td>
                        <td class="td-btr">{{ farm.expiration_date }}</td>
                        <td class="td-btr" v-if="farm.prolongation == true">Да</td>
                        <td class="td-btr" v-else>Нет</td>
                        <td class="td-btr" v-if="farm.is_active == true">Да</td>
                        <td class="td-btr" v-else>Нет</td>
                        <td class="td-btr"><a :href="farm.scan" target="_blank"><img style="height: 50px"
                                    src="@/assets/pdf.png" alt="скан"></a></td>
                        <td class="td-btr">{{ farm.category }}</td>
                        <td class="td-btr">{{ farm.comment }}</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.work_name }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.short_name }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.full_name }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.els }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.ogrn }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.inn }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.kpp }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.legal_address }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ new
                                Date(farm.counterparty.created_at).toLocaleString()
                        }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.manager }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ farm.counterparty.phone }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="farm.counterparty != null">{{ getGroupName(farm.counterparty.group) }}
                        </td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-for="f in farm.annexes" :key="f.id">{{ f.doc_type }}</td>
                        <td class="td-btr" v-for="f in farm.annexes" :key="f.id">{{ f.number }}</td>
                        <td class="td-btr" v-for="f in farm.annexes" :key="f.id">{{ new
                                Date(f.created_at).toLocaleString()
                        }}</td>
                        <td class="td-btr" v-for="f in farm.annexes" :key="f.id">{{ f.comment }}</td>
                        <td class="td-btr" v-for="f in farm.annexes" :key="f.id"><a :href="f.scan" target="_blank"><img
                                    src="@/assets/excel.png"></a></td>
                        <td class="td-btr" v-for="f in farm.annexes" :key="f.id">{{ f.contract }}</td>

                    </tr>

                </tbody>
            </table>
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 2%;">
            <button class="Cancel" style="width: 20%" v-if="prevLink" @click="goToPage(prevLink)">назад</button>
            <button class="Cancel" style="width: 20%" v-if="nextLink" @click="goToPage(nextLink)">вперед</button>
        </div>

    </div>
</template>
    
<script>
import api from '@/api/directory'
import { mapState } from 'vuex';
import Loader from '@/components/loader/loader.vue'
import Notifications from '@/components/notifications/Notifications.vue'
import groups from '@/helpers/groups'
import FilterFarms from '@/components/filter/contractFilter/filter_farms.vue'


export default {
    name: 'PartnerTable',
    components: { Loader, Notifications, FilterFarms },
    data() {
        return {
            nextLink: null,
            prevLink: null,
            loader: false,
            total_objects: '',
            amount: '',
            farmDirecory: '',
            groups: groups.groups,
            // Уведомления
            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',

            // name: '',
            // number: '',
            // company_status: '',
            // created_at: '',
            // department: '',
            // contract_type: '',
            // contract_object: '',
            // fiat_amount: '',
            // expiration_date: '',
            // prolongation: '',
            // is_active: '',
            // category: '',
            // comment: '',

            // work_name: '',
            // short_name: '',
            // full_name: '',
            // els: '',
            // ogrn: '',
            // inn: '',
            // kpp: '',
            // legal_address: '',
            // manager: '',
            // phone: '',
            // group: '',

            filter_farms: {
                number: '',
                counterparty__full_name: ''

            }
        }
    },
    methods: {
        getGroupName(group) {
            // console.log(groups)
            return groups.groups[group];
        },
        goToPage(link) {
            let url = new URL(link)
            let pageNumber = url.searchParams.get("page")
            if (pageNumber != null) {
                this.filter_farms.page = pageNumber
            } else {
                delete (this.filter_farms.page)
            }
            this.getFarmContract()
        },
        getFarmContract() {
            this.loader = true
            api.getDirectoryFarm(this.filter_farms)
                .then(response => {
                    this.nextLink = response.data.links.next
                    this.prevLink = response.data.links.previous
                    this.farmDirecory = response.data.data
                    this.total_objects = response.data.total_objects
                    this.amount = response.data.amount

                    this.notifyHead = 'Успешно'
                    this.notifyMessage = 'Данные отфильтрованы'
                    this.notifyClass = 'wrapper-success'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 1500)
                    this.loader = false
                }).catch((err) => {
                    this.loader = false
                    this.notifyHead = 'Ошибка'
                    this.notifyMessage = 'Данные не отфильтрованы, попробуйте еще раз'
                    this.notifyClass = 'wrapper-alert'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 1500)
                })

        },

        closeNotification() {
            this.showNotify = false
        },
        updateFilterDataFarms(filter_farms) {
            this.filter_farms = filter_farms
        },

    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            allGroups: state => state.auth.groups,
            staffGlobal: state => state.auth.users
        })
    },
}
</script>
    
    
<style>
/* .input-filter {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    border: none;
    text-decoration: none;
    outline: none;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
} */
.td-btr {
    padding: 0 !important;
    vertical-align: middle !important;
}
</style>
    
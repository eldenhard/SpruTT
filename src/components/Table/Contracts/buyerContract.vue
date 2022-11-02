<template>

    <div>
        <FilterBuyer @updateFilterDataBuyer="updateFilterDataBuyer"></FilterBuyer>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
            id="notif" />
        <Loader :loader="loader"></Loader>
        <button class="Accept" @click="getBuyerContract()"
            style="width: 100%; position: relative; left: 50%; transform: translate(-50%,0)">Запросить
            договора с покупателем</button>
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
                        <template v-for="(el, idx) in countAnnexes">


                            <th :key="idx"
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
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(buyer) in buyerDirectory" :key="buyer.id">
                        <td class="td-btr">{{ buyer.number }}</td>
                        <td class="td-btr">{{ buyer.company_status }}</td>
                        <td class="td-btr">{{ new Date(buyer.created_at).toLocaleString() }}</td>
                        <td class="td-btr">{{ buyer.department }}</td>
                        <td class="td-btr">{{ buyer.contract_type }}</td>
                        <td class="td-btr">{{ buyer.contract_object }}</td>
                        <td class="td-btr">{{ buyer.fiat_amount }}</td>
                        <td class="td-btr">{{ buyer.expiration_date }}</td>
                        <td class="td-btr" v-if="buyer.prolongation == true">Да</td>
                        <td class="td-btr" v-else>Нет</td>
                        <td class="td-btr" v-if="buyer.is_active == true">Да</td>
                        <td class="td-btr" v-else>Нет</td>
                        <td class="td-btr" v-if="buyer.scan != null"><a :href="buyer.scan" target="_blank"><img
                                    style="height: 50px" src="@/assets/pdf.png" alt="скан"></a></td>
                        <td class="td-btr" v-else>—</td>
                        <td class="td-btr">{{ buyer.category }}</td>
                        <td class="td-btr">{{ buyer.comment }}</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.work_name }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.short_name }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.full_name }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.els }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.ogrn }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.inn }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.kpp }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.legal_address }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">
                            {{ new Date(buyer.counterparty.created_at).toLocaleString()
                            }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.manager }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ buyer.counterparty.phone }}</td>
                        <td class="td-btr" v-else>—</td>

                        <td class="td-btr" v-if="buyer.counterparty != null">{{ getGroupName(buyer.counterparty.group)
                        }}</td>
                        <td class="td-btr" v-else>—</td>

                        <template v-for="f in buyer.annexes">

                            <td class="td-btr">{{ f.doc_type }}</td>
                            <td class="td-btr">{{ f.number }}</td>
                            <td class="td-btr">{{ new
                                    Date(f.created_at).toLocaleString()
                            }}</td>
                            <td class="td-btr">{{ f.comment }}</td>
                            <td class="td-btr"><a :href="f.scan" target="_blank"><img src="@/assets/excel.png"></a></td>
                            <td class="td-btr">{{ f.contract }}</td>
                        </template>
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
import FilterBuyer from '@/components/filter/contractFilter/filter_buyer.vue'
import groups from '@/helpers/groups'

export default {
    name: 'PartnerTable',
    components: { Loader, Notifications, FilterBuyer },
    data() {
        return {
            nextLink: null,
            prevLink: null,
            loader: false,
            total_objects: '',
            amount: '',
            buyerDirectory: [],

            // Уведомления
            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',

            filter_buyer: {
                groups: [],
                number: '',
                counterparty__full_name: ''
            }
        }
    },
    methods: {
        getGroupName(group) {
            console.log(groups)
            return groups.groups[group];
        },
        goToPage(link) {
            let url = new URL(link)
            let pageNumber = url.searchParams.get("page")
            if (pageNumber != null) {
                this.filter_buyer.page = pageNumber
            } else {
                delete (this.filter_buyer.page)
            }
            this.getBuyerContract()
        },
        getBuyerContract() {
            this.loader = true
            api.getDirectoryBuyer(this.filter_buyer)
                .then(response => {
                    this.nextLink = response.data.links.next
                    this.prevLink = response.data.links.previous
                    this.buyerDirectory = response.data.data
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
        updateFilterDataBuyer(filter_buyer) {
            this.filter_buyer = filter_buyer
        },

    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            allGroups: state => state.auth.groups,
            staffGlobal: state => state.auth.users
        }),
        countAnnexes() {
            let count = 0;
            if (this.buyerDirectory.length) {
                this.buyerDirectory.forEach(el => {
                    if (el.annexes.length > count) count = el.annexes.length
                })
            }

            return count
        }
    },
}
</script>
    
    
<style>
.input-filter {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    border: none;
    text-decoration: none;
    outline: none;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
}
</style>
    
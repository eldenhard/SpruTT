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
            <table class="table table-sm table-bordered"  >
                <thead class="thead-light"  style="background:#E9ECEF; z-index:1">
                    <tr>
                        <th>
                            Номер договора</th>
                        <th>
                            Статус ТТ по договору</th>
                        <th>
                            Дата заключения</th>
                        <th>
                            Отдел инициатора</th>
                        <th>
                            Вид договора</th>
                        <th>
                            Предмет договора</th>
                        <th>
                            Сумма договора</th>
                        <th>
                            Срок действия договора</th>
                        <th>
                            Пролонгация</th>
                        <th>
                            Статус</th>
                        <th>
                            Скан-копия</th>
                        <th>
                            Категория</th>
                        <th>
                            Примечание</th>

                        <th>
                            Рабочее наименование</th>
                        <th>
                            Краткое наименование</th>
                        <th>
                            Полное наименование</th>
                        <th>
                            ЕЛС</th>
                        <th>
                            ОГРН/ЕГРПОУ/БИН</th>
                        <th>
                            ИНН/РНН</th>
                        <th>
                            КПП/№ Св-ва НДС</th>
                        <th>
                            Юридический адрес</th>
                        <th>
                            Дата создания</th>
                        <th>
                            Руководитель</th>
                        <th>
                            Телефон</th>
                        <th>
                            Группа</th>
                        <template v-for="(el, idx) in countAnnexes">

                            <th :key="idx">
                                Тип приложения</th>
                            <th>
                                Номер приложения</th>
                            <th>
                                Дата</th>
                            <th>
                                Примечание</th>
                            <th>
                                Скан-копия</th>
                            <th>
                                Номер договора</th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(buyer) in buyerDirectory" :key="buyer.id">
                        <td>{{ buyer.number }}</td>
                        <td>{{ buyer.company_status }}</td>
                        <td style="font-size: 15px; text-align: center;">{{ new Date(buyer.created_at).toLocaleString() }}</td>
                        <td>{{ buyer.department }}</td>
                        <td>{{ buyer.contract_type }}</td>
                        <td>{{ buyer.contract_object }}</td>
                        <td>{{ buyer.fiat_amount }}</td>
                        <td>{{ buyer.expiration_date }}</td>
                        <td v-if="buyer.prolongation == true">Да</td>
                        <td v-else>Нет</td>
                        <td v-if="buyer.is_active == true">Да</td>
                        <td v-else>Нет</td>
                        <td v-if="buyer.scan != null"><a :href="buyer.scan" target="_blank"><img
                                    style="height: 50px" src="@/assets/pdf.png" alt="скан"></a></td>
                        <td v-else>—</td>
                        <td>{{ buyer.category }}</td>
                        <td>{{ buyer.comment }}</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.work_name }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.short_name }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.full_name }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.els }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.ogrn }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.inn }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.kpp }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.legal_address }}</td>
                        <td v-else>—</td>

                        <td style="font-size: 15px; text-align: center;" v-if="buyer.counterparty != null">
                            {{ new Date(buyer.counterparty.created_at).toLocaleString()
                            }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.manager }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ buyer.counterparty.phone }}</td>
                        <td v-else>—</td>

                        <td v-if="buyer.counterparty != null">{{ getGroupName(buyer.counterparty.group)
                        }}</td>
                        <td v-else>—</td>

                        <template v-for="f in buyer.annexes">

                            <td>{{ f.doc_type }}</td>
                            <td>{{ f.number }}</td>
                            <td  style="font-size: 15px; text-align: center;">{{ new
                                    Date(f.created_at).toLocaleString()
                            }}</td>
                            <td>{{ f.comment }}</td>
                            <td><a :href="f.scan" target="_blank"><img src="@/assets/excel.png"  style="height: 20px"></a></td>
                            <td>{{ f.contract }}</td>
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
    
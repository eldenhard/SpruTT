<template>

    <div>
        <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
            id="notif" />
        <Loader :loader="loader"></Loader>
        <filterDirectory @updateFilterDataDirectory="updateFilterDataDirectory"></filterDirectory>

  
            <b-modal ref="my-modal" hide-footer title="Добавление контрагента" size="lg" style="width: 100% !important">
                <div class="row" style="width: 100% !important">
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff1' name='Pwd' v-model="work_name" />
                            <br>
                            <label for='input-filter-staff1' class='label'>Рабочее наименование</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff12' name='Pwd' v-model="short_name" />
                            <br>
                            <label for='input-filter-staff12' class='label'>Краткое наименование</label>
                        </div>
                    </div>

                </div>
                <div class="row" style="width: 100% !important">
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff13' name='Pwd' v-model="full_name" />
                            <br>
                            <label for='input-filter-staff13' class='label'>Полное наименование</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff14' name='Pwd' v-model="els" />
                            <br>
                            <label for='input-filter-staff14' class='label'>ЕЛС</label>
                        </div>
                    </div>

                </div>
                <div class="row" style="width: 100% !important">
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff15' name='Pwd' v-model="ogrn" />
                            <br>
                            <label for='input-filter-staff15' class='label'>ОГРН/ЕГРПОУ/БИН</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff16' name='Pwd' v-model="inn" />
                            <br>
                            <label for='input-filter-staff16' class='label'>ИНН/РНН</label>
                        </div>
                    </div>

                </div>
                <div class="row" style="width: 100% !important">
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff17' name='Pwd' v-model="kpp" />
                            <br>
                            <label for='input-filter-staff17' class='label'>КПП/№ Св-ва НДС</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff18' name='Pwd' v-model="legal_address" />
                            <br>
                            <label for='input-filter-staff18' class='label'>Юридический адрес</label>
                        </div>
                    </div>

                </div>
                <div class="row" style="width: 100% !important">
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff19' name='Pwd' v-model="manager" />
                            <br>
                            <label for='input-filter-staff19' class='label'>Руководитель</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class='bg'>
                            <input class='textarea' id='input-filter-staff20' name='Pwd' v-model="phone" />
                            <br>
                            <label for='input-filter-staff20' class='label'>Телефон</label>
                        </div>
                    </div>

                </div>
                <div class="row" style="width: 100% !important">
                    <div class="col-md-12">
                        <div class='bg'>
                            <select v-model="group" class="textarea" style="width: 80%;"
                                id="input-filter-staff21">

                                <option :value="g[0]" v-for="g in Object.entries(groups)" :key="g[0]">{{
                                        g[1]
                                }}
                                </option>
                            </select>
                            <br>
                            <label for='input-filter-staff21' class='label' style="margin-left: 10%">Группа</label>
                        </div>
                    </div>

                </div>









                <!-- <div class='bg'>
                        <select v-model="group" class="textarea" style="border: 1px solid grey" id="input-filter-staff21">

                            <option :value="g[0]" v-for="g in Object.entries(groups)" :key="g[0]">{{
                                    g[1]
                            }}
                            </option>
                        </select>
                        <br>
                        <label for='input-filter-staff21' class='label'>Группа</label>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Рабочее наименование</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control-plaintext" v-model="work_name">

                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Краткое наименование</label>
                        <div class="col-sm-8">
                            <input class="form-control" id="inputPassword" v-model="short_name">
                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Полное наименование</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control-plaintext" v-model="full_name">

                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">ЕЛС</label>
                        <div class="col-sm-8">
                            <input class="form-control" v-model="els">
                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">ОГРН/ЕГРПОУ/БИН</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control-plaintext" v-model="ogrn">

                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">ИНН/РНН</label>
                        <div class="col-sm-8">
                            <input class="form-control" v-model="inn">
                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">КПП/№ Св-ва НДС</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control-plaintext" v-model="kpp">

                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Юридический адрес</label>
                        <div class="col-sm-8">
                            <input class="form-control" v-model="legal_address">
                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="staticEmail" class="col-sm-3 col-form-label"> Руководитель</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control-plaintext" v-model="manager">

                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">Телефон</label>
                        <div class="col-sm-8">
                            <input class="form-control" v-model="phone">
                        </div>
                    </div> -->
                <!-- <div class="form-group row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Группа</label>
                        <div class="col-sm-8">
                            <select v-model="group" class="input-filter" style="border: 1px solid grey">

                                <option :value="g[0]" v-for="g in Object.entries(groups)" :key="g[0]">{{
                                        g[1]
                                }}
                                </option>
                            </select>

                        </div>

                    </div> -->
                <!-- </div> -->
                <b-button class="mt-2" variant="success" block @click="CreateCounterparties()">Сохранить
                </b-button>
                <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-button>



            </b-modal>
    

        <button class="Accept" @click="getCounterparties()"
            style="width: 100%; position: relative; left: 50%; transform: translate(-50%,0)">Запросить
            контрагентов</button>
        <br><br>

        <p class="amount">всего записей: {{ total_objects }}</p>
        <p class="amount">всего на странице: {{ amount }}</p>


        <button class="Cancel" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
            @click="showModal">Добавить
            контрагента</button>

        <div
            style="width: 100%; overflow-x: auto; height: 80vh; overflow-y: auto; position: relative; left: 50%; transform: translate(-50%,0); margin-bottom: 3%;">
            <table class="table" style="table-layout: fixed;">
                <thead>
                    <tr>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            Рабочее наименование</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            Кратное наименование</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            Полное наименование</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            ЕЛС</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            ОГРН/ЕГРПОУ/БИН</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            ИНН/РНН</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            КПП/№ Св-ва НДС</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            Юридический адрес</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            Дата создания</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            Руководитель</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            Телефон</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            Группа</th>
                        <th
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            Действие</th>



                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(part, index) in counterparties" :key="part.id">
                        <td class="td-btr"><input class="input-filter" type="text"
                                v-model="counterparties[index].work_name"></td>
                        <td class="td-btr"><input class="input-filter" type="text"
                                v-model="counterparties[index].short_name"></td>
                        <td class="td-btr"><input class="input-filter" type="text"
                                v-model="counterparties[index].full_name"></td>
                        <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].els">
                        </td>
                        <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].ogrn">
                        </td>
                        <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].inn">
                        </td>
                        <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].kpp">
                        </td>
                        <td class="td-btr"><input class="input-filter" type="text"
                                v-model="counterparties[index].legal_address"></td>
                        <td class="td-btr">{{ new Date(part.created_at).toLocaleString() }}</td>
                        <td class="td-btr"><input class="input-filter" type="text"
                                v-model="counterparties[index].manager"></td>
                        <td class="td-btr"><input class="input-filter" type="text"
                                v-model="counterparties[index].phone"></td>
                        <td class="td-btr">

                            <select v-model="counterparties[index].group" class="input-filter">
                                <option value="all">Все</option>
                                <option :value="g[0]" v-for="g in Object.entries(groups)" :key="g[0]">{{ g[1] }}
                                </option>
                            </select>
                        </td>
                        <td
                            style="width:  200px !important; height: 30px !important; vertical-align: middle !important;">
                            <button class="Accept" @click="savePartner(part)">Сохранить</button>
                        </td>

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
import apiReport from '@/api/report'
import { mapState } from 'vuex';
import Loader from '@/components/loader/loader.vue'
import filterDirectory from '@/components/filter/FilterDirectory.vue'
import groups from '@/helpers/groups'
import Notifications from '@/components/notifications/Notifications.vue'

export default {
    name: 'PartnerTable',
    components: { Loader, filterDirectory, Notifications },
    data() {
        return {
            groups: groups.groups,
            nextLink: null,
            prevLink: null,
            counterparties: [],
            loader: false,
            filter_directory: {
                search: '',
            },
            loader: false,
            total_objects: '',
            amount: '',
            work_name: '',
            short_name: '',
            full_name: '',
            els: '',
            ogrn: '',
            inn: '',
            kpp: '',
            legal_address: '',
            manager: '',
            phone: '',
            group: '',

            // Уведомления
            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',

            name: ''



        }
    },
    methods: {
        goToPage(link) {
            let url = new URL(link)
            let pageNumber = url.searchParams.get("page")
            if (pageNumber != null) {
                this.filter_directory.page = pageNumber
            } else {
                delete (this.filter_directory.page)
            }
            this.getCounterparties()
        },
        getCounterparties() {
            this.loader = true
            api.getAllcounterparties(this.filter_directory)
                .then(response => {
                    this.counterparties = response.data.data
                    this.nextLink = response.data.links.next
                    this.prevLink = response.data.links.previous

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
        savePartner(part) {
            this.loader = true
            api.putCounterparties(part.id, part)
                .then(response => {
                    // console.log(response)
                    this.loader = false
                    this.notifyHead = 'Успешно'
                    this.notifyMessage = 'Данные о контрагенте сохранены'
                    this.notifyClass = 'wrapper-success'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 1500)
                }).catch((err => {
                    this.loader = false
                    this.notifyHead = 'Ошибка'
                    this.notifyMessage = 'Данные не сохранены'
                    this.notifyClass = 'wrapper-alert'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 1500)
                }))

        },
        closeNotification() {
            this.showNotify = false
        },
        updateFilterDataDirectory(filter_directory) {
            this.filter_directory = filter_directory
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        toggleModal() {
            // We pass the ID of the button that we want to return focus to
            // when the modal has hidden
            this.$refs['my-modal'].toggle('#toggle-btn')
        },
        CreateCounterparties() {
            this.loader = true
            event.preventDefault()
            this.loaderStaff = true

            let formData = new FormData();
            formData.append('work_name', this.work_name)
            formData.append("short_name", this.short_name)
            formData.append("full_name", this.full_name)
            formData.append("els", this.els)

            formData.append("ogrn", this.ogrn)
            formData.append("inn", this.inn)
            formData.append("kpp", this.kpp)
            formData.append("legal_address", this.legal_address)
            formData.append("manager", this.manager)
            formData.append("phone", this.phone)
            formData.append("group", this.group)

            apiReport.createCounterparties(formData)
                .then(response => {

                    this.loader = false
                    this.notifyHead = 'Успешно'
                    this.notifyMessage = 'Контрагент добавлен'
                    this.notifyClass = 'wrapper-success'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 1500)
                    this.hideModal()
                }).catch(error => {
                    this.loader = false
                    this.notifyHead = 'Ошибка'
                    this.notifyMessage = 'Контрагент с таким именем уже существует'
                    this.notifyClass = 'wrapper-alert'
                    this.showNotify = true
                    setTimeout(this.closeNotification, 1500)
                });

        }
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


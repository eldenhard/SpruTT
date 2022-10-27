<template>
<div>
    <Loader :loader="loader"></Loader>
    <filterDirectory @updateFilterDataDirectory ="updateFilterDataDirectory"></filterDirectory>
    <button class="Accept" @click="getCounterparties()" style="width: 100%; position: relative; left: 50%; transform: translate(-50%,0)">Запросить контрагентов</button>
    <br><br>
    <p class="amount">всего записей: {{total_objects}}</p>
    <p class="amount">всего на странице: {{amount}}</p>  
    <div style="width: 100%; overflow-x: auto; height: 80vh; overflow-y: auto; position: relative; left: 50%; transform: translate(-50%,0); margin-bottom: 3%;"> 
    <table class="table" style="table-layout: fixed;">
        <thead>
            <tr>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">Рабочее наименование</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">Кратное наименование</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">Полное наименование</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">ЕЛС</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">ОГРН/ЕГРПОУ/БИН</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">ИНН/РНН</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">КПП/№ Св-ва НДС</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">Юридический адрес</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">Дата создания</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">Руководитель</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">Телефон</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">Группа</th>
                    <th style="width:  200px !important; height: 50px !important; vertical-align: middle !important;">Действие</th>



            </tr>
        </thead>
        <tbody>
                <tr v-for="part in counterparties" :key="part.id">
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.work_name"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.short_name"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.full_name"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.els"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.ogrn"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.inn"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.kpp"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.legal_address"></td>
                      <td class="td-btr">{{new Date(part.created_at).toLocaleString()}}</td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.manager"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="part.phone"></td>
                      <td class="td-btr">
                                    <span v-if="part.group == 'all'">Все</span>
                                <span v-if="part.group == 'agent'">Агенты</span>
                                <span v-if="part.group == 'renter'">Арендодатель</span>
                                <span v-if="part.group == 'rail_tariff_supplier'">Поставщики ЖД тарифа</span>
                                <span v-if="part.group == 'product_supplier'">Поставщики товаров</span>
                                <span v-if="part.group == 'service_supplier'">Поставщики услуг и МПЗ</span>
                                <span v-if="part.group == 'client'">Клиенты</span>
                                <span v-if="part.group == 'tenant'">Арендатор</span>
                                <span v-if="part.group == 'retail'">Розничные</span>
                                <span v-if="part.group == 'bank'">Банки</span>
                                <span v-if="part.group == 'depot'">Депо</span>
                                <span v-if="part.group == 'our_firm'">Наши фирмы</span>
                                <span v-if="part.group == 'individual'">Физические лица</span>
                                <span v-if="part.group == 'other'">Прочие</span>
                                <span v-if="part.group == 'branch'">Филиалы</span>
                                <span v-if="part.group == 'specific'">Специфические</span>
                                <span v-if="part.group == 'budget'">Бюджет</span>
                                <span v-if="part.group == 'extra_budgetary_fond'">Внебюджетные фонды</span>
                                <span v-if="part.group == 'founder'">Учредители</span>
                                <span v-if="part.group == 'consignee'">Грузополучатели</span>
                                <span v-if="part.group == 'warehouse_or_terminal'">Склады и терминалы</span>
                                <span v-if="part.group == 'new_counterparty_by_edo'">Новые контрагенты по ЭДО</span>
                                <span v-if="part.group == 'edo_operator'">Операторы ЭДО</span>
                                <span v-if="part.group == 'court'">Суды</span>
                                <span v-if="part.group == 'potential_customer'">Потенциальные клиенты</span>
                                <span v-if="part.group == 'new_counterparty'">Новый контрагент</span>
                                <span v-if="part.group == 'employee'">Сотрудники</span>
                                <span v-if="part.group == 'archive'">Архив</span>
                                <span v-if="part.group == 'deleted'">Удаленные</span>
                         <select :value="part.group">
                                 <option>Все</option>
                                 <option>Агенты</option>
                                 <option>Арендодатель</option>
                                 <option>Поставщики ЖД тарифа</option>
                                 <option>Поставщики товаров</option>
                                 <option>Поставщики услуг и МПЗ</option>
                                 <option>Клиенты</option>
                                 <option>Арендатор</option>
                                 <option>Розничные</option>
                                 <option>Банки</option>
                                 <option>Депо</option>
                                 <option>Наши фирмы</option>
                                 <option>Физические лица</option>
                                 <option>Прочие</option>
                                 <option>Филиалы</option>
                                 <option>Специфические</option>
                                 <option>Бюджет</option>
                                 <option>Внебюджетные фонды</option>
                                 <option>Учредители</option>
                                 <option>Грузополучатели</option>
                                 <option>Склады и терминалы</option>
                                 <option>Новые контрагенты по ЭДО</option>
                                 <option>Операторы ЭДО</option>
                                 <option>Суды</option>
                                 <option>Потенциальные клиенты</option>
                                 <option>Новый контрагент</option>
                                 <option>Сотрудники</option>
                                 <option>Архив</option>
                                 <option>Удаленные</option>
                            </select>
                         </td>
                         <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;"><button class="Accept" @click="savePartner(part.id)">Сохранить</button></td> 
                    <!-- <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'all'">Все</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'agent'">Агенты</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'renter'">Арендодатель</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'rail_tariff_supplier'">Поставщики ЖД тарифа</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'product_supplier'">Поставщики товаров</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'service_supplier'">Поставщики услуг и МПЗ</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'client'">Клиенты</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'tenant'">Арендатор</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'retail'">Розничные</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'bank'">Банки</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'depot'">Депо</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'our_firm'">Наши фирмы</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'individual'">Физические лица</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'other'">Прочие</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'branch'">Филиалы</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'specific'">Специфические</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'budget'">Бюджет</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'extra_budgetary_fond'">Внебюджетные фонды</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'founder'">Учредители</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'consignee'">Грузополучатели</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'warehouse_or_terminal'">Склады и терминалы</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'new_counterparty_by_edo'">Новые контрагенты по ЭДО</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'edo_operator'">Операторы ЭДО</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'court'">Суды</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'potential_customer'">Потенциальные клиенты</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'new_counterparty'">Новый контрагент</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'employee'">Сотрудники</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'archive'">Архив</td>
                    <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;" v-if="part.group == 'deleted'">Удаленные</td>-->
               \

                </tr>
        </tbody>
    </table> 
</div>
<div style="display: flex; justify-content: space-around; margin-top: 2%;">
            <button class="Cancel" style="width: 20%"  v-if="prevLink" @click="goToPage(prevLink)">назад</button>
            <button class="Cancel" style="width: 20%" v-if="nextLink" @click="goToPage(nextLink)">вперед</button>
    </div>
</div>    
</template>

<script>
import api from '@/api/directory'
import { mapState } from 'vuex';
import Loader from '@/components/loader/loader.vue'
import filterDirectory from '@/components/filter/FilterDirectory.vue'
export default {
    name: 'PartnerTable',
    components: {Loader,filterDirectory},
    data(){
        return{
            nextLink: null,
            prevLink: null,
            counterparties: '',
            loader: false,
            filter_directory:{
                search: ''
            },
            loader: false,
            total_objects: '',
            amount: '',
            work_name: '',
            short_name:'',
            full_name: '',
            els: '',
            ogrn: '',
            inn: '',
            kpp: '',
            legal_address: '',
            manager: '',
            phone: '',

        }
    },
    methods:{ 
        goToPage(link){
        let url = new URL(link)
        let pageNumber  = url.searchParams.get("page")
        if(pageNumber != null){
            this.filter_directory.page = pageNumber 
        }else{
            delete(this.filter_directory.page)
        }
        this.getCounterparties()
        },
        getCounterparties(){
            this.loader = true
            api.getAllcounterparties(this.filter_directory)
            .then(response => {
                this.counterparties = response.data.data
                this.nextLink = response.data.links.next
                this.prevLink = response.data.links.previous
                this.counterparties = response.data.data
                this.total_objects = response.data.total_objects
                this.amount = response.data.amount

                this.loader = false
            })

        },
        savePartner(id){
            this.loader = true
            api.putCounterparties(id)
            .then(response => {
                console.log(response)
                this.loader = false
            })

        },
        updateFilterDataDirectory(filter_directory){
            this.filter_directory = filter_directory
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
.input-filter{
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    border: none;
    text-decoration: none;
    outline: none;
    text-align: center;
    font-size: 13px;
}
</style>


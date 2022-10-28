<template>
    
<div>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" id="notif"/>
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
                <tr v-for="(part, index) in counterparties" :key="part.id">
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].work_name"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].short_name"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].full_name"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].els"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].ogrn"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].inn"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].kpp"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].legal_address"></td>
                      <td class="td-btr">{{new Date(part.created_at).toLocaleString()}}</td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].manager"></td>
                      <td class="td-btr"><input class="input-filter" type="text" v-model="counterparties[index].phone"></td>
                      <td class="td-btr">
                                    
                         <select v-model="counterparties[index].group">
                            <option value="all">Все</option>
                                 <option :value="g[0]" v-for="g in Object.entries(groups)" :key="g[0]">{{g[1]}}</option>
                            </select>
                         </td>
                         <td style="width:  200px !important; height: 50px !important; vertical-align: middle !important;"><button class="Accept" @click="savePartner(part)">Сохранить</button></td> 

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
import groups from '@/helpers/groups'
import Notifications from '@/components/notifications/Notifications.vue'

export default {
    name: 'PartnerTable',
    components: {Loader,filterDirectory, Notifications},
    data(){
        return{
            groups: groups.groups,
            nextLink: null,
            prevLink: null,
            counterparties: [],
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

              // Уведомления
            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',


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
        savePartner(part){
            this.loader = true
            api.putCounterparties(part.id, part)
            .then(response => {
                console.log(response)
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
        closeNotification(){
            this.showNotify = false
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


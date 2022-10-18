<template>
    <div>
<FilterStaff  @updateFiltersStaff="updateFiltersStaff"></FilterStaff>

<button class="Accept staffButton" @click="allStaff()">Запросить всех сотрудников</button>
    <br><br>
    <br><br>
<button class="Cancel staffButton" style="width: 50%; border-top-left-radius: 10px; border-top-right-radius: 10px;" @click="addStaff() ">Добавить сотрудника</button>

<div style=" width: 95% !important; overflow: auto; position: relative; left: 50%; transform: translate(-50%,0);">
    <table class="staff_table table">
        <thead class="head-staff"> 
        <th>Фото</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Отчество</th>
        <th>Должность</th>
        <th>Почта</th>
        <th>Отдел</th>
        <th>Телефон корпоративный</th>
        <th>Телефон личный</th>
        <th>Внутренний номер</th>
        <th>Время работы</th>
        <th>Начальник</th>
        <th>Редактировать</th>
        <th>Удалить</th>
        </thead>

        <tbody style="max-width: 90% !important;">
            <tr v-for="staff in all_staff" :key="staff.id">
                <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-if="staff.manager != null">{{staff.manager.photo}}</td>
                    <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-else>—</td>

                <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;">{{staff.last_name}}</td>
                <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;">{{staff.first_name}}</td>
                <td style="padding: 0 !important;vertical-align: middle; align-items: center; justify-content: center; ">{{staff.middle_name}}</td>
                <td style="padding: 0 !important;vertical-align: middle; align-items: center; justify-content: center; ">{{staff.post}}</td>
                <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;">{{staff.email}}</td>
                <td style="padding: 0 !important;vertical-align: middle; align-items: center; justify-content: center; ">
            <span v-if="staff.groups[0] == 1">admin</span>
            <span v-if="staff.groups[0] == 3">Бухгалтерия</span> 
            <span v-if="staff.groups[0] ==  4">Коммерческий департамент</span>
            <span v-if="staff.groups[0] == 5">Коммерческий отдел</span>
            <span v-if="staff.groups[0] ==  6">Сектор по работе с универсальными грузами</span>
            <span v-if="staff.groups[0] == 7">Административно-хозяйственный отдел</span>
            <span v-if="staff.groups[0] == 8">Обособленное подразделение в г. Нижнекамске</span>
            <span v-if="staff.groups[0] == 9">Департамент логистики</span>
            <span v-if="staff.groups[0] == 10">Отдел логистики</span>
            <span v-if="staff.groups[0] == 11">Руководство</span>
            <span v-if="staff.groups[0] ==  12">Обособленное подразделение в г. Набережные Челны</span>
            <span v-if="staff.groups[0] ==  13">Отдел по работе с персоналом</span>
            <span v-if="staff.groups[0] == 14">Управление эксплуатации и ремонта подвижного состава</span>
            <span v-if="staff.groups[0] == 15">Отдел материально-технического обеспечения</span>
            <span v-if="staff.groups[0] ==  16">Сектор по заготовке и реализации металлолома</span>
            <span v-if="staff.groups[0] ==  17">Отдел ремонта подвижного состава</span>
            <span v-if="staff.groups[0] == 18">Отдел по организации взаиморасчетов с ремонтными предприятиями</span>
            <span v-if="staff.groups[0] ==  19">Финансовая служба</span>
            <span v-if="staff.groups[0] ==  20">Отдел по работе с банками</span>
            <span v-if="staff.groups[0] ==  21">Финансово-экономический отдел</span>
            <span v-if="staff.groups[0] ==  22">Департамент организации перевозок</span>
            <span v-if="staff.groups[0] ==  23">Отдел по перевозке наливных грузов</span>
            <span v-if="staff.groups[0] ==  24">Диспетчерский центр</span>
            <span v-if="staff.groups[0] ==  25">Отдел аренды и приобретения подвижного состава</span>
            <span v-if="staff.groups[0] == 26"> Отдел маркетинга и рекламы</span>
            <span v-if="staff.groups[0] ==  27">Отдел информационных технологий</span>
            <span v-if="staff.groups[0] ==  28">Обособленное подразделение в г. Кемерово</span>
            <span v-if="staff.groups[0] ==  29">Отдел по работе с нефтеналивными грузами</span>
            <span v-if="staff.groups[0] ==  30">Правовое управление</span>
            <span v-if="staff.groups[0] ==  31">Обособленное подразделение в г. Москва</span>
            <span v-if="staff.groups[0] ==  32">Служба охраны труда</span>
            <span v-if="staff.groups[0] ==  33">Отдел перевозок в универсальном подвижном составе</span>
            <span v-if="staff.groups[0] ==  34">Служба безопасности</span>
            <span v-if="staff.groups[0] ==  35">Отдел экономической безопасности</span>
            <span v-if="staff.groups[0] ==  36"> Управление взаиморасчетов</span>
            <span v-if="staff.groups[0] ==  37">Сектор обеспечения перевозок</span>
            <span v-if="staff.groups[0] ==  38">Сектор взаиморасчетов с клиентами</span>
            <span v-if="staff.groups[0] ==  39"> 1С:БУ</span>
            <span v-if="staff.groups[0] ==  40">Отдел кадров</span>
                    </td>
                <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-if="staff.manager != null">{{staff.phone_corp}}</td>
                    <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-else>—</td>
                <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-if="staff.manager != null">{{staff.phone_personal}}</td>
                    <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-else>—</td>
                <td style="padding: 0 !important;vertical-align: middle; align-items: center; justify-content: center; " v-if="staff.manager != null">{{staff.inner_number}}</td>
                    <td v-else>—</td>
                <td style="padding: 0 !important;vertical-align: middle; align-items: center; justify-content: center; " v-if="staff.manager != null">{{staff.schedule}}</td>
                    <td v-else>—</td>  
                <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-if="staff.manager != null">{{staff.manager}}</td>
                    <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-else>—</td>  
                <td><button class="Request" @click="openChangePage(staff.id)">Редактировать</button></td>
                <td><button class="Delete" @click="getCurrentUser(staff.id)">Удалить</button></td>
            </tr>
        </tbody>
    </table>
</div>

<section  style="display:block" id="loaderStaff" v-if="loaderStaff">

<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
 <path fill="#C04945" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#ECECEC" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="-360 50 50" 
         repeatCount="indefinite" />
  </path>
 <path fill="#3D70A8" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="2s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>
  
 
</section> 

<div class="wrapper_staff" style="display: block" v-if="wrapper_staff">
    <div class="modal_staff">
        <h2>Удаление сотрудника</h2>
        <p>Вы уверены, что хотите <span style="color: #C04945; font-weight: bold">удалить</span></p>
            <div style=" width: 98% !important; overflow: auto; position: relative; left: 50%; transform: translate(-50%,0);">
                <table class="staff_table table">
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Должность</th>
                        <!-- <th>Отдел</th> -->
                    </tr>
                    <tr>
                        <td>{{current_user_staff.last_name}}</td>
                        <td>{{current_user_staff.first_name}}</td>
                        <td>{{current_user_staff.middle_name}}</td>
                        <td>{{current_user_staff.post}}</td>
                        <!-- <td>{{current_user_staff.groups[0]}}</td> -->
                    </tr>
                </table>   
            </div>  
            <div class="btn-staff-group container">
                <button class="Cancel" style="width: 30%" @click="closeStaffModalDelete()">Отмена</button>
                <button class="Accept" style="width: 30%" @click="deleteCurrentUser(current_user_staff.id)">Подтвердить</button>
            </div>  
    </div>
</div>

<div class="wrapper_staff" style="display: block" v-if="staff_change">
    <div class="modal_staff" style="width: 90%">
        <h2>Редактирование</h2>
        <p>Кликните на поле которое необходимо редактировать</p>

             <div style=" width: 98% !important; overflow: auto; position: relative; left: 50%; transform: translate(-50%,0);">
                <table class="staff_table table">
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Должность</th>
                        <th>Почта</th>
                        <th>Отдел</th>
            
                    </tr>
                    <tr>
                        <td>{{current_user_staff.last_name}}<input type="text" v-model="last_name_change"></td>
                        <td>{{current_user_staff.first_name}}<input type="text" v-model="first_name_change"></td>
                        <td>{{current_user_staff.middle_name}}<input type="text" v-model="middle_name_change"></td>
                        <td>{{current_user_staff.post}}<input type="text" v-model="post_change"></td>
                        <td>{{current_user_staff.email}}<input type="text" v-model="email_change"></td>
                        <td>
                            <span v-if="current_user_staff.groups[0] == 1">admin</span>
                            <span v-if="current_user_staff.groups[0] == 3">Бухгалтерия</span> 
                            <span v-if="current_user_staff.groups[0] ==  4">Коммерческий департамент</span>
                            <span v-if="current_user_staff.groups[0] == 5">Коммерческий отдел</span>
                            <span v-if="current_user_staff.groups[0] ==  6">Сектор по работе с универсальными грузами</span>
                            <span v-if="current_user_staff.groups[0] == 7">Административно-хозяйственный отдел</span>
                            <span v-if="current_user_staff.groups[0] == 8">Обособленное подразделение в г. Нижнекамске</span>
                            <span v-if="current_user_staff.groups[0] == 9">Департамент логистики</span>
                            <span v-if="current_user_staff.groups[0] == 10">Отдел логистики</span>
                            <span v-if="current_user_staff.groups[0] == 11">Руководство</span>
                            <span v-if="current_user_staff.groups[0] ==  12">Обособленное подразделение в г. Набережные Челны</span>
                            <span v-if="current_user_staff.groups[0] ==  13">Отдел по работе с персоналом</span>
                            <span v-if="current_user_staff.groups[0] == 14">Управление эксплуатации и ремонта подвижного состава</span>
                            <span v-if="current_user_staff.groups[0] == 15">Отдел материально-технического обеспечения</span>
                            <span v-if="current_user_staff.groups[0] ==  16">Сектор по заготовке и реализации металлолома</span>
                            <span v-if="current_user_staff.groups[0] ==  17">Отдел ремонта подвижного состава</span>
                            <span v-if="current_user_staff.groups[0] == 18">Отдел по организации взаиморасчетов с ремонтными предприятиями</span>
                            <span v-if="current_user_staff.groups[0] ==  19">Финансовая служба</span>
                            <span v-if="current_user_staff.groups[0] ==  20">Отдел по работе с банками</span>
                            <span v-if="current_user_staff.groups[0] ==  21">Финансово-экономический отдел</span>
                            <span v-if="current_user_staff.groups[0] ==  22">Департамент организации перевозок</span>
                            <span v-if="current_user_staff.groups[0] ==  23">Отдел по перевозке наливных грузов</span>
                            <span v-if="current_user_staff.groups[0] ==  24">Диспетчерский центр</span>
                            <span v-if="current_user_staff.groups[0] ==  25">Отдел аренды и приобретения подвижного состава</span>
                            <span v-if="current_user_staff.groups[0] == 26"> Отдел маркетинга и рекламы</span>
                            <span v-if="current_user_staff.groups[0] ==  27">Отдел информационных технологий</span>
                            <span v-if="current_user_staff.groups[0] ==  28">Обособленное подразделение в г. Кемерово</span>
                            <span v-if="current_user_staff.groups[0] ==  29">Отдел по работе с нефтеналивными грузами</span>
                            <span v-if="current_user_staff.groups[0] ==  30">Правовое управление</span>
                            <span v-if="current_user_staff.groups[0] ==  31">Обособленное подразделение в г. Москва</span>
                            <span v-if="current_user_staff.groups[0] ==  32">Служба охраны труда</span>
                            <span v-if="current_user_staff.groups[0] ==  33">Отдел перевозок в универсальном подвижном составе</span>
                            <span v-if="current_user_staff.groups[0] ==  34">Служба безопасности</span>
                            <span v-if="current_user_staff.groups[0] ==  35">Отдел экономической безопасности</span>
                            <span v-if="current_user_staff.groups[0] ==  36"> Управление взаиморасчетов</span>
                            <span v-if="current_user_staff.groups[0] ==  37">Сектор обеспечения перевозок</span>
                            <span v-if="current_user_staff.groups[0] ==  38">Сектор взаиморасчетов с клиентами</span>
                            <span v-if="current_user_staff.groups[0] ==  39"> 1С:БУ</span>
                            <span v-if="current_user_staff.groups[0] ==  40">Отдел кадров</span>
                            <!-- {{current_user_staff.groups[0]}} -->
                            <select v-model="groups_change" style="height:40px; margin-top: 10px; cursor: pointer;">
                                <option 
                                v-for="userGroup in addUserGroups"
                                :key="userGroup.id"
                                :value="[userGroup.id]">{{userGroup.name}}</option>
                            </select>
                            
                        
                        </td>
                    </tr>
                </table>   

                <table  class="staff_table table">
                    <tr> 
                        <th>Телефон корпоративный</th>
                        <th>Телефон личный</th>
                        <th>Внутренний номер</th>
                        <th>Время работы</th>
                        <th>Начальник</th>
                    </tr>

                    <tr>
                        <td>{{current_user_staff.phone_corp}}<input type="text"  v-model="phone_corp_change"></td>
                        <td>{{current_user_staff.phone_personal}}<input type="text"  v-model="phone_personal_change"></td>
                        <td>{{current_user_staff.inner_number}}<input type="text" v-model="inner_number_change"></td>
                        <td>{{current_user_staff.schedule}}<input type="text"  v-model="schedule_change"></td>
                        <td>{{current_user_staff.manager}}<input type="text"  v-model="manager_change"></td>
                    </tr>
                </table>
            </div>  
            <div class="btn-staff-group container">
                <button class="Cancel" style="width: 30%" @click="closeStaffModalChange()">Отмена</button>
                <button class="Accept" style="width: 30%" @click="changeStaff(current_user_staff.id)">Подтвердить</button>
            </div>  
    </div>
</div>

<div class="wrapper_staff" style="display: block;" v-if="add_staff">
    <div class="modal_staff" style="width: 95%;">
        <h2>Добавление сотрудника</h2>
            <div style=" width: 98% !important; overflow: auto; position: relative; left: 50%; transform: translate(-50%,0);">
                <table class="staff_table table">
                    <tr>
                        <th  style="background: #EBEBEB; width: 5% !important;">Фото</th>
                        <th  style="background: #EBEBEB; width: 10% !important;">Фамилия</th>
                        <th  style="background: #EBEBEB; width: 10% !important;">Имя</th>
                        <th  style="background: #EBEBEB; width: 10% !important;">Отчество</th>
                        <th  style="background: #EBEBEB; width: 10% !important;">Должность</th>
                        <th  style="background: #EBEBEB; width: 10% !important;">Почта</th>
                       
                    </tr>
                    <tr>
                        <td style=" width: 5% !important;">
                            
                            <input type="file" @change="onFileSelected" multiple>
                        
                        </td>
                        <td style=" width: 10% !important;"><input type="text" v-model="last_name" placeholder="Иванов"></td>
                        <td style=" width: 10% !important;"><input type="text" v-model="first_name" placeholder="Иван"></td>
                        <td style=" width: 10% !important;"><input type="text" v-model="middle_name" placeholder="Иванович"></td>
                        <td style=" width: 10% !important;"><input type="text" v-model="post" placeholder="Логист"></td>
                        <td style=" width: 10% !important;"><input type="text" v-model="email" placeholder="i.ivanov@tehtrans.com"></td>
                    </tr>
          
                </table>   
                <br><br>
                <table  class="staff_table table"> 
                    <tr>
                        <th  style="background: #EBEBEB">Отдел</th>
                        <th  style="background: #EBEBEB">Телефон корпоративный</th>
                        <th  style="background: #EBEBEB">Телефон личный</th>
                        <th  style="background: #EBEBEB">Внутренний номер</th>
                        <th  style="background: #EBEBEB">Время работы</th>
                        <th  style="background: #EBEBEB" >Начальник</th>
                    </tr>
                    <tr>
                        <td><select v-model="groups" style="margin-top: 5%; height: 45px; cursor: pointer">
                            <option value="">Выберите отдел</option>
                            <option 
                                v-for="userGroup in addUserGroups"
                                :key="userGroup.id"
                                :value="userGroup.id">{{userGroup.name}}</option>
                        </select></td>
                        <td><input type="text" v-model="phone_corp"  placeholder="89999999999"></td>
                        <td><input type="text" v-model="phone_personal"  placeholder="89999999999"></td>
                        <td><input type="text" v-model="inner_number"  placeholder="007"></td>
                        <td><input type="text" v-model="schedule"  placeholder="9:00 - 18:00"></td>
                        <td>
                            <select type="text" v-model="manager"  style="margin-top: 5%; height: 45px; cursor: pointer">
                            <option value="">Выберите начальника</option>
                            <option
                                v-for="manager in allManagerStaff"
                                :key="manager.id"
                                :value="manager.id">{{manager.first_name}} {{manager.middle_name}} {{manager.last_name}}</option>
                            </select>
                        </td>

                    </tr>
                </table>
            </div>  
            <div class="btn-staff-group container">
                <button class="Cancel" style="width: 30%" @click="closeAddUser()">Отмена</button>
                <button class="Accept" style="width: 30%" @click="addUser()">Добавить</button>
            </div>  
    </div>
</div>

<Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" id="notif"/>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/api/staff'
import FilterStaff from '@/components/filter/FilterStaff.vue'
import Notifications from '@/components/notifications/Notifications.vue'
export default {
    name: 'StaffTable',
    components: {FilterStaff, Notifications},
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        })
    },
    data(){
        return {
            // v-model редактирования
            last_name_change: '',
            first_name_change: '',
            middle_name_change: '',
            post_change: '',
            email_change: '',
            groups_change: '',
            phone_corp_change: '',
            phone_personal_change: '',
            inner_number_change: '',
            schedule_change: '',
            manager_change: '',

            all_staff: '',
            loaderStaff: false,
            current_user_staff: '',
            wrapper_staff: false,
           
            staff_change: false,
            add_staff: false,

            photo: null,
            first_name: '',
            second_name: '',
            last_name: '',
            middle_name: '',
            post: '',
            email: '',
            groups: '',
            phone_corp: '',
            phone_personal: '',
            inner_number: '',
            schedule: '',
            manager: '',

            filter_staff: null,

            addUserGroups: '',

            allManagerStaff: '',

            // Уведомления
            showNotify: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',

           

        }
    },
    mounted() {
        this.loaderStaff = true
        api.getStaffGroup()
        .then((response) => {
            this.addUserGroups = response.data.data
        }).catch(err => {
            this.loaderStaff = false
            console.log(err)
        }),
        api.getAllManager()
        .then((response) => {
            this.loaderStaff = false
            this.allManagerStaff = response.data.data
        }).catch(err => {
            this.loaderStaff = false
            console.log(err)
        })
        // api.staffGlobal()
        // .then((response) => {
        //     this.staffGlobal = response.data
        // })
        

    },
    methods: {
        onFileSelected(event){
            this.photo = event.target.photo[0]
        },
        updateFiltersStaff(filter_staff){
            this.filter_staff = filter_staff
        },

        allStaff(){
            this.loaderStaff = true
            api.getAllStaff(this.filter_staff)
            .then((response) => {
                this.all_staff = response.data.data
                this.loaderStaff = false
            }).catch(err => {
                console.log(err)
                this.loaderStaff = false
            })
        },

        closeStaffModalDelete() {
            this.wrapper_staff = false
        },

        closeStaffModalChange(){
            this.staff_change = false
        },
        closeAddUser(){
            this.add_staff = false
        },
        // получение пользователя подлежащего удалению
        getCurrentUser(id){
          this.loaderStaff = true
          this.wrapper_staff = true
          api.currentUser(id)
          .then((response) => {
             this.loaderStaff = false
             this.current_user_staff = response.data
          })
        },
        // Удаление текущего пользователя
        deleteCurrentUser(id){
            this.loaderStaff = true
            api.deleteUser(id)
            .then((response) => {
                this.wrapper_staff = false
                this.showNotify = true
                this.notifyHead = 'Успешно'
                this.notifyMessage = 'Пользователь удален'
                this.notifyClass = 'wrapper-success'
                this.loaderStaff = false
                setTimeout(this.closeNotification, 1500)
                this.allStaff()
            })
        },
        // Открыть страницу редактирования
        openChangePage(id){
           this.loaderStaff = true
           this.staff_change = true
            api.currentUser(id)
                .then((response) => {
                this.loaderStaff = false
                this.current_user_staff = response.data
                })
        },
        // Подтвердить редактирование
        changeStaff(id){
            this.loaderStaff = true
            this.staff_change = true
            api.changeUserData(id, {
            "last_name":this.last_name_change,
            "first_name" : this.first_name_change,
            "middle_name" : this.middle_name_change,
            "post": this.post_change,
            "email":this.email_change,
            "groups":this.groups_change,
            "phone_corp":this.phone_corp_change,
            "phone_personal": this.phone_personal_change,
            "inner_number":this.inner_number_change,
            "schedule":this.schedule_change,
            "manager":this.manager_change,
            })
                .then((response) => {
                    this.showNotify = true
                    this.notifyHead = 'Успешно'
                    this.notifyMessage = 'Пользователь изменен'
                    this.notifyClass = 'wrapper-success'
                    setTimeout(this.closeNotification, 1500)
                    this.allStaff()
                    this.loaderStaff = false
                    this.staff_change = false
                })
        },
        closeNotification(){
            document.getElementById('notif').style.display = 'none'
        },
        // ОТКРЫТЬ ОКНО ДОБАВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ
        addStaff(){
            this.add_staff = true
        },
        // ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
    addUser(){
            event.preventDefault()
            const pretoken = JSON.parse(localStorage.getItem("vuex"))
            const token = pretoken.auth.user.token
            this.loaderStaff = true
            const fd = new FormData()
            fd.append('image', this.photo)

        fetch('http://10.1.5.65/api/personal/users/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${token}` 
            },
            body: JSON.stringify({
            "photo": fd,
            "email": this.email,
            "first_name": this.first_name,
            "last_name": this.last_name,
            "middle_name": this.middle_name,
            "post": this.post,
            "groups": [this.groups],
            "phone_corp": this.phone_corp,
            "phone_personal": this.phone_personal,
            "inner_number": this.inner_number,
            "schedule": this.schedule,
            "manager": this.manager 
        })
        })
        .then((response) => {
            if (response.ok){
                return response.json().then((data)=>{
                    this.showNotify = true
                    this.notifyHead = 'Успешно'
                    this.notifyMessage = 'Пользователь добавлен'
                    this.notifyClass = 'wrapper-success'
                    this.allStaff()
                    setTimeout(this.closeNotification, 1500)
                    this.add_staff = false
                    this.loaderStaff = false
                })
            }
            else{
                console.log(response)
                this.loaderStaff = false
                this.add_staff = false

            }
        })
                }
     
    }
}
</script>


<style>
th {
    background: #EBEBEB !important;
}
.staff_table {
    position: relative;
    left: 50%;
    transform: translate(-50%,0);

    text-align: center !important;
    border-bottom: solid 3px #c04945 !important;
    /* padding: 8px !important; */
    /* font-size: small; */
    background-color: #eee !important;
    color: #000000 !important;
    overflow-x: auto;
    padding: 0 !important;
}

.staffButton {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 95% !important;
}
.staff_table>td{
    display: flex;
    align-items: center;
  justify-content: center;
}
tr:hover {
  background-color: #eee !important;
  outline: solid 1px #c04945  !important;
  cursor: pointer;
}
.head-staff>th {
    background: #ebebeb;
    border: 1px solid grey;
    align-items: center;
  justify-content: center;
  border-bottom: solid 3px #c04945 !important;
}
.wrapper_staff {
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    background: rgb(105, 105, 105, 0.7);
    z-index: 1;
}
.modal_staff {
    background: rgb(255, 255, 255);
    position: fixed;
    top: 10%;
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    width: 50%;
    z-index: 2;
    height: 80%;
}
.modal_staff>p {
   text-align: center;
}

#loaderStaff{
    width: 100vw;
    height: 100vh;
    background: rgb(17, 17, 17, 0.1);
    display: flex;
    position: fixed !important;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 9999999999999;

}
#loaderStaff svg{
    width: 120px;
    height: 120px;
    display: inline-block;
    position: relative !important;
    left: 50% !important;
    transform: translate(-50%,0) !important;
    margin-top: 15%;
}
.btn-staff-group {
    display: flex;
    justify-content: space-between;
}
/* td,th {
    padding: 0 !important;
    margin: 0 !important;
} */
</style>
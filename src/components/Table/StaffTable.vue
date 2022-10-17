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
            <td style="padding: 0 !important;vertical-align: middle; align-items: center; justify-content: center; ">{{staff.groups[0]}}</td>
            <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-if="staff.manager != null">{{staff.manager.phone_corp}}</td>
                <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-else>—</td>
            <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-if="staff.manager != null">{{staff.manager.phone_personal}}</td>
                <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-else>—</td>
            <td style="padding: 0 !important;vertical-align: middle; align-items: center; justify-content: center; " v-if="staff.manager != null">{{staff.manager.inner_number}}</td>
                <td v-else>—</td>
            <td style="padding: 0 !important;vertical-align: middle; align-items: center; justify-content: center; " v-if="staff.manager != null">{{staff.manager.schedule}}</td>
                <td v-else>—</td>  
            <td style="padding: 0 !important; vertical-align: middle; align-items: center; justify-content: center;" v-if="staff.manager != null">{{staff.manager.last_name}} {{staff.manager.first_name}} {{staff.manager.middle_name}}</td>
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
                        <th>Телефон корпоративный</th>
                        <th>Телефон личный</th>
                        <th>Внутренний номер</th>
                        <th>Время работы</th>
                        <th>Начальник</th>
                    </tr>
                    <tr>
                        <td>{{current_user_staff.last_name}}</td>
                        <td>{{current_user_staff.first_name}}</td>
                        <td>{{current_user_staff.middle_name}}</td>
                        <td>{{current_user_staff.post}}</td>
                        <td>{{current_user_staff.groups[0]}}</td>
                        <!-- <td v-if="current_user_staff.manager != null">{{current_user_staff.manager.phone_corp}}</td>
                        <td v-if="current_user_staff.manager != null">{{current_user_staff.manager.phone_personal}}</td>
                        <td v-if="current_user_staff.manager != null">{{current_user_staff.manager.inner_number}}</td>
                        <td v-if="current_user_staff.manager != null">{{current_user_staff.manager.schedule}}</td>
                        <td v-if="current_user_staff.manager != null">{{current_user_staff.manager.last_name}} {{current_user_staff_change.manager.first_name}} {{current_user_staff_change.manager.middle_name}}</td> -->
        
                    </tr>
                    <!-- <tr>
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
                    </tr>
                    <tr v-for="current_user_staff_change in current_user_staff_change_all" :key="current_user_staff_change">
                        <td><input type="text" v-bind="current_user_staff_change.last_name"></td>
                        <td><input type="text" v-bind="current_user_staff_change.first_name"></td>
                        <td>{{current_user_staff_change.middle_name}}</td>
                        <td>{{current_user_staff_change.post}}</td>
                        <td>{{current_user_staff_change.email}}</td>
                        <td>{{current_user_staff_change.groups}}</td>
                        <td v-if="staff.manager != null">{{current_user_staff_change.manager.phone_corp}}</td>
                        <td v-if="staff.manager != null">{{current_user_staff_change.manager.phone_personal}}</td>
                        <td v-if="staff.manager != null">{{current_user_staff_change.manager.inner_number}}</td>
                        <td v-if="staff.manager != null">{{current_user_staff_change.manager.schedule}}</td>
                        <td v-if="staff.manager != null">{{current_user_staff_change.manager.last_name}} {{current_user_staff_change.manager.first_name}} {{current_user_staff_change.manager.middle_name}}</td>
                      
                    </tr> -->
                </table>   
            </div>  
            <div class="btn-staff-group container">
                <button class="Cancel" style="width: 30%" @click="closeStaffModalChange()">Отмена</button>
                <button class="Accept" style="width: 30%">Подтвердить</button>
            </div>  
    </div>
</div>

<div class="wrapper_staff" style="display: block;" v-if="add_staff">
    <div class="modal_staff" style="width: 95%;">
        <h2>Добавление сотрудника</h2>
            <div style=" width: 98% !important; overflow: auto; position: relative; left: 50%; transform: translate(-50%,0);">
                <table class="staff_table table">
                    <tr>
                        <th style="width: 40px">Фото</th>
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
                        <th colspan="3">Начальник</th>
                    </tr>
                    <tr>
                        <td><input type="file" name="user_photo"></td>
                        <td><input type="text" v-model="last_name" placeholder="Иванов"></td>
                        <td><input type="text" v-model="second_name" placeholder="Иван"></td>
                        <td><input type="text" v-model="middle_name" placeholder="Иванович"></td>
                        <td><input type="text" v-model="post" placeholder="Логист"></td>
                        <td><input type="text" v-model="email" placeholder="i.ivanov@tehtrans.com"></td>
                        <td><input type="text" v-model="groups" placeholder="Руководство"></td>
                        <td><input type="text" v-model="phone_corp"  placeholder="89999999999"></td>
                        <td><input type="text" v-model="phone_personal"  placeholder="89999999999"></td>
                        <td><input type="text" v-model="inner_number"  placeholder="007"></td>
                        <td><input type="text" v-model="schedule"  placeholder="9:00 - 18:00"></td>
                        <td><input type="text" v-model="manager_last_name" placeholder="Ф"></td>
                        <td><input type="text" v-model="manager_first_name" placeholder="И"></td>
                        <td><input type="text" v-model="manager_middle_name" placeholder="О"></td>


                    </tr>

                </table>   
            </div>  
            <div class="btn-staff-group container">
                <button class="Cancel" style="width: 30%" @click="closeAddUser()">Отмена</button>
                <button class="Accept" style="width: 30%" @click="addUser()">Добавить</button>
            </div>  
    </div>
</div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/api/staff'
import FilterStaff from '@/components/filter/FilterStaff.vue'
export default {
    name: 'StaffTable',
    components: {FilterStaff},
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        })
    },
    data(){
        return {
            all_staff: '',
            loaderStaff: false,
            current_user_staff: '',
            wrapper_staff: false,
           
            staff_change: false,
            add_staff: false,

            first_name: '',
            second_name: '',
            last_name: '',
            middle_name: '',
            post: '',
            email: '',
            groups: '',
            // phone_corp: '',
            // phone_personal: '',
            // inner_number: '',
            // schedule: '',
            // manager_last_name: '',
            // manager_first_name: '',
            // manager_middle_name: '',

            filter_staff: null

        }
    },

    methods: {
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
        getCurrentUser(id){
          this.loaderStaff = true
          this.wrapper_staff = true
          api.currentUser(id)
          .then((response) => {
             this.loaderStaff = false
             this.current_user_staff = response.data
          })

        },
        deleteCurrentUser(id){
            api.deleteUser(id)
            .then((response) => {
                window.location.reload()
                this.wrapper_staff = false

            })
        },
        openChangePage(id){
           this.loaderStaff = true
           this.staff_change = true
            api.currentUser(id)
                .then((response) => {
                this.loaderStaff = false
                this.current_user_staff = response.data
                })
        },
        addStaff(){
            this.add_staff = true
        },
        addUser(){
            event.preventDefault()
            const pretoken = JSON.parse(localStorage.getItem("vuex"))
            const token = pretoken.auth.user.token
            this.loaderStaff = true

        fetch('http://10.1.5.65/api/personal/users/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${token}` 
            },
            body: JSON.stringify({
            "email": this.email,
            "first_name": this.first_name,
            "last_name": this.last_name,
            "middle_name": this.middle_name,
            "post": this.post
 
        })
        })
        .then((response) => {
            if (response.ok){
                return response.json().then((data)=>{
                    this.loaderStaff = false
                })
            }
            else{
                console.log(response)
                this.loaderStaff = false

            }
        })
                }
     
    }
}
</script>


<style>
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
    top: 25%;
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    width: 50%;
    z-index: 2;
    height: 50%;
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
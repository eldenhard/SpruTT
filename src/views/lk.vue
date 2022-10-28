<template>
    <div>
    <h2>Личный кабинет</h2>
<br><br>
    <div class="contact-information">

    <h4><span style="border-bottom: 2px solid #EC2332">Контактная информация</span></h4>

    <br>
    <p class="contact-var"> <span class="contact-header">ФИО: </span>{{PersonalData.last_name}} {{PersonalData.first_name}} {{PersonalData.middle_name}}</p>
    <p class="contact-var"><span class="contact-header">Должность: </span>{{PersonalData.post}}</p>
    <p class="contact-var" v-for="personal in PersonalData.groups" :key="personal.id">
        <span class="contact-header" style="font-weight: 500; font-size: 15px;">Отдел:  {{getGroupName(personal)}}</span>
    </p>
    <p class="contact-var"><span class="contact-header">Почта: </span>{{PersonalData.email}}</p>
    <h4><span style="border-bottom: 2px solid #EC2332">Сотрудники в подчинении</span></h4>
    <br>
    <table style="width: 50%">
        <tr>
            <td style="font-weight: bold">ФИО</td>
            <td style="font-weight: bold">Должность</td>
            <td style="font-weight: bold">Почта</td>
        </tr>

        <tr  v-for="em in emp" :key="em.post">
            <td>{{em.last_name}} {{em.first_name}} {{em.middle_name}}</td>
            <td>{{em.post}}</td>

            <td>{{em.email}}</td>
        </tr>
    </table>
    


    </div>

    <br><br>
 
    <div class="wrapper-alert" id="notifications-2" style="display: none;">
<div class="card">
    <div class="subject">
    <h5>Ошибка</h5>
    <p>Попробуйте получить доступ к личному кабинету позже</p>
    </div>
</div>
</div>

<section id="loading-page-report" style="display:block" v-if="loaderLK">
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
<br>

</section>

</div>
</template>

<script>
import {mapState} from 'vuex'
import api from '@/api/report'
import {getGroupName} from '@/helpers/getGroupName'
export default {
    name: 'lk',
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
            allGroups: state => state.auth.groups
        })
    },
    data(){
        return{
            // id: [],
            PersonalData: '',
            emp: '',
            loaderLK: false
        }
    },
mounted(){
    this.loaderLK = true
    api.getUsersLK(this.uid)
    .then((response) => {
        this.PersonalData = response.data
    
    })
    api.getManagerLK(this.uid)
    .then((response) => {
        this.emp= response.data.data
        this.loaderLK = false
    })
    document.title = 'Личный кабинет'

},
    methods: {
        Notif(){
            document.getElementById('notifications-2').style.display = 'none'
        },
        getGroupName(id){
            const group =  getGroupName(this.allGroups, id)
            return group[0]?.name
        }
    }

    }

</script>


<style>
.contact-var  {
    font-size: 20px;
}
.contact-information {
   position: relative;
   left:50%;
   transform: translate(-50%,0);
    width: 90%;
    padding: 0 !important;
    margin: 0 !important;
}
.contact-header {
    font-weight: bold;
    font-size: 15px;
    padding: 0 !important;
    margin: 0 !important;
}
.report-link {
    margin-top: 1%;
}    
#loading-page-report {
    width: 100vw;
    height: 100vh;
    background: rgb(17, 17, 17, 0.1);
    display: flex;
    position: fixed;
    top: 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 9999999999999;

}
#loading-page-report svg{
    width: 120px;
    height: 120px;
    display: inline-block;
    position: relative !important;
    left: 50% !important;
    transform: translate(-50%,0) !important;
    margin-top: 15%;
}


</style>
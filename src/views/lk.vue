<template>
    <div>
    <h2>Личный кабинет</h2>
<br><br>
    <div class="contact-information">
    <h4>Контактная информация</h4>
    <br>
    <p class="contact-var"> <span class="contact-header">ФИО: </span>{{PersonalData.last_name}} {{PersonalData.first_name}} {{PersonalData.middle_name}}</p>
    <p class="contact-var"><span class="contact-header">Должность: </span>{{PersonalData.post}}</p>
    <p class="contact-var"> <span class="contact-header">Отдел: </span>{{PersonalData.groups}}</p>
    <!-- <p class="contact-var"> <span class="contact-header">Начальник: </span>{{PersonalData.manager}}</p> -->
    <p class="contact-var"><span class="contact-header">Почта: </span>{{PersonalData.email}}</p>

    </div>

    <br><br>
    <!-- <table style="position: relative; left:50%; transform: translate(-50%,0); width: 90%;" class="table1">
        <thead style="border-bottom: 2px solid #C04945; background:#EEEEEE">
            <tr>
                <th>Имя менеджера</th>
                <th>Фамилия менеджера</th>
    
                <th>Имя сотрудника</th>
                <th>Фамилия сотрудника</th>
  
                <th>Создатель</th>
                <th>Файл</th>
            </tr>
        </thead>
        <tbody>
        <tr  v-for="report in all_reports" :key="report.id">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><a download target="_blank" :href="report.file" v-if="report.file"><img src="../assets/excel.png" alt="" width="30%"></a></td>
        </tr>
        </tbody>
    </table> -->

    <div class="wrapper-alert" id="notifications-2" style="display: none;">
<div class="card">
    <div class="subject">
    <h5>Ошибка</h5>
    <p>Попробуйте получить доступ к личному кабинету позже</p>
    </div>
</div>
</div>

<section id="loading-page-report" style="display:none">
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
export default {
    name: 'lk',
    computed: {
        ...mapState({
            id: state=> state.auth.uid
        })
    },
    data(){
        return{
            'id': [],
            PersonalData: ''
        }
    },
mounted(){
    const token = JSON.parse(localStorage.getItem("accessToken"))
    // const token = pretoken.user.token
    const preid = JSON.parse(localStorage.getItem('vuex'))
    const id = preid.auth.uid

    document.getElementById('loading-page-report').style.display = 'block'
    // fetch('http://10.1.5.65/api/reports/kpi/', {
    // headers: {
    //     'Authorization': `Basic ${token}` 
    // },
    // method: 'GET'
    // })
    // .then((response) => {
    //     if (response.ok){
    //         return response.json().then(r=>{
    //             this.all_reports = r.data.data;
    //             document.getElementById('loading-page-report').style.display = 'none'
    //             console.log(this.all_reports)
    //     })
    // }
    //        else{
    //            console.log('NOT OK')
    //            document.getElementById('loading-page-report').style.display = 'none'

    //        }
    //    }),
     
    fetch('http://10.1.5.65/api/personal/users/'+ `${id}`, {
    headers: {
        'Authorization': `Basic ${token}` 
    },
    method: 'GET'
    })
    .then((response) => {
                if (response.ok){
                    return response.json().then(r=>{
                        this.PersonalData = r;
                        document.getElementById('loading-page-report').style.display = 'none'
                        console.log(this.PersonalData)
               })
           }
           else{
               console.log('NOT OK')
               document.getElementById('loading-page-report').style.display = 'none'
               document.getElementById('notifications-2').style.display = 'block'
               setTimeout(this.Notif, 2500)

           }
       })
    },
    methods: {
        Notif(){
            document.getElementById('notifications-2').style.display = 'none'

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
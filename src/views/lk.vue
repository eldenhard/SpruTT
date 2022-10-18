<template>
    <div>
    <h2>Личный кабинет</h2>
<br><br>
    <div class="contact-information">

    <h4><span style="border-bottom: 2px solid #EC2332">Контактная информация</span></h4>

    <br>
    <p class="contact-var"> <span class="contact-header">ФИО: </span>{{PersonalData.last_name}} {{PersonalData.first_name}} {{PersonalData.middle_name}}</p>
    <p class="contact-var"><span class="contact-header">Должность: </span>{{PersonalData.post}}</p>
    <p class="contact-var" v-for="group in PersonalData.groups" :key="group.id">
         <span class="contact-header" >Отдел: </span>
         <span v-if="group == 1">admin</span>
         <span v-if="group == 3">Бухгалтерия</span> 
       <span v-if="group ==  4">Коммерческий департамент</span>
        <span v-if="group == 5">Коммерческий отдел</span>
       <span v-if="group ==  6">Сектор по работе с универсальными грузами</span>
        <span v-if="group == 7">Административно-хозяйственный отдел</span>
        <span v-if="group == 8">Обособленное подразделение в г. Нижнекамске</span>
        <span v-if="group == 9">Департамент логистики</span>
        <span v-if="group == 10">Отдел логистики</span>
        <span v-if="group == 11">Руководство</span>
       <span v-if="group ==  12">Обособленное подразделение в г. Набережные Челны</span>
       <span v-if="group ==  13">Отдел по работе с персоналом</span>
        <span v-if="group == 14">Управление эксплуатации и ремонта подвижного состава</span>
        <span v-if="group == 15">Отдел материально-технического обеспечения</span>
       <span v-if="group ==  16">Сектор по заготовке и реализации металлолома</span>
       <span v-if="group ==  17">Отдел ремонта подвижного состава</span>
        <span v-if="group == 18">Отдел по организации взаиморасчетов с ремонтными предприятиями</span>
       <span v-if="group ==  19">Финансовая служба</span>
       <span v-if="group ==  20">Отдел по работе с банками</span>
       <span v-if="group ==  21">Финансово-экономический отдел</span>
       <span v-if="group ==  22">Департамент организации перевозок</span>
       <span v-if="group ==  23">Отдел по перевозке наливных грузов</span>
       <span v-if="group ==  24">Диспетчерский центр</span>
       <span v-if="group ==  25">Отдел аренды и приобретения подвижного состава</span>
        <span v-if="group == 26"> Отдел маркетинга и рекламы</span>
       <span v-if="group ==  27">Отдел информационных технологий</span>
       <span v-if="group ==  28">Обособленное подразделение в г. Кемерово</span>
       <span v-if="group ==  29">Отдел по работе с нефтеналивными грузами</span>
       <span v-if="group ==  30">Правовое управление</span>
       <span v-if="group ==  31">Обособленное подразделение в г. Москва</span>
       <span v-if="group ==  32">Служба охраны труда</span>
       <span v-if="group ==  33">Отдел перевозок в универсальном подвижном составе</span>
       <span v-if="group ==  34">Служба безопасности</span>
       <span v-if="group ==  35">Отдел экономической безопасности</span>
       <span v-if="group ==  36"> Управление взаиморасчетов</span>
       <span v-if="group ==  37">Сектор обеспечения перевозок</span>
       <span v-if="group ==  38">Сектор взаиморасчетов с клиентами</span>
       <span v-if="group ==  39"> 1С:БУ</span>
       <span v-if="group ==  40">Отдел кадров</span>
       </p>
    <!-- <p class="contact-var"> <span class="contact-header">Начальник: </span>{{PersonalData.manager}}</p> -->
    <p class="contact-var"><span class="contact-header">Почта: </span>{{PersonalData.email}}</p>
    <h4><span style="border-bottom: 2px solid #EC2332">Сотрудники в подчинении</span></h4>
    <br>
    <table style="width: 50%">
        <tr>
            <td style="font-weight: bold">ФИО</td>
            <td style="font-weight: bold">Должность</td>
            <td style="font-weight: bold">Почта</td>
        </tr>

        <tr  v-for="em in emp" :key="em">
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


<!-- <footer style="margin-top: 10%; ">
    <div style="width: 100%; height: 300px;  position: relative;text-align: center;color: white;">
    <img src="../assets/Train.jpg" style="object-fit: cover; width: 100%; height: 100%; filter: grayscale(0.9); ">
    <img src="../assets/photo.png" alt="" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
</div>
</footer> -->
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
            id: [],
            PersonalData: '',
            emp: ''
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

    // ${id}
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
            //    document.getElementById('loading-page-report').style.display = 'none'
               document.getElementById('notifications-2').style.display = 'block'
               setTimeout(this.Notif, 2500)

           }
       }),

fetch('http://10.1.5.65/api/personal/users/?page_size=200&manager='+ `${id}`, {
    headers: {
        'Authorization': `Basic ${token}` 
    },
    method: 'GET'
    })
    .then((response) => {
                if (response.ok){
                    return response.json().then(r=>{
                        this.emp = r.data;
                        document.getElementById('loading-page-report').style.display = 'none'
                        console.log(this.emp)
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
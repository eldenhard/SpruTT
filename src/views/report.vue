<template>
    <div class="lk">
        <h2>Отчеты</h2>
   
        <button class="button Action" @click="OpenKPI()" style="width: 40%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%">{{ btnName }}</button>
        <br><br>
    <form id="Anketa" method="post" style="display: none">
        <br>
    <label  for="admin" style=" position: relative; left: 50%; transform: translate(-50%, 0); width: 100% !important;">

    <p style="text-align:center;">Копия письма: кадровая служба (обязательное поле)</p>    
    <select id="admin" required style="width: 50% !important;" >
        <option selected="selected">{{admin.id}} {{admin.first_name}} {{admin.last_name}}</option>
    </select>
    </label>

<br>
<br>

    <label  for="staff" style=" position: relative; left: 50%; transform: translate(-50%, 0); width: 100% !important;">
        
        <select id="staff" required style="width: 50% !important;">
            <option value="" disabled="disabled" selected="selected">Сотрудник</option>
            <option  v-for="staf in staff" :key="staf.id">{{staf.id}} {{staf.first_name}} {{staf.last_name}}</option>
        </select>
    </label>




        <div id="block-answer">
            <h2>Анкета сотрудника</h2>
      <p class="answer" name="a1">Готовность неукоснительно выполнять все производственные задания, порученные руководителем.</p>

     
        <input type="radio" name="first-question" id="first-question-1"  value="c1" v-model="answer1">
        <label for="first-question-1">&nbsp;Неисполнителен, склонен под любыми предлогами избегать получения новых заданий. Были случаи прямого отказа от выполнения заданий.</label><br>

        <input type="radio" name="first-question" id="first-question-2" value="c2"  v-model="answer1">
        <label  for="first-question-2">&nbsp;Низкий уровень исполнительности. Иногда пытается избежать получения новых заданий, умело находя предлоги</label><br>

        <input type="radio" name="first-question" id="first-question-3"  value="c3"  v-model="answer1">
        <label for="first-question-3" >&nbsp;Хороший уровень исполнительности, но нельзя сказать, что каждый день без исключений. Берется за выполнение любых производственных заданий, но не всегда охотно.</label><br>

        <input type="radio" name="first-question" id="first-question-4"  value="c4"  v-model="answer1">
        <label for="first-question-4" >&nbsp;Безукоризненный уровень исполнительности. Всегда охотно берется за выполнение всех производственных заданий, порученных руководителем.</label><br>
<hr>
       <p class="answer"  name="a2">Способность справляться со своими обязанностями и поручениями. Умение выявлять и решать возникающие в работе проблемы</p>
     
        <input type="radio" name="second-question" id="second-question-1"  value="c1"  v-model="answer2">
        <label for="second-question-1" >&nbsp;Часто не справляется со своими обязанностями и поручениями или заданиями. Не умеет выявлять проблемы и с трудом решает их</label><br>

        <input type="radio" name="second-question" id="second-question-2"  value="c2"  v-model="answer2">
        <label for="second-question-2">&nbsp;Как правило справляется со своими обязанностями, но порой не выполняет их так как надо или с трудом решает возникающие проблемы</label><br>

        <input type="radio" name="second-question" id="second-question-3"  value="c3"  v-model="answer2">
        <label for="second-question-3" > &nbsp;Практически всегда хорошо справляется со всеми обязанностями, умело решает проблемы, но нельзя сказать, что каждый день без исключений</label><br>

        <input type="radio" name="second-question" id="second-question-4"  value="c4"  v-model="answer2">
        <label for="second-question-4" > &nbsp;Проявляет отличную способность справляться со всеми обязанностями и производственными заданиями. Всегда умело выявляет и быстро решает возникающие проблемы</label><br>
     
        <hr>

    <p class="answer"  name="a3">Компетентность. Знание используемых приемов и методов работы и умение в точности им следовать, наличие необходимых навыков</p>

     
        <input type="radio" name="third-question" id="third-question-1"   value="c1"  v-model="answer3">
        <label for="third-question-1">&nbsp;Некомпетентен. Не знает используемые приемы и методы работы и не стремится быстро освоить их</label><br>

        <input type="radio" name="third-question" id="third-question-2"  value="c2" v-model="answer3">
        <label for="third-question-2">&nbsp;Недостаточно хорошо знает нужные приемы работы, пока имеет слабые навыки и медленно их развивает</label><br>

        <input type="radio" name="third-question" id="third-question-3"   value="c3" v-model="answer3">
        <label for="third-question-3" >&nbsp;Хорошо знает используемые методы работы, но нельзя сказать, что всегда в точности следует им</label><br>

        <input type="radio" name="third-question" id="third-question-4"  value="c4" v-model="answer3">
        <label for="third-question-4" >&nbsp;Компетентен. Отлично знает все методы работы и неукоснительно следует им каждый рабочий день</label><br>
        <hr>


      <p class="answer" name="a4">Заинтересованность и активность в вопросах повышения качества, производительности труда и освоения эффективных методов работы</p>

     
        <input type="radio" name="fourth-question" id="fourth-question-1"  value="c1" v-model="answer4">
        <label for="fourth-question-1">&nbsp;Часто сопротивляется внедрению новых технологий, методов работы, направленных на повышение качества и производительности труда</label><br>

        <input type="radio" name="fourth-question" id="fourth-question-2"  value="c2" v-model="answer4">
        <label  for="fourth-question-2">&nbsp;Не сопротивляется, но и не проявляет интереса к вопросам повышения качества и производительности труда</label><br>

        <input type="radio" name="fourth-question" id="fourth-question-3"  value="c3" v-model="answer4">
        <label for="fourth-question-3" >&nbsp;Всегда поддерживает все нововведения, помогает осваивать новые методы работы, но не в достаточной степени активно</label><br>

        <input type="radio" name="fourth-question" id="fourth-question-4"  value="c4" v-model="answer4">
        <label for="fourth-question-4" > &nbsp;Не только активно помогает осваивать новые методы работы, но и сам часто выдвигает различные рационализаторские предложения</label><br>
        <hr>

      <p class="answer"  name="a5">Выполнение планового объема работ по выданным производственным заданиям.</p>

     
        <input type="radio" name="fifth-question" id="fifth-question-1"  value="c1" v-model="answer5">
        <label for="fifth-question-1" >&nbsp;Не выполнялись запланированные работы по заданиям в срок</label><br>

        <input type="radio" name="fifth-question" id="fifth-question-2"  value="c2" v-model="answer5">
        <label for="fifth-question-2">&nbsp;Имели место случаи недовы-полнения в полном объеме запланированных работ по заданиям</label><br>

        <input type="radio" name="fifth-question" id="fifth-question-3"  value="c3" v-model="answer5">
        <label for="fifth-question-3" >&nbsp;Выполнялся весь объем запланированных работ, но были случаи нарушения сроков</label><br>

        <input type="radio" name="fifth-question" id="fifth-question-4"  value="c4" v-model="answer5">
        <label for="fifth-question-4" >&nbsp;Все запланированные работы по заданиям выполнялись в полном объеме и в установленные сроки </label><br>
        <hr>

      <p class="answer" name="a6">Качество выполненных работ, поручений.</p>

        <input type="radio" name="sixth-question" id="sixth-question-1"  value="c1" v-model="answer6">
        <label for="sixth-question-1">&nbsp;Работы выполнялись некачественно. Имелись случаи брака и возврата заданий на доработку</label><br>

        <input type="radio" name="sixth-question" id="sixth-question-2" value="c2"  v-model="answer6">
        <label for="sixth-question-2">&nbsp;Хотя и очень редки случаи брака в работе, но были погрешности и недоработки</label><br>

        <input type="radio" name="sixth-question" id="sixth-question-3"  value="c3"  v-model="answer6">
        <label for="sixth-question-3">&nbsp;Работы выполнялись достаточно качественно, но имели место небольшие погрешности.</label><br>

        <input type="radio" name="sixth-question" id="sixth-question-4"  value="c4"  v-model="answer6">
        <label for="sixth-question-4">&nbsp;Работы выполнялись безукоризненно, аккуратно, четко, без брака, всегда в строгом соответствии со стандартами</label><br>
<hr> 

      <br>
        <button style="position: relative; left: 50%; width: 90%; transform: translate(-50%,0);  margin-bottom: 2%;margin-top: 3%;height: 80px;font-size: 22px;"
         type="submit" @click="Send()">Отправить
        </button>
    </div>
    <br><br><br>

    </form>
    

    <section id="loading-page-lk" style="display:none">

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

<div class="wrapper-success" id="notifications" style="display:none">
    <div class="card">
        <div class="subject">
        <h5>Успешно</h5>
        <p>Ваша анкета отправлена</p>
        </div>
    </div>
</div>
<div class="wrapper-alert" id="notifications-2" style="display: none;">
<div class="card">
    <div class="subject">
    <h5>Ошибка</h5>
    <p>У вас нет прав доступа на предоставление </p>
    </div>
</div>
</div>




    <button class="button Action" @click="OpenReport()" style="width: 40%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%">Загрузить отчеты</button>
<div style="display:none" id="tables">
    <div class="row" style="position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%; width: 100%;">
<div class="col-md-6">
        <table style="position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; width: 100%;">
    <tr>
        <td><h5>Созданные Вами отчеты</h5></td>
    </tr>

    <tr v-for="reports in reports_creator" :key="reports.id" >
       <td style="text-align:center; font-size: 17px;"> Кто создал: {{reports.creator.first_name}} {{reports.creator.last_name}} <br>
            На кого создано: {{reports.employee.first_name}}  {{reports.employee.last_name}}  <br>
            Дата создания: `{{new Date(reports.created_at).toLocaleString()}}` <br>
            Доплата: {{reports.rate}} %<br>
            Файл: <a download target="_blank" :href="reports.file" v-if="reports.file"><img src="../assets/excel.png" alt="" width="50px!important"></a>
           <br>
           <button class="button Request" style="height: 50px; width: 50%; font-size:18px">Подробнее</button>
        </td>
    </tr>
</table>  
</div>
    <div class="col-md-6">
        <table style="position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; width: 100%;">
            <tr>
                <td><h5>Созданные на Вас отчеты</h5></td>
            </tr>
            <tr v-for="reporte in reports_employee" :key="reporte.id" >
                <td style="text-align:center; font-size: 17px;">Кто создал: {{reporte.creator.first_name}} {{reporte.creator.last_name}}<br>
                    На кого создано: {{reporte.employee.first_name}} {{reporte.employee.last_name}} <br>
                    Дата создания:  `{{new Date(reporte.created_at).toLocaleString()}}` <br>
                    Доплата:{{reporte.rate}} %   <br>
                    Файл: <a download target="_blank" :href="reporte.file" v-if="reporte.file"><img src="../assets/excel.png" alt="" width="50px!important"></a> 
                    <br>
                    <button class="button Request" style="height: 50px; width: 50%; font-size:18px">Подробнее</button>

                </td>
            </tr> 
        </table>
    </div>
</div>
</div>



    </div>
</template>

<style>
#tables {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 90%;
}
#loading-page-lk {
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
#loading-page-lk svg {
  width: 100px;
  height: 100px;
  margin: 20px;
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
  margin-top: 15%;

}

.form-btn{
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    margin-bottom: 2%;
    margin-top: 3%;
    height: 80px;
    font-size: 22px;
}
#block-answer{
    border-radius: 2px;
background: #ffffff;
box-shadow:  10px 10px 30px #d0d0d0,
             -10px -10px 30px #ffffff;
             width: 90%;
             position: relative;
             left: 50%;
             transform: translate(-50%,0);
             margin-top: 2%;
             padding: 3% 2%;
         
}
.staffs {
    margin-left: 25%;
}
.borough {
    font-size: 17px;
}
.form-btn {
    width: 90%;
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    margin-bottom: 2%;
    margin-top: 3%;
    height: 80px;
    font-size: 22px;
}
#admin, #staff {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
}
.answer {
    text-align: center;
    padding-top: 5%;
    font-size: 20px;
    font-weight: 600;
}
 .lk h2{
    text-align: center;
    padding-top: 2%;
}
.form {
    width: 70%;
    border: 1px solid black;
}
.select-form {
    width: 50%;
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    margin-top: 2%;
}
.description-form {
    text-align: center;
}
.block-answer h2{
    text-align: center;
}
</style>


<script>
import {mapState} from "vuex";
import api from "@/api/report"

export default{
name: 'report',
computed: {
...mapState({
    user: state => state.auth.user,
    uid: state => state.auth.uid
})
    },
data(){
    return{
        'staff': [],
        'answer1': [],
        'answer2': [],
        'answer3': [],
        'answer4': [],
        'answer5': [],
        'answer6': [],
        btnName : 'Создать отчет по KPI сотрудника',
        'admin': [],
        'reports_creator': [],
        'reports_employee': []

    }
},
mounted(){
document.getElementById('loading-page-lk').style.display = 'block'
// api.getUsers()
const pretoken = JSON.parse(localStorage.getItem("vuex"))
const token = pretoken.auth.user.token
const preid = JSON.parse(localStorage.getItem('vuex'))
    const id = preid.auth.uid
fetch('http://10.1.5.65/api/reports/kpi?'+ `creator=${id}`, {
    headers: {
        'Authorization': `Basic ${token}` 
    },
    method: 'GET'
    })
    .then((response) => {
    if (response.ok){
        return response.json().then(r=>{
            this.reports_creator = r.data;
            // document.getElementById('loading-page-report').style.display = 'none'
            console.log(this.reports_creator)
    })
}
    else{
        console.log('NOT OK')
        // document.getElementById('loading-page-report').style.display = 'none'

    }
}),
fetch('http://10.1.5.65/api/reports/kpi?'+ `employee=${id}`, {
    headers: {
        'Authorization': `Basic ${token}` 
    },
    method: 'GET'
    })
    .then((response) => {
    if (response.ok){
        return response.json().then(r=>{
            this.reports_employee = r.data;
            // document.getElementById('loading-page-report').style.display = 'none'
            console.log(this.reports_employee)
    })
}
    else{
        console.log('NOT OK')
        // document.getElementById('loading-page-report').style.display = 'none'

    }
}),     
fetch('http://10.1.5.65/api/personal/users/?page_size=200', {
    headers: {
        'Authorization': `Basic ${token}` 
    },
    method: 'GET'
})
.then((response) => {
            if (response.ok){
                return response.json().then(r=>{
                    this.staff = r.data;
                    document.getElementById('loading-page-lk').style.display = 'none'
                    // console.log(this.staff)
            })
        }
        else{
            console.log('NOT OK')
        }
    }),
fetch('http://10.1.5.65/api/personal/users/104', {
headers: {
    'Authorization': `Basic ${token}` 
},
method: 'GET'
})
.then((response) => {
            if (response.ok){
                return response.json().then(r=>{
                    this.admin = r;
                    // document.getElementById('loading-page-lk').style.display = 'none'
                    // console.log(this.admin)
            })
        }
        else{
            console.log('NOT OK')
        }
    }),
    fetch('http://10.1.5.65/api/reports/kpi/', {
    headers: {
        'Authorization': `Basic ${token}` 
    },
    method: 'GET'
    })
    .then((response) => {
    if (response.ok){
        return response.json().then(r=>{
            this.all_reports = r.data;
            document.getElementById('loading-page-report').style.display = 'none'
            console.log(this.all_reports)
    })
}
    else{
        console.log('NOT OK')
        document.getElementById('loading-page-report').style.display = 'none'

    }
})    
},
methods: { 
 Not(){
    document.getElementById('notifications').style.display = 'none'
 },
 Not2(){
    document.getElementById('notifications-2').style.display = 'none'
 }, 

OpenKPI(){
if (document.getElementById("Anketa").style.display == 'block') { 
    document.getElementById("Anketa").style.display = "none";
    this.btnName = 'Создать отчет по KPI сотрудника'
}
else {
    document.getElementById("Anketa").style.display = "block";
    this.btnName = 'Скрыть отчет по KPI сотрудника'
    }
 },

OpenReport(){
    if (document.getElementById("tables").style.display == 'block') { 
        document.getElementById("tables").style.display = "none";
    }
    else {
        document.getElementById("tables").style.display = "block";
        }

 },
    
 Send(){
    event.preventDefault()
    const pretoken = JSON.parse(localStorage.getItem("vuex"))
    const token = pretoken.auth.user.token
    document.getElementById('loading-page-lk').style.display = 'block'
   let admin = document.getElementById('admin').value.split(' ')[0] 
   let staff = document.getElementById('staff').value.split(' ')[0] 
   fetch('http://10.1.5.65/api/reports/kpi/create/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Basic ${token}` 
    },
    body: JSON.stringify({
    "employee": staff,
    "manager": admin,
    "a1": this.answer1,
    "a2": this.answer2,
    "a3": this.answer3,
    "a4": this.answer4,
    "a5": this.answer5,
    "a6": this.answer6
 })
})
  .then((response) => {
    if (response.ok){
        return response.json().then((data)=>{
            console.log(data);
            document.getElementById('loading-page-lk').style.display = 'none';
            document.getElementById('notifications').style.display = 'block';
            setTimeout(this.Not, 1500);
            document.getElementById("Anketa").reset();
        })
    }
    else{
        document.getElementById('loading-page-lk').style.display = 'none';
        document.getElementById('notifications-2').style.display = 'block';
        setInterval(this.Not2, 1500)
        console.log(response)

    }
})
 }
}

}

</script>


    
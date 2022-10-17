<template>
 <div>  
<div class="wrapper-success" id="notifications" style="display:block" v-if="successModalReport">
    <div class="card">
        <div class="subject">
        <h5>Успешно</h5>
        <p>Ваша анкета изменена и отправлена</p>
        </div>
    </div>
</div>
<div class="wrapper-alert" id="notifications2" style="display: block;" v-if="successModalReport">
<div class="card">
    <div class="subject">
    <h5>Ошибка</h5>
    <p>У вас недостаточно прав для совершения операции</p>
    </div>
</div>
</div>

<!-- Модальное окно -->
<div class="modal_layer_report" id="modal_layer_report">
    <div class="modal_window_report">
    <h2>Изменить анкету</h2>
    <div class="change_report">
    <p class="answer" name="a1" >1. Готовность неукоснительно выполнять все производственные задания, порученные руководителем.</p>

     
        <input type="radio" name="first-question" id="first-question-1"  value="c1" v-model="answer1">
        <label for="first-question-1">&nbsp;Неисполнителен, склонен под любыми предлогами избегать получения новых заданий. Были случаи прямого отказа от выполнения заданий.</label><br>

        <input type="radio" name="first-question" id="first-question-2" value="c2"  v-model="answer1">
        <label  for="first-question-2">&nbsp;Низкий уровень исполнительности. Иногда пытается избежать получения новых заданий, умело находя предлоги</label><br>

        <input type="radio" name="first-question" id="first-question-3"  value="c3"  v-model="answer1">
        <label for="first-question-3" >&nbsp;Хороший уровень исполнительности, но нельзя сказать, что каждый день без исключений. Берется за выполнение любых производственных заданий, но не всегда охотно.</label><br>

        <input type="radio" name="first-question" id="first-question-4"  value="c4"  v-model="answer1">
        <label for="first-question-4" >&nbsp;Безукоризненный уровень исполнительности. Всегда охотно берется за выполнение всех производственных заданий, порученных руководителем.</label><br>
        <textarea name="" id="" rows="1" style="resize: none; width: 50%;" placeholder="Причина изменения" v-model="reason1"></textarea>
        <p class="error" v-if="r1">Заполните причину</p>
        <hr>
        
       <p class="answer"  name="a2">2. Способность справляться со своими обязанностями и поручениями. Умение выявлять и решать возникающие в работе проблемы</p>
     
        <input type="radio" name="second-question" id="second-question-1"  value="c1"  v-model="answer2">
        <label for="second-question-1" >&nbsp;Часто не справляется со своими обязанностями и поручениями или заданиями. Не умеет выявлять проблемы и с трудом решает их</label><br>

        <input type="radio" name="second-question" id="second-question-2"  value="c2"  v-model="answer2">
        <label for="second-question-2">&nbsp;Как правило справляется со своими обязанностями, но порой не выполняет их так как надо или с трудом решает возникающие проблемы</label><br>

        <input type="radio" name="second-question" id="second-question-3"  value="c3"  v-model="answer2">
        <label for="second-question-3" > &nbsp;Практически всегда хорошо справляется со всеми обязанностями, умело решает проблемы, но нельзя сказать, что каждый день без исключений</label><br>

        <input type="radio" name="second-question" id="second-question-4"  value="c4"  v-model="answer2">
        <label for="second-question-4" > &nbsp;Проявляет отличную способность справляться со всеми обязанностями и производственными заданиями. Всегда умело выявляет и быстро решает возникающие проблемы</label><br>
        
        <textarea name="" id="" rows="1" style="resize: none; width: 50%;" placeholder="Причина изменения"  v-model="reason2"></textarea>
        <p class="error" v-if="r2">Заполните причину</p>
        <hr>

    <p class="answer"  name="a3">3. Компетентность. Знание используемых приемов и методов работы и умение в точности им следовать, наличие необходимых навыков</p>

     
        <input type="radio" name="third-question" id="third-question-1"   value="c1"  v-model="answer3">
        <label for="third-question-1">&nbsp;Некомпетентен. Не знает используемые приемы и методы работы и не стремится быстро освоить их</label><br>

        <input type="radio" name="third-question" id="third-question-2"  value="c2" v-model="answer3">
        <label for="third-question-2">&nbsp;Недостаточно хорошо знает нужные приемы работы, пока имеет слабые навыки и медленно их развивает</label><br>

        <input type="radio" name="third-question" id="third-question-3"   value="c3" v-model="answer3">
        <label for="third-question-3" >&nbsp;Хорошо знает используемые методы работы, но нельзя сказать, что всегда в точности следует им</label><br>

        <input type="radio" name="third-question" id="third-question-4"  value="c4" v-model="answer3">
        <label for="third-question-4" >&nbsp;Компетентен. Отлично знает все методы работы и неукоснительно следует им каждый рабочий день</label><br>
        
        <textarea name="" id="" rows="1" style="resize: none; width: 50%;" placeholder="Причина изменения"  v-model="reason3"></textarea>
        <p class="error" v-if="r3">Заполните причину</p>
        <hr>


      <p class="answer" name="a4">4. Заинтересованность и активность в вопросах повышения качества, производительности труда и освоения эффективных методов работы</p>

     
        <input type="radio" name="fourth-question" id="fourth-question-1"  value="c1" v-model="answer4">
        <label for="fourth-question-1">&nbsp;Часто сопротивляется внедрению новых технологий, методов работы, направленных на повышение качества и производительности труда</label><br>

        <input type="radio" name="fourth-question" id="fourth-question-2"  value="c2" v-model="answer4">
        <label  for="fourth-question-2">&nbsp;Не сопротивляется, но и не проявляет интереса к вопросам повышения качества и производительности труда</label><br>

        <input type="radio" name="fourth-question" id="fourth-question-3"  value="c3" v-model="answer4">
        <label for="fourth-question-3" >&nbsp;Всегда поддерживает все нововведения, помогает осваивать новые методы работы, но не в достаточной степени активно</label><br>

        <input type="radio" name="fourth-question" id="fourth-question-4"  value="c4" v-model="answer4">
        <label for="fourth-question-4" > &nbsp;Не только активно помогает осваивать новые методы работы, но и сам часто выдвигает различные рационализаторские предложения</label><br>
        
        <textarea name="" id="" rows="1" style="resize: none; width: 50%;" placeholder="Причина изменения"  v-model="reason4"></textarea>
        <p class="error" v-if="r4">Заполните причину</p>
        <hr>

      <p class="answer"  name="a5">5. Выполнение планового объема работ по выданным производственным заданиям.</p>

     
        <input type="radio" name="fifth-question" id="fifth-question-1"  value="c1" v-model="answer5">
        <label for="fifth-question-1" >&nbsp;Не выполнялись запланированные работы по заданиям в срок</label><br>

        <input type="radio" name="fifth-question" id="fifth-question-2"  value="c2" v-model="answer5">
        <label for="fifth-question-2">&nbsp;Имели место случаи недовы-полнения в полном объеме запланированных работ по заданиям</label><br>

        <input type="radio" name="fifth-question" id="fifth-question-3"  value="c3" v-model="answer5">
        <label for="fifth-question-3" >&nbsp;Выполнялся весь объем запланированных работ, но были случаи нарушения сроков</label><br>

        <input type="radio" name="fifth-question" id="fifth-question-4"  value="c4" v-model="answer5">
        <label for="fifth-question-4" >&nbsp;Все запланированные работы по заданиям выполнялись в полном объеме и в установленные сроки </label><br>
        
        <textarea name="" id=""  rows="1" style="resize: none; width: 50%;" placeholder="Причина изменения"  v-model="reason5"></textarea>
        <p class="error" v-if="r5">Заполните причину</p>
        <hr>

      <p class="answer" name="a6">6. Качество выполненных работ, поручений.</p>

        <input type="radio" name="sixth-question" id="sixth-question-1"  value="c1" v-model="answer6">
        <label for="sixth-question-1">&nbsp;Работы выполнялись некачественно. Имелись случаи брака и возврата заданий на доработку</label><br>

        <input type="radio" name="sixth-question" id="sixth-question-2" value="c2"  v-model="answer6">
        <label for="sixth-question-2">&nbsp;Хотя и очень редки случаи брака в работе, но были погрешности и недоработки</label><br>

        <input type="radio" name="sixth-question" id="sixth-question-3"  value="c3"  v-model="answer6">
        <label for="sixth-question-3">&nbsp;Работы выполнялись достаточно качественно, но имели место небольшие погрешности.</label><br>

        <input type="radio" name="sixth-question" id="sixth-question-4"  value="c4"  v-model="answer6">
        <label for="sixth-question-4">&nbsp;Работы выполнялись безукоризненно, аккуратно, четко, без брака, всегда в строгом соответствии со стандартами</label><br>

        <textarea name="" id="" rows="1" style="resize: none; width: 50%;" placeholder="Причина изменения"  v-model="reason6"></textarea>
        <p class="error" v-if="r6">Заполните причину</p>
        <hr> 
</div>
        <div class="btn_group_report">
            <div class="row container" style="width: 100%; margin-left: 15%;">
                <div class="col-md-6"><button class="button Cancel close_report" style="width: 350px; height: 50px; font-size: 20px;" @click="closeChangeReport()">Закрыть без изменений</button></div>
                <div class="col-md-6"><button class="button Accept apply_report" style="width: 350px; height: 50px; font-size: 20px;" @click="changeReport()" :disabled="errors">Применить изменения</button></div>

            </div>

        </div>
    </div>
</div>
<!-- Конец модального окна -->

<section id="loading-page-lk" style="display:block" v-if="loaderReportModal">

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

 </div>
</template>


<style>
.disabled, .errors {
    background: grey;
}
.error{
    color: red;
}
.modal_layer_report{
    background: rgb(128, 128, 128, 0.8);
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100% !important;
    z-index: 5;
    display: block;
}
.modal_window_report {
    position: fixed;
    width: 90%;
    left: 50%;
    top: 5%;
    bottom: 5%;
    transform: translate(-50%, 0);
    background: white;
    height: 90vh;
    overflow-y: auto;
}
.change_report {
    width: 95%;
    font-size: 15px;
    margin-left: 5%;
    text-align: justify;
}
@media screen and (max-width: 550px) {
    .btn_group_report {
        position: relative !important;
        left: 50% !important;
        transform: translate(-50%, 0) !important;
        margin-left: -25%;
        width: 60% !important;
    }
    .apply_report {
        margin-top: 2%;
        width: 300px !important;
    }
    .change_report input[type=radio]{
        position: relative;
        left: 50%;
        transform: translate(-50%,0);
    }
    .close_report {
        margin-top: 2%;
        width: 300px !important;
    }
 
}
</style>


<script>
import {mapState} from "vuex";
import api from '@/api/report';
// import Notifications from "@/components/notifications/Notifications.vue";

export default {
    name: 'modalReportWindow',
    // components: {Notifications},
    computed: {
    ...mapState({
        user: state => state.auth.user,
        uid: state => state.auth.uid
    }),
}, 
    data(){
        return{
            answer1: null, 
            answer2: null, 
            answer3: null, 
            answer4: null, 
            answer5: null, 
            answer6: null, 
            reason1: '',
            reason2: '',
            reason3: '',
            reason4: '',
            reason5: '',
            reason6: '',
            successModalReport : false,
            alertModalReport : false,
            loaderReportModal: false
        }
    },
    computed: {
            r1(){
                if(this.OnceReport.attrib1 != this.answer1){
                    if(this.reason1 == null || this.reason1 == ''){
                        return true
                    }
                    return false
                } 
                return false
            },
            r2(){
                 if(this.OnceReport.attrib2 != this.answer2){
                if(this.reason2 == null || this.reason2 == ''){
                    return true
                }
                return false
            } return false},
            r3(){
                 if(this.OnceReport.attrib3 != this.answer3){
                if(this.reason3 == null || this.reason3 == ''){
                    return true
                }
                return false
            } return false},
            r4(){
                 if(this.OnceReport.attrib4 != this.answer4){
                if(this.reason4 == null || this.reason4 == ''){
                    return true
                }
                return false
            } return false},
            r5(){
                 if(this.OnceReport.attrib5 != this.answer5){
                if(this.reason5 == null || this.reason5 == ''){
                    return true
                }
                return false
            } return false},
            r6(){
                 if(this.OnceReport.attrib6 != this.answer6){
                if(this.reason6 == null || this.reason6 == ''){
                    return true
                }
                return false
            } return false},
            errors(){
                if(this.r1 || this.r2 || this.r3 || this.r4 ||this.r5 || this.r6){
                 return true
                }
                return false
            }
        
    },
    props: ['OnceReport'],
    methods: {
        closeChangeReport(){
            this.$emit('close')
        },
        closeNotif(){
            document.getElementById('notifications').style.display = 'none'
        },
        closeNotif2(){
            document.getElementById('notifications2').style.display = 'none'
        },

        changeReport(){
            this.loaderReportModal = true
            if(!this.errors){
                api.saveReport(this.OnceReport.id, {
                'attrib1': this.answer1,
                'attrib2': this.answer2,
                'attrib3': this.answer3,
                'attrib4': this.answer4,
                'attrib5': this.answer5,
                'attrib6': this.answer6,
                'attrib1_change_reason': this.reason1,
                'attrib2_change_reason': this.reason2,
                'attrib3_change_reason': this.reason3,
                'attrib4_change_reason': this.reason4,
                'attrib5_change_reason': this.reason5,
                'attrib6_change_reason': this.reason6
            }).then(response => 
             {
                this.loaderReportModal = false
                document.getElementById('notifications').style.display = 'block'
                setTimeout(this.closeNotif, 1500)
                this.$emit('close')
            })
            } else{
                document.getElementById('notifications2').style.display = 'block'
                setTimeout(this.closeNotif2, 1500)
            }
        }
    },

    mounted(){
        this.answer1 = this.OnceReport.attrib1
        this.answer2 = this.OnceReport.attrib2
        this.answer3 = this.OnceReport.attrib3
        this.answer4 = this.OnceReport.attrib4
        this.answer5 = this.OnceReport.attrib5
        this.answer6 = this.OnceReport.attrib6

        this.reason1 = this.OnceReport.attrib1_change_reason
        this.reason2 = this.OnceReport.attrib2_change_reason
        this.reason3 = this.OnceReport.attrib3_change_reason
        this.reason4 = this.OnceReport.attrib4_change_reason
        this.reason5 = this.OnceReport.attrib5_change_reason
        this.reason6 = this.OnceReport.attrib6_change_reason
    }
}

</script>
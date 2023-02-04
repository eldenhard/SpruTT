<template>
    <div>

        <Loader :loader="loader"></Loader>
        <!-- Модальное окно -->
        <div class="modal_layer_report" id="modal_layer_report">
            <div class="modal_window_report">
                <h2>Анкета</h2>
                <div class="change_report">
                    <p class="answer" name="a1">1. Готовность неукоснительно выполнять все производственные задания,
                        порученные руководителем.</p>


                    <input type="radio" name="first-question" id="first-question-1" value="c1" v-model="answer1">
                    <label for="first-question-1">&nbsp;Неисполнителен, склонен под любыми предлогами избегать получения
                        новых заданий. Были случаи прямого отказа от выполнения заданий.</label><br>

                    <input type="radio" name="first-question" id="first-question-2" value="c2" v-model="answer1">
                    <label for="first-question-2">&nbsp;Низкий уровень исполнительности. Иногда пытается избежать
                        получения новых заданий, умело находя предлоги</label><br>

                    <input type="radio" name="first-question" id="first-question-3" value="c3" v-model="answer1">
                    <label for="first-question-3">&nbsp;Хороший уровень исполнительности, но нельзя сказать, что каждый
                        день без исключений. Берется за выполнение любых производственных заданий, но не всегда
                        охотно.</label><br>

                    <input type="radio" name="first-question" id="first-question-4" value="c4" v-model="answer1">
                    <label for="first-question-4">&nbsp;Безукоризненный уровень исполнительности. Всегда охотно берется
                        за выполнение всех производственных заданий, порученных руководителем.</label><br>

                    <hr>

                    <p class="answer" name="a2">2. Способность справляться со своими обязанностями и поручениями. Умение
                        выявлять и решать возникающие в работе проблемы</p>

                    <input type="radio" name="second-question" id="second-question-1" value="c1" v-model="answer2">
                    <label for="second-question-1">&nbsp;Часто не справляется со своими обязанностями и поручениями или
                        заданиями. Не умеет выявлять проблемы и с трудом решает их</label><br>

                    <input type="radio" name="second-question" id="second-question-2" value="c2" v-model="answer2">
                    <label for="second-question-2">&nbsp;Как правило справляется со своими обязанностями, но порой не
                        выполняет их так как надо или с трудом решает возникающие проблемы</label><br>

                    <input type="radio" name="second-question" id="second-question-3" value="c3" v-model="answer2">
                    <label for="second-question-3"> &nbsp;Практически всегда хорошо справляется со всеми обязанностями,
                        умело решает проблемы, но нельзя сказать, что каждый день без исключений</label><br>

                    <input type="radio" name="second-question" id="second-question-4" value="c4" v-model="answer2">
                    <label for="second-question-4"> &nbsp;Проявляет отличную способность справляться со всеми
                        обязанностями и производственными заданиями. Всегда умело выявляет и быстро решает возникающие
                        проблемы</label><br>


                    <hr>

                    <p class="answer" name="a3">3. Компетентность. Знание используемых приемов и методов работы и умение
                        в точности им следовать, наличие необходимых навыков</p>


                    <input type="radio" name="third-question" id="third-question-1" value="c1" v-model="answer3">
                    <label for="third-question-1">&nbsp;Некомпетентен. Не знает используемые приемы и методы работы и не
                        стремится быстро освоить их</label><br>

                    <input type="radio" name="third-question" id="third-question-2" value="c2" v-model="answer3">
                    <label for="third-question-2">&nbsp;Недостаточно хорошо знает нужные приемы работы, пока имеет
                        слабые навыки и медленно их развивает</label><br>

                    <input type="radio" name="third-question" id="third-question-3" value="c3" v-model="answer3">
                    <label for="third-question-3">&nbsp;Хорошо знает используемые методы работы, но нельзя сказать, что
                        всегда в точности следует им</label><br>

                    <input type="radio" name="third-question" id="third-question-4" value="c4" v-model="answer3">
                    <label for="third-question-4">&nbsp;Компетентен. Отлично знает все методы работы и неукоснительно
                        следует им каждый рабочий день</label><br>

                    <hr>


                    <p class="answer" name="a4">4. Заинтересованность и активность в вопросах повышения качества,
                        производительности труда и освоения эффективных методов работы</p>


                    <input type="radio" name="fourth-question" id="fourth-question-1" value="c1" v-model="answer4">
                    <label for="fourth-question-1">&nbsp;Часто сопротивляется внедрению новых технологий, методов
                        работы, направленных на повышение качества и производительности труда</label><br>

                    <input type="radio" name="fourth-question" id="fourth-question-2" value="c2" v-model="answer4">
                    <label for="fourth-question-2">&nbsp;Не сопротивляется, но и не проявляет интереса к вопросам
                        повышения качества и производительности труда</label><br>

                    <input type="radio" name="fourth-question" id="fourth-question-3" value="c3" v-model="answer4">
                    <label for="fourth-question-3">&nbsp;Всегда поддерживает все нововведения, помогает осваивать новые
                        методы работы, но не в достаточной степени активно</label><br>

                    <input type="radio" name="fourth-question" id="fourth-question-4" value="c4" v-model="answer4">
                    <label for="fourth-question-4"> &nbsp;Не только активно помогает осваивать новые методы работы, но и
                        сам часто выдвигает различные рационализаторские предложения</label><br>


                    <hr>

                    <p class="answer" name="a5">5. Выполнение планового объема работ по выданным производственным
                        заданиям.</p>


                    <input type="radio" name="fifth-question" id="fifth-question-1" value="c1" v-model="answer5">
                    <label for="fifth-question-1">&nbsp;Не выполнялись запланированные работы по заданиям в
                        срок</label><br>

                    <input type="radio" name="fifth-question" id="fifth-question-2" value="c2" v-model="answer5">
                    <label for="fifth-question-2">&nbsp;Имели место случаи недовы-полнения в полном объеме
                        запланированных работ по заданиям</label><br>

                    <input type="radio" name="fifth-question" id="fifth-question-3" value="c3" v-model="answer5">
                    <label for="fifth-question-3">&nbsp;Выполнялся весь объем запланированных работ, но были случаи
                        нарушения сроков</label><br>

                    <input type="radio" name="fifth-question" id="fifth-question-4" value="c4" v-model="answer5">
                    <label for="fifth-question-4">&nbsp;Все запланированные работы по заданиям выполнялись в полном
                        объеме и в установленные сроки </label><br>


                    <hr>

                    <p class="answer" name="a6">6. Качество выполненных работ, поручений.</p>

                    <input type="radio" name="sixth-question" id="sixth-question-1" value="c1" v-model="answer6">
                    <label for="sixth-question-1">&nbsp;Работы выполнялись некачественно. Имелись случаи брака и
                        возврата заданий на доработку</label><br>

                    <input type="radio" name="sixth-question" id="sixth-question-2" value="c2" v-model="answer6">
                    <label for="sixth-question-2">&nbsp;Хотя и очень редки случаи брака в работе, но были погрешности и
                        недоработки</label><br>

                    <input type="radio" name="sixth-question" id="sixth-question-3" value="c3" v-model="answer6">
                    <label for="sixth-question-3">&nbsp;Работы выполнялись достаточно качественно, но имели место
                        небольшие погрешности.</label><br>

                    <input type="radio" name="sixth-question" id="sixth-question-4" value="c4" v-model="answer6">
                    <label for="sixth-question-4">&nbsp;Работы выполнялись безукоризненно, аккуратно, четко, без брака,
                        всегда в строгом соответствии со стандартами</label><br>

                    <hr>
                </div>
                <div class="container" style="width: 100%;">
                    <div class="col-md-12" style=" display: flex;justify-content: center;">
                        <button class="Cancel" style="width: 100%; height: 50px; font-size: 20px; margin-bottom: 3%"
                            @click="closeCurrentReport()">Закрыть</button>
                    </div>

                </div>


            </div>
        </div>
    </div>



</template>
   
   
<style>
.disabled,
.errors {
    background: grey;
}

.error {
    color: red;
}

.modal_layer_report {
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

    .change_report input[type=radio] {
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .close_report {
        margin-top: 2%;
        width: 300px !important;
    }

}
</style>
   
   
<script>
import { mapState } from "vuex";
import api from '@/api/report';
// import Notifications from "@/components/notifications/Notifications.vue";
import Loader from '@/components/loader/loader.vue'
export default {
    name: 'modalReportWindow',
    components: { Loader },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        }),

    },
    data() {
        return {
            answer1: null,
            answer2: null,
            answer3: null,
            answer4: null,
            answer5: null,
            answer6: null,
            loader: false,
            answer: ''
        }
    },

    props: ['CreatedReport', 'emplyee'],
    methods: {
        closeCurrentReport() {
            this.$emit('close')
        },
    },

    mounted() {

        // this.loader = true

        api.getLastDataReports(this.emplyee).then(response => {
            this.answer1 = response.data.attrib1
            this.answer2 = response.data.attrib2
            this.answer3 = response.data.attrib3
            this.answer4 = response.data.attrib4
            this.answer5 = response.data.attrib5
            this.answer6 = response.data.attrib6

            this.loader = false

        }).catch(error => {
            this.loader = false
        })
    },

}

</script>
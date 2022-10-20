<template>
    <div>
        <section  style="display:block" id="loaderAbandon" v-if="loaderAbandonReport">
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
        <button class="button Action" @click="CreateReportAbandones()" style="width: 40%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%">Создать отчет</button>

<br><br>
<h2>Созданные отчеты</h2>
<div style="width: 100%; overflow-x: auto; height: 70vh; overflow-y: auto;"> 
    <table class="table" style="table-layout: fixed;">
        <thead>
            <tr>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Файл</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дата создания</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Создатель</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Тип вагона</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="reports in report_abandoned" :key="reports">
                <td style="height: 50px !important; vertical-align: middle !important;">
                    <a download target="_blank" :href="reports.file" v-if="reports.file"><img src="@/assets/excel.png" alt="" width="50px !important"></a>
                </td>
                <td style="height: 50px !important; vertical-align: middle !important;">
                    {{new Date(reports.created_at).toLocaleString()}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{reports.creator.last_name}} {{reports.creator.first_name}}</td>
                <td style="height: 50px !important; vertical-align: middle !important;">{{reports.wagon_type}}</td>

            </tr>
        </tbody>
    </table>
</div>            


    </div>
</template>

<style>

</style>

<script>
import api from '@/api/report'
import {mapState} from 'vuex'
export default {
    name: 'ReportAbandoned',
    data() {
        return {
            report_abandoned : '',
            loaderAbandonReport: false
        }
    },
    methods: {
        CreateReportAbandones(){
            this.loaderAbandonReport = true
            api.CreateReportAbandone()
            .then((response) => {
                api.GetReportAbandone()
                    .then((response) => {
                        this.report_abandoned = response.data.data
                        this.loaderAbandonReport = false
                    })
            })

        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid,
        })
    },
}
</script>
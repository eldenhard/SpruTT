<template>
<div>
    <section  style="display:block" id="loaderStaff" v-if="loaderBDR">
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
    <h2>БДР отчеты</h2>
    <b-container class="bv-example-row">
     <b-row>
    <b-col>
        <button class="button Action" @click="createBDRreport()" style="width: 60%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%">Создать шаблон БДР отчета</button>
    </b-col>

    <b-col>
        <button class="button Action" @click="OpenCreateBDRreport()"  style="width: 60%; position: relative; left: 50%; transform: translate(-50%,0); font-size: 17px; margin-top: 3%">Загрузить БДР отчет</button>
    </b-col>
  </b-row>

</b-container>
<br>

<div style="width: 90%; overflow-x: auto; height: 80vh; overflow-y: auto; position: relative; left: 50%; transform: translate(-50%,0);"> 
    <table class="table" style="table-layout: fixed;">
        <thead>
            <tr>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Название</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дата создания</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Дата последнего обновления</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Файл</th>
                    <th style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">Действие</th>

            </tr>
        </thead>
        <tbody>
                <tr v-for="bdr in BDRreport" :key="bdr.id">
                    <td style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">{{bdr.name}}</td>
                    <td style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">{{new Date(bdr.created_at).toLocaleString()}}</td>
                    <td style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">{{new Date(bdr.updated_at).toLocaleString()}}</td>
                    <td style="width: 150px !important; height: 50px !important; vertical-align: middle !important;">
                        <a target="_blank" :href="bdr.file" v-if="bdr.file"><img src="@/assets/excel.png" alt="" width="50px!important"></a>
                    </td>
                    <td style="width: 150px !important; height: 50px !important; vertical-align: middle !important;"><button class="Accept"  @click="openCurrentReport(bdr.id)">Редактировать</button></td>

                </tr>
        </tbody>
    </table>
</div>
     
     
<Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" id="notif"/>
<editBDR v-if="showEditbdr"></editBDR>
</div>
</template>

<script>
import api from '@/api/report'
import { mapState } from 'vuex';
import Notifications from '@/components/notifications/Notifications.vue'
import editBDR from '@/views/editBDR.vue';

export default {
    name: 'BDRreport',
    components: {Notifications, editBDR},

    data(){
        return{
            BDRreport: '',
            loaderBDR: false,
            showNotify: false,
            showEditbdr: false,
            notifyHead: '',
            notifyMessage: '',
            notifyClass: '',

        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        })
    },
    methods: {
        openCurrentReport(id){
            window.open('/edit-bdr/' + `${id}`, '_blank');
            
        },
        createBDRreport(){
            this.loaderBDR = true
            api.createBDRreport()
            .then(response => {
                api.getBDRreport()
                .then(response => {
                this.BDRreport = response.data.data
                this.loaderBDR = false
                this.notifyHead = 'Успешно'
                this.notifyMessage = 'Отчет создан'
                this.notifyClass = 'wrapper-success'
                this.showNotify = true
                setTimeout(this.closeNotification, 1500)

            })
            })
        },
        OpenCreateBDRreport(){
            this.loaderBDR = true
            api.getBDRreport()
            .then(response => {
                this.BDRreport = response.data.data
                this.loaderBDR = false
                this.notifyHead = 'Успешно'
                this.notifyMessage = 'Отчеты загружены'
                this.notifyClass = 'wrapper-success'
                this.showNotify = true
                setTimeout(this.closeNotification, 1500)
            })
        },
        closeNotification(){
            this.showNotify = false
        }
    }
}
</script>


<template>
   <div>
<h2>БДР отчет</h2>


<br>
<div style="width: 95%; overflow-x: auto; height: 80vh; overflow-y: auto; position: relative; left: 50%; transform: translate(-50%,0);"> 
    <table class="table" style="table-layout: fixed;">
<thead>
     <tr>

          <th style=" vertical-align: middle !important; table-layout: fixed;">Название</th>
          <th style=" vertical-align: middle !important; table-layout: fixed;">План</th>
          <th style=" vertical-align: middle !important; table-layout: fixed;">Ожидаемый факт</th>
          <th style=" vertical-align: middle !important; table-layout: fixed;">Отклонение</th>
          <th style=" vertical-align: middle !important; table-layout: fixed;">Комментарии по отклонениям</th>
          <th style=" vertical-align: middle !important; table-layout: fixed;">Ответственный за статью в целом</th>
          <th style=" vertical-align: middle !important; table-layout: fixed;">Лицо, которому Ответственный делегировал заполнение</th>
          <th style=" vertical-align: middle !important; table-layout: fixed;">Заполняет ожидаемый факт</th>
          <th style=" vertical-align: middle !important; table-layout: fixed;">Дата последнего обновления</th>
          <th style=" vertical-align: middle !important; table-layout: fixed;">Действие</th>
     </tr>
</thead>
<tbody >
   <tr v-for="bdr in all_table_data" :key="bdr.id">  
          <td class="lc groups">{{bdr.name}}</td>
          <td class="td-btr"><input class="input-filter" :value="bdr.plan"></td>
          <td class="td-btr"><input class="input-filter" :value="bdr.fact"></td>
          <td class="td-btr"><input class="input-filter" :value="bdr.deviation"></td>
          <td class="td-btr"><input class="input-filter" :value="bdr.comment"></td>
          <td class="td-btr"><input class="input-filter" :value="bdr.responsible_users"></td>
          <td class="td-btr"><input class="input-filter" :value="bdr.delegated_users"></td>
          <td class="td-btr"><input class="input-filter" :value="bdr.filling_users"></td>
          <td class="td-btr">{{new Date(bdr.updated_at).toLocaleString()}}</td>
          <td class="td-btr"><button class="Accept" style="height: 100%" @click="saveBDRchange()">Сохранить</button></td>

 </tr>



</tbody>
  </table>
</div> 
<Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" id="notif"/>
<Loader :loader="loader"></Loader>
</div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api/report'
import Notifications from '@/components/notifications/Notifications.vue';
import Loader from '@/components/loader/loader.vue'
export default {
     template:`{{ $route.params.id }}`,
    data(){
        return{
           all_table_data: '',
            name: '',
            plan: '',
            fact: '',
            deviation: '',
            comment: '',
            level: '',
            updated_at: '',

          showNotify: false,
          notifyHead: '',
          notifyMessage: '',
          notifyClass: '',

          loader: false,
      
            
        }
    },
    components:{Notifications, Loader},
    computed: {
        ...mapState({
            user: state => state.auth.user,
            uid: state => state.auth.uid
        })
    },
    mounted(){
     this.loader = true
          api.getBDRreportByID()
          .then(response => {
               this.all_table_data = response.data.bdr_report_rows
               this.loader = false
          })

    },
    methods:{
     saveBDRchange(){
          alert('Сохранено')
     },
     closeNotification(){
            this.showNotify = false
        }
    }
}
</script>

<style>
.lc {
    background: #EBEBEB;
    font-size: normal;
    font-size: 13px;
}
.groups {
    text-align: left;
    font-weight: bold;
    font-size: 13px;
}
.groups-amount{
    background: #DDEBF7;
    font-size: 14px;
}
.input-filter{
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    border: none;
    text-decoration: none;
    outline: none;
    text-align: center;
    font-size: 13px;
}
.td-btr {
    padding: 0 !important;
    vertical-align: middle !important;
}
</style>
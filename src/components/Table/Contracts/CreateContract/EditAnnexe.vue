<template>
    <div>
        <b-modal :id="id" ref="annex-modal" hide-footer size="md">
    <template #modal-title>
     Редактирование приложения к договору № {{ contract }}
    </template>

    <form id="EditAnnex"  @submit="EditAnnex">
  <table class=" table-sm table-bordered">
  <thead>
    <tr>
      <th>Номер договора</th>
      <th>Тип приложения</th>
      <th>Номер приложения</th>
      <th>Дата</th>
      <th>Примечание</th>
      <th>Скан-копия</th>
    </tr>
  </thead>
  <tbody>
    <tr >
      <th style="padding: 0"><input type="text" name="contract" v-model="contract" style="width:100% !important; text-align: center;" readonly></th>
      <td style="padding: 0"><input type="text" name="doc_type" v-model="annex.doc_type" style="width:100% !important; text-align: center;"></td>
      <td style="padding: 0"><input type="text" name="number"   v-model="annex.number"  style="width:100% !important; text-align: center;"></td>
      <td style="padding: 0"><input type="date" name="created_at"  v-model="annex.created_at"   style="width:100% !important; text-align: center;"></td>
      <td style="padding: 0"><input type="text" name="comment"  v-model="annex.comment"   style="width:100% !important; text-align: center;"></td>
      <td style="position: relative;">
        <button class="Accept" style="height: 15px; border-radius: 0 !important;" >{{ annex.scan ? 'Заменить' : 'Добавить' }}</button>
        <input type="file" ref="scan" name="scan" @change="ReadFile()" :class="{'displayNone': isdisplayNone}" >
        
      </td>
    </tr>
    <tr >
      <th style="opacity: 0; border: none !important;"></th>
      <td style="opacity: 0; border: none !important;"></td>
      <td style="opacity: 0; border: none !important;"></td>
      <td style="opacity: 0; border: none !important;"></td>
      <td style="opacity: 0; border: none !important;"></td>
      <td> {{ pre_scan.name }}</td>
    </tr>
   
  </tbody>
</table>

  <div style="display: flex; justify-content: space-around; margin-top: 7%;">
    <button  type="submit" style="width: 15%" class="button Accept" >Редактировать</button><br>
    <a style="width: 15%; height: 25px; text-decoration: none; color: white !important; outline: none; border: none !important;"
     class="button Delete"  block variant="danger" @click="hideModal">Закрыть</a>
  </div>
</form>



  </b-modal>
  <Notifications
        :show="showNotify"
        :header="notifyHead"
        :message="notifyMessage"
        :block-class="notifyClass"
        id="notif"
      />
    </div>
</template>
<style scoped>
.displayNone{
  display: inline-block;
  position: absolute; 
  top: 0%; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  width: 100%; 
  height: 100%; 
  opacity: 0;
}
  
</style>
<script>
import Notifications from "@/components/notifications/Notifications.vue";
import api from "@/api/directory"

export default{
  name: 'EditAnnexe',
  props: ['contract', 'annex', 'btnClickHandler', 'id'],
  components: {Notifications},
  data(){
    return {
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      isdisplayNone: true,
      pre_scan: '',
    }
  },
  methods: {
    hideModal() {
        this.$refs['annex-modal'].hide()
      },
      ReadFile(){
        this.pre_scan = this.$refs.scan.files[0];
        console.log(this.pre_scan)
      },
      EditAnnex(e){
     
      if (e && e.preventDefault) { e.preventDefault(); }
      let data = new FormData(e.target);
      console.log(data)
      api.ChangeCurrentAnnex(this.annex.id, data)
      .then(response => {
        document.querySelector('#EditAnnex').reset()
        this.hideModal()
        this.btnClickHandler()
        this.notifyHead = "Успешно";
        this.notifyMessage = "Приложение к договору составлено";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
      }).catch(error => {
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Составьте приложение повторно";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
      })
    },
  }

}
</script>
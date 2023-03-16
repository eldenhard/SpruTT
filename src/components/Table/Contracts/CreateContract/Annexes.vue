<template>
<div>

  <b-modal id="bv-modal-annex-modal" ref="annex-modal" hide-footer size="lg">
    <template #modal-title>
     Добавление приложения к договору № {{ contract }}
    </template>

<form id="FormAnnex"  @submit="createAnnex">
  <table class="table table-sm table-bordered">
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
    <tr>
      <th style="padding: 0"><input type="text" name="contract" v-model="contract" readonly style="width:100% !important; text-align: center;"></th>
      <td style="padding: 0"><input type="text" name="doc_type" v-model="doc_type" style="width:100% !important; text-align: center;"></td>
      <td style="padding: 0"><input type="text" name="number" v-model="number" style="width:100% !important; text-align: center;"></td>
      <td style="padding: 0"><input type="date" name="created_at" v-model="created_at" style="width:100% !important; text-align: center;"></td>
      <td style="padding: 0"><input type="text" name="comment" v-model="comment" style="width:100% !important; text-align: center;"></td>
      <td><input type="file" name="scan"></td>
    </tr>
   
  </tbody>
</table>

  <div style="display: flex; justify-content: space-around; margin-top: 7%;">
    <button  type="submit" style="width: 15%" class="button Accept">Создать</button><br>
    <button style="width: 15%" class="button Delete"  block variant="danger" @click="$bvModal.hide('bv-modal-annex-modal')">Закрыть</button>
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
.textarea{
  background: transparent;
  height: 30px;
  border: #bdc3c7 0.1rem solid !important;
  color: black
}
</style>
<script>
import Notifications from "@/components/notifications/Notifications.vue";
import api from "@/api/directory"

export default{
    name: 'annexes',
    components: { Notifications},

    data(){
        return {
          doc_type: '',
          number: '',
          comment: '',
          created_at: '',
          showNotify: false,
        notifyHead: "",
        notifyMessage: "",
        notifyClass: "",
        } 
    },
    props: ['contract', 'btnClickHandler'],
    methods: {
      hideModal() {
        this.$refs['annex-modal'].hide()
      },
      createAnnex(e){
      if (e && e.preventDefault) { e.preventDefault(); }
      let data = new FormData(e.target);
      console.log(data)
      api.CreateCurrentAnnex(data)
      .then(response => {
        document.querySelector('#FormAnnex').reset()
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
<template>
<div>
    <div class="d-block text-center"  v-for="(item, index) in ContractAnnexes" :key="item.id" style="margin-top: 3%;">
    <h4>Приложение {{ index+1 }}</h4>
      <div  style="display: flex; justify-content: space-around;">
        <label for="">Тип приложения <br>
          <input type="text" class="textarea" v-model="doc_type">
        </label>
        <label for="">Номер приложения <br>
          <input type="text" class="textarea" v-model="number">
        </label>
        <label for="">Дата <br>
          <input type="date" class="textarea" v-model="created_at">
        </label>
      </div>

      <div  style="display: flex; justify-content: space-around;">
        <label for="">Примечание<br>
          <input type="text" class="textarea" v-model="comment">
        </label>
        <label for="">Скан-копия  <br>
          <input type="file" class="textarea"  @change="readFile()">
        </label>
        <label for="">Номер договора <br>
          <input type="text" class="textarea" v-model="contract">
        </label>
      </div>
     <div style="display: flex; justify-content: space-around; margin-top: 2%;">
      <button style="width: 15%" class="button Delete"  @click="DeleteContractAnnexes(index)">Удалить приложение</button>
     </div>
     <hr>
  </div>
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
export default{
    name: 'annexes',
    data(){
        return {
            doc_type: '',
            number: '',
            created_at: '', 
            comment: '', 
            scan: '',
            contract: ''
        } 
    },
    props: ['ContractAnnexes'],
    methods: {
        DeleteContractAnnexes(index){
        this.ContractAnnexes.splice(index, 1);
        },
        readFile() {
        this.scan = this.$refs.file.files[0];
        },
    }
}
</script>
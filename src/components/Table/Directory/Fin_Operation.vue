<template>
  <div>
    <div class="month_block">
      <label for="">
        Месяц <br />
        <input type="month" class="textarea" v-model="month" />
      </label>
      <button class="Accept button" @click="getDayOnMonth()">Загрузить</button>
    </div>


      <table border="1"  style="margin-top: 15%;">
        <th rowspan="2">Наименование статьи</th>
        <th rowspan="2">План утв.</th>
        <template v-for="item in num">
            <th :key="item.id">{{ item }}</th>
        </template>
   
      </table>
    
  </div>
</template>


<script>
export default {
  data() {
    return {
      month: "",
      num: "",
 
    };
  },
  methods: {
    getDayOnMonth(){
        let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        let arr = this.month.split('-')
        let lastday = new Date(arr[0], arr[1], 0)
        this.num =  lastday.getDate()

    }
    
  }
};
</script>

<style lang="scss" scoped>
.month_block {
margin-left: auto;
display: flex;
flex-direction: column;
justify-content: flex-end;
    button{
        width: 25%
    }
}

</style>
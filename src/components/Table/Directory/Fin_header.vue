<template>
     <div class="month_block">
      <label for="">
        Месяц <br />
        <input type="month" class="textarea" v-model="month" />
      </label>
      <button class="Accept button" @click="getDayOnMonth()">Загрузить</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            month: "",
        }
    },
    methods: {
        getDayOnMonth(){
            let id = this.month
            window.open("/fin_operation/" + `${id}`, "_blank");
        }
    }
}
</script>
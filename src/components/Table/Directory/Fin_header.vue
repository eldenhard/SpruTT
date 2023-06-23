<template>
  <div>
    <Loader :loader="loader" />
    <p class="explanation">
      * Выберите необходимый месяцй и год <br />
      * После нажатия на кнопку загрузки откроется таблица с данными в новой
      вкладке <br />
    </p>
    <div class="month_block">
      <label for="">
        Месяц <br />
        <input type="month" class="textarea" v-model="month" />
      </label>
      <button class="Accept button textarea" @click="getDayOnMonth()">
        Загрузить
      </button>
    </div>
    
  </div>
</template>
<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import fin_counterpartie from "@/helpers/fin_counterpartie";

export default {
  components: { Loader },
  data() {
    return {
      month: "",
      table_Data: "",
      loader: false,
      data: fin_counterpartie,

    };
  },
 
  methods: {
  
    getDayOnMonth() {
    
      let id = this.month;
      window.open("/fin_operation/" + `${id}`, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.month_block {
  width: 25%;
  margin-right: auto;
  button {
    background: green;
    margin-top: 1%;
  }
}
table{
    margin-top: 2%;
    width: 100%;
}
td:hover::after {
    content: "→";
    font-weight: bold;

}
td:hover{
    font-weight: bold;
    background: lightgray;
 
}
td,th {
  border: 1px solid black;
}
</style>
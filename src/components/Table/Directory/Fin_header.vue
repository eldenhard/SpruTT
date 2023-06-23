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
    <table>
      <thead>
        <tr>
          <th>Название файла</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in table_Data" :key="item.id">
          <td @click="OpenTable(item)">{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
export default {
  components: { Loader },
  data() {
    return {
      month: "",
      table_Data: "",
      loader: false,
    };
  },
  mounted() {
    this.loader = true
    api
      .getIncomes()
      .then((response) => {
        this.loader = false
        this.table_Data = response.data;
      })
      .catch((error) => {
        this.loader = false
        console.log(error);
      });
  },
  methods: {
    OpenTable(data){
        window.open("/fin_operation/" + `${data}`, "_blank");
    },
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
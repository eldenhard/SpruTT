<template>
  <div>
    <!-- <pre>{{data}}</pre> -->
    <Loader :loader="loader" />
    <Periods @Action="Actioned" @data="getCurrentData"/>
    <div style="overflow: auto; margin-top: 5%">
      <p>Форма 4.4 "Парк, переданный в аренду"</p>

      <table border="1" align="center">
        <thead>
          <tr>
            <th>Тип ПС/ Арендатор</th>
            <th>Кол-во на начало периода</th>
            <th>Кол-во на конец периода</th>
            <th>Кол-во в/с</th>
            <th>Ставка руб без НДС</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <tr v-for="item in data" :key="item.id" class="blue_line">
            <td class="blue_line">Полувагон</td>
            <td>{{ item.margins.pv.on_begin | format }}</td>
            <td>{{ item.margins.pv.on_end | format }}</td>
            <td>{{ item.margins.pv.days | format }}</td>
            <td>{{ item.margins.pv.stavka | format }}</td>
          </tr>

          <template v-for="item in data">
            <tr v-for="pv in item.pv" :key="pv.id">
              <td class="col1">{{ substetition(pv.tenant__work_name) }}</td>
              <td>{{ pv.on_begin | format }}</td>
              <td>{{ pv.on_end | format }}</td>
              <td>{{ pv.days | format }}</td>
              <td>{{ pv.stavka | format }}</td>
            </tr>
          </template>

          <tr v-for="itemCs in data" :key="itemCs.id" class="blue_line">
            <td class="blue_line">Цистерна</td>
            <td>{{ itemCs.margins.cs.on_begin | format }}</td>
            <td>{{ itemCs.margins.cs.on_end | format }}</td>
            <td>{{ itemCs.margins.cs.days | format }}</td>
            <td>{{ itemCs.margins.cs.stavka | format }}</td>
          </tr>

          <template v-for="item in data">
            <tr v-for="cs in item.cs" :key="cs.id">
              <td  class="col1">{{ substetition(cs.tenant__work_name)  }}</td>
              <td>{{ cs.on_begin | format }}</td>
              <td>{{ cs.on_end | format }}</td>
              <td>{{ cs.days | format }}</td>
              <td>{{ cs.stavka | format }}</td>
            </tr>
          </template>

          <template v-for="itemCs in data">
            <tr :key="itemCs.id" class="blue_line">
              <td class="blue_line">ИТОГО</td>
              <td>{{ itemCs.margins.total?.on_begin | format }}</td>
              <td>{{ itemCs.margins.total?.on_end | format }}</td>
              <td>{{ itemCs.margins.total?.days | format }}</td>
              <td>{{ itemCs.margins.total?.stavka | format }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Periods from "./Periods.vue";
import api from "@/api/reportUO";
import Loader from '@/components/loader/loader.vue';
import { mapState } from "vuex";
export default {
  components: { Periods, Loader },
  data() {
    return {
      data: [],
      date_begin: "",
      date_end: "",
      loader: false,
    };
  },
  filters: {
    format(value){
         return  String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        },
  },
  computed: {
  ...mapState({
    counter: state => state.counterparties.counterparties
  })
  },

  methods: {
    substetition(value){
      for(let i in this.counter){
        if(this.counter[i].work_name == value){
          return value = this.counter[i].full_name
        }
      }
    },
    Actioned() {
      this.data = []
      this.loader = true
      api
        .getUO44(this.date_begin, this.date_end)
        .then((response) => {
          this.loader = false
          this.data.push(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          this.loader = false;
          console.log(error, "AAAAAAAAAAAAAAAAA");
        });
    },
    getCurrentData(data) {
      this.date_begin = data.date_begin;
      this.date_end = data.date_end;
    },
  },
};
</script>



<style scoped>
.col1 {
  text-align: left !important;
  padding-left: 2% !important;

  /* border: lightgray; */
}
.col2 {
  min-width: 120px;
  max-width: 120px;
  /* border: lightgray; */
}
.number {
  background: #b6df89;
  color: #41766f;
  /* width: calc(v-bind("index_font_size") * 5); */
}

.blue_line {
  background: #daeef3;
  text-align: left !important;
  font-weight: bold;
  color: black !important;
  padding-left: 1% !important;
}
tr:hover {
  background: #dddddd !important;
  cursor: pointer;
}
/* tr>.blue_line:hover{
    background: #ddd;
} */
th {
  font-weight: 400 !important;
  border: 1px solid grey;
}
td {
  color: black !important;
}
tr,
td,
th {
  border: 1px solid black;
}

.widthFirst {
  /* width: calc(v-bind("index_font_size") * 8); */
}
.headers {
  text-align: left !important;
  padding-left: 1%;
}
</style>
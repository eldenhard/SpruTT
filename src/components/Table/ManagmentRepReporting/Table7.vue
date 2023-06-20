<template>
  <div>
    <!-- <div style="display: flex; justify-content: space-between;">
      <pre>{{object2}}</pre>
      <pre>{{ normalized }}</pre>
      <pre>{{objects}}</pre>
    </div> -->
   
    <Loader :loader="loader" />
    <Periods @Action="get47" @data="getCurrentData" />
    <label for="">
        Тип вагона
        <br />
        <select name="" id="" v-model="wag_type">
          <option value="Полувагон">Полувагон</option>
          <option value="Цистерна">Цистерна</option>
        </select>
      </label>
    <div style="margin-top: 3%;">
      <p>Форма 4.7 "Анализ перевозки и выручки по сегменту полувагонов"</p>
      <button id="button" @click="fnExcelReport()">Export HTML Table to EXCEL</button>
      <table border="1" id="theTable">
        <thead>
          <tr>
            <!-- <th></th> -->
            <th>Парк (собств. / привлеченный)</th>
            <th>Полигон</th>
            <th>Кол-во погрузок</th>
            <th>Выручка, руб. без НДС</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="object in normalized">
            <template v-for="obj in object.data">
            <tr v-for="(subobj, index) in obj.attr2" :key="subobj.id">
              <td v-if="index == 0" :rowspan="obj.attr2.length">
                {{ obj.attr1 | ifNull}}
              </td>
              <td>{{ subobj?.polygon | ifNull}}</td>
              <td>{{ subobj?.amount.toFixed(2) | format}}</td>
              <td>{{ subobj?.revenue.toFixed(2) | format}}</td>
            </tr>
            <tr class="total_row" :key="obj.id">
              <td
                style="text-align: left !important; padding-left: 1% !important"
              >
                Итого {{ obj.attr1 | ifNull}}
              </td>
              <td></td>
              <td>{{ obj?.total?.amount.toFixed(2)| format }}</td>
              <td>{{ obj?.total?.revenue.toFixed(2) | format}}</td>
            </tr>
            </template>
          </template>
          <tr v-for="obj in normalized" :key="obj.id" class="all_total">
            <td
              style="
                font-weight: bold;
                text-align: left !important;
                padding-left: 1% !important;
              "
            >
              Всего погрузки
            </td>
            <td></td>
            <td>{{ obj?.ALL_TOTAL?.amount.toFixed(2) | format}}</td>
            <td>{{ obj?.ALL_TOTAL?.revenue.toFixed(2) | format}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import api from "@/api/reportUO";
import Periods from "./Periods.vue";
import Loader from "@/components/loader/loader.vue";
export default {
  components: { Periods, Loader },
  data() {
    return {
      loader: false,
      date_begin: "",
      date_end: "",
      wag_type: "Полувагон",
      normalized: "",
      objects2: "",
    };
  },
  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
    ifNull(value){
      if(value == null || value == 'null'){
        return 'Неопределенно'
      }
        return value
    }
  },
  methods: {
    fnExcelReport() {
  var table = document.getElementById('theTable'); // id of table
  var tableHTML = table.outerHTML;
  var fileName = 'Таблица_7_!.xlsx';

  var msie = window.navigator.userAgent.indexOf("MSIE ");

    var a = document.createElement('a');
    tableHTML = tableHTML.replace(/  /g, '').replace(/ /g, '%20'); // replaces spaces
    a.href = 'data:application/vnd.ms-excel,' + tableHTML;
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

},
    normalizeObject(){
      const test = Object.keys(this.objects2.data).map((key) => {
        const obj = {
          attr1: key,
          attr2: (Object.keys(this.objects2.data[key].data)).map((polygon) => {
            return {
              polygon: polygon,
              ...this.objects2.data[key].data[polygon],
            }
          }),
          total: this.objects2.data[key].total
        };
        return obj;
      });

      this.normalized = [
        {
          data: test,
          ALL_TOTAL: this.objects2.total,
        },
      ];
    },
    getRowCount(obj) {
      let total = 0;
      let last_item = "";
      obj.attr1.forEach((item) => {
        total += item.attr3.length;
      });
      return total;
    },
    getCurrentData(data) {
      this.date_begin = data.date_begin;
      this.date_end = data.date_end;
    },
    get47() {
      this.loader = true;
      api
        .getUO47(this.date_begin, this.date_end, this.wag_type)
        .then((response) => {
          this.loader = false;
          this.objects2 = response.data;
          this.normalizeObject();
        })
        .catch((error) => {
          console.log(error);
          this.loader = false;
        });
    },
  },
};
</script>


<style scoped>
td,th,tr{
  border: 1px solid black
}
tr:hover{
  background: lightgray;
}
.total_row {
  background: #daeef3;
}
td {
  border: 1px solid black !important;
  color: black !important;
}
.all_total {
  background: #eaf1dd;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table > tbody > tr > td,
table > tbody > tr > td.inner > div {
  vertical-align: top;
  border: 1px solid #ddd;
}
table > tbody > tr > td.inner {
  padding: 0;
  border-right: 0;
}
table > tbody > tr > td.inner > div {
  padding: 5px;
  border-width: 0 0 1px 0;
}
table > tbody > tr > td.inner > div:last-child {
  border: 0;
}
table > tbody > tr > td.inner > table {
  margin-bottom: 0;
}
table > tbody > tr > td.inner > table td {
  border-width: 0 1px 1px 0;
}
table > tbody > tr > td.inner > table tr:last-child td {
  border-bottom: 0;
}

table > tbody > tr > td.inner > div {
  border-right: 0;
}
thead > th {
  border: 1px solid black;
}
</style>
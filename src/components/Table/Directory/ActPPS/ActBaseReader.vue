<template>
  <div style="margin-top: 5%;">
    <div class="filter">
        <label for="amount"
        >Количество строк <br />
        <select
          name="amount_row"
          id="amount"
          v-model="filter.page_size"
          style="width: 100%"
          class="mini"
        >
          <option value="" disabled>кол-во строк на странице</option>
          <option value="1">1</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
      </label>
      <label>
        <br>
        <button class="button Accept mini" @click="getPPS()">Запросить</button>
      </label>
        
    </div>
    <table border="1">
      <thead>
        <tr>
          <th>№</th>
          <th>Вагон</th>
          <th>Дата передачи вагона на подъездной путь</th>
          <th>Дата проведения работ</th>
          <th>Дата вывода вагона с подъездного пути</th>
          <th>Расчетное время в сутках</th>
          <th>Дата обработки</th>
          <th>Номер заявки</th>
          <th>Операция</th>
          <th>Цена без НДС</th>
          <th>Контрагент</th>
          <th>Дата акта</th>
          <th>Подготовлено под груз</th>
          <th>Из под груза</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item, index in data" :key="item.id">
          <td>{{ index+1 }}</td>
          <td>
             <InputLoader :idItem="`wagon`" :idLoader="`wagload`" :Visible="false" :valueDataInp="item.wagon" :typeInp="'number'" @changeData='DataChange'/>
            </td>
            <td>
             <InputLoader :idItem="`date_pp_in`" :idLoader="`date_pp_inload`" :Visible="false" :valueDataInp="item.date_pp_in" :typeInp="'date'" @changeDate='DateChange'/>
            </td>
            <td>
             <InputLoader :idItem="`date_work`" :idLoader="`date_workload`" :Visible="false" :valueDataInp="item.date_work" :typeInp="'date'" @changeDate='DateChange'/>
            </td>
            <td>
             <InputLoader :idItem="`date_pp_out`" :idLoader="`date_pp_outload`" :Visible="false" :valueDataInp="item.date_pp_out" :typeInp="'date'" @changeDate='DateChange'/>
            </td>
            <td>
             <InputLoader :idItem="`days`" :idLoader="`daysload`" :Visible="false" :valueDataInp="item.days" @changeData='DataChange'/>
            </td>
            <td>
             <InputLoader :idItem="`date_processing`" :idLoader="`date_processingload`" :Visible="false" :valueDataInp="item.date_processing" :typeInp="'date'" @changeDate='DateChange'/>
            </td>
            <td>
             <InputLoader :idItem="`application_number`" :idLoader="`application_numberload`" :Visible="false" :valueDataInp="item.application_number" @changeData='DataChange'/>
            </td>
            <td>
             <InputLoader :idItem="`operation`" :idLoader="`operationload`" :Visible="false" :valueDataInp="item.operation" @changeData='DataChange'/>
            </td>
            <td>
             <InputLoader :idItem="`price_wo_nds`" :idLoader="`price_wo_ndsload`" :Visible="false" :valueDataInp="item.price_wo_nds" @changeData='DataChange'/>
            </td>
            <td>
             <InputLoader :idItem="`counterparty`" :idLoader="`counterpartyload`" :Visible="false" :valueDataInp="item.counterparty" @changeData='DataChange'/>
            </td>
            <td>
             <InputLoader :idItem="`act_date`" :idLoader="`act_dateload`" :Visible="false" :valueDataInp="item.act_date" :typeInp="'date'" @changeDate='DateChange'/>
            </td>
            <td>
             <InputLoader :idItem="`for_cargo`" :idLoader="`for_cargoload`" :Visible="false" :valueDataInp="item.for_cargo" @changeData='DataChange'/>
            </td>
            <td>
             <InputLoader :idItem="`from_cargo`" :idLoader="`from_cargoload`" :Visible="false" :valueDataInp="item.from_cargo" @changeData='DataChange'/>
            </td>
        </tr>
      </tbody>
    </table>
    <div id="wrapper">
      <ul id="pagination">
        <li v-for="btn in total_pages" :key="btn.id">
          <a
            @click="getPagination(filter.page_size, btn)"
            :class="{
              active123: Truefalse(btn),
              active_new: pageNumber == btn,
            }"
            >{{ btn }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/api/directory'
import InputLoader from '../../../ui/InputLoader.vue';
class BaseReader{
  constructor() {
    this.date_pp_in = null;
    this.date_work = null;
    this.date_pp_out = null;
    this.days = 0;
    this.date_processing = null;
    this.application_number = null;
    this.operation = null;
    this.price_wo_nds = 0;
    this.counterparty = null;
    this.wagon = 0;
    this.for_cargo = null;
    this.from_cargo = null;
    this.act_date = null;
  }
}
export default {
  name: "acrBaseReader",
  components: { InputLoader },
  data() {
    return {
      interval: 2,
      loader: false,
      pagination: "",
      total_pages: "",
      total_objects: "",
      data: [],
      pageNumber: 1,
        filter: {
            page_size: "",
        }
    };
  },
  methods: {
    DataChange (data) {
        console.log('child component said login', data)
    },
    DateChange(data){
      console.log('child component said login', data)
    },
    getData(value){
      console.log(value)
    },
    Truefalse(btn) {
      if (btn == this.pageNumber) {
        return true;
      }
      if (btn == 1) {
        return true;
      }
      if (btn == this.total_pages) {
        return true;
      }
      if (btn > this.pageNumber && btn < this.pageNumber + this.interval) {
        return true;
      }
      if (btn < this.pageNumber && btn > this.pageNumber - this.interval) {
        return true;
      }

      return false;
    },
    getPagination(pg_size, pg_number) {
      this.loader = true;
      api
        .getAllArendaDataStavkaPage(this.filter, pg_size, pg_number)
        .then((response) => {
          this.loader = false;
          for(let i in response.data.data){
            console.log(response.data.data[i])
              newClass.date_pp_in = response.data.data[i].date_pp_in;
              newClass.date_work = response.data.data[i].date_work;
              newClass.date_pp_out = response.data.data[i].date_pp_out;
              newClass.days = response.data.data[i].days;
              newClass.date_processing = response.data.data[i].date_processing;
              newClass.application_number = response.data.data[i].application_number;
              newClass.operation = response.data.data[i].operation;
              newClass.price_wo_nds = response.data.data[i].price_wo_nds;
              newClass.counterparty = response.data.data[i].counterparty;
              newClass.wagon = response.data.data[i].for_cargo.wagon;
              newClass.for_cargo = response.data.data[i].for_cargo;
              newClass.from_cargo = response.data.data[i].from_cargo;
              newClass.act_date = response.data.data[i].act_date;
          this.data.push(newClass)
          }
          this.pageNumber = response.data.page_number;
        })

        .catch((error) => {
          this.loader = false;
        });
    },
    getPPS() {
      this.loader = true;
      this.data = []
      console.log('1')
      api
        .getpps(this.filter)
        .then((response) => {
          this.loader = false;
        
          console.log(response.data)
          for(let i in response.data.data){
            let newClass = new BaseReader()
              newClass.date_pp_in = response.data.data[i].date_pp_in;
              newClass.date_work = response.data.data[i].date_work;
              newClass.date_pp_out = response.data.data[i].date_pp_out;
              newClass.days = response.data.data[i].days;
              newClass.date_processing = response.data.data[i].date_processing;
              newClass.application_number = response.data.data[i].application_number;
              newClass.operation = response.data.data[i].operation;
              newClass.price_wo_nds = response.data.data[i].price_wo_nds;
              newClass.counterparty = response.data.data[i].counterparty;
              newClass.wagon = response.data.data[i].wagon;
              newClass.for_cargo = response.data.data[i].for_cargo;
              newClass.from_cargo = response.data.data[i].from_cargo;
              newClass.act_date = response.data.data[i].act_date;
              this.data.push(newClass)
          }
         
          // this.data = response.data.data;
          console.log(this.data)
          this.pageNumber = response.data.page_number;
          this.pagination = response.data.links;
          this.total_pages = response.data.total_pages;
          this.total_objects = response.data.total_objects;
        })
        .catch((error) => {
          this.loader = false;
        });
    },
  }
};
</script>

<style lang="scss" scoped>
.mini {
  height: 40px;
}
.filter{
    display: flex;
    justify-content: space-between;
    // grid-template-columns: 1fr 1fr 1fr
}
.filter {
  margin-top: 4%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border: 1px solid lightgrey;
  padding: 1%;
  label {
    color: rgb(146, 146, 146);
  }
}
#wrapper {
  margin: 0 auto;
  display: block;
  margin-top: 2%;
  max-width: 80%;
  width: 80%;
}
#pagination {
  margin: 0;
  padding: 0;
  text-align: center;
}
#pagination li {
  display: inline;
}
#pagination li a {
  display: inline-block;
  text-decoration: none;
  padding: 5px 10px;
  color: #000;
  cursor: pointer;
}

/* Active and Hoverable Pagination */
#pagination li a {
  border-radius: 5px;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
}
#pagination li a.active_new {
  background-color: #18842a;
  color: #fff;
}
#pagination li a:hover:not(.active_new) {
  background-color: #ddd;
}
#pagination li a:not(.active123) {
  display: none;
}
/* border-pagination */
.b-pagination-outer {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  display: flex;
}
#border-pagination {
  margin: 0 auto;
  padding: 0;
  text-align: center;
}
#border-pagination li {
  display: inline;
}
#border-pagination li a {
  display: block;
  text-decoration: none;
  color: #000;
  padding: 5px 10px;
  border: 1px solid #ddd;
  float: left;
}
#border-pagination li a {
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
}
#border-pagination li a.active_new {
  background-color: #18842a;
  color: #fff;
}
#border-pagination li a:hover:not(.active_new) {
  background: #ddd;
}
</style>
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
             <InputLoader :idItem="`wagon`+item.id" :idLoader="`wagload`+item.id" :Visible="false" :value="item.wagon" :typeInp="'number'"/>
            </td>
            <td>
             <InputLoader :idItem="`date_pp_in`+item.id" :idLoader="`date_pp_inload`+item.id" :Visible="false" :value="item.date_pp_in" :typeInp="'date'"/>
            </td>
            <td>
             <InputLoader :idItem="`date_work`+item.id" :idLoader="`date_workload`+item.id" :Visible="false" :value="item.date_work" :typeInp="'date'"/>
            </td>
            <td>
             <InputLoader :idItem="`date_pp_out`+item.id" :idLoader="`date_pp_outload`+item.id" :Visible="false" :value="item.date_pp_out" :typeInp="'date'"/>
            </td>
            <td>
             <InputLoader :idItem="`days`+item.id" :idLoader="`daysload`+item.id" :Visible="false" :value="item.days"/>
            </td>
            <td>
             <InputLoader :idItem="`date_processing`+item.id" :idLoader="`date_processingload`+item.id" :Visible="false" :value="item.date_processing" :typeInp="'date'"/>
            </td>
            <td>
             <InputLoader :idItem="`application_number`+item.id" :idLoader="`application_numberload`+item.id" :Visible="false" :value="item.application_number"/>
            </td>
            <td>
             <InputLoader :idItem="`operation`+item.id" :idLoader="`operationload`+item.id" :Visible="false" :value="item.operation"/>
            </td>
            <td>
             <InputLoader :idItem="`price_wo_nds`+item.id" :idLoader="`price_wo_ndsload`+item.id" :Visible="false" :value="item.price_wo_nds"/>
            </td>
            <td>
             <InputLoader :idItem="`counterparty`+item.id" :idLoader="`counterpartyload`+item.id" :Visible="false" :value="item.counterparty"/>
            </td>
            <td>
             <InputLoader :idItem="`act_date`+item.id" :idLoader="`act_dateload`+item.id" :Visible="false" :value="item.act_date" :typeInp="'date'"/>
            </td>
            <td>
             <InputLoader :idItem="`for_cargo`+item.id" :idLoader="`for_cargoload`+item.id" :Visible="false" :value="item.for_cargo"/>
            </td>
            <td>
             <InputLoader :idItem="`from_cargo`+item.id" :idLoader="`from_cargoload`+item.id" :Visible="false" :value="item.from_cargo"/>
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
      data: "",
      pageNumber: 1,
        filter: {
            page_size: "",
        }
    };
  },
  methods: {
 
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
          this.data = response.data.data;
          console.log(this.data);
          this.pageNumber = response.data.page_number;
        })

        .catch((error) => {
          this.loader = false;
          console.log(error);
        });
    },
    getPPS() {
      this.loader = true;
    
      api
        .getpps(this.filter)
        .then((response) => {
          this.loader = false;
          this.data = response.data.data;
          console.log(this.data);
          
          this.pageNumber = response.data.page_number;
          this.pagination = response.data.links;
          this.total_pages = response.data.total_pages;
          this.total_objects = response.data.total_objects;
        })
        .catch((error) => {
          this.loader = false;
          console.log(error.response);
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
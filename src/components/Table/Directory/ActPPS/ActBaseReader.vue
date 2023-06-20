<template>
  <div style="margin-top: 5%">
    <Loader :loader="loader" />

    <b-modal id="AcTDelete" hide-footer>
      <template #modal-title> Подтверждение действия </template>
      <div class="d-block text-center">
        <h4>Вы уверены, что хотите удалить данные?</h4>
        <p>В случае удаления, данные будут потеряны безвозвратно</p>
      </div>
      <b-button variant="danger" @click="deletePPS(selected_record)"
        >Да, я уверен</b-button
      >
      <b-button class="mt-3" block @click="$bvModal.hide('AcTDelete')"
        >Нет, отменить</b-button
      >
    </b-modal>

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
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
      </label>
      <label for="">
        <div class="select_btn">
          <div>
            <input type="radio" id="one" value="code6" v-model="picked" />
            <label for="one">&nbsp;Код 6 груза</label>
          </div>
          <div>
            <input type="radio" id="two" value="name" v-model="picked" /><label
              for="two"
              >&nbsp;Наимен. груза</label
            >
          </div>
        </div>
        <input
          class="textarea mini"
          style="margin-top: -2%"
          :type="InpType"
          :placeholder="InpPlaceholder"
          v-model="filter.for_cargo"
        />
      </label>
      <label for="">
        Контрагент <br />
        <input type="text" class="textarea mini" />
      </label>
      <label for="">
        № вагонов <br />
        <input type="text" class="textarea mini" />
      </label>

      <button
        class="button Accept mini"
        style="width: 320px; margin-left: auto !important; float: right"
        @click="getPPS()"
      >
        Запросить
      </button>

      <div
        class="textarea"
        style="height: auto; width: 100%; margin-top: 2%"
        v-show="ten_visible"
      >
        <ul id="root_tenant">
          <li
            v-for="item in filter_cargo"
            :key="item.id"
            @click="checkCargo(item.code6)"
          >
            <span>{{ item.name }} ({{ item.code6 }})</span>
            <hr />
          </li>
        </ul>
      </div>
    </div>
    <p class="amount" style="padding-top: 2%">
      Всего записей: {{ total_objects }}
    </p>
    <table border="1">
      <thead>
        <tr>
          <th>№</th>
          <th>Вагон</th>
          <th>Дата передачи на подъез. путь</th>
          <th>Дата проведения работ</th>
          <th>Дата вывода с подъез. пути</th>
          <th>Расчетное время в сутках</th>
          <th>Дата обработки</th>
          <th>Номер заявки</th>
          <th>Операция</th>
          <th>Цена без НДС</th>
          <th>Контрагент</th>
          <th>Дата акта</th>
          <th>Подготовлено под груз (код 6)</th>
          <th>Из под груза (код 6)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id" :id="item.id">
          <td>
            <input
              class="deleteRow"
              style="width: 100%"
              :value="index + 1"
              readonly
              @click="open_modal(item.id)"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`wagon`"
              :idRow="item.id"
              :idLoader="`wagload ${item.id}`"
              :idElement="`wagon ${item.id}`"
              :valueDataInp="item.wagon"
              :typeInp="'number'"
              @changeData="DataChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`date_pp_in`"
              :idRow="item.id"
              :idLoader="`date_pp_inload ${item.id}`"
              :idElement="`date_pp_in ${item.id}`"
              :valueDataInp="item.date_pp_in"
              :typeInp="'date'"
              @changeDate="DateChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`date_work`"
              :idRow="item.id"
              :idLoader="`date_workload ${item.id}`"
              :idElement="`date_work ${item.id}`"
              :valueDataInp="item.date_work"
              :typeInp="'date'"
              @changeDate="DateChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`date_pp_out`"
              :idRow="item.id"
              :idLoader="`date_pp_outload ${item.id}`"
              :idElement="`date_pp_out ${item.id}`"
              :valueDataInp="item.date_pp_out"
              :typeInp="'date'"
              @changeDate="DateChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`days`"
              :idRow="item.id"
              :idLoader="`daysload ${item.id}`"
              :idElement="`days ${item.id}`"
              :valueDataInp="item.days"
              @changeData="DataChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`date_processing`"
              :idRow="item.id"
              :idLoader="`date_processingload ${item.id}`"
              :idElement="`date_processing ${item.id}`"
              :valueDataInp="item.date_processing"
              :typeInp="'date'"
              @changeDate="DateChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`application_number`"
              :idRow="item.id"
              :idLoader="`application_numberload ${item.id}`"
              :idElement="`application_number ${item.id}`"
              :valueDataInp="item.application_number"
              @changeData="DataChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`operation`"
              :idRow="item.id"
              :idLoader="`operationload ${item.id}`"
              :idElement="`operation ${item.id}`"
              :valueDataInp="item.operation"
              @changeData="DataChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`price_wo_nds`"
              :idRow="item.id"
              :idLoader="`price_wo_ndsload ${item.id}`"
              :idElement="`price_wo_nds ${item.id}`"
              :valueDataInp="item.price_wo_nds"
              @changeData="DataChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`counterparty`"
              :idRow="item.id"
              :idLoader="`counterpartyload ${item.id}`"
              :idElement="`counterparty ${item.id}`"
              :valueDataInp="item.counterparty"
              @changeData="DataChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`act_date`"
              :idRow="item.id"
              :idLoader="`act_dateload ${item.id}`"
              :idElement="`act_date ${item.id}`"
              :valueDataInp="item.act_date"
              :typeInp="'date'"
              @changeDate="DateChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`for_cargo`"
              :idRow="item.id"
              :idLoader="`for_cargoload ${item.id}`"
              :idElement="`for_cargo ${item.id}`"
              :valueDataInp="item.for_cargo"
              @changeData="DataChange"
            />
          </td>
          <td>
            <InputLoader
              :nameInp="`from_cargo`"
              :idRow="item.id"
              :idLoader="`from_cargoload ${item.id}`"
              :idElement="`from_cargo ${item.id}`"
              :valueDataInp="item.from_cargo"
              @changeData="DataChange"
            />
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
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
    />
  </div>
</template>

<script>
import api from "@/api/directory";
import InputLoader from "../../../ui/InputLoader.vue";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import { mapState } from "vuex";
class BaseReader {
  constructor() {
    this.id = 0;
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
  components: { InputLoader, Loader, Notifications },
  data() {
    return {
      cargo: "",

      interval: 2,
      InpType: "",
      picked: "code6",
      ten_visible: false,
      VisibleLoader: false,
      loader: false,
      pagination: "",
      total_pages: "",
      total_objects: 0,
      data: [],
      Status: "",
      pageNumber: 1,
      loader: false,
      selected_record: "",
      filter: {
        page_size: "",
        for_cargo: "",
      },
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  mounted(){
    document.body.addEventListener('click', this.closeWindowo)
  },
  watch:{
    ten_visible(){
      if(this.filter.cargo_code.length < 1){
        this.ten_visible = false
      }
    }
  },
  computed: {
    ...mapState({
      cargo_code: (state) => state.cargo_code.cargo_code,
    }),
    filter_cargo() {
      if (this.filter.for_cargo.length > 1) {
        this.ten_visible = true;
      }
      if (this.InpType == "text") {
        return this.filter.for_cargo.length > 1
          ? this.cargo_code.filter((item) =>
              item.name.toLowerCase().includes(this.filter.for_cargo.toLowerCase())
            )
          : "";
      } else {
        let data = [...this.cargo_code];
        for (let i in data) {
          if (data[i].code6 == null) {
            data[i].code6 = "нет данных";
          }
        }
        if (this.filter.for_cargo.length > 1) {
          return data.filter((item) =>
            item.code6.includes(this.filter.for_cargo.toString())
          );
        }
      }
    },
    InpPlaceholder() {
      if (this.picked == "code6") {
        this.InpType = "number";
        return "Введите код 6 груза (под груз)";
      }
      this.InpType = "text";
      return "Введите наименование груза (под груз)";
    },
  },
  methods: {
    checkCargo(value){
      this.filter.for_cargo = value
      this.ten_visible = false
    },
    closeWindow(){
      this.ten_visible = false
    },
    open_modal(id) {
      this.selected_record = id;
      this.$bvModal.show("AcTDelete");
    },
    DataChange(data) {
      let elementLoader = document.getElementById(data.loader);
      let element = document.getElementById(data.idElement);
      elementLoader.style.display = "block";

      const result = Object.entries(data).map((item) => ({
        [item[0]]: item[1],
      }));

      api
        .patchpps(result[1].id, result[0])
        .then((response) => {
          console.log(response);
          elementLoader.style.display = "none";
          element.classList.add("successStatus");
          setTimeout(() => {
            element.classList.remove("successStatus");
          }, 1000);
        })
        .catch((error) => {
          elementLoader.style.display = "none";
          element.classList.add("errorStatus");
          setTimeout(() => {
            element.classList.remove("errorStatus");
          }, 1000);
          let errorAnnswerKey = Object.keys(error.response.data)[0];
          let errorAnnswerValue = Object.values(error.response.data)[0][0];

          switch (errorAnnswerKey) {
            case "wagon":
              errorAnnswerKey = "Вагон";
              break;
            case "date_pp_in":
              errorAnnswerKey = "Дата передачи вагона на подъездной путь";
              break;
            case "date_work":
              errorAnnswerKey = "Дата проведения работ";
              break;
            case "date_pp_out":
              errorAnnswerKey = "Дата вывода вагона с подъездного пути";
              break;
            case "days":
              errorAnnswerKey = "Расчетное время в сутках";
              break;
            case "date_processing":
              errorAnnswerKey = "Дата обработки";
              break;
            case "application_number":
              errorAnnswerKey = "Номер заявки";
              break;
            case "operation":
              errorAnnswerKey = "Операция";
              break;
            case "price_wo_nds":
              errorAnnswerKey = "Цена без НДС";
              break;
            case "counterparty":
              errorAnnswerKey = "Контрагент";
              break;
            case "for_cargo":
              errorAnnswerKey = "Подготовлено под груз";
              break;
            case "from_cargo":
              errorAnnswerKey = "Из под груза";
              break;
          }

          this.notifyHead = "Ошибка";
          this.notifyMessage = `${errorAnnswerKey} : ${errorAnnswerValue}`;
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 3500);
        });
    },
    DateChange(data) {
      let elementLoader = document.getElementById(data.loader);
      let element = document.getElementById(data.idElement);
      elementLoader.style.display = "block";

      const result = Object.entries(data).map((item) => ({
        [item[0]]: item[1],
      }));

      api
        .patchpps(result[1].id, result[0])
        .then((response) => {
          elementLoader.style.display = "none";
          element.classList.add("successStatus");
          setTimeout(() => {
            element.classList.remove("successStatus");
          }, 1000);
        })
        .catch((error) => {
          elementLoader.style.display = "none";
          element.classList.add("errorStatus");
          setTimeout(() => {
            element.classList.remove("errorStatus");
          }, 1000);

          this.notifyHead = "Ошибка";
          this.notifyMessage = error.response.data;
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 3500);
        });
    },
    getData(value) {
      console.log(value);
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
      this.data = [];

      api
        .getPaginationPPS(this.filter, pg_size, pg_number)
        .then((response) => {
          this.loader = false;
          this.total_objects = response.data.total_objects;
          for (let i in response.data.data) {
            let newClass = new BaseReader();
            newClass.id = response.data.data[i].id;
            newClass.date_pp_in = response.data.data[i].date_pp_in;
            newClass.date_work = response.data.data[i].date_work;
            newClass.date_pp_out = response.data.data[i].date_pp_out;
            newClass.days = response.data.data[i].days;
            newClass.date_processing = response.data.data[i].date_processing;
            newClass.application_number =
              response.data.data[i].application_number;
            newClass.operation = response.data.data[i].operation;
            newClass.price_wo_nds = response.data.data[i].price_wo_nds;
            newClass.counterparty = response.data.data[i].counterparty;
            newClass.wagon = response.data.data[i].wagon;
            newClass.for_cargo = response.data.data[i].for_cargo;
            newClass.from_cargo = response.data.data[i].from_cargo;
            newClass.act_date = response.data.data[i].act_date;
            this.data.push(newClass);
          }
          // console.log(this.data)
          this.pageNumber = response.data.page_number;
        })

        .catch((error) => {
          this.loader = false;
        });
    },
    getPPS() {
      this.loader = true;
      this.data = [];
      console.log(this.filter);
      api
        .getpps(this.filter)
        .then((response) => {
          this.loader = false;

          // console.log(response.data)
          for (let i in response.data.data) {
            let newClass = new BaseReader();
            newClass.id = response.data.data[i].id;
            newClass.date_pp_in = response.data.data[i].date_pp_in;
            newClass.date_work = response.data.data[i].date_work;
            newClass.date_pp_out = response.data.data[i].date_pp_out;
            newClass.days = response.data.data[i].days;
            newClass.date_processing = response.data.data[i].date_processing;
            newClass.application_number =
              response.data.data[i].application_number;
            newClass.operation = response.data.data[i].operation;
            newClass.price_wo_nds = response.data.data[i].price_wo_nds;
            newClass.counterparty = response.data.data[i].counterparty;
            newClass.wagon = response.data.data[i].wagon;
            newClass.for_cargo = response.data.data[i].for_cargo;
            newClass.from_cargo = response.data.data[i].from_cargo;
            newClass.act_date = response.data.data[i].act_date;
            this.data.push(newClass);
          }

          // this.data = response.data.data;
          // console.log(this.data)
          this.pageNumber = response.data.page_number;
          this.pagination = response.data.links;
          this.total_pages = response.data.total_pages;
          this.total_objects = response.data.total_objects;
        })
        .catch((error) => {
          this.loader = false;
        });
    },
    deletePPS(id) {
      this.loader = true;
      api
        .deletePPS(id)
        .then((response) => {
          this.loader = false;
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные удалены";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 2500);
          this.$bvModal.hide("AcTDelete");
        })
        .catch((error) => {
          this.loader = false;
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Данные не удалены";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 2500);
          console.log(error);
          this.$bvModal.hide("AcTDelete");
        });
      let row = document.getElementById(id);
      row.parentNode.removeChild(row);
    },
  },
};
</script>

<style lang="scss" scoped>
li{
  cursor: pointer
}
.select_btn {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
}
td,
th {
  border: 1px solid black;
}
.successStatus {
  transition: 0.5s ease-in-out;
  background: rgba(42, 190, 67, 0.4);
  color: black;
}

.errorStatus {
  transition: 0.5 ease-in-out;
  background: lightcoral;
  color: black;
}

.mini {
  height: 40px;
}
.deleteRow:hover {
  background: lightcoral;
}
.filter {
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
  button {
    height: 40px;
    width: 30%;
    margin-top: 2.5%;

    margin-left: auto !important;
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
<template>
  <div>
    <Loader :loader="loader" />
    <div class="content_header">
      <p class="explanation">
        * Для редактирования ячейки - кликните на ячейку <br />
        * Для сохранения ячейки - нажмите Enter <br />
        * Выбранный месяц -
        <b>{{
          new Date(current_date + "-01").toLocaleString("default", {
            month: "long",
          })
        }}</b>
        <br />
        * Для того чтобы узнать кто последний редактировал ячейку - кликните
        правой кнопкой мыши на эту ячейку
      </p>
      <button class="button Accept" @click="fnExcelReport()">
        Скачать в Excel
      </button>
    </div>
    <h4 class="month">{{ mounth_report }}</h4>
    <table border="1" id="theTable">
      <thead>
        <tr>
          <th rowspan="2">Контрагент</th>
          <th rowspan="2">План</th>
          <template v-for="day in days">
            <th :key="day.id" v-show="rrr == thrd(day)" style="position: relative;">
              {{ day }} 
              <button class="collapsed" @click="CollapseTable()" v-show="day === today">+</button></th>
          </template>
        </tr>
        <template v-for="day_of_week in send_data">
          <th
            v-show="rrr == thrd(day_of_week)"
            :key="day_of_week.id"
            :class="{ weekend: isWeekend(day_of_week) }"
            
          >
            {{ day_of_week }}
            
          </th>
        </template>
      </thead>
      <tbody>
        <!---10 groups-->
        <template v-for="(group, group_name) in data">
          <tr>
            <td class="col1" @click="visibleGroup(group_name)">{{ group_name }}{{ collapse(group_name) }}</td>
            <!-- сумма плана -->
            <td class="col2">{{ group.plan | format }} </td>
            <template v-for="day, day_index in group.week_days">
              <td class="col2" v-show="rrr == thrd(day_index)">{{ day.val | format }}</td>
            </template>
          </tr>
          <!--companies names-->
          <tr
            v-for="(company, company_name) in group.companies"
            :key="company_name.id" v-show="visible_row"
          >
            <td>{{ company_name }}</td>
            <td
          
              :id="
                group_name +
                '_' +
                'companies' +
                '_' +
                company_name +
                '_' +
                'plan'
              "
              @click="
                PlanToInp(
                  group_name +
                    '_' +
                    'companies' +
                    '_' +
                    company_name +
                    '_' +
                    'plan',
                  company.plan
                )
              "
            >
              {{ company.plan | format }}
            </td>
            <template v-for="(day, index) in company.week_days">
              <td
              v-show="rrr == thrd(index)"
                :key="day.id"
                @contextmenu="
                  WhoCreated(
                    day.user,
                    group_name +
                      '_' +
                      'companies' +
                      '_' +
                      company_name +
                      '_' +
                      index
                  )
                "
                :id="
                  group_name +
                  '_' +
                  'companies' +
                  '_' +
                  company_name +
                  '_' +
                  index
                "
                @click="
                  TdToInp(
                    group_name +
                      '_' +
                      'companies' +
                      '_' +
                      company_name +
                      '_' +
                      index,
                    day.val,
                    day.user
                  )
                "
              >

                {{ day.val }}
                <!-- {{ Object.values(company.week_days) }} -->
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>


<script>
import fin_counterpartie from "@/helpers/fin_counterpartie";
import InputLoader from "../../ui/InputLoader.vue";
import api from "@/api/directory.js";
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
export default {
  components: { InputLoader,Loader },
  data() {
    return {
      days: "",
      loader: false,
      send_data: "",
      data: fin_counterpartie.fin_counerpartie,
      current_date: "",
      visible: false,
      mounth_report: "",
      last_clicked_id: "",
      visible_row: true,
      today: "",
      rrr: "",
    };
  },
  computed: {
    ...mapState({
      uid: (state) => state.auth.uid,
      last_name: (state) => state.auth.user.user.last_name,
      first_name: (state) => state.auth.user.user.first_name,
    }),
  

  },
  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
  },
  mounted() {
    let week_days = {};

    // получаем количество дней в выбранном месяце
    let page_date = window.location.href.substring(
      window.location.href.length - 7
    );
    let split_date = page_date.split("-");
    let lastday = new Date(split_date[0], split_date[1], 0);
    let days = lastday.getDate();
    this.current_date = page_date;

    this.check_data();

    for (let i = 1; i <= days; i++) {
      week_days[i] = {
        user: "",
        val: 0,
      };
    }

    for (let group in this.data) {
      this.data[group]["week_days"] = week_days;
      for (let company in this.data[group]?.companies) {
        this.data[group]["companies"][company]["week_days"] = week_days;
      }
    }

    // Создание дней недели по каждому дню месяца
    let array = [];
    for (let i = 1; i <= days; i++) {
      if (i <= 9) {
        array.push(`${page_date}-0${i}`);
      } else {
        array.push(`${page_date}-${i}`);
      }
    }
    let day_week = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    let data = array.map((item) => {
      return new Date(item);
    });
    let send_data = data.map((item) => {
      return day_week[item.getDay()];
    });

    this.send_data = send_data;
    this.days = days;
    this.today = new Date().getDate()
  },
  methods: { 
  thrd(index){

      return index == this.today 
    
  },
   
  CollapseTable(){
    // this.rrr = this.data
// this.rrr = !this.rrr
  // this.rrr = !this.rrr

  },
    collapse(val){
      // let symbol = &#9660;
      if(val == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ' && this.visible_row){
        return '  🔻'
      } if(val == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ' && !this.visible_row){return '  🔺'}
    },
  visibleGroup(name){
    if(name == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ'){
        this.visible_row = !this.visible_row
    }
  },
    check_data() {
      this.loader = true
      api
        .getIncomes(this.current_date + ".json")
        .then((response) => {
          this.loader = false
          this.data = response.data;
          console.log('я все')
        })
        .catch((error) => {
          console.log(error);
          this.loader = false
          this.create_table();
        });
    },
    create_table() {
      this.loader = true
      let data = {
        file_name: this.current_date + ".json",
        content: this.data,
      };
      api
        .saveIncomes(data)
        .then((response) => {
          this.loader = false

          console.log(response);
        })
        .catch((error) => {
          this.loader = false

          console.log(error);
        });
    },

    fnExcelReport() {
      var table = document.getElementById("theTable");
      var tableHTML = table.outerHTML;
      var fileName = "Таблица.xls";

      var msie = window.navigator.userAgent.indexOf("MSIE ");

      var a = document.createElement("a");
      tableHTML = tableHTML.replace(/  /g, "").replace(/ /g, "%20");
      a.href = "data:application/vnd.ms-excel," + tableHTML;
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    WhoCreated(user, id) {
      event.preventDefault();
      document.getElementById(id).style.background = "#D0ECFC";
      setTimeout(() => {
        document.getElementById(id).style.background = "none";
      }, 2500);
      setTimeout(() => {
        alert(user);
      }, 1000);

      console.log(this.data);
    },
    PlanToInp(elem_id, val, user) {
      console.log(this.uid == 102);
      if (
        this.uid == 202 ||
        this.uid == 102 ||
        this.uid == 1 ||
        this.uid == 30
      ) {
        let data = JSON.parse(JSON.stringify(this.data));

        let input_elements = document.getElementsByTagName("input");
        if (input_elements.length >= 1) {
          return;
        }

        // получаем текущий элемент, он уже, можно сказать, предыдущий
        let prev_el = document.getElementById(elem_id);

        // создаем инпут, которым подменим контент старого элемент
        let input = document.createElement("input");
        input.setAttribute("type", "number");

        input.id = elem_id + "_input";
        input.value = val;
        //  Вносить план может только Орлов id: 202

        input.addEventListener("keyup", function (event) {
          if (event.key === "Enter") {
            let path_arr = elem_id.split("_");
            let group = path_arr[0];
            let companies = path_arr[1];
            let name_companie = path_arr[2];

            let income_group = data[group].plan;
            let prev_value = data[group][companies][name_companie]["plan"];
            let new_value = Number(input.value);
            // Сохранение значения плана по группе
            data[group].plan = income_group - prev_value + new_value;
            // сохранение значения в план по дню месяца
            data[group][companies][name_companie].plan = input.value;

            let prev_val_operation =
              data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["plan"];
            data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["plan"] =
              prev_val_operation - prev_value + new_value;

            // Сохранение итого по группе
            // td-шка старая
            let new_el = document.getElementById(elem_id);
            new_el.innerHTML = event.target.value;

            document.getElementById(elem_id).style.background = "#DCFCC6";
            setTimeout(() => {
              document.getElementById(elem_id).style.background = "none";
            }, 2500);
          }
        });

        prev_el.innerHTML = "";
        // появление фокуса при выборе клетки
        prev_el.insertAdjacentElement("beforeend", input).focus();

        this.last_clicked_id = elem_id;
        this.data = data;
      }
    },

    TdToInp(elem_id, val, user) {
      let data = JSON.parse(JSON.stringify(this.data));
      let last_name = this.last_name + " " + this.first_name;
      let current_date = this.current_date;
      let input_elements = document.getElementsByTagName("input");
      if (input_elements.length >= 1) {
        return;
      }

      // получаем текущий элемент, он уже, можно сказать, предыдущий
      let prev_el = document.getElementById(elem_id);

      // создаем инпут, которым подменим контент старого элемент
      let input = document.createElement("input");
      input.setAttribute("class", "inp_block");
      input.setAttribute("type", "number");
      input.id = elem_id + "_input";
      input.value = val;

      input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          // console.log(data[group]['week_days'][col_idx] - data[group][companies][name_companie]['week_days'][col_idx].val + input.value)
          console.log(elem_id);
          let pathArr = elem_id.split("_");
          let group = pathArr[0];
          let companies = pathArr[1];
          let name_companie = pathArr[2];
          let col_idx = pathArr[3];
          let income_cs = data[group]["week_days"][col_idx].val;
          let prev_value =
            data[group][companies][name_companie]["week_days"][col_idx].val;
          let new_value = Number(input.value);

          // ДОход группы по дням
          data[group]["week_days"][col_idx].val =
            income_cs - prev_value + new_value;

          data[group][companies][name_companie]["week_days"][col_idx].val =
            input.value;
          data[group][companies][name_companie]["week_days"][col_idx].user =
            last_name;

          let prev_val_operation =
            data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["week_days"][col_idx].val;
          data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["week_days"][
            col_idx
          ].val = prev_val_operation - prev_value + new_value;

          // td-шка старая
          let new_el = document.getElementById(elem_id);
          new_el.innerHTML = event.target.value;
          document.getElementById(elem_id).style.background = "#DCFCC6";
          setTimeout(() => {
            document.getElementById(elem_id).style.background = "none";
          }, 2500);

          let weight = {
            file_name: `${current_date}.json`,
            path: [`${group}@companies@${name_companie}@week_days@${col_idx}@val`, `${group}@week_days@${col_idx}@val`, `ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ@week_days@${col_idx}@val`],
            value: [Number(input.value), data[group]["week_days"][col_idx].val, data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["week_days"][col_idx].val],
          };
          console.log(weight)
          console.log(data)
          api.patchIncomes(weight).then((response) => {
            api
              .getIncomes(current_date + ".json")
              .then((response) => {
                data = response.data;
              })
              .catch((error) => {
                console.log(error);
              });
          });
          // console.log(weight)
        }

        // api.patchIncomes()
      });

      prev_el.innerHTML = "";
      // появление фокуса при выборе клетки
      prev_el.insertAdjacentElement("beforeend", input).focus();

      this.last_clicked_id = elem_id;
      this.data = data;
      console.log(this.data);
    },

    getData() {
      let data = { file_name: this.current_date };
      api
        .getIncomes(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    isWeekend(data) {
      if (data == "ВС" || data == "СБ") {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.collapsed{
  position: absolute;
  width: 10px !important;
  height: 10px !important;
  background: rgb(50, 50, 50);
  top: 0;
  right: 0;
  padding: 5px 10px 10px 12px;
  text-align: center;
}
td,
th {
  border: 1px solid black;
}
.explanation {
  padding: 2% 0 0 2%;
}
.month {
  padding-left: 2%;
  font-size: 18px;
}
.content_header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  button {
    width: 15%;
    margin-right: 2%;
  }
}
.col1 {
  background: rgb(243, 243, 243);
  font-family: "Montserrat", sans-serif;
  color: black;
  font-weight: bold;
  text-align: left !important;
}
.col2 {
  background: rgb(243, 243, 243);
  font-family: "Montserrat", sans-serif;
  color: black;
}
input {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
}
table {
  content-visibility: auto;
  margin-top: 1%;
}
th {
  font-weight: 400 !important;
  font-size: 13px !important;
}

.weekend {
  color: #f18a46;
}
</style>
<template>
  <div>
    <Loader :loader="loader" />
    <b-modal ref="my-modal" hide-footer title="Добавление контрагента">
      <div class="content-counter">

        <label for=""><span :class="{ 'isError': ErrorCreateDivision }">Раздел</span> <br>
          <select class="textarea" v-model="group_create_counterpar">
            <option v-for="groups, index in my_data" :key="groups.id"
              v-show="index != 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ'">{{ index }}</option>
          </select>
        </label>
        <label for="">
          <span :class="{ 'isError': ErrorCreateCounterpartie }">Название контрагента </span><br>
          <input type="text" v-model="counterpartie" class="textarea">
        </label>
      </div>
      <b-button class="mt-3" variant="danger" block @click="hideModal">Закрыть</b-button>
      <b-button class="mt-2" variant="success" block @click="createCounterpstie()">Сохранить</b-button>
    </b-modal>



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
      правой кнопкой мыши на эту ячейку <br>
      * Для загрузки данных из EXCEL необходимо: <br>
      -> нажать на выбор файла <br>
      -> выбрать лист (соответсвующий этому отчету) <br>
      -> нажать сохранить в таблицу
    </p>
    <div class="content_header">


      <section style="margin-left: 2%;">
        <input type="file" @change="onChange" />
        <xlsx-read :file="file">
          <xlsx-sheets>
            <template #default="{ sheets }">
              <label for="">Выберите лист <br>
                <select v-model="selectedSheet" style="border: 1px solid black;">
                  <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                    {{ sheet }}
                  </option>
                </select>
              </label>
            </template>
          </xlsx-sheets>
          <xlsx-table :sheet="selectedSheet" v-show="false" ref="Table" />
        </xlsx-read>

      </section>

      <button @click="saveData()" class="button Accept">Сохранить значения в таблицу</button>


      <button class="button Accept" @click="openModal()">
        Добавить контрагента
      </button>
      <button class="button Accept" @click="fnExcelReport()">
        Скачать в Excel
      </button>
    </div>
    <h4 class="month">{{ mounth_report }}</h4>
    <div>
      <table border="1" ref="theTable">
        <thead>
          <tr>
            <th rowspan="2">Контрагент
              <!-- <input type="text" v-model="search" style="height: 50px !important;" class="textarea"> -->

            </th>
            <th rowspan="2" style="width: 750px !important">План</th>
            <th rowspan="2">Прогноз</th>
            <template v-for="day in days">
              <!-- v-show=" thrd(day)" -->
              <th :key="day.id" v-show="tyu == true ? tyu : thrd(day)" style="position: relative;">
                {{ day }}
                <button class="collapsed" @click="tyu = !tyu" v-show="day == today">{{ tyu ? '-' : '+' }}</button>
              </th>
            </template>
          </tr>
          <template v-for="day_of_week in send_data">
            <!--   v-show=" thrd(day_of_week)" -->
            <th v-show="tyu == true ? tyu : thrd(day_of_week)" :key="day_of_week.id"
              :class="{ weekend: isWeekend(day_of_week) }">
              {{ day_of_week }}

            </th>
          </template>
        </thead>
        <tbody ref="theTableBody">
          <!---10 groups-->
          <template v-for="(group, group_name) in dataComputed">
            <tr>
              <td class="col1" @click="visibleGroup(group_name)">{{ group_name }}{{ collapse(group_name) }}</td>
              <!-- сумма плана -->
              <td class="col2" style="width: 250px">{{ group.plan | format }} </td>
              <td class="col2">{{ group.prognoz | format }} </td>
              <template v-for="day, day_index in group.week_days">
                <!--  v-show=" thrd(day_index)" -->
                <td class="col2" v-show="tyu == true ? tyu : thrd(day_index)">{{ day.val | format }}</td>
              </template>
            </tr>
            <!--companies names-->
            <tr v-for="(company, company_name) in group.companies" :key="company_name.id" v-show="visible_row">
              <td>{{ company_name }}</td>
              <!-- план -->
              <td class="col2" :id="group_name +
                '_' +
                'companies' +
                '_' +
                company_name +
                '_' +
                'plan'
                " @click="
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
    ">
                {{ company.plan | format }}
              </td>
              <td class="col2" :id="group_name + '_' + 'companies' + '_' + company_name + '_' + 'prognoz'">
                <!--    @click="PlanToPrognoz(group_name + '_' + 'companies' + '_' + company_name + '_' + 'prognoz', company.prognoz)" -->
                {{ company.prognoz }}
              </td>
              <!-- week_days -->
              <template v-for="(day, index) in company.week_days">
                <!--  v-show=" thrd(index)" -->

                <td v-show="tyu == true ? tyu : thrd(index)" :key="day.id" @contextmenu="WhoCreated(day.user, group_name + '_' +
                  'companies' +
                  '_' +
                  company_name +
                  '_' +
                  index
                )
                  " :id="group_name +
    '_' +
    'companies' +
    '_' +
    company_name +
    '_' +
    index
    " @click="
    TdToInp(
      group_name +
      '_' +
      'companies' +
      '_' +
      company_name +
      '_' +
      index,
      day.val,
      index,
      day.user
    )
    ">

                  {{ day.val }}
                  <!-- {{ Object.values(company.week_days) }} -->
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
      id="notif" />
  </div>
</template>


<script>
import fin_counterpartie from "@/helpers/fin_counterpartie";
import InputLoader from "../../ui/InputLoader.vue";
import api from "@/api/directory.js";
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
// import counterparties from "@/api/counterparties";
import { XlsxRead, XlsxTable, XlsxSheets, XlsxJson, XlsxWorkbook, XlsxSheet, XlsxDownload } from "../../../../node_modules/vue-xlsx/dist/vue-xlsx.es"
import fin_counterpartie_copy from "@/helpers/fin_counterpartie_copy";

export default {
  components: {
    InputLoader, Loader, Notifications, XlsxRead,
    XlsxTable,
    XlsxSheets,
    XlsxJson,
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload
  },
  data() {
    return {
      group_create_counterpar: "",
      counterpartie: "",
      search: "",
      days: "",
      loader: false,
      send_data: "",
      my_data: fin_counterpartie_copy.fin_counerpartie,
      standard_collection: fin_counterpartie_copy.fin_counerpartie,
      file: null,
      selectedSheet: null,
      sheetName: null,
      sheets: [{
        name: "SheetOne",
        data: [{ c: 2 }]
      }],
      collection: [{ a: 1, b: 2 }],
      // data: fin_counterpartie_copy.fin_counerpartie,
      current_date: "",
      mounth_report: "",
      last_clicked_id: "",
      visible_row: true,
      today: "",
      tyu: true,


      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",

      ErrorCreateCounterpartie: false,
      ErrorCreateDivision: false,

      DB_STRUCTIRE: "",
    };
  },
  computed: {
    ...mapState({
      uid: (state) => state.auth.uid,
      last_name: (state) => state.auth.user.user.last_name,
      first_name: (state) => state.auth.user.user.first_name,
    }),
    dataComputed() {
      if (this.search.length < 2) {
        return this.my_data
      }
      let arr = []
      for (let i in this.my_data) {
        for (let j in this.my_data[i]?.companies) {
          arr.push({
            'companie_name': j,
            ...this.my_data[i]?.companies[j]
          })
        }
      }

      return arr.filter(item => item.companie_name.includes(this.search))

    }
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

    // this.check_data();

    for (let i = 1; i <= days; i++) {
      week_days[i] = {
        user: "",
        val: 0,
      };
    }

    for (let group in this.my_data) {
      this.my_data[group]["week_days"] = week_days;
      for (let company in this.my_data[group]?.companies) {
        this.my_data[group]["companies"][company]["week_days"] = week_days;
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

    let data1 = array.map((item) => {
      return new Date(item);
    });
    let send_data = data1.map((item) => {
      return day_week[item.getDay()];
    });

    this.send_data = send_data;
    this.days = days;
    this.today = new Date().getDate()

    this.check_data()
  },
  watch: {
    group_create_counterpar() {
      if (this.group_create_counterpar != "") {
        this.ErrorCreateDivision = false
      }
    },
    counterpartie() {
      if (this.counterpartie != "") {
        this.ErrorCreateCounterpartie = false
      }
    }
  },
  methods: {
    saveData() {
      // console.log(this.my_data)
      console.log(this.my_data)
      if (this.selectedSheet == null) {
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Необходимо выбрать лист из файла Excel";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 3500);
        return
      }
      // this.loader = true
      // Проверка на наличие в БД такой структуры
      // api
      //   .getIncomes(this.current_date + ".json")
      //   .then((response) => {
      // this.loader = false
      // this.DB_STRUCTIRE = response.data;
      // Проверяю 2 объекта на их идентивность
      if (true === true) {
        // if (JSON.stringify(this.DB_STRUCTIRE) == JSON.stringify(this.standard_collection)) {
        // console.log(this.DB_STRUCTIRE, 'Я из БД')
        // console.log(this.standard_collection)
        let rows = window.document.querySelectorAll("table tbody tr");
        // план
        let data = []
        let data_name = []
        // массив со всеми значениями плана
        let all_plan = []
        let all_counterpartie = []
        for (let i in rows) {
          try {
            for (let j of rows[i].cells) {
              if (j?.id.includes('sjs-F')) {
                data.push(j)
              }
            }
          }
          catch { }
        }


        for (let i of data) {
          all_plan.push(i.innerHTML.replaceAll(",", ""))
        }
        let rrr = all_plan.map(item => {
          if (item.includes('-')) {
            return item = '0'
          } else {
            return item
          }
          //  return item.includes('-')
        })

        // Все значения плана
        all_plan = rrr

        // Получение имен контрагентов
        for (let i in rows) {
          try {
            for (let j of rows[i].cells) {
              if (j?.id.includes('sjs-B6') ||
                j?.id.includes('sjs-B7') ||
                j?.id.includes('sjs-B8') ||
                j?.id.includes('sjs-B9') ||
                j?.id.includes('sjs-B1') ||
                j?.id.includes('sjs-B2') ||
                j?.id.includes('sjs-B3') ||
                j?.id.includes('sjs-B4') ||
                j?.id.includes('sjs-B5')) {
                data_name.push(j)
              }
            }
          }
          catch { }

        }
        for (let i of data_name) {
          if (i.innerHTML == 'ВЫПЛАТЫ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ') break
          else {
            all_counterpartie.push(i.innerHTML?.replace(/["']/g, ""))
          }
        }





        // выравнивание длин массивов для дальнейшего сведения в 1 таблицу
        let counterparties = all_counterpartie.slice(3, all_counterpartie.length - 1)
        let plan = all_plan.slice(3, all_plan.length - 1)
        let amount_plan = plan.slice(0, counterparties.length)
        // console.log(counterparties, amount_plan, allDataOfDays)



        // получение данных по дням недели
        let allDataOfDays = [];
        let table = document.querySelector('table')
        let date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        for (let j = 1; j <= date.getDate(); j++) {
          let little = []
          for (let row of table.rows) {
            little.push(row.cells[6 + j].innerHTML);
          }
          // получаю все значения столбцов в отдельных массивах без шапки
          allDataOfDays.push(little.slice(5, counterparties.length + 5))
        }




        let last_key = null
        for (let i in counterparties) {
          if (counterparties[i] in this.my_data) {
            last_key = counterparties[i]
            try {
              // подгружаю данные для плана по группам и общему итогу
              this.my_data[counterparties[i]]['plan'] = amount_plan[i]
    
              // this.my_data[counterparties[i]]['prognoz'] = amount_plan[i] + 'я отсюда'
            } catch {
              console.log(new Error('Ошибка длины массивов'))
            }
          } else {
            if (last_key != null) {
              if ('companies' in this.my_data[last_key]) {
                // TODO prognoz
                // console.log(this.my_data[last_key]['companies'][counterparties[i]])
                this.my_data[last_key]['companies'][counterparties[i]] = {
                  'week_days': {},
                  'plan': amount_plan[i],
                  'prognoz': 0
                }
              }
            }
          }
        }

      // for(let i in counterparties){
      //   if (counterparties[i] in this.my_data) {
      //   console.log(this.my_data[counterparties[i]]['week_days'])
      //   }
      // }

        let week_days = {};

        // получаем количество дней в выбранном месяце
        let page_date = window.location.href.substring(
          window.location.href.length - 7
        );
        let split_date = page_date.split("-");
        let lastday = new Date(split_date[0], split_date[1], 0);
        let days = lastday.getDate();
        this.current_date = page_date;

        // this.check_data();


        // создаю структуру таблицы относительно кол-ва дней
        for (let i = 1; i <= days; i++) {
          week_days[i] = {
            user: "",
            val: 0,
          };
        }
        // console.log(week_days)

        for (let group in this.my_data) {
          this.my_data[group]["week_days"] = week_days;
          for (let company in this.my_data[group]?.companies) {
            this.my_data[group]["companies"][company]["week_days"] = week_days;
            // for(let val in  this.my_data[group]["companies"][company]["week_days"]){
            // //   for(let day = 0; day <= allDataOfDays[0].length; day++)
            // //   this.my_data[group]["companies"][company]["week_days"][val]['val'] = allDataOfDays[0][day].replaceAll(',',"")
            // }
          }
        }

        let Table = this.$refs.theTable
        let all_cells = []
        for(let row of Table.rows){
         for(let day = 1; day <= days.length; day++){
          
         }
        }
          // for(let j of allDataOfDays[0]){
          //   console.log(j)
          //   Table.rows.cells[3].innerHTML = j

          // }
       
        // // console.log(Table)
        // let data123 = []
        // for (let row of Table.rows) {
        //   for(let i of allDataOfDays[0]){
        //     console.log(i)
        //     // row.cells[3].innerHTML = i
        //     // console.log(row.cells[3].innerHTML)
        //   }
        
          
        // }

      // console.log(allDataOfDays[0])

     



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

        let data1 = array.map((item) => {
          return new Date(item);
        });
        let send_data = data1.map((item) => {
          return day_week[item.getDay()];
        });

        this.send_data = send_data;
        this.days = days;
        this.today = new Date().getDate()
        this.loader = false
        this.create_table()

      } else {
        console.log('Уже создана')
        this.loader = false
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Данные из файла уже были ранее загружены";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 3500);
      }
      // })
    },















    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] });
      this.sheetName = null;

    },
    createCounterpstie() {
      if (this.group_create_counterpar == "") {
        this.ErrorCreateDivision = true
      }
      if (this.counterpartie == "") {
        this.ErrorCreateCounterpartie = true
      }
      else {
        console.log('z nen')
        let data = JSON.parse(JSON.stringify(this.my_data))
        data[this.group_create_counterpar]['companies'][this.counterpartie] = { 'week_days': {}, 'plan': 0 }

        let week_days = {};

        // получаем количество дней в выбранном месяце
        let page_date = window.location.href.substring(window.location.href.length - 7);
        let split_date = page_date.split("-");
        let lastday = new Date(split_date[0], split_date[1], 0);
        let days = lastday.getDate();

        for (let i = 1; i <= days; i++) {
          week_days[i] = {
            user: "",
            val: 0,
          };
        }

        for (let group in data) {
          data[group]["week_days"] = week_days;
          for (let company in data[group]?.companies) {
            data[group]["companies"][company]["week_days"] = week_days;
            data[group]["companies"][company]["prognoz"] = 0

          }
        }

        this.loader = true
        let information = {
          file_name: this.current_date + ".json",
          content: data,
        };
        console.log(information)
        api
          .saveIncomes(information)
          .then((response) => {
            this.loader = false;
            api.getIncomes(this.current_date + ".json")
              .then((response) => {
                this.loader = false
                this.my_data = response.data;
              })
          })
          .catch((error) => {
            this.loader = false
            this.notifyHead = "Ошибка";
            this.notifyMessage = 'Ошибка создания контрагента, повторите запрос позже';
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 2000);
          });
        this.hideModal()
      }

    },

    openModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    thrd(index) {
      return index == this.today
    },

    collapse(val) {
      // let symbol = &#9660;
      if (val == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ' && this.visible_row) {
        return '  🔻'
      } if (val == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ' && !this.visible_row) { return '  🔺' }
    },
    visibleGroup(name) {
      if (name == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ') {
        this.visible_row = !this.visible_row
      }
    },
    check_data() {
      this.loader = true
      let page_date = window.location.href.substring(
        window.location.href.length - 7
      );

      this.current_date = page_date;
      api
        .getIncomes(this.current_date + ".json")
        .then((response) => {
          this.loader = false
          this.my_data = response.data
        })
        .catch((error) => {
          this.loader = false
          if (error.response.data.includes('[Errno 2] No such file or directory')) {
            console.log('я создаю таблицу')
            this.create_table();
          }


        });
    },
    create_table() {
      this.loader = true
      let data = {
        file_name: this.current_date + ".json",
        content: this.my_data,
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
      var table = this.$refs.theTable;
      var tableHTML = table.outerHTML;
      var fileName = "Таблица " + this.current_date + '.xls';

      // var msie = window.navigator.userAgent.indexOf("MSIE ");

      var a = document.createElement("a");
      tableHTML = tableHTML.replace(/  /g, "").replace(/ /g, "%20");
      a.href = "data:application/vnd.ms-excel," + tableHTML;
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    WhoCreated(user, id) {
      console.log(user)
      event.preventDefault();
      document.getElementById(id).style.background = "#D0ECFC";
      setTimeout(() => {
        document.getElementById(id).style.background = "none";
      }, 2500);
      setTimeout(() => {
        alert(user);
      }, 1000);

      // console.log(this.my_data);
    },
    PlanToInp(elem_id, val) {

      if (
        this.uid == 202 ||
        this.uid == 222 ||
        this.uid == 102 ||
        this.uid == 1 ||
        this.uid == 30
      ) {
        let data = JSON.parse(JSON.stringify(this.my_data));
        let current_date = this.current_date;

        let input_elements = document.getElementsByTagName("input");
        if (input_elements.length >= 2) {
          // console.log('123')

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

            // 1 передаю значение для каждой строки
            // 2 значение для каждой группы
            // Общий итог
            let weight = {
              file_name: `${current_date}.json`,
              path: [`${group}@companies@${name_companie}@plan`, `${group}@plan`, `ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ@plan`],
              value: [Number(input.value), data[group]['plan'], data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["plan"]],
            };
            api.patchIncomes(weight).then((response) => {
              api
                .getIncomes(current_date + ".json")
                .then((response) => {
                  data = response.data;
                })
                .catch((error) => {
                  this.notifyHead = "Ошибка";
                  this.notifyMessage = 'Ошибка загрузки данных, повторите запрос позже';
                  this.notifyClass = "wrapper-error";
                  this.showNotify = true;
                  setTimeout(() => {
                    this.showNotify = false;
                  }, 2000);
                });
            });
          }




        });

        prev_el.innerHTML = "";
        // появление фокуса при выборе клетки
        prev_el.insertAdjacentElement("beforeend", input).focus();

        this.last_clicked_id = elem_id;
        this.my_data = data;
      }
    },

    TdToInp(elem_id, val, day) {
      if (day < new Date().getDate()) {
        console.log('нельзя')
        return
      }

      let data = JSON.parse(JSON.stringify(this.my_data));
      let last_name = this.last_name + " " + this.first_name;
      let current_date = this.current_date;
      let input_elements = document.getElementsByTagName("input");
      if (input_elements.length >= 2) {
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
          // console.log(elem_id);
          let pathArr = elem_id.split("_");
          let group = pathArr[0];
          let companies = pathArr[1];
          let name_companie = pathArr[2];
          let col_idx = pathArr[3];
          let income_cs = data[group]["week_days"][col_idx].val;
          let prev_value =
            data[group][companies][name_companie]["week_days"][col_idx].val;
          let new_value = Number(input.value);

          //Доход по ПРОГНОЗУ по агенту
          let prev_val_prognoz = data[group][companies][name_companie]["prognoz"]
          data[group][companies][name_companie]["prognoz"] = prev_val_prognoz - prev_value + new_value

          // Прогноз по группе 
          data[group]['prognoz'] = 0
          let all_prognoz = []
          for (let i in data[group]['companies']) {
            all_prognoz.push(data[group]['companies'][i]['prognoz'])
          }
          let result = all_prognoz.map(function (item, index, arr) {
            let number = parseInt(item);
            return isNaN(number) ? item : number;
          });

          data[group]['prognoz'] = result.reduce((acc, item) => {
            return acc += item
          })
          // Прогноз общий 
          data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]['prognoz'] = 0
          let oper_prognoz = []
          for (let i in data) {
            if (i == 'ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ') continue
            oper_prognoz.push(data[i]['prognoz'])
          }
          let resultPrognoz = oper_prognoz.map(function (item, index, arr) {
            let number = parseInt(item);
            return isNaN(number) ? item : number;
          });

          data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]['prognoz'] = resultPrognoz.reduce((acc, item) => {
            return acc += item
          })
          // console.log( data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]['prognoz'])


          // ДОход группы по дням
          data[group]["week_days"][col_idx].val = income_cs - prev_value + new_value;

          data[group][companies][name_companie]["week_days"][col_idx].val =
            input.value;
          data[group][companies][name_companie]["week_days"][col_idx].user =
            last_name;

          let prev_val_operation =
            data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["week_days"][col_idx].val;
          data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["week_days"][col_idx].val = prev_val_operation - prev_value + new_value;

          // td-шка старая
          let new_el = document.getElementById(elem_id);
          new_el.innerHTML = event.target.value;
          document.getElementById(elem_id).style.background = "#DCFCC6";
          setTimeout(() => {
            document.getElementById(elem_id).style.background = "none";
          }, 2500);

          let weight = {
            file_name: `${current_date}.json`,
            path: [`${group}@companies@${name_companie}@week_days@${col_idx}`, `${group}@week_days@${col_idx}@val`, `ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ@week_days@${col_idx}@val`, `${group}@companies@${name_companie}@prognoz`, `${group}@prognoz`, `ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ@prognoz`],
            value: [{ 'val': Number(input.value), 'user': last_name }, data[group]["week_days"][col_idx].val, data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["week_days"][col_idx].val, `${(data[group]['companies'][name_companie]['prognoz'])}`, `${(data[group]['prognoz'])}`, `${data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]['prognoz']}`],
          };
          console.log(weight)
          // console.log(weight)
          // console.log(data)
          // console.log(last_name)
          api.patchIncomes(weight).then((response) => {
            api
              .getIncomes(current_date + ".json")
              .then((response) => {
                data = response.data;
              })
              .catch((error) => {
                console.log(error);
                this.notifyHead = "Ошибка";
                this.notifyMessage = 'Ошибка загрузки данных, повторите запрос позже';
                this.notifyClass = "wrapper-error";
                this.showNotify = true;
                setTimeout(() => {
                  this.showNotify = false;
                }, 2000);
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
      this.my_data = data;
      // console.log(this.my_data);
    },

    PlanToPrognoz(elem_id, val) {
      // console.log(this.uid == 102);
      if (
        // this.uid == 222
        this.uid === 202 ||
        this.uid === 222 ||
        // this.uid == 102 ||
        this.uid === 1 ||
        this.uid === 30
      ) {
        console.log('123')
        let data = JSON.parse(JSON.stringify(this.my_data));
        let current_date = this.current_date;

        let input_elements = document.getElementsByTagName("input");
        if (input_elements.length >= 2) {
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

        // input.addEventListener("keyup", function (event) {
        //   if (event.key === "Enter") {
        let path_arr = elem_id.split("_");
        let group = path_arr[0];
        let companies = path_arr[1];
        let name_companie = path_arr[2];

        let income_group = data[group].prognoz;
        let prev_value = data[group][companies][name_companie]["prognoz"];
        let new_value = Number(input.value);
        // Сохранение значения плана по группе
        data[group].prognoz = income_group - prev_value + new_value;
        // сохранение значения в план по дню месяца
        data[group][companies][name_companie].prognoz = input.value;

        let prev_val_operation =
          data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["prognoz"];
        data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["prognoz"] =
          prev_val_operation - prev_value + new_value;

        // Сохранение итого по группе
        // td-шка старая
        // let new_el = document.getElementById(elem_id);
        // new_el.innerHTML = event.target.value;

        // document.getElementById(elem_id).style.background = "#DCFCC6";
        // setTimeout(() => {
        //   document.getElementById(elem_id).style.background = "none";
        // }, 2500);

        // 1 передаю значение для каждой строки
        // 2 значение для каждой группы
        // Общий итог
        let weight = {
          file_name: `${current_date}.json`,
          path: [`${group}@companies@${name_companie}@prognoz`, `${group}@prognoz`, `ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ@prognoz`],
          value: [Number(input.value), data[group]['prognoz'], data["ПОСТУПЛЕНИЯ ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ"]["prognoz"]],
        };
        api.patchIncomes(weight).then((response) => {
          api
            .getIncomes(current_date + ".json")
            .then((response) => {
              data = response.data;
            })
            .catch((error) => {
              this.notifyHead = "Ошибка";
              this.notifyMessage = 'Ошибка загрузки данных, повторите запрос позже';
              this.notifyClass = "wrapper-error";
              this.showNotify = true;
              setTimeout(() => {
                this.showNotify = false;
              }, 2000);
            });
        });
        //   }




        // });

        prev_el.innerHTML = "";
        // появление фокуса при выборе клетки
        // prev_el.insertAdjacentElement("beforeend", input).focus();

        // this.last_clicked_id = elem_id;
        this.my_data = data;
      }
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
.isError {
  color: red
}

tr:hover {
  background: lightcyan;
}

.content-counter {
  display: flex;
  justify-content: space-between;

  label {
    text-align: left;
    color: gray
  }

  input {

    border: #bdc3c7 0.1rem solid !important;
    width: 20rem !important;
    height: 3rem !important;



  }
}

.collapsed {
  position: absolute;
  background: rgb(50, 50, 50);
  top: 0;
  right: 0;
  height: 100%;
  width: 12%;
  // margin-top: -25% !important;
  padding: 5px 10px;
  // text-align: center;
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

  &:hover {
    background: lightcyan;

  }
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
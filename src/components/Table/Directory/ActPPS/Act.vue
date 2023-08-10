<template>
  <div>
    <Loader :loader="loader" />
    <h3 class="explanation" style="font-size: 17px; margin-top: -1%;">
       Перед использованием этого раздела обязательно выполнить <a @click="instruction = !instruction">следующие действия с браузером</a><br>
    </h3>
    <!-- <h3 @click="instruction = !instruction" style="cursor: pointer; text-align: left;">{{ instruction ? 'Свернуть инструкцию по браузеру' : 'Смотреть инструкцию  по браузеру' }}</h3> -->
    <div v-show="instruction">
      <p class="explanation">Пример приводится на основе браузера Google Chrome</p>
      <p>1. В адресную строку браузера ввести <b>chrome://flags/</b> и нажать Enter</p>
      <figure class="sign">
        <p><img src="../../../../assets/Draw2.png" style="width: 80%; height: auto;" alt="Рисунок 1 - адресная строка"></p>
      </figure>
      <br>
      <p>2. В поисковую строку открывшейся страницы ввести <b>#unsafely-treat-insecure-origin-as-secure</b></p>
      <figure class="sign">
        <p><img src="../../../../assets/Draw3.png" style="width: 80%; height: auto;" alt="Рисунок 2 - поиск данных"></p>
      </figure>
      <br>
      <p>3. В поле ввода (над подчеркнутым желтым цветом поле) ввести <b>http://portal.tehtrans.com</b>, <br> перевести правый селектор в положение Enabled и нажать Relaunch</p>
      <figure class="sign">
        <p><img src="../../../../assets/Draw4.png" style="width: 80%; height: auto;" alt="Рисунок 3 - сохранение данных"></p>
      </figure>
      <br>
      <p>4. После нажатия на Relaunch Ваш браузер перезапустится, <br>
         далее когда вы будете копировать данные из Excel и вставлять их в поле <b>Операция</b> браузер запросит у Вас разрешение на доступ <br>
        <b>обязательно нажмите Разрешить</b>, после выполнения этих действий Вы можете пользоваться разделом в полной мере</p>
         <figure class="sign">
        <p><img src="../../../../assets/Draw5.png" style="width: 80%; height: auto;" alt="Рисунок 3 - сохранение данных"></p>
      </figure>
      <h5 @click="instruction = !instruction" style="cursor: pointer; text-align: left;">{{ instruction ? 'Свернуть инструкцию' : 'Смотреть инструкцию' }}</h5>

    </div>

    <p class="explanation">

      * Ввод данных осуществлять через пробел
      <br />&nbsp;&nbsp;(при копировании из MS Excel, оставить введенные данные
      неизменными)
      <br />
      * Ввод дат осуществлять только в строгом формате <b>12.01.2023</b> <br />
      &nbsp;&nbsp;<u>Другой формат ввода даты не допускается. </u>
      <br />
      * Для удаления строки кликните на порядковый номер строки(левый столбец)
      <br />
      * Для сохранения изменненого поля ничего делать не нужно, сохранение таблицы произойдет автоматически (таблица 1)
      <br />
      * Для выбора значения Контрагента и груза, введите наименование и выберите его из списка
      <br />
      <br />
      * После отправки формы данных, если все данные были приняты, значения таблицы будут стерты. <br>
      &nbsp;&nbsp;Если какое-то поле не прошло проверку, то оно останется в таблице и номер этой строки подсвтетится
      красным. <br>
      &nbsp;&nbsp;Чтобы посмотреть какая ошибка в этой строке, наведите на номер строки, но не нажимайте на номер мышкой
      <br>
      &nbsp;&nbsp;( нажатие приведет к удалению строки)
      <br /> <br />
      * Таблица 2 предназначена для просмотра ранее загруженых пользователем данных, для редактирования ячейки необходимо
      :
    <ol>
      <li>Изменить значение ячейки</li>
      <li>Нажать Enter</li>
      <li>Дождаться ответа (будет крутиться загрузчик)</li>
      <li>При положительной индикации поля (зеленый цвет) продолжить редактирование
        <ol>
          <li>При отрицательной индикации поля (красный цвет) учесть замечание в уведомлении (левый верхний угол)</li>
        </ol>
      </li>
    </ol>
    </p>
    <a class="WatchAllArenda" v-on:click="visible = !visible">
      {{ visible ? "Свернуть таблицу ввода" : "Отобразить таблицу ввода" }}
    </a>
    <div v-show="visible" style="margin-top: 2%;">

      <div class="filter">
        <label for="">
          Контрагент<br />
          <input type="text" class="textarea mini" v-model="counterparties" />
        </label>
        <label for="">
          № акта<br />
          <input type="text" v-model="application_number"  class="textarea mini" />
        </label>
        <label for="">
          Дата акта<br />
          <input type="date" v-model="act_date" id="act_date" class="textarea mini" />
        </label>
        <!-- <label for="">
        Подготовлено под груз<br />
        <input type="text" v-model="for_cargo" class="textarea mini" />
      </label>
      <label for="">
        Из под груза<br />
        <input type="text" v-model="from_cargo" class="textarea mini" />
      </label> -->
        <label for="">
          <br />
          <button class="button Accept mini" style="width: 350px" @click="sendData()">Отправить</button>
        </label>
      </div>

      <div class="textarea" style="
        height: auto;
        width: 100%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      " v-show="ten_visible">
        <ul id="root_tenant">
          <li v-for="item in filter_client" :key="item.id" @click="checkCounterpartie(item.work_name)">
            <span>{{ item.work_name }}</span>
            <hr />
          </li>
        </ul>
      </div>

      <div class="textarea" style="
        height: auto;
        width: 80%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      " v-show="ten_visible2">
        <ul id="root_tenant">
          <li v-for="item in filter_forcargo" :key="item.id" @click="checkForCargo(item.name, item.code6)">
            <span>{{ item.name }}</span>
            <hr />
          </li>
        </ul>
      </div>

      <div class="textarea" style="
        height: auto;
        width: 80%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
      " v-show="ten_visible3">
        <ul id="root_tenant">
          <li v-for="item in filter_fromcargo" :key="item.id" @click="checkFromCargo(item.name, item.code6)">
            <span>{{ item.name }}</span>
            <hr />
          </li>
        </ul>
      </div>
      <table style="margin-top: 2%;">
        <thead style="border-top: none !important;">
          <tr style="border: none !important">
            <th style="border: none !important"></th>
            <th style="border: none !important"><button class="delete_col" @click="delete_col('wagon')">Удалить
                столб.</button></th>
            <th style="border: none !important"><button class="delete_col" @click="delete_col('date_pp_in')">Удалить
                столб.</button></th>
            <th style="border: none !important"><button class="delete_col" @click="delete_col('date_work')">Удалить
                столб.</button></th>
            <th style="border: none !important"><button class="delete_col" @click="delete_col('date_pp_out')">Удалить
                столб.</button></th>
            <!-- <th style="border: none !important"><button class="delete_col" @click="delete_col('days')">Удалить столб.</button></th>
    <th style="border: none !important"><button class="delete_col" @click="delete_col('date_processing')">Удалить столб.</button></th> -->
            <th style="border: none !important"><button class="delete_col"
                @click="delete_col('application_number')">Удалить столб.</button></th>
            <th style="border: none !important"><button class="delete_col" @click="delete_col('operation')">Удалить
                столб.</button></th>
            <th style="border: none !important"><button class="delete_col" @click="delete_col('price_wo_nds')">Удалить
                столб.</button></th>
          </tr>
          <tr>
            <th>№</th>
            <th>
              <input type="text" @keyup.enter="save($event)" placeholder="введите № вагона" id="wagon" class="in_data"
                style="border: 1px solid black !important" />
              <br />
              Вагон
            </th>
            <th>
              <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="date_pp_in" class="in_data"
                style="border: 1px solid black !important" />
              <br />Дата передачи на подъез. путь
            </th>
            <th>
              <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="date_work" class="in_data"
                style="border: 1px solid black !important" />
              <br />Дата проведения работ
            </th>
            <th>
              <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="date_pp_out" class="in_data"
                style="border: 1px solid black !important" />
              <br />Дата вывода с подъез. пути
            </th>
            <th>
              <input type="text" @keyup.enter="save($event)" placeholder="введите кол-во дней" id="days" class="in_data"
                style="border: 1px solid black !important" />
              <br />Расчетное время в сутках
            </th>

            <th>
              <input type="text" @keyup.enter="saveOperation($event)" placeholder="введите операцию" id="operation"
                class="in_data" style="border: 1px solid black !important" />
              <br />Операция
            </th>
            <th>
              <input type="text" @keyup.enter="save($event)" placeholder="введите цену" id="price_wo_nds" class="in_data"
                style="border: 1px solid black !important" />
              <br />Цена без НДС
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id">
            <td @click="deleteRow(index)" v-b-tooltip.hover :title="item.error" class="delete"
              :class="{ error: item.error != null }">{{ index + 1 }}</td>
            <td><input type="number" v-model="item.wagon" /></td>
            <td><input type="date" v-model="item.date_pp_in" /></td>
            <td><input type="date" v-model="item.date_work" /></td>
            <td><input type="date" v-model="item.date_pp_out" /></td>
            <td><input type="number" v-model="item.days" /></td>
            <!-- <td><input type="date" v-model="item.date_processing" /></td>
          <td><input type="text" v-model="item.application_number" /></td> -->
            <td><input type="text" v-model="item.operation" /></td>
            <td><input type="text" v-model="item.price_wo_nds" /></td>

          </tr>
        </tbody>
      </table>
    </div>

    <ActBaseReader />
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

  </div>
</template>

<!-- 12.01.1998 -->
<script>
import api from "@/api/directory";
import ActBaseReader from "./ActBaseReader.vue";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

class MyClass {
  // #date_pp_in = null
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
    this.error = null;
  }
  set date_pp_in(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._date_pp_in = reverse;
  }
  get date_pp_in() {
    return (this.date_pp_in = this._date_pp_in);
  }

  set date_work(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._date_work = reverse;
  }
  get date_work() {
    return (this.date_work = this._date_work);
  }
  set date_pp_out(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._date_pp_out = reverse;
  }

  get date_pp_out() {
    return (this.date_pp_out = this._date_pp_out);
  }
  set date_processing(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._date_processing = reverse;
  }
  get date_processing() {
    return (this.date_processing = this._date_processing);
  }

  // set price_wo_nds(value){
  //   let date = value
  //   let a = date.replace(',', '.')
  //   this._price_wo_nds = a
  // }
  // get price_wo_nds(){
  //   return (this.price_wo_nds = this._price_wo_nds)
  // }
  JSON() {
    return {
      date_pp_in: this._date_pp_in || null,
      date_work: this._date_work || null,
      date_pp_out: this._date_pp_out || null,
      date_processing: null,
      days: this.days,
      application_number: this.application_number,
      operation: this.operation,
      price_wo_nds: this.price_wo_nds,
      counterparty: this.counterparty,
      wagon: this.wagon,
      for_cargo: null,
      from_cargo: null,
      act_date: this.act_date || null,
    };
  }
}
export default {
  components: { ActBaseReader, Loader, Notifications },
  data() {
    return {
      instruction: false,
      application_number: "",
      data: [],
      act_date: "",
      counterparties: "",
      from_cargo: "",
      for_cargo: "",
      ten_visible: false,
      ten_visible2: false,
      ten_visible3: false,
      for_code6: "",
      from_code6: "",
      visible: true,
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  mounted() {
    // let first_row = new MyClass();
    // first_row.date_pp_in = '2022-01-01';
    // first_row.date_work = '2022-01-01';
    // first_row.date_pp_out = '2022-01-01';
    // first_row.days = 5;
    // first_row.date_processing = '2022-01-01';
    // first_row.application_number = 123;
    // first_row.operation = 123;
    // first_row.price_wo_nds = 0;
    // first_row.counterparty = '11 ААС';
    // first_row.wagon = 50664085;
    // first_row.for_cargo = 11;
    // first_row.from_cargo = 11;
    // first_row.act_date = '2022-01-01';
    // this.data.push(first_row)
    document.body.addEventListener("click", () => {
      this.ten_visible = false;
      this.ten_visible2 = false;
      this.ten_visible3 = false;
    });
  },
  computed: {
    filter_client() {
      if (this.counterparties.length > 1) {
        this.ten_visible = true;
      }
      return this.counterparties.length > 1
        ? this.$store.state.counterparties.counterparties.filter((item) =>
          item.work_name
            .toLowerCase()
            .includes(this.counterparties.toLowerCase())
        )
        : "";
    },
    filter_forcargo() {
      if (this.for_cargo.length > 1) {
        this.ten_visible2 = true;
      }
      return this.for_cargo.length > 1
        ? this.$store.state.cargo_code.cargo_code.filter((item) =>
          item.name.toLowerCase().includes(this.for_cargo.toLowerCase())
        )
        : "";
    },
    filter_fromcargo() {
      if (this.from_cargo.length > 1) {
        this.ten_visible3 = true;
      }
      return this.from_cargo.length > 1
        ? this.$store.state.cargo_code.cargo_code.filter((item) =>
          item.name.toLowerCase().includes(this.from_cargo.toLowerCase())
        )
        : "";
    },
  },
  methods: {
    delete_col(value) {
      for (let i in this.data) {
        this.data[i][value] = null;
      }
    },
    checkCounterpartie(value) {
      this.counterparties = value;
    },
    checkForCargo(value, code6) {
      this.for_cargo = value;
      this.for_code6 = code6;
    },
    checkFromCargo(value, code6) {
      this.from_cargo = value;
      this.from_code6 = code6;
    },
    deleteRow(index) {
      this.data.splice(index, 1);
    },
    saveActDate(caller) {
      this.act_date = caller;
    },
    saveOperation(type) {
      let operationBuffer = [];
      navigator.clipboard.readText().then((response) => {
        operationBuffer = response.split("\n")
        if (operationBuffer.at(-1) == "") {
          operationBuffer.pop()
        }
        if (operationBuffer[0] == "") {
          return;
        }
        for (let i in operationBuffer) {
          if (this.data[i] == undefined) {
            let newObj = new MyClass();
            newObj[type.target.id] = operationBuffer[i];
            this.data.push(newObj);
          } else {
            this.data[i][type.target.id] = operationBuffer[i];
          }
        }
        type.target.value = "";
      });
    },

    save(type) {
      let data_in = type.target.value.split(" ");
      if (data_in[0] == "") {
        return;
      }
      for (let i in data_in) {
        if (this.data[i] == undefined) {
          let newObj = new MyClass();
          newObj[type.target.id] = data_in[i];
          this.data.push(newObj);
        } else {
          this.data[i][type.target.id] = data_in[i];
        }
      }
      type.target.value = "";
    },
    sendData() {
      if (this.counterparties == "" || this.application_number == "") {
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Поле Контрагент и № акта обязательны к заполнению!";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 5500);
      } else {
        this.loader = true;
        for (let i in this.data) {
          this.data[i].act_date = this.act_date;
          this.data[i].counterparty = this.counterparties;
          this.data[i].from_cargo = null;
          this.data[i].for_cargo = null;
          this.data[i].price_wo_nds == "" ||  this.data[i].price_wo_nds == 0 ?  this.data[i].price_wo_nds = null : this.data[i].price_wo_nds = this.data[i].price_wo_nds.replace(',', '.')
          this.data[i].application_number = this.application_number
        }

        let arr = this.data.map((item) => {
          return item.JSON();
        });
        console.log(arr)
        api
          .postpps(arr)
          .then((response) => {
            this.loader = false;

            this.data = [];
            this.notifyHead = "Успешно";
            this.notifyMessage = "Данные отправлены";
            this.notifyClass = "wrapper-success";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 2500);
          })
          .catch((error) => {
            this.loader = false;

            this.notifyHead = "Ошибка";
            this.notifyMessage = "Данные загружены с ошибками";
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 5500);
            
            for (let i in error.response.data) {
              this.data[error.response.data[i][0]].error =
                error.response.data[i][1];
            }
            let filter_arr = [...this.data];
            this.data = filter_arr.filter((item) => {
              return item.error != null;
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a:nth-child(1){
  color: #1D67AC !important;
  cursor: pointer;
  &:hover{
    text-decoration: underline !important;
  }
}
h3:nth-child(n+2),h5{
  color: rgb(0, 0, 0);
  &:hover{
    text-decoration: underline
  }
}
h3:nth-child(1){
  background: #FCE4CC;
  color: #8F5C49;
  text-align: center;
  padding-top: 2%
}
.WatchAllArenda {
  color: rgb(146, 146, 146);
  margin-top: 15%;
  font-size: 25px;
  cursor: pointer;
  margin-left: auto;
}

.delete:hover {
  background: lightcoral;
  color: white;
}

.error {
  background: lightcoral;
}

td,
th {
  border: 1px solid black;
}

.mini {
  height: 40px;
}

.delete_col {
  height: auto;
  font-size: 12px;
  background: transparent;
  color: black;
}

.delete_col:hover {
  background: rgb(226, 226, 226);
  font-weight: 500;
}

li {
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }
}

.delete_col:hover {
  background: rgb(226, 226, 226);
}

th {
  position: relative;
}

input {
  border: none;
}

.in_data {
  border: 1px solid black !important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.filter {
  display: flex;
  justify-content: space-between;
  // align-items: baseline;
}

.col3 {
  border: none;
}
</style>
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
            Исполнитель<br />
            <input type="text" class="textarea mini" v-model="contractor" />
          </label>
          <label for="">
            № договора<br />
            <input type="text" v-model="act_number"  class="textarea mini" />
          </label>
          <label for="">
            Дата акта<br />
            <input type="date" v-model="act_date" id="act_date" class="textarea mini" />
          </label>

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
              <th style="border: none !important"><button class="delete_col" @click="delete_col('from_cargo')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col" @click="delete_col('arrival_date')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col" @click="delete_col('parking_begin_date')">Удалить
                  столб.</button></th>
                <th style="border: none !important"><button class="delete_col" @click="delete_col('departure_date')">Удалить
                столб.</button></th>
              <th style="border: none !important"><button class="delete_col"
                  @click="delete_col('days')">Удалить столб.</button></th>
              <th style="border: none !important"><button class="delete_col" @click="delete_col('work_name')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col" @click="delete_col('cost')">Удалить
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
                <input type="text" @keyup.enter="save($event)" placeholder="введите грузы" id="from_cargo" class="in_data"
                  style="border: 1px solid black !important" />
                <br />Из под груза
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="arrival_date" class="in_data"
                  style="border: 1px solid black !important" />
                <br />Дата прибытия
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="parking_begin_date" class="in_data"
                  style="border: 1px solid black !important" />
                <br />Дата отстоя
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="departure_date" class="in_data"
                  style="border: 1px solid black !important" />
                <br />Дата вывода вагона с подъездного пути
              </th>
              <!-- <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="parking_begin_date" class="in_data"
                  style="border: 1px solid black !important" />
                <br />Дата вывода с подъездного пути
              </th> -->
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите кол-во дней" id="days" class="in_data"
                  style="border: 1px solid black !important" />
                <br />Расчетное время в сутках
              </th>
  
              <th>
                <input type="text" @keyup.enter="savework_name($event)" placeholder="введите операцию" id="work_name"
                  class="in_data" style="border: 1px solid black !important" />
                <br />Наимен. услуги
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите цену" id="cost" class="in_data"
                  style="border: 1px solid black !important" />
                <br />Стоимость
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
              <td @click="deleteRow(index)" v-b-tooltip.hover :title="item.error" class="delete"
                :class="{ error: item.error != null }">{{ index + 1 }}</td>
              <td><input type="number" v-model="item.wagon" /></td>
              <td><input type="text" v-model="item.from_cargo" /></td>
              <td><input type="date" v-model="item.arrival_date" /></td>
              <td><input type="date" v-model="item.parking_begin_date" /></td>
              <td><input type="date" v-model="item.departure_date" /></td>
              <td><input type="number" v-model="item.days" /></td>
              <td><input type="text" v-model="item.work_name" /></td>
              <td><input type="text" v-model="item.cost" /></td>
  
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- <OtherChargesChange /> -->
      <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
  
    </div>
  </template>
  
  <!-- 12.01.1998 -->
  <script>
import api from "@/api/directory";
import OtherChargesChange from "./OtherChargesChange.vue";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

class MyClass {
  // #from_cargo = null
  constructor() {
    this.from_cargo = null;
    this.arrival_date = null;
    this.parking_begin_date = null;
    this.departure_date = null;
    this.days = 0;
    this.act_number = null;
    this.work_name = null;
    this.cost = 0;
    this.counterparty = null;
    this.wagon = 0;
    this.act_date = null;
    this.error = null;
  }

  set arrival_date(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._arrival_date = reverse;
  }
  get arrival_date() {
    return (this.arrival_date = this._arrival_date);
  }

  set departure_date(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._departure_date = reverse;
  }
  get departure_date() {
    return (this.departure_date = this._departure_date);
  }

  set parking_begin_date(value) {
    let date;
    date = value;
    let reverse = date?.split(".")?.reverse()?.join("-");
    this._parking_begin_date = reverse;
  }

  get parking_begin_date() {
    return (this.parking_begin_date = this._parking_begin_date);
  }

  // set cost(value){
  //   let date = value
  //   let a = date.replace(',', '.')
  //   this._cost = a
  // }
  // get cost(){
  //   return (this.cost = this._cost)
  // }
  JSON() {
    return {
      from_cargo: this.from_cargo || null,
      arrival_date: this._arrival_date || null,
      departure_date: this._departure_date || null,
      parking_begin_date: this._parking_begin_date || null,
      days: this.days,
      act_number: this.act_number,
      work_name: this.work_name,
      cost: this.cost,
      contractor: this.contractor,
      wagon: this.wagon,
      act_date: this.act_date || null,
    };
  }
}
export default {
  components: { OtherChargesChange, Loader, Notifications },
  data() {
    return {
      instruction: false,
      act_number: "",
      data: [],
      act_date: "",
      contractor: "",
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
    document.body.addEventListener("click", () => {
      this.ten_visible = false;
      this.ten_visible2 = false;
      this.ten_visible3 = false;
    });
  },
  computed: {
    filter_client() {
      if (this.contractor.length > 1) {
        this.ten_visible = true;
      }
      return this.contractor.length > 1
        ? this.$store.state.counterparties.counterparties.filter((item) =>
            item.work_name.toLowerCase().includes(this.contractor.toLowerCase())
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
      this.contractor = value;
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
    savework_name(type) {
      let work_nameBuffer = [];
      navigator.clipboard.readText().then((response) => {
        work_nameBuffer = response.split("\n");
        if (work_nameBuffer.at(-1) == "") {
          work_nameBuffer.pop();
        }
        if (work_nameBuffer[0] == "") {
          return;
        }
        for (let i in work_nameBuffer) {
          if (this.data[i] == undefined) {
            let newObj = new MyClass();
            newObj[type.target.id] = work_nameBuffer[i];
            this.data.push(newObj);
          } else {
            this.data[i][type.target.id] = work_nameBuffer[i];
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
      if (this.contractor == "" || this.act_number == "") {
        this.notifyHead = "Ошибка";
        this.notifyMessage =
          "Поле Контрагент и № акта обязательны к заполнению!";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 5500);
      } else {

        for (let i in this.data) {
          this.data[i].act_date = this.act_date;
          this.data[i].contractor = this.contractor;
          this.data[i].cost == "" ||
          this.data[i].cost == 0 ||
          this.data[i].cost === null
            ? (this.data[i].cost = null)
            : (this.data[i].cost = this.data[i].cost.replace(",", "."));
          this.data[i].act_number = this.act_number;
        }

        let arr = this.data.map((item) => {
          return item.JSON();
        });
        console.log(arr);
        // api
        //   .postpps(arr)
        //   .then((response) => {
        //     this.loader = false;

        //     this.data = [];
        //     this.notifyHead = "Успешно";
        //     this.notifyMessage = "Данные отправлены";
        //     this.notifyClass = "wrapper-success";
        //     this.showNotify = true;
        //     setTimeout(() => {
        //       this.showNotify = false;
        //     }, 2500);
        //   })
        //   .catch((error) => {
        //     this.loader = false;

        //     this.notifyHead = "Ошибка";
        //     this.notifyMessage = "Данные загружены с ошибками";
        //     this.notifyClass = "wrapper-error";
        //     this.showNotify = true;
        //     setTimeout(() => {
        //       this.showNotify = false;
        //     }, 5500);

        //     for (let i in error.response.data) {
        //       this.data[error.response.data[i][0]].error =
        //         error.response.data[i][1];
        //     }
        //     let filter_arr = [...this.data];
        //     this.data = filter_arr.filter((item) => {
        //       return item.error != null;
        //     });
        //   });
      }
    },
  },
};
</script>
  
  <style lang="scss" scoped>
a:nth-child(1) {
  color: #1d67ac !important;
  cursor: pointer;
  &:hover {
    text-decoration: underline !important;
  }
}
h3:nth-child(n + 2),
h5 {
  color: rgb(0, 0, 0);
  &:hover {
    text-decoration: underline;
  }
}
h3:nth-child(1) {
  background: #fce4cc;
  color: #8f5c49;
  text-align: center;
  padding-top: 2%;
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
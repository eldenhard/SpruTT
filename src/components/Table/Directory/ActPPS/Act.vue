<template>
  <div style="width: 78vw !important;">
    <Loader :loader="loader" />
    <h3 class="explanation" style="font-size: 17px; margin-top: -1%;">
      Перед использованием этого раздела обязательно выполнить <a @click="instruction = !instruction">следующие действия
        с
        браузером</a><br>
    </h3>
    <!-- <h3 @click="instruction = !instruction" style="cursor: pointer; text-align: left;">{{ instruction ? 'Свернуть инструкцию по браузеру' : 'Смотреть инструкцию  по браузеру' }}</h3> -->
    <div v-show="instruction">
      <p class="explanation">Пример приводится на основе браузера Google Chrome</p>
      <p>1. В адресную строку браузера ввести <b>chrome://flags/</b> и нажать Enter</p>
      <figure class="sign">
        <p><img src="../../../../assets/Draw2.png" style="width: 80%; height: auto;" alt="Рисунок 1 - адресная строка">
        </p>
      </figure>
      <br>
      <p>2. В поисковую строку открывшейся страницы ввести <b>#unsafely-treat-insecure-origin-as-secure</b></p>
      <figure class="sign">
        <p><img src="../../../../assets/Draw3.png" style="width: 80%; height: auto;" alt="Рисунок 2 - поиск данных"></p>
      </figure>
      <br>
      <p>3. В поле ввода (над подчеркнутым желтым цветом поле) ввести <b>http://portal.tehtrans.com</b>, <br> перевести
        правый селектор в положение Enabled и нажать Relaunch</p>
      <figure class="sign">
        <p><img src="../../../../assets/Draw4.png" style="width: 80%; height: auto;"
            alt="Рисунок 3 - сохранение данных">
        </p>
      </figure>
      <br>
      <p>4. После нажатия на Relaunch Ваш браузер перезапустится, <br>
        далее когда вы будете копировать данные из Excel и вставлять их в поле <b>Операция</b> браузер запросит у Вас
        разрешение на доступ <br>
        <b>обязательно нажмите Разрешить</b>, после выполнения этих действий Вы можете пользоваться разделом в полной
        мере
      </p>
      <figure class="sign">
        <p><img src="../../../../assets/Draw5.png" style="width: 80%; height: auto;"
            alt="Рисунок 3 - сохранение данных">
        </p>
      </figure>
      <h5 @click="instruction = !instruction" style="cursor: pointer; text-align: left;">
        {{ instruction ? 'Свернуть' : 'Развернуть' }}
      </h5>

    </div>

    <p class="explanation">

      * Ввод данных осуществлять через пробел
      <br />&nbsp;&nbsp;(при копировании из MS Excel, оставить введенные данные
      неизменными)
      <br />
      * Ввод станций осуществялется с указанием после наименования станции 3 заглавных букв, это может быть сокращенное
      название дороги, <br>
      или любые другие 3 заглавные буквы. <br>
      Пример: Биклянь ААА Тобольск СВР Парто Цкали ГРЗ <br>
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
      * Таблица 2 предназначена для просмотра ранее загруженых пользователем данных, для редактирования ячейки
      необходимо
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
          <input type="text" v-model="application_number" class="textarea mini" />
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
        transform: translate(-50%, 0);" v-show="ten_visible3">
        <ul id="root_tenant">
          <li v-for="item in filter_fromcargo" :key="item.id" @click="checkFromCargo(item.name, item.code6)">
            <span>{{ item.name }}</span>
            <hr />
          </li>
        </ul>
      </div>
      <button class="Delete button" style="width: 15%; white-space: nowrap; margin: 2% 5%; height: 30px"
        @click="deleteChecked(selectedItems)">Удалить выбранное</button>
      <div style="overflow:auto; max-width: 99%;">
        <table style="margin-top: 2%;">
          <thead style="border-top: none !important;">
            <tr style="border: none !important">
              <th style="border: none !important"></th>
              <th style="border: none !important"></th>
              <th style="border: none !important"><button class="delete_col button" @click="delete_col('wagon')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col button" @click="delete_col('date_pp_in')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col button" @click="delete_col('date_work')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col button" @click="delete_col('date_pp_out')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col button"
                  @click="delete_col('application_number')">Удалить столб.</button></th>
              <th style="border: none !important"><button class="delete_col button" @click="delete_col('operation')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col button" @click="delete_col('price_wo_nds')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col button" @click="delete_col('station_name')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col button" @click="delete_col('currency')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col button" @click="delete_col('agent_reward')">Удалить
                  столб.</button></th>
              <th style="border: none !important"><button class="delete_col button"
                  @click="delete_col('fact_wagon_compensation')">Удалить столб.</button></th>
            </tr>
            <tr>
              <th style="border-left: 1px solid white; border-top: 1px solid white;">
                <label for="all" style="display: flex; align-items: center; justify-content: center">Все&nbsp;<input
                    id="all" type="checkbox" :checked="selectAll" @change="toggleSelectAll"></label>
              </th>
              <th>№</th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите № вагона" id="wagon" class="in_data"
                  style="border: 1px solid black !important" />
                <br />
                Вагон
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="date_pp_in"
                  class="in_data" style="border: 1px solid black !important" />
                <br />Дата передачи на подъез. путь
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="date_work" class="in_data"
                  style="border: 1px solid black !important" />
                <br />Дата проведения работ
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите дату" id="date_pp_out"
                  class="in_data" style="border: 1px solid black !important" />
                <br />Дата вывода с подъез. пути
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите кол-во дней" id="days"
                  class="in_data" style="border: 1px solid black !important" />
                <br />Расчетное время в сутках
              </th>

              <th>
                <input type="text" @keyup.enter="saveOperation($event)" placeholder="введите операцию" id="operation"
                  class="in_data" style="border: 1px solid black !important" />
                <br />Операция
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите цену" id="price_wo_nds"
                  class="in_data" style="border: 1px solid black !important" />
                <br />Цена без НДС
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите станцию" id="station_name"
                  class="in_data" style="border: 1px solid black !important" />
                <br />Станция
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="выбор в таблице" id="currency"
                  class="in_data" style="border: 1px solid black !important" disabled />
                <br />Валюта
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите сумму" id="agent_reward"
                  class="in_data" style="border: 1px solid black !important" />
                <br />Агентское вознаграждение
              </th>
              <th>
                <input type="text" @keyup.enter="save($event)" placeholder="введите данные" id="fact_wagon_compensation"
                  class="in_data" style="border: 1px solid black !important" />
                <br />Факт по вагонам к возмещению
              </th>
            </tr>
          </thead>
          <tbody ref="table_watch">
            <tr v-for="(item, index) in data" :key="item.id">

              <td>
                <input type="checkbox" :checked="isSelected(index)" @change="toggleItemSelection(index)"
                  @click="handleCheckboxClick(index)">
              </td>

              <td @click="deleteRow(index)" v-b-tooltip.hover :title="item.error" class="delete"
                :class="{ error: item.error != null }">{{ index + 1 }}</td>
              <td><input type="number" v-model="item.wagon" /></td>
              <td><input type="date" v-model="item.date_pp_in" /></td>
              <td><input type="date" v-model="item.date_work" /></td>
              <td><input type="date" v-model="item.date_pp_out" /></td>
              <td><input type="number" v-model="item.days" /></td>
              <td><input type="text" v-model="item.operation" /></td>
              <td><input type="text" v-model="item.price_wo_nds" /></td>

              <td><input type="text" v-model="item.station_name" /></td>
              <td>
                <select v-model="item.currency">
                  <option value="RUB">RUB</option>
                  <option value="USD">USD</option>
                  <option value="KZT">KZT</option>
                </select>
              </td>
              <td><input type="number" v-model="item.agent_reward" /></td>
              <td><input type="number" v-model="item.fact_wagon_compensation" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ActBaseReader />
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

  </div>
</template>


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
    this.currency = 'RUB';
    this.station_name = null;
    this.agent_reward = 0;
    this.fact_wagon_compensation = null;
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
      agent_reward: this.agent_reward || null,
      fact_wagon_compensation: this.fact_wagon_compensation || null,
      station_name: this.station_name || null,
      currency: this.currency || null,
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
      all_checkbox: [],
      selectAll: false,
      selectedItems: [],

      shiftPressed: false,
      lastClickedIndex: null,

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
    document.body.addEventListener("click", () => {
      this.ten_visible = false;
      this.ten_visible2 = false;
      this.ten_visible3 = false;
    });
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
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
    deleteChecked(indexArray) {
      this.data = this.data.filter((_, index) => !indexArray.includes(index));
      this.selectedItems = [];
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll
      if (this.selectAll) {
        this.selectedItems = this.data.map((_, index) => index)
        console.log(this.selectedItems)
      } else {
        this.selectedItems = []
      }
      console.log(this.selectedItems)
    },
    toggleItemSelection(itemId) {
      if (this.isSelected(itemId)) {
        this.selectedItems = this.selectedItems.filter(id => id !== itemId)
      } else {
        this.selectedItems.push(itemId)
      }

      console.log(this.selectedItems, 'im here')
    },
    isSelected(itemId) {
      return this.selectedItems.includes(itemId)
    },
    handleCheckboxClick(index) {
      if (this.shiftPressed && this.lastClickedIndex !== null) {
        const start = Math.min(index, this.lastClickedIndex);
        const end = Math.max(index, this.lastClickedIndex);
        for (let i = start + 1; i < end; i++) {
          this.toggleItemSelection(i);
        }
      }
      this.lastClickedIndex = index;
    },
    handleKeyDown(event) {
      if (event.key === 'Shift') {
        this.shiftPressed = true;
      }
    },
    handleKeyUp(event) {
      if (event.key === 'Shift') {
        this.shiftPressed = false;
        this.lastClickedIndex = null; // Сброс индекса последнего клика при отпускании Shift
      }
    },
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
      let data_in

      if (type.target.id == 'station_name') {
        console.log(type.target.value)
        data_in = type.target.value.replaceAll(/[А-Я]{3}/g, "///").split('///').filter((item) => item != "")
        console.log(data_in)
      } else {
        data_in = type.target.value.split(" ");
      }
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
      
        this.data.forEach((item) => item.error = null);
        for (let i in this.data) {
          this.data[i].act_date = this.act_date;
          this.data[i].counterparty = this.counterparties;
          this.data[i].from_cargo = null;
          this.data[i].for_cargo = null;
          this.data[i].price_wo_nds == "" || this.data[i].price_wo_nds == 0 || this.data[i].price_wo_nds === null ? this.data[i].price_wo_nds = null : this.data[i].price_wo_nds = this.data[i].price_wo_nds.replace(',', '.')
          this.data[i].application_number = this.application_number

        }

        let arr = this.data.map((item) => {
          return item.JSON();
        });
        console.log(arr)
        let result = []
        let length = 10
        while (arr.length) {
          result.push(arr.splice(0, length))
        }
        let response = result.map((item) => api.postpps(item))
        Promise.all(response)
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
          }).catch((error) => {
            this.loader = false;
            this.notifyHead = "Ошибка";
            this.notifyMessage = "Данные загружены с ошибками";
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 4000);

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

<style scoped>
.vs__selected{
   
}
input {
  text-align: center;
}

a:nth-child(1) {
  color: #1D67AC !important;
  cursor: pointer;
}

a:nth-child(1):hover {
  text-decoration: underline !important;
}

h3:nth-child(n+2),
h5 {
  color: black;
}

h3:nth-child(n+2):hover {
  text-decoration: underline;
}

h5:hover {
  text-decoration: underline;
}

h3:nth-child(1) {
  background: #FCE4CC;
  color: #8F5C49;
  text-align: center;
  padding-top: 2%;
}

.WatchAllArenda {
  color: #929292;
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
  background: #e2e2e2;
  font-weight: 500;
}

li {
  cursor: pointer;
}

li:hover {
  font-weight: 600;
}

.delete_col:hover {
  background: #e2e2e2;
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
  width: 95%;
  gap: 2%;
  margin: 0 auto;
  flex-wrap: wrap;
  position: relative;
  border: 1px solid rgb(211,211,211);
  padding: 1%;
}

.col3 {
  border: none;
}
</style>
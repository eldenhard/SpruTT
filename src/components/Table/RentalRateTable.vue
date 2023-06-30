<template>
  <div>
    <Loader :loader="loader" />
    <p class="explanation">
      * Ввод данных по вагонам, датам, дням и ставкам вводить через пробел
      <br />&nbsp;&nbsp;(при копировании из MS Excel, оставить введенные данные
      неизменными)
      <br />
      * Ввод дат осуществлять только в строгом формате <b>12.01.2023</b> <br />
      &nbsp;&nbsp;<u>Другой формат ввода даты не допускается. </u>
      <br />
      * Для удаления строки кликните на порядковый номер строки(левый столбец)
      <br />
      * Для сохранения изменненого поля кликните на галочку, <br />
      &nbsp;&nbsp;зеленая индикация поля указывает на сохранение внесенных
      изменений
      <br />
      * Для выбора значения арендатора и арендодателя, дважды нажмите на
      подходящее значение
      <br />
      <br />
      * Для того чтобы выравнить количество строк таблицы по длине, <br />
      &nbsp;&nbsp;в столбце где не хватает значений поставьте пробел, таблица
      автоматически дозапишет значения в таблицу <br />
      * <b>Ставки должны быть загружены в строгом формате, без пробелов и иных знаков</b> <br>
      &nbsp;&nbsp;Пример: 1700 - верно; 1 700 - не верно; 1700,00 - не верно
      <br />
    </p>
    <div class="rent_person">
      <label for="tenant" :class="{ rentError_person: ErrorPerson }"
        >Арендатор
        <br />
        <input type="text" id="tenant" class="textarea" v-model="tenant" />
      </label>

      <label for="landlord" :class="{ rentError_person: ErrorPersonLand }"
        >Арендодатель
        <br />
        <input type="text" id="landlord" class="textarea" v-model="landlord" />
      </label>

      <label for="">
        <br />
        <button class="button textarea" @click="dataCollection()">
          Отправить данные
        </button>
      </label>
    </div>

    <div class="rent_person">
      <label for="">
        <div
          class="textarea"
          style="height: auto; width: 100%"
          v-show="ten_visible"
        >
          <ul id="root_tenant">
            <li
              v-for="item in filter_tenant"
              :key="item.id"
              @click="checkTenant(item.work_name)"
            >
              <span>{{ item.work_name }}</span>
              <hr />
            </li>
          </ul>
        </div>
      </label>

      <label for="">
        <div
          class="textarea"
          style="height: auto; width: 100%"
          v-show="land_visible"
        >
          <ul id="root_landlord">
            <li
              v-for="item in filter_landlord"
              :key="item.id"
              @click="checkLanlord(item.work_name)"
            >
              <span>{{ item.work_name }}</span>
              <hr />
            </li>
          </ul>
        </div>
      </label>

      <button
        class="textarea"
        style="background: transparent; color: white; border: none"
        disabled
      >
        Отправить данные
      </button>
    </div>
    <button class="button textarea" @click="deleteTable()">Очистить таблицу</button> <br><br><br>
    <div class="rent_information_lenght">
      <p class="amount"></p>
      <p class="amount">Всего: {{ wagon_arr.length }}</p>
      <p class="amount">Всего: {{ start_date_arr.length }}</p>
      <p class="amount">Всего: {{ end_date_arr.length }}</p>
      <p class="amount">Всего: {{ stavka_arr.length }}</p>
      <p class="amount">Всего: {{ stavka_start_date_arr.length }}</p>
      <p class="amount">Всего: {{ stavka_end_date_arr.length }}</p>
    </div>
    

    <div class="rent_information_button">
      <p class="amount"></p>
      <button class="delete_col" @click="delete_col(wagon_arr)">Очистить столб.</button>
      <button class="delete_col" @click="delete_col2(start_date_arr)">Очистить столб.</button>
      <button class="delete_col" @click="delete_col3(end_date_arr)">Очистить столб.</button>
      <button class="delete_col" @click="delete_col4(stavka_arr)">Очистить столб.</button>
      <button class="delete_col" @click="delete_col5(stavka_start_date_arr)">Очистить столб.</button>
      <button class="delete_col" @click="delete_col6(stavka_end_date_arr)">Очистить столб.</button>
    </div>
    <table border="1" style="margin-top: 1%;">
      <thead>
        <tr>
          <th></th>
          <th>
            <div class="inputWithIcon">
              <input
                type="text"
                v-model="wagon"
                autocomplete="off"
                placeholder="введите номера "
              />
              <i
                class="fa"
                aria-hidden="true"
                @click="CreateTable()"
                v-if="wagon.length > 0"
              ></i>
            </div>
          </th>

          <th>
            <div class="inputWithIcon">
              <input
                type="text"
                v-model="start_date"
                placeholder="введите дату "
              />
              <i
                class="fa"
                aria-hidden="true"
                @click="CreateTableStartDate()"
                v-if="start_date.length > 0"
              ></i>
            </div>
          </th>

          <th>
            <div class="inputWithIcon">
              <input
                type="text"
                v-model="end_date"
                placeholder="введите дату "
              />
              <i
                class="fa"
                aria-hidden="true"
                @click="CreateTableEndDate()"
                v-if="end_date.length > 0"
              ></i>
            </div>
          </th>

          <th>
            <div class="inputWithIcon">
              <input
                type="text"
                v-model="stavka"
                placeholder="введите ставку "
              />
              <i
                class="fa"
                aria-hidden="true"
                @click="CreateTableStavka()"
                v-if="stavka.length > 0"
              ></i>
            </div>
          </th>

          <th>
            <div class="inputWithIcon">
              <input
                type="text"
                v-model="stavka_start_date"
                placeholder="введите дату "
              />
              <i
                class="fa"
                aria-hidden="true"
                @click="CreateStartStavka()"
                v-if="stavka_start_date.length > 0"
              ></i>
            </div>
          </th>

          <th>
            <div class="inputWithIcon">
              <input
                type="text"
                v-model="stavka_end_date"
                placeholder="введите дату "
              />
              <i
                class="fa"
                aria-hidden="true"
                @click="CreateEndStavka()"
                v-if="stavka_end_date.length > 0"
              ></i>
            </div>
          </th>
        </tr>
        <tr>
          <th>#</th>
          <th>№ вагона</th>
          <th>Дата начала аренды</th>
          <th>Дата конца аренды</th>
          <!-- <th>Кол-во дней</th> -->
          <th>Ставка</th>
          <th>Дата начала ставки</th>
          <th>Дата конца ставки</th>
        </tr>
      </thead>
      <tbody>

      
        <td style="width: 30px !important">
          <!-- Цикл по числу (длина столбца) -->
          <tr v-for="(wag, index) in sort_data" :key="wag"
            style="width: 30px !important"
          >  
            <td  >
            
              <div class="inputWithIcon" >
                <input
                  type="text"
                 
                  :id="`indexRow`"
                  name="сheck_in"
                  :value="index+1"
                  readonly
                  style="width: 100% !important; text-align: center"
                  @click="test(index)"
                  v-b-tooltip.hover
                  :title="error_color[index]"
                />

                <i class="delete_row"></i>
              </div>
            </td>
          </tr>
        </td>

        <td>
          <tr v-for="(wag, index) in wagon_arr" :key="wag.id">
            <td>
              <div class="inputWithIcon">
                <input
                :class="{ red123: (error_mess.length != 0 & error_mess[index] == 'red')}"
                  type="text"
                  name="сheck_in"
                  :id="`wagon` + index"
                  :value="Transform(wag)"
                  style="text-align: center"
                />
                <i
                  class="fa"
                  aria-hidden="true"
                  @click="deleteArr(wag, index)"
                  v-if="wagonSaveData"
                ></i>
              </div>
            </td>
          </tr>
        </td>

        <td>
          <tr v-for="(start, index) in start_date_arr" :key="start.id">
            <td>
              <div class="inputWithIcon">
                <input
                  type="text"
                  name="сheck_in"
                  :id="`start` + index"
                  :value="Transform(start)"
                  style="text-align: center"
                />
                <i
                  class="fa"
                  aria-hidden="true"
                  @click="deleteStart(start, index)"
                  v-if="wagonSaveData"
                ></i>
              </div>
            </td>
          </tr>
        </td>

        <td>
          <tr v-for="(end, index) in end_date_arr" :key="end.id">
            <td>
              <div class="inputWithIcon">
                <input
                  type="text"
                  name="сheck_in"
                  :id="`end` + index"
                  :value="Transform(end)"
                  style="text-align: center"
                />
                <i
                  class="fa"
                  aria-hidden="true"
                  @click="deleteEnd(end, index)"
                  v-if="wagonSaveData"
                ></i>
              </div>
            </td>
          </tr>
        </td>

        <td>
          <tr v-for="(stavka, index) in stavka_arr" :key="stavka.id">
            <td>
              <div class="inputWithIcon">
                <input
                  type="text"
                  name="сheck_in"
                  :id="`stavka` + index"
                  :value="Transform(stavka)"
                  style="text-align: center"
                />
                <i
                  class="fa"
                  aria-hidden="true"
                  @click="deleteStavka(stavka, index)"
                  v-if="wagonSaveData"
                ></i>
              </div>
            </td>
          </tr>
        </td>

        <td>
          <tr v-for="(start, index) in stavka_start_date_arr" :key="start.id">
            <td>
              <div class="inputWithIcon">
                <input
                  type="text"
                  name="сheck_in"
                  :id="`startStavka` + index"
                  :value="Transform(start)"
                  style="text-align: center"
                />
                <i
                  class="fa"
                  aria-hidden="true"
                  @click="deleteStartStavka(start, index)"
                  v-if="wagonSaveData"
                ></i>
              </div>
            </td>
          </tr>
        </td>

        <td>
          <tr v-for="(end, index) in stavka_end_date_arr" :key="end.id">
            <td>
              <div class="inputWithIcon">
                <input
                  type="text"
                  name="сheck_in"
                  :id="`endStavka` + index"
                  :value="Transform(end)"
                  style="text-align: center"
                />
                <i
                  class="fa"
                  aria-hidden="true"
                  @click="deleteEndStavka(end, index)"
                  v-if="wagonSaveData"
                ></i>
              </div>
            </td>
          </tr>
        </td>
      </tbody>
    </table>
    <ArendaDataTable />
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
      id="notif"
    />
  </div>
</template>

<script>
import api from "@/api/directory";
import { mapState } from "vuex";
import Notifications from "@/components/notifications/Notifications.vue";
import Loader from "../loader/loader.vue";
import ArendaDataTable from "./ArendaDataTable.vue";
export default {
  name: "rental-rate",
  components: { Notifications, Loader, ArendaDataTable },
  data() {
    return {
      loader: false,
      sort_data_and_error: "",
      wagon: "",
      stavka: "",
      start_date: "",
      end_date: "",
      // days_amount: "",
      landlord: "",
      tenant: "",
      stavka_start_date: "",
      stavka_end_date: "",

      wagon_arr: [],
      stavka_arr: [],
      start_date_arr: [],
      end_date_arr: [],
      stavka_end_date_arr: [],
      stavka_start_date_arr: [],
      error_mess: [],
      error_color: [],
      // days_amount_arr: [],
      all_length: [],


      success: false,
      ten_visible: true,
      land_visible: true,
      ErrorPersonLand: false,
      ErrorPerson: false,
      // анимация
      wagonSaveData: true,
      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      // все ошибки
      Error: "",
    };
  },
  // 52458502 52568300 52577715

  computed: {
    ...mapState({
      id: (state) => state.auth.uid,
    }),
    sort_data() {
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
        this.stavka_start_date_arr.length,
        this.stavka_end_date_arr.length
      );
       return Math.max.apply(null, sort_Array);
    },
    filter_tenant() {
      if (this.tenant.length > 1) {
        this.ten_visible = true;
      }
      return this.tenant.length > 1
        ? this.$store.state.counterparties.counterparties.filter((i) =>
            i.work_name.toLowerCase().includes((this.tenant).toLowerCase())
          )
        : "";
    },
    filter_landlord() {
      if (this.landlord.length > 1) {
        this.land_visible = true;
      }
      return this.landlord.length > 1
        ? this.$store.state.counterparties.counterparties.filter((i) =>
            i.work_name.toLowerCase().includes((this.landlord).toLowerCase())
          )
        : "";
    },
  },
  watch: {
    tenant() {
      return this.tenant == ""
        ? (this.ErrorPerson = true)
        : (this.ErrorPerson = false);
    },
    landlord() {
      return this.landlord == ""
        ? (this.ErrorPersonLand = true)
        : (this.ErrorPersonLand = false);
    },
    wagon() {
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
        this.stavka_start_date_arr.length,
        this.stavka_end_date_arr.length,
        this.error_color.length,
        this.error_mess.length,
      );
      let a = Math.max.apply(null, sort_Array);
      if (this.wagon_arr.length < a ) {
        let c = a - this.wagon_arr.length;
        for (let i = 1; i <= c; i++) {
          this.wagon_arr.push("null");
         
        }
      }

    
      if (this.error_color.length < a ) {
        let f = a - this.error_color.length;
        for (let i = 1; i <= f; i++) {
          this.error_color.push("null");
         
        }
      }

      if (this.error_mess.length < a ) {
        let x = a - this.error_mess.length;
        for (let i = 1; i <= x; i++) {
          this.error_mess.push("null");
         
        }
      }

    },
    stavka() {
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
        this.stavka_start_date_arr.length,
        this.stavka_end_date_arr.length,
        this.error_color.length,
        this.error_mess.length,
      );
      let a = Math.max.apply(null, sort_Array);

      if (this.stavka_arr.length < a) {
        let c = a - this.stavka_arr.length;
        for (let i = 1; i <= c; i++) {
          this.stavka_arr.push("null");
        }
      }
      if (this.error_color.length < a ) {
        let f = a - this.error_color.length;
        for (let i = 1; i <= f; i++) {
          this.error_color.push("null");
         
        }
      }

      if (this.error_mess.length < a ) {
        let x = a - this.error_mess.length;
        for (let i = 1; i <= x; i++) {
          this.error_mess.push("null");
         
        }
      }

    },
    start_date() {
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
        this.stavka_start_date_arr.length,
        this.stavka_end_date_arr.length,
        this.error_color.length,
        this.error_mess.length,
      );
      let a = Math.max.apply(null, sort_Array);

      if (this.start_date_arr.length < a) {
        let c = a - this.start_date_arr.length;
        for (let i = 1; i <= c; i++) {
          this.start_date_arr.push("null");
        }
      }
      if (this.error_color.length < a ) {
        let f = a - this.error_color.length;
        for (let i = 1; i <= f; i++) {
          this.error_color.push("null");
         
        }
      }

      if (this.error_mess.length < a ) {
        let x = a - this.error_mess.length;
        for (let i = 1; i <= x; i++) {
          this.error_mess.push("null");
         
        }
      }

    },
    end_date() {
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
        this.stavka_start_date_arr.length,
        this.stavka_end_date_arr.length,
        this.error_color.length,
        this.error_mess.length,
      );
      let a = Math.max.apply(null, sort_Array);

      if (this.end_date_arr.length < a) {
        let c = a - this.end_date_arr.length;
        console.log(c);
        for (let i = 1; i <= c; i++) {
          this.end_date_arr.push("null");
        }
      }
      if (this.error_color.length < a ) {
        let f = a - this.error_color.length;
        for (let i = 1; i <= f; i++) {
          this.error_color.push("null");
         
        }
      }

      if (this.error_mess.length < a ) {
        let x = a - this.error_mess.length;
        for (let i = 1; i <= x; i++) {
          this.error_mess.push("null");
         
        }
      }

    },
    stavka_start_date() {
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
        this.stavka_start_date_arr.length,
        this.stavka_end_date_arr.length,
        this.error_color.length,
        this.error_mess.length,
      );
      let a = Math.max.apply(null, sort_Array);

      if (this.stavka_start_date_arr.length < a) {
        let c = a - this.stavka_start_date_arr.length;
        console.log(c);
        for (let i = 1; i <= c; i++) {
          this.stavka_start_date_arr.push("null");
        }
      }
      if (this.error_color.length < a ) {
        let f = a - this.error_color.length;
        for (let i = 1; i <= f; i++) {
          this.error_color.push("null");
         
        }
      }

      if (this.error_mess.length < a ) {
        let x = a - this.error_mess.length;
        for (let i = 1; i <= x; i++) {
          this.error_mess.push("null");
         
        }
      }

    },
    stavka_end_date() {
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
        this.stavka_start_date_arr.length,
        this.stavka_end_date_arr.length,
        this.error_color.length,
        this.error_mess.length,
      );
      let a = Math.max.apply(null, sort_Array);

      if (this.stavka_end_date_arr.length < a) {
        let c = a - this.stavka_end_date_arr.length;
        console.log(c);
        for (let i = 1; i <= c; i++) {
          this.stavka_end_date_arr.push("null");
        }
      }
      if (this.error_color.length < a ) {
        let f = a - this.error_color.length;
        for (let i = 1; i <= f; i++) {
          this.error_color.push("null");
         
        }
      }

      if (this.error_mess.length < a ) {
        let x = a - this.error_mess.length;
        for (let i = 1; i <= x; i++) {
          this.error_mess.push("null");
         
        }
      }

    },

    Error() {
      // colors
      let new_erros_color = Object.assign(this.error_mess);

      // messages
      let new_error_mes = Object.assign(this.error_color);
      /*
      Error = [
        (1, 1)
        (2, 1)
      ]
      */
      for (let i = 0; i < this.Error.length; i++){
        let row_index = this.Error[i][0] - 1;
        let row_message = this.Error[i][1]
        new_error_mes[row_index] = row_message;
        new_erros_color[row_index] = 'red';
      }
      this.error_color = new_error_mes;
      
      // deleting
      let new_wagons = Object.assign(this.wagon_arr)
      let new_start_date = Object.assign(this.start_date_arr)
      let new_end_date = Object.assign(this.end_date_arr)
      let new_stavka = Object.assign(this.stavka_arr)
      let new_stavka_end_date = Object.assign(this.stavka_end_date_arr)
      let new_stavka_start_date = Object.assign(this.stavka_start_date_arr)
      let new_errors_messages = Object.assign(this.error_mess)
      let new_error_colors = Object.assign(this.error_color)

      
      for (let i = 0; i < new_error_mes.length; i++){
        if (new_error_mes[i] == 'null'){
          delete new_wagons[i];
          delete new_start_date[i];
          delete new_end_date[i];
          delete new_stavka[i];
          delete new_stavka_end_date[i];
          delete new_stavka_start_date[i];
          delete new_error_colors[i];
          delete new_errors_messages[i];
        }
      }

      new_wagons = new_wagons.filter(item => item != undefined)
      new_start_date = new_start_date.filter(item => item != undefined)
      new_end_date = new_end_date.filter(item => item != undefined)
      new_stavka = new_stavka.filter(item => item != undefined)
      new_stavka_end_date = new_stavka_end_date.filter(item => item != undefined)
      new_stavka_start_date = new_stavka_start_date.filter(item => item != undefined)
      new_error_colors = new_error_colors.filter(item => item != undefined)
      new_errors_messages = new_errors_messages.filter(item => item != undefined)

      this.wagon_arr = new_wagons;
      this.start_date_arr = new_start_date;
      this.end_date_arr = new_end_date;
      this.stavka_arr = new_stavka;
      this.stavka_end_date_arr = new_stavka_end_date;
      this.stavka_start_date_arr = new_stavka_start_date;
      this.error_color = new_error_colors;
      this.error_mess = new_errors_messages;

    },
  },
  methods: {
    delete_col(col){
      this.wagon_arr = [];
    },
    delete_col2(col){
      this.start_date_arr = [];
    },
    delete_col3(col){
      this.end_date_arr = [];
    },
    delete_col4(col){
      this.stavka_arr = [];
    },
    delete_col5(col){
      this.stavka_start_date_arr = [];
    },
    delete_col6(col){
      this.stavka_end_date_arr = [];
    },
    deleteTable(){
      this.wagon_arr = [];
      this.stavka_arr = [];
      this.start_date_arr = [];
      this.end_date_arr = [];
      this.stavka_end_date_arr = [];
      this.stavka_start_date_arr = [];
      this.error_mess = [],
      this.error_color = []
    },
    Transform(value) {
      return value.replace("null", "-");
    },
    ErrorResp(index) {
      document.getElementById("wagon" + index).style =
        "background: #FF6C37; color: white";
      document.getElementById("start" + index).style =
        "background: #FF6C37; color: white";
      document.getElementById("end" + index).style =
        "background: #FF6C37; color: white";
      document.getElementById("stavka" + index).style =
        "background: #FF6C37; color: white";
      document.getElementById("startStavka" + index).style =
        "background: #FF6C37; color: white";
      document.getElementById("endStavka" + index).style =
        "background: #FF6C37; color: white";
    },
    test(index) {
      console.log(`Я удалил ${index}`)
      this.wagon_arr.splice(index, 1);
      this.start_date_arr.splice(index, 1);
      this.end_date_arr.splice(index, 1);
      this.stavka_end_date_arr.splice(index, 1);
      this.stavka_start_date_arr.splice(index, 1);
      this.stavka_arr.splice(index, 1);
      this.error_color.splice(index, 1);
      this.error_mess.splice(index, 1)
    },
    // ВАГОН
    CreateTable() {
      let handler = this.wagon.split(" ");
      this.wagon_arr = [...handler];
      this.wagon_len = this.wagon_arr.length;
      this.wagon = "";
    },
    deleteArr(data_value, index) {
      let data = document.getElementById(`wagon${index}`).value;
      this.wagon_arr.splice(index, 1, data);
      let wagon_DOM = document.getElementById(`wagon${index}`);
      wagon_DOM.classList.add("success");
      setTimeout(() => {
        wagon_DOM.classList.remove("success");
      }, 1000);
    },

    // ДАТА НАЧАЛЫ АРЕНДЫ
    CreateTableStartDate() {
      let handler = this.start_date.split(" ");
      this.start_date_arr = [...handler];
      this.start_date = "";
    },
    deleteStart(data_value, index) {
      let data = document.getElementById(`start${index}`).value;
      this.start_date_arr.splice(index, 1, data);
      // console.log(this.wagon_arr)
      let wagon_DOM = document.getElementById(`start${index}`);
      wagon_DOM.classList.add("success");
      setTimeout(() => {
        wagon_DOM.classList.remove("success");
      }, 1000);
    },

    // ДАТА КОНЦА АРЕНДЫ
    CreateTableEndDate() {
      let handler = this.end_date.split(" ");

      this.end_date_arr = [...handler];
      this.end_date = "";
    },
    deleteEnd(data_value, index) {
      let data = document.getElementById(`end${index}`).value;
      this.end_date_arr.splice(index, 1, data);
      let wagon_DOM = document.getElementById(`end${index}`);
      wagon_DOM.classList.add("success");
      setTimeout(() => {
        wagon_DOM.classList.remove("success");
      }, 1000);
    },

    // СТАВКА
    CreateTableStavka() {
      let stavka = this.stavka.split(" ");
      this.stavka_arr = [...stavka];
      this.stavka = "";
    },
    deleteStavka(data_value, index) {
      let data = document.getElementById(`stavka${index}`).value;
      this.stavka_arr.splice(index, 1, data);
      let wagon_DOM = document.getElementById(`stavka${index}`);
      wagon_DOM.classList.add("success");
      setTimeout(() => {
        wagon_DOM.classList.remove("success");
      }, 1000);
    },

    // ДАТА НАЧАЛА СТАВКИ

    CreateStartStavka() {
      let start_stavka = this.stavka_start_date.split(" ");
      this.stavka_start_date_arr = [...start_stavka];
      this.stavka_start_date = "";
    },
    deleteStartStavka(data_value, index) {
      let data = document.getElementById(`startStavka${index}`).value;
      this.stavka_start_date_arr.splice(index, 1, data);
      let wagon_DOM = document.getElementById(`startStavka${index}`);
      wagon_DOM.classList.add("success");
      setTimeout(() => {
        wagon_DOM.classList.remove("success");
      }, 1000);
    },

    // ДАТА КОНЦА СТАВКИ
    CreateEndStavka() {
      let end_stavka = this.stavka_end_date.split(" ");
      this.stavka_end_date_arr = [...end_stavka];
      this.stavka_end_date = "";
    },
    deleteEndStavka(data_value, index) {
      let data = document.getElementById(`endStavka${index}`).value;
      this.stavka_end_date_arr.splice(index, 1, data);
      let wagon_DOM = document.getElementById(`endStavka${index}`);
      wagon_DOM.classList.add("success");
      setTimeout(() => {
        wagon_DOM.classList.remove("success");
      }, 1000);
    },

    checkTenant(value) {
      this.ten_visible = false;
      this.tenant = value;

      // document.getElementById('root_tenant').innerHTML = ''
    },
    checkLanlord(value) {
      this.land_visible = false;
      this.landlord = value;
      // document.getElementById('root_landlord').innerHTML = ''
    },
    helper(a) {
      return [...new Set(a)].length == 1;
    },
    dataCollection() {
      this.loader = true;
      let wagon = [];
      this.wagon_arr.forEach((item) => {
        wagon.push({
          wagon: item,
        });
        // this.error_mess.push(null);
        // this.error_color.push("white")
      });

      let stavka = [];
      this.stavka_arr.forEach((item) => {
        stavka.push({
          stavka: item,
        });
      });

      let start_date = [];
      this.start_date_arr.forEach((item) => {
        start_date.push({
          start_date: item.replace(/\./g, "-").split("-").reverse("").join("-"),
        });
      });

      let end_date = [];
      this.end_date_arr.forEach((item) => {
        end_date.push({
          end_date: item.replace(/\./g, "-").split("-").reverse("").join("-"),
        });
      });

      let stavka_start_date = [];
      this.stavka_start_date_arr.forEach((item) => {
        stavka_start_date.push({
          stavka_start_date: item
            .replace(/\./g, "-")
            .split("-")
            .reverse("")
            .join("-"),
        });
      });

      let stavka_end_date = [];
      this.stavka_end_date_arr.forEach((item) => {
        stavka_end_date.push({
          stavka_end_date: item
            .replace(/\./g, "-")
            .split("-")
            .reverse("")
            .join("-"),
        });
      });

      this.all_length.push(
        this.wagon_arr.length,
        this.stavka.length,
        this.start_date.length,
        this.end_date.length,
        this.stavka_start_date_arr.length,
        this.stavka_end_date_arr.length
        // this.days_amount_len
      );

      // console.log(this.all_length)
      // if (this.helper(this.all_length) == true) {
      let all_array = wagon.map((item, index) => ({
        landlord: this.landlord,
        tenant: this.tenant,
        ...item,
        ...stavka[index],
        ...start_date[index],
        ...end_date[index],
        ...stavka_start_date[index],
        ...stavka_end_date[index],
        days_amount: null,
        responsible_user: this.id,
      }));


      all_array.forEach((item) => {
        if (item.end_date == "null" || item.end_date == ""|| item.end_date == "-") {
           (item.end_date = null);
        }
        if (item.start_date == "null" || item.start_date == "" || item.start_date == "-") {
           (item.start_date = null);
        }
        if (item.stavka_start_date == "null" || item.stavka_start_date == "" || item.stavka_start_date == "-") {
           (item.stavka_start_date = null);
        }
        if (item.stavka_end_date == "null" || item.stavka_end_date == "" || item.stavka_end_date == "-") {
           (item.stavka_end_date = null);
        }
        if (item.wagon == "null" || item.wagon == ""|| item.wagon == "-") {
           (item.wagon = 0);
        }
        if (item.stavka == "null" || item.stavka == ""|| item.stavka == "-") {
           (item.stavka = 0);
        }
         (item.stavka = Number(item.stavka));
      });



      if (this.landlord == "" || this.tenant == "") {
        this.loader = false;
        if (this.landlord == "") {
          this.ErrorPersonLand = true;
        }
          if (this.tenant == "") {
            this.ErrorPerson = true;
          }
              this.notifyHead = "Ошибка";
              this.notifyMessage =
                "Необходимо указать данные по Арендатору/Арендодателю";
              this.notifyClass = "wrapper-error";
              this.showNotify = true;
              setTimeout(() => {
                this.showNotify = false;
              }, 2500);
      } else {
        api
          .postSaveMany(all_array)
          .then((response) => {
            this.loader = false;
            this.notifyHead = "Успешно";
            this.notifyMessage = "Данные отправлены";
            this.notifyClass = "wrapper-success";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 2500);
            this.wagon_arr = [];
            this.stavka_arr = [];
            this.start_date_arr = [];
            this.end_date_arr = [];
            this.stavka_end_date_arr = [];
            this.stavka_start_date_arr = [];
          })
          .catch((error) => {
            this.loader = false;
            this.notifyHead = "Ошибка";
            this.Error = error.response.data;
            this.notifyMessage = error.response.data;
            
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 5500);
          });
      }
      this.all_length = [];
      this.deleteTable()
    },
    // }else {
    //     this.loader = false;
    //     this.notifyHead = "Ошибка";
    //     this.notifyMessage = "Данные по вагонам, датам, дням и ставкам должны быть одной длины";
    //     this.notifyClass = "wrapper-error";
    //     this.showNotify = true;
    //     setTimeout(() => {
    //       this.showNotify = false;
    //     }, 3500);
    //   }
  },
};
</script>

<style scoped>
.delete_col {
  height: 15px;
  font-size: 14px;
  background: transparent;
  color: black;
}
.delete_col:hover{
  background: rgb(226, 226, 226);
}
.grey{
  background: grey;
}
.red123{
  background-color: red !important;
}
#indexRow:hover {
  background: rgb(255, 0, 0, 0.2);
}
.delete_row {
  background: url(@/assets/delete_row.png) no-repeat;
  display: none;
}

.fa {
  background: url(@/assets/check-mark.png) no-repeat;
}

.rentError_person {
  color: red;
}
.success {
  transition: 0.5s ease-in-out;
  background: rgba(42, 190, 67, 0.4);
  color: black;
}

.inputWithIcon {
  position: relative;
  overflow: hidden;
  padding: 0;
}

i {
  position: absolute;
  right: 0;
  top: 0;
  padding: 14px 13px;
  color: #aaa;
  transition: 0.3s;
}

input {
  width: 100%;
}

/* input[type='text']:nth-child(7n) {
  width: 100%;
} */
tr,
th,
th {
  border: 1px solid black;
}
td {
  vertical-align: top !important;
}

li {
  cursor: pointer;
  list-style-type: none;
  width: 100%;
  margin: 0;
  padding: 0 0 0 0;
}

li > span {
  padding-left: 5%;
  text-align: center;
}

ul {
  margin: 0;
  padding: 0;
}

.m0p0 {
  padding: 0;
}

li:hover {
  background: lightgrey;
}

.button {
  float: right;
  background: #18842a !important;
}

.explanation {
  font-size: 13px;
  color: grey;
  text-align: left;
  padding: 0 0 2% 0%;
}

.rent_person {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 5%;
  /* display: flex;
  justify-content: space-around; */
}

.rent_person_answer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
}

.rent_information {
  display: grid;
  gap: 2%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.rent_information_lenght {
  display: grid;
  gap: 2%;
  grid-template-columns: 0.7fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
.rent_information_button {
  display: grid;
  gap: 2px;
  grid-template-columns: 0.7fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
.rent_information_placeholder {
  margin-top: 7%;
  display: grid;
  gap: 2%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>
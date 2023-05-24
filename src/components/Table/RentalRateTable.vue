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
      <br>
      * Для того чтобы выравнить количество строк таблицы по длине, <br>
      &nbsp;&nbsp;в столбце где не хватает значений поставьте пробел, таблица автоматически дозапишет значения в таблицу
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
 

    <!-- <div class="rent_information_lenght">
      <p class="amount"></p>
      <p class="amount">Всего: {{ wagon_len }}</p>
      <p class="amount">Всего: {{ start_date_len }}</p>
      <p class="amount">Всего: {{ end_date_len }}</p>
      <p class="amount">Всего: {{ days_amount_len }}</p>
      <p class="amount">Всего: {{ stavka_len }}</p>
    </div> -->
    <table border="1">
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

          <!-- <th>
            <div class="inputWithIcon">
              <input
                type="text"
                v-model="days_amount"
                placeholder="введите число "
              />
              <i
                class="fa"
                aria-hidden="true"
                @click="CreateTableDaysAmount()"
                v-if="days_amount.length > 0"
              ></i>
            </div>
          </th> -->

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
        </tr>
        <tr>
          <th>#</th>
          <th>№ вагона</th>
          <th>Дата начала аренды</th>
          <th>Дата окончания аренды</th>
          <!-- <th>Кол-во дней</th> -->
          <th>Ставка</th>
        </tr>
      </thead>
      <tbody>
        <td style="width: 30px !important">
          <tr
            v-for="(wag, index) in sort_data"
            :key="wag.id"
            style="width: 30px !important"
          >
            <td>
              <div class="inputWithIcon">
                <input
                  type="text"
                  :id="`indexRow`"
                  name="сheck_in"
                  :value="index + 1"
                  readonly
                  style="width: 100% !important; text-align: center"
                  @click="test(index)"
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

        <!-- <td>
          <tr v-for="(amount, index) in days_amount_arr" :key="amount.id">
            <td>
              <div class="inputWithIcon">
                <input
                  type="text"
                  name="сheck_in"
                  :id="`amount` + index"
                  :value="amount"
                  style="text-align: center"
                />
                <i
                  class="fa"
                  aria-hidden="true"
                  @click="deleteAmount(amount, index)"
                  v-if="wagonSaveData"
                ></i>
              </div>
            </td>
          </tr>
        </td> -->

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
      </tbody>
    </table>

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
export default {
  name: "rental-rate",
  components: { Notifications, Loader },
  data() {
    return {
      loader: false,

      wagon: "",
      stavka: "",
      start_date: "",
      end_date: "",
      // days_amount: "",
      landlord: "",
      tenant: "",

      wagon_arr: [],
      stavka_arr: [],
      start_date_arr: [],
      end_date_arr: [],
      // days_amount_arr: [],
      all_length: [],

      wagon_len: "0",
      stavka_len: "0",
      start_date_len: "0",
      end_date_len: "0",
      days_amount_len: "0",

      ten_ans: [],
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
    };
  },
  // 52458502 52568300 52577715

  computed: {

    sort_data() {
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
      );
      return Math.max.apply(null, sort_Array);
    },
    filter_tenant() {
      if (this.tenant.length > 1) {
        this.ten_visible = true;
      }
      return this.tenant.length > 1
        ? this.$store.state.counterparties.counterparties.filter((i) =>
            i.work_name.includes(this.tenant)
          )
        : "";
    },
    filter_landlord() {
      if (this.landlord.length > 1) {
        this.land_visible = true;
      }
      return this.landlord.length > 1
        ? this.$store.state.counterparties.counterparties.filter((i) =>
            i.work_name.includes(this.landlord)
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
    wagon(){
        let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
      );
      let a = Math.max.apply(null, sort_Array)
      console.log(this.wagon_arr)
      if( this.wagon_arr.length < a){
      let c = a - this.wagon_arr.length
      console.log(c)
        for(let i = 1; i <= c; i++ ){
            this.wagon_arr.push("null")
        }
      }
  
    },
    stavka(){
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
      );
      let a = Math.max.apply(null, sort_Array)
 
      if( this.stavka_arr.length < a){
      let c = a - this.stavka_arr.length
      console.log(c)
        for(let i = 1; i <= c; i++ ){
            this.stavka_arr.push("null")
        }
      } 
    },
    start_date(){
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
      );
      let a = Math.max.apply(null, sort_Array)
 
      if( this.start_date_arr.length < a){
      let c = a - this.start_date_arr.length
      console.log(c)
        for(let i = 1; i <= c; i++ ){
            this.start_date_arr.push("null")
        }
      } 
    },
    end_date(){
      let sort_Array = [];
      sort_Array.push(
        this.wagon_arr.length,
        this.stavka_arr.length,
        this.start_date_arr.length,
        this.end_date_arr.length,
      );
      let a = Math.max.apply(null, sort_Array)
 
      if( this.end_date_arr.length < a){
      let c = a - this.end_date_arr.length
      console.log(c)
        for(let i = 1; i <= c; i++ ){
            this.end_date_arr.push("null")
        }
      } 
    },
    stavka_len(){
       console.log(this.stavka_arr)
    }
   

  },
  methods: {
    Transform(value){
      return value.replace('null', '-')
    },
    test(index) {
      this.wagon_arr.splice(index, 1);
      this.start_date_arr.splice(index, 1);
      this.end_date_arr.splice(index, 1);
      // this.days_amount_arr.splice(index, 1);
      this.stavka_arr.splice(index, 1);
      this.wagon_len = this.wagon_arr.length;
      this.stavka_len = this.stavka_arr.length;
      this.start_date_len = this.start_date_arr.length;
      this.end_date_len = this.end_date_arr.length;
      // this.days_amount_len = this.days_amount_arr.length;
    },
    CreateTable() {
      let handler = this.wagon.replaceAll(' ', '<tt>')
      let wagon_array =  handler.replace(/^<t|t>$/g, '').split(/<t|t>(?:<t)?/)
    
      wagon_array.forEach((e, i) => {
        wagon_array[i] = (e === '' && wagon_array[i - 1] === '') ? 'null' : e;
      });
      this.wagon_arr = [...wagon_array];
      this.wagon_arr = this.wagon_arr.filter((item) => item !== "");
      this.wagon_len = this.wagon_arr.length;
      this.wagon = "";
      // this.wagonSaveData = true
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
    CreateTableStartDate() {
      let handler = this.start_date.replaceAll(' ', '<tt>')
      let start_date_array =  handler.replace(/^<t|t>$/g, '').split(/<t|t>(?:<t)?/)
    
      start_date_array.forEach((e, i) => {
        start_date_array[i] = (e === '' && start_date_array[i - 1] === '') ? 'null' : e;
      });
      this.start_date_arr = [...start_date_array];
      this.start_date_arr = this.start_date_arr.filter((item) => item !== "");
      this.start_date_len = this.start_date_arr.length;
      this.start_date = "";
    },
    deleteStart(data_value, index) {
      let data = document.getElementById(`start${index}`).value;
      console.log(data);
      this.start_date_arr.splice(index, 1, data);
      // console.log(this.wagon_arr)
      let wagon_DOM = document.getElementById(`start${index}`);
      wagon_DOM.classList.add("success");
      setTimeout(() => {
        wagon_DOM.classList.remove("success");
      }, 1000);
    },
    CreateTableEndDate() {
      let handler = this.end_date.replaceAll(' ', '<tt>')
      let end_date_array =  handler.replace(/^<t|t>$/g, '').split(/<t|t>(?:<t)?/)
    
      end_date_array.forEach((e, i) => {
        end_date_array[i] = (e === '' && end_date_array[i - 1] === '') ? 'null' : e;
      });
      this.end_date_arr = [...end_date_array];
      this.end_date_arr = this.end_date_arr.filter((item) => item !== "");
      this.end_date_len = this.end_date_arr.length;
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

    // CreateTableDaysAmount() {
    //   let date_amount = this.days_amount.split(" ");
    //   this.days_amount_arr = [...date_amount];
    //   this.days_amount_arr = this.days_amount_arr.filter((item) => item !== "");
    //   this.days_amount_len = this.days_amount_arr.length;
    //   this.days_amount = "";
    // },
    // deleteAmount(data_value, index) {
    //   let data = document.getElementById(`amount${index}`).value;
    //   this.days_amount_arr.splice(index, 1, data);
    //   let wagon_DOM = document.getElementById(`amount${index}`);
    //   wagon_DOM.classList.add("success");
    //   setTimeout(() => {
    //     wagon_DOM.classList.remove("success");
    //   }, 1000);
    // },

    CreateTableStavka() {
      let handler = this.stavka.replaceAll(' ', '<tt>')
      let stavka =  handler.replace(/^<t|t>$/g, '').split(/<t|t>(?:<t)?/)
    
      stavka.forEach((e, i) => {
        stavka[i] = (e === '' && stavka[i - 1] === '') ? 'null' : e;
      });

      this.stavka_arr = [...stavka];
      this.stavka_arr = this.stavka_arr.filter((item) => item !== "");
      this.stavka = "";
    },
    deleteStavka(data_value, index) {
      let data = document.getElementById(`stavka${index}`).value;
      this.stavka_arr.splice(index, 1, data);
      let wagon_DOM = document.getElementById(`stavka${index}`);
      console.log(wagon_DOM);
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
      // this.loader = true;
      let wagon = [];
      this.wagon_arr.forEach((item) => {
        wagon.push({
          wagon: item,
        });
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

      this.all_length.push(
        this.wagon_arr.length,
        this.stavka.length,
        this.start_date.length,
        this.end_date.length,
        // this.days_amount_len
      );
      if (this.helper(this.all_length) == true) {
        let all_array = wagon.map((item, index) => ({
          landlord: this.landlord,
          tenant: this.tenant,
          ...item,
          ...stavka[index],
          ...start_date[index],
          ...end_date[index],
          days_amount: null,

        }));
      
        console.log(all_array)
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
              (this.wagon_arr = []),
                (this.stavka_arr = []),
                (this.start_date_arr = []),
                (this.end_date_arr = []),
                // (this.days_amount_arr = []);
              this.wagon_len = "0";
              this.stavka_len = "0";
              this.start_date_len = "0";
              this.end_date_len = "0";
             
            })
            .catch((error) => {
              this.loader = false;
              this.notifyHead = "Ошибка";
              this.notifyMessage = error.response.data[0];
              this.notifyClass = "wrapper-error";
              this.showNotify = true;
              setTimeout(() => {
                this.showNotify = false;
              }, 3500);
            });
        }
      } else {
        this.loader = false;
        this.notifyHead = "Ошибка";
        this.notifyMessage =
          "Данные по вагонам, датам, дням и ставкам должны быть одной длины";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 3500);
      }
      this.all_length = [];
       
        }
      } 
    }
  

</script>

<style scoped>
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
tr,th,th{
  border: 1px solid black
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
  grid-template-columns: 0.7fr 1fr 1fr 1fr 1fr;
}

.rent_information_placeholder {
  margin-top: 7%;
  display: grid;
  gap: 2%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>
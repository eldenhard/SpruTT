<template>
  <div>
    <Loader :loader="loader"></Loader>
    <TerritoryModal id="territoryModal" />

    <div class="air_block">
      <div class="air_block_content">


        <div class="air_block_header">
          <h5>Ручной ввод исправлений в отчет</h5>
          <hr />
        </div>
        <p class="explanation">* Для ввода строк отчета которые были помечены ошибкой, выберите тип отчета и  <br>
          * Номер вагон должен содержать 8 цифр <br>
          * При копировании столбца вагонов из MS Excel оставить как есть </p>
        <div class="air_block_content__textarea">
          <b-button
            variant="success"
            class="btn_create"
            style="margin-left: auto"
            @click="$bvModal.show('territoryModal')"
            >Отправка в ручную</b-button
          >
        </div>



        <div class="air_block_header" >
          <h5>Тарифы по сопредельным территориям</h5>
          <hr />
        </div>
        <p class="explanation">* Для добавления файла перетащите его в поле или нажмите на него, и выберите необходимый файл <br>
          * Загрузка файлов осуществляется строго <b>по одному файлу</b> <br>
          * Загружаемый файл должен быть в формате <b>xlsx</b>
       </p>
        <div class="air_block_content__textarea">
          <div>
            <label :for="fileField" class="attachment">
              <div class="btn-file__actions">
                <div class="btn-file__actions__item text-center">
                  <div class="btn-file__actions__item--shadow">
                    <b-icon-cloud-plus />
                    <div class="visible-xs-block"></div>
                    {{ changeText }}
                  </div>
                </div>
              </div>
              <input
                type="file"
                ref="file"
                @change="readFile()"
                :id="fileField"
              />
            </label>
          </div>

          <div class="right_btn_group">
            <b-button
              variant="success"
              @click="SendFile()"
              class="btn_create"
              style="width: 100%"
              >Отправить файл</b-button
            >

            <select
              class="textareas"
              v-model="btlc"
              :class="{ errorSelect: isError }"
            >
              <option value="" disabled>Выберите вид файла</option>
              <option value="arktur">Арктур</option>
              <option value="bmp">БМП</option>
              <option value="btlc">БТЛЦ</option>
              <option value="glp">GLP</option>
              <option value="doom">ДУМ</option>
            </select>
          </div>
        </div>




        <div class="air_block_header" style="margin-top: 5%;">
          <h5>Экспорт отправок по вагонам</h5>
          <hr />
        </div>
        <div>
          <p class="explanation">* Введите номера вагонов через пробел и укажите даты <br>
          * Номер вагон должен содержать 8 цифр <br>
          * При копировании столбца вагонов из MS Excel оставить как есть </p>
          <div style="display:flex; justify-content: space-between;">
            <label for="">Начало периода<br>
              <input type="date" class="textarea" style="background: white;" v-model="start_date">
            </label>
            <label for="">Конец периода<br>
              <input type="date" class="textarea" style="background: white;" v-model="end_date">
            </label>
          </div>
  
          <p class="explanation">Вагонов загружено: {{ amount_wagon }}</p>
          <div class="air_block_content__textarea">
            <textarea
              rows="4"
              class=""
              v-model="SearchRepairWagon"
              placeholder="Номера вагонов через 1 пробел"
            ></textarea>
            <b-button
              variant="success"
              class="btn_create"
              @click="getCurrentWagon()"
              >Создать отчет</b-button
            >
          </div>


        </div>

        <div class="air_block_header">
          <h5>
            Узнать количество отправок
          </h5>
          <hr />
        </div>
        <p class="explanation"> </p>
        <div class="air_block_content__textarea">
          <div>
            <select
              class="textareas"
              v-model="shipment_source"
              :class="{ errorSelect: isError }"
            >
              <option value="" disabled>Выберите вид файла</option>
              <option value="arktur">Арктур</option>
              <option value="bmp">БМП</option>
              <option value="btlc">БТЛЦ</option>
              <option value="glp">GLP</option>
              <option value="doom">ДУМ</option>
            </select>
              <br>
              <br>
            <label for="">Дата акта<br>
              <input type="date" class="textarea" style="background: white;" v-model="act_date">
            </label>
          </div>

          <div style="width: 100%; margin-top: 1%;" class="btn_create">
            <b-button variant="success"
                        @click="getAmountShipment()"
                        class="btn_create"
                        style="width: 36%; float: right;"
                        >Получить количество</b-button>
                        <br><br><br>
            <h4 style="float: right; color: grey;">Итого:  {{ total_shipments + ' шт'}}</h4>

          </div>
         
           
         
        </div>
<br>
      </div>
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
import api from "@/api/wagonPark";
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import TerritoryModal from "./TerritoryModal.vue";
export default {
  name: "TerritoryTariff",
  data() {
    return {
      file: null,
      isError: false,
      btlc: "",
      loader: false,
      SearchRepairWagon: [],
      poup: "",
      amount_wagon: 0,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      shipment_source: '',
      act_date: "",
      total_shipments: '0',
      start_date: '',
      end_date: '',
    };
  },
  components: { Loader, Notifications, TerritoryModal },
  computed: {
    fileField() {
      return "fileField" + new Date() + new Date().getMilliseconds();
    },

    changeText() {
      if (this.file == null) {
        return "Выберите файл";
      } else {
        return "Выбранный файл:" + " " + this.file.name;
      }
    },
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      cargo_code: (state) => state.auth.cargo_code,
    }),
  },
  watch: {
    btlc() {
      return this.btlc == "" ? (this.isError = true) : (this.isError = false);
    },
    SearchRepairWagon() {
      let regExps = /\s/g;
      let trim_data = this.SearchRepairWagon.trim();
      let data = trim_data.replace(regExps, ",");
      let array_amountWagon = data.split(",");
      this.amount_wagon = array_amountWagon.length;
      return array_amountWagon[0] == "" ? (this.amount_wagon = 0) : "";
    },
  },
  methods: {
    getAmountShipment(){
      this.loader = true;
      api.getAmountShipments(this.shipment_source, this.act_date)
      .then(response => {
        this.loader = false
        this.total_shipments = response.data.total_objects
      }).catch(error => {
        console.log(error)
        this.loader = false
      })
    },
    showModalTerritory() {
      // this.$refs(['territoryModal']).show()
      this.$bvModal.show("territoryModal");
    },
    readFile() {
      this.file = this.$refs.file.files[0];
    },
    getCurrentWagon() {
      let regExps = /\s/g;
      //   this.loader = true;
      if (this.start_date == '' || this.end_date == '') {
        this.showNotify = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Не выбран диапозон дат";
        this.notifyClass = "wrapper-error";
        this.loader = false;
        setTimeout(() => (this.showNotify = false), 2000);
      } else {
        this.allData = false;
        this.searchData = true;
        let data
        if(this.SearchRepairWagon == ''){
           data = []
        } else {
          let trim_data = this.SearchRepairWagon.trim();
           data = trim_data.replace(regExps, ",");
        }
    
        this.loader = true;
        api
          .createReportTerritory(data,this.start_date, this.end_date)
          .then((response) => {
            this.showNotify = true;
            this.notifyHead = "Успешно";
            this.notifyMessage = "Данные переданы на обработку";
            this.notifyClass = "wrapper-success";
            this.loader = false;
            setTimeout(() => (this.showNotify = false), 2000);
            this.loader = false;
          })
          .catch((error) => {
            this.showNotify = true;
            this.notifyHead = "Ошибка";
            this.notifyMessage = error.response.data;
            this.notifyClass = "wrapper-error";
            this.loader = false;
            setTimeout(() => (this.showNotify = false), 2000);
          });
      }
    },
    SendFile() {
      const pretoken = JSON.parse(localStorage.getItem("vuex"));
      const token = pretoken.auth.user.token;
      this.loader = true;
      let formData = new FormData();
      formData.append("file", this.file);
      if (this.btlc == "") {
        this.isError = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Выберите вид файла";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 1500);
        this.loader = false;
      } else {
        event.preventDefault()
        api
          .postViewFile(this.btlc, formData)
          .then((response) => {
            event.preventDefault()
            this.loader = false;
            this.notifyHead = "Успешно";
            this.notifyMessage = "Задача передана в обработку";
            this.notifyClass = "wrapper-success";
            this.showNotify = true;
            setTimeout(() => (this.showNotify = false), 1500);
            this.loader = false;
            // let a = response.data;
            // window.location.href = a;
          })
          .catch((error) => {
            this.notifyHead = "Ошибка";
            this.notifyMessage =
              "Ошибка, файл не создан, выберите корректный тип файла";
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            setTimeout(() => (this.showNotify = false), 1500);
            this.file = null;
            this.loader = false;
          });
      }
    },
  },
};
</script>

<style scoped>
.third{
  border: 1px solid black;
}
.air_block {
  width: 70%;
  height: auto;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.air_block_header> h5 {
  padding: 1% 0 0 0%;
  color: rgb(202, 202, 202);
}
.air_block_content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 4% 4% 0;
  gap: 20px;
  /* align-items: baseline; */
}
.air_block_content__textarea {
  display: flex;
  justify-content: space-between;
}
.air_block_content__textarea > textarea {
  width: 60%;
  margin-bottom: 2%;
  text-align: center;
}
.btn_create {
  width: 24%;
  height: 80%;
  font-size: 12px;
}
.right_btn_group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.explanation {
  font-size: 14px;
  color: #9b9b9b;
}
/* .explanation:nth-child(1) {
  margin-top: 2%;
} */

.explanation {
  font-size: 13px;
  color: grey;
  text-align: left;
  /* padding: 0 0 2% 4%; */
}

.errorSelect {
  border: 1px solid red;
}

.textareas {
  width: 100%;
  height: 30%;
  margin-top: 4%;
  background: url(@/assets/Caret_down_font_awesome_whitevariation.svg.png)
      no-repeat right 0.8em center/1.4em,
    linear-gradient(
      to left,
      rgba(255, 255, 255, 0.3) 3em,
      rgba(255, 255, 255, 0.2) 3em
    );
}

.btn-file__actions {
  position: absolute;
  width: 55%;
}

.btn-file__actions__item {
  padding: 15px;
  font-size: 1.5em;
  color: #abb1b6;
  background: rgb(240, 240, 240, 0.5);
  cursor: pointer;
  text-decoration: none;
  border-top: 2px dashed #535353;
  border-left: 2px dashed #535353;
  border-bottom: 2px dashed #535353;
}

.btn-file__actions__item:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.btn-file__actions__item:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-right: 2px dashed #535353;
}

.btn-file__actions__item:hover,
.btn-file__actions__item:focus {
  color: #636b6f;
  background-color: rgba(211, 224, 233, 0.1);
}

.btn-file__actions__item--shadow {
  display: inline-block;
  position: relative;
  z-index: 1;
}

.btn-file__actions__item--shadow::before {
  content: " ";
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0;
  /* width: 100vw; */
  z-index: -1;
}

.attachment {
  margin-top: 2%;
}

.form-group label.attachment {
  width: 100%;
}

.form-group label.attachment .btn-create > a,
.form-group label.attachment .btn-create > div {
  margin-top: 5px;
}

.form-group label.attachment input[type="file"] {
  display: none;
}
input[type="file"] {
  display: none;
}
</style>
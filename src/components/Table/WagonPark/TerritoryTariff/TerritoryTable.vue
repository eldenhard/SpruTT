<template>
  <div>
    <Loader :loader="loader"></Loader>
    <TerritoryModal id="territoryModal"/>
    <div class="grid_net">
      <!-- Левый блок -->
      <div>
        <div style="display: flex; justify-content: start; height: 50px">
          <b-button variant="primary" style="width: 85%; height: 80%; margin-top: 14px; float: left" class="search"
            @click="getCurrentWagon()">Создать отчет</b-button>
        </div>
        <br />
        <div>
          <div>
            <p class="explanation">Вагонов загружено: {{ amount_wagon }}</p>
            <textarea rows="1" class="textarea" v-model="SearchRepairWagon" placeholder="Номера вагонов через 1 пробел"
              style="width: 85%;
                text-align: center;
                height: 500px;
                font-size: 20px;
              "></textarea>
          </div>
        </div>
      </div>
      <!-- правый блок -->
      <div>
        <div class="form-group">
          <button id="btnfile" class="button Accept" style="
              height: 40px;
              width: 40vw;
              font-size: 14px;
              margin-top: 14px;
              border-radius: 5px;
            " @click="SendFile()">
            Отправить файл
          </button>
          <div class="select-addRow">
            <select class="textareas" v-model="btlc" :class="{ 'errorSelect': isError }">
              <option value="" disabled>Выберите вид файла</option>
              <option value="arktur">Арктур</option>
              <option value="bmp">БМП</option>
              <option value="btlc">БТЛЦ</option>
              <option value="glp">GLP</option>
              <option value="doom">ДУМ</option>
            </select>
            <button class="button Request" @click="$bvModal.show('territoryModal')">Отправка в ручную</button>
          </div>

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
            <input type="file" ref="file" @change="readFile()" :id="fileField" />
          </label>
        </div>
      </div>
    </div>

    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
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
      btlc: '',
      loader: false,
      SearchRepairWagon: [],
      poup: '',
      amount_wagon: 0,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
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
      return this.btlc == '' ? this.isError = true : this.isError = false
    },
    SearchRepairWagon() {
      let regExps = /\s/g;
      let trim_data = this.SearchRepairWagon.trim();
      let data = trim_data.replace(regExps, ",");
      let array_amountWagon = data.split(",");
      this.amount_wagon = array_amountWagon.length
      return array_amountWagon[0] == '' ? this.amount_wagon = 0 : ''
    }
  },
  methods: {
    showModalTerritory() {
      // this.$refs(['territoryModal']).show()
      this.$bvModal.show('territoryModal')
    },
    readFile() {
      this.file = this.$refs.file.files[0];
    },
    getCurrentWagon() {
      let regExps = /\s/g;
      //   this.loader = true;
      if (this.SearchRepairWagon.length == 0) {
        this.showNotify = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Не введен номер вагона";
        this.notifyClass = "wrapper-error";
        this.loader = false;
        setTimeout(() => (this.showNotify = false), 2000);
      } else {
        this.allData = false;
        this.searchData = true;
        let trim_data = this.SearchRepairWagon.trim();
        let data = trim_data.replace(regExps, ",");
        this.loader = true
        api.createReportTerritory(data)
          .then(response => {
            this.showNotify = true;
            this.notifyHead = "Успешно";
            this.notifyMessage = "Данные переданы на обработку";
            this.notifyClass = "wrapper-success";
            this.loader = false;
            setTimeout(() => (this.showNotify = false), 2000);
            this.loader = false
          }).catch(error => {
            this.showNotify = true;
            this.notifyHead = "Ошибка";
            this.notifyMessage = error.response.data;
            this.notifyClass = "wrapper-error";
            this.loader = false;
            setTimeout(() => (this.showNotify = false), 2000);
          })
      }
    },
    SendFile() {
      const pretoken = JSON.parse(localStorage.getItem("vuex"));
      const token = pretoken.auth.user.token;
      this.loader = true;
      let formData = new FormData();
      formData.append("file", this.file);
      if (this.btlc == '') {
        this.isError = true
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Выберите вид файла";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 1500);
        this.loader = false
      } else {
        api
          .postViewFile(this.btlc, formData)
          .then((response) => {
            this.loader = false;
            this.notifyHead = "Успешно";
            this.notifyMessage = "Задача передана в обработку";
            this.notifyClass = "wrapper-success";
            this.showNotify = true;
            setTimeout(() => (this.showNotify = false), 1500);
            this.loader = false;
            let a = response.data;
            window.location.href = a;
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
          })
      }
    }
  }
};
</script>

<style scoped>
.Request {
  width: 40%;
  margin-top: 4%;
}

.select-addRow {
  display: flex;
  justify-content: space-between;
  vertical-align: baseline;
  margin-top: 5%;
}

.explanation {
  font-size: 13px;
  color: grey;
  text-align: left;
  padding: 0 0 2% 4%;
}

.errorSelect {
  border: 1px solid red;
}

.textareas {
  width: 50%;
  height: 30%;
  margin-top: 4%;
  background: url(@/assets/Caret_down_font_awesome_whitevariation.svg.png) no-repeat right 0.8em center/1.4em,
    linear-gradient(to left, rgba(255, 255, 255, 0.3) 3em, rgba(255, 255, 255, 0.2) 3em);

}

.explanation {
  font-size: 14px;
  color: #9b9b9b;
}

.grid_net {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.btn-file__actions {
  margin: 0;
  padding: 0;
}

.btn-file__actions__item {
  padding: 35px;
  font-size: 1.5em;
  color: #abb1b6;
  cursor: pointer;
  text-decoration: none;
  border-top: 3px dashed #535353;
  border-left: 3px dashed #535353;
  border-bottom: 3px dashed #535353;
}

.btn-file__actions__item:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.btn-file__actions__item:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-right: 3px dashed #535353;
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
  width: 100vw;
  z-index: -1;
}

.attachment {
  margin-top: 2%;
}

.form-group label.attachment {
  width: 100%;
}

.form-group label.attachment .btn-create>a,
.form-group label.attachment .btn-create>div {
  margin-top: 5px;
}

.form-group label.attachment input[type="file"] {
  display: none;
}
</style>
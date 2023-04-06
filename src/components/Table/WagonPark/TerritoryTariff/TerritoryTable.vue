<template>
  <div>
    <Loader :loader="loader"></Loader>
    <div class="grid_net">
      <div>
        <div style="display: flex; justify-content: start; height: 50px">
          <b-button
            variant="primary"
            style="width: 85%; height: 80%; margin-top: 14px; float: left"
            class="search"
            @click="getCurrentWagon()"
            >Найти</b-button
          >
        </div>
        <br />
        <div>
          <div>
            <p class="explanation">Вагонов загружено: {{ amount_wagon }}</p>
            <textarea
              rows="1"
              class="textarea"
              v-model="SearchRepairWagon"
              placeholder="Номера вагонов через 1 пробел"
              style="width: 85%;
                text-align: center;
                height: 500px;
                font-size: 20px;
              "
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <div class="form-group">
          <button
            id="btnfile"
            class="button Accept"
            style="
              height: 40px;
              width: 40vw;
              margin-top: 14px;
              border-radius: 5px;
            "
            @click="SendFile()"
          >
            Отправить файл
          </button>
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

export default {
  name: "TerritoryTariff",
  data() {
    return {
      file: null,
      loader: false,
      SearchRepairWagon: [],
      amount_wagon: 0,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  components: { Loader, Notifications },
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
    SearchRepairWagon(){
        let regExps = /\s/g;
        let trim_data = this.SearchRepairWagon.trim();
        let data = trim_data.replace(regExps, ",");
        let array_amountWagon = data.split(",");
        this.amount_wagon = array_amountWagon.length
        return array_amountWagon[0] == '' ? this.amount_wagon = 0 : ''
    }
},
  methods: {
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
        // api.getRepairWagon(data)
        // .then(response => {
        //     console.log(response.data)
        //     this.loader = false
        // })
      }
    },
    SendFile() {
      const pretoken = JSON.parse(localStorage.getItem("vuex"));
      const token = pretoken.auth.user.token;
      this.loader = true;
      let formData = new FormData();
      formData.append("file", this.file);
      api
        .postShipmentList(formData)
        .then((response) => {
          this.loader = false;
          console.log(response);
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
        });
    },
  },
};
</script>

<style scoped>
.explanation {
  font-size: 13px;
  color: #98ce6b;
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
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
}

.btn-file__actions__item:last-child {
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
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
  margin-top: 5%;
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
</style>
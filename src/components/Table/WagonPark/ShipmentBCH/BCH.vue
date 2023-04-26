<template>
  <div>
    <Loader :loader="loader" />
 
    <div class="form-group" style="width: 40vw !important; position: relative; left: 50%; transform: translate(-50%, 0);">
      <p class="explanation" :class="{'errorFormatFile': errorFormatFile}"> * Загружаемый файл должен быть в формате <strong>xls</strong></p>
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
        <input type="file" ref="file" @change="readFile()" :id="fileField"/>

        <!-- <b-form-file v-model="file" type="file" id="fileField" class="mt-3" plain></b-form-file> -->
      </label>
    </div>
    <button id="btnfile" class='button Accept'
      style="height: 40px; width: 40vw !important; position: relative; left: 50%; transform: translate(-50%, 0); margin-top: 3%;"
      @click="SendFile()">Преобразовать файл</button>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

  </div>
</template>

<style scoped>
.explanation {
  font-size: 13px;
  color: grey;
  text-align: left;
  padding: 0 0 2% 0;
}
.errorFormatFile{
  color: rgb(209, 1, 1) !important;
  font-size: 14px;
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
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.btn-file__actions__item:last-child {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
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
  /* box-shadow: #fff 0 0 60px 40px; */
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100vw;
  z-index: -1;
}

.form-group label.attachment {
  width: 100%;
}

.form-group label.attachment .btn-create>a,
.form-group label.attachment .btn-create>div {
  margin-top: 5px;
}

.form-group label.attachment input[type='file'] {
  display: none;
}
</style>
<script>
import api from "@/api/wagonPark";
import { mapState } from "vuex";
import Loader from '@/components/loader/loader.vue'
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  data() {
    return {
      file: null,
      loader: false,
      showNotify: false,
      errorFormatFile: false,
      explanation: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  watch: {
    file(){
      let formatExcel = (this.file.name).split('.')
      return formatExcel[1] !== 'xls' ? this.errorFormatFile = true : this.errorFormatFile = false
    }
  },
  components: { Loader, Notifications },
  computed: {
    fileField(){
      return 'fileField' + new Date() + new Date().getMilliseconds() 
    },

    changeText() {
      if (this.file == null) {
        return 'Выберите файл'
      } else {
        return 'Выбранный файл:' + ' ' + this.file.name
      }
    },
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      cargo_code: (state) => state.auth.cargo_code,
    }),
  },
 
  methods: {
    readFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file.name)
    },
    SendFile() {    
      const pretoken = JSON.parse(localStorage.getItem("vuex"));
      const token = pretoken.auth.user.token;
      this.loader = true
      let formData = new FormData();
      formData.append("file", this.file);

      let formatExcel = (this.file.name).split('.')
      if(formatExcel[1] !== 'xls'){
        this.notifyHead = "Ошибка";
          this.notifyMessage = "Ошибка, загружаемый файл должен быть в формате 'xls'";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => this.showNotify = false, 1500)

          this.loader = false
      } else {
        api
        .postShipmentList(formData)
        .then(response => {
          this.loader = false
          console.log(response)
          let a = response.data
          window.location.href = a 
        }).catch(error => {
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Ошибка, файл не создан, выберите корректный тип файла";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => this.showNotify = false, 1500)
          this.file = null
          this.loader = false
        })
      }
     


    },

  },

};
</script>
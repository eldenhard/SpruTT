<template>
  <div>
    <Loader :loader="loader" />
    <div class="form-group" style="width: 40vw !important; position: relative; left: 50%; transform: translate(-50%, 0);">
      <label for="fileField" class="attachment">
        <div class="btn-file__actions">
          <div class="btn-file__actions__item text-center">
            <div class="btn-file__actions__item--shadow">
              <b-icon-cloud-plus />
              <div class="visible-xs-block"></div>
              {{ changeText }}
            </div>
          </div>
        </div>
        <b-form-file v-model="file" type="file" id="fileField" class="mt-3" plain></b-form-file>
      </label>
    </div>
    <button id="btnfile" class='button'
      style="height: 40px; width: 40vw !important; position: relative; left: 50%; transform: translate(-50%, 0);"
      @click="SendFile()">Преобразовать
      файл</button>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />

  </div>
</template>

<style scoped>
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
  border-top: 3px dashed #d3e0e9;
  border-left: 3px dashed #d3e0e9;
  border-bottom: 3px dashed #d3e0e9;
}

.btn-file__actions__item:first-child {
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
}

.btn-file__actions__item:last-child {
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
  border-right: 3px dashed #d3e0e9;
}

.btn-file__actions__item:hover,
.btn-file__actions__item:focus {
  color: #636b6f;
  background-color: rgba(211, 224, 233, 0.1);
}

.btn-file__actions__item:hover--shadow,
.btn-file__actions__item:focus--shadow {
  box-shadow: #d3e0e9 0 0 60px 15px;
}

.btn-file__actions__item--shadow {
  display: inline-block;
  position: relative;
  z-index: 1;
}

.btn-file__actions__item--shadow::before {
  content: " ";
  box-shadow: #fff 0 0 60px 40px;
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
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  components: { Loader, Notifications },
  computed: {
    changeText() {
      if (this.file == null) {
        return 'Выберите файл'
      } else {
        let styleList = document.querySelector('.btn-file__actions__item')
        styleList.style.borderColor = 'black'
        styleList.style.color = 'black'
        return 'Выбранный файл:' + ' ' + this.file.name
      }
    },
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      cargo_code: (state) => state.auth.cargo_code,
    }),
  },
  watch: {
    file() {
      if (this.file == null) {
        document.getElementById('btnfile').className = 'inActive'
      } else {
        document.getElementById('btnfile').className = 'Accept'

      }
    }
  },

  methods: {
    SendFile() {    
      const pretoken = JSON.parse(localStorage.getItem("vuex"));
      const token = pretoken.auth.user.token;
      this.loader = true
      let formData = new FormData();
      formData.append("file", this.file);

      api
        .postShipmentList(formData)
        .then(response => {
          this.loader = false
          console.log(response)
          let a = response.data
          window.location.href = a + `?=${token}`
        }).catch(error => {
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Ошибка, файл не создан, выберите корректный тип файла";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => this.showNotify = false, 1500)
          this.file = null
          this.loader = false

        })


    },

  },

};
</script>
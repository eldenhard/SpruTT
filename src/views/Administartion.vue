<template>
  <div>
    <Loader :loader="loader" />
      <div style="margin: 4% 0" class="air_block">
        <div class="file-details">
          <label for="select_option"
            >Категория <br />
            <select name="" id="select_option" v-model="category">
              <option value="typical">Типовая форма договоров</option>
              <option value="constituent">Учредительные документы</option>
              <option value="regulatory">Нормативные акты</option>
              <option value="decrees">Приказы</option>
              <option value="other">Прочее</option>
            </select>
          </label>
          <label for="select_option"
            >Срок <br />
            <input
              type="date"
              class="textarea"
              style="background: white"
              v-model="expiration_date"
            />
          </label>
        </div>
        <br>
        <div
          class="drop-area"
          :class="{ active: isDragging || file }"
          @dragenter.prevent="onDragEnter"
          @dragover.prevent="onDragOver"
          @dragleave="onDragLeave"
          @drop.prevent="onDrop"
        >
          <div class="icon">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
          <header>
            <b-icon-cloud-plus /> <br />
            {{ file ? `Файл: ${file.name}` : "Перетащите файл в это поле" }}
            <br />
            <sup v-if="file">{{ `Размер файла: ${formatFileSize(file.size)}`}}</sup>
          </header>
          <br />

          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="handleFileInput"
          />
        </div>

        <div class="file-details">
          <button
            @click="removeFile"
            :class="{ disabled: !file, Delete: file }"
            :disabled="!file"
          >
            Удалить файл
          </button>
          <button
            @click="uploadFile"
            :class="{ disabled: !file, Accept: file }"
            :disabled="!file"
          >
            Отправить файл
          </button>
        </div>

      
           
            
       
        <div class="table_all_template" style="position: relative; display: flex; ">
        <div style="display: flex; flex-direction: column;">
          <div class="inputcontainer" >
                <label for="">Номер договора<br></label>
              
                <input
                  class="changeRow textarea"
                  v-model="dog_search"
                  placeholder="введите наименование договора"
                  style=" width: 100%; border-bottom: 1px solid rgb(0, 0, 0); padding: 5px;"
                />
              <!-- </label> -->
              <div class="icon-container" v-if="loaderInputDep">
                <i class="loader"></i>
              </div>
            </div>
          <div class="dataDeparture" v-if="warning">
              <ul>
                <li v-for="dog in dog_num_search" :key="dog.id"
                  @click="checkThisDog(dog.name)">
                {{  dog.name }} 
                </li>
              </ul>
          </div>
        </div>   
             
          <div
            style="
              position: relative;
              width: 30%;
              margin-left: auto;
              justify-content: flex-end;
            "
          >
            <label for="select_option"
              >Категория <br />
              <select name="" id="select_option" v-model="category_get">
                <option value="typical">Типовая форма договоров</option>
                <option value="constituent">Учредительные документы</option>
                <option value="regulatory">Нормативные акты</option>
                <option value="decrees">Приказы</option>
                <option value="other">Прочее</option>
              </select>
            </label>
            <button
              class="Accept"
              style="height: 45px; margin-top: 1%; margin-left: auto"
              @click="getDocuments()"
            >
              Запросить
            </button>
          </div>
        
        </div>
    


      <div style="max-height: 45vh; overflow: auto">
            <table style="margin-top: 2%">
              <thead>
                <tr style="
                    position: sticky;
                    top: 0;
                    margin-top: -1%;
                    background: rgb(216, 216, 216);
                  "
                >
                  <th>Имя</th>
                  <th>Категория</th>
                  <th>Дата создания</th>
                  <th>Дата обновления</th>
                  <th>Актуальность</th>
                  <th>Срок</th>
                  <th>Файл</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="document in documents" :key="document.id">
                  <td>{{ document.name }}</td>
                  <td>{{ TranslateCategory(document.category) }}</td>
                  <td>
                    {{ document.created_at.split("-").reverse("").join(".") }}
                  </td>
                  <td>
                    {{ document.updated_at.split("-").reverse("").join(".") }}
                  </td>
                  <td>
                    {{ document.sign == true ? "Актуальный" : "Неактуальный" }}
                  </td>
                  <td>
                    {{
                      document.expiration_date.split("-").reverse("").join(".")
                    }}
                  </td>
                  <td>
                    <a :href="document.file" style="display: block">
                      <img
                        src="../assets//word.png"
                        alt="word_file"
                        width="25"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        <Notifications
          :show="showNotify"
          :header="notifyHead"
          :message="notifyMessage"
          :block-class="notifyClass"
        />
      </div>
    
  </div>
</template>
  

<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import { mapState } from "vuex";
import debounce from "lodash.debounce";

export default {
  components: { Notifications, Loader },
  data() {
    return {
      dog_search: "",
      loaderInputDep: false,
      warning: false,
      dog_num_search: "",
      debouncedWatch: "",


      expiration_date: "",
      station_search: "",
      category: "typical",
      category_get: "typical",
      isDragging: false,
      file: null,
      // errorFormatFile: "",
      loader: false,
      showNotify: false,
      documents: "",
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      allCategory: {
        typical: "Типовая форма договоров",
        constituent: "Учредительные документы",
        regulatory: "Нормативные акты",
        decrees: "Приказы",
        other: "Прочее",
      },
    };
  },
  mounted() {
    // this.stations = getItem("station");
    document.body.addEventListener('click', () => this.warning = false);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', () =>  this.warning = false);
  },
  created() {

this.debouncedWatch = debounce((newValue, oldValue) => {
  if(this.dog_search.length > 1){
    this.loaderInputDep = true
    api.getCurrentDocument(this.category_get, this.dog_search)
  .then((response) => {
      this.dog_num_search = response.data.data;
      this.loaderInputDep = false
      this.warning = true;
  }).catch(error => {
    this.loaderInputDep = false
    console.log(error.response)
  })
} 
}, 300)
},
  watch: {
    dog_search(...args) {

        this.debouncedWatch(...args);
      
    },
    file() {
      if (this.file) {
        document.querySelector("header").style = "color: darkgrey";
      }
      let formatExcel = this.file.name.split(".");
      // return formatExcel[1] !== 'xls' ? this.errorFormatFile = true : this.errorFormatFile = false
    },
  },
  computed: {
    ...mapState({
      uid: (state) => state.auth.uid,
    }),
  },
  beforeUnmount() {
    this.debouncedWatch.cancel();
  },

  methods: {
    checkThisDog(value){
      this.warning = false
      this.dog_search = value
      this.$nextTick(() => {
        this.warning = false
      })
    },
    onDragEnter() {
      this.isDragging = true;
    },
    onDragOver() {
      this.isDragging = true;
    },
    onDragLeave() {
      this.isDragging = false;
    },
    onDrop(event) {
      this.isDragging = false;
      this.file = event.dataTransfer.files[0];
    },
    chooseFile() {
      this.$refs.fileInput.click();
    },
    handleFileInput(event) {
      this.file = event.target.files[0];
    },
    removeFile() {
      this.file = null;
    },
    getDocuments() {
      // cosnole.log(this.category_get, this.dog_search)
      let data = {name: this.dog_search}
      this.loader = true;
      api
        .getDocuments(this.category_get, data)
        .then((response) => {
          console.log(response.data);
          this.documents = response.data.data;
          this.loader = false;
        })
        .catch((error) => {
          this.loader = false;
          console.error(error);
        });
    },
    TranslateCategory(type) {
      return this.allCategory[type];
    },
    uploadFile() {
      if (
        this.uid == 79 ||
        this.uid == 69 ||
        this.uid == 102 ||
        this.uid == 1 ||
        this.uid == 30
      ) {
        if (this.file) {
          let formData = new FormData();
          formData.append("file", this.file);
          formData.append("category", this.category);
          formData.append("expiration_date", this.expiration_date);
          formData.append("sign", true);
          formData.append("name", this.file.name.split(".")[0]);

          this.loader = true;
          api
            .postDocuments(formData)
            .then((response) => {
              this.loader = false;
              console.log(response);
              this.notifyHead = "Успешно";
              this.notifyMessage = "Файл отправлен";
              this.notifyClass = "wrapper-success";
              this.showNotify = true;
              setTimeout(() => (this.showNotify = false), 1500);
              this.file = null;
            })
            .catch((error) => {
              this.loader = false;
              this.notifyHead = "Ошибка";
              this.notifyMessage =
                "Ошибка, файл не загружен, повторите попытку позже";
              this.notifyClass = "wrapper-error";
              this.showNotify = true;
              setTimeout(() => (this.showNotify = false), 1500);
            });
        }
      } else {
        this.file = null;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Ошибка, У Вас нет прав на загрузку файлов";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
      }
      // Здесь можно добавить логику для отправки файла на сервер
    },
    formatFileSize(size) {
      if (size === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },
  },
};
</script>
  
<style  scoped>
.inputcontainer {
  position: relative;

}
.dataDeparture {
  width: 100%;
  overflow: auto;
  border: 1px solid grey;
 
  background: rgb(245, 245, 245);

}
.changeRow {
  width: 100%;
  /* border: none; */
  /* outline: none; */
  background: white;
}

.icon-container {
  position: absolute;
  right: 15px;
  top: calc(50% + 5px );
}

.loader {
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader::after,
.loader::before {
  content: "";
  background: white;
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #646464 #646464 transparent transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  animation: around 0.7s ease-in-out infinite;
}

.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}

.air_block {
  width: 60vw;
  height: max(50vh, auto);
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  padding: 2%;
  transform: translate(-50%, 0);
}

.table_all_template {
  margin-top: 10%;
}

.errorFormatFile {
  color: rgb(209, 1, 1) !important;
  font-size: 14px;
}

.drop-area {
  border: 3px dashed #616161;
  height: 150px;
  width: 40vw;
  margin-left: 20%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;
  position: relative;
}

.drop-area:hover {
  border: 3px dashed #000000;
}

.drop-area.active {
  border: 2px solid #2ecc71;
  transition: 0.5s ease-in;
  color: black;
  /* Зеленая обводка при перетаскивании */
}

.disabled {
  background: lightgrey;
}

.disabled {
  background: lightgrey;
}

sup {
  color: grey;
  font-weight: 500;
}

.drop-area.success {
  border-color: #2ecc71;
  /* Зеленая обводка при успешной загрузке */
}

.icon {
  font-size: 36px;
}

header {
  margin-top: 10px;
  font-size: 22px;
  font-weight: 600;
  color: lightgray;
}

.file-details {
  width: 40vw;
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
  margin-left: 20%;
}
.file-details button {
  width: 25%;
}
.Delete {
  border-radius: 5px;
}
</style>
<template>
    <div>
      <Loader :loader="loader" />
      <div class="air_block" style="margin-top: 15%;">
        <div class="air_block_content">
          <div class="air_block_header">
            <h5>Справочник по грузам</h5>
            <hr />
          </div>
          <p class="explanation">
            * Для проверки груза, введите его наименование или код в форму поиска

          </p>
          <div >
            <div class="inputcontainer" style="height: 100% !important">
                    <input
                      class="changeRow textarea"
                      v-model="cargo_search"
                      :type="'станция'"
                      placeholder="введите наименование груза"
                      style="width: 100%; border-bottom: 1px solid rgb(0, 0, 0); padding: 5px;"
                    />
                    <div class="icon-container" v-if="loaderInputCargo">
                      <i class="loader"></i>
                    </div>
                </div>
                    <div class="dataDeparture" v-if="warning" style="width: 100% !important">
                        <table border="1" >
                            <thead>
                                <tr>
                                    <th>Имя</th>
                                    <th>Код 6</th>
                                    <th>Код</th>
                                    <th>Опасность</th>
                                    <th>Код опасности</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr   v-for="cargo in cargo_search_data" :key="cargo.id">
                                    <td>{{ cargo.name }}</td>
                                    <td>{{ cargo.code6 }}</td>
                                    <td>{{ cargo.code }}</td>
                                    <td>{{ TransformBoolean(cargo.is_dangerous) }}</td>
                                    <td>{{ cargo.dangerous_code }}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                
            </div>
      </div>
      <Notifications
        :show="showNotify"
        :header="notifyHead"
        :message="notifyMessage"
        :block-class="notifyClass"
      />
      <br>
    </div>
    </div>
  </template>


<script>
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import debounce from "lodash.debounce";
import api from "@/api/wagonPark";
import FormatBooleanValue from "@/mixins/FormatBooleanValue.js"

export default {
  components: { Loader, Notifications },
  mixins: [ FormatBooleanValue ],
  data() {
    return {
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      loaderInputCargo: false,
      warning: false,
      cargo_search: '',
      cargo_search_data: ''
    };
  },
  watch: {
    cargo_search(...args) {
      this.debouncedWatch(...args);
      if(this.cargo_search == ''){
        this.warning = false;
      }
    },
    
  },
  created() {
    this.debouncedWatch = debounce((newValue, oldValue) => {
        if (this.cargo_search.length > 1) {
          this.loaderInputCargo = true;
          api
            .getCargoCodeSearch(this.cargo_search)
            .then((response) => {
              this.cargo_search_data = response.data.data;
              console.log(this.cargo_search_data)
              this.loaderInputCargo = false;
              this.warning = true;
            })
            .catch((error) => {
              this.loaderInputCargo = false;
              console.log(error.response);
            });
        }
      }, 300);
},

}
</script>


<style scoped>
.dataDeparture {
    margin-top: 1%;
}
tr:hover{
    background: #cfcfcf;
}
tr,th,td{
    border: 1px solid black
}
.inputcontainer {
  position: relative;
}
.changeRow {
  /* width: 100%; */
  height: 100% !important;
  border: none;
  outline: none;
  
}

.icon-container {
  position: absolute;
  right: 15px;
  top: calc(50% - 10px);
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
  width: 100%;
  height: auto;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.air_block_header > h5 {
  padding: 1% 0 0 0%;
  color: rgb(202, 202, 202);
}
.air_block_content {
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 4% 4% 0;
  gap: 20px;
  /* align-items: baseline; */
}
.air_block_content__textarea {
  display: flex;
  justify-content: space-between;
  gap: 5%;
}
.explanation {
  font-size: 14px;
  color: #9b9b9b;
}
label {
  color: grey;
}
.textarea {
  background: white;
  width: 100%;
}
.btn_create {
  width: 30%;
  height: 80%;
  font-size: 12px;
  margin-left: auto;
  margin-bottom: 4%;
}
/* input[type='date']{
      width: 100%;
  
  } */
</style>
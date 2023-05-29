<template>
    <div>
      <Loader :loader="loader" />
      <div class="air_block">
        <div class="air_block_content">
          <div class="air_block_header">
            <h5>Справочник по вагонам</h5>
            <hr />
          </div>
          <p class="explanation">
            * Для проверки вагона, введите его номер в форму поиска <br>
            * Длина номера вагона составляет 8 символов 

          </p>
          <div >
            <div class="inputcontainer" style="height: 100% !important">
                    <input
                      class="changeRow textarea"
                      v-model="wagon_search"
                      :type="'станция'"
                      placeholder="введите наименование станции"
                      style="width: 100%; border-bottom: 1px solid rgb(0, 0, 0); padding: 5px;"
                    />
                    <div class="icon-container" v-if="loaderInputWagon">
                      <i class="loader"></i>
                    </div>
                </div>
                    <div class="dataDeparture" v-if="warning">
                        <table border="1" style="width: 100% !important">
                            <thead>
                                <tr>
                                    <th>Номер</th>
                                    <th>Активность</th>
                                    <th>Последняя принадлежность</th>
                                    <th>Тип вагона</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr   v-for="wagon in wagon_search_data" :key="wagon.id">
                                    <td>{{ wagon?.number }}</td>
                                    <td>{{ TransformBoolean(wagon?.is_active) }}</td>
                                    <td>{{ wagon?.last_belong }}</td>
                                    <td>{{ wagon?.wagon_type }}</td>

                                    <!-- <td>{{ wagon.code }}</td>
                                    <td>{{ wagon.name_en }}</td>
                                    <td>{{ wagon.road.name }}</td>
                                    <td>{{ wagon.road.short_name }}</td> -->

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
      loaderInputWagon: false,
      warning: false,
      wagon_search: '',
      wagon_search_data: ''
    };
  },
  watch: {
    wagon_search(...args) {
      this.debouncedWatch(...args);
      if(this.wagon_search == ''){
        this.warning = false;
      }
    },
    
  },
  created() {
    this.debouncedWatch = debounce((newValue, oldValue) => {
        if (this.wagon_search.length == 8) {
          this.loaderInputWagon = true;
          api
            .getCurrentWagon(this.wagon_search)
            .then((response) => {
              this.wagon_search_data = response.data.data;
              console.log(this.wagon_search_data)
              this.loaderInputWagon = false;
              this.warning = true;
            })
            .catch((error) => {
              this.loaderInputWagon = false;
              this.warning = false;

              console.log(error.response);
            });
        }
      }, 300);
}
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
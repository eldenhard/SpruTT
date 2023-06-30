<template>
    <div>
      <Loader :loader="loader" />


<!-- <pre>{{ data }}</pre> -->
<table ref="table">
  <template v-for="(item) in data1" >
    <tr :key="item.id" >
      <td v-for="len in data1[0].length" :key="len.id">
        {{ item[len-1] != null && item[len] === null && item.length != 0  ? "Итого " + item[len-1] :  item[len-1]}}
      </td>
    </tr>
  </template>
</table>

      <div class="air_block" style="margin-top: 15%;">
        <div class="air_block_content">
          <div class="air_block_header">
            <h5>Справочник по станциям</h5>
            <hr />
          </div>
          <p class="explanation">
            * Для проверки станции, введите её в поле поиска

          </p>
          <div >
            <div class="inputcontainer" style="height: 100% !important">
                    <input
                      class="changeRow textarea"
                      v-model="station_search"
                      :type="'станция'"
                      placeholder="введите наименование станции"
                      style="width: 100%; border-bottom: 1px solid rgb(0, 0, 0); padding: 5px;"
                    />
                    <div class="icon-container" v-if="loaderInputDep">
                      <i class="loader"></i>
                    </div>
                </div>
                    <div class="dataDeparture" v-if="warning">
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Станция</th>
                                    <th>Код 6</th>
                                    <th>Код</th>
                                    <th>Станция (en)</th>
                                    <th>Дорога</th>
                                    <th>Дорога (кратк.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr   v-for="station in station_search_data" :key="station.id">
                                    <td>{{ station.name }}</td>
                                    <td>{{ station.code6 }}</td>
                                    <td>{{ station.code }}</td>
                                    <td>{{ station.name_en }}</td>
                                    <td>{{ station.road.name }}</td>
                                    <td>{{ station.road.short_name }}</td>

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
export default {
  components: { Loader, Notifications },

  data() {
    return {
      data1: 
[['A', 'C1', 'st1', 10, 1],
['A', 'C1', 'st2', 90, 1],
['A', 'C1', null, 105, 2],
['A', null, null, 4, 205],
['B', 'C2', 'st1', 10, 1],
['B', 'C2', 'st2', 90, 1],
['B', 'C2', null, 105, 2],
['B', null, null, 4, 205],
[null, null, null, 4, 205]],


      // scheme: scheme.data,
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      loaderInputDep: false,
      warning: false,
      station_search: '',
      station_search_data: ''
    };
  },
mounted(){
 let table = this.$refs.table
 let tr = table.rows[ table.rows.length - 1 ];
 console.log(tr)
 let f_td = tr.cells[0].innerHTML = 'ИТОГО ТАБЛИЦА'
 console.log(f_td)
  tr.style.background = 'lightgrey'
},
  watch: {
    station_search(...args) {
      this.debouncedWatch(...args);
      if(this.station_search == ''){
        this.warning = false;
      }
    },
    
  },
  created() {
    this.debouncedWatch = debounce((newValue, oldValue) => {
        if (this.station_search.length > 1) {
          this.loaderInputDep = true;
          api
            .getCurrentStation(this.station_search)
            .then((response) => {
              this.station_search_data = response.data.data;
              console.log(this.station_search_data)
              this.loaderInputDep = false;
              this.warning = true;
            })
            .catch((error) => {
              this.loaderInputDep = false;
              console.log(error.response);
            });
        }
      }, 300);
},
filters: {
  searchNull(value){
    // console.log(value)
    return value
    // if(value?.includes('null')){
    //   return ""
    // }
  }
}
}
</script>


<style scoped>
.isRed{
  background: rgb(255, 81, 81);
  color: white
}
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
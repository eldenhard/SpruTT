<template>
  <div>
    <div class="shipment-kind">
      <div class="shipment-kind__header">
        <h4 class="header-text">Начальная и конечная станция</h4>
        <hr />
        <p class="explanation">
          * Выберите тип необходимого вам поиска, и начнитие вводить
          интересующую вас станцию <br>
          * Для очистки выбранной станции удалите введеную станцию из поля ввода <br>
          * Расчета возврата невозможен для: <br>
          &nbsp; &nbsp;- вагона (вагона и контейнеров) общего парка <br>
          &nbsp; &nbsp;- отправок, которые его не предусматривают (порожние отправки, перевозка груза на своих осях)
        </p>
      </div>
      <div>
        <input type="date" class="textarea" v-model="on_date" />
      </div>
      <div class="station-departure">
        <div>
          <input type="radio" id="one" value="код" v-model="picked" />
          <label for="one">&nbsp;По коду</label>
        </div>
        <div>
          <p>Станция отправления</p>
        </div>
        <div>
          <input type="radio" id="two" value="станция" v-model="picked" />
          <label for="two">&nbsp;По станции</label>
        </div>
      </div>

<!-- отправка -->
      <div class="inputcontainer">
        <input class="textarea" v-model="departure_station_name" :type="typeDep"  :placeholder="placeholderDep"/>
        <div class="icon-container" v-if="loaderInputDep">
          <i class="loader"></i>
        </div>
      </div>

      <div class="dataDeparture" v-if="warning">
        <ul>
          <li v-for="departure in station_departure_search" :key="departure.id"
            @click="checkThisDeparture(departure.name, departure.code6)">
            {{ departure.name }}
          </li>
        </ul>
      </div>

      <br />
      <br />


      <div class="station-destination">
        <div>
          <input type="radio" id="three" value="код" v-model="picked2" />
          <label for="three">&nbsp;По коду</label>
        </div>
        <div>
          <p>Станция назначения</p>
        </div>
        <div>
          <input type="radio"
            id="four"
            value="станция"
            v-model="picked2"
            checked
          />
          <label for="four">&nbsp;По станции</label>
        </div>
      </div>


      <!-- назначение -->
      <div class="inputcontainer">
        <input class="textarea" v-model="destination_station_name" :type="typeDest" :placeholder="placeholderDest"/>
        <div class="icon-container" v-if="loaderInputDest">
          <i class="loader"></i>
        </div>
      </div>
      <div class="dataDeparture" v-if="warningDest">
        <ul>
          <li  v-for="destination in station_destination_search" :key="destination.id" @click="checkThisDestination(destination.name, destination.code6)">
            {{ destination.name }}
          </li>
        </ul>
      </div>
    

      <br />
      <br />
<!-- обратная станция -->
<div class="station-destination">
        <div>
          <input type="radio" id="g6" value="код" v-model="picked3" />
          <label for="g6">&nbsp;По коду</label>
        </div>
        <div>
          <p>Станция возврата вагона</p>
        </div>
        <div>
          <input type="radio" id="g7" value="станция" v-model="picked3" checked/>
          <label for="g7">&nbsp;По станции</label>
        </div>
      </div>

      <div class="inputcontainer">
        <input class="textarea" v-model="reverse_station_name" :type="typeReverse" :placeholder="placeholderReverse"/>
        <div class="icon-container" v-if="loaderInputRev">
          <i class="loader"></i>
        </div>
      </div>
      <div class="dataDeparture" v-if="warningReverse">
        <ul>
          <li  v-for="reverse in station_reverse_search" :key="reverse.id" @click="checkThisReverse(reverse.name, reverse.code6)">
            {{ reverse.name }}
          </li>
        </ul>
      </div>
    

      <br />

      <br />

 

      <div class="check-block">
        <div>
          <input type="checkbox" id="checkboxEmpty" v-model="is_loaded" />
          <label for="checkboxEmpty">&nbsp;Груженый</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxInternat"
            v-model="international"
          />
          <label for="checkboxInternat">&nbsp;Международный</label>
        </div>
      </div>
    </div>
    <Notifications
        :show="showNotify"
        :header="notifyHead"
        :message="notifyMessage"
        :block-class="notifyClass"
        id="notif"
      />
  </div>
</template>

<style scoped>
ul {
  width: 100%;
  padding: 0 !important;
}
li {
  border: 1px solid lightgrey;
  list-style-type: none;
  cursor: pointer;
  width: 100%;
}
li:hover {
  background: white;
  color: black;
  border: 1px solid rgb(143, 143, 143);
}
.dataDeparture {
  width: 80%;
  height: 90px;
  overflow: auto;
  border: 1px solid grey;
  position: absolute;
  left: 50%;
  border-top: none;
  background: rgb(245, 245, 245);
  transform: translate(-50%, 0);
  z-index: 10;
}
.check-block {
  display: flex;
  justify-content: space-around;
}

.shipment-kind {
  margin-top: 8% !important;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  min-height: 55vh;
  max-height: 100vh;
  width: 90%;
  border: 2px solid #1e86f5;
  border-radius: 10px;
}

.header-text {
  color: #444b54;
  padding-top: 2%;
  padding-left: 3%;
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
}

.textarea {
  background: white;
  border: 1px solid grey !important;
  width: 80%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  box-sizing: border-box;
}


.station-departure {
  margin-top: 5%;
}

.station-departure,
.station-destination {
  display: flex;
  justify-content: space-evenly;
}

.station-destination {
  margin-top: 5%;
}

.explanation {
  font-size: 13px;
  color: grey;
  padding-left: 3%;
}

.inputcontainer {
  position: relative;
}





.icon-container {
  position: absolute;
  right: 95px;
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
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

.loader::after, .loader::before {
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
.explanation {
  font-size: 13px;
  color: grey;
  text-align: left;
  padding: 0 0 2% 4%;
}

</style>
<script >
import Notifications from "@/components/notifications/Notifications.vue";
import { mapState } from "vuex";
import AutocompleteInput from "@/components/ui/AutocompleteInput.vue";
import api from "@/api/wagonPark";
import debounce from "lodash.debounce";
export default {
  name: "stations-railtarif",

  data() {
    return {
      picked: "код",
      picked2: "код",
      picked3: "код",
      is_loaded: "",
      international: "",
      stations: [],
      // значения поиска
      departure_station_name: "",
      destination_station_name: "",
      reverse_station_name: '',

      departure_station_object: "",
      destionation_station_object: "",
      on_date: "",
      pretext: "",
      // появление- сокрытие элементов выпадающего списка подходящих значений
      warning: false,
      warningDest: false,
      warningReverse: false,

      station_departure_search: [],
      station_destination_search: [],
      station_reverse_search: [],
      elementZ: '',
      elementV: '',

      // loaders
      loaderInputDep: false,
      loaderInputDest: false,
      loaderInputRev: false,

      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      lengthRoute: "",
    };
  },
  components: { AutocompleteInput, Notifications },
  watch: {
    departure_station_name(...args) {
      if(this.departure_station_name == ''){
        this.$emit("departure", {
        code6: "",
        departure: "",
      });
      } else {
        this.debouncedWatch(...args);
      }
    },
    destination_station_name(...args) {
      if(this.destination_station_name == ""){
        this.$emit("destination", {
        code6: "",
        destination: "",
      })
      } else {
        this.elementZ(...args);
      }
      
    },
    reverse_station_name(...args) {
      if(this.reverse_station_name == ""){
        this.$emit("reverse", {
        code6: "",
        reverse: "",
      }) 
    } else {
      this.elementV(...args);
    }
    },

    is_loaded() {
      this.$emit("is_loaded", this.is_loaded);
    },
    international() {
      this.$emit("international", this.international);
    },
    on_date() {
      this.$emit("on_date", this.on_date);
    },
  },
  created() {

      this.debouncedWatch = debounce((newValue, oldValue) => {
        if(this.departure_station_name.length > 1){
          this.loaderInputDep = true
          api.getCurrentStation(this.departure_station_name)
        .then((response) => {
            this.station_departure_search = response.data.data;
            this.loaderInputDep = false
            console.log(response.data.data)
            this.warning = true;
            this.warningDest = false;
        }).catch(error => {
          this.loaderInputDep = false
          console.log(error.response)
        })
      } 
    }, 300),

      this.elementZ = debounce((newValue, oldValue) => {
        if(this.destination_station_name.length > 1){
          this.loaderInputDest = true
          api.getCurrentStation(this.destination_station_name)
        .then((response) => {
            this.station_destination_search = response.data.data;
            this.loaderInputDest = false
            this.warningDest = true;
            this.warning = false;
        }).catch(error => {
          this.loaderInputDest = false
          console.log(error.response)
        })
      }
    }, 300),

    this.elementV = debounce((newValue, oldValue) => {
        if(this.reverse_station_name.length > 1){
          this.loaderInputRev = true
          api.getCurrentStation(this.reverse_station_name)
        .then((response) => {
            this.station_reverse_search = response.data.data;
            this.loaderInputRev = false
            this.warningReverse = true
            this.warningDest = false;
            this.warning = false;
        }).catch(error => {
          this.loaderInputRev = false
          console.log(error.response)
        })
      }
    }, 300)
  
  },
  beforeUnmount() {
    this.debouncedWatch.cancel();
    this.elementZ.cancel();
    this.elementV.cancel();

  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  
    typeDep() {
      if (this.picked === "код") {
        return "number";
      } else if (this.picked === "станция") {
        return "string";
      } else {
        return "";
      }
    },
    typeDest() {
      if (this.picked2 === "код") {
        return "number";
      } else if (this.picked2 === "станция") {
        return "string";
      } else {
        return "";
      }
    },
    typeReverse(){
      if (this.picked3 === "код") {
        return "number";
      } else if (this.picked3 === "станция") {
        return "string";
      } else {
        return "";
      }
    },
    placeholderDest() {
      if (this.picked2 === "код") {
        return "введите станцию назначения в формате кода (648202)";
      } else if (this.picked2 === "станция") {
        return "введите наименование станции назначения (Биклянь)";
      } else {
        return "";
      }
    },
    placeholderDep() {
      if (this.picked === "код") {
        return "введите станцию  отправления в формате кода (010407)";
      } else if (this.picked === "станция") {
        return "введите наименование станции отправления (Шуйская)";
      } else {
        return "";
      }
    },
    placeholderReverse() {
      if (this.picked3 === "код") {
        return "введите станцию назначения в формате кода (648202)";
      } else if (this.picked3 === "станция") {
        return "введите наименование станции назначения (Биклянь)";
      } else {
        return "";
      }
    },
    type_station_departure() {
      if (this.picked === "код") {
        return "code6";
      } else if (this.picked === "станция") {
        return "name";
      } else {
        return "";
      }
    },
    type_station_destination() {
      if (this.picked2 === "код") {
        return "code6";
      } else if (this.picked2 === "станция") {
        return "name";
      } else {
        return "";
      }
    },
  },
  mounted() {
    // this.stations = getItem("station");
    document.body.addEventListener('click', this.onClick);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.onClick);
  },
  

  methods: {
    onClick(ev) {
      this.warning = false;
      this.warningDest = false;    
    },
    checkThisDeparture(data_name, data_code6) {
      this.notifyHead = "Успешно";
        this.notifyMessage = "Станция выбрана и добавлена";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
      this.warningReverse= false;
      this.warning = false;
      this.warningDest = false;
      this.$emit("departure", {
        code6: data_code6,
        departure: data_name,
      });
    },
    checkThisDestination(data_name, data_code6) {
      this.notifyHead = "Успешно";
        this.notifyMessage = "Станция выбрана и добавлена";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
      this.warningReverse= false;
      this.warning = false;
      this.warningDest = false;
      this.$emit("destination", {
        code6: data_code6,
        destination: data_name,
      });
    },
    checkThisReverse(data_name, data_code6) {
      this.notifyHead = "Успешно";
        this.notifyMessage = "Станция выбрана и добавлена";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
      this.warningReverse= false;
      this.warning = false;
      this.warningDest = false;
      this.$emit("reverse", {
        code6: data_code6,
        reverse: data_name,
      });
    },
    getFullStationDeparture(station) {
      this.departure_station_object = String(station);
    },
    getFullStationDestination(station) {
      this.destionation_station_object = String(station);
    },
  },
};
</script>
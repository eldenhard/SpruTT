<template>
  <div>
    <div class="shipment-kind">
      <div class="shipment-kind__header">
        <h4 class="header-text">Начальная и конечная станция</h4>
        <hr />
        <p class="explanation">
          * Выберите тип необходимого вам поиска, и начнитие вводить
          интересующую вас станцию
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
          <input type="radio" id="two" value="станция" v-model="picked" />
          <label for="two">&nbsp;По станции</label>
        </div>
      </div>

<!-- отправка -->
      <input class="textarea" v-model="departure_station_name" :type="typeDep"  :placeholder="placeholderDep"/>
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
      <input class="textarea" v-model="destination_station_name" :type="typeDest" :placeholder="placeholderDest"/>
      <div class="dataDeparture" v-if="warningDest">
        <ul>
          <li  v-for="destination in station_destination_search" :key="destination.id" @click="checkThisDestination(destination.name, destination.code6)">
            {{ destination.name }}
          </li>
        </ul>
      </div>
    

      <br />
      <br />

      <br />

 

      <div class="check-block">
        <div>
          <input type="checkbox" id="checkboxEmpty" v-model="is_loaded" />
          <label for="checkboxEmpty">&nbsp;{{ Translate }}</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxInternat"
            v-model="international"
          />
          <label for="checkboxInternat">&nbsp;{{ International }}</label>
        </div>
      </div>
    </div>
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
  max-height: 55vh;
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
</style>
<script >
import { getItem } from "@/helpers/persistanseStorage";
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
      is_loaded: "",
      international: "",
      stations: [],
      departure_station_name: "",
      destination_station_name: "",
      departure_station_object: "",
      destionation_station_object: "",
      on_date: "",
      pretext: "",
      warning: false,
      warningDest: false,
      station_departure_search: [],
      station_destination_search: [],
      elementZ: '',
    };
  },
  components: { AutocompleteInput },
  watch: {

    departure_station_name(...args) {
      this.debouncedWatch(...args);
    },
    destination_station_name(...args) {
      this.elementZ(...args);
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
          api.getCurrentStation(this.departure_station_name)
        .then((response) => {
            this.station_departure_search = response.data.data;
            console.log(response.data.data)
            this.warning = true;
            this.warningDest = false;
        })
      } 
    }, 300),

      this.elementZ = debounce((newValue, oldValue) => {
        if(this.destination_station_name.length > 1){
          api.getCurrentStation(this.destination_station_name)
        .then((response) => {
            this.station_destination_search = response.data.data;
            this.warningDest = true;
            this.warning = false;
        })
      }
    }, 300)
  
  },
  beforeUnmount() {
    this.debouncedWatch.cancel();
    this.elementZ.cancel();
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
    Translate() {
      if (this.is_loaded == false) {
        return "Груженый";
      }
      return "Груженый";
    },
    International() {
      if (this.international == true) {
        return "Международный";
      }
      return "Международный";
    },
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

      this.warning = false;
      this.warningDest = false;
      this.$emit("departure", {
        code6: data_code6,
        departure: data_name,
      });
    },
    checkThisDestination(data) {
      this.destination_station_name = data;
      this.warning = false;
      this.warningDest = false;
      this.$emit("destination", {
        destination: String(this.destination_station_name),
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
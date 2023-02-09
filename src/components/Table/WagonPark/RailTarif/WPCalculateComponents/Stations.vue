<template>

  <div class="shipment-kind">
    <div class="shipment-kind__header">
      <h4 class="header-text">Начальная и конечная станция</h4>
      <hr />
      <p class="explanation">
        * Выберите тип необходимого вам поиска, и начнитие вводить интересующую
        вас станцию
      </p>
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
    <autocomplete-input :variants="stations" :variantKey="'id'" :label="'Станция отправления'"
      :variantTitle="type_station_departure" v-model="departure_station_name" :need-full="true"
      @selected="getFullStationDeparture" class="textarea"></autocomplete-input>
    <br />
    <br />
    <div class="station-destination">
      <div>
        <input type="radio" id="3" value="код" v-model="picked2" />
        <label for="3">&nbsp;По коду</label>
      </div>
      <div>
        <input type="radio" id="4" value="станция" v-model="picked2" />
        <label for="4">&nbsp;По станции</label>
      </div>
    </div>
    <autocomplete-input :variants="stations" :variantKey="'id'" :label="'Станция назначения'"
      :variantTitle="type_station_destination" v-model="destination_station_name" :need-full="true"
      @selected="getFullStationDestination" class="textarea"></autocomplete-input>


      <button class="Request" @click="station()">Применить</button>
  </div>
</template>

<style scoped>
.Request {
  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.shipment-kind {
  margin-top: 8% !important;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  min-height: 55vh;
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
  margin-top: 15%;
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

export default {
  name: "stations-railtarif",
  data() {
    return {
      picked: "",
      picked2: "",
      stations: [],
      departure_station_name: "",
      destination_station_name: "",
      departure_station_object: "",
      destionation_station_object: "",
    };
  },
  components: { AutocompleteInput },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
    type_station_departure() {
      if (this.picked === "код") {
        return "code";
      } else if (this.picked === "станция") {
        return "name";
      } else {
        return "";
      }
    },
    type_station_destination() {
      if (this.picked2 === "код") {
        return "code";
      } else if (this.picked2 === "станция") {
        return "name";
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.stations = getItem("station");
  },

  methods: {
    getFullStationDeparture(station) {
      this.departure_station_object = station;
    },
    getFullStationDestination(station) {
      this.destionation_station_object = station;
    },
    station(){
      this.$emit('station', {
        departure: this.departure_station_name,
        destination: this.destination_station_name
      })
    }

  },
};
</script>
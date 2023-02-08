<template>
  <div class="railtarif" style="display: flex">
    <div class="railtarif__route">
      <input type="date" class="textarea railtarif__route__date" />
      <br />
      <div class="railtarif__routeCheck">
        <div>
          <input
            type="checkbox"
            id="cargo"
            class="railtarif__route__checkbox"
            v-model="checkedCargo"
          />
          <label for="cargo">&nbsp;Груженый</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="world"
            class="railtarif__route__checkbox"
            v-model="checkedInternational"
          />
          <label for="world">&nbsp;Международный</label>
        </div>
      </div>
      <autocomplete-input
        :variants="stations"
        :variantKey="'id'"
        :label="'Станция отправления'"
        :variantTitle="'name'"
        v-model="departure_station_name"
        :need-full="true"
        @selected="getFullStationDeparture"
        style="border: 1px solid grey"
      ></autocomplete-input>
      <br />
      <autocomplete-input
        :variants="stations"
        :variantKey="'id'"
        :label="'Станция назначения'"
        :variantTitle="'name'"
        v-model="destination_station_name"
        :need-full="true"
        @selected="getFullStationDestination"
        style="border: 1px solid grey"
      ></autocomplete-input>
      <input
        type="checkbox"
        id="returnRoute"
        class="railtarif__route__checkbox"
        v-model="returnRoute"
      />
      <label for="returnRoute">&nbsp;Обратный маршрут</label>

      <button class="Request" @click="test()">Маршрут</button>
    </div>
    <div class="railtarif__price">2</div>
  </div>
</template>



<style scoped>
.railtarif {
  display: flex;
  height: 60vh;
  border: 1px solid v-bind(borderColor);
}
.railtarif__route {
  width: 30%;
  border-right: 1px solid v-bind(borderColor);
  display: block;
  position: relative;
}
.railtarif__routeCheck {
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
}
.railtarif__route__date {
  background: #fff;
  height: 25px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 2%;
}
.railtarif__price {
  width: 70%;
  display: block;
}
.Request {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>

<script>
import AutocompleteInput from "@/components/ui/AutocompleteInput.vue";
import { getItem } from "@/helpers/persistanseStorage";
import { mapState } from "vuex";
import api from "@/api/wagonPark";
export default {
  name: "railtarif",
  components: { AutocompleteInput },
  data() {
    return {
      borderColor: "#DFDFDF",
      checkedCargo: "",
      checkedInternational: "",
      returnRoute: "",
      departure_station_name: "",
      departure_station_name_obj: "",
      destination_station_name: "",
      destination_station_name_obj: "",
      stations: [],
      category: "",
    };
  },
  mounted() {
    this.stations = getItem("station");
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  methods: {
    test() {
      api.getDataShipment().then((response) => {
        let data = response.data.data;
        console.log(data)
        let array = [];
        for (let i in data) {
          array.push(data[i].category);
        }
        let result = array.reduce((acc, item) => {
            if(acc.includes(item)){
                return acc
            }
            return [...acc, item]
        }, [])
        this.category = result
        console.log(this.category)
      });
    },
    getFullStationDeparture(station) {
      this.departure_station_name_obj = station;
    },
    getFullStationDestination(station) {
      this.destination_station_name_obj = station;
    },
  },
};
</script>
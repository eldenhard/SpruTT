<template>
  <div class="railtarif" style="display: flex">
    <div class="railtarif__route">
      <input
        type="date"
        class="textarea railtarif__route__date"
        v-model="on_date"
      />
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

    <div class="railtarif__price">
      <div class="railtarif__predata">
        <div>
          <p>Тип отправки: <span class="pretext">{{ category }}</span></p>
          <p>Скорость: <span class="pretext">{{ speed }}</span></p>
        </div>
        <div>
          <p>Код ЕСТНГ: <span class="pretext">{{ code_estng }}</span></p>
          <p>Вес: <span class="pretext">{{ weight }}</span></p>
        </div>
        <div>
          <p>Код ГНГ: <span class="pretext">{{ code_gng }}</span></p>
          <p>Тип вагона: <span class="pretext">{{ wagon_type }}</span></p>
        </div>
        <div>
          <p>Принадлежность: <span class="pretext">{{ belong_in }}</span></p>
          <p>Количество: <span class="pretext">{{ amount }}</span></p>
        </div>
      </div>
      <div v-show="first" class="slider">
        <select class="textarea" placeholder="Тип отправки" type="text" v-model="category">
            <option :value="category.id" v-for="category in categoryArray" :key="category.id">{{ category.name }}</option>
        </select>    
            <br />
        <input
          class="textarea"
          placeholder="Скорость"
          type="text"
          v-model="speed"
        /><br />
        <div class="btn-group">
          <button class="button Action" @click="secondSlide()">Далее</button>
        </div>
      </div>


      <div v-show="second" class="slider">
        <input class="textarea"  v-model="code_estng" placeholder="Код ЕСТНГ" type="text" /><br />
        <input class="textarea" v-model="weight" placeholder="Вес" type="text" /><br />
        <input class="textarea" v-model="code_gng" placeholder="Код ГНГ" type="text" /><br />
        <div
          class="btn-group"
          style="justify-content: space-between !important"
        >
          <button class="button Action" @click="backSFirst()">Назад</button>
          <button class="button Action" @click="ThirdSlide()">Далее</button>
        </div>
      </div>


      <div v-show="third" class="slider">
        <select class="textarea" placeholder="Тип вагона" type="text" v-model="wagon_type" >
            <option v-for="typeWagon in wagonType" :key="typeWagon.id">{{ typeWagon }}</option>
        </select>
         <br />
        <input class="textarea" placeholder="Принадлежность" type="text" v-model="belong_in" />
        <br />
        <input class="textarea" placeholder="Количество" type="text" v-model="amount" />
        <div
          class="btn-group"
          style="justify-content: space-between !important"
        >
          <button class="button Action" @click="backSecond()">Назад</button>
          <button class="button Accept" @click="getTariff()">
            Получить тариф
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.slider {
  margin-top: -5%;
}
.btn-group {
  display: flex !important;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 0;
  margin-bottom: 3%;
}
.Action,
.Accept {
  height: 20px;
  margin-left: 5%;
  width: 250px;
}
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
.railtarif__predata {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  font-family: "Montserrat", sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  /* padding-top: 2%; */
  padding-left: 2%;
  color: rgb(197, 197, 197);
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
}
.railtarif__price {
  width: 70%;
  display: block;
  display: flex;
  flex-direction: column !important;
  justify-content: center;
  align-items: center;
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

.Request {
  position: absolute;
  bottom: 0;
  left: 0;
}
.textarea {
  background: #fff;
  border: 1px solid v-bind(borderColor) !important;
  margin-top: 5%;
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
      on_date: "",
      checkedCargo: "",
      checkedInternational: "",
      returnRoute: "",
      departure_station_name: "",
      departure_station_name_obj: "",
      destination_station_name: "",
      destination_station_name_obj: "",
      stations: [],
      category: '',
      categoryArray: [],
      speed: "",
      code_estng: "",
      weight: "",
      code_gng: "",
      wagon_type: '',
      wagonType: [],
      belong_in: "",
      amount: "",
      first: true,
      second: false,
      third: false,
    };
  },
  mounted() {
    api.getWagonType().then(response => {
      let preData = response.data.data;
      for (let i in preData) {
        this.wagonType.push(preData[i].name);
      }
      this.loader = false;
    });

      api.getDataShipment().then((response) => {
        let data = response.data.data;
        let array = [];
        for (let i in data) {
          array.push({
            'id': data[i].id,
            'name': data[i].category + ', ' + data[i].kind
        });
        }
        this.categoryArray = array
        console.log(this.categoryArray, 'catig')
      });
    


    this.stations = getItem("station");
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  methods: {
    secondSlide() {
      this.first = false;
      this.second = true;
    },
    backSFirst() {
      this.first = true;
      this.second = false;
    },
    ThirdSlide() {
      this.second = false;
      this.third = true;
    },
    backSecond() {
      this.second = true;
      this.third = false;
    },
    getTariff() {
      console.log("запрос тарифа");
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
<template>
  <div style="display: flex">
    <div style="width: 80%; ">
      <b-card no-body style="margin-left: -5% !important; height: 90vh !important">
        <b-tabs pills card vertical style="height: 90vh !important">
          <b-tab title="Станции отправления/назначения" active>
            <b-card-text>
              <Stations 
              @station="getStation"
              @on_date="getDate"
              />
            </b-card-text>
          </b-tab>
          <b-tab title="Отправка">
            <b-card-text>
              <Shipment @shipment="getShipment"/>
            </b-card-text>
          </b-tab>
          <b-tab title="Груз">
            <b-card-text>
              <Cargo />
            </b-card-text>
          </b-tab>
          <b-tab title="Вагон">
            <b-card-text>
              <Wagon @wagon="wagonType" 
              @belong="wagonBelong"
              @amount="wagonAmount"/>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div class="result">
      <p>Дата: <span>{{ date }}</span></p>
      <p>Груж/Порожний: <span>{{ translateBoolIsLoaded(select.is_loaded) }}</span></p>
      <p>Международный <span>{{ translateInternational(select.international) }}</span></p>
      <p>Ст. отправ: <span>{{ select.departure }}</span></p>
      <p>Ст. назнач: <span>{{ select.destination }}</span></p>
      <p>Отправка: <span>{{ shipment.shipment }}</span></p>
      <p>Тип вагона: <span>{{ wagon.wagon_type }}</span></p>
      <p>Количество: <span>{{ amount }}</span></p>
      <p>Принадлежность: <span>{{ getBelongById(belong.belong) }}</span></p>
    </div>
</div>
</template>

<style scoped>
* {
  padding: 0 !important;
  margin: 0 !important;
}
.result {
    border-left: 1px solid #c2c2c2;
    height: 90vh;
    width: 20%;
    text-align: center;
}
.result p{
  color: #DFDFDF;
  font-weight: 600;
  text-align: left;
  padding-left: 2% !important;
}
.result span{
  color: #949494;

}
</style>
<script>
import Stations from "./WPCalculateComponents/Stations.vue";
import Shipment from "./WPCalculateComponents/Shipment.vue";
import Wagon from "./WPCalculateComponents/Wagon.vue";
import Cargo from "./WPCalculateComponents/Cargo.vue";
export default {
  name: "WPCalculate",
  components: { Stations, Shipment, Wagon, Cargo },
  data(){
    return {
        select: "",
        shipment: "",
        wagon: "",
        belong: "",
        amount: "",
        date: "",
    }
  },
  methods: {
    getStation(data){
      this.select = data
    },
    getShipment(data){
      this.shipment = data
    },
    wagonType(data){
      this.wagon = data
    },
    translateBoolIsLoaded(data){
      return data == true ? 'Груженый' : 'Порожний'
    },
    translateInternational(data){
      return data == true ? 'Международный' : 'Внутренний'
    },
    wagonBelong(data){
      this.belong = data
    },
    wagonAmount(data){
      this.amount = data
    },
    getDate(data){
      this.date = data
    },
    getBelongById(id){
      if(id == 1){
        return 'Инвентарный парк'
      }
      if(id == 2){
        return 'Собственный'
      }
      if(id == 3){
        return 'Арендованный'
      }
      else {
        return "Привлеченный ОАО 'РЖД'"
      }
    },
}
};
</script>
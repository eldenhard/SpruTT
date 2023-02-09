<template>
  <div style="display: flex">
    <div style="width: 80%; ">
      <b-card no-body style="margin-left: -5% !important; height: 90vh !important">
        <b-tabs pills card vertical style="height: 90vh !important">
          <b-tab title="Станции отправления/назначения" active>
            <b-card-text>
              <Stations 
              @station="getStation"
              />
            </b-card-text>
          </b-tab>
          <b-tab title="Отправка">
            <b-card-text>
              <Shipment />
            </b-card-text>
          </b-tab>
          <b-tab title="Груз">
            <b-card-text>
              <Cargo />
            </b-card-text>
          </b-tab>
          <b-tab title="Вагон">
            <b-card-text>
              <Wagon />
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div class="result">
      <p>Ст. отправ: <span>{{ select.departure }}</span></p>
      <p>Ст. назнач: <span>{{ select.destination }}</span></p>
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
        select: ""
    }
  },
  methods: {
    getStation(data){
      this.select = data
    }
  }
};
</script>
<template>
  <div class="shipment-kind">
    <div class="shipment-kind__header">
      <h4 class="header-text">Вид отправки</h4>
      <hr />
    </div>
    <div class="shipment-kind__content">
      <div class="shipment-kind__content__leftBlock">
        <button class="btn_left" style="background: #F5F6F6; color: black; border: 1px solid #DADDDF;"  v-for="i in category" :key="i.id">{{ i }}</button>
      </div>
      <div class="shipment-kind__content__rightBlock"></div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import api from "@/api/wagonPark";
export default {
  data() {
    return {
        category: "",
        isActive: false,
        result: '',
        result2: '',
        result3: '',
        result4: '',
        result5: '',
        result6: '',
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  mounted(){
    api.getDataShipment().then(response => {
      let data = response.data.data
      console.log(data)
       let array = []
       for(let i in data){
        array.push((data[i].category).split(' ')[0])
       }
       this.category = array.reduce((acc, item) => {
        if(acc.includes(item)){
            return acc
        }
        return [...acc, item]
       }, [])
       this.result = data.filter(item => item.category == 'Повагонная');
       this.result2 = data.filter(item => item.category == 'Мелкая и малотоннажна');
       this.result3 = data.filter(item => item.category == 'Контейнерная');
       this.result4 = data.filter(item => item.category == 'Собственные поездные формирования');
       this.result5 = data.filter(item => item.category == 'Контрейлерная перевозка');
       this.result6 = data.filter(item => item.category == 'Другие виды');


    })
    
   
  }
};
</script>
<style scoped>
.shipment-kind {
  margin-top: 8% !important;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  height: 55vh;
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
.shipment-kind__content {
  display: flex;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #E3E5E7;
  border-radius: 5px;

}
.shipment-kind__content__leftBlock {
  width: 30%;
}
.shipment-kind__content__rightBlock {
  width: 70%;
}
.btn_left {
    padding: 10px;
}

button:focus{
    background: white !important;
    border-right: 2px solid #1e86f5 !important;
}
</style>
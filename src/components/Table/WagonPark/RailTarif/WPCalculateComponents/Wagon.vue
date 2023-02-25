<template>
  <div>
    <Loader :loader="loader" />

    <div class="shipment-kind">
    <div class="shipment-kind__header">
      <h4 class="header-text">Род подвижного состава</h4>
      <hr />
    </div>
    <div class="shipment-kind__content">
      <input type="text" id="search" class="textarea" style="width: 100% !important" v-model="search" />
      <br />
    </div>
    <div class="shipment-kind__content__input">
      <div class="option" v-for="wagon in getCurrentWagonType" :key="wagon.id" style="display:block">
        <input type="radio" :id="wagon.id" :value="wagon.id" v-model="wagonType" />
        <label  :for="wagon.id">&nbsp;{{ wagon.name }}</label>
        <hr>
      </div>
    </div>
    <div class="expand-info">
      <input type="number" placeholder="Количество" class="textareaS" v-model="amount" />
      <select name="" id="" class="textareaS" v-model="belong">
        <option value="" disabled selected>Принадлежность</option>
        <option value="1">Инвентарный парк</option>
        <option value="2">Собственный</option>
        <option value="3">Арендованный</option>
        <option value="7">Привлеченный ОАО "РЖД"</option>
      </select>
    </div>
  </div>
  </div>

</template>

<script>
import { mapState } from "vuex";
import api from "@/api/wagonPark";
import Loader from "@/components/loader/loader.vue";

export default {
  data() {
    return {
      wagon: "",
      wagon_type: [],
      wagonType: "",
      belong: "",
      search: "",
      flame: "",
      amount: "",
      loader: false,
    };
  },
  components: { Loader },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
    getCurrentWagonType() {
      return (this.wagon_type.filter(item => item.name.indexOf(this.search) !== -1))
    },
  },
  watch: {
    wagonType() {
      this.$emit('wagon', {
        wagon_id: this.getWagonTypeId(this.wagonType),
        wagon_type: this.getWagonById(this.wagonType)
      })
    },
    belong() {
      this.$emit('belong', {
        belong: this.belong
      })
    },
    amount() {
      this.$emit('amount', this.amount)
    }
  },
  mounted() {
    api.getWagonType()
    .then((response) => {
      this.wagon_type = response.data.data;
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {

    getWagonById(data) {
      let searchWagon = data
      let wagon = this.wagon_type.find(item => item.id === searchWagon).name
      return wagon
    },
    getWagonTypeId(wagon){
      return this.wagon_type.find(item => item.id === wagon).type_id
    },
   
  },
};
</script>
<style scoped>
.option {
  height: 50px;
  font-size: 17px;
  display: block;
}
.shipment-kind__content__input{
  min-height: 25vh;
  max-height: 25vh;
  overflow: auto;
  border: 1px solid #EFF0F2 !important;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
button {
  background: white;
  color: black;
  border: none;
  outline: none;
  letter-spacing: 1px;
  border-radius: 7px;
  font-weight: 500;
  font-size: 13px;
  font-family: "Montserrat", sans-serif;
  text-align: left;
  height: 25px;
}

button:hover {
  background: white;
}

.expand-info {
  display: flex;
  justify-content: space-around;
  padding: 5% 0 5% 5% !important;
  margin-bottom: 3%;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
  border: 1px solid #EFF0F2 ;
  border-top: none;
}



.textarea {
  background: white;
  border: 1px solid grey !important;
  width: 30%;
}

.textareaS {
  border: 1px solid grey;
  width: 30%;
  border-radius: 5px;
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

.shipment-kind__content {
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 5px;
  margin-bottom: 3%;
}
</style>
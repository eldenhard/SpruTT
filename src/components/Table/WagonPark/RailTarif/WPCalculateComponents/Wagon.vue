<template>
  <div class="shipment-kind">
    <div class="shipment-kind__header">
      <h4 class="header-text">Род подвижного состава</h4>
      <hr />
    </div>
    <div class="shipment-kind__content">
      <input type="text" class="textarea" style="width: 100% !important" />
      <br />
    </div>
    <div class="content">
      <div v-for="wag_type in wagon_type" :key="wag_type.id">
        <div class="all-visible">
            <button @click="OpenDop(wag_type.id)">
          <input
            type="radio"
            :id="wag_type.id"
            :value="wag_type.id"
            v-model="wagon"
            style="margin: 10px 0 0 15px !important"
          />
          <label :for="wag_type.id">&nbsp;{{ wag_type.name }}</label>
        </button>
          <hr />
          <div class="expand-info" v-show="dop_info">
            <input type="number" placeholder="Количество" class="textareaS" />
            <select name="" id="" class="textareaS">
              <option value="1">Инвентарный парк</option>
              <option value="2">Собственный</option>
              <option value="3">Арендованный</option>
              <option value="7">Привлеченный ОАО "РЖД"</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/wagonPark";
export default {
  data() {
    return {
      dop_info: false,
      wagon: "",
      wagon_type: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  watch: {
    wagon() {
      document.addEventListener("click", function (e) {
        this.dop_info = true
        console.log(this.dop_info, 'AAA')
      })
    }
  },


  mounted() {
    api.getWagonType().then((response) => {
      this.wagon_type = response.data.data;
    });
  },
  methods: {
    sort_info(a){
        return a.sort(function(a,b) {
            return a- b
        })
    },
    OpenDop(id){
        this.dop_info = true
    }
  }
};
</script>
<style scoped>
button{
    color: white;
  border: none;
  outline: none;
  letter-spacing: 1px;
  border-radius: 7px;
  font-weight: 500;
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
}
.expand-info {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid black;
  padding-bottom: 5% !important;
}

.content {
  border: 1px solid grey !important;
  min-height: 55vh;
  max-height: 55vh;
  overflow: auto;
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
  border: 1px solid #e3e5e7;
  border-radius: 5px;
  margin-bottom: 5%;
}
</style>
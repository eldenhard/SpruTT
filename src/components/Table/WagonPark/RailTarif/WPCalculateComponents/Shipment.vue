<template>
  <div>
    <Loader :loader="loader" />

    <div class="shipment-kind">
      <div class="shipment-kind__header">
        <h4 class="header-text">Вид отправки</h4>
        <hr />
      </div>
      <p class="explanation"> * Для выбора вида отправки кликните на подходящую группу, после чего выберите необходимую отправку</p>
      <div class="shipment-kind__content">
        <div class="shipment-kind__content__leftBlock">
          <button
            class="btn_left"
            style="background: #f5f6f6; color: black; border: 1px solid #dadddf"
            v-for="i in category"
            :key="i.id"
            @click="test(i)"
          >
            {{ i }}
          </button>
        </div>
        <div class="shipment-kind__content__rightBlock">
          <div class="option" v-for="kind in kind_shipment" :key="kind.id" style="display: flex; align-items: baseline;">
            <input
              type="radio"
              :id="kind.id"
              :value="kind.id"
              v-model="kinds"
            />
            <label class="radio-right" :for="kind.id"
              >&nbsp;{{ kind.kind }}</label
            >
          </div>
        </div>
      </div>

      <div class="speed">
        <div>
          <label for="">Скорость</label> <br>
          <input type="radio" id="load" value="2"  v-model="speed"><label for="load">&nbsp;Грузовая</label>
        <br>
        <input type="radio" id="big" value="1" v-model="speed"><label for="big">&nbsp;Большая</label>
        </div>
       

        <!-- <label for="speed">Скорость км/ч
          <br>
          <input
          id="speed"
          type="number"
          class="textarea"
          style="width: 100%"
          placeholder="Скорость км/ч"
          v-model="speed"
          min="0"
        />
        </label> -->
       <div>
        <label for="seleft">Вид маршрута <br />
  <select v-model="is_exit_route" id="seleft">
          <option value="" disabled selected>Вид маршрута</option>
          <option value="0">Немаршрутная</option>
          <option value="1">Прямой отправительский маршрут</option>
          <option value="2">Замкнутый кольцевой маршрут</option>
          <option value="3">ЗКМ ПОМ</option>
          <option value="4">Отправительский маршрут с распыл.</option>
          <option value="5">Кольцевая маршрутная</option>
          <option value="6">
            Отдельным поездом по спец. разработ. расписанию
          </option>
        </select>
</label>
       </div>

       
        <div></div>
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


<script>
import { mapState } from "vuex";
import api from "@/api/wagonPark";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  data() {
    return {
      category: "",
      isActive: false,
      result: "",
      result2: "",
      result3: "",
      result4: "",
      result5: "",
      result6: "",
      kinds: [],
      kind_shipment: "",
      data: [],
      is_exit_route: "",
      speed: "",
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      lengthRoute: "",
    };
  },
  components: { Loader, Notifications },

  watch: {
    speed() {
      this.$emit("speed", this.speed);
    },
    is_exit_route() {
      this.$emit("is_exit_route", this.is_exit_route);
    },
    kinds() {
      this.$emit("shipment", {
        id: this.kinds,
        shipment: this.getShipmentById(this.kinds),
      });
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
    }),
  },
  mounted() {
    this.loader = true
    api
      .getDataShipment()
      .then((response) => {
        this.loader = false
        let data = response.data.data;
        this.data = response.data.data;
        let array = [];
        for (let i in data) {
          array.push(data[i].category.split(" ")[0]);
        }
        this.category = array.reduce((acc, item) => {
          if (acc.includes(item)) {
            return acc;
          }
          return [...acc, item];
        }, []);
        this.result  = data.filter((item) => item.category == "Повагонная");
        this.result2 = data.filter((item) => item.category == "Мелкая и малотоннажна");
        this.result3 = data.filter((item) => item.category == "Контейнерная");
        this.result4 = data.filter((item) => item.category == "Собственные поездные формирования");
        this.result5 = data.filter((item) => item.category == "Контрейлерная перевозка");
        this.result6 = data.filter((item) => item.category == "Другие виды");

      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getShipmentById(data) {
      let searchShipment = data;
      let shipment = this.data.find((item) => item.id === searchShipment).kind;
      return shipment;
    },
    test(i) {
      if (i == "Повагонная") {
        this.kind_shipment = this.result;
      } if (i == "Мелкая") {
        this.kind_shipment = this.result2;
      } if (i == "Контейнерная") {
        this.kind_shipment = this.result3;
      } if (i == "Собственные") {
        this.kind_shipment = this.result4;
      } if (i == "Контрейлерная") {
        this.kind_shipment = this.result5;
      } if (i == "Другие") {
        this.kind_shipment = this.result6;
      }
    },
  },
};
</script>
<style scoped>
label {
  color: grey;
  font-size: 1rem;
}
.textarea {
  background: white;
  border: 1px solid grey !important;
  border-radius: 5px;
}
.explanation {
  font-size: 13px;
  color: grey;
  text-align: left;
  padding: 0 0 2% 4%;
}
.description {
  /* padding: 3% 0 2% 2%; */
  font-weight: 700;
  font-size: 12px;
  font-family: "Montserrat", sans-serif;
}
.option {
  margin-left: 1%;
}
.radio-right {
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
}
.shipment-kind {
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
  display: flex;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #e3e5e7;
  border-radius: 5px;
  margin-bottom: 2%;
}
.speed {
  display: flex;
  justify-content: space-around;
  padding: 1% 0 1% 15% !important;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #eff0f2;
}
.shipment-kind__content__leftBlock {
  width: 17%;
}
.shipment-kind__content__rightBlock {
  width: 83%;
  max-height: 25vh;
  min-height: 25vh;
  overflow: auto;
}
.btn_left {
  padding: 10px;
}

button:focus {
  background: white !important;
  border-right: 2px solid #1e86f5 !important;
}

</style>
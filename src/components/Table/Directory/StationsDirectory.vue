<template>
  <div>
    <Loader :loader="loader" />
    <div id="container"></div>

    <div class="air_block" style="margin-top: 15%">
      <div class="air_block_content">
        <div class="air_block_header">
          <h5>Справочник по станциям</h5>
          <hr />
        </div>
        <p class="explanation">
          * Для проверки станции, введите её в поле поиска
        </p>
        <div>
          <div class="inputcontainer" style="height: 100% !important">
            <input
              class="changeRow textarea"
              v-model="station_search"
              :type="'станция'"
              placeholder="введите наименование станции"
              style="
                width: 100%;
                border-bottom: 1px solid rgb(0, 0, 0);
                padding: 5px;
              "
            />
            <div class="icon-container" v-if="loaderInputDep">
              <i class="loader"></i>
            </div>
          </div>
          <div class="dataDeparture" v-if="warning">
            <table border="1">
              <thead>
                <tr>
                  <th>Станция</th>
                  <th>Код 6</th>
                  <th>Код</th>
                  <th>Станция (en)</th>
                  <th>Дорога</th>
                  <th>Дорога (кратк.)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="station in station_search_data" :key="station.id">
                  <td>{{ station.name }}</td>
                  <td>{{ station.code6 }}</td>
                  <td>{{ station.code }}</td>
                  <td>{{ station.name_en }}</td>
                  <td>{{ station.road.name }}</td>
                  <td>{{ station.road.short_name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Notifications
        :show="showNotify"
        :header="notifyHead"
        :message="notifyMessage"
        :block-class="notifyClass"
      />
      <br />
    </div>
  </div>
</template>


<script>
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import debounce from "lodash.debounce";
import api from "@/api/wagonPark";

export default {
  components: { Loader, Notifications },

  data() {
    return {
      data1: {
        "Текущий 2": {
          "2. ТР-2": {
            "1. Работа по ремонту вагона": {
              amount: 38,
              cost: 93425.48000000001,
            },
            amount: 160,
            cost: 645365.6700000004,
            "2. Подача-уборка вагона": { amount: 44, cost: 134792.93 },
            "4. Средний ремонт колесной пары": { amount: 8, cost: 151224.03 },
            "Контрольные и регламентные операции": {
              amount: 31,
              cost: 136531.63999999998,
            },
            "Услуга по оформлению рекламационно-претензионной документации": {
              amount: 8,
              cost: 13414.0,
            },
            "3. Текущий ремонт колесной пары": {
              amount: 20,
              cost: 103857.71000000002,
            },
            "Колодка тормозная": { amount: 8, cost: 4884.48 },
            "Клин фрикционный": { amount: 3, cost: 7235.400000000001 },
          },
          amount: 175,
          cost: 744001.0600000004,
          "ТР-2": {
            "3. Текущий ремонт колесной пары": { amount: 15, cost: 98635.39 },
            amount: 15,
            cost: 98635.39,
          },
        },
        amount: 325,
        cost: 10783369.08,
        Деповской: {
          "3. ДР": {
            "1. Работа по ремонту вагона": { amount: 42, cost: 3480112.17 },
            amount: 129,
            cost: 7872245.079999996,
            "Подготовка вагона (пропарка/промывка/дегазация)": {
              amount: 39,
              cost: 377302.86000000004,
            },
            "2. Подача-уборка вагона": { amount: 14, cost: 63340.20000000002 },
            "Замена з/ч": { amount: 5, cost: 8379.48 },
            "Капитальный ремонт колесной пары": { amount: 15, cost: 2520000.0 },
            "Стоимость АС": { amount: 3, cost: 45256.0 },
            "Стоимость КП": { amount: 7, cost: 1237752.63 },
            "Привод стояночного тормоза (новый)": { amount: 1, cost: 9457.6 },
            "Запасной резервуар": { amount: 1, cost: 6044.14 },
            "Стоимость ПА": { amount: 2, cost: 124600.0 },
          },
          amount: 139,
          cost: 9665495.079999996,
          ДР: {
            "Стоимость КП": { amount: 8, cost: 1720000.0 },
            amount: 10,
            cost: 1793250.0,
            "Стоимость ТХ": { amount: 1, cost: 7700.0 },
            "Стоимость ПА": { amount: 1, cost: 65550.0 },
          },
        },
        Капитальный: {
          "4. КР": {
            "1. Работа по ремонту вагона": { amount: 2, cost: 296000.0 },
            amount: 8,
            cost: 363694.30000000005,
            "2. Подача-уборка вагона": { amount: 2, cost: 9048.6 },
            "Подготовка вагона (пропарка/промывка/дегазация)": {
              amount: 2,
              cost: 16753.68,
            },
            "Полная окраска вагона": { amount: 2, cost: 41892.02 },
          },
          amount: 8,
          cost: 363694.30000000005,
        },
        "": {
          amount: 2,
          cost: 10000.0,
          "Осмотр вагона": {
            "": { amount: 1, cost: 5000.0 },
            amount: 1,
            cost: 5000.0,
          },
        },
        "Текущий 1": {
          "1. ТР-1": {
            "1. Работа по ремонту вагона": { amount: 1, cost: 2709.06 },
            amount: 2,
            cost: 5178.639999999999,
            "2. Подача-уборка вагона": { amount: 1, cost: 2469.58 },
          },
          amount: 2,
          cost: 5178.639999999999,
        },
      },
      TOTAL: "",
      file: null,
      // scheme: scheme.data,
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      loaderInputDep: false,
      warning: false,
      station_search: "",
      station_search_data: [],
      childer_show: false,
      children: "",
      arrow: "▼",
    };
  },
  mounted() {
    this.data1 = JSON.parse(
      JSON.stringify(this.data1).replaceAll('""', '"----"')
    );
    let new_val = JSON.parse(JSON.stringify(this.data1));
    let amount = new_val.amount;
    let cost = new_val.cost;
    delete new_val.amount;
    delete new_val.cost;
    this.data1 = new_val;

    this.TOTAL = {
      amount: amount,
      cost: cost,
    };
  },

  methods: {
    OpenChildren(eventDiv = null, val, index) {
      let children = [];
      try {
        children = eventDiv.target.childNodes;
      } catch (error) {
        children = eventDiv.childNodes;
      }
      if (children.length > 1) {
        while (children.length != 1) {
          try {
            eventDiv.target.removeChild(children[1]);
          } catch {
            eventDiv.removeChild(children[1]);
          }
        }
      } else {
        for (let i in val) {
          let div = document.createElement("div");
          if (i == "amount" || i == "cost") {
            div.innerHTML = `${i}: ${val[i].toFixed(2)}`;
            div.style =
              "margin-left: 8% !important; font-weight: 500; color: grey; display: flex";
          } else {
            div.innerHTML = `${i}`;
            div.style =
              "margin-left: 8% !important; font-weight: 500; color: darkblue";
          }
          div.addEventListener("click", () => {
            event.stopPropagation();
            // console.log(div)
            this.OpenChildren(div, val[i]);
          });
          try {
            eventDiv.target.append(div);
            let hr = document.createElement("hr");
            eventDiv.target.append(hr);
          } catch {
            eventDiv.append(div);
            let hr = document.createElement("hr");
            eventDiv.append(hr);
          }
        }
      }
    },
  },

  watch: {
    station_search(...args) {
      this.debouncedWatch(...args);
      if (this.station_search == "") {
        this.warning = false;
      }
    },
  },
  created() {
    this.debouncedWatch = debounce((newValue, oldValue) => {
      if (this.station_search.length > 1) {
        this.loaderInputDep = true;
        api
          .getCurrentStation(this.station_search)
          .then((response) => {
            let filter_data = response.data.data;
            console.log(filter_data);

          //  ChatGPT
              let new_set = new Set();

              this.station_search_data = filter_data.filter((item) => {
                let name_lower = item.name.toLowerCase();
                if (!new_set.has(name_lower)) {
                  new_set.add(name_lower);
                  return true;
                }
                return false;
              })
         
            this.loaderInputDep = false;
                this.warning = true;
          })
        
      }
    }, 500);
  },
};
</script>


<style  scoped>
div {
  cursor: pointer;
}

.isRed {
  background: rgb(255, 81, 81);
  color: white;
  color: #cdcdff;
}

.dataDeparture {
  margin-top: 1%;
}

/* tr:hover {
  background: #cfcfcf;
} */

tr,
th,
td {
  border: 1px solid black;
  cursor: pointer;
}

.inputcontainer {
  position: relative;
}

.changeRow {
  /* width: 100%; */
  height: 100% !important;
  border: none;
  outline: none;
}

.icon-container {
  position: absolute;
  right: 15px;
  top: calc(50% - 10px);
}

.loader {
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader::after,
.loader::before {
  content: "";
  background: white;
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #646464 #646464 transparent transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  animation: around 0.7s ease-in-out infinite;
}

.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}

.air_block {
  width: 100%;
  height: auto;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.air_block_header > h5 {
  padding: 1% 0 0 0%;
  color: rgb(202, 202, 202);
}

.air_block_content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 4% 4% 0;
  gap: 20px;
  /* align-items: baseline; */
}

.air_block_content__textarea {
  display: flex;
  justify-content: space-between;
  gap: 5%;
}

.explanation {
  font-size: 14px;
  color: #9b9b9b;
}

label {
  color: grey;
}

.textarea {
  background: white;
  width: 100%;
}

.btn_create {
  width: 30%;
  height: 80%;
  font-size: 12px;
  margin-left: auto;
  margin-bottom: 4%;
}

/* input[type='date']{
      width: 100%;
  
  } */
</style>
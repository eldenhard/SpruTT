<template>
  <div>
    <!-- <pre>{{normalized}}</pre> -->
    <Loader :loader="loader" />
    <Periods @Action="Actioned" @data="getCurrentData" @date_begin="checkDateBegin" @date_end="checkDateEnd">
      <label for="">
        Тип вагона
        <br />
        <select name="" id="" v-model="wag_type" style="width: 100%">
          <option value="Полувагон">Полувагон</option>
          <option value="Цистерна">Цистерна</option>
        </select>
      </label>
    </Periods>
    <br>
    <button class="Accept button" style="width: 30%; height: 40px;" @click="unloadingFilgts()">Выгрузка рейсов</button>
    <br />

    <!-- <pre>{{ normalized }}</pre> -->
    <p>Форма 4.5. "Справка о выполнении перевозок {{ wag_type == 'Цистерна' ? wag_type.toLowerCase() + 'ми' :
      wag_type.toLowerCase() + 'ами' }}"</p>
    <div class="block-table">
      <table class="table_search">


        <tbody v-if="Object.keys(responseObject).length > 0">
          <template v-for="(valueClient, client) in responseObject">
            <tr :key="valueClient.id">
            <tr>
              <td colspan="7" @click="CheckClientOpen(client, $event)" style="font-weight: 700;"
                v-if="CheckValue(client)">{{ client }}</td>
            </tr>
            <tr style="background: #F0F0F0" :data-attr='client' class="block_element" v-if="CheckValue(client)">
              <th>Дорога погрузки</th>
              <th>Дорога выгрузки</th>
              <th>Груз</th>
              <th>Вес</th>
              <th>Кол-во погрузок</th>
              <th>Выручка руб, без НДС</th>
            </tr>

            <template v-for="road in getNextKey(responseObject[client])" :data-attr='client' class="block_element">
              <template v-for="clientRoad in getNextKey(responseObject[client][road])" :data-attr='client'
                lass="block_element">
                <template v-for="cargo in getNextKey(responseObject[client][road][clientRoad])" :data-attr='client'
                  class="block_element">

                  <tr :key="road.id" class="block_element" :data-attr='client'>
                    <td>{{ road }}</td>
                    <td>{{ clientRoad }}</td>
                    <td>&nbsp;{{ cargo }}&nbsp;</td>
                    <td>&nbsp;{{ responseObject[client][road][clientRoad][cargo]['weight']?.toFixed(2) | format }}&nbsp;
                    </td>
                    <td>&nbsp;{{ responseObject[client][road][clientRoad][cargo]['aid'] }}&nbsp;</td>
                    <td>&nbsp;{{ responseObject[client][road][clientRoad][cargo]['revenue'] }}&nbsp;</td>
                  </tr>


                </template>
                <tr style="background:#FDFFDA" class="block_element" :data-attr='client'>

                  <td colspan="3">ИТОГО {{ clientRoad }}</td>
                  <td style="font-weight: 500;">{{ responseObject[client][road][clientRoad]['weight']?.toFixed(2) | format
                  }}</td>
                  <td style="font-weight: 500;">{{ responseObject[client][road][clientRoad]['aid'] }}</td>
                  <td style="font-weight: 500;">{{ responseObject[client][road][clientRoad]['revenue']?.toFixed(2) |
                    format }}
                  </td>
                </tr>
              </template>
              <tr style="background: #DDFCCF" class="block_element" :data-attr='client'>
                <td colspan="3">ИТОГО {{ road }}</td>
                <td style="font-weight: 700;">{{ responseObject[client][road]['weight']?.toFixed(2) | format }}</td>
                <td style="font-weight: 00;">{{ responseObject[client][road]['aid'] }}</td>
                <td style="font-weight: 700;">{{ responseObject[client][road]['revenue']?.toFixed(2) | format }}</td>
              </tr>
            </template>

            </tr>
          </template>
          <tr style="background: #F0F0F0;">
            <td colspan="3" style="font-weight: bold; ">Общий</td>
            <th>Вес</th>
            <th>Кол-во погрузок</th>
            <th>Выручка руб, без НДС</th>
          </tr>
          <tr class="GrandTotal">

            <td colspan="3"> итог </td>
            <td style="font-weight: 700;">{{ responseObject['weight']?.toFixed(2) | format }}</td>
            <td style="font-weight: 00;">{{ responseObject['aid'] }}</td>
            <td style="font-weight: 700;">{{ responseObject['revenue']?.toFixed(2) | format }}</td>
          </tr>

        </tbody>
      </table>
    </div>
    <Notifications
      :show="showNotify"
      :header="notifyHead"
      :message="notifyMessage"
      :block-class="notifyClass"
    />
  </div>
</template>


<script>
import api from "@/api/reportUO";
import apiWagonPark from "@/api/wagonPark";
import Notifications from "@/components/notifications/Notifications.vue";

import Periods from "./Periods.vue";
import Loader from "@/components/loader/loader.vue";
export default {
  components: { Periods, Loader, Notifications },
  data() {
    return {
      normalized: [],
      loader: false,
      date_begin: "",
      date_end: "",
      wag_type: "Полувагон",


      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",


      responseObject: {}

    };
  },

  filters: {
    format(value) {
      if (value != "") {
        let TwoSignNum = value?.toFixed(2)
        return String(TwoSignNum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
      }
      return value

    },
    ifNull(value) {
      if (value == null || value == 'null') {
        return 'Неопределенно'
      }
      return value
    }
  },
  methods: {
    checkDateEnd(val) {
      this.date_end = val
    },
    checkDateBegin(val) {
      this.date_begin = val
    },
    unloadingFilgts() {
      this.loader = true
      apiWagonPark.getFileFlights2(this.date_begin, this.date_end, this.wag_type, "")
        .then(response => {
          this.loader = false
          // let link = document.createElement('a')
          // link.href = response.data.share_storage
          // link.click()
          // link.remove()
          navigator.clipboard.writeText(response.data.share_storage)
            this.notifyHead = "Успешно";
            this.notifyMessage = "Ссылка на файл скопирована.";
            this.notifyClass = "wrapper-success";
            this.showNotify = true;
            setTimeout(() => this.showNotify = false, 2500);
        }).catch((err) => {
          console.log(err)
          this.loader = false
        })
    },
    CheckClientOpen(val, event) {
      event.target.classList.toggle('check_element')
      let trs = document.getElementsByTagName('tr')
      console.log(event.target)
      for (let tr of trs) {
        if (tr.getAttribute('data-attr') == val) {
          tr.classList.toggle('block_element')
        } else {
          continue
        }
      }
    },
    CheckValue(value) {
      let client = value;
      if (
        client != "aid" &&
        client != "weight" &&
        client != "revenue"
      ) {
        return true;
      }
    },
    getNextKey(obj) {
      const keys = Object.keys(obj);
      let correctKeys = [];
      for (let i of keys) {
        if (i === "aid" || i === "weight" || i === "revenue") {
          continue;
        } else {
          correctKeys.push(i);
        }
      }
      // console.log(correctKeys);
      return correctKeys; // предполагая, что следующий ключ - первый ключ в объекте
    },
    isObject(val) {
      if (typeof val !== "object" || val === null) {
        return false;
      }

      const keys = Object.keys(val);
      for (let i of keys) {
        if (val[i] === undefined) {
          return false;
        }
      }

      return true;
    },
    Actioned() {
      this.loader = true;
      api
        .getUO45(this.date_begin, this.date_end, this.wag_type)
        .then((response) => {
          this.loader = false;
          this.responseObject = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.loader = false;
        });
    },
    getCurrentData(data) {
      this.date_begin = data.date_begin;
      this.date_end = data.date_end;
    },
  },
  mounted() {
    // this.normalizeObject()
  },
  filters: {
    format(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    },
  },
};
</script>

<style scoped>
.check_element {
  background: rgb(142, 182, 182);
  font-weight: bold;
}

td,
th {
  white-space: nowrap;

}

.block_element {
  display: none;
}

tr:hover {
  background: lightcyan;
}</style>
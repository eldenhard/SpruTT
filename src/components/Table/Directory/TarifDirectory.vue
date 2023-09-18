<template>
  <div>
    <Loader :loader="loader" />
    <h3 class="explanation" style="font-size: 17px; margin-top: -1%">
      Перед использованием этого раздела обязательно выполнить
      <a @click="instruction = !instruction">следующие действия с браузером</a><br />
    </h3>
    <!-- <h3 @click="instruction = !instruction" style="cursor: pointer; text-align: left;">{{ instruction ? 'Свернуть инструкцию по браузеру' : 'Смотреть инструкцию  по браузеру' }}</h3> -->
    <div v-show="instruction">
      <p class="explanation">
        Пример приводится на основе браузера Google Chrome
      </p>
      <p>
        1. В адресную строку браузера ввести <b>chrome://flags/</b> и нажать
        Enter
      </p>
      <figure class="sign">
        <p>
          <img src="../../../assets/Draw2.png" style="width: 80%; height: auto" alt="Рисунок 1 - адресная строка" />
        </p>
      </figure>
      <br />
      <p>
        2. В поисковую строку открывшейся страницы ввести
        <b>#unsafely-treat-insecure-origin-as-secure</b>
      </p>
      <figure class="sign">
        <p>
          <img src="../../../assets/Draw3.png" style="width: 80%; height: auto" alt="Рисунок 2 - поиск данных" />
        </p>
      </figure>
      <br />
      <p>
        3. В поле ввода (над подчеркнутым желтым цветом поле) ввести
        <b>http://portal.tehtrans.com</b>, <br />
        перевести правый селектор в положение Enabled и нажать Relaunch
      </p>
      <figure class="sign">
        <p>
          <img src="../../../assets/Draw4.png" style="width: 80%; height: auto" alt="Рисунок 3 - сохранение данных" />
        </p>
      </figure>
      <br />
      <p>
        4. После нажатия на Relaunch Ваш браузер перезапустится, <br />
        далее когда вы будете копировать данные из Excel и вставлять их в поле
        <b>Операция</b> браузер запросит у Вас разрешение на доступ <br />
        <b>обязательно нажмите Разрешить</b>, после выполнения этих действий Вы
        можете пользоваться разделом в полной мере
      </p>
      <figure class="sign">
        <p>
          <img src="../../../assets/Draw5.png" style="width: 80%; height: auto" alt="Рисунок 3 - сохранение данных" />
        </p>
      </figure>
      <h5 @click="instruction = !instruction" style="cursor: pointer; text-align: left">
        {{ instruction ? "Свернуть инструкцию" : "Смотреть инструкцию" }}
      </h5>
    </div>
    <p class="explanation">
      * Для поиска необходимого <b>кода</b> станции зайдите в раздел
      <b>"Справочник станции"</b> <br />
      * Копирование и ввод данных в таблицу 1 должен осуществляться из
      <b>WORD</b> или <b>Excel</b>, после вставки значения в ячейку нажмите
      Enter чтобы значения были занесены в таблицу<br />
      * После ввода данных в таблицу, Вы можете отредактировать в ней любое
      поле, нажатие Enter Не требуется <br />
      * Для удаления строки таблицы нажмите на порядковый номер строки
      <br />
      &nbsp;Таблица 2. <br />
      *
      <b>Данные по ставкам должны загружаться из WORD или Excel, числа должны
        быть в строгом формате. Пример: 1 599,00 </b><br />
      * <b>Данные по станциям должны быть указаны через пробел </b><br />
      *
      <b>Данные по дистанциям должны быть скопированы и вставлены из WORD или
        Excel в формате 0 - 5 6 - 8</b><br />
      * Чтобы узнать название груза, стации отправления/назначения нажмите
      правой кнопкой мыши на интересующее поле, и подождите несколько секунд
      <br />
      * Для сохранения отредатированных данных нажмите на Enter после того как
      окончили ввод <br />
      &nbsp;(если индикация зеленая - все хорошо, в противном случае
      ознакомьтесь с ошибкой)
      <br />
      * Для сохранения отредатированных данных нажмите на Enter после того как
      окончили ввод <br />
    </p>
    <div class="air_block">
      <div class="air_block_header" style="
          display: flex !important;
          justify-content: space-between !important;
          width: 100%;
        ">
        <h5>Данные по ставкам</h5>
        <h6 v-on:click="visible = !visible" style="padding-right: 4%; cursor: pointer">
          {{ visible ? "Свернуть " : "Развернуть" }}
        </h6>
      </div>
      <hr />
      <br />

      <table v-show="visible">
        <tr>
          <td>№ документа</td>
          <td>
            <div style="display: flex; justify-content: space-between">
              <input type="radio" id="one1" value="agreement_number" v-model="picked" />
              <label for="one1">Договор</label>
              <br />
              <input type="radio" id="two2" value="annex_number" v-model="picked" />
              <label for="two2">Приложение</label>
              <br />
            </div>

            <input type="text" class="textarea" v-model.trim="Standard.agreement_number"
              :placeholder="placeholderAgreement" v-show="visible_inp_ag" />
            <input type="text" class="textarea" v-model.trim="Standard.annex_number" :placeholder="placeholderAgreement"
              v-show="visible_inp_an" />
          </td>
        </tr>
        <br />

        <!-- <tr>
                    <td class="col1">№ приложения</td>
                    <td>
                        <input type="text" id="ln" class="textarea" v-model.trim="Standard.annex_number"
                            placeholder="№ приложения" />
                    </td>
                </tr>
                <br /> -->

        <tr v-show="visible_agreement">
          <td class="col1">Все договора</td>
          <td>
            <select name="" id="" v-model="agreement_number_test" @change="test()">
              <option :value="[item.agreement_number, item.client, item.id]" v-for="item in all_agreement_number"
                :key="item.id">
                {{ item.agreement_number }} {{ item.client }} {{ item.on_date }}
              </option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Дата</td>
          <td>
            <input type="date" id="a" class="textarea" v-model="Standard.on_date" placeholder="Дата" />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Дата окончания</td>
          <td>
            <input type="date" id="a" class="textarea" v-model="Standard.end_date" placeholder="Дата" />
          </td>
        </tr>
        <br />

        <br />

        <tr>
          <td class="col1">Клиент</td>
          <td>
            <input type="text" id="a" class="textarea" v-model="Standard.client" placeholder="Клиент" />
          </td>
        </tr>
        <br />
        <tr v-show="ten_visible">
          <td></td>
          <td>
            <div class="textarea" style="height: auto; width: 100%; margin-bottom: 1%" v-show="ten_visible">
              <ul id="root_tenant">
                <li v-for="item in filter_client" :key="item.id" @click="checkClient(item.client)">
                  <span>{{ item.client }}</span>
                  <hr />
                </li>
              </ul>
            </div>
          </td>
        </tr>

      </table>
      <button class="button Action" style="height: 30px" @click="checkingData()">Проверка введеных данных</button>


      <table border="1" class="table_stavka" v-show="visible">
        <tr>
          <td style="border: 1px solid white !"></td>
          <td style="border: 1px solid black">
            <input type="text" name="" id="departure_station" @keyup.enter="saveTarif($event)"
              placeholder="скопируйте и вставьте данные" />
          </td>
          <td style="border: 1px solid black">
            <input type="text" name="" id="destination_station" @keyup.enter="saveTarif($event)"
              placeholder="скопируйте и вставьте данные" />
          </td>
          <td style="border: 1px solid black">
            <input type="text" name="" id="cargo" @keyup.enter="saveTarif($event)"
              placeholder="скопируйте и вставьте данные" />
          </td>
          <td style="border: 1px solid black">
            <input type="text" name="" id="stavka" @keyup.enter="saveTarif($event)"
              placeholder="скопируйте и вставьте данные" />
          </td>
          <td style="border: 1px solid black">
            <input type="text" name="" id="nds" @keyup.enter="saveTarif($event)"
              placeholder="скопируйте и вставьте данные" />
          </td>
          <td style="border: 1px solid black" colspan="2">
            <input type="text" id="distance" @keyup.enter="saveDistance($event)"
              placeholder="скопируйте и вставьте данные" />
          </td>
        </tr>
        <tr>
          <th>№</th>
          <th style="border: 1px solid black">Станция отпр.</th>
          <th style="border: 1px solid black">Станция назн.</th>
          <th style="border: 1px solid black">Груз (ЕСТНГ)</th>
          <th style="border: 1px solid black">Ставка без НДС</th>
          <th style="border: 1px solid black">НДС</th>
          <th style="border: 1px solid black" colspan="2">Дистанция</th>

        </tr>
        <tr v-for="(item, index) in data" :key="index">
          <td style="border: 1px solid black" @click="data.splice(index, 1)" class="delete"
            :class="{ error: item.error != null }">
            {{ item.error != null ? item?.error : index + 1 }}
          </td>
          <td style="border: 1px solid black">
            <input style="width: 100%" type="text" v-model="item.departure_station" />
          </td>
          <td style="border: 1px solid black">
            <input style="width: 100%" type="text" v-model="item.destination_station" />
          </td>
          <td style="border: 1px solid black">
            <input style="width: 100%" type="number" v-model="item.cargo" />
          </td>
          <td style="border: 1px solid black">
            <input style="width: 100%" type="number" v-model="item.stavka" />
          </td>
          <td style="border: 1px solid black">
            <input style="width: 100%" type="number" v-model="item.nds" />
          </td>

          <td style="border: 1px solid black">
            <input style="width: 100%" type="number" v-model="item.distance_min" />
          </td>

          <td style="border: 1px solid black">
            <input style="width: 100%" type="number" v-model="item.distance_max" />
          </td>
        </tr>
      </table>
      <br />

      <br />
      <div class="btn-group_tarif" v-show="visible">
        <button class="button Request" @click="data = []" v-show="visible">
          Очистить таблицу
        </button>
        <button class="button Accept" @click="postData()" v-show="visible">
          Отправить данные
        </button>
      </div>
      <br />
    </div>

    <TarifDirectoryCreated style="margin-top: 5%" />
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
  </div>
</template>

<script>
import Loader from "@/components/loader/loader.vue";
import { mapState } from "vuex";
import Notifications from "@/components/notifications/Notifications.vue";
import api from "@/api/directory";
import api_wagon from '@/api/wagonPark';
import TarifDirectoryCreated from "./TarifDirectoryCreated.vue";

class Stavki {
  constructor() {
    this.destination_station = null;
    this.departure_station = null;
    this.stavka = null;
    this.cargo = null;
    this.nds = null;
    this.distance = null;
    this.distance_min = null;
    this.distance_max = null;
    this.error = null;
  }

  // set destination_station(value) {
  //   console.log(value)

  //   let modefiedString = value.replace(/ [А-Я]{2}/g, '')
  //   console.log(modefiedString)
  //   this._destination_station = modefiedString
  // }
  // get destination_station(){
  //   return this.destination_station = this._destination_station
  // }
}
export default {
  components: { Loader, Notifications, TarifDirectoryCreated },
  data() {
    return {
      errorp: [],
      flagCheck: false,
      checkCompleteData: [],
      checkValueArray: [],
      stationCache: {},
      distance_type: 'standard',
      instruction: false,
      loader: false,
      visible_agreement: false,
      visible_inp_an: false,
      visible_inp_ag: true,
      data: [],
      rows: 1,
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      ten_visible: false,
      visible: true,
      cargo_list: false,
      departure_station_list: false,
      destination_station_list: false,
      cargo_user: "",
      picked: "agreement_number",
      placeholderAgreement: "введите номер договора",
      distance: [],
      all_agreement_number: "",
      agreement_number_test: "",
      Standard: {
        agreement_number: null,
        annex_number: null,
        on_date: null,
        end_date: null,
        client: "",
        base: null,
        responsible: null,
      },
    };
  },
  computed: {
    ...mapState({
      name_client: (state) => state.client.name_client,
      name_cargo: (state) => state.cargo_code.cargo_code,
      uid: (state) => state.auth.uid,
    }),

    filter_client() {
      if (this.Standard.client.length > 1) {
        this.ten_visible = true;
      }

      return this.Standard.client.length > 1
        ? this.name_client.filter((item) =>
          item.client
            .toLowerCase()
            .includes(this.Standard.client.toLowerCase())
        )
        : "";
    },
    filter_cargo() {
      if (this.cargo_user.length > 1) {
        this.cargo_list = true;
      }
      return this.cargo_user.length > 1
        ? this.name_cargo.filter((item) =>
          item.name.toLowerCase().includes(this.cargo_user.toLowerCase())
        )
        : "";
    },
  },
  mounted() {
    document.body.addEventListener("click", this.closeWindow);
    this.getAllAgreement();
  },
  watch: {
    picked() {
      if (this.picked == "agreement_number") {
        this.placeholderAgreement = "введите номер договора";
        this.visible_agreement = false;
        this.visible_inp_ag = true;
        this.visible_inp_an = false;
        this.Standard.annex_number = "";
        this.agreement_number_test = "";
      } else {
        this.placeholderAgreement = "введите номер приложения";
        this.visible_agreement = true;
        this.visible_inp_ag = false;
        this.visible_inp_an = true;
        this.Standard.agreement_number = "";
      }
    },
  },
  methods: {
    getAllAgreement() {
      api
        .getAllDocuments()
        .then((response) => {
          let data = response.data.data;
          console.log(data);
          let arr = [];
          for (let i in data) {
            arr.push({
              agreement_number: data[i].agreement_number,
              client: data[i].client,
              on_date: data[i].on_date,
              id: data[i].id,
            });
          }
          this.all_agreement_number = "";
          this.all_agreement_number = arr.reduce((acc, item) => {
            if (
              !acc.find(
                (value) => value.agreement_number == item.agreement_number
              )
            ) {
              acc.push(item);
            }
            return acc;
          }, []);

          this.loader = false;
        })
        .catch((error) => {
          this.loader = false;
          console.log(error);
        });
    },
    test() {
      this.Standard.agreement_number = this.agreement_number_test[0];
      this.Standard.client = this.agreement_number_test[1];
      this.Standard.base = this.agreement_number_test[2];
      // console.log(this.agreement_number_test)
    },
    saveDistance(event) {



      navigator.clipboard.readText().then((response) => {
        this.distance = response.split("\r\n");
        if (this.distance.at(-1) == "") {
          this.distance.pop();
        }
        console.log(this.distance);
        for (let i in this.distance) {
          this.distance[i].replaceAll(" ", "");
        }
        let data = [];
        this.distance.forEach((value, index) => {
          data.push(this.distance.slice(index, index + 1));
        });
        let arr = [];
        for (let i in data) {
          arr.push(data[i][0].split(" - "));
        }
        if (arr[0] == "") {
          return;
        }
        let distance_min = [];
        let distance_max = [];
        for (let i of arr) {
          distance_min.push(i[0]);
          distance_max.push(i[1]);
        }
        for (let i in distance_min) {
          if (this.data[i] == undefined) {
            let newObj = new Stavki();
            newObj[event.target.id + "_min"] = +distance_min[i];
            this.data.push(newObj);
          } else {
            this.data[i][event.target.id + "_min"] = +distance_min[i];
          }
        }
        for (let i in distance_max) {
          if (this.data[i] == undefined) {
            let newObj = new Stavki();
            newObj[event.target.id + "_max"] = +distance_max[i];
            this.data.push(newObj);
          } else {
            this.data[i][event.target.id + "_max"] = +distance_max[i];
          }
        }
        event.target.value = "";
        return;
      });
    },


    saveTarif(event) {
      console.log(event.target.value)
      if (
        event.target.id == "destination_station" ||
        event.target.id == "departure_station"
      ) {
        let operationBuffer = event.target.value.replace(/ [А-Я]{2}[^ ]*/g, '  ').split("  ")
        let clear_buffer = [];
        for (let i of operationBuffer) {
          clear_buffer.push(i.trim());
        }
        if (clear_buffer.at(-1) == "") {
          clear_buffer.pop();
        }
        if (clear_buffer[0] == "") {
          return;
        }
        this.WorkInClass(clear_buffer, event)

        event.target.value = "";
        return;
      } else if (event.target.id == 'cargo') {
        let data = event.target.value.match(/\d+/g)
        if (data) {
          let operationBuffer = data.map(Number)

          if (operationBuffer.at(-1) == "") {
            operationBuffer.pop();
          }
          if (operationBuffer[0] == "") {
            return;
          }
          this.WorkInClass(operationBuffer, event)

          event.target.value = "";
          return;
        }
      } else if (event.target.id == 'stavka' || event.target.id == 'nds') {

        let t = event.target.value
        // Разбиваем строку на массив, используя регулярное выражение для чисел с пробелами и запятой
        let all_value = t.match(/\d+(?: \d{3})*(?:,\d{2})?/g);

        // Преобразуем каждое число, заменяя пробел на пустую строку и запятую на точку
        all_value = all_value.map(num => parseFloat(num.replace(/ /g, '').replace(',', '.')));
        console.log(all_value)
        if (all_value) {
          let operationBuffer = all_value.map(Number)

          // if (operationBuffer.at(-1) == "") {
          //   operationBuffer.pop();
          // }
          if (operationBuffer[0] == "") {
            return;
          }
          this.WorkInClass(operationBuffer, event)
        
          event.target.value = "";
          return;
        }

      }

    },
    WorkInClass(operationBuffer, event) {
      for (let i in operationBuffer) {
        if (this.data[i] == undefined) {
          let newObj = new Stavki();
          newObj[event.target.id] = operationBuffer[i];
          this.data.push(newObj);
        } else {
          this.data[i][event.target.id] = operationBuffer[i];
        }
        // this.data = table_data
      }
    },
    // async getStationCode(station_name) {
    //   if (this.stationCache[station_name]) {
    //     return this.stationCache[station_name];
    //   } else {
    //     try {
    //       const response = await api_wagon.getCurrentStation(station_name);
    //       const server_response = response.data.data[0].code6;
    //       this.$set(this.stationCache, station_name, server_response);
    //       return server_response;
    //     } catch (error) {
    //       console.error("Ошибка при получении данных с сервера:", error);
    //       throw error; // Пробрасываем ошибку дальше, чтобы её можно было обработать
    //     }
    //   }
    // },
    async getStationCode(station_name, index) {
      try {
        if (this.stationCache[station_name]) {
          return this.stationCache[station_name];
        } else {
          const response = await api_wagon.getCurrentStation(station_name);
          const server_response = response.data.data[0].code;
          console.log(response.data.data[0])
          this.$set(this.stationCache, station_name, server_response);
          return server_response;
        }
      } catch (error) {
        this.errorp.push(`Ошибка при получении кода6 для станции "${station_name}" на строке ${index + 1}`)
        return null; // Возвращаем null в случае ошибки
      }
    },

    async createNewData() {
      const newData = [];

      for (const [index, item] of this.data.entries()) {
        const newItem = { ...item };

        if (item.destination_station) {
          try {
            const code = await this.getStationCode(item.destination_station, index);
            if (code !== null) {
              newItem.destination_station = code;
            }
          } catch (error) {
            console.error(`Ошибка при получении кода6 для станции "${item.destination_station}" на индексе ${index}`, error);
          }
        }

        if (item.departure_station) {
          try {
            const code = await this.getStationCode(item.departure_station, index);
            if (code !== null) {
              newItem.departure_station = code;
            }
          } catch (error) {
            console.error(`Ошибка при получении кода6 для станции "${item.departure_station}" на индексе ${index}`, error);
          }
        }

        newData.push(newItem);
      }
      if (this.errorp.length > 0) {
        this.flagCheck = false
        this.notifyHead = "Ошибка";
        this.notifyMessage = this.errorp.filter(item => !item.includes('NaN'));
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 10000);
      } else {
        // this.flagCheck = true
        this.notifyHead = "Успешно";
        this.notifyMessage = 'Ошибок нет, отправка данных возможна'
        this.notifyClass = "wrapper-succes";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 10000);
      }

      return newData;
    },

    async checkingData() {
      this.flagCheck = false
      this.loader = true
      this.errorp = []
      try {
        this.Standard.responsible = this.uid;
        let parametrs;
        if (this.data.length == 0) {
          parametrs = [this.Standard];
          parametrs.distance_min = []
          parametrs.distance_max = []
          parametrs.stavka = []
          parametrs.nds = []
          parametrs.distance = []
          parametrs.departure_station = []
          parametrs.destination_station = []
        } else {

          let stationNameSet = new Set()
          this.data.forEach(item => {
            if (item.destination_station) {
              stationNameSet.add(item.destination_station);
            }
            if (item.departure_station) {
              stationNameSet.add(item.departure_station)
            }
          })
          await Promise.all(Array.from(stationNameSet).map(async stationName => {
            await this.getStationCode(stationName)
          }))
          for (let i in this.data) {
            // this.Standard.agreement_number = this.Standard.annex_number
            Object.assign(this.data[i], this.Standard)
          }
          parametrs = this.data;
        }
        let new_data = await this.createNewData()
        this.loader = false
        console.log(this.flagCheck)
        if (this.errorp.length == 0) {
          this.flagCheck = true
          this.checkCompleteData = new_data
          console.log(new_data, 'я итоговые значения')
          this.notifyHead = "Успешно";
          this.notifyMessage = 'Данные проверку прошли!';
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 3000);
        }

      } catch (error) {
        console.log(error)
      }
    },














    closeWindow() {
      this.ten_visible = false;
      this.cargo_list = false;
    },
    checkClient(value) {
      this.Standard.client = value;
    },
    checkCargo(value, code6) {
      this.Standard.cargo = code6;
      this.cargo_user = value;
    },
    postData() {
      if (this.flagCheck == false) {
        this.notifyHead = "Ошибка";
        this.notifyMessage =
          "Пройдите проверку введенных";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 3000);
        return
      }
      if (this.picked == "annex_number" && this.agreement_number_test == "") {
        this.notifyHead = "Ошибка";
        this.notifyMessage =
          "Заполните поле с выбором договора для вашего приложения";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 3000);
        return;
      } else if (
        this.picked == "annex_number" &&
        this.Standard.annex_number == null
      ) {
        console.log("123");
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Заполните номер приложения";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 3000);
        return;
      } else {
        this.laoder = true
        api.postTarifData(this.checkCompleteData)
          .then(response => {

            this.getAllAgreement()
            this.flagCheck = false

            this.loader = false
            this.notifyHead = "Успешно";
            this.notifyMessage = 'Данные загружены';
            this.notifyClass = "wrapper-success";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 2000);
            this.data = []
          })
          .catch(error => {
            this.loader = false
            this.notifyHead = "Ошибка";
            this.notifyMessage = 'Проверьте поле с ошибками';
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 3000);

            for (let i in this.data) {
              this.data[i]['error'] = null

            }
            for (let i in error.response.data) {
              this.data[error.response.data[i][0] - 1].error =
                error.response.data[i][1];
            }

            let filter_arr = [...this.data];
            this.data = filter_arr.filter((item) => {
              return item.error != null;
            });
          })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a:nth-child(1) {
  color: #1d67ac !important;
  cursor: pointer;

  &:hover {
    text-decoration: underline !important;
  }
}

// h3:nth-child(n+2),h5{
//   color: rgb(0, 0, 0);
//   &:hover{
//     text-decoration: underline
//   }
// }
h3:nth-child(1) {
  background: #fce4cc;
  color: #8f5c49;
  text-align: center;
  padding-top: 2%;
}

tr,
td,
th {
  border: none;
}

.table_stavka {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.delete:hover {
  background: lightcoral;
}

input,
select {
  height: 25px !important;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.errorNote {
  border: 1px solid red !important;
}

.error {
  background: lightcoral;
}

.Accept,
.Request,
.Action {
  margin-left: auto;
  width: 25%;
  margin-right: 2%;
  margin-bottom: 2% !important;
}

.air_block {
  width: 100%;
  height: auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  padding: 1%;
  transform: translate(-50%, 0);
}

.air_block_header {
  padding: 1% 0 0 2%;
  color: rgb(202, 202, 202);
}

.btn-group_tarif {
  // display: flex;
  margin-left: -10% !important;
  // justify-content: space-around !important;
}

li {
  cursor: pointer;
}
</style>
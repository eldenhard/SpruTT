<template>
  <div style="height: 85vh">
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
    <button class="Accept button" style="margin-right: auto; background: #BFEEC5 !important; color: black;"
      @click="instruction2 = !instruction2">Инструкция по работе с разделом</button>
    <p class="explanation" v-if="instruction2">
      * Копирование и ввод данных в таблицу 1 должен осуществляться из
      <b>Excel</b>, после вставки значения в ячейку нажмите
      Enter чтобы значения были занесены в таблицу<br />
      * После ввода данных в таблицу, Вы можете отредактировать в ней любое
      поле, нажатие Enter Не требуется, редактирование невозможно в полях
    <ul>
      <li>Мн. станций отправки</li>
      <li>Станции исключения следующей погрузки</li>
    </ul>
    Для редактирования этих полей перегрузите данные в этот столбец <br />

    * Для удаления строки таблицы нажмите на порядковый номер строки<br />
    * Для удаления данных в стобце, необходимо навести на требуемый столбец (на его шапку, где написано его наименование) и кликнуть когда загорится слово удалить. <br>
    Обратите внимание, что не все столбцы доступны для удаления (Груз ЕСТНГ и НДС не удаляются) <br>
    *
    Данные по ставкам должны загружаться Excel, числа должны
    быть в строгом формате.<br>
    <b>Пример: 1 599,00 <em>(два числа после запятой обязательны, для загрузки в поля "Ставка без НДС" или НДС при
        выбранном селекторе сумма!)</em></b><br />
    *
    Данные по дистанциям должны быть скопированы и вставлены из Excel в формате <b>0 - 5 6 - 8 </b><br />
    * Чтобы узнать название груза, нажмите
    правой кнопкой мыши на интересующее поле, и подождите несколько секунд
    <br />
    <br>
    * Для сохранения отредатированных данных нажмите на Enter после того как
    окончили ввод <br />
    &nbsp;(если индикация зеленая - все хорошо, в противном случае
    ознакомьтесь с ошибкой)
    <br />
    * Наименования станций при редактировании должны вбиваться в таком формате: Тобольск СВР, Парто Цкали ГРЗ <br>
    &nbsp;То есть обязательно краткое наименование дороги (пробел и 3 заглавные буквы)<br>
    * При выборе груза отличного от знака "—" вводить код не нужно, данные подгрузятся автоматически, и поле ввода
    будет заблокировано
    <br />
    * Поля включащие в себя возможность загрузки нескольких значений в одном поле:
    <ul>
      <li>Мн. станций отправки (формат: Тобольск СВР, Парто Цкали ГРЗ)</li>
      <li>Станции исключения следующей погрузки (формат: Тобольск СВР, Парто Цкали ГРЗ)</li>
      <li>Вагоны (формат: 52568300, 55908677)</li>
    </ul>
    <br>
    * Поле "Страна" заполняется <b>полным наименованием страны</b>. Пример: Россия <br>
    * Поле "Груз наимен." подразумевает загрузку грузов по наименованию и может включать в себя загрузку множества
    элменетов,
    маска ввода строгая. <br>
    <b>Пример: Уголь,Сера,Нефть (раздление через запятую и между словами нет пробелов, пробел приведет к раздлению груза
      на 2 строки)</b>

    <br><br>
    * АЛГОРИТМ ДОБАВЛЕНИЯ ДОГОВОРА:
    <ul>
      <li>Для создания договора необходимо ввести номер договора</li>
      <li>Выбрать дату и клиента (если при выборе клиента у вас не появляется выпадающий список, <br>
        перезагрузите страницу и дождитесь окончания синхронизации данных (индикация в правом верхнем углу))</li>
      <li>Нажать на кнопку "Проверка введенных данных"</li>
      <li>После получения уведомления о проверке данных, нажать на кнопку "Отправить данные"</li>
    </ul>
    <br>
    * АЛГОРИТМ ДОБАВЛЕНИЯ ПРИЛОЖЕНИЯ:
    <ul>
      <li>Переключиться на вкладку Приложение</li>
      <li>Выбрать из списка договор к которому необходимо прикрепить приложение</li>
      <li>Заполнить даты и клиента</li>
      <li>Заполнить данные в таблице</li>
      <li>Нажать на кнопку "Проверка введенных данных"</li>
      <li>После получения уведомления о проверке данных, нажать на кнопку "Отправить данные"</li>
    </ul>
    </p>

    <div class="air_block" style="margin-top: 4%;">
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
          <td></td>

        </tr>
        <br />
        <tr v-show="visible_agreement">
          <td class="col1">Все договора</td>
          <td>
            <v-select v-model="agreement_number_test" :options="all_agreement_number" label="agreement_number"></v-select>
            <!-- <select name="" id="" v-model="agreement_number_test" @change="test()">
              <option :value="[item.agreement_number, item.client, item.id]" v-for="item in all_agreement_number"
                :key="item.id">
                {{ item.agreement_number }} {{ item.client }} {{ item.on_date }}
              </option>
            </select> -->
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
      <button class="button Action" style="height: 30px" @click="checkingData()">
        Проверка введеных данных
      </button>


      <button id="tooltip-target-1"
        style="background: transparent; border: none;  width: auto; padding: 0; margin-left: auto"
        @click="info_block = !info_block">
        <img :src="info_btn" alt="" style="width: 25px; height:25px; margin-top: 1%;">
      </button>
      <div style="max-height: 20vh; overflow: auto; width: 25%; margin-left: auto" v-if="info_block">
        <table>
          <tr>
            <th style="border: 1px solid black">Наименование станции</th>
            <th style="border: 1px solid black">Сокращение</th>
          </tr>
          <tr v-for="name in all_roads" :key="name.id">
            <td style="border: 1px solid black">{{ name?.name }}</td>
            <td style="border: 1px solid black">{{ name?.short_name }}</td>
          </tr>
        </table>
      </div>
      <br>

      <div style="width: 100%; overflow: auto;">

        <table border="1" class="table_stavka" v-show="visible">
          <tr>
            <td></td>
            <td style="border: 1px solid black">
              <input type="text" name="" id="departure_station" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>
            <td style="border: 1px solid black">
              <input type="text" id="departure_stations_list" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>
            <td style="border: 1px solid black">
              <input type="text" name="" id="destination_station" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>
            <!-- Для чекбокса -->
            <td style="border: 1px solid black">
              <input type="text" name="" id="for_paired_flights" placeholder="выберите рейс" disabled />
            </td>
            <!-- Грузы много -->
            <td style="border: 1px solid black">
              <input type="text" name="" id="cargos_list" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" :disabled="disabled_cargo" />
            </td>

            <td style="border: 1px solid black">
              <input type="text" name="" id="cargo" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" :disabled="disabled_cargo" />
            </td>
            <td style="border: 1px solid black">
              <input type="text" name="" id="stavka" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>
            <td style="border: 1px solid black">
              <input type="text" name="" id="nds" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>

            <!-- Дистанция диапозон -->
            <td style="border: 1px solid black" colspan="2">
              <input type="text" id="distance" @keyup.enter="saveDistance($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>
            <td style="border: 1px solid black">
              <input type="text" id="distance_num" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>
            <td style="border: 1px solid black">
              <input type="text" id="next_loading_stations_list" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>
            <td style="border: 1px solid black">
              <input type="text" id="exclude_next_loading_stations_list" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>
            <td style="border: 1px solid black">
              <input type="text" id="country" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>
            <td style="border: 1px solid black">
              <input type="text" id="wagons" @keyup.enter="saveTarif($event)"
                placeholder="скопируйте и вставьте данные" />
            </td>

          </tr>
          <tr>
            <th>№</th>
            <th style="border: 1px solid black; font-size: 12px !important;"  
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Станция отпр.')" 
            @click="handleClick('departure_station')">Станция отпр.</th>
            <!-- Новые поля от 20.02.2024 -->
            <th style="border: 1px solid black; font-size: 12px !important;"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Мн. станций отправки')" 
            @click="handleClick('departure_station_list')">Мн. станций отправки</th>
            <th style="border: 1px solid black; font-size: 12px !important;"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Станция назн.')" 
            @click="handleClick('destination_station')">Станция назн.</th>
            <th style="border: 1px solid black; font-size: 12px !important;">Сдвоенн. рейс</th>
            <th style="border: 1px solid black; font-size: 12px !important;"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Груз наимен.')" 
            @click="handleClick('cargos_list')">Груз наимен.</th>
            <th style="border: 1px solid black; font-size: 12px !important;">Груз(ЕСТНГ)
              <select name="" id="" v-model="which_cargo" style="width: 60%">
                <option value="">—</option>
                <option value="top_diz">Топ.диз</option>
                <option value="anothertop">Отд.виды топ.</option>
                <option value="benz">Бензины</option>
                <option value="bgs">БГС</option>
                <option value="masla">Масла</option>

              </select>
            </th>
            <th style="border: 1px solid black; font-size: 12px !important;"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Ставка без НДС')" 
            @click="handleClick('stavka')">Ставка без НДС</th>
            <th style="border: 1px solid black; position: relative;; font-size: 12px !important;"
            >НДС
              <select name="" id="" v-model="which_nds" style="width: 70%">
                <option value="percent">%</option>
                <option value="value">Сумма</option>
              </select>
            </th>

            <th style="border: 1px solid black; font-size: 12px !important;" colspan="2"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Дистанция (диапозон)')" 
            @click="handleClick('distance')"
            >Дистанция (диапозон)</th>
            <!-- Новые поля от 20.02.2024 -->
            <th style="border: 1px solid black; font-size: 12px !important;"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Расстояние')" 
            @click="handleClick('distance_num')">Расстояние</th>
            <th style="border: 1px solid black; font-size: 12px !important;"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Станция следующей погрузки')" 
            @click="handleClick('next_loading_stations_list')"
            >Станция следующей погрузки</th>
            <th style="border: 1px solid black; font-size: 12px !important;"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Станции исключения назначения')" 
            @click="handleClick('exclude_next_loading_stations_list')">Станции исключения назначения</th>
            <th style="border: 1px solid black; font-size: 12px !important;"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Страна')" 
            @click="handleClick('country')">Страна</th>
            <th style="border: 1px solid black; font-size: 12px !important;"
            @mouseover="checkFunc($event)" 
            @mouseout="resetText('Вагоны')" 
            @click="handleClick('wagons')">Вагоны</th>

          </tr>
          <tr v-for="(item, index) in data" :key="index">
            <td style="border: 1px solid black" @click="data.splice(index, 1)" class="delete"
              :class="{ error: item.error != null }">
              {{ item.error != null ? item?.error : index + 1 }}
            </td>
            <td style="border: 1px solid black">
              <input style="width: 100%" type="text" v-model="item.departure_station" />
            </td>
            <!-- новый столб от 20.02.2024 -->
            <td style="border: 1px solid black">
              <input style="width: 100%" type="text" v-model="item.departure_stations_list" disabled />
            </td>
            <td style="border: 1px solid black">
              <input style="width: 100%" type="text" v-model="item.destination_station" />
            </td>
            <td style="border: 1px solid black">
              <input style="width: 50%" type="checkbox" v-model="item.for_paired_flights" />
            </td>
            <td style="border: 1px solid black">
              <input style="width: 100%" type="text" v-model="item.cargos_list" disabled />
            </td>
            <td style="border: 1px solid black">
              <input style="width: 100%" type="text" v-model="item.cargo" />
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
            <!-- новые поля от 20.02.2024 -->
            <td style="border: 1px solid black">
              <input style="width: 100%" type="number" v-model="item.distance_num" />
            </td>
            <td style="border: 1px solid black">
              <input style="width: 100%" type="text" v-model="item.next_loading_stations_list" />
            </td>
            <td style="border: 1px solid black">
              <input style="width: 100%" type="text" v-model="item.exclude_next_loading_stations_list" disabled />
            </td>
            <td style="border: 1px solid black">
              <input style="width: 100%" type="text" v-model="item.country" />
            </td>
            <td style="border: 1px solid black">
              <input style="width: 100%" type="text" v-model="item.wagons" disabled />
            </td>
          </tr>
        </table>
      </div>
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
import api_wagon from "@/api/wagonPark";
import TarifDirectoryCreated from "./TarifDirectoryCreated.vue";
import vSelect from "vue-select";
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

    // Новые поля от 20.02.2024
    this.departure_stations_list = null // Множество станций погрузки
    this.distance_num = null
    this.next_loading_stations_list = null; // Станция следующей погрузки

    this.exclude_next_loading_stations_list = null; // Станции исключения следующей погрузки
    this.country = null;
    this.wagons = null;

    this.for_paired_flights = null
    this.cargos_list = null
  }

}
export default {
  components: { Loader, Notifications, TarifDirectoryCreated, vSelect },
  data() {
    return {
      instruction2: false,
      info_block: false,
      disabled_cargo: false,
      which_nds: "value",
      which_cargo: "",
      errorp: [],
      flagCheck: false,
      checkCompleteData: [],
      checkValueArray: [],
      stationCache: {},
      distance_type: "standard",
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
      all_agreement_number: [],
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
      road_hadrcode: [
        { "id": 2, "code": 81, "name": "Австрия", "short_name": null }, { "id": 3, "code": 57, "name": "Азербайджан", "short_name": "АЗ" }, { "id": 4, "code": 41, "name": "Албания", "short_name": null }, { "id": 5, "code": 92, "name": "Алжир", "short_name": null }, { "id": 6, "code": 135, "name": "Андорра", "short_name": null }, { "id": 7, "code": 58, "name": "Армения", "short_name": "АРМ" }, { "id": 8, "code": 39, "name": "Афганистан", "short_name": "АРА" }, { "id": 16, "code": 139, "name": "Бангладеш", "short_name": null }, { "id": 20, "code": 21, "name": "Беларусь", "short_name": "БЧ" }, { "id": 74, "code": 88, "name": "Бельгия", "short_name": null }, { "id": 42, "code": 52, "name": "Болгария", "short_name": "БДЖ" }, { "id": 40, "code": 50, "name": "Босния и Герцеговина, Мусульманско-Хорватская Федерация", "short_name": null }, { "id": 38, "code": 44, "name": "Босния и Герцеговина, Сербская Республика", "short_name": null }, { "id": 57, "code": 70, "name": "Великобритания", "short_name": null }, { "id": 45, "code": 55, "name": "Венгрия", "short_name": "МАВ" }, { "id": 32, "code": 32, "name": "Вьетнам", "short_name": "ВЖД" }, { "id": 66, "code": 80, "name": "Германия", "short_name": null }, { "id": 60, "code": 73, "name": "Греция", "short_name": null }, { "id": 28, "code": 28, "name": "Грузия", "short_name": "ГР" }, { "id": 72, "code": 86, "name": "Дания", "short_name": null }, { "id": 1, "code": 99, "name": "Другие третьи страны", "short_name": null }, { "id": 75, "code": 90, "name": "Египет", "short_name": null }, { "id": 80, "code": 95, "name": "Израиль", "short_name": null }, { "id": 17, "code": 166, "name": "Индия", "short_name": null }, { "id": 18, "code": 167, "name": "Индонезия", "short_name": null }, { "id": 34, "code": 36, "name": "Ирак", "short_name": null }, { "id": 81, "code": 96, "name": "Иран", "short_name": "РАИ" }, { "id": 51, "code": 60, "name": "Ирландия", "short_name": null }, { "id": 58, "code": 71, "name": "Испания", "short_name": null }, { "id": 69, "code": 83, "name": "Италия", "short_name": null }, { "id": 30, "code": 30, "name": "КНДР", "short_name": "ЗЧ" }, { "id": 27, "code": 27, "name": "Казахстан", "short_name": "КЗХ" }, { "id": 50, "code": 59, "name": "Киргизия", "short_name": "КРГ" }, { "id": 33, "code": 33, "name": "Китай", "short_name": "КЖД" }, { "id": 24, "code": 25, "name": "Латвия", "short_name": "ЛДЗ" }, { "id": 83, "code": 98, "name": "Ливан", "short_name": null }, { "id": 23, "code": 24, "name": "Литва", "short_name": "ЛГ" }, { "id": 68, "code": 82, "name": "Люксембург", "short_name": null }, { "id": 53, "code": 65, "name": "Македония", "short_name": null }, { "id": 14, "code": 134, "name": "Мальта", "short_name": null }, { "id": 78, "code": 93, "name": "Марокко", "short_name": null }, { "id": 22, "code": 23, "name": "Молдова", "short_name": "ЧФМ" }, { "id": 13, "code": 129, "name": "Монако", "short_name": null }, { "id": 31, "code": 31, "name": "Монголия", "short_name": "УБЖД" }, { "id": 70, "code": 84, "name": "Нидерланды", "short_name": null }, { "id": 63, "code": 76, "name": "Норвегия", "short_name": null }, { "id": 41, "code": 51, "name": "Польша", "short_name": "ПКП" }, { "id": 79, "code": 94, "name": "Португалия", "short_name": null }, { "id": 52, "code": 61, "name": "Республика Корея", "short_name": "КОРЕЙЛ" }, { "id": 19, "code": 20, "name": "Россия", "short_name": "РЖД" }, { "id": 43, "code": 53, "name": "Румыния", "short_name": "ЧФР-Марфа" }, { "id": 56, "code": 68, "name": "Сербия", "short_name": null }, { "id": 82, "code": 97, "name": "Сирия", "short_name": null }, { "id": 46, "code": 56, "name": "Словакия", "short_name": "ЗССК" }, { "id": 65, "code": 79, "name": "Словения", "short_name": null }, { "id": 54, "code": 66, "name": "Таджикистан", "short_name": "ТДЖ" }, { "id": 11, "code": 118, "name": "Таиланд", "short_name": null }, { "id": 12, "code": 119, "name": "Тайвань", "short_name": null }, { "id": 76, "code": 91, "name": "Тунис", "short_name": null }, { "id": 55, "code": 67, "name": "Туркмения", "short_name": "ТРК" }, { "id": 62, "code": 75, "name": "Турция", "short_name": null }, { "id": 29, "code": 29, "name": "Узбекистан", "short_name": "УТЙ" }, { "id": 21, "code": 22, "name": "Украина", "short_name": "УЗ" }, { "id": 10, "code": 10, "name": "Финляндия", "short_name": null }, { "id": 73, "code": 87, "name": "Франция", "short_name": null }, { "id": 64, "code": 78, "name": "Хорватия", "short_name": null }, { "id": 39, "code": 49, "name": "Черногория", "short_name": null }, { "id": 44, "code": 54, "name": "Чехия", "short_name": "ЧД" }, { "id": 71, "code": 85, "name": "Швейцария", "short_name": null }, { "id": 61, "code": 74, "name": "Швеция", "short_name": null }, { "id": 26, "code": 26, "name": "Эстония", "short_name": "ЭВР" }, { "id": 59, "code": 72, "name": "Югославия", "short_name": "ЮЖ" }, { "id": 37, "code": 42, "name": "Япония", "short_name": null }
      ],
      cargoCashe: {},
    };
  },
  computed: {
    ...mapState({
      name_client: (state) => state.client.name_client,
      name_cargo: (state) => state.cargo_code.cargo_code,
      uid: (state) => state.auth.uid,
      road: (state) => state.road.roadAsCountries
    }),
    all_roads() {
      return this.road_hadrcode.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
    info_btn() {
      if (this.info_block == false) {
        return require(`@/assets/info.png`)
      } else {
        return require(`@/assets/cross.png`)
      }
    },
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
    // Получаю все приложения для договора
    this.getAllAgreement();

  },
  watch: {
    which_cargo() {
      if (this.which_cargo == "") {
        this.disabled_cargo = false
      } else {
        this.disabled_cargo = true
      }
    },
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
    agreement_number_test() {
      this.Standard.agreement_number = this.agreement_number_test.agreement_number;
      this.Standard.client = this.agreement_number_test.client;
      this.Standard.base = this.agreement_number_test.id;
      this.flagCheck = false;
    },
  },
  methods: {
    checkFunc(e){
      e.target.innerText = 'Удалить'
      e.target.style.color = 'red'
    },
    handleClick(name) {
      console.log('Удаление столбика', this.data, name)
     for(let i in this.data){
      this.data[i][name] = null
     }
    },
    resetText(el) {
      event.target.innerText = el
      event.target.style.color = 'black'
    },
    CheckValue(value) {
      let client = value;
      if (
        client != 'amount' &&
        client != 'cost'
      ) {
        return true;
      }
    },
    // Получить список все договоров которые есть для ЦС
    getAllAgreement() {
      api
        .getAllDocuments().then((response) => {
          let data = response.data.data;
          // console.log(data);
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
            return acc.sort();
          }, []);

          this.loader = false;
        })
        .catch((error) => {
          this.loader = false;
          console.log(error);
        });
    },
    test() {
      // console.log(this.agreement_number_test)
      // this.Standard.agreement_number = this.agreement_number_test[0];
      // this.Standard.client = this.agreement_number_test[1];
      // this.Standard.base = this.agreement_number_test[2];

      this.Standard.agreement_number = this.agreement_number_test.agreement_number;
      this.Standard.client = this.agreement_number_test.client;
      this.Standard.base = this.agreement_number_test.id;

      // console.log(this.agreement_number_test)
    },
    // Обработка данных приходящих в формате диаозона
    saveDistance(event) {
      navigator.clipboard.readText().then((response) => {
        this.distance = response.split("\r\n");
        if (this.distance.at(-1) == "") {
          this.distance.pop();
        }
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
    // Обработка ввода из инпутов
    saveTarif(event) {
      if (
        event.target.id == "destination_station" ||
        event.target.id == "departure_station" ||
        event.target.id == 'next_loading_stations_list'
      ) {
        let operationBuffer = event.target.value
          .replaceAll(/[А-Я]{3}/g, " ")
          .split("  ");
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
        this.WorkInClass(clear_buffer, event);

        event.target.value = "";
        return;
      } else if (event.target.id == "departure_stations_list" || event.target.id == 'exclude_next_loading_stations_list') {
        // Если 3 заглавные буквы, то разделяю на 2 элемента
        let operationBuffer = event.target.value
          .replace(/[А-Я]{3}(?=\s)/g, "/")
          .split("/")
          .map(item => item.replace(/\s[А-Я]{3}/g, "").trim());  // Удаление пробелов из каждой строки

        // .replace(/ +/g, "")
        // .replace(/[А-Я]{3}(?=\s)/g, "/")
        //   .split("/")
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
        this.WorkInClass(clear_buffer, event);

        event.target.value = "";
        return;
      } else if (event.target.id == "wagons") {
        // Если 3 заглавные буквы, то разделяю на 2 элемента
        let operationBuffer = event.target.value.split(/(?<=\d)\s+/);
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
        this.WorkInClass(clear_buffer, event);

        event.target.value = "";
        return;
      } else if (event.target.id == 'distance_num' || event.target.id == "country") {
        // Разделение по любому количеству пробелов
        let operationBuffer = event.target.value.split(/\s+/);;
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
        this.WorkInClass(clear_buffer, event);

        event.target.value = "";
        return;

      } else if (event.target.id == "cargo") {
        // let data = event.target.value.match(/\d+/g);
        let data = event.target.value.split(' ')
        if (data) {
          let operationBuffer = data
          // let operationBuffer = data.map(Number);

          if (operationBuffer.at(-1) == "") {
            operationBuffer.pop();
          }
          if (operationBuffer[0] == "") {
            return;
          }
          this.WorkInClass(operationBuffer, event);

          event.target.value = "";
          return;
        }
      } else if (event.target.id == "stavka" || event.target.id == "nds") {
        if (event.target.id == "nds" && this.which_nds == "percent") {
          let percent_nds = event.target.value.split(" ")
          console.log('nds', percent_nds)
          if (percent_nds) {
            let operationBuffer = percent_nds.map(Number);
            console.log(operationBuffer)
            if (operationBuffer[0] === "") {
              console.log("'i'm here")
              return;
            }
            this.WorkInClass(operationBuffer, event);

            event.target.value = "";
            return;
          }
        }
        let t = event.target.value;

        const regex = /(\d[\d\s]*,\d{2})/g;
        const matches = t.match(regex);

        const numbers = matches.map((match) =>
          parseFloat(match.replace(/\s/g, "").replace(",", "."))
        );
        console.log(numbers, 'numbers')
        // Разбиваем строку на массив, используя регулярное выражение для чисел с пробелами и запятой
        let all_value = t.match(/\d+(?: \d{3})*(?:,\d{2})?/g);
    
        // Преобразуем каждое число, заменяя пробел на пустую строку и запятую на точку
        all_value = all_value.map((num) =>
          parseFloat(num.replace(/ /g, "").replace(",", "."))
        );
        console.log(all_value, 'all_value');
        if (numbers) {
          let operationBuffer = numbers.map(Number);

          // if (operationBuffer.at(-1) == "") {
          //   operationBuffer.pop();
          // }
          if (operationBuffer[0] == "") {
            return;
          }
          this.WorkInClass(operationBuffer, event);

          event.target.value = "";
          return;
        }
      } else if (event.target.id == "cargos_list") {
        // Если 3 заглавные буквы, то разделяю на 2 элемента
        let operationBuffer = event.target.value.split(" ");
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
        this.WorkInClass(clear_buffer, event);

        event.target.value = "";
        return;
      }
    },

    // Создание экземпляра класса
    WorkInClass(operationBuffer, event) {
      for (let i in operationBuffer) {
        if (this.data[i] == undefined) {
          let newObj = new Stavki();
          if (
            event.target.id === "departure_stations_list" ||
            event.target.id === "cargos_list" ||
            event.target.id === "exclude_next_loading_stations_list" ||
            event.target.id === "wagons"
          ) {
            newObj[event.target.id] = operationBuffer[i].split(",");
          } else {
            newObj[event.target.id] = operationBuffer[i];
          }
          this.data.push(newObj);
        } else {
          if (
            event.target.id === "departure_stations_list" ||
            event.target.id === "cargos_list" ||
            event.target.id === "exclude_next_loading_stations_list" ||
            event.target.id === "wagons"
          ) {
            this.data[i][event.target.id] = operationBuffer[i].split(",");
          } else {
            this.data[i][event.target.id] = operationBuffer[i];
          }

        }
      }
    },


    // // Преобразование данных через меммоизацию
    async getStationCode(station_name, index, name_cells) {
      try {
        if (this.stationCache[station_name]) {
          return this.stationCache[station_name];
        } else if (this.errorp.includes(station_name)) {
          throw new Error(`Предыдущая попытка запроса для станции "${station_name}" не удалась`);
        } else {
          const response = await api_wagon.getCurrentStation(station_name);
          const server_response = response.data.data.map((item) => item.name.toLowerCase()); // Получаем все имена станций в нижнем регистре
          const lowerStationName = station_name.toLowerCase(); // Приводим ввод пользователя к нижнему регистру
          const stationNameMatch = server_response.find((name) => name === lowerStationName); // Ищем точное совпадение имени станции
          if (stationNameMatch == undefined) {
            const res = await api_wagon.getCurrentStationByName(station_name);

            // Добавьте проверку на наличие данных и кода в ответе
            if (!res.data || !res.data.data || res.data.data.length === 0 || !res.data.data[0].code) {
              throw new Error(`Ошибка: Не удалось получить код станции "${station_name}" (код) на строке ${index + 1}`);
            }

            const stationCode2 = res.data.data[0].code;
            this.$set(this.stationCache, station_name, stationCode2);
            return stationCode2;
          }
          if (stationNameMatch) {
            const stationIndex = server_response.indexOf(stationNameMatch);
            const stationCode6 = response.data.data[stationIndex]; // Получаем все данные по станациям

            this.$set(this.stationCache, station_name, stationCode6);
            return stationCode6;
          } else {
            throw new Error(`Совпадений для станции "${station_name}" (код) не найдено на строке ${index + 1}`);
          }
        }
      } catch (error) {
        console.log('its me')
        this.errorp.push(station_name);
        return null; // Возвращаем null в случае ошибки
      }
    },

    // Проверка введеннхы данных
    async checkingData() {
      this.flagCheck = false;
      this.loader = true;
      this.errorp = [];
      try {
        this.Standard.responsible = this.uid;
        let parametrs;
        if (this.data.length == 0) {
          parametrs = [this.Standard];
          parametrs.distance_min = [];
          parametrs.distance_max = [];
          parametrs.stavka = [];
          parametrs.nds = [];
          parametrs.distance = [];
          parametrs.departure_station = [];
          parametrs.destination_station = [];
          parametrs.departure_stations_list = []; // Множество станций погрузки
          parametrs.distance_num = [];
          parametrs.next_loading_stations_list = []; // Станция следующей погрузки
          parametrs.exclude_next_loading_stations_list = []; // Станции исключения следующей погрузки
          parametrs.country = [];;
          parametrs.wagons = [];
          parametrs.for_paired_flights = []
          parametrs.cargos_list = []
        } else {
          let stationNameSet = new Set();
          this.data.forEach((item) => {
            if (item.destination_station) {
              stationNameSet.add(item.destination_station);
            }
            if (item.departure_station) {
              stationNameSet.add(item.departure_station);
            }
            if (item.next_loading_stations_list) {
              stationNameSet.add(item.next_loading_stations_list);
            }
            if (item.departure_stations_list) { // Добавляем станции погрузки из массива
              item.departure_stations_list.forEach(station => {
                stationNameSet.add(station);
              });
            }
            if (item.exclude_next_loading_stations_list) { // Добавляем исключения следующей погрузки из массива
              item.exclude_next_loading_stations_list.forEach(station => {
                stationNameSet.add(station);
              });
            }

          });
          // await Promise.all(
          //   Array.from(stationNameSet).map(async (stationName) => {
          //     await this.getStationCode(stationName);
          //   })
          // );
          for (let i in this.data) {
            Object.assign(this.data[i], this.Standard);
          }
          parametrs = this.data;
        }

        let new_data = await this.createNewData();
        console.log(new_data)
        this.loader = false;
        if (this.errorp.length == 0) {
          this.flagCheck = true;
          this.checkCompleteData = new_data;
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные проверку прошли!";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 3000);
        }
      } catch (error) {
        console.log(error);
        this.loader = false;
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
            console.error(`Ошибка при получении кода для станции "${item.destination_station}" на индексе ${index}`, error);
          }
        }

        if (item.departure_station) {
          try {
            const code = await this.getStationCode(item.departure_station, index);
            if (code !== null) {
              newItem.departure_station = code;
            }
          } catch (error) {
            console.error(`Ошибка при получении кода для станции "${item.departure_station}" на индексе ${index}`, error);
          }
        }

        if (item.next_loading_stations_list) {
          try {
            const code = await this.getStationCode(item.next_loading_stations_list, index, 'next_loading_stations_list');
            if (code !== null) {
              newItem.next_loading_stations_list = code;
            }
          } catch (error) {
            console.error(`Ошибка при получении кода для станции "${item.next_loading_stations_list}" на индексе ${index}`, error);
          }
        }

        if (item.departure_stations_list) {
          newItem.departure_stations_list = []; // Инициализируем массив для станций погрузки
          for (const station of item.departure_stations_list) {
            try {
              const code = await this.getStationCode(station, index, 'departure_stations_list');
              if (code !== null) {
                newItem.departure_stations_list.push(code);
              }
            } catch (error) {
              console.error(`Ошибка при получении  кода для станции "${station}" в группе "Мн. станций отправки	" на индексе ${index}`, error);
            }
          }
        }

        if (item.exclude_next_loading_stations_list) {
          newItem.exclude_next_loading_stations_list = []; // Инициализируем массив для исключений следующей погрузки
          for (const station of item.exclude_next_loading_stations_list) {
            try {
              const code = await this.getStationCode(station, index, 'exclude_next_loading_stations_list');
              if (code !== null) {
                newItem.exclude_next_loading_stations_list.push(code);
              }
            } catch (error) {
              console.error(`Ошибка при получении кода для станции "${station}" в группе "Станции исключения следующей погрузки" на индексе ${index}`, error);
            }
          }
        }
        if (item.country) {
          try {
            const country = this.road.find(roadItem => roadItem.name === item.country);
            if (!country) {
              throw new Error(`Страна "${item.country}" не найдена`);
            }
            newItem.country = Number(country.id); //  ID страны в новый элемент
          } catch (error) {
            console.error(`Ошибка при обработке страны "${item.country}" на индексе ${index}:`, error);
            this.errorp.push(`Ошибка при обработке страны "${item.country}" на индексе ${index}: ${error.message}`);
          }
        }

        if (item.wagons) {
          newItem.wagons = []; // Инициализируем массив для исключений следующей погрузки
          for (const wagon of item.wagons) {
            try {
              const wagon_id = await this.getWagonData(wagon, index);
              if (wagon_id !== null) {
                newItem.wagons.push(wagon_id);
              }
            } catch (error) {
              console.error(`Ошибка при обработке вагона "${item.wagons}" на индексе ${index}`, error);
            }
          }
        }

        if (item.cargos_list) {
          newItem.cargos_list = []; // Инициализируем массив для исключений следующей погрузки
          for (const cargo of item.cargos_list) {
            try {
              const cargo_name = await this.getCargoCode(cargo, index);
              if (cargo_name !== null) {
                newItem.cargos_list.push(cargo_name);
              }
            } catch (error) {
              console.error(`Ошибка при обработке груза "${item.cargos_list}" на индексе ${index}`, error);
            }
          }
        }
        if (item.cargo) {
          newItem.cargo = []
          for (const cargo of item.cargo.split(',')) {
            try {
              const cargo_name = await this.getCargoCode(cargo, index);
              if (cargo_name !== null) {
                newItem.cargo.push(cargo_name);
              }
            } catch (error) {
              console.error(`Ошибка при обработке груза "${item.cargos_list}" на индексе ${index}`, error);
            }
          }
        }
        newData.push(newItem);
      }
      if (this.errorp.length > 0) {
        this.flagCheck = false;
        this.notifyHead = "Ошибка. Не найдены данные";
        this.notifyMessage = this.errorp.filter(
          (item) => !item.includes("NaN")
        );
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 10000);
      } else {
        this.notifyHead = "Успешно";
        this.notifyMessage = "Ошибок нет, отправка данных возможна";
        this.notifyClass = "wrapper-success";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 10000);
      }

      return newData;
    },

    async getCargoCode(cargos_list, index) {

      try {
        if (this.cargoCashe[cargos_list]) {
          return this.cargoCashe[cargos_list]
        } else {
          const response = await api_wagon.getCargoCodeSearch(cargos_list);
          let startElement
          // Проверяем, есть ли данные в ответе от сервера
          if (!response.data || !response.data.data || response.data.data.length === 0) {
            throw new Error(`Ошибка: Не удалось найти груз: "${cargos_list}" на строке ${index + 1}`);
          }
          if (cargos_list.length === 3) {
            startElement = response.data.data.filter(element => element.code6.startsWith(cargos_list))[0].code6;
            this.$set(this.cargoCashe, cargos_list, startElement);
            return startElement
          }
          // Возвращаем первый найденный код груза из ответа
          this.$set(this.cargoCashe, cargos_list, response.data.data[0].code6);

          return response.data.data[0].code6
        }

      } catch (error) {
        this.errorp.push(error.message);
        return null;
      }
    },

    // Получение данных по номерам вагонов
    async getWagonData(wagonNumber, index) {
      try {
        const response = await api_wagon.getWagon(wagonNumber);
        console.log(response.data)
        // Проверяем, получены ли данные о вагоне
        if (!response.data || response.data.length === 0) {
          throw new Error(`Данные о вагоне "${wagonNumber}" не найдены`);
        }
        // Возвращаем данные о вагоне
        return response.data.id
      } catch (error) {
        if (error.response.status == '404') {
          this.errorp.push(`Данные о вагоне "${wagonNumber}" не найдены`);
        }
        return null; // Возвращаем null в случае ошибки
      }
    },


    // Закрыть окно подсказок
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
    // ОТправка обработанных данных в таблицу БД
    async postData() {
      if (this.flagCheck == false) {
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Пройдите проверку введенных";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 3000);
        return;
      }
      // проверка когда перелючено на приложение и не выбран договор
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
      } else if (this.picked == "annex_number" && this.Standard.annex_number == null) {
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Заполните номер приложения";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => {
          this.showNotify = false;
        }, 3000);
        return;
      } else {
        this.loader = true;
        // ПРиложение
        if (this.checkCompleteData.length == 0) {
          this.loader = true
          this.Standard.wagon_type = 'Цистерна'
          api
            .postTarifData([this.Standard])
            .then((response) => {
              this.loader = false;
              // Получаю все приложения для договора
              this.getAllAgreement();
              this.flagCheck = false;
              this.notifyHead = "Успешно";
              this.notifyMessage = "Данные отправлены";
              this.notifyClass = "wrapper-success";
              this.showNotify = true;
              setTimeout(() => {
                this.showNotify = false;
              }, 2000);
            })
            .catch((error) => {
              this.loader = false;
              this.notifyHead = "Ошибка";
              this.notifyMessage = "Данные не отправлены";
              this.notifyClass = "wrapper-error";
              this.showNotify = true;
              setTimeout(() => {
                this.showNotify = false;
              }, 2000);
            });
        } else {
          this.checkCompleteData.forEach((item) => {
            item.agreement_number = item.annex_number;
            if (this.which_nds == "percent") {
              item.nds = (item.stavka * (item.nds / 100)).toFixed(2);
            }
          });

          if (this.which_cargo != "") {
            let which_cargo_check;
            switch (this.which_cargo) {
              case "top_diz":
                which_cargo_check = [214039, 214043, 214058];
                break;
              case "anothertop":
                which_cargo_check = [
                  212052, 214109, 214081, 221136, 214096, 211153,
                ];
                break;
              case "benz":
                which_cargo_check = [
                  211011, 211026, 211030, 211056, 211100, 211115,
                ];
                break;
              case "bgs":
                which_cargo_check = [226021];
                break;
              case "masla":
                which_cargo_check = [
                  213163, 213182, 213197, 213204, 213214, 213229, 213252,
                  213290, 213303, 213318, 213322, 213337, 213356, 213360,
                  213380, 213411, 213426, 213411,
                ];
                break;
            }
            const allCheckCompleteData = []
            for (let i of which_cargo_check) {
              allCheckCompleteData.push(...this.checkCompleteData.map((item) => ({
                ...item,
                cargo: i,
              })))
            }
            this.checkCompleteData = allCheckCompleteData
          }
          this.checkCompleteData.forEach((item) => {
            item.wagon_type = 'Цистерна'
          })
          try {
            for (let i in this.checkCompleteData) {
              // Много станции
              if (this.checkCompleteData[i].departure_stations_list == null) {
                this.checkCompleteData[i].departure_stations_list = []
              } else {
                this.checkCompleteData[i].departure_stations_list = this.checkCompleteData[i].departure_stations_list.map((item) => item.id)
              }
              // 1 станция
              if (this.checkCompleteData[i].next_loading_stations_list == null) {
                this.checkCompleteData[i].next_loading_stations_list = []
              } else {
                this.checkCompleteData[i].next_loading_stations_list = [this.checkCompleteData[i].next_loading_stations_list.id]
              }
              // Много станций
              if (this.checkCompleteData[i].exclude_next_loading_stations_list == null) {
                this.checkCompleteData[i].exclude_next_loading_stations_list = []
              } else {
                this.checkCompleteData[i].exclude_next_loading_stations_list = this.checkCompleteData[i].exclude_next_loading_stations_list.map((item) => item.id)
              }
              if (this.checkCompleteData[i].wagons == null) {
                this.checkCompleteData[i].wagons = []
              }
              if (this.checkCompleteData[i].cargos_list == null) {
                this.checkCompleteData[i].cargos_list = ""
              } else if (Array.isArray(this.checkCompleteData[i].cargos_list) && this.checkCompleteData[i].cargos_list.length > 0) {
                this.checkCompleteData[i].cargos_list = this.checkCompleteData[i]?.cargos_list.join(';')
              }
              if (this.checkCompleteData[i].departure_station) {
                this.checkCompleteData[i].departure_station = this.checkCompleteData[i].departure_station.code
              }
              if (this.checkCompleteData[i].destination_station) {
                this.checkCompleteData[i].destination_station = this.checkCompleteData[i].destination_station.code
              }

              // Подмена настоящей дистанции на обработанные данные
              this.checkCompleteData[i].distance = Number(this.checkCompleteData[i]?.distance_num)

            }
          } catch (error) {
            console.log(error)
            this.loader = false;
            this.notifyHead = "Ошибка";
            this.notifyMessage = `${error}<br> Что-то пошло не так. Сообщите в отдел разработки`;
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            setTimeout(() => {
              this.showNotify = false;
            }, 3500);
            return
          }

          // Создание массива объектов
          let arrayOfObjects = this.checkCompleteData.flatMap(obj => {
            // Проверяем наличие поля cargo в текущем объекте
            if (obj.hasOwnProperty('cargo') && Array.isArray(obj.cargo)) {
              // Получаем значение cargo из текущего объекта
              let cargoValues = obj.cargo;
              // Создаем новый массив объектов для каждого значения cargo
              return cargoValues.map(cargo => {
                // Клонируем текущий объект
                let newObj = Object.assign({}, obj);
                // Присваиваем новое значение cargo для каждого объекта
                newObj.cargo = cargo;
                return newObj;
              });
            } else {
              // Если поле cargo отсутствует или не является массивом, клонируем текущий объект и добавляем его в массив объектов без изменений
              return [Object.assign({}, obj)];
            }
          });

          api
            .postTarifData(arrayOfObjects)
            .then((response) => {
              //Получаю все приложения для договора

              this.getAllAgreement();
              this.flagCheck = false;

              this.loader = false;
              this.notifyHead = "Успешно";
              this.notifyMessage = "Данные загружены";
              this.notifyClass = "wrapper-success";
              this.showNotify = true;
              setTimeout(() => {
                this.showNotify = false;
              }, 2000);
              this.data = [];
            })
            .catch((error) => {
              this.loader = false;
              this.notifyHead = "Ошибка";
              this.notifyMessage = "Проверьте поле с ошибками";
              this.notifyClass = "wrapper-error";
              this.showNotify = true;
              setTimeout(() => {
                this.showNotify = false;
              }, 3000);

              for (let i in this.data) {
                this.data[i]["error"] = null;
              }
              for (let i in error.response.data) {
                this.data[error.response.data[i][0] - 1].error =
                  error.response.data[i][1];
              }

              let filter_arr = [...this.data];
              this.data = filter_arr.filter((item) => {
                return item.error != null;
              });
            });

        }
      }
    },
  },
};
</script>

<style scoped>
a:nth-child(1) {
  color: #1d67ac !important;
  cursor: pointer;
}

a:nth-child(1):hover {
  text-decoration: underline !important;
}

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
  font-size: 12px;
}

/* .table_stavka {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
} */

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
  color: #cacaca;
}

.btn-group_tarif {
  margin-left: -10% !important;
}

li {
  cursor: pointer;
}
</style>
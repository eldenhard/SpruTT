<template>
  <div>

    <div class="air_block">
      <Loader :loader="loader" />
      <div class="air_block_header">
        <h5>Справочник договоры</h5>
      </div>
      <hr>
      <p class="explanation">
        При выборе определенного варианта из выпадающего меню. Будет выбран только этот вариант. <br>
        Если нажать на кнопку "Найти" будут выведены все варианты подходящие под Ваш запрос
      </p>
      <section class="search_bloc">
        <div class="long_search">
          <input type="text" placeholder="Поиск..." v-model="search" @input="IputProcessing(search)">
          <button class="Request" @click="InputTable(search)">
            <span v-if="isSearch">Найти</span>
            <b-icon v-if="!isSearch" icon="three-dots" animation="cylon" font-scale="3"></b-icon>
          </button>
        </div>

        <div class="answer_block" v-show="isAnswerBlock">
          <ul>
            <li v-for="item, index in responseSearchData" :key="index" @click="InputTable(item)">
              <b-icon icon="search" variant="secondary"></b-icon>
              <span>{{ item?.counterparty }} / Договор № {{ item?.number }}</span>
            </li>
          </ul>
        </div>

      </section>


      <section class="advanced_settings_block">
        <button class="Action button" @click="isAdvancedSettings = !isAdvancedSettings">Расширенный поиск</button>
        <Transition name="fade">
          <div v-if="isAdvancedSettings" class="advanced_settings">
            <div class="section_category">
              <div class="left_section">
                <p>Категория:</p>
              </div>

              <div class="right_section">
                <select v-model="searchFullSetting.category">
                  <option value="">Не выбрано</option>
                  <option value="economic">Общехозяйственные</option>
                  <option value="repair">Ремонтные</option>
                  <option value="financial">Финансовые</option>
                  <option value="buyer">С покупателем</option>
                  <option value="supply">С поставщиками</option>
                  <option value="other">Прочие</option>
                </select>

              </div>
            </div>
            <hr>
            <div class="section_date">
              <div class="left_section">
                <p>Дата создания документа от:</p>
              </div>
              <div class="right_section">
                <input type="date" class="textarea" v-model="searchFullSetting.on_date">
              </div>
            </div>
            <hr>
            <div class="inn_ogrn">
              <div class="left_section">
                <p>ИНН/ОГРН</p>
              </div>
              <div class="right_section">
                <input type="number" class="textarea" placeholder="ИНН" v-model="searchFullSetting.inn">
                <input type="number" class="textarea" placeholder="ОГРН" v-model="searchFullSetting.ogrn">
                <button class="Request" @click="sendFullDescriptionSearch(searchFullSetting)"
                  style="width: 100%; border-radius: 8px;">
                  <span>Найти контрагента</span>
                </button>
                <div v-if="Counterparty">
                    {{ Counterparty?.work_name }}<b-icon icon="x-lg" @click="deleteCurrentCounterparty()" variant="danger"></b-icon>
                </div>
              </div>
            </div>

           

            <div class="answer_block" v-if="answerBlock">
              <ul>
                <li v-for="item, index in arrInnOgrn" :key="index" @click="checkCounterparty(item)">
                  <b-icon icon="search" variant="secondary"></b-icon>
                  <span>{{ item?.work_name }} / ИНН {{ item?.inn }} / ОГРН {{ item?.ogrn }}</span>
                </li>
              </ul>
            </div>
            <hr>
            <div class="income_expense">
              <div class="left_section">
                <p>Вариант документа:</p>
              </div>
              <div class="right_section">
                <label for="income"><input type="checkbox" id="income" v-model="searchFullSetting.income"> Доходный
                </label>
                <label for="expenses"><input type="checkbox" id="expenses" v-model="searchFullSetting.expenses"> Расходный
                </label>
              </div>
            </div>
            <hr>

            <button class="Request" style="border-radius: 8px; margin-left: auto;" @click="sendToServerFullDecription()">
              <b-icon icon="search"></b-icon><span>&nbsp;&nbsp;Найти</span>
            </button>

          </div>
        </Transition>
      </section>

      <br>

      <div
        style=" width: 100%; overflow: auto; position: relative; left: 50%; transform: translate(-50%, 0); max-height: 70vh;">
        <ul>
          <li class="responseListItem" v-for="item, index in dataForTable" :key="index" style="margin-top: 2%;">
            <b-icon icon="file-earmark-medical" variant="success"></b-icon>
            <b style="font-weight: 500; font-size: 14px;"> Договор:</b> {{ item?.number }} <b
              style="font-weight: 500; font-size: 14px;">Тип:</b> {{
                item?.contract_type }} <b style="font-weight: 500; font-size: 14px;">Дата создания: </b> {{ item?.created_at ?
    item?.created_at : ' —' }}
            <br>
            <b style="font-weight: 500; font-size: 14px;">Предмет договора</b> {{ item?.contract_object }} <br>
            <b style="font-weight: 500; font-size: 14px;">Контрагент: </b> {{ item?.counterparty }} <br>
            <b style="font-weight: 500; font-size: 14px;">Категория: </b> {{ TranslateTypeCategory(item?.category) }} <br>
            <div @click="CopyTEXT(item?.scan_path)">
              <b style="font-weight: 500; font-size: 14px;">Ссылка: </b>
              <b-icon icon="link" variant="primary" font-scale="1.4"></b-icon>
            </div>
          </li>
        </ul>
      </div>


    </div>
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
      id="notif" />
  </div>
</template>
    
<script>
import api from "@/api/directory";
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import groups from "@/helpers/groups";
import MultiSelectUni from '@/components/ui/MultiSelectUni.vue'

export default {
  name: "PartnerTable",

  components: { Loader, Notifications, MultiSelectUni },
  data() {
    return {
      isAdvancedSettings: false,
      isAnswerBlock: true,
      responseSearchData: null,
      intervalResponse: null,
      isSearch: true,
      search: "",
      dataForTable: null,
      searchFullSetting: {
        income: "",
        expenses: "",
        category: "",
        inn: "",
        ogrn: "",
        on_date: "",
        counterparty: "",
        tags: [],
      },
      arrInnOgrn: [],
      Counterparty: null,
      answerBlock: true,


      nextLink: null,
      prevLink: null,
      loader: false,
      total_objects: "",
      amount: "",
      farmDirecory: [],
      comput: '',
      groups: groups.groups,
      // Уведомления
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      // modal: false,
      contract_number: '',
      filter_farms: {
        number: "",
      },
      selectedCountriesIds: [],
      dislocation: "",

    };
  },
  watch: {

    search() {
      return this.search.length <= 1 ? this.responseSearchData = null : this.responseSearchData
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      allGroups: (state) => state.auth.groups,
      staffGlobal: (state) => state.auth.users,
      counterparties: (state) => state.counterparties.counterparties
    }),
    CountrieObj() { //1
      const result = [
        { value: 'Статус ТТ по договору', id: 1, valen: 'company_status' },
        { value: 'Дата заключения', id: 2, valen: 'created_at' },
        { value: 'Подразделение инициатора', id: 3, valen: 'department' },
        { value: 'Ответственный', id: 4, valen: 'responsible' },
        { value: 'Вид договора', id: 5, valen: 'contract_type' },
        { value: 'Предмет договора', id: 6, valen: 'contract_object' },
        { value: 'Сумма договора', id: 7, valen: 'fiat_amount' },
        { value: 'Пролонгация', id: 8, valen: 'prolongation' },
        { value: 'Статус', id: 9, valen: 'status' },

      ]

      result.sort((a, b) => {
        const valueA = a.value.toLowerCase();
        const valueB = b.value.toLowerCase();
        return valueA.localeCompare(valueB); // Сравнение строк с учетом регистра
      });

      return result;
    },
    selectedCountries() { //2
      return this.CountrieObj.filter(el => this.selectedCountriesIds.includes(el.id))
    },
    // Для создания договора

  },
  methods: {
    TranslateTypeCategory(val) {
      switch (val) {
        case 'economic':
          return 'Общехозяйственные'
          break
        case 'repair':
          return 'Ремонтные'
          break
        case 'financial':
          return 'Финансовые'
          break
        case 'buyer':
          return 'С покупателем'
          break
        case 'supply':
          return 'С поставщиками'
          break
        case 'other':
          return 'Прочие'
          break


      }
    },
    IputProcessing(val) {
      clearTimeout(this.intervalresponse);

      // Установка нового таймера на 2 секунды
      this.intervalresponse = setTimeout(() => {
        // Выполняется после остановки ввода на 2 секунды
        this.sendRequestToServerData(val);
      }, 1000);
    },
    sendRequestToServerData(val) {
      if (this.search == "" || this.search.length <= 1) return
      this.isSearch = false
      api.getAllDocumentsNotType(val)
        .then(response => {
          this.isSearch = true
          this.responseSearchData = response.data.data
          this.isAnswerBlock = true
        }).catch((err) => {
          this.isSearch = true
          console.log(err)
        })
    },
    CopyTEXT(value) {
      navigator.clipboard.writeText(value)
        .then(() => {
          this.notifyHead = "Успешно";
          this.notifyMessage = "Ссылка скопирована";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 2000);
        })
    },

    updateSelectedCountries(selected) {
      this.selectedCountriesIds = selected
    },
    removeselectedCountries(id) {
      this.selectedCountriesIds.splice(this.selectedCountriesIds?.indexOf(id), 1)
    },
    InputTable(val) {
      if (typeof val == 'string') {
        this.isAnswerBlock = false
        this.dataForTable = this.responseSearchData
      } else {
        this.isAnswerBlock = false
        this.search = ""
        this.dataForTable = [val]
      }
    },
    sendFullDescriptionSearch() {
      this.arrInnOgrn = []
      this.answerBlock = true

      this.counterparties.filter((item) => {
        if (item?.inn !== null && item?.ogrn !== null)
          if (item?.inn.includes(this.searchFullSetting.inn) && item?.ogrn.includes(this.searchFullSetting.ogrn)) {
            this.arrInnOgrn.push(item)
          }
      })
    },
    // Заполнение данных по контрагенту в таблице расширенного поиска
    checkCounterparty(item) {
      this.Counterparty = item
      this.searchFullSetting.inn = item.inn
      this.searchFullSetting.ogrn = item.ogrn
      this.searchFullSetting.counterparty = item.work_name
      this.answerBlock = false
    },
    // запрос из расширенног поиска
    sendToServerFullDecription() {
      // if (this.searchFullSetting.income) {
      //   // Если income true и 'buyer' еще не в массиве, добавляем 'buyer'
      //   if (!this.searchFullSetting.tags.includes('buyer')) {
      //     this.searchFullSetting.tags.push('buyer');
      //   }
      // } else {
      //   // Если income false, удаляем 'buyer' из массива
      //   const index = this.searchFullSetting.tags.indexOf('buyer');
      //   if (index !== -1) {
      //     this.searchFullSetting.tags.splice(index, 1);
      //   }
      // }

      // if (this.searchFullSetting.expenses) {
      //   // Если expenses true и каждого из тегов нет в массиве, добавляем их
      //   const tagsToAdd = ['supply', 'economic', 'repair', 'financial', 'other'];
      //   tagsToAdd.forEach(tag => {
      //     if (!this.searchFullSetting.tags.includes(tag)) {
      //       this.searchFullSetting.tags.push(tag);
      //     }
      //   });
      // } else {
      //   // Если expenses false, удаляем все указанные теги из массива
      //   this.searchFullSetting.tags = this.searchFullSetting.tags.filter(tag => !['supply', 'economic', 'repair', 'financial', 'other'].includes(tag));
      // }

      // if (this.Counterparty?.work_name === 'undefined') {
      //   this.searchFullSetting.counterparty = ""
      // }

      console.log(this.searchFullSetting)
      api.fullSearchDirectory(this.searchFullSetting)
        .then(response => {
          this.dataForTable = response.data.data
        }).catch((err) => {
          console.log(err)
        })


    },

    // Удалить выбранного контрагента в широкой фильтрации
    deleteCurrentCounterparty(){
      this.searchFullSetting.inn = ""
      this.searchFullSetting.ogrn = ""
      this.Counterparty = null
    }
  }
}
</script>
    
    
<style  scoped>
.responseListItem:hover{
  background: rgb(241, 241, 241);
}
.section_category,
.section_date,
.inn_ogrn,
.income_expense {
  padding: 10px;
  width: 65%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.right_section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

label {
  font-weight: 18px;
  font-weight: bold;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.air_block {
  width: 80%;
  height: auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #e4e4e4;
  position: relative;
  left: 50%;
  padding: 1%;
  transform: translate(-50%, 0);
  box-sizing: border-box;
}

.air_block_header {
  padding: 1% 0 0 2%;
  color: #cacaca;
}

.long_search {
  position: relative;
  width: 90%;
  margin: 0 auto;
}

.long_search {
  position: relative;
  width: 100%;
  height: 5vh;
}

.long_search input {
  width: 100%;
  height: 100%;
  border: 2px solid #007BFF !important;
  border-radius: 10px;
  text-align: left !important;
  padding-left: 2% !important;
}

::-webkit-input-placeholder {
  text-align: left;
}

:-moz-placeholder {
  /* Firefox 18- */
  text-align: left;
}

::-moz-placeholder {
  /* Firefox 19+ */
  text-align: left;
}

:-ms-input-placeholder {
  text-align: left;
}

.long_search button {
  width: 10%;
  height: 80%;
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 1%;
  border-radius: 8px;
}

.advanced_settings {
  width: 100%;
  margin: 0 auto;
  background: rgb(243, 243, 243);
  border-radius: 8px;
  margin-top: 1%;
}

.advanced_settings_block button {
  min-width: 10vw;
  height: 40px;
  width: auto;
  margin: 2% 0 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.left_section p {
  font-size: 18px;
  font-weight: 600;
}

.answer_block {
  width: 100%;
  max-height: 65vh;
  overflow: auto;
  background: rgb(238, 238, 238);
  margin-top: 1%;
  border-radius: 8px;
}

ul {
  width: 100%;
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
  padding: 1% 2%;
}

li:hover {
  background: rgb(255, 255, 255);
}

li span {
  padding-left: 3%;
}
</style>
    
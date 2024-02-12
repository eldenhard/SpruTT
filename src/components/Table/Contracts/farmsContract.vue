<template>
  <div>
    <Loader :loader="loader" />
    <div class="air_block">

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
        <button class="Action button" @click="isAdvancedSettings = !isAdvancedSettings">{{ !isAdvancedSettings ?
          "Расширенный поиск" : 'Закрыть' }}</button>
        <Transition name="fade">
          <div v-if="isAdvancedSettings" class="advanced_settings">
            <div class="section_category">
              <div class="left_section">
                <p>Вид документа<sup>*</sup> :</p>
              </div>
              <div class="right_section">
                <select v-model="searchFullSetting.type">
                  <option value="">Не выбран</option>
                  <option value="false">Договор</option>
                  <option value="true">Приложение</option>
                </select>
              </div>
            </div>
            <hr>
            <div class="section_category" v-if="searchFullSetting.type != ''">
              <div class="left_section">
                <p> {{ searchFullSetting.type == 'false' ? 'Тип договора' : 'Вид приложения' }}:</p>
              </div>

              <div class="right_section" v-if="searchFullSetting.type == 'false'">
                <select v-model="searchFullSetting.category">
                  <option value="">Не выбрано</option>
                  <option value="Абонентский">Абонентский</option>
                  <option value="Аренда">Аренда</option>
                  <option value="Возмещение расходов">Возмещение расходов</option>
                  <option value="Комиссия">Комиссия</option>
                  <option value="Купля-продажа">Купля-продажа</option>
                  <option value="Оказание услуг">Оказание услуг</option>
                  <option value="Организация расчетов">Организация расчетов</option>
                  <option value="Перевозка">Перевозка</option>
                  <option value="Поставка">Поставка</option>
                  <option value="Субаренда">Субаренда</option>
                  <option value="Цессия">Цессия</option>
                  <option value="ЭДО">ЭДО</option>
                  <option value="Экспедиция">Экспедиция</option>
                </select>
              </div>

              <div class="right_section" v-else>
                <select v-model="searchFullSetting.category_annex">
                  <option value="">Не выбрано</option>
                  <option value="Акт">Акт</option>
                  <option value="Акт приема-передачи">Акт приема-передачи</option>
                  <option value="Акт выполненных работ/оказанных услуг">Акт выполненных работ/оказанных услуг</option>
                  <option value="Доп. соглашение">Доп. соглашение</option>
                  <option value="Заявка">Заявка</option>
                  <option value="Перечень вагонов">Перечень вагонов</option>
                  <option value="Прейскурант цен">Прейскурант цен</option>
                  <option value="Приложение к Дс №82">Приложение к Дс №82</option>
                  <option value="Протокол разногласий">Протокол разногласий</option>
                  <option value="Приложение">Приложение</option>
                  <option value="Протокол условий предоставления вагонов">Протокол условий предоставления вагонов</option>
                  <option value="Протокол согласования разногласий">Протокол согласования разногласий</option>
                  <option value="Регламент взаимодействия">Регламент взаимодействия</option>
                  <option value="Соглашение">Соглашение</option>
                  <option value="Соглашение о расторжении">Соглашение о расторжении</option>
                  <option value="Соглашение об ЭДО">Соглашение об ЭДО</option>
                  <option value="Спецификация">Спецификация</option>

                </select>
              </div>
            </div>
            <div class="income_expense" v-if="searchFullSetting.type == 'false'">
              <div class="left_section">
                <p style="color: grey">Вид договора:</p>
              </div>

              <div class="right_section">
                <select v-model="searchFullSetting.kind" disabled>
                  <option value="">Не выбран</option>
                  <option value="income">Доходный</option>
                  <option value="expenses">Расходный</option>
                </select>
                <!-- <label for="income"><input type="checkbox" id="income" v-model="searchFullSetting.income"> Доходный
                </label>
                <label for="expenses"><input type="checkbox" id="expenses" v-model="searchFullSetting.expenses"> Расходный
                </label> -->
              </div>
            </div>



            <div class="section_category" v-if="searchFullSetting.type != '' && searchFullSetting.type == 'false'">
              <div class="left_section">
                <p>Наименование контрагента:</p>
              </div>
              <div class="right_section" style="margin-left: auto;">
                <input type="text" v-model="searchFullSetting.counterparty" class="textarea"
                  @input="IputProcessingCounterparty()">

              </div>
            </div>
            <div class="section_category" v-if="isVisibleAnswerBlockCounterparty">
              <div class="left_section">
              </div>
              <div class="right_section answer_block"
                style="width:100%; max-height: 20vh; margin-left: auto; border: 1px solid grey;">
                <ul>
                  <li v-for="counterparty, index in listCounterparty" :key="index"
                    @click="checkCounterpartyAdvancedFilter(counterparty)">
                    <b-icon icon="search" variant="secondary"></b-icon>
                    &nbsp;&nbsp;{{ counterparty }}
                  </li>
                </ul>
              </div>
            </div>


            <!-- Для приложения -->
            <div class="section_category" v-if="searchFullSetting.type != '' && searchFullSetting.type == 'true'">
              <div class="left_section">
                <p>Наименование контрагента (прил):</p>
              </div>
              <div class="right_section" style="margin-left: auto;">
                <input type="text" v-model="searchFullSetting.counterparty_annex" class="textarea"
                  @input="IputProcessingCounterpartyForAnnex()">

              </div>
            </div>
            <div class="section_category" v-if="isVisibleCounterpartyAnnex">
              <div class="left_section">
              </div>
              <div class="right_section answer_block"
                style="width:100%; max-height: 20vh; margin-left: auto; border: 1px solid grey;">
                <ul>
                  <li v-for="counterparty, index in listCounterpartyAnnex" :key="index"
                    @click="checkCounetrpartForSearchAgreementNumber(counterparty.counterparty)">
                    <b-icon icon="search" variant="secondary"></b-icon>
                    &nbsp;&nbsp;{{ counterparty.counterparty }}
                  </li>
                </ul>
              </div>
            </div>



            <!-- Для договора -->
            <div class="section_category" v-if="searchFullSetting.type != '' && searchFullSetting.type == 'false'">
              <div class="left_section">
                <p>№ договора:</p>
              </div>
              <div class="right_section" style="margin-left: auto;">
                <input type="text" v-model="searchFullSetting.number" class="textarea" @input="IputProcessingNumber()">

              </div>
            </div>
            <div class="section_category" v-if="isVisibleAnswerBlockAgreementNumber">
              <div class="left_section">
              </div>
              <div class="right_section answer_block"
                style="width:100%; max-height: 20vh; margin-left: auto; border: 1px solid grey;">
                <ul>
                  <li v-for="agr, index in AgreementNumber" :key="index"
                    @click="checkAgreementNumberAdvancedFilter(agr.number)">
                    <b-icon icon="search" variant="secondary"></b-icon>
                    &nbsp;&nbsp;{{ agr.number }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Для приложения -->
            <div class="section_category" v-if="searchFullSetting.type != '' && searchFullSetting.type == 'true'">
              <div class="left_section">
                <p>№ договора:</p>
              </div>
              <div class="right_section"  style="width: 70%">
                <v-select v-model="searchFullSetting.annex_number" :options="all_annex_number" label="number"
                  style="width:50%; margin-left: auto;"></v-select>
              </div>
            </div>

            <div class="section_category" v-if="searchFullSetting.type != ''">
              <div class="left_section">
                <p style="color: grey">Статус договора:</p>
              </div>
              <div class="right_section">
                <select v-model="searchFullSetting.status" disabled>
                  <option value="">Не выбран</option>
                  <option value="false">Действующий</option>
                  <option value="true">Недействующий</option>
                </select>
              </div>
            </div>


            <button class="Request" style="border-radius: 8px; margin-left: auto;" @click="sendToServerFullDecription()">
              <span v-if="isSearchFullSettings">Найти</span>
              <b-icon v-if="!isSearchFullSettings" icon="three-dots" animation="cylon" font-scale="3"></b-icon>
            </button>

          </div>
        </Transition>
      </section>

      <br>

      <viewData :infoFromSmartSearch="infoFromSmartSearch" :searchFullSetting="searchFullSetting"
        :commentForResponse="commentForResponse" @openNotif="openNotifications()" :isFilterBlock="isFilterBlock"
        :dataForSearchByUser="dataForSearchByUser" @startLoader="loader = true" @stopLoader="loader = false"
        @getDataFromChildComponent="getDataFromChildComponent" :total_pages="totalPagesForChildComponent" 
        :isVisibleFilterElementsTest="isVisibleFilterElementsTest"/>
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
import viewData from "./viewData.vue";
import vSelect from "vue-select";

export default {
  name: "PartnerTable",

  components: { Loader, Notifications, MultiSelectUni, viewData, vSelect },
  data() {
    return {
      dataForSearchByUser: "", // передача в дочерний компонент данных введенных пользователем в поиск до поиска
      totalPagesForChildComponent: 0, // кол-во страниц запроса для дочернего компонента
      isFilterBlock: false,
      isAdvancedSettings: false,
      isAnswerBlock: true,
      responseSearchData: null,
      intervalResponse: null,
      isSearch: true,
      isSearchFullSettings: true,
      search: "",
      dataForTable: [],
      infoFromSmartSearch: [],
      searchFullSetting: {
        kind: "",
        status: "",
        category: "",
        category_annex: "",
        inn: "",
        ogrn: "",
        on_date: "",
        counterparty: "",
        tags: [],
        type: "",
        annex_date: "",
        number: "", // номер договора
        annex_number: "", // номер приложения
        counterparty_annex: "",
      },
      arrInnOgrn: [],
      Counterparty: null,
      answerBlock: true,
      commentForResponse: "",

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
      // интервал для контрагента
      intervalCounterparty: null,
      listCounterparty: [],
      isVisibleAnswerBlockCounterparty: false,
      // интервал для договора
      intervalAgreementNumber: null,
      isVisibleAnswerBlockAgreementNumber: false,
      AgreementNumber: "",
      all_annex_number: [],

      // приложения
      intervalAnnexNumber: null,
      listCounterpartyAnnex: "",
      isVisibleCounterpartyAnnex: false,
      agreementBycounterpary: "",
      isVisibleFilterElementsTest: false,
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
    // получение клиентов, для дальнейшего нахождения договоров по выбранному клиенту
    IputProcessingCounterpartyForAnnex() {
      clearInterval(this.intervalAnnexNumber)

      this.intervalAnnexNumber = setTimeout(() => {
        this.getAnnexNumber()
      }, 1000)
    },
    async getAnnexNumber() {
      if (this.searchFullSetting.counterparty_annex == "" || this.searchFullSetting.counterparty_annex.length <= 1) return
      this.loader = true
      try {
        let response = await api.getOnlyAgreementNumber(this.searchFullSetting.counterparty_annex)
        // оставить в массиве объектов, в ответе от сервера только уникальные объекты по полю counterparty
        let counterparties = response.data.data.reduce((acc, item) => {
          if (acc.map[item.counterparty]) // если данный контрагент уже был
            return acc; // ничего не делаем, возвращаем уже собранное

          acc.map[item.counterparty] = true; // помечаем контрагент, как обработанный
          acc.counterparties.push(item); // добавляем объект в массив контрагентов
          return acc; // возвращаем собранное
        }, {
          map: {}, // здесь будут отмечаться обработанные контрагента
          counterparties: [] // здесь конечный массив уникальных контрагентов
        }).counterparties; // получаем конечный массив
        this.listCounterpartyAnnex = counterparties
        this.isVisibleCounterpartyAnnex = true
      } catch (err) {
        console.log(err)
      } finally {
        this.loader = false
      }
    },
    async checkCounetrpartForSearchAgreementNumber(val) {
      console.log(val)
      this.searchFullSetting.counterparty_annex = val
      this.isVisibleCounterpartyAnnex = false
      try {
        this.loader = true
        let response = await api.getAgreementNumberForCounterparty(val)
        this.all_annex_number = response.data.data
        console.log(this.all_annex_number)
      } catch (err) {

      } finally {
        this.loader = false
      }

    },
    // Получение договора по клиенту
    getAgreementByClient() {
      this.loader = true
      api.getOnlyAgreementNumber(this.searchFullSetting.client)
        .then(response => {
          this.loader = false

          this.all_agreement_number = response.data.data
          console.log(this.all_agreement_number)
          this.notifyHead = "Успешно";
          this.notifyMessage = "Договора получены";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 3000);
        }).catch((error) => {
          this.loader = false
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Договора не получены! Повторите попытку позже";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => {
            this.showNotify = false;
          }, 3000);
          console.error(error)
        })
    },
    // получение всех договоров
    IputProcessingNumber() {
      clearInterval(this.intervalAgreementNumber)

      this.intervalAgreementNumber = setTimeout(() => {
        this.getAgreementNumber()
      }, 1000)
    },
    // получение всех договоров для договора
    async getAgreementNumber() {
      if (this.searchFullSetting.number == "" || this.searchFullSetting.number.length <= 1) return
      this.loader = true
      try {

        let response = await api.getAllDocumentsNotType(this.searchFullSetting.number)
        this.AgreementNumber = response.data.data
        this.isVisibleAnswerBlockAgreementNumber = true
      } catch (err) {
        console.log(err)
      } finally {
        this.loader = false
      }
    },   // получение всех договоров
    checkAgreementNumberAdvancedFilter(val) {
      this.searchFullSetting.number = val
      this.isVisibleAnswerBlockAgreementNumber = false
    },


    IputProcessingCounterparty() {
      clearInterval(this.intervalCounterparty)

      this.intervalCounterparty = setTimeout(() => {
        this.getAllCounterparty()
      }, 1000)
    },
    async getAllCounterparty() {
      if (this.searchFullSetting.counterparty == "" || this.searchFullSetting.counterparty.length <= 1) return
      this.loader = true
      try {
        let response = await api.searchCounterparties(this.searchFullSetting.counterparty)
        this.listCounterparty = response.data.filter((item) => item?.toLowerCase().includes(this.searchFullSetting.counterparty.toLowerCase()))
        this.isVisibleAnswerBlockCounterparty = true
      } catch (err) {
        console.log(err)
      } finally {
        this.loader = false
      }
    },
    checkCounterpartyAdvancedFilter(val) {
      this.searchFullSetting.counterparty = val
      this.isVisibleAnswerBlockCounterparty = false
    },
    openNotifications(data) {
      this.notifyHead = "Успешно";
      this.notifyMessage = "Данные скопированы";
      this.notifyClass = "wrapper-success";
      this.showNotify = true;
      setTimeout(() => (this.showNotify = false), 2000);
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
          this.totalPagesForChildComponent = response.data.total_pages // получение всех страниц для доч компонента
          this.isAnswerBlock = true
        }).catch((err) => {
          this.isSearch = true
          console.log(err)
        })
    },

    async getDataFromChildComponent(search, page_size, page, contract_type, created_at_gte) {
      this.loader = true
      try {
        const response = await api.getAllDocumentsNotType(search, page_size, page, contract_type, created_at_gte);
        this.infoFromSmartSearch = response.data.data;
        this.totalPagesForChildComponent = response.data.total_pages;
      } catch (err) {
        console.log(err);
      } finally {
        this.loader = false;
      }
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
        this.infoFromSmartSearch = this.responseSearchData
        this.isFilterBlock = true
        this.dataForSearchByUser = this.search

        this.search = ""
      } else {
        this.isFilterBlock = true
        this.isAnswerBlock = false
        this.dataForSearchByUser = this.search
        this.search = ""
        this.dataForTable = [val]
        this.infoFromSmartSearch = [val]
        console.log(this.infoFromSmartSearch, '[val]')
      }
    },
    sendFullDescriptionSearch() {
      this.arrInnOgrn = []
      this.answerBlock = true
      api.testCounterparty()
        .then((response) => { console.log(response.data) })
      // this.counterparties.filter((item) => {
      //   if (item?.inn !== null && item?.ogrn !== null)
      //     if (item?.inn.includes(this.searchFullSetting.inn) && item?.ogrn.includes(this.searchFullSetting.ogrn)) {
      //       this.arrInnOgrn.push(item)
      //     }
      // })
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
    async sendToServerFullDecription() {
      if (this.searchFullSetting.type == "") {
        this.searchFullSetting.category = ""
        this.searchFullSetting.on_date = ""
        this.searchFullSetting.annex_date = ""
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Необходимо выбрать вид документа.";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
        return
      }
      this.commentForResponse = ""
      // если договор
      if (this.searchFullSetting.type == 'false') {
        this.loader = true
        try {
          let response = await api.getAgreementAdvancedFilter(this.searchFullSetting.category, this.searchFullSetting.counterparty, this.searchFullSetting.number)
          this.dataForTable = response.data.data
          this.infoFromSmartSearch = response.data.data
          this.isFilterBlock = true

        } catch (err) {
          console.err(err, 'ОШИБКА')
        }
        finally {
          this.loader = false
        }
      } else if(this.searchFullSetting.type == 'true'){
        this.loader = true
        try {
          let response = await api.getAnnexesAgreementAdvancedFilter(this.searchFullSetting.category_annex, this.searchFullSetting.counterparty_annex, this.searchFullSetting.annex_number.number)
          this.dataForTable = response.data.data
          this.infoFromSmartSearch = response.data.data
          // this.isFilterBlock = true

        } catch (err) {
          console.err(err, 'ОШИБКА')
        }
        finally {
          this.loader = false
        }
      }

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
      //   const tagsToAdd = ['supply', 'economic', 'repair', 'financial'];
      //   tagsToAdd.forEach(tag => {
      //     if (!this.searchFullSetting.tags.includes(tag)) {
      //       this.searchFullSetting.tags.push(tag);
      //     }
      //   });
      // } else {
      //   // Если expenses false, удаляем все указанные теги из массива
      //   this.searchFullSetting.tags = this.searchFullSetting.tags.filter(tag => !['supply', 'economic', 'repair', 'financial'].includes(tag));
      // }

      // // Перебор данных когда выбран доходный или расходный документ
      // if (this.searchFullSetting.tags.length > 0) {
      //   let request = this.searchFullSetting.tags.map(category => api.getManyCategoryDate(
      //     category,
      //     this.searchFullSetting.on_date,
      //     this.searchFullSetting.counterparty,
      //     this.searchFullSetting.type,
      //     this.searchFullSetting.annex_date))
      //   this.dataForTable = []
      //   this.isSearchFullSettings = false
      //   Promise.allSettled(request)
      //     .then(response => {
      //       response.forEach((item) => {
      //         this.dataForTable.push(...item.value.data.data)
      //         if (this.dataForTable.length == 0) {
      //           this.commentForResponse = 'Нет данных по вашему запросу'
      //         }
      //         this.isSearchFullSettings = true
      //       })
      //     }).catch((err) => {
      //       console.log(err)
      //       this.isSearchFullSettings = true
      //     })
      // } else {
      //   if (this.searchFullSetting)
      //     // для случаев без выбора этих данных
      //     this.isSearchFullSettings = false
      //   api.fullSearchDirectory(this.searchFullSetting)
      //     .then(response => {
      //       this.dataForTable = response.data.data
      //       console.log(this.dataForTable)
      //       if (this.dataForTable.length == 0) {
      //         this.commentForResponse = 'Нет данных по вашему запросу'
      //       }
      //       this.isSearchFullSettings = true
      //     }).catch((err) => {
      //       console.log(err)
      //       this.isSearchFullSettings = true

      //     })
      // }




    },

    // Удалить выбранного контрагента в широкой фильтрации
    deleteCurrentCounterparty() {
      this.searchFullSetting.inn = ""
      this.searchFullSetting.ogrn = ""
      this.Counterparty = null
      this.searchFullSetting.counterparty = ""
    }
  }
}
</script>
    
    
<style  scoped>
.textarea {
  border: 1px solid #A0A0A0 !important;
}

.filter {
  background: rgb(241, 241, 241);
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  border-radius: 8px;
}

.dnr2,
.dnr {
  padding: 1% 2%;
  background: rgb(233, 233, 233);
  border-radius: 4px;
  box-shadow: 2px 5px 10px grey;
  margin: 1%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.dnr>label,
.dnr2>label {
  font-weight: normal;
}




.section_category,
.section_date,
.inn_ogrn,
.income_expense {
  padding: 10px;
  width: 80%;
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
  max-height: 90vh;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #e4e4e4;
  position: relative;
  left: 50%;
  padding: 1%;
  transform: translate(-50%, 0);
  box-sizing: border-box;
  overflow: auto;
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
  background: rgb(235, 235, 235);
}

li span {
  padding-left: 3%;
}
</style>
    
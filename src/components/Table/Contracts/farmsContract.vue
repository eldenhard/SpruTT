<template>
  <div class="air_block">
    <Loader :loader="loader" />
    <div class="air_block_header">
      <h5>Справочник договоры</h5>
    </div>
    <hr>



    <section class="search_bloc">
      <div class="long_search">
        <input type="text" placeholder="Поиск..." @input="IputProcessing($event.target.value)">
        <button class="Request" @click="sendRequestToServerData()">Найти</button>
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
              <select name="" id="">
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
              <input type="date" class="textarea">
            </div>
          </div>
          <hr>
          <div class="inn_ogrn">
            <div class="left_section">
              <p>ИНН/ОГРН</p>
            </div>
            <div class="right_section">
              <input type="number" class="textarea" placeholder="ИНН">
              <input type="number" class="textarea" placeholder="ОГРН">
            </div>
          </div>
          <hr>
          <div class="income_expense">
            <div class="left_section">
              <p>Вариант документа:</p>
            </div>
            <div class="right_section">
              <label for="income"><input type="checkbox" id="income"> Доходный </label>
              <label for="expenses"><input type="checkbox" id="expenses"> Расходный </label>
            </div>
          </div>
          <hr>
        </div>
      </Transition>
    </section>


    <!-- <button class="Accept" @click="getFarmContract()"> Запросить договора </button> -->


    <div style=" width: 15vw;">
      <MultiSelectUni @change="updateSelectedCountries" :placeholder="'Поля таблицы'" :variants="CountrieObj"
        :variant-title="'value'">
      </MultiSelectUni>
    </div>


    <div style="display: flex; justify-content: start; flex-wrap: wrap;">
      <p style="padding-left: 1%;">Выбранные поля :</p> <br>
      <!-- <template v-if="selectedCountries"> -->
      <template>

        <span class="option_select_block_check" v-for="countrie in selectedCountries" :key="countrie.id"
          @click="removeselectedCountries(countrie.id)">
          <span style="color: black; font-size: 15px"> &#43;</span>
          {{ countrie.value }}
        </span>
      </template>
    </div>
    <br /><br />
    <p class="amount">всего записей: {{ total_objects }}</p>
    <p class="amount">всего на странице: {{ amount }}</p>

    <br>

    <div style="
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        max-height: 70vh;      
      ">
      <table class="table table-sm table-bordered table-hover" id="table"
        style="margin: 0; border: 1px solid black; width: 100%; border-collapse: collapse;">
        <thead>
          <tr
            style="position: sticky; top: 0; margin-top: -10px; padding-top: -5%; background: rgb(150, 150, 150); z-index: 5;">
            <th style="background: rgb(150, 150, 150) !important;">Контрагент</th>
            <th style="background: rgb(150, 150, 150) !important;">Номер договора</th>
            <th style="background: rgb(150, 150, 150) !important;">Срок действия договора</th>
            <th style="background: rgb(150, 150, 150) !important;">Файл</th>
            <template v-for="countrie in selectedCountries">
              <th :key="countrie.id" style="background: rgb(150, 150, 150) !important;">{{ countrie.value }}</th>
            </template>
          </tr>

        </thead>
        <tbody id="tableMain">
          <template v-for=" el in this.farmDirecory">
            <tr :key="el.id" style="border-top: 2px solid black;">
              <td>{{ el.counterparty }} </td>
              <td>{{ el.number }}</td>
              <td>{{ el?.expiration_date?.split(" ")[0].split('-').reverse().join(".") }}</td>

              <td>
                <a @click="CopyTEXT(el.scan_path)">
                  <img src="../../../assets/word.png" alt="" height="30">
                </a>
              </td>
              <template v-for="countrie in selectedCountries">
                <td :key="countrie.id">
                  {{ CustomerRow(el[countrie.valen]) }}
                </td>

              </template>
            </tr>
            <template>
              <tr style="background: lightgray;">
                <th>Приложение</th>
                <th>Номер приложения</th>
                <th>Дата приложения</th>
              </tr>
              <tr style="border-bottom: 2px solid black;">
                <td>{{ el.annex }}</td>
                <td>{{ el.annex_number }}</td>
                <td>{{ el?.annex_date?.split(" ")[0].split('-').reverse().join(".") }}</td>
              </tr>
            </template>

          </template>
        </tbody>
      </table>


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
      intervalresponse: null,

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
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      allGroups: (state) => state.auth.groups,
      staffGlobal: (state) => state.auth.users,
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
    IputProcessing(val) {
      clearTimeout(this.intervalresponse);

      // Установка нового таймера на 2 секунды
      this.intervalresponse = setTimeout(() => {
        // Выполняется после остановки ввода на 2 секунды
        this.sendRequestToServerData(val);
      }, 1000);
    },
    sendRequestToServerData(val) {
      if(!val) return
      api.getAllDocumentsNotType(val)
        .then(response => {
          console.log(response)
        }).catch((err) => {
          console.log(err)
        })
    },
    CopyTEXT(value) {
      navigator.clipboard.writeText(value)
        .then(() => {
          // alert('Данные скопированы')
        })

      this.loader = true
      let data = {
        dir_path: value
      }
      let path
      api.getFilesToPath(data)
        .then(res => {
          path = res.data[0].path
        }).then(() => {
          let data = {
            file_path: path
          }
          console.log(path)
          api.getFilesToPath2(data)
            .then(response => {
              this.loader = false
              console.log(response)
              let a = document.createElement('a')
              a.href = response.data.link
              a.click()
            }).catch((er) => {
              this.loader = false
            })
        }).catch((er) => {
          this.loader = false
        })

    },

    updateSelectedCountries(selected) {
      this.selectedCountriesIds = selected
    },
    removeselectedCountries(id) {
      this.selectedCountriesIds.splice(this.selectedCountriesIds?.indexOf(id), 1)
    },


  }
}
</script>
    
    
<style  scoped>
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
</style>
    
<template>
  <div>
    <FilterFarms @updateFilterDataFarms="updateFilterDataFarms" :btnClickHadlerEnter="getFarmContract"></FilterFarms>
    <ModalContractCreate :id="CurrentPathApi" :btnClickHandler="getFarmContract" />
    <Annexes :contract="contract_number" :btnClickHandler="getFarmContract" :id="CurrentPathApi3" />
    <EditAnnexe :contract="contract_number" :annex="editAnnexe" :btnClickHandler="getFarmContract"
      :id="CurrentPathApi4" />
    <EditContract :contract="contract_number" :contract_data="editContract" :id="CurrentPathApi2"
      :btnClickHandler="getFarmContract" />
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass"
      id="notif" />
    <Loader :loader="loader"></Loader>
    <div class="flex_block_button">
      <button class="Accept" @click="getFarmContract()"> Запросить договора </button>
      <!-- <button class="Cancel" @click="CreateContract()"> Добавить договор </button> -->
    </div>

    <div>
                <label for="tenant" style="color: grey">Поля таблицы
                    <MultiSelectUni @change="updateSelectedCountries" :placeholder="'Поля таблицы'" :variants="CountrieObj"
                        :variant-title="'value'">
                    </MultiSelectUni>
                </label>

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
      <table class="table table-sm table-bordered table-hover" id="table" style="margin: 0; border: 1px solid black; width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="position: sticky; top: 0; margin-top: -10px; padding-top: -5%; background: rgb(150, 150, 150); z-index: 5;">
            <!-- <th>Действие</th> -->
            <th>Контрагент</th>
            <th>Номер договора</th>
            <!-- <th>Статус ТТ по договору</th> -->
            <!-- <th>Дата заключения</th> -->
            <!-- <th>Отдел инициатора</th> -->
            <!-- <th>Вид договора</th> -->
            <!-- <th>Предмет договора</th> -->
            <!-- <th>Сумма договора</th> -->
            <th>Срок действия договора</th>
            <!-- <th>Пролонгация</th> -->
            <!-- <th>Статус</th> -->
            <!-- <th>Скан-копия</th> -->
            <!-- <th>Категория</th> -->
            <!-- <th>Примечание</th> -->
            <!-- <th>Ответственный</th> -->
            <th>Путь</th>
            <template v-for="countrie in selectedCountries">
            <th :key="countrie.id">{{ countrie.value }}</th>
</template>
          </tr>

        </thead>
        <tbody id="tableMain">
          <template v-for=" el in this.farmDirecory">
            <tr :key="el.id" style="border-top: 2px solid black;">
              <!-- <td>
                <b-dropdown id="dropdown-1" text="Действие договор" size="sm" style="width: 95% !important;">
                  <b-dropdown-item @click="DeleteCurrentContract(el.id)">Удалить</b-dropdown-item>
                  <b-dropdown-item @click="EditCurrentContract(el.number, el.id)">Редактировать</b-dropdown-item>
                </b-dropdown>
              </td> -->
              <td>{{ el.counterparty }} </td>

              <td>{{ el.number }}</td>
              <!-- <td>{{ el.company_status }}</td> -->
              <!-- <td>{{ el?.created_at?.split(" ")[0].split('-').reverse().join(".") }}</td> -->
              <!-- <td>{{ el.department }}</td> -->
              <!-- <td>{{ el.contract_type }}</td> -->
              <!-- <td>{{ el.contract_object }}</td> -->
              <!-- <td>{{ el.fiat_amount }}</td> -->
              <td>{{ el?.expiration_date?.split(" ")[0].split('-').reverse().join(".") }}</td>
              <!-- <td>{{ el.prolongation ? 'Да' : 'Нет' }}</td> -->
              <!-- <td>{{ el.is_active ? 'Активный' : 'Неактивный' }}</td> -->
              <!-- <td >
             <a :href="el.scan" target="_blank" v-if="el.scan"><img style="height: 30px" src="@/assets/pdf.png" alt="скан"/></a>
            </td> -->
              <!-- <td>{{ CategoryTranslate(el.category) }}</td> -->
              <!-- <td>{{ el.comment }}</td> -->
              <!-- <td>{{ ChangeIdByName(el.responsible) }}</td> -->
              <td>
                <a :href="'file://' + el.scan_path" @click="CopyTEXT(el.scan_path)">
                  Путь к файлу
                </a>
              </td>
             <template v-for="countrie in selectedCountries">
                        <td  :key="countrie.id">
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

    <div style="display: flex; justify-content: space-around; margin-top: 2%">
      <button class="Cancel" style="width: 20%" v-if="prevLink" @click="goToPage(prevLink)">
        назад
      </button>
      <button class="Cancel" style="width: 20%" v-if="nextLink" @click="goToPage(nextLink)">
        вперед
      </button>
    </div>
  </div>
</template>
    
<script>
import api from "@/api/directory";
import apiCounter from "@/api/counterparties"
import apiRep from '@/api/report'
import { mapState } from "vuex";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import groups from "@/helpers/groups";
import FilterFarms from "@/components/filter/contractFilter/filter_farms.vue";
import ModalContractCreate from '@/components/Table/Contracts/CreateContract/ModalWindow.vue'
import Annexes from "./CreateContract/Annexes.vue";
import { getUserById } from "@/helpers/getAllUsers";
import EditAnnexe from "@/components/Table/Contracts/CreateContract/EditAnnexe.vue"
import EditContract from "./CreateContract/EditContract.vue";
import MixinTest from "@/mixins/mixin-test.js"
import MultiSelectUni from '@/components/ui/MultiSelectUni.vue'

export default {
  name: "PartnerTable",
  props: ['named', 'namo'],
  mixins: [MixinTest],
  components: { Loader, Notifications, FilterFarms, ModalContractCreate, Annexes, EditAnnexe, EditContract, MultiSelectUni },
  data() {
    return {
      // Для модальных окон
      current_id_by_modal: '',
      current_id_by_annexes: '',
      current_id_by_editannexe: '',
      current_id_by_editcontract: '',

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
      users: [],
      userok: [],
      // Для компонента editAnnexe
      editAnnexe: [],
      // Для компонента editContract
      editContract: [],
    };
  },
  mounted() {
    // this.getFarmContract();
    // this.loader = true
    // this.log()
    // setTimeout(() =>  this.loader= false, 6500)

  },
  methods: {
    CopyTEXT(value){
      navigator.clipboard.writeText(value)
      .then(() => {
        alert('Данные скопированы')
      })
    },
    CustomerRow(value) {
            if (value === true || value === false) {
                return value === true ? 'Актуальный' : 'Не актуальный'
            } else {
                return value

            }
        },
    updateSelectedCountries(selected) {
            this.selectedCountriesIds = selected
        },
             removeselectedCountries(id) {
            this.selectedCountriesIds.splice(this.selectedCountriesIds.indexOf(id), 1)
        },
    ChangeIdByName(id) {
      this.users = this.$store.state.users.users
      const users = getUserById(this.users, id)
      if (users[0]) {
        return users[0]?.last_name + " " + users[0]?.first_name[0] + ".";
      }
      return "";
    },
    ChangeIdCounterByName(id) {
      let count_data = this.$store.state.counterparties.counterparties
      const counterpart = getUserById(count_data, id)
      if (counterpart[0]) {
        return counterpart[0]?.work_name;
      }
      return "";
    },
    CategoryTranslate(name) {
      switch (name) {
        case 'economic':
          return 'Общехозяйственные'
          break;
        case 'repair':
          return 'Ремотные'
          break;
        case 'buyer':
          return 'С покупателем'
          break;
        case 'financial':
          return 'Финансовые'
          break;
        case 'supply':
          return 'С поставщиками'
          break;
        case 'other ':
          return 'Другие'
          break;
      }
    },
    DeleteCurrentContract(id) {
      this.loader = true
      api.deleteCurrentContract(id)
        .then(response => {
          this.DeleteGetFarmContract()
          this.loader = false
          this.notifyHead = "Успешно";
          this.notifyMessage = "Договор удален";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 2500);
        }).catch(error => {
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Договор не удален, повторите операцию";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 2500);
          this.loader = false
        })
    },
    deleteCurrentAnnexes(id) {
      this.loader = true
      api.deleteCurrentAnnex(id)
        .then(response => {
          let table_tr = document.getElementById(id)
          table_tr.remove();
          this.notifyHead = "Успешно";
          this.notifyMessage = "Приложение к договору удалено";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 2500);
          // this.getFarmContract()
          this.loader = false
        }).catch(error => {
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Приложение к договору не удалено, повторите операцию";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 2500);
          this.loader = false
        })
    },
    CreateContract() {
      this.$bvModal.show(this.CurrentPathApi) ///////////////////////
    },
    CreateAnnex(number) {
      this.contract_number = number
      this.$bvModal.show(this.CurrentPathApi3) /////////////////////////
    },
    // Редактирование договора
    EditCurrentContract(number, id) {
      this.loader = true
      this.contract_number = number
      api.getCurrentContract(id)
        .then(response => {
          this.editContract = response.data
          // console.log(response.data)
          this.loader = false
          // console.log(this.CurrentPathApi2)
          this.$bvModal.show(this.CurrentPathApi2) ////////////////////////
        }).catch(error => {
          // console.log(error)
          this.loader = false
        })

    },
    OpenModalEditAnnexe(number, id) {
      this.loader = true
      this.contract_number = number
      apiRep.getContractAnnex(id)
        .then(response => {
          this.editAnnexe = response.data
          this.loader = false
          this.$bvModal.show(this.CurrentPathApi4) /////////////////////////////////
        }).catch(error => {
          // console.log(error)
          this.loader = false
        })
    },
    getGroupName(group) {
      return groups.groups[group];
    },
    goToPage(link) {
      let url = new URL(link);
      let pageNumber = url.searchParams.get("page");
      if (pageNumber != null) {
        this.filter_farms.page = pageNumber;
      } else {
        delete this.filter_farms.page;
      }
      this.getFarmContract();
    },
    DeleteGetFarmContract() {
      api.getDirectoryFarm(this.CurrentPathApi, this.filter_farms)
        .then((response) => {
          let l_data = response.data.data;
          l_data.forEach((item) => {
            item.hhh = true;
          })
          this.farmDirecory = l_data;
          this.total_objects = response.data.total_objects;
          this.amount = response.data.amount;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    getFarmContract() {
      this.loader = true;
      api.getDirectoryFarm(this.CurrentPathApi, this.filter_farms)
        .then((response) => {
          this.loader = false;
          let l_data = response.data.data;
          l_data.forEach((item) => {
            item.hhh = true;
          })
          this.farmDirecory = l_data;
          // console.log(this.farmDirecory, 'SCAN')
          this.total_objects = response.data.total_objects;
          this.amount = response.data.amount;
          this.nextLink = response.data.links.next;
          this.prevLink = response.data.links.previous;

          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные отфильтрованы";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(this.closeNotification, 2500);
        })
        .catch((err) => {
          this.loader = false;
          // console.log(err)
          this.notifyHead = "Ошибка";
          this.notifyMessage = "Данные не отфильтрованы, попробуйте еще раз";
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(this.closeNotification, 2500);
        });
    },

    closeNotification() {
      this.showNotify = false;
    },
    updateFilterDataFarms(filter_farms) {
      this.filter_farms = filter_farms;
    },

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
    CurrentPathApi() {
      switch (this.named) {
        case 'Общехозяйственные':
          return 'economic'
          break;
        case 'Ремонтные':
          return 'repair'
          break;
        case 'Прочие':
          return 'other'
          break;
        case 'С покупателем':
          return 'buyer'
          break;
        case 'С поставщиками':
          return 'supply'
          break;
        case 'Финансовые':
          return 'financial'
          break;
      }
    },

    // Для редактиварония договора
    CurrentPathApi2() {
      switch (this.named) {
        case 'Общехозяйственные':
          return 'economic_ed_contr'
          break;
        case 'Ремонтные':
          return 'repair_ed_contr'
          break;
        case 'Прочие':
          return 'other_ed_contr'
          break;
          case 'С покупателем':
          return 'buyer_ed_contr'
          break;
        case 'С поставщиками':
          return 'supply_ed_contr'
          break;
        case 'Финансовые':
          return 'financial_ed_contr'
          break;
      }
    },

    // Для создания приложения
    CurrentPathApi3() {
      switch (this.named) {
        case 'Общехозяйственные':
          return 'economic_annexes'
          break;
        case 'Ремонтные':
          return 'repair_annexes'
          break;
        case 'Прочие':
          return 'other_annexes'
          break;
        case 'Финансовые':
          return 'financial_annexes'
          break;
      }
    },

    // Для редактирования приложения
    CurrentPathApi4() {
      switch (this.named) {
        case 'Общехозяйственные':
          return 'economic_ed_annexes'
          break;
        case 'Ремонтные':
          return 'repair_ed_annexes'
          break;
        case 'Прочие':
          return 'other_ed_annexes'
          break;
        case 'Финансовые':
          return 'financial_ed_annexes'
          break;
      }
    },
  },
};
</script>
    
    
<style lang="scss" scoped>
div::-webkit-scrollbar {
  transform: translateY(-1);
}
.flex_block_button {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-top: 2%;

  button {
    width: 30%;
  }

  button:nth-child(2) {
    border-radius: 5px;
  }
}

.red {
  display: none;
}

.amount {
  text-align: left;
}

.td-btr {
  padding: 0 !important;
  vertical-align: middle !important;
}

.annexes {
  display: none;
}
</style>
    
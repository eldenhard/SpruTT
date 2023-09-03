<template>
  <div style="margin-top: 5% !important">
    <p class="explanation">
      * Для сохранения данных в таблице данных по нормативам, при изменении
      ячейки нажмите Enter 
    </p>
    <Loader :loader="loader" />
    <div class="air_block">
      <div class="air_block_header" style="
          display: flex !important;
          justify-content: space-between !important;
          width: 100%;
        ">
        <h5>Данные по нормативам</h5>
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
            <div style="display: flex; justify-content: space-between;">
              <input type="radio" id="one" value="agreement" v-model="picked">
              <label for="one">Договор</label>
              <br>
              <input type="radio" id="two" value="annex" v-model="picked">
              <label for="two">Приложение</label>
              <br>
            </div>

            <input type="text" class="textarea" v-model.trim="Standard.agreement"
              :placeholder="placeholderAgreement" v-show="visible_inp_ag" />
            <input type="text" class="textarea" v-model.trim="Standard.agreement" :placeholder="placeholderAgreement"
              v-show="visible_inp_an" />
          </td>
        </tr>
        <br />


        <tr v-show="visible_agreement">
          <td class="col1">Все договора</td>
          <td>
            <select name="" id="" v-model="agreement_number_test" @change="test()">
              <option :value="[item.agreement_number, item.client, item.id]" v-for="item in all_agreement_number"
                :key="item.id">{{ item.agreement_number }} {{
                  item.client }} {{ item.on_date }} </option>
            </select>
          </td>
        </tr>
        <br />
        <!-- <tr>
          <td>№ документа</td>
          <td>
            <input
              type="text"
              id="n"
              class="textarea"
              v-model.trim="Standard.agreement"
              placeholder="№ договора"
            />
          </td>
        </tr>
        <br /> -->

        <tr>
          <td class="col1">Дата договоренности</td>
          <td>
            <input type="date" id="ln" class="textarea" v-model="Standard.agreement_date" />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Дата окончания</td>
          <td>
            <input type="date" id="a" class="textarea" v-model="Standard.end_date" placeholder="Дата окончания" />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Примечание</td>
          <td>
            <input type="text" id="a" class="textarea" v-model="Standard.note" placeholder="Примечание" />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Норматив по выгрузке, дн</td>
          <td>
            <input type="number" id="a" class="textarea" v-model="Standard.standard_unloading"
              placeholder="Норматив в днях" />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Норматив по погрузке, дн</td>
          <td>
            <input type="number" id="a" class="textarea" v-model="Standard.standard_loading"
              placeholder="Норматив в днях" />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Штраф по выгрузке, руб</td>
          <td>
            <input type="number" id="a" class="textarea" v-model="Standard.penalty_unloading" placeholder="Штраф в руб" />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Штраф на погрузке, руб</td>
          <td>
            <input type="number" id="a" class="textarea" v-model="Standard.penalty_loading" placeholder="Штраф в руб" />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Примечание по расчету</td>
          <td>
            <input type="text" id="a" class="textarea" v-model="Standard.note_calc" placeholder="Примечание" />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Тип вагона</td>
          <td>
            <select v-model="Standard.wagon_type" :placeholder="'выберите тип вагона'" class="textarea">
              <option :value="'Полувагон'">ПВ</option>
              <option :value="'Цистерна'">ЦС</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td class="col1">Клиент</td>
          <td>
            <input type="text" id="a" class="textarea" v-model="Standard.client"
              placeholder="Введите наименование клиента" />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div class="textarea" style="height: auto; width: 100%; margin-top: 2%" v-show="ten_visible">
              <ul id="root_tenant">
                <li v-for="item in filter_client" :key="item.id" @click="chechClient(item.client)">
                  <span>{{ item.client }}</span>
                  <hr />
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </table>

      <button class="button Accept" @click="postData()" v-show="visible">
        Отправить данные
      </button>
      <br />
    </div>

    <StandartTableCreated style="margin-top: 5%" />
    <Notifications :show="showNotify" :header="notifyHead" :message="notifyMessage" :block-class="notifyClass" />
  </div>
</template>

<script>
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";
import StandartTableCreated from "./StandartTableCreated";
import { mapState } from "vuex";
export default {
  name: "StandartData",
  components: { Loader, Notifications, StandartTableCreated },
  data() {
    return {
      rows: 1,
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      ten_visible: false,
      visible: true,
      picked: 'agreement',
      visible_inp_ag: true,
      visible_inp_an: false,
      placeholderAgreement: 'введите номер договора',
      all_agreement_number: "",
      agreement_number_test: "",
      visible_agreement: false,

      Standard: {
        agreement: null,
        base: null,
        agreement_date: null,
        end_date: null,
        is_actual: true,
        note: null,
        standard_loading: null,
        standard_unloading: null,
        penalty_loading: null,
        penalty_unloading: null,
        note_calc: null,
        client: "",
        wagon_type: null,
      },
    };
  },
  computed: {
    ...mapState({
      name_client: (state) => state.client.name_client
    }),

    filter_client() {

      if (this.Standard.client.length > 1) {
        this.ten_visible = true;
      }

      return this.Standard.client.length > 1
        ? this.name_client.filter((item) =>
          item.client.toLowerCase().includes(this.Standard.client.toLowerCase())
        )
        : "";
    },
  },
  mounted() {
    document.body.addEventListener('click', this.closeWindow)
    this.getAllStandardDog()
  },
  watch: {
    picked() {
      if (this.picked == 'agreement') {
        this.placeholderAgreement = 'введите номер договора'
        this.visible_agreement = false
        this.visible_inp_ag = true
        this.visible_inp_an = false
        this.Standard.agreement = ""
        this.agreement_number_test = ""
      } else {
        this.placeholderAgreement = 'введите номер приложения'
        this.visible_agreement = true
        this.visible_inp_ag = false
        this.visible_inp_an = true
        this.Standard.agreement = ""
      }
    }
  },
  methods: {
    getAllStandardDog(){
      api.getAllStandardDog()
            .then(response => {
                let data = response.data.data
                let arr = []
                for (let i in data) {
                    arr.push({
                        'agreement_number': data[i].agreement,
                        'client': data[i].client,
                        'on_date': data[i].agreement_date,
                        'id': data[i].id,
                    })
                }
               this.all_agreement_number = arr.reduce((acc, item) => {
                    if (!acc.find(value => value.agreement_number == item.agreement_number)) {
                        acc.push(item);
                    }
                    return acc;
                }, []);
                // console.log(this.all_agreement_number)
                this.loader = false

            }).catch(error => {
                this.loader = false
                console.log(error)
            })
    },
    test(){
      this.Standard.client = this.agreement_number_test[1]
      this.Standard.base = this.agreement_number_test[2]
      console.log(this.Standard)

    },
    closeWindow() {
      this.ten_visible = false
    },
    chechClient(item) {
      this.Standard.client = item;
      this.ten_visible = false;
    },
    postData() {
      this.loader = true
      if (this.Standard.standard_loading == "") {
        this.Standard.standard_loading = null
      }
      if (this.Standard.standard_unloading == "") {
        this.Standard.standard_unloading = null
      }
      if (this.Standard.penalty_loading == "") {
        this.Standard.penalty_loading = null
      }
      if (this.Standard.penalty_unloading == "") {
        this.Standard.penalty_unloading = null
      }
      // console.log(this.Standard)
      api
        .postPenaltyStandards(this.Standard)
        .then((response) => {
          this.getAllStandardDog()
          this.loader = false
          this.notifyHead = "Успешно";
          this.notifyMessage = "Данные отправлены";
          this.notifyClass = "wrapper-success";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 2000);
        })
        .catch((error) => {
          this.loader = false
          this.notifyHead = "Ошибка";
          this.notifyMessage = error.response.data;
          this.notifyClass = "wrapper-error";
          this.showNotify = true;
          setTimeout(() => (this.showNotify = false), 3000);
        });

    },
  },
};
</script>

<style lang="scss" scoped>
tr,
td,
th {
  border: none;
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

.Accept {
  margin-left: auto;
  width: 25%;
  margin-right: 2%;
  margin-bottom: 2% !important;
}

.air_block {
  width: 60%;
  height: auto;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -25px 25px 41px #cfcfcf, 25px -25px 41px #ffffff;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.air_block_header {
  padding: 1% 0 0 2%;
  color: rgb(202, 202, 202);
}

li {
  cursor: pointer;
}
</style>
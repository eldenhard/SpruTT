<template>
  <div style="margin-top: 5% !important">
    <Loader :loader="loader" />
    <div class="air_block">
      <div class="air_block_header">
        <h5>Данные по нормативам</h5>
        <hr />
      </div>
      <br />

      <table>
        <tr>
          <td>Договор</td>
          <td>
            <input
              type="text"
              id="n"
              class="textarea"
            
              v-model="Standard.agreement"
              placeholder="№ договора"
            />
          </td>
        </tr>
        <br>

        <tr>
          <td  class="col1">Дата договоренности</td>
          <td>
            <input
              type="date"
              id="ln"
              class="textarea"
             :class="{errorNote : isError}"
              v-model="Standard.agreement_date"
            />
          </td>
        </tr>
        <br>

        <tr>
          <td  class="col1">Актуальность</td>
          <td>
            <input
              type="checkbox"
              id="a"
              class="textarea"
              v-model="Standard.is_actual"
            />
          </td>
        </tr>
        <br>

        <tr>
          <td  class="col1">ДС</td>
          <td>
            <input
              type="text"
              id="a"
              class="textarea"
              v-model="Standard.agreement_addictions"
              placeholder="№ ДС"
            />
          </td>
        </tr>
        <br>

        <tr>
          <td class="col1">Примечание</td>
          <td><input type="text" id="a"  class="textarea" v-model="Standard.note"  placeholder="Примечание"/></td>
        </tr>
        <br>

        <tr>
          <td  class="col1">Норматив по выгрузке, дн</td>
          <td><input type="text" id="a"  class="textarea"  v-model="Standard.standard_unloading"  placeholder="Норматив в днях" :class="{errorNote : isError4}"/></td>
        </tr>
        <br>

        <tr>
          <td  class="col1">Норматив по погрузке, дн</td>
          <td><input type="text" id="a"  class="textarea" v-model="Standard.standard_loading" placeholder="Норматив в днях" :class="{errorNote : isError5}"/></td>
        </tr>
        <br>

        <tr>
          <td class="col1">Штраф по выгрузке, руб</td>
          <td><input type="text" id="a"   class="textarea" v-model="Standard.penalty_unloading" placeholder="Штраф в руб" :class="{errorNote : isError2}"/></td>
        </tr>
        <br>

        <tr>
          <td class="col1">Штраф на погрузке, руб</td>
          <td><input type="text" id="a"  class="textarea" v-model="Standard.penalty_loading" placeholder="Штраф в руб" :class="{errorNote : isError3}"/></td>
        </tr>
        <br>

        <tr>
          <td class="col1">Примечание по расчету</td>
          <td><input type="text" id="a"  class="textarea" v-model="Standard.note_calc" placeholder="Примечание"/></td>
        </tr>
        <br>

        <tr>
          <td class="col1">Тип вагона</td>
          <td> <select v-model="Standard.wagon_type" :placeholder="'выберите тип вагона'"  class="textarea">
            <option :value="'Полувагон'">ПВ</option>
            <option :value="'Цистерна'">ЦС</option>
          </select></td>
        </tr>
        <br>
        <tr>
          <td class="col1">Клиент</td>
          <td> <input type="text" id="a" class="textarea" v-model="Standard.client" placeholder="Введите наименование клиента"/></td>
        </tr>
        <tr>
          <td></td>
          <td><div
            class="textarea"
            style="height: auto; width: 100%; margin-top: 2%;"
            v-show="ten_visible"
          >
            <ul id="root_tenant">
              <li
                v-for="item in filter_client"
                :key="item.id"
                @click="chechClient(item.work_name)"
              >
                <span>{{ item.work_name }}</span>
                <hr />
              </li>
            </ul>
          </div></td>
        </tr>
      </table>
      
      <button class="button Accept" @click="postData(Standard)">
            Отправить данные
          </button>
          <br>
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
import api from "@/api/directory";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  name: "StandartData",
  components: { Loader, Notifications },
  data() {
    return {
      rows: 1,
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
      ten_visible: false,
      isError: false,
      isError2: false,
      isError3: false,
      isError4: false,
      isError5: false,

      Standard: {
        agreement: "",
        agreement_date: "",
        is_actual: true,
        agreement_addictions: "",
        note: "",
        standard_loading: "",
        standard_unloading: "",
        penalty_loading: "",
        penalty_unloading: "",
        note_calc: "",
        client: "",
        wagon_type: "",
      },
    };
  },
  computed: {
    filter_client() {
      if (this.Standard.client.length > 1) {
        this.ten_visible = true;
      }
      return this.Standard.client.length > 1
        ? this.$store.state.counterparties.counterparties.filter((item) =>
            item.work_name
              .toLowerCase()
              .includes(this.Standard.client.toLowerCase())
          )
        : "";
    },
  },
  methods: {
    chechClient(item) {
      this.Standard.client = item;
      this.ten_visible = false;
    },
    postData(arr) {
      this.loader = true
      if (this.Standard.agreement_date == "") {
        this.loader = false
        this.isError = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Заполните поля формы";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 3000);
      }
      if (this.Standard.penalty_loading == "") {
        this.loader = false
        this.isError2 = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Заполните поля формы";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 3000);
      }
      if (this.Standard.penalty_unloading == "") {
        this.loader = false
        this.isError3 = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Заполните поля формы";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 3000);
      }
      if (this.Standard.standard_loading == "") {
        this.loader = false
        this.isError4 = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Заполните поля формы";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 3000);
      }
      if (this.Standard.standard_unloading == "") {
        this.loader = false
        this.isError5 = true;
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Заполните поля формы";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 3000);
      } else {
        api
          .postPenaltyStandards(arr)
          .then((response) => {
            this.loader = false
            this.isError = false
            this.isError2 = false
            this.isError3 = false
            this.isError4 = false
            this.isError5 = false
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
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input, select{
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
.air_block_header > h5 {
  padding: 1% 0 0 2%;
  color: rgb(202, 202, 202);
}

li {
  cursor: pointer;
}

</style>
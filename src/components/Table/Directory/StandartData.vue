<template>
  <div style="margin-top: 5% !important">
    <p class="explanation">
      * Для сохранения данных в таблице данных по нормативам, при изменении
      ячейки нажмите Enter
    </p>
    <Loader :loader="loader" />
    <div class="air_block">
      <div
        class="air_block_header"
        style="
          display: flex !important;
          justify-content: space-between !important;
          width: 100%;
        "
      >
        <h5>Данные по нормативам</h5>
        <h6
          v-on:click="visible = !visible"
          style="padding-right: 4%; cursor: pointer"
        >
          {{ visible ? "Свернуть " : "Развернуть" }}
        </h6>
      </div>
      <hr />
      <br />

      <table v-show="visible">
        <tr>
          <td>№ документа</td>
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
        <br />

        <tr>
          <td class="col1">Дата договоренности</td>
          <td>
            <input
              type="date"
              id="ln"
              class="textarea"
              :class="{ errorNote: isError }"
              v-model="Standard.agreement_date"
            />
          </td>
        </tr>
        <br />

        <!-- <tr>
          <td class="col1">ДС</td>
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
        <br /> -->

        <tr>
          <td class="col1">Примечание</td>
          <td>
            <input
              type="text"
              id="a"
              class="textarea"
              v-model="Standard.note"
              placeholder="Примечание"
            />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Норматив по выгрузке, дн</td>
          <td>
            <input
              type="number"
              id="a"
              class="textarea"
              v-model="Standard.standard_unloading"
              placeholder="Норматив в днях"
              :class="{ errorNote: isError4 }"
            />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Норматив по погрузке, дн</td>
          <td>
            <input
              type="number"
              id="a"
              class="textarea"
              v-model="Standard.standard_loading"
              placeholder="Норматив в днях"
              :class="{ errorNote: isError5 }"
            />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Штраф по выгрузке, руб</td>
          <td>
            <input
              type="number"
              id="a"
              class="textarea"
              v-model="Standard.penalty_unloading"
              placeholder="Штраф в руб"
              :class="{ errorNote: isError2 }"
            />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Штраф на погрузке, руб</td>
          <td>
            <input
              type="number"
              id="a"
              class="textarea"
              v-model="Standard.penalty_loading"
              placeholder="Штраф в руб"
              :class="{ errorNote: isError3 }"
            />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Примечание по расчету</td>
          <td>
            <input
              type="text"
              id="a"
              class="textarea"
              v-model="Standard.note_calc"
              placeholder="Примечание"
            />
          </td>
        </tr>
        <br />

        <tr>
          <td class="col1">Тип вагона</td>
          <td>
            <select
              v-model="Standard.wagon_type"
              :placeholder="'выберите тип вагона'"
              class="textarea"
            >
              <option :value="'Полувагон'">ПВ</option>
              <option :value="'Цистерна'">ЦС</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td class="col1">Клиент</td>
          <td>
            <input
              type="text"
              id="a"
              class="textarea"
              v-model="Standard.client"
              placeholder="Введите наименование клиента"
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div
              class="textarea"
              style="height: auto; width: 100%; margin-top: 2%"
              v-show="ten_visible"
            >
              <ul id="root_tenant">
                <li
                  v-for="item in filter_client"
                  :key="item.id"
                  @click="chechClient(item.client)"
                >
                  <span>{{ item.client }}</span>
                  <hr />
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </table>

      <button
        class="button Accept"
        @click="postData()"
        v-show="visible"
      >
        Отправить данные
      </button>
      <br />
    </div>

    <StandartTableCreated style="margin-top: 5%" />
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
      isError: false,
      isError2: false,
      isError3: false,
      isError4: false,
      isError5: false,
      visible: true,

      Standard: {
        agreement: null,
        agreement_date: null,
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

  methods: {

    chechClient(item) {
      this.Standard.client = item;
      this.ten_visible = false;
    },
    postData() {
      this.loader = true
      if(this.Standard.standard_loading == ""){
        this.Standard.standard_loading = null
      }
      if(this.Standard.standard_unloading == ""){
        this.Standard.standard_unloading = null
      }
      if(this.Standard.penalty_loading == ""){
        this.Standard.penalty_loading = null
      }
      if(this.Standard.penalty_unloading == ""){
        this.Standard.penalty_unloading = null
      }
        api
          .postPenaltyStandards(this.Standard)
          .then((response) => {
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
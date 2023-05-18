<template>
  <div>
    <Loader :loader="loader" />
    <div class="air_block">
      <div class="air_block_content">
        <div class="air_block_header">
          <h5>Финансовый отчет №1</h5>
          <hr />
        </div>
        <p class="explanation">
          * Для создания отчета необходимо выставить даты начала и конца периода
          <br />
          * После выбора дат нажмимте на кнопку создать отчет, он придет на Вашу
          почту
        </p>
        <div class="air_block_content__textarea">
          <label for="">
            Начало периода <br />
            <input type="date" class="textarea" v-model="date_begin" />
          </label>
          <label for="">
            Конец периода <br />
            <input type="date" class="textarea" v-model="date_end" />
          </label>
        </div>
        <b-button variant="success" class="btn_create" @click="getFinRep1()"
          >Создать отчет</b-button
        >
      </div>
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
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

import api from "@/api/report.js";
export default {
  components: { Loader, Notifications },

  data() {
    return {
      date_begin: "",
      date_end: "",
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  methods: {
    getFinRep1() {
      if (this.date_begin == " " || this.date_end == "") {
        this.loader = false;

        this.notifyHead = "Ошибка";
        this.notifyMessage = "Укажите даты начала/конца периода";
        this.notifyClass = "wrapper-error";
        (this.showNotify = true),
          setTimeout(() => (this.showNotify = false), 2000);
      } else {
        this.loader = true;
        let date1 = this.date_begin + " 00:00:00";
        let date2 = this.date_end + " 23:59:59";
        api
          .getFinRep1(date1, date2)
          .then((response) => {
            this.loader = false;
            this.showNotify = true;
            this.notifyHead = "Успешно";
            this.notifyMessage = response.data;
            this.notifyClass = "wrapper-success";
            this.loader = false;
            setTimeout(() => (this.showNotify = false), 2000);
          })
          .catch((error) => {
            this.loader = false;
            this.showNotify = true;
            this.notifyHead = "Ошибка";
            this.notifyMessage = "Отчет не создан, попробуйте позднее";
            this.notifyClass = "wrapper-error";
            this.loader = false;
            setTimeout(() => (this.showNotify = false), 2000);
          });
      }
    },
  },
};
</script>

<style scoped>
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
  padding: 1% 0 0 0%;
  color: rgb(202, 202, 202);
}
.air_block_content {
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 4% 4% 0;
  gap: 20px;
  /* align-items: baseline; */
}
.air_block_content__textarea {
  display: flex;
  justify-content: space-between;
  gap: 5%;
}
.explanation {
  font-size: 14px;
  color: #9b9b9b;
}
label {
  color: grey;
}
.textarea {
  background: white;
}
.btn_create {
  width: 41%;
  height: 80%;
  font-size: 12px;
  margin-left: auto;
  margin-bottom: 4%;
}
/* input[type='date']{
    width: 100%;

} */
</style>
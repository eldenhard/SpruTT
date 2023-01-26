<template>
  <div>
    <Loader :loader="loader"/>
    <div class="container">
      <div role="group">
        <b-form-input
          id="input-live"
          v-model="name"
          :state="nameState"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Введите номер вагона"
          max-length="8"
          trim
          style="border: 1px solid grey !important"
        >
        </b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">
          номер вагона 8 символов
        </b-form-invalid-feedback>
        <b-button variant="primary" class="search" @click="getCurrentWagon()"
          >Найти</b-button
        >
      </div>

      <div class="about__wagon">
        <div class="about__wagon__first">
          <div class="about__wagon__first__num">
            <p class="about__wagon__text">
              <span class="a">№</span> {{ all.number }}
            </p>
          </div>
          <div class="about__wagon__first__path">
            <div style="display: flex; justify-content: space-around">
              <p class="about__wagon__text">
                {{ all.flight?.departure_station_name }}
              </p>
              <br />
              <p class="about__wagon__text">
                {{ all.flight?.destination_station_name }}
              </p>
            </div>
            <div class="steps-container">
              <div class="step-item"></div>
            </div>
            <br />
            <p class="about__wagon__text">
              <span class="a">Код груза</span> {{ all.flight?.cargo_code }}
              <br />
              <span class="a">Код станции назначения</span>
              {{ all.flight?.destination_station_code }}
              <br />
              <span class="a">Код станции отправения</span>
              {{ all.flight?.departure_station_code }}
              <br />
              <span class="a">Паспорт:</span>
              <a
                target="_blank"
                :href="all?.passport?.scan"
                v-if="all?.passport?.scan"
              >
                <img src="@/assets/pdf.png" alt="" width="25px !important" />
              </a>
            </p>
          </div>
        </div>

        <div class="about__wagon__first__type">
          <p class="about__wagon__text">
            <span class="a">Тип</span> {{ all.wagon_type }}
            <br />
            <span class="a">Активность</span> {{ all.is_active }}
            <br />
            <span class="a">Грузоотправитель</span>
            {{ all.flight?.invoice?.cargo_sender_name }}
            <br />
            <span class="a">Грузополучатель</span>
            {{ all.flight?.invoice?.cargo_recipient_name }}
            <br />
            <span class="a">Принадлежность</span> {{ all.belong?.name }}
            <br />
            <span class="a">Владелец</span> {{ all.belong?.owner_counterparty }}
            <br />
            <span class="a">Арендатор</span>
            {{ all.belong?.tenant_counterparty }}
            <br />
            <span class="a">Управляющий</span>
            {{ all.belong?.manager_counterparty }}
            <br />
            <span class="a">Управляющий</span>
            {{ all.belong?.manager_counterparty }}
            <br />
            <span class="a">Источник</span>
            {{ all.belong?.source_counterparty }}
          </p>
        </div>
      </div>
      <Notifications
        :show="showNotify"
        :header="notifyHead"
        :message="notifyMessage"
        :block-class="notifyClass"
        id="notif"
      />
    </div>
  </div>
</template>


<style scoped>
:root {
  --index: (1vw + 1vh);
  --grey: rgb(41, 41, 41);
  --lightgrey: rgb(207, 207, 207);
}

.steps-container {
  display: flex;
  height: 5px;
  width: 80%;
  gap: 14px;
  margin: 1% 5% 0 10%;
}

.step-item {
  flex: 1 1 0;
  width: 0;
  background: #dfdfdf;
  border-radius: 15px;
}

.step-item.loading {
  position: relative;
  overflow: hidden;
  z-index: 0;
}
.step-item.loading:before,
.step-item.loading:after,
.step-item.loading span {
  display: flex;
  position: absolute;
  transform: translateX(-100%);
  height: 100%;
  width: 100%;
  border-radius: 15px;
}

.step-item.loading span:before {
  content: "";
  display: inline-block;
  position: absolute;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #dfdfdf;
}

.a {
  color: rgb(173, 173, 173);
}
.about__wagon {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 5%;
}
.about__wagon__first {
  width: 100%;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
}
.about__wagon__first__num {
  border: 0.1px solid #dfdfdf !important;
  width: 100%;
  height: 5vh;
}
.about__wagon__first__type {
  border: 0.1px solid #dfdfdf !important;
  flex-grow: 5;
  width: 100%;
  background: rgb(255, 255, 255);
}
.about__wagon__first__path {
  border: 0.1px solid #dfdfdf !important;
  width: 100%;
  height: 28vh;
}
.about__wagon__text {
  padding-top: 2%;
  padding-left: 2%;
  color: rgb(65, 65, 65);
  font-weight: 700;
  font-size: 15px;
  line-height: 28px;
}
#input-live {
  width: 100%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
/* #input-live-feedback,
#input-live-help {
  width: 50%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
} */
.search {
  width: 10%;
  float: right;
}
</style>

<script>
import api from "@/api/wagonPark";
import Loader from "@/components/loader/loader.vue";
import Notifications from "@/components/notifications/Notifications.vue";

export default {
  computed: {
    nameState() {
      return this.name.length == 8 ? true : false;
    },
  },
  components: { Loader, Notifications },
  data() {
    return {
      name: "",
      all: "",
      loader: false,
      showNotify: false,
      notifyHead: "",
      notifyMessage: "",
      notifyClass: "",
    };
  },
  methods: {
    getCurrentWagon() {
      this.loader = true;
      if (this.name.length != 8) {
        this.notifyHead = "Ошибка";
        this.notifyMessage = "Введите корректный номер вагона";
        this.notifyClass = "wrapper-error";
        this.showNotify = true;
        setTimeout(() => (this.showNotify = false), 2000);
        this.loader = false;
      } else {
        api
          .getCurrentLastInfoWagon(this.name)
          .then((response) => {
            this.loader = false;
            this.all = response.data;
            this.notifyHead = "Успешно";
            this.notifyMessage = "Данные о вагоне загружены";
            this.notifyClass = "wrapper-success";
            this.showNotify = true;
            setTimeout(() => (this.showNotify = false), 2000);
          })
          .catch((error) => {
            this.loader = false;
            this.notifyHead = "Ошибка";
            this.notifyMessage = error.response.data;
            this.notifyClass = "wrapper-error";
            this.showNotify = true;
            console.log(error)
            setTimeout(() => (this.showNotify = false), 2000);
          });
      }
    },
  },
};
</script>
<template>
  <div style="background: #f8f9fd; height: 100vh">
    <Loader :loader="loader"></Loader>
    <div class="whoCurrentUser">
      <p class="currentUser">
        {{ user.user.last_name }} {{ user.user.first_name }}
      </p>
    </div>
    <hr />
    <div class="container">
      <b-card no-body>
        <b-tabs pills card vertical nav-wrapper-class="w-25">
          <b-tab title="Аккаунт" active style="height: 70vh !important">
            <b-card-text>
              <div class="userField9-description">
                <p class="userField9-description-text">Данные пользователя</p>
              </div>
              <hr style="width: 100% !important; margin: 0; padding: 0" />
              <div class="row">
                <div class="col-md-3">


                  <button class="Accept" @click="DownloadUserPhoto()"><span v-show="LoaderToTextVisible">{{ openPhoto }}</span>
                    <div class="sp sp-circle" v-show="LoaderButton"></div>
                  </button>
                  <img :src="current_photo" alt="фотография не загружена" width="100%" height="100%" v-show="photoUser"
                    style="margin-top: 1%;" />
                </div>
                <div class="col-md-9">
                  <div class="bg">
                    <input class="textarea" id="input-filter-staff1" name="Pwd" :value="user.user.email"
                      style="width: 100%; background: white" readonly />
                    <br />
                    <label for="input-filter-staff1" class="label"
                      style="margin-left: 10% !important; background: white">Логин (E-mail)</label>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="bg">
                        <input class="textarea" id="input-filter-staff1" name="Pwd" :value="user.user.last_name"
                          style="width: 100%; background: white" readonly />
                        <br />
                        <label for="input-filter-staff1" class="label"
                          style="margin-left: 5% !important; background: white">Фамилия</label>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="bg">
                        <input class="textarea" id="input-filter-staff1" name="Pwd" :value="user.user.first_name"
                          style="width: 100%; background: white" readonly />
                        <br />
                        <label for="input-filter-staff1" class="label"
                          style="margin-left: 5% !important; background: white">Имя</label>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="bg">
                        <input class="textarea" id="input-filter-staff1" name="Pwd" :value="user.user.middle_name"
                          style="width: 100%; background: white" readonly />
                        <br />
                        <label for="input-filter-staff1" class="label"
                          style="margin-left: 5% !important; background: white">Отчество</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="bg" style="background: white !important; float: left">
                      <!-- <input
                        class="textarea"
                        id="input-filter-staff2"
                        name="Pwd"
                        :value="getGroupName(user.user.group)" 
                        style="background: white"
                        readonly
                        v-for="personal in PersonalData.groups"
                        :key="personal.id"
                      />
                      <br />
                      <label
                        for="input-filter-staff2"
                        class="label"
                        style="background: white"
                        >Отдел</label
                      > -->
                      <!-- <br /><br /> -->
                      <input class="textarea" id="input-filter-staff3" name="Pwd" :value="user.user.post"
                        style="background: white" readonly />
                      <br />
                      <label for="input-filter-staff3" class="label" style="background: white">Должность</label>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Сотрудники" style="height: 70vh !important">
            <b-card-text>
              <div class="userField9-description">
                <p class="userField9-description-text">Ваши сотрудники</p>
              </div>
              <hr style="width: 100% !important; margin: 0; padding: 0" />
              <br />
              <div style="
                  width: 100%;
                  overflow-x: auto;
                  overflow-y: auto;
                  position: relative;
                  left: 50%;
                  transform: translate(-50%, 0);
                  margin-bottom: 3%;
                ">
                <table class="table table-sm table-bordered table-hover" style="table-layout: fixed">
                  <thead class="thead-light">
                    <tr>
                      <th>ФИО</th>
                      <th>Должность</th>
                      <th>Почта</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="em in emp" :key="em.post">
                      <td>
                        {{ em.last_name }} {{ em.first_name }}
                        {{ em.middle_name }}
                      </td>
                      <td>{{ em.post }}</td>
                      <td>{{ em.email }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Отчеты" style="height: 70vh !important">
            <LkReport> </LkReport>
          </b-tab>
          <b-tab title="Телеграммы" style="height: 70vh !important">
            <lkTelegram> </lkTelegram>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

    <br /><br />

    <div class="wrapper-alert" id="notifications-2" style="display: none">
      <div class="card">
        <div class="subject">
          <h5>Ошибка</h5>
          <p>Попробуйте получить доступ к личному кабинету позже</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/report";
import apiStaff from "@/api/staff";
import { getGroupName } from "@/helpers/getGroupName";
import Loader from "@/components/loader/loader.vue";
import LkReport from "@/components/Table/lk/lk-report.vue";
import lkTelegram from '@/components/Table/lk/lk-telegram.vue';
export default {
  name: "lk",
  components: { Loader, LkReport, lkTelegram },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      uid: (state) => state.auth.uid,
      allGroups: (state) => state.auth.groups,
    }),
  },
  data() {
    return {
      PersonalData: "",
      emp: "",
      loader: false,
      current_photo: "",
      photoUser: false,
      LoaderToTextVisible: true,
      LoaderButton: false,
      openPhoto: 'Открыть фото',

    };
  },
  mounted() {
    api.getManagerLK(this.uid)
      .then((response) => {
        this.emp = response.data.data;
        this.loader = false;
      });
    document.title = "Личный кабинет";
  },
  methods: {

    DownloadUserPhoto() {
      this.LoaderButton = true
      this.LoaderToTextVisible = false
      apiStaff.currentUser(this.uid).then((response) => {
        this.LoaderButton = false
        this.current_photo = response.data.photo;
        this.photoUser = true
        this.LoaderToTextVisible = true
      }).catch(error => {
        this.LoaderButton = false
        this.LoaderToTextVisible = true
      })
    },
    Notif() {
      document.getElementById("notifications-2").style.display = "none";
    },
    getGroupName(id) {
      const group = getGroupName(this.allGroups, id);
      return group[0]?.name;
    },
  },
};
</script>


<style>
.sp-circle {
  border: 15px rgba(255, 255, 255, 0.25) solid;
  border-top: 15px rgb(255, 255, 255) solid;
  border-radius: 50%;
  -webkit-animation: spCircRot 0.6s infinite linear;
  animation: spCircRot 0.6s infinite linear;
}

@-webkit-keyframes spCircRot {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
@keyframes spCircRot {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.card-header {
  background: white !important;
}

.tab-content {
  background: rgb(255, 255, 254);
}

.card {
  border: none !important;
}

.nav-pills {
  border-right: 20px solid #f8f9fd;
}

.card-body {
  background: white;
  margin-left: 5% !important;
}

.userField9 {
  height: 50vh;
  background: white;
}

.userField9-description {
  height: 50px;
  position: relative;
}

.userField9-description-text {
  vertical-align: middle !important;
  height: 18px;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  font-family: "Inter", sans-serif;
  font-weight: 600;
  color: #55555a;
}

.whoCurrentUser {
  height: 50px;
  background: #f8f9fd;
  position: relative;
  width: 90%;
}

.currentUser {
  font-size: 24px;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  font-family: "Inter", sans-serif;
}

.contact-var {
  font-size: 20px;
}

.contact-information {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  padding: 0 !important;
  margin: 0 !important;
}

.contact-header {
  font-weight: bold;
  font-size: 15px;
  padding: 0 !important;
  margin: 0 !important;
}

.report-link {
  margin-top: 1%;
}
</style>
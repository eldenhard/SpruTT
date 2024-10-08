<template>
  <div v-show="visibleElement" style="z-index: 100">
    <!-- <div>
      <button @click="cData()">Быстрая загрузка ПВ</button>
    </div> -->
    <Modal_Notification
      :modal_notifications="modal_notifications"
      @close="close_modal"
      :data="data"
    />

    <b-navbar
      toggleable="lg"
      class="mobile"
      type="light"
      style="background: #f8f9fa !important"
      ref="navbar"
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/main" class="router-links">Главная</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/directory" class="router-links"
              >Справочники</router-link
            >
          </b-nav-item>

          <b-nav-item>
            <router-link to="/wagonpark" class="router-links">
              Вагонный парк</router-link
            >
          </b-nav-item>

          <b-nav-item>
            <router-link to="/lk" class="router-links"
              >Личный кабинет</router-link
            >
          </b-nav-item>

          <b-nav-item>
            <router-link to="/report" class="router-links">Отчеты</router-link>
          </b-nav-item>

          <!-- <b-nav-item>
            <router-link to="/personnel-service" class="router-links">Кадровая служба</router-link>
          </b-nav-item> -->

          <b-nav-item>
            <router-link to="/key-facts" class="router-links"
              >Ключевые факты</router-link
            >
          </b-nav-item>

          <b-nav-item>
            <router-link to="/management-reporting" class="router-links"
              >Управ. отчетность</router-link
            >
          </b-nav-item>

          <b-nav-item>
            <router-link to="/fines" class="router-links">Штрафы</router-link>
          </b-nav-item>

          <b-nav-item>
            <router-link to="/personnel-service" class="router-links"
              >Справочная информация</router-link
            >
          </b-nav-item>

          <!-- <b-nav-item>
            <router-link to="/administration" class="router-links">Администрирование</router-link>
          </b-nav-item> -->
          <b-nav-item>
            <router-link to="/insurance" class="router-links"
              >Страхование</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <router-link to="/staff" class="router-links"
              >Работа с персоналом</router-link
            >
          </b-nav-item>
          <li class="nav-item" style="padding-top: 1px">
            <a
              class="nav-link"
              href="/"
              @click="logout"
              style="color: black; text-decoration: none; font-size: 15px"
              >Выход</a
            >
          </li>

          <li
            class="nav-item"
            style="padding-top: 1px; margin-left: auto"
            @click="Notif()"
          >
            <i class="block nav-link"
              ><img src="@/assets/bell.png" alt="" />
              <div class="circle" v-if="notifications_queue">
                <span class="circle_notif">{{ count }}</span>
              </div>
            </i>
          </li>

          <li class="nav-item last">
            <i class="block nav-link">
              <img
                src="@/assets/logo2.png"
                height="10"
                alt="Логотип компании"
              />
            </i>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="phone_navbar" @click="$router.push('/main')" v-if="$route.path != '/main' ||  $route.path != '/'">
      <span>На главную</span>
      <!-- <ul>
        <li>Главная</li>
      </ul> -->
    </div>
  </div>
</template>
<script>
import { actionTypes } from "@/store/modules/auth";
import Modal_Notification from "@/components/ui/Modal_Notification.vue";
import api from "@/api/report";

export default {
  name: "UpNavbar",
  components: { Modal_Notification },
  data() {
    return {
      notifications_queue: true,
      count: 0,
      modal_notifications: false,
      data: [],
    };
  },

  mounted() {
    if (!window.location.href.includes("fin_operation")) {
      this.getTasks();
    }
  },
  computed: {
    visibleElement() {
      if (!window.location.href.includes("fin_operation")) {
        return true;
      } else {
        return false;
      }
    },
    notification() {
      if (this.count == 0) {
        return "@/assets/bell.png";
      }
      return "@/assets/bell-color.png";
    },
  },
  methods: {
    async cData() {
      let arr = [
        'АО "УРАЛЬСКАЯ СТАЛЬ"',
        "Алоран",
        "Газпром Нефть, ПАО",
        "ДЕЛОВЫЕ ПРОГРАММЫ, ООО",
        "КТС, ООО",
        "МТК, ООО",
        "Мечел-Транс",
        "НАЦИОНАЛЬНАЯ ТРАНСПОРТНАЯ КОМПАНИЯ, АО",
        "НЕРУДНАЯ ЛОГИСТИЧЕСКАЯ КОМПАНИЯ, ООО",
        "НОВАЯ ГОРНАЯ УК, ООО",
        'ООО "Альфа-транс"',
        "ПЕРВООСНОВА, АО",
        "ППО",
        "РУССКИЙ УГОЛЬ, АО",
        "СДС-Уголь",
        "СПО, ООО",
        "ТАТНЕФТЬ-ТРАНС, ООО",
        "ТК РУТ Логистик",
        "ТЭК УЛЬТИМА, ООО",
        "ТрансКом ТОО",
        "УГПХ, ООО",
        "Уголь-Транс",
        "ЧЭМК, АО",
        "ЭЛСИ ЛОГИСТИКА СИБИРЬ, ООО",
      ];

      let promises = arr.map((item) =>
        api.vigrData(item, "2024-03-31", "Полувагон")
      );
      Promise.all(promises)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTasks() {
      const preid = JSON.parse(localStorage.getItem("vuex"));
      const id = preid.auth.uid;
      setInterval(() => {
        api
          .personalTasks(id)
          .then((response) => {
            this.data = response.data.data;
            // console.log(this.data)
            let a = [...this.data];
            let b = a.reduce((acc, item) => {
              if (item.status == "in_work") {
                return [...acc, item];
              } else {
                return acc;
              }
            }, []);
            this.count = b.length;
          })
          .catch((error) => {
            console.log(error);
          });
      }, 5000);
    },
    logout() {
      //this.$store.commit('setUser', {})
      // storage.clear();
      localStorage.clear();
      this.$store.dispatch(actionTypes.logout);
    },
    Notif() {
      this.modal_notifications = true;

      console.log("Сообщение");
    },
    close_modal() {
      this.modal_notifications = false;
    },
  },
};
</script>

{ name: "Справочники", path: "/directory" },
{ name: "Вагонный парк", path: "/wagonpark" },
{ name: "Личный кабинет", path: "/lk" },
{ name: "Отчеты", path: "/report" },
{ name: "Ключевые факты", path: "/key-facts" },
{ name: "Управ. отчетность", path: "/management-reporting" },
{ name: "Штрафы", path: "/fines" },
{ name: "Справочная информация", path: "/personnel-service" },
{ name: "Администрирование", path: "/administration" },
<style scoped>
.block {
  position: relative;
  cursor: pointer;
}

.circle {
  position: absolute;
  top: 0;
  right: 0;
  /* margin: 10% 0 150% 0; */
  width: 17px;
  height: 17px;
  border-radius: 100%;


  display: flex;
  justify-content: space-between;
}
.phone_navbar{
  display: none;
}
.circle_notif {
  color: orange;
  font-weight: bold;
  font-size: 14px;
  margin-left: 30%;
  width: 100%;
  /* position: relative;
  left: 0%;
  bottom: 50%;
  transform: translate(-0%, 0); */
}
.navbar{
  height: 6vh;
  /* margin-bottom: 2vh; */
}
.router-links {

  text-decoration: none;
  font-size: 15px;
  line-height: 24px;
  color: #1a1a1a ;
  font-family:"Inter var", sans-serif;
  font-weight: 500;
}



.disabled{
  pointer-events: none;
  /* background: #E4E4E4; */
  color: #E4E4E4;
  background: #F8F9FA !important;
}
a:hover{
  color: rgb(73, 73, 73) !important;
}
a.router-link-active, li.router-link-active {
border-bottom: 2px solid #EC2332;
}
a.router-link{
  text-decoration: none;
  border-bottom: none;
}
.last {
  padding-top: 1px; margin-left: auto !important; float: right; position: absolute; right: 0;
}
@media screen and (max-width: 850px) {
  .navbar-nav{
  background: #F8F9FA !important;
  padding-left: 2% !important;
  position: absolute;
  z-index: 10000000000000000 !important;
  width: 95vw;
}
.mobile{
  display: none; 
}
.phone_navbar{
  display: block;
  position: fixed;
  bottom: 10px;
  background: rgb(86, 162, 185);
  width: 50%;
  left: 25%;
  border-radius: 20px;
  height: 5vh;
  z-index: 100 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.phone_navbar span{
  color: white;
  font-weight: 500;
}
}
</style>

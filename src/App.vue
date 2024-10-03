<template>
  <div>
    <Loader :loader="loader" />
    <UpNavbar />
    <loader_mini :loader="loader_mini" />
    <router-view />
    <Authorization
      style="
        z-index: 9999999999999999999999999999999999999999999999999 !important;
      "
    />
    <Birthday v-if="todayIsBirthdayForMe" @close="handleClose" />
  </div>
</template>

<script>
import Loader from "@/components/loader/loader.vue";
import UpNavbar from "./views/UpNavbar.vue";
import Authorization from "./views/Authorization.vue";
import { actionTypes } from "./store/modules/auth";
import { actionTypes as cpActionTypes } from "./store/modules/counterparties";
import { actionTypes as userActionTypes } from "./store/modules/users";
import { mapState } from "vuex";
import loader_mini from "./components/loader/loader_mini.vue";
import { actionTypes as ccActionTypes } from "./store/modules/cargo_code";
import Birthday from "./views/Birthday.vue";
import LogRocket from "logrocket";

export default {
  name: "App",
  components: { UpNavbar, Authorization, Loader, loader_mini, Birthday },
  data() {
    return {
      loader: false,
      accessToken: localStorage.getItem("accessToken"),
      loader_mini: false,
      todayIsBirthdayForMe: false,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.user.token,
      users: (state) => state.auth.users.users,
    }),
  },
  watch: {
    accessToken() {
      localStorage.setItem("accessToken", JSON.stringify(this.token));
    },
  },
  beforeCreate() {
    // Проверяем время последнего входа
    const limit = localStorage.getItem("first_entry_time");
    if (limit && (Date.now() - new Date(limit)) / 3_600_000 < 12) {
      return;
    }
    localStorage.setItem("first_entry_time", new Date());
    location.reload();
  },
  methods: {
    handleClose() {
      localStorage.setItem("todayIsBirthdayForMe", true);
      this.todayIsBirthdayForMe = false;
    },
    checkBirthday(users) {
      const today = new Date();
      const todayString = `${today.getMonth() + 1}-${today.getDate()}`;
      const currentUser = this.$store.state.auth.user.user;
      const birthdayEmployees = users;
      // Массив для хранения имен сотрудников, у кого день рождения сегодня

      const employeesWithBirthdayToday = birthdayEmployees.filter(
        (employee) => {
          if (employee.birth_date) {
            const birthDate = new Date(employee.birth_date);
            const birthDateStringAnotherStaff = `${
              birthDate.getMonth() + 1
            }-${birthDate.getDate()}`;
            return todayString === birthDateStringAnotherStaff;
          }
          return false;
        }
      );
      console.log("Проверяю вводные данные ", employeesWithBirthdayToday);
      if (currentUser.birth_date) {
        const birthDate = new Date(currentUser.birth_date);
        const birthDateString = `${
          birthDate.getMonth() + 1
        }-${birthDate.getDate()}`;

        if (todayString === birthDateString) {
          if (localStorage.getItem("todayIsBirthdayForMe") == "false") {
            this.todayIsBirthdayForMe = true;
            localStorage.setItem("todayIsBirthdayForMe", true);
          }
        } else {
          localStorage.setItem("todayIsBirthdayForMe", false);
        }
      } else {
        // Проверка, есть ли сотрудники с днем рождения сегодня
        if (employeesWithBirthdayToday.length > 0) {
          if(localStorage.getItem("notificationBirthday") == "false") {
            alert('123')
            this.$toast.info(
            `Сегодня день рождения у следующих сотрудников:\n${employeesWithBirthdayToday
              .map((employee) => `${employee.last_name} ${employee.first_name}`)
              .join(", ")}`,
            { timeout: 6000, position: "top-left" }
          );
          localStorage.setItem("notificationBirthday", true);  
          }

        }
      }
    },
    async fetchData() {
      if (!window.location.href.includes("fin_operation")) {
        await Promise.all([
          this.$store.dispatch(actionTypes.getStaffGroups),
          this.$store.dispatch("getClient"),
          this.$store.dispatch("getCounterpartie"),
          this.$store.dispatch("getRoadAsRoad"),
          this.$store.dispatch("getWagonRoads"),
          this.$store.dispatch(actionTypes.staffGlobal),
          this.$store.dispatch(cpActionTypes.getCounterparties, {
            url: "personal/counterparties/?page_size=500",
            clear: true,
          }),
          this.$store.dispatch(userActionTypes.getUsers, {
            url: "personal/users/?page_size=500",
            clear: true,
          }),
          this.$store.dispatch(ccActionTypes.getCargoCode, {
            url: "wagon-park/cargo/?page_size=500",
            clear: true,
          }),
        ]);

        const updatedUsers = this.$store.state.users.users;
        this.checkBirthday(updatedUsers);
      }
    },
    reloadPortal() {
      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const lastLoginDate = localStorage.getItem("lastLoginDate");

      // Проверяем дату последнего входа
      if (!lastLoginDate || lastLoginDate !== today) {
        localStorage.setItem("lastLoginDate", today);
        this.$store.dispatch(actionTypes.logout);
        return window.location.reload();
      }

      // Проверяем время для перезагрузки
      const reloadTime = new Date();
      reloadTime.setHours(9, 0, 0, 0);
      if (
        now.getTime() > reloadTime.getTime() &&
        localStorage.getItem("portalReloaded") !== "true"
      ) {
        localStorage.clear();
        this.$store.dispatch(actionTypes.logout);
        localStorage.setItem("portalReloaded", "true");
        localStorage.setItem("todayIsBirthdayForMe", false);
        localStorage.setItem("notificationBirthday", false);  
        return window.location.reload();
      }

      // Запускаем планировщик перезагрузки
      this.scheduleDailyReload();
    },
    scheduleDailyReload() {
      const now = new Date();
      const nextReload = new Date();
      nextReload.setHours(9, 0, 0, 0);
      if (now.getTime() > nextReload.getTime()) {
        nextReload.setDate(nextReload.getDate() + 1);
      }

      const timeToReload = nextReload.getTime() - now.getTime();
      setTimeout(() => {
        localStorage.clear();
        this.$store.dispatch(actionTypes.logout);
        window.location.reload();
        this.scheduleDailyReload();
      }, timeToReload);
    },
  },
  async mounted() {
    this.reloadPortal();
    this.loader_mini = true;

    try {
      localStorage.setItem("accessToken", JSON.stringify(this.token));
      
      await this.fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      this.loader_mini = false;
    }
  },
};
</script>


<style>
@import "./style/style.css";
</style>

<template>
  <div>

    <b-navbar toggleable="lg" type="light" style="background: #F8F9FA !important;">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link  to="/home"  style="color: black; text-decoration: none; font-size: 15px;">Справочники</router-link>
        </b-nav-item>

        <b-nav-item >
          <router-link to="/wagonpark" style="color: black; text-decoration: none; font-size: 15px;"> Вагонный парк</router-link>
        </b-nav-item>

        <!-- <b-nav-item disabled> 
          <router-link to="/bookkeeping"  style="color: grey; font-size: 15px; text-decoration: none;">Бухгалтерия</router-link>
        </b-nav-item> -->

        <!-- <b-nav-item disabled>
          <router-link to="/presentation"  style="color: grey;font-size: 15px; text-decoration: none;">Презентации</router-link>
        </b-nav-item> -->
        
        <!-- 
        <b-nav-item disabled>
          <router-link to="/rates"  style="color: grey;font-size: 15px; text-decoration: none;">Ставки</router-link>
        </b-nav-item> -->

        <b-nav-item >
          <router-link to="/lk"  style="color: black; text-decoration: none; font-size: 15px;">Личный кабинет</router-link>
        </b-nav-item>

        <b-nav-item>
          <router-link to="/report"  style="color: black; text-decoration: none; font-size: 15px;">Отчеты</router-link>
        </b-nav-item>

        <b-nav-item >
          <router-link to="/personnel-service" style="color: black; text-decoration: none; font-size: 15px;">Кадровая служба</router-link>
        </b-nav-item>

        <b-nav-item >
          <router-link to="/key-facts" style="color: black; text-decoration: none; font-size: 15px;">Ключевые факты</router-link>
        </b-nav-item>
        <!-- <b-nav-item>
          <a href="/" @click="logout" style="color: black; text-decoration: none; font-size: 13px;">Выход</a>
        </b-nav-item> -->
        <li class="nav-item" style="padding-top: 1px">
          <a class="nav-link" href="/" @click="logout" style="color: black; text-decoration: none; font-size: 15px;">Выход</a>
        </li>
      </b-navbar-nav>


    </b-collapse>
  </b-navbar>


    <!-- <div id="navbar">
      <ul class="UpNavList">
        <li class="UpNavList-item disabled">
          <router-link  to="/home" class="disabled"  style="color: grey;">Справочники</router-link>
        </li>
        <li class="UpNavList-item ">
          <router-link to="/wagonpark"> Вагонный парк</router-link>
        </li>
        <li class="UpNavList-item disabled">
          <router-link to="/bookkeeping" class="disabled"  style="color: grey;">Бухгалтерия</router-link>
        </li>
        <li class="UpNavList-item disabled" >
          <router-link to="/presentation" class="disabled"  style="color: grey;">Презентации</router-link>
        </li>
        <li class="UpNavList-item disabled">
          <router-link to="/rates" class="disabled"  style="color: grey;">Ставки</router-link>
        </li>
        <li class="UpNavList-item">
          <router-link to="/lk">Личный кабинет</router-link>
        </li>
        <li class="UpNavList-item">
          <router-link to="/report">Отчеты</router-link>
        </li>
        <li class="UpNavList-item">
          <a href="/" @click="logout">Выход</a>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import {actionTypes} from '@/store/modules/auth'
export default {
  name: 'UpNavbar',
  methods: {
    logout() {
      //this.$store.commit('setUser', {})
      this.$store.dispatch(actionTypes.logout)
    }
  }
}
</script>


<style scoped>
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

/* #navbar {
  background: #e4e4e4;
  width: 100%;
  height: 3vh;

} */

/* .UpNavList{
    height: 30px;
} */
/* ul.UpNavList li {
  color: rgb(0, 0, 0);
  display: inline;


}

.UpNavList-item {
  color: rgb(0, 0, 0);
  font-weight: 500;
  font-size: 13px;
  margin-left: 1%;
  letter-spacing: 0.5px;


}

.UpNavList-item a {
  color: rgb(0, 0, 0);
  outline: none;
  text-decoration: none;
  cursor: pointer;

}

.UpNavList-item a:hover {
  cursor: pointer;
  color: #ffffff;
} */

</style>

<template>
  <div>

    <b-navbar toggleable="lg" type="light" style="background: #F8F9FA !important;">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link  to="/directory"  style="color: black; text-decoration: none; font-size: 15px;">Справочники</router-link>
        </b-nav-item>

        <b-nav-item >
          <router-link to="/wagonpark" style="color: black; text-decoration: none; font-size: 15px;"> Вагонный парк</router-link>
        </b-nav-item>

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

        <li class="nav-item" style="padding-top: 1px">
          <a class="nav-link" href="/" @click="logout" style="color: black; text-decoration: none; font-size: 15px;">Выход</a>
        </li>
      </b-navbar-nav>


    </b-collapse>
  </b-navbar>

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
</style>

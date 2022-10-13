<template>
  <div>
    <div id="navbar">
      <ul class="UpNavList">
        <li class="UpNavList-item disabled">
          <router-link  to="/home" class="disabled" style="color: grey;">Справочники</router-link>
        </li>
        <li class="UpNavList-item disabled">
          <router-link to="/wagonpark" class="disabled"  style="color: grey;"> Вагонный парк</router-link>
        </li>
        <li class="UpNavList-item disabled">
          <router-link to="/bookkeeping" class="disabled"  style="color: grey;">Бухгалтерия</router-link>
        </li>
        <!-- <li class="UpNavList-item">
          <router-link to="#">Документооборот</router-link>
        </li> -->
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
          <a href="" @click="logout">Выход</a>
        </li>
      </ul>
    </div>
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
  background: #E4E4E4;
}
/* Выделение активной ссылки */
a.router-link-active, li.router-link-active {
border-bottom: 2px solid #EC2332;


}

#navbar {
  background: #e4e4e4;
  width: 100%;
  height: 3vh;

}

/* .UpNavList{
    height: 30px;
} */
ul.UpNavList li {
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
}

</style>

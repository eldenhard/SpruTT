<template>
  <div class="sidebar">
    <div class="sidebar_header">
      <img src="../assets/profile.png" alt="Фото пользователя"  />
      <p class="name_user">
        {{ user.last_name }} {{ user.first_name }} {{ user.middle_name }}
      </p>
      <p class="position">{{ user.post }}</p>
    </div>
    <div class="sidebar_content">
      <div class="content_item collapse" @click="open_menu()">
        <img src="../assets/docs.svg" alt="Заявления">
        <p>Мои заявления</p>
       <b-icon icon="chevron-down" ref="collapse_el"/>
      </div>
      <div class="content_item">
        <img src="../assets/users.png" alt="Список сотрудников" />
        <p>Список сотрудников</p>
      </div>
      <div class="content_item">
        <img src="../assets/user.png" alt="Сотрудник" />
        <p>Для нового сотрудника</p>
      </div>
      <div class="content_item">
        <img src="../assets/cake.png" alt="День рождения" />
        <p>Дни рождения</p>
      </div>
      <div class="content_item">
        <img src="../assets/news.png" alt="День рождения" />
        <p>Кадровые новости</p>
      </div>
    </div>
    <div class="sidebar_footer">
      <b-button  class="new_request_btn">Подать новое заявление</b-button>
      <router-link to="/" class="router-links logout" @click="logout">Выход</router-link>
    </div>
  </div>
</template>



<script>
import { mapState } from "vuex";
import { actionTypes } from '@/store/modules/auth'
export default {
  data() {
    return {};
  },
  methods: {
    open_menu(){
      this.$refs.collapse_el.collapse('rotate')
    },
    logout() {
      localStorage.clear();
      this.$store.dispatch(actionTypes.logout)

    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user.user,
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "../style/style.scss";
</style>
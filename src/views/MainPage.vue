<template>
  <div class="block_main_page">
    <div class="block_main_page__blocks">
      <router-link to="/directory">
        <div class="main_page__block block_main_page__blocks__directory">
          <img src="../assets//directrory.png" alt="Справочники">
          <span> Справочники</span>
        </div>
      </router-link>
      <router-link to="/wagonpark">
        <div class="main_page__block block_main_page__blocks__wagon_park">
          <img src="../assets//wagon.png" alt=" Вагонный парк">
          <span>Вагонный парк</span>
        </div>
      </router-link>
      <router-link to="/report">
        <div class="main_page__block block_main_page__blocks__report">
          <img src="../assets//report_img.png" alt="Отчеты">
          <span> Отчеты</span>
        </div>
      </router-link>
      <router-link to="/lk">
        <div class="main_page__block block_main_page__blocks__lk">
          <img src="../assets//lk.png" alt="Личный кабинет">
          <span> Личный кабинет</span>
        </div>
      </router-link>
      <router-link to="/key-facts">
        <div class="main_page__block block_main_page__blocks__key_facts">
          <img src="../assets//keyfact.png" alt="Ключевые факты">
          <span> Ключевые факты</span>
        </div>
      </router-link>
      <router-link to="/management-reporting">
        <div class="main_page__block block_main_page__blocks__uoreport">
          <img src="../assets//growth.png" alt="Управ. отчетность">
          <span> Управ. отчетность</span>
        </div>
      </router-link>

      <router-link to="/fines">
        <div class="main_page__block block_main_page__blocks__pain">
          <img src="../assets//penalty.png" alt="Штрафы">
          <span> Штрафы</span>
        </div>
      </router-link>
      <router-link to="/personnel-service">
        <div class="main_page__block block_main_page__blocks__inform">
          <img src="../assets//inform.png" alt="Справочная информаиця">
          <span> Справочная информация</span>
        </div>
      </router-link>
      <router-link to="/home">
        <div class="main_page__block block_main_page__blocks__inform">
          <img src="../assets//inform.png" alt="Справочная информаиця">
          <span> Администрирование</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.alignLastRow();
  },
  methods: {
    OpenPath(url) {
      window.location.href(`/${url}`)
    },

  },
};
</script>
<style lang="scss" scoped>
.block_main_page {
  background: url(../assets/back_img.png) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
}

.block_main_page__blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem; // Добавляем отступ между блоками
  justify-content: center; // Выравниваем все блоки по центру
}

.main_page__block {

  width: 30vw;
  height: 25vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: rgba(170, 32, 32, 0.5);
  background: rgba(66, 66, 66, 0.5);
  font-family: 'Arial Black' sans-serif;
  transition: transform 0.3s;

  &:hover {
    transform: translate(0, -2%);

  }

  span {
    font-family: 'Arial Black' sans-serif;
    color: white;
    font-size: 18px;
    margin-top: 2%;
    font-weight: 600;
  }
}
.router-links {
  color: black;
  text-decoration: none;
  font-size: 15px;
}



.disabled{
  pointer-events: none;
  /* background: #E4E4E4; */
  color: #E4E4E4;
  background: #F8F9FA !important;
}
a:hover{
  color: rgba(66, 66, 66, 0.5)!important;
}

a.router-link{
  text-decoration: none;
  border-bottom: none;
}

</style>
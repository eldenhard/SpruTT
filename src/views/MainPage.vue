<template>
  <div class="block_main_page">
    <div class="main_block_grid">
      <router-link to="/directory" @click="test()">
        <div class="main_page__block block_main_page__blocks__directory">
          <!-- <img src="../assets//directrory.png" alt="Справочники"> -->
          <span> Справочники</span>
        </div>
      </router-link>
      <router-link to="/wagonpark">
        <div class="main_page__block block_main_page__blocks__wagon_park">
          <!-- <img src="../assets//wagon.png" alt=" Вагонный парк"> -->
          <span>Вагонный парк</span>
        </div>
      </router-link>
      <router-link to="/lk">
        <div class="main_page__block block_main_page__blocks__lk">
          <!-- <img src="../assets//lk.png" alt="Личный кабинет"> -->
          <span> Личный кабинет</span>
        </div>
      </router-link>
      <router-link to="/report">
        <div class="main_page__block block_main_page__blocks__report">
          <!-- <img src="../assets//report_img.png" alt="Отчеты"> -->
          <span> Отчеты</span>
        </div>
      </router-link>
      
      <router-link to="/key-facts">
        <div class="main_page__block block_main_page__blocks__key_facts">
          <!-- <img src="../assets//keyfact.png" alt="Ключевые факты"> -->
          <span> Ключевые факты</span>
        </div>
      </router-link>
      <router-link to="/management-reporting">
        <div class="main_page__block block_main_page__blocks__uoreport">
          <!-- <img src="../assets//growth.png" alt="Управ. отчетность"> -->
          <span> Управ. отчетность</span>
        </div>
      </router-link>

 
      <router-link to="/personnel-service">
        <div class="main_page__block block_main_page__blocks__inform">
          <!-- <img src="../assets//inform.png" alt="Справочная информаиця"> -->
          <span> Справочная информация</span>
        </div>
      </router-link>
      <router-link to="/insurance">
        <div class="main_page__block block_main_page__blocks__pain">
          <!-- <img src="../assets//penalty.png" alt="Штрафы"> -->
          <span>Страхование</span>
        </div>
      </router-link>
      <router-link to="/staff">
        <div class="main_page__block block_main_page__blocks__inform">
          <!-- <img src="../assets//6220416.png" alt="Администрирование"> -->
          <span>Работа с персоналом</span>
        </div>
      </router-link>

      <!-- <router-link to="/home">
        <div class="main_page__block block_main_page__blocks__inform">
          <img src="../assets//inform.png" alt="Справочная информаиця">
          <span> Администрирование</span>
        </div>
      </router-link> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted(){
  document.title= 'Главная'
  },
  methods: {
    OpenPath(url) {
      window.location.href(`/${url}`)
    },

  },
};
</script>
<style scoped>

.block_main_page {
  background: url(../assets/back_img.webp) no-repeat center center fixed;
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
.main_block_grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr)
}

.main_page__block {
  width: 30vw;
  height: 25vh;
  border-radius: 10px;
 display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  background: rgba(0, 0, 0, 0.6);
  transition: transform 0.3s; 
}
.main_page__block span{
    color: rgb(228, 228, 228);
    font-size: 2em;
    margin-top: 2%;
    font-weight:lighter;
    text-decoration: none !important;
  border: none !important;
  outline: none !important;
    
}
.main_page__block:hover{
  transform: translate(0, -2%);
}
span:hover,
a:hover{
  outline: none !important;
  text-decoration: none !important;
  border: none !important;
  outline: none !important;
}
.router-links {
  color: black;
  text-decoration: none !important;
  border: none !important;
  outline: none !important;
  font-size: 15px;
}
.router-links:hover,
a:hover{
  text-decoration: none;
  outline: none;
  border: none !important;
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
  outline: none;
  border: none !important;
}
a.router-links{
  text-decoration: none;
  outline: none;
  border: none !important;
}
</style>
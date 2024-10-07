<template>
  <div class="block_main_page">
    <div class="main_block_grid">
      <router-link to="/directory" @click="test()">
        <div class="main_page__block block_main_page__blocks__directory">
          <span> Справочники</span>
        </div>
      </router-link>
      <router-link to="/wagonpark">
        <div class="main_page__block block_main_page__blocks__wagon_park">
          <span>Вагонный парк</span>
        </div>
      </router-link>
      <router-link to="/lk">
        <div class="main_page__block block_main_page__blocks__lk">
          <span> Личный кабинет</span>
        </div>
      </router-link>
      <router-link to="/report">
        <div class="main_page__block block_main_page__blocks__report">
          <span> Отчеты</span>
        </div>
      </router-link>
      <router-link to="/key-facts">
        <div class="main_page__block block_main_page__blocks__key_facts">
          <span> Ключевые факты</span>
        </div>
      </router-link>
      <router-link to="/management-reporting">
        <div class="main_page__block block_main_page__blocks__uoreport">
          <span> Управ. отчетность</span>
        </div>
      </router-link>
      <router-link to="/fines">
        <div class="main_page__block block_main_page__blocks__pain">
          <span> Штрафы</span>
        </div>
      </router-link>
      <router-link to="/personnel-service">
        <div class="main_page__block block_main_page__blocks__inform">
          <span> Справочная информация</span>
        </div>
      </router-link>
      <router-link to="/administration">
        <div class="main_page__block block_main_page__blocks__inform last">
          <span> Администрирование</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "Главная";
  },
};
</script>

<style scoped>
.block_main_page {
  background: url(../assets/back_img.webp) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main_block_grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr); /* Максимум 3 колонки */
  width: 95%;
  padding: 1rem;
  max-height: auto;
  overflow: auto;
}

.main_page__block {
  background: rgba(8, 8, 8, 0.7);
  height: 25vh; /* Высота блока */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.main_page__block span {
  color: white;
  font-size: 2em; /* Размер шрифта по умолчанию */
  margin-top: 2%;
  font-weight: lighter;
}

.main_page__block:hover {
  transform: translate(0, -2%);
}

@media screen and (max-width: 850px) {
  .main_block_grid {
    grid-template-columns: repeat(3, 1fr); /* Максимум 3 колонки на планшетах */
    gap: 10px;
    height: 100vh !important;
  }

  .main_page__block {
    height: 20vh; /* Высота блока на меньших экранах */
  }
  .last {
    display: none;
  }
  .main_page__block span {
    font-size: 1.5em; /* Уменьшаем размер текста */
  }
}

@media screen and (max-width: 600px) {
  .main_block_grid {
    grid-template-columns: repeat(2, 1fr); /* Одна колонка на мобильных */
  }

  .main_page__block {
    height: 15vh; /* Высота блока на мобильных */
  }

  .main_page__block span {
    font-size: 1.2em; /* Уменьшаем размер текста еще больше */
    text-align: center;
  }
}
</style>

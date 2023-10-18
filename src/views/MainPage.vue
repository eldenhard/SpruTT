<template>
    <div class="block_main_page">
        <div class="block_main_page__blocks">
            <div class="main_page__block block_main_page__blocks__directory">Справочники</div>
            <div class="main_page__block block_main_page__blocks__wagon_park">Вагонный парк</div>
            <div class="main_page__block block_main_page__blocks__report">ОТчеты</div>
            <div class="main_page__block block_main_page__blocks__lk">Личный кабинет</div>
            <div class="main_page__block block_main_page__blocks__key_facts">Ключевые факты</div>
            <div class="main_page__block block_main_page__blocks__uoreport">Управ. отчетность</div>
            <div class="main_page__block block_main_page__blocks__pain">Штрафы</div>
            <div class="main_page__block block_main_page__blocks__inform">Справочная информаиця</div>
        </div>
    </div>
</template>

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
}

.block_main_page__blocks {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; // Добавляем отступ между блоками
  justify-content: center; // Выравниваем все блоки по центру
}

.main_page__block {
  width: 30vw;
  height: 25vh;
  border-radius: 10px;
  background: lightcoral;
  text-align: center;
  &:hover{
    margin-bottom: 5%;
  }
}


</style>
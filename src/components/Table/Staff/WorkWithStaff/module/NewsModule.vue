<script>
import HeaderUIElement from "../ui/HeaderUIElement.vue";
import Loader from "@/components/loader/loader.vue";
import ModalModule from "./ModalModule.vue";

export default {
  components: { HeaderUIElement, Loader, ModalModule },

  data() {
    return {
      state: "",
      titleNews: "",
    };
  },
  methods: {
    openThisNews() {
        this.titleNews = "Изменения в коллективе";
      // Открываем модальное окно через ref
      this.$refs['modal_news'].show();
    },
  },
};
</script>

<template>
  <div>
    <!-- Подключаем модальное окно -->
    <ModalModule ref="modal_news" :title="titleNews"/>

    <div class="workspace" v-if="state === ''">
      <HeaderUIElement
        :placeholder_value="'Поиск новости...'"
        @updateApplication="updateTableStaff"
      >
        Новости
      </HeaderUIElement>
      <div
        class="content"
        style="
          height: 60vh;
          overflow: auto;
          display: flex;
          flex-direction: column;
        "
      >
        <div class="news_block">
          <div class="news" @click="openThisNews">
            <h5 class="header">Изменения в коллективе</h5>
            <footer class="news_footer">
              <img src="../assets/logo_tt.png" alt="логотип" />
              <span class="data_news">17.10.2024</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../style/style.scss";
@import "../style/style_news.scss";
</style>

<script>
import HeaderUIElement from "../ui/HeaderUIElement.vue";
import Loader from "@/components/loader/loader.vue";
import ModalModule from "./ModalModule.vue";
import MarkdownBlockVue from './MarkdownBlock.vue';
import api from "@/api/staff";

export default {
  components: { HeaderUIElement, Loader, ModalModule, MarkdownBlockVue },

  data() {
    return {
      state: "",
      titleNews: "",
      isMarkdownBlock: false,
      newsData: [],
      newsContent: ""
    };
  },
  async mounted() {
     this.newsData = await api.getNews()
  },
  methods: {
    updateNewsModule(){},
    openThisNews(news) {
        console.log(news)
        this.titleNews = news.title;
        this.newsContent = news.content;
      // Открываем модальное окно через ref
      this.$refs['modal_news'].show();
    },
    async collapseElement(val){
        this.newsData = await api.getNews()
        this.isMarkdownBlock = val
    }
  },
};
</script>

<template>
  <div>
    <!-- Подключаем модальное окно -->
    <ModalModule ref="modal_news" :title="titleNews" :content="newsContent"/>

    <div class="workspace" v-if="state === ''">
      <HeaderUIElement
        :placeholder_value="'Поиск новости...'"
        @updateApplication="updateNewsModule"
      >
        Новости
      </HeaderUIElement>
      
        <b-button size="sm" class="mb-2"  :variant="isMarkdownBlock ? 'danger' : 'info'"  style="margin: 2% auto" @click="isMarkdownBlock = !isMarkdownBlock">
            <b-icon icon="plus-circle-fill" aria-hidden="true"></b-icon>
            {{ isMarkdownBlock ? "Закрыть создание новости" : "Добавить новость" }}
        </b-button>
        <MarkdownBlockVue v-if="isMarkdownBlock" @collapseElement="collapseElement"/>
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
          <div class="news" v-for="news in newsData.data.data" :key="JSON.stringify(news)"
          @click="openThisNews(news)">
            <h5 class="header">{{news.title}}</h5>
            {{news}}
            <footer class="news_footer">
              <img src="../assets/logo_tt.png" alt="логотип" />
              <span class="data_news">{{ news.created_at.slice(0, 10).split("-").reverse().join(".") }}</span>
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

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
      filteredNewsList: [],
      newsContent: ""
    };
  },
  async mounted() {
     this.newsData = await api.getNews()
     this.newsData = this.newsData.data.data
     this.filteredNewsList = [...this.newsData]
  },
  methods: {
    updateNewsModule(search){
      console.log(search)
      const query = search.toLowerCase();
      this.filteredNewsList = this.newsData.filter((news) => news.title.toLowerCase().includes(query));   
    },
    openThisNews(news) {
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
  <div >
    <ModalModule ref="modal_news" :title="titleNews" :content="newsContent"/>

    <div class="workspace" v-if="state === ''">
      <HeaderUIElement
        :placeholder_value="'Поиск новости...'"
        @updateApplication="updateNewsModule"
      >
        Новости
      </HeaderUIElement>
      
        <b-button size="sm" class="mb-2"  :variant="isMarkdownBlock ? 'danger' : 'primary'"  style="margin: 2% auto; color: white !important;" @click="isMarkdownBlock = !isMarkdownBlock">
            <b-icon icon="plus-circle-fill" aria-hidden="true"></b-icon>
            {{ isMarkdownBlock ? "Закрыть создание новости" : "Добавить новость" }}
        </b-button>
        <MarkdownBlockVue v-if="isMarkdownBlock" @collapseElement="collapseElement"/>
        <div v-if="newsData.length === 0" style="display: flex; align-items: center; justify-content: center; height: 100%">
          <p>Происходит загрузка новостей...</p>
        </div>
      <div
        class="content"
        style="
          height: 60vh;
          overflow: auto;
          display: flex;
          flex-direction: column;
        "
        v-if="!isMarkdownBlock"
      >
        <div class="news_block">
          <div class="news" v-for="news in filteredNewsList" :key="JSON.stringify(news)"
          @click="openThisNews(news)">
            <h5 class="header">{{news.title}}</h5>
            <footer class="news_footer">
              <img src="../assets/logo_tt.png" alt="логотип" />
              <span class="data_news">{{ news.created_at.slice(0, 10).split("-").reverse().join(".") }}</span>
            </footer>
          </div>
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

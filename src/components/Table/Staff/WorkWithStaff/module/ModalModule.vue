<template>
  <b-modal
    ref="modal_news"
    :title="title"
    :header-bg-variant="'light'"
    :header-text-variant="'dark'"
    :body-bg-variant="'light'"
    :footer-bg-variant="'dark'"
    :footer-text-variant="'light'"
    scrollable
    :size="'md'"
  >
    <b-container fluid>
      <div v-html="renderedContent" class="markdown-content"></div> <!-- Отображаем HTML-контент -->
    </b-container>

    <template #modal-footer>
      <div class="w-100" style="display: flex; justify-content: space-between">
        <img class="float-left" src="../assets/logo_tt.png" style="height: 3vh !important" alt="логотип компании">
      </div>
    </template>
  </b-modal>
</template>

<script>
import { marked } from 'marked';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {  // Новый prop для передачи контента
      type: String,
      default: ''
    }
  },
  data() {
    return {
      renderedContent: '' // Новое свойство для хранения преобразованного контента
    };
  },
  watch: {
    content: {
      immediate: true,
      handler(newValue) {
        this.renderedContent = marked(newValue); // Преобразуем Markdown в HTML
      }
    }
  },
  methods: {
    show() {
      this.$refs.modal_news.show(); // Показать модальное окно
    },
  },
};
</script>

<style scoped>
.markdown-content {
  /* Добавьте стили для улучшения отображения контента */
  line-height: 1.6;
  font-family: Arial, sans-serif;
  color: #333;
}
</style>

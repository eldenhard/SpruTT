<template>
    <div>
      <br />
      <div style="display: flex; justify-content: space-between; gap: 5%">
        <label>
          Заголовок статьи <br />
          <input type="text" v-model="title" />
        </label>
        <label>
          Дата статьи <br />
          <input type="date" v-model="dateNews" />
        </label>
      </div>
      <toast-ui-editor
        ref="editor"
        :initialValue="content"
        :previewStyle="'vertical'"
        :height="'500px'"
        :initialEditType="'markdown'"
        :language="'ru'"
      />
      <b-button variant="info" @click="handleEditorChange" style="margin-top: 1%"
        >Сохранить</b-button
      >
    </div>
  </template>
  
  <script>
  import { Editor } from '@toast-ui/vue-editor';
  // Импортируйте локализацию на русском языке
  import { Editor as ToastEditor } from '@toast-ui/editor';
  import api from "@/api/staff";
  
  export default {
    components: {
      'toast-ui-editor': Editor,
    },
    data() {
      return {
        content: '### Привет, это создание новости',
        dateNews: new Date().toISOString().slice(0, 10),
        title: "",
      };
    },
    methods: {
      async handleEditorChange() {
        // Проверка на наличие заголовка и даты
        if (!this.title || !this.dateNews) {
            this.$toast.info("Пожалуйста, заполните заголовок и дату статьи!", {
                timeout: 4000,
            });
          return; // Прерываем выполнение метода
        }
  
        // Получение текста из редактора
        const markdownContent = this.$refs.editor.invoke('getMarkdown');
        let obj = {
          title: this.title,
          content: markdownContent,
          d: this.dateNews
        };
        // Сохранение новости
        try{
          await api.createNews(obj);
          this.title = ""
          this.content = ""
          this.$toast.success("Успешно!\nНовость создана", {
                timeout: 4000,
            });
        this.$emit("collapseElement", false)
        }catch(err){
            this.$toast.error("Ошибка!\nНовость не создана", {
                timeout: 4000,
            });
        }
        console.log(markdownContent);
      },
    },
    mounted() {
      // Установка локализации после монтирования компонента
      ToastEditor.setLanguage('ru'); // Установите язык
    },
  };
  </script>
  
  <style scoped>
  label {
    color: grey;
    flex-grow: 1;
  }
  input,
  input[type="date"] {
    width: 100%;
    border-radius: 10px;
    background: #F6F6F6;
    padding: 8px 2%;
    margin-top: 1%;
    border: none !important;
  }
  </style>
  
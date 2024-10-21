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
      <br />
  
    <toast-ui-editor
      ref="editor"
      :initialValue="content"
      :previewStyle="'vertical'"
      :height="'400px'"
      :initialEditType="'markdown'"
      :language="'ru-RU'"
      :toolbarItems="toolbarItems"
    />
    <b-button variant="info" @click="handleEditorChange" style="margin-top: 1%; color: white !important">
      Сохранить
    </b-button>
  </div>
</template>

<script>
import { Editor } from '@toast-ui/vue-editor';
import '@toast-ui/editor/dist/i18n/ru-ru'; // Импорт русской локализации
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
        toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        ['scrollSync'],
      ]
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

        // Сохранение новости
        try{
          // Получение текста из редактора
          const markdownContent = this.$refs.editor.invoke('getMarkdown');
          let obj = {
            title: this.title,
            content: markdownContent,
            d: this.dateNews
          };
          await api.createNews(obj);
          this.title = ""
          this.content = ""
          this.$toast.success("Успешно!\nНовость создана", {
                timeout: 4000,
            });
        this.$emit("collapseElement", false)
        }catch(err){
          console.error(err)
            this.$toast.error("Ошибка!\nНовость не создана", {
                timeout: 4000,
            });
        }
      },
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
  
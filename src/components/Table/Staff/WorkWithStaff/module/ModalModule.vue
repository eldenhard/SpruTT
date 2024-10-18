<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
  methods: {
    show() {
      this.$refs.modal_news.show(); // Показать модальное окно
    },
  },
};
</script>


<template>
    <b-modal ref="modal_news"  :title="title" 
    :header-bg-variant="'light'"
    :header-text-variant="'dark'"
    :body-bg-variant="'light'"
    :footer-bg-variant="'dark'"
    :footer-text-variant="'light'"
    scrollable  
    :size="'lg'"
    >

    <b-container fluid>
         
<b>Добрый день, Уважаемые Коллеги!</b> <br>
<p>в нашем коллективе 17.10.2024г. произошли изменения: </p>
<ul>
    <li><b>Пыхов Алексей Викторович</b> переведен на должность Начальник отдела по работе с нефтеналивными грузами.</li>
    <li><b>Сиротич Роман Юрьевич</b> переведен на должность Начальник отдела по перевозке наливных грузов Департамента организации перевозок.</li>
</ul>
<p><b>Пожелаем Коллегам успехов в работе!</b></p><br>

      </b-container>

      <template #modal-footer>
        <div class="w-100">
            <img class="float-left" src="../assets/logo_tt.png" style="height: 3vh !important" alt="логотип компании">
          <!-- <p class="float-left">Modal Footer Content</p> -->
          <b-button
            variant="danger"
            size="md"
            class="float-right"
            @click="show=false"
          >
            Закрыть
          </b-button>
        </div>
      </template>
    </b-modal>
  </template>
  



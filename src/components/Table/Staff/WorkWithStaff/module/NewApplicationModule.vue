<template>
  <div>

    <div class="workspace" v-if="state === ''">
      <section class="header">
        <h4 class="description">Подать новое заявление</h4>
        <input type="text" placeholder="Поиск заявления..." @input="updateApplication($event.target.value)">
      </section>
      <div class="content">
          <div class="application_item" v-for="application in filteredApplications" :key="JSON.stringify(application)"
          @click="openForm(application.name)">
              <p>{{ application.name }}</p>
          </div>
      </div>
    </div>
    <section class="forms">
      <component :is="state"></component>
    </section>
  </div>
</template>

<script>
import RestForm from '../forms/RestForm.vue'
export default {
  components: { RestForm },
  data() {
    return {
      searchValue: "",
      state: "",
      applications: [
        { name: "Ежегодный отпуск", description: "", value_description: "" },
        { name: "Отпуск без сохранения заработной платы", description: "", value_description: "" },
        { name: "Заявление на перевод", description: "", value_description: "" },
        { name: "Заявление на увольнение", description: "", value_description: "" },
        { name: "Заявление на учебный оплачиваемый отпуск", description: "", value_description: "" },
        { name: "Акт передачи дел на период отпуска", description: "", value_description: "" },
        { name: "Отчет по представительским расходам", description: "", value_description: "" },
        { name: "План заявка", description: "", value_description: "" },
        { name: "Отчет о командировке", description: "", value_description: "" },
      ],
    };
  },
  computed: {
    filteredApplications() {
      return this.applications.filter((application) => application.name.toLowerCase().includes(this.searchValue.toLowerCase()));
    },
  },
  methods: {
    openForm(name) {
      switch (name) {
        case "Ежегодный отпуск":
          this.state = "RestForm";
          break;
        case "Отпуск без сохранения заработной платы":
          this.state = "RestForm";
          break;
        case "Заявление на перевод":
          this.state = "RestForm";
          break;
        case "Заявление на увольнение":
          this.state = "RestForm";
          break;
        case "Заявление на учебный оплачиваемый отпуск":
          this.state = "RestForm";
          break;
        case "Акт передачи дел на период отпуска":
          this.state = "RestForm";
          break;
        case "Отчет по представительским расходам":
          this.state = "RestForm";
          break;
        case "План заявка":
          this.state = "RestForm";
          break;
        case "Отчет о командировке":
          this.state = "RestForm";
          break;
      }
    },
    updateApplication(searchValue) {
      this.searchValue = searchValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";
</style>
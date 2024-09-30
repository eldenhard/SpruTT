<template>
  <div>

    <div class="workspace" v-if="state === ''">
      <section class="header">
        <h4 class="description">Подать новое заявление</h4>
        <input type="text" placeholder="Поиск заявления..." @input="updateApplication($event.target.value)">
      </section>
      <div class="content">
          <div :class="['application_item', { disabled: application.extra_des == 'disabled' }]" v-for="application in filteredApplications" :key="JSON.stringify(application)"
          @click="openForm(application.name, $event.target)">
              <p>{{ application.name }}</p>
          </div>
      </div>
    </div>
    <section class="forms">
      
      <component :is="state" @clearForm="clearForm"></component>
    </section>
  </div>
</template>

<script>
import DismissalFormVue from '../forms/DismissalForm.vue';
import RestForm from '../forms/RestForm.vue'
import RestWoMoneyForm from '../forms/RestWoMoneyForm.vue';
import TransferForm from '../forms/TransferForm.vue';
import DismissalForm from '../forms/DismissalForm.vue';
import EducationalPaidLeaveForm from '../forms/EducationalPaidLeaveForm.vue';
import ActTransferJobForm from '../forms/ActTransferJobForm.vue';
import ReportEntertainmentExpenses from '../forms/ReportEntertainmentExpenses.vue';
export default {
  components: { RestForm, RestWoMoneyForm, TransferForm, DismissalForm, EducationalPaidLeaveForm, ActTransferJobForm, ReportEntertainmentExpenses },
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
        { name: "Акт передачи дел на период отпуска", description: "", value_description: ""},
        { name: "Отчет по представительским расходам", description: "", value_description: ""  },
        { name: "План заявка", description: "", value_description: "" , extra_des: 'disabled' },
        { name: "Отчет о командировке", description: "", value_description: "", extra_des: 'disabled'  },
      ],
    };
  },
  computed: {
    filteredApplications() {
      return this.applications.filter((application) => application.name.toLowerCase().includes(this.searchValue.toLowerCase()));
    },
  },
  methods: {
    openForm(name, e) {
      if(e.classList.contains('disabled')){
        this.$toast.info(`${name} находится в разработке`, {
          timeout: 3500
        })
       return
      }
      switch (name) {
        case "Ежегодный отпуск":
          this.state = "RestForm";
          break;
        case "Отпуск без сохранения заработной платы":
          this.state = "RestWoMoneyForm";
          break;
        case "Заявление на перевод":
          this.state = "TransferForm";
          break;
        case "Заявление на увольнение":
          this.state = "DismissalForm";
          break;
        case "Заявление на учебный оплачиваемый отпуск":
          this.state = "EducationalPaidLeaveForm";
          break;
        case "Акт передачи дел на период отпуска":
          this.state = "ActTransferJobForm";
          break;
        case "Отчет по представительским расходам":
          this.state = "ReportEntertainmentExpenses";
          break;
        // case "План заявка":
        //   this.state = "RestForm";
        //   break;
        // case "Отчет о командировке":
        //   this.state = "RestForm";
        //   break;
      }
    },
    clearForm(val){
      this.state = ""
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
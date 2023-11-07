<template>
  <b-card no-body>
    <b-tabs pills card vertical style="height: 100vh">
      <b-container>
        <b-tab title="Загрузка договоров">
          <b-card-text>
            <Administartion_agreementVue />
          </b-card-text>
        </b-tab>
      </b-container>
      <b-tab title="Данные по ставкам II">
          <b-card-text>
            <StavkiCSVue />
          </b-card-text>
        </b-tab>
    </b-tabs>
  </b-card>
</template>

<style scoped>
select {
  width: 100%;
  box-sizing: border-box;
}

#navbarMain {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100vh !important;
}

.nav .nav-pills {
  height: 100vh !important;
}

.nav-item {
  text-align: center !important;
}

li.nav-item {
  text-align: center !important;
  justify-content: center !important;
  background: red !important;
}
/* .nav-pills{
  background: red !important;
} */
</style>

<script>
import Administartion_agreementVue from '../components/Table/Administration/Administartion_agreement.vue';
import StavkiCSVue from '../components/Table/Administration/StavkiCS.vue';

export default {
  name: "Directory",
  components: {
    Administartion_agreementVue,
    StavkiCSVue
  },
  mounted() {
    document.title = "Администрирование";
  },
};
</script>




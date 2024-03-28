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
      <b-tab title="Выгрузка рейсов">
        <b-card-text>
          <DownloadFlights />
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




</style>

<script>
import Administartion_agreementVue from '../components/Table/Administration/Administartion_agreement.vue';
import StavkiCSVue from '../components/Table/Administration/StavkiCS.vue';
import DownloadFlights from '../components/Table/Administration/DowloadFlights/DowloadFlights.vue'
export default {
  name: "Directory",
  components: {
    Administartion_agreementVue,
    StavkiCSVue,
    DownloadFlights
  },
  computed: {
    // checkUid() {
    //   return this.$store.state.auth.uid == 236 || this.$store.state.auth.uid == 1 || this.$store.state.auth.uid == 102
    // }
  },
  mounted() {
    document.title = "Администрирование";
    console.log(this.$store.state.auth.uid)
  },
};
</script>




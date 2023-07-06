<template>
  <b-card no-body>
    <b-tabs pills card vertical style="height: 100vh">
      <b-container>
        <b-tab title="Справочник контрагенты">
          <b-card-text>
            <partnerTable />
          </b-card-text>
        </b-tab>
        <b-tab title="Справочник договора">
          <b-card-text>
            <contractTable />
          </b-card-text>
        </b-tab>
        <b-tab title="Справочник станции" active>
          <b-card-text>
            <StationsDirectory />
          </b-card-text>
        </b-tab>
        <b-tab title="Справочник страны">
          <b-card-text>
            <countries-directory />
          </b-card-text>
        </b-tab>
        <b-tab title="Справочник грузы">
          <b-card-text>
            <cargo-directory />
          </b-card-text>
        </b-tab>
        <b-tab title="Справочник вагоны">
          <b-card-text>
            <wagon-directory />
          </b-card-text>
        </b-tab>
        <b-tab title="Данные по аренде" >
          <b-card-text>
            <rentalrateTable />
          </b-card-text>
        </b-tab>
        
      </b-container>
      <b-tab title="Данные по актам ППС" >
          <b-card-text>
            <Act />
          </b-card-text>
        </b-tab>
      <b-tab title="Данные по нормативам" >
        <b-card-text>
          <StandartData />
        </b-card-text>
      </b-tab>
      <b-tab title="Данные по поступлениям" >
        <b-card-text>
          <Fin_headerVue />
        </b-card-text>
      </b-tab>
      <b-tab title="Данные по тарифам"  >
        <b-card-text>
          <TarifDirectory />
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
import partnerTable from "@/components/Table/PartnerTable.vue";
import contractTable from "@/components/Table/ContractTable.vue";
import rentalrateTable from "@/components/Table/RentalRateTable.vue";
import StationsDirectory from "@/components/Table/Directory/StationsDirectory.vue";
import CargoDirectory from "../components/Table/Directory/CargoDirectory.vue";
import CountriesDirectory from "../components/Table/Directory/CountriesDirectory.vue";
import WagonDirectory from "../components/Table/Directory/WagonDirectory.vue";
import StandartData from "../components/Table/Directory/StandartData.vue";
import Act from "@/components/Table/Directory/ActPPS/Act.vue";
import Fin_Operation from '@/components/Table/Directory/Fin_Operation'
import Fin_headerVue from '../components/Table/Directory/Fin_header.vue';
import TarifDirectory from "@/components/Table/Directory/TarifDirectory.vue";
export default {
  name: "Directory",
  components: {
    partnerTable,
    contractTable,
    rentalrateTable,
    StationsDirectory,
    CargoDirectory,
    CountriesDirectory,
    WagonDirectory,
    StandartData,
    Act,
    Fin_Operation,
    Fin_headerVue,
    TarifDirectory,
  },
  mounted() {
    document.title = "Справочники";
  },
};
</script>




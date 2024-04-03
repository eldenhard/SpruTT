<template>
  <b-card no-body >
    <b-tabs pills card vertical>
      <b-tab title="Справочник договоры" >
          <b-card-text  >
            <contractTable />
          </b-card-text>
        </b-tab>
      <b-container>
        <b-tab title="Справочник контрагенты" >
          <b-card-text>
            <partnerTable />
          </b-card-text>
        </b-tab>

        <b-tab title="Справочник станции" >
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
     
        <b-tab title="Данные по ПР" >
          <b-card-text style="width: 55vw !important; margin-left: -5%;" >
            <OtherChargesVue />
          </b-card-text>
        </b-tab>
      </b-container>



      <b-tab title="Данные по актам ППС" >
          <b-card-text>
            <Act />
          </b-card-text>
        </b-tab>
       
      <!-- <b-tab title="Данные по нормативам" >
        <b-card-text>
          <StandartData />
        </b-card-text>
      </b-tab> -->
      <b-tab title="Данные по поступлениям" >
        <b-card-text>
          <Fin_headerVue />
        </b-card-text>
      </b-tab>
      <b-tab title="Данные по аренде" >
          <b-card-text style="width: 75vw !important; overflow: hidden;">
            <rentalrateTable />
          </b-card-text>
        </b-tab>
      <b-tab title="Данные по ставкам ЦС " active>
        <b-card-text style="width: 75vw !important; ">
          <TarifDirectory />
        </b-card-text>
      </b-tab>
      <b-tab title="Данные по ставкам ПВ"  >
        <b-card-text >
          <stavkipvVue />
        </b-card-text>
      </b-tab>
      <b-tab title="План погрузки" >
        <b-card-text>
          <LoadingPlanAndFactVue />
        </b-card-text>
      </b-tab>

      <b-tab title="Загрузка актов" >
        <b-card-text>
          <LoadingActs />
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
import partnerTable from "@/components/Table/PartnerTable.vue";
import contractTable from "@/components/Table/ContractTable.vue";
import rentalrateTable from "@/components/Table/RentalRateTable.vue";
import StationsDirectory from "@/components/Table/Directory/StationsDirectory.vue";
import CargoDirectory from "../components/Table/Directory/CargoDirectory.vue";
import CountriesDirectory from "../components/Table/Directory/CountriesDirectory.vue";
import WagonDirectory from "../components/Table/Directory/WagonDirectory.vue";
import StandartData from "../components/Table/Fines/StandartData.vue";
import Act from "@/components/Table/Directory/ActPPS/Act.vue";
import Fin_Operation from '@/components/Table/Directory/Fin_Operation'
import Fin_headerVue from '../components/Table/Directory/Fin_header.vue';
import TarifDirectory from "@/components/Table/Directory/TarifDirectory.vue";
import OtherChargesVue from '../components/Table/Directory/OtherCharges/OtherCharges.vue';
import stavkipvVue from '../components/Table/Directory/StavkiPV/stavkipv.vue';
import allformdocument from '../components/Table/ReferenceInformation/AllFormsDocument/AllFormDocument.vue'
import LoadingActs from '../components/Table/Directory/LoadingActs/LoadingActs.vue'

import LoadingPlanAndFactVue from '../components/Table/Directory/LoadingPlanAndFact/LoadingPlanAndFact.vue';
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
    OtherChargesVue,
    stavkipvVue,
    allformdocument,
    LoadingPlanAndFactVue,
    LoadingActs,
  },
  mounted() {
    document.title = "Справочники";
  
  },
};
</script>




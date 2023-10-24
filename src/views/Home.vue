<template>
  <b-card no-body>
    <b-tabs pills card vertical style="height: 100vh">
      <b-container>
        <b-tab title="Справочник контрагенты">
          <b-card-text>
            <partnerTable />
          </b-card-text>
        </b-tab>
        <b-tab title="Справочник договоры" active  style="width: 120% !important; margin-left: -10% !important;">
          <b-card-text  >
            <contractTable />
          </b-card-text>
        </b-tab>

        <b-tab title="Типовые формы документов" @click="$refs.child1.getData('Типовые формы документов')">
          <b-card-text>
            <allformdocument :typeDocument="'Типовые формы документов'" ref="child1"/>
          </b-card-text>
        </b-tab>
        <b-tab title="Учредительные документы"  @click="$refs.child2.getData('Учредительные документы')">
          <b-card-text>
            <allformdocument :typeDocument="'Учредительные документы'" ref="child2"/>
          </b-card-text>
        </b-tab>
        <b-tab title="Локально нормативные акты" @click="$refs.child3.getData('Локально нормативные акты')">
          <b-card-text>
            <allformdocument :typeDocument="'Локально нормативные акты'" ref="child3"/>
          </b-card-text>
        </b-tab>
        <b-tab title="Приказы и распоряжения"  @click="$refs.child4.getData('Приказы и распоряжения')">
          <b-card-text>
            <allformdocument :typeDocument="'Приказы и распоряжения'" ref="child4"/>
          </b-card-text>
        </b-tab>


        <b-tab title="Шаблоны договоров">
          <b-card-text>
            <templates />
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
        <b-tab title="Данные по аренде" >
          <b-card-text>
            <rentalrateTable />
          </b-card-text>
        </b-tab>
        <b-tab title="Данные по ПР" >
          <b-card-text style="width: 55vw !important; margin-left: -17%;" >
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
      <b-tab title="Данные по ставкам"  >
        <b-card-text>
          <TarifDirectory />
        </b-card-text>
      </b-tab>
      <b-tab title="Данные по ставкам ПВ">
        <b-card-text>
          <stavkipvVue />
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
import StandartData from "../components/Table/Fines/StandartData.vue";
import Act from "@/components/Table/Directory/ActPPS/Act.vue";
import Fin_Operation from '@/components/Table/Directory/Fin_Operation'
import Fin_headerVue from '../components/Table/Directory/Fin_header.vue';
import TarifDirectory from "@/components/Table/Directory/TarifDirectory.vue";
import OtherChargesVue from '../components/Table/Directory/OtherCharges/OtherCharges.vue';
import stavkipvVue from '../components/Table/Directory/StavkiPV/stavkipv.vue';
import templates from '../components/Table/Directory/Templates/Templates.vue'
import allformdocument from '../components/Table/Directory/AllFormsDocument/AllFormDocument.vue'
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
    templates,
    allformdocument,
  },
  mounted() {
    document.title = "Справочники";
  },
};
</script>




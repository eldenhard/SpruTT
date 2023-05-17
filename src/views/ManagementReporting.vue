<template>
    <div style="display: flex;">
      <div style="width: 15%;">
          <ManagemtRepNavbar :tabs="tabs" :counter="counter"></ManagemtRepNavbar>
      </div>
      <div style="width: 80%; ">
        <p class="infoNull" v-if="tabs.length === 0">
          Вы не выбрали ещё ни одной таблицы
        </p>
        <b-card no-body class="leftTable">
          <b-tabs card v-model="tabActive" @changed="onTabChanged">
            <b-tab v-for="i in tabs" :key="i.id">
              <template #title>
                <span>Таблица {{ i.name }}</span>
                <span @click="closeTab(i.id)">&nbsp;&nbsp;❌</span>
              </template>
  
              <b-card-text v-if="i.name === 'Вагоны'">
              <component :is="wt"></component>
            </b-card-text>
            <b-card-text v-if="i.name === 'Расчет'">
              <WPCalculate />
            </b-card-text>
            <b-card-text v-if="i.name === 'Отправки БЧ'">
              <BCH />
            </b-card-text>
            <b-card-text v-if="i.name === 'Телеграммы'">
              <WagonTableTelegram />
            </b-card-text>
            <b-card-text v-if="i.name === 'Ремонты'">
              <WagonRepair />
            </b-card-text>
            <b-card-text v-if="i.name === 'Тариф по сопредельным территориям'">
              <TerritoryTable />
            </b-card-text>
            <div v-if="i.name === 'Сотрудники'">
                <StaffTable />
              </div>
            <b-card-text v-if="i.name === 'Отчет брошенные вагоны'">
              <ReportAbandoned />
            </b-card-text>

            <!-- <b-card-text v-if="i.name === 'Размещение парка'">
                <AccomodationPark />
              </b-card-text> -->
              <b-card-text v-if="i.name === 'Размещение парка'">
                <Table2 />
              </b-card-text>
              <!-- <b-card-text v-if="i.name === 'Формирование парка'">
                <FormationPark />
              </b-card-text> -->
              <b-card-text v-if="i.name === 'Формирование парка'">
                <Table1 />
              </b-card-text>

              <b-card-text v-if="i.name === 'Арендованный парк'">
                <Table3 />
              </b-card-text>

              <b-card-text v-if="i.name === 'Парк в аренде'">
                <Table4 />
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  
  </template>
  
  <script>
  import FormationPark from "@/components/Table/ManagmentRepReporting/FormationPark.vue";
  import ManagemtRepNavbar from "@/components/Navbar/ManagementRepNavbar.vue"
  import WagonNavbar from "../components/Navbar/WagonNavbar.vue";
  import WPMainData from "../components/Table/WagonPark/WPMainData.vue";
  import ReportAbandoned from "../components/Table/ReportAbandoned.vue";
  import WagonTableTelegram from "../components/Table/WagonTelegram/WagonTableTelegram.vue";
  import WPCalculate from "@/components/Table/WagonPark/RailTarif/WPCalculate.vue";
  import WagonRepair from "@/components/Table/WagonPark/WPRepair.vue";
  import BCH from "@/components/Table/WagonPark/ShipmentBCH/BCH.vue";
  import StaffTable from "@/components/Table/StaffTable.vue";
  import AccomodationPark from "@/components/Table/ManagmentRepReporting/AccomodationPark.vue";
  import TerritoryTable from '../components/Table/WagonPark/TerritoryTariff/TerritoryTable.vue';


import Table1 from "@/components/Table/ManagmentRepReporting/Table1.vue";
import Table2 from "@/components/Table/ManagmentRepReporting/Table2.vue";
import Table3 from "@/components/Table/ManagmentRepReporting/Table3.vue";
import Table4 from "@/components/Table/ManagmentRepReporting/Table4.vue";

  export default {
    name: "managmentReporting",
    components: { 
    FormationPark,
    ManagemtRepNavbar,
      StaffTable,
      WPMainData,
      ReportAbandoned,
      WagonTableTelegram,
      WPCalculate,
      WagonRepair,
      BCH, 
      AccomodationPark,
      TerritoryTable,


      Table1,
      Table2,
      Table3,
      Table4,

    },
    data() {
      return {
        tabs: [],
        counter: 1,
        tabActive: 0,
        wt: "WPMainData",

      };
    },
    methods: {
      closeTab(x) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].id === x) {
            this.tabs.splice(i, 1);
          }
        }
        localStorage.setItem("tabs", JSON.stringify([...this.tabs]));
      },
      onTabChanged() {
        this.tabActive = this.tabs.length - 1;
      },
    },
    mounted() {
      const tabs = localStorage.getItem("tabs");
      if (tabs) {
        this.tabs = JSON.parse(tabs);
      }
      document.title = "Управленческая отчетность";
    },
  };
  </script>
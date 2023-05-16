
<template>
  <div style="display: flex;">
    <div style="width: 15%;">
      <WagonNavbar :tabs="tabs" :counter="counter" ></WagonNavbar>
    </div>
    <div style="width: 85%; ">
      <p class="infoNull" v-if="tabs.length === 0">
        Вы не выбрали ещё ни одной таблицы
      </p>
      <b-card no-body class="leftTable" >
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

            <b-card-text v-if="i.name === 'Размещение парка'">
                <AccomodationPark />
              </b-card-text>

              <b-card-text v-if="i.name === 'Формирование парка'">
                <FormationPark />
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
export default {
  name: "WagonPark",
  components: {
    WPMainData,
    WagonNavbar,
    ReportAbandoned,
    WagonTableTelegram,
    WPCalculate,
    WagonRepair,
    BCH,
    StaffTable,
    TerritoryTable,
    FormationPark,
    ManagemtRepNavbar,
    AccomodationPark
  },
  data() {
    return {
      tabs: [],
      counter: 1,
      wt: "WPMainData",
      tabActive: 0,

    };
  },

  methods: {
    onTabChanged() {
      this.tabActive = this.tabs.length - 1;
    },
    closeTab(x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].id === x) {
          this.tabs.splice(i, 1);
        }
      }
      localStorage.setItem("tabs", JSON.stringify([...this.tabs]));
    },

  },
  watch: {
    tabs() {
      console.log(this.tabs[this.tabs.length - 1].name)
    }
  },
  mounted() {
    // console.log(document.querySelector('.tabs'))
    const tabs = localStorage.getItem("tabs");
    if (tabs) {
      this.tabs = JSON.parse(tabs);
    }


    document.title = "Вагонный парк";
  },
};
</script>
  
<style>
.infoNull {
  text-align: center;
  padding-top: 1%;
  font-weight: bold;
}

select {
  width: 100%;
  box-sizing: border-box;
}

#navbarMain {
  background: #cecece;
  display: block;
  height: 120px;
}

.navbarList li>a {
  display: block;
  text-decoration: none;
}

.navbarul {
  padding-top: 8px;
  margin-left: 0.5%;
}

ul.navbarul li {
  display: inline-block;
}

.navbarList {
  display: block;
  margin-left: 2px;
  list-style: none;
  text-align: center;
  padding: 7px 10px;
  border: 1px solid #ececec;
  background: #ececec;
  cursor: pointer;
  height: 100px;
}

.navbarList:hover {
  border: 1px solid #9d9d9d;
}

.image {
  width: 40px;
  margin-top: 5px;
}

.navbarDescription {
  color: #000000;
  font-size: 400;
  font-size: 12px;
  /* padding-top: 6px; */
  margin-bottom: 0;
  bottom: 0;
  text-align: left;
}
</style>
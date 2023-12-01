
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

            <b-card-text v-if="i.name === 'Продление срока ввоза'">
              <ExtensionPeriod />
            </b-card-text>

            <div v-if="i.name === 'Сотрудники'">
                <ReferenceInformation />
              </div>
            <b-card-text v-if="i.name === 'Отчет брошенные вагоны'">
              <ReportAbandoned />
            </b-card-text>

            <b-card-text v-if="i.name === 'Данные по дислокациям'">
              <DataDislocation />
            </b-card-text>

            <b-card-text v-if="i.name === 'GLP'">
              <GLP />
            </b-card-text>

            <b-card-text v-if="i.name === 'Влияние простоя брош. ваг. на просрочку доставки'">
              <ImpactDowntimeVue />
            </b-card-text>

            <b-card-text v-if="i.name === 'Данные по количеству брош.ваг.'">
              <DropWagonAmount />
            </b-card-text>

       
            <b-card-text v-if="i.name === 'Калькулятор ставок'">
              <CallculatorRT />
            </b-card-text>

            

            <b-card-text v-if="i.name === 'Размещение парка'">
                <Table2 />
              </b-card-text>
              <b-card-text v-if="i.name === 'Формирование парка'">
                <FormationPark />
              </b-card-text>
              <!-- <b-card-text v-if="i.name === 'Формирование парка'">
                <Table1 />
              </b-card-text> -->

              <b-card-text v-if="i.name === '3. Арендованный парк'">
                <Table3 />
              </b-card-text>

              <b-card-text v-if="i.name === '4. Парк, переданный в аренду'">
                <Table4 />
              </b-card-text>

              <b-card-text v-if="i.name === '5. Справка о выполнении перевозок полувагонами'">
                <Table5 />
              </b-card-text>

              <b-card-text v-if="i.name === '6. Справка о выполнении перевозок вагоно-цистернами'">
                <Table6 />
              </b-card-text>

              <b-card-text v-if="i.name === '7. Анализ перевозки и выручки по сегменту полувагонов'">
                <Table7 />
              </b-card-text>

              <b-card-text v-if="i.name === '8. Производство по универсальным перевозкам (собственный парк)'">
                <Table8 />
              </b-card-text>
              <b-card-text v-if="i.name === '9. Производство по универсальным перевозкам (привлеченный парк)'">
                <Table9 />
              </b-card-text>
              <b-card-text v-if="i.name === '10. Производство по наливным перевозкам (собственный парк)'">
                <Table10 />
              </b-card-text>
              <b-card-text v-if="i.name === '11. Производство по наливным перевозкам (привлеченный парк)'">
                <Table11 />
              </b-card-text>
              <b-card-text v-if="i.name === '12. Доходность по виду перевозок по сегменту полувагонов'">
                <Table12 />
              </b-card-text>
              <b-card-text v-if="i.name === '13. Анализ доходности по сегменту вагоно-цистерн'">
                <Table13 />
              </b-card-text>
              <b-card-text v-if="i.name === '14. Анализ доходности по направлениям по сегменту вагоно-цистерн (собственный парк)'">
                <Table14 />
              </b-card-text>
              <b-card-text v-if="i.name === '15. Анализ доходности по направлениям по сегменту вагоно-цистерн (привлеченный парк)'">
                <Table15 />
              </b-card-text>
              <b-card-text v-if="i.name === '16. Операционные доходы и расходы в детализации «до вагона»'">
                <Table16 />
              </b-card-text>
              <b-card-text v-if="i.name === '17. Свод доходов и расходов по производственной деятельности'">
                <Table17 />
              </b-card-text>
              <b-card-text v-if="i.name === '18. Операционная прибыль от предоставления вагонов под погрузку по сегменту вагоно-цистерн'">
                <Table18 />
              </b-card-text>
              <b-card-text v-if="i.name === '19. Операционная прибыль от предоставления вагонов под погрузку по сегменту полувагонов'">
                <Table19 />
              </b-card-text>
              <b-card-text v-if="i.name === '20. Совокупная операционная прибыль от предоставления вагонов под погрузку'">
                <Table20 />
              </b-card-text>
              <b-card-text v-if="i.name === '21. Анализ маржинального дохода по сегменту вагоно-цистерн'">
                <Table21 />
              </b-card-text>

              
              <b-card-text v-if="i.name === '22. Сводные расходы на ремонт ПС'">
                <Table22 />
              </b-card-text>
              <b-card-text v-if="i.name === '23. Депо плановых ремонтов'">
                <Table23 />
              </b-card-text>
              <b-card-text v-if="i.name === '24. Простои в ремонте'">
                <Table24 />
              </b-card-text>
              <b-card-text v-if="i.name === '25. Сводные показатели деятельности'">
                <Table25 />
              </b-card-text>
              <b-card-text v-if="i.name === '26. Состояние взаиморасчетов с клиентами'">
                <Table26 />
              </b-card-text>


              <b-card-text v-if="i.name === '27. Состояние взаиморасчетов с экспедиторами по сопредельным территориям'">
                <Table27 />
              </b-card-text>
              <b-card-text v-if="i.name === '28. Детализированное состояние взаиморасчетов с экспедиторами по сопредельным территориям'">
                <Table28 />
              </b-card-text>
              
            <b-card-text v-if="i.name === 'Фин. отчет №1'">
              <FinanceReport />
            </b-card-text>
            <b-card-text v-if="i.name === 'Фин. отчет №2'">
              <FinanceReport2 />
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
  import ReferenceInformation from "@/components/Table/ReferenceInformation/ReferenceInformation.vue";
  import AccomodationPark from "@/components/Table/ManagmentRepReporting/AccomodationPark.vue";
  import TerritoryTable from '../components/Table/WagonPark/TerritoryTariff/TerritoryTable.vue';
  import ExtensionPeriod from '../components/Table/WagonPark/ExtensionPeriod.vue'
  import DataDislocation from '../components/Table/WagonPark/Dislocation/DataDislocation.vue'
  import GLP from '../components/Table/WagonPark/GLP/GLP.vue'
  import ImpactDowntimeVue from '../components/Table/WagonPark/ImpactDowntime/ImpactDowntime.vue';
  import DropWagonAmount from '../components/Table/WagonPark/DropWagonAmount/DropWagonAmount.vue'

  import Table1 from "@/components/Table/ManagmentRepReporting/Table1.vue";
import Table2 from "@/components/Table/ManagmentRepReporting/Table2.vue";
import Table3 from "@/components/Table/ManagmentRepReporting/Table3.vue";
import Table4 from "@/components/Table/ManagmentRepReporting/Table4.vue";
import Table5 from "@/components/Table/ManagmentRepReporting/Table5.vue";
import Table6 from "@/components/Table/ManagmentRepReporting/Table6.vue";
import Table7 from "@/components/Table/ManagmentRepReporting/Table7.vue";
import Table8 from "@/components/Table/ManagmentRepReporting/Table8.vue";
import Table9 from "@/components/Table/ManagmentRepReporting/Table9.vue";
import Table10 from "@/components/Table/ManagmentRepReporting/Table10.vue";
import Table11 from "@/components/Table/ManagmentRepReporting/Table11.vue";
import Table12 from "@/components/Table/ManagmentRepReporting/Table12.vue";
import Table13 from "@/components/Table/ManagmentRepReporting/Table13.vue";
import Table14 from "@/components/Table/ManagmentRepReporting/Table14.vue";
import Table15 from "@/components/Table/ManagmentRepReporting/Table15.vue";
import Table16 from "@/components/Table/ManagmentRepReporting/Table16.vue";
import Table17 from "@/components/Table/ManagmentRepReporting/Table17.vue";
import Table18 from "@/components/Table/ManagmentRepReporting/Table18.vue";
import Table19 from "@/components/Table/ManagmentRepReporting/Table19.vue";
import Table20 from "@/components/Table/ManagmentRepReporting/Table20.vue";
import Table21 from "@/components/Table/ManagmentRepReporting/Table21.vue";
import Table22 from "@/components/Table/ManagmentRepReporting/Table22.vue";
import Table23 from "@/components/Table/ManagmentRepReporting/Table23.vue";
import Table24 from "@/components/Table/ManagmentRepReporting/Table24.vue";
import Table25 from "@/components/Table/ManagmentRepReporting/Table25.vue";
import Table26 from "@/components/Table/ManagmentRepReporting/Table26.vue";
import Table27 from "@/components/Table/ManagmentRepReporting/Table27.vue";
import Table28 from "@/components/Table/ManagmentRepReporting/Table28.vue";
import ExtensionPeriodVue from '../components/Table/WagonPark/ExtensionPeriod.vue';
import DropWagonAmountVue from '../components/Table/WagonPark/DropWagonAmount/DropWagonAmount.vue';
import CallculatorRT from '../components/Table/WagonPark/CalculatorRT/CallculatorRT.vue';
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
    ReferenceInformation,
    TerritoryTable,
    FormationPark,
    ManagemtRepNavbar,
    AccomodationPark,
    ExtensionPeriod,
    DataDislocation,
    GLP,
    ImpactDowntimeVue,
    DropWagonAmount,
    CallculatorRT,

    Table1,
      Table2,
      Table3,
      Table4,
      Table5,
      Table6,
      Table7,
      Table8,
      Table9,
      Table10,
      Table11,
      Table12,
      Table13,
      Table14,
      Table15,
      Table16,
      Table17,
      Table18,
      Table19,
      Table20,
      Table21,
      Table22,
      Table23,
      Table24,
      Table25,
      Table26,
      Table27,
      Table28,

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
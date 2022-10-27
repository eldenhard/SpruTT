
<template>
    <div>
        <WagonNavbar :tabs="tabs"  :counter="counter"></WagonNavbar>
        <p class="infoNull" v-if="tabs.length === 0">Вы не выбрали ещё ни одной таблицы</p>
        <div>
            <b-card no-body class="leftTable">
                <b-tabs card>
                    <b-tab v-for="i in tabs" :key="i.id" >
  
                        <template #title>
                            <span>Таблица {{i.name}}</span>
                            <span @click="closeTab(i.id)">&nbsp;&nbsp;❌</span>
                        </template>
  
                        <b-card-text>
                          
                            {{i.name}}
                            <div v-if="i.name==='Рейсы'"> 
                                <FlightTable/>
                            </div>
                            <div v-if="i.name==='Вагоны'"> 
                                <WagonTable/>
                            </div>
                            <div v-if="i.name==='Брошенные вагоны'"> 
                                <AbandonTable/>
                            </div>
                            <div v-if="i.name==='Полигоны'"> 
                                <WagonTablePoligon/>
                            </div>
                            <div v-if="i.name === 'Дислокация'">
                               <DislocationTable/>
                            </div>

                            <div v-if="i.name === 'Отчет брошенные вагоны'">
                               <ReportAbandoned/>
                            </div>
                        
                        </b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
  
  </template>
  
  <script>
  import WagonNavbar from '../components/Navbar/WagonNavbar.vue'
  import WagonTable from '../components/Table/WagonTable.vue'
  import FlightTable from '../components/Table/FlightTable.vue'
  import DislocationTable from '../components/Table/DislocationTable.vue'
  import AbandonTable from '../components/Table/AbandonTable.vue'
  import ReportAbandoned from '../components/Table/ReportAbandoned.vue'
  import WagonTablePoligon from '../components/Table/WagonTablePoligon.vue'

    
export default{
    name: 'WagonPark',
    components:{WagonTable, FlightTable, WagonNavbar, DislocationTable, AbandonTable, ReportAbandoned, WagonTablePoligon},
    data() {
        return {
            tabs: [],
            counter: 1,
        }
    },
    methods:{
        closeTab(x) {
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].id === x) {
                    this.tabs.splice(i, 1)
                }
            }
            localStorage.setItem('tabs', JSON.stringify([...this.tabs]))
        },
    },
    mounted() {
        const tabs = localStorage.getItem('tabs')
        if (tabs) {
            this.tabs = JSON.parse(tabs)
        }
    } 
}
  
  
  
  
  </script>
  
  
  <style>
.infoNull{
    text-align: center;
    padding-top: 1%;
    font-weight: bold;
  }
select{
    width: 100%;
    box-sizing: border-box;
  }
#navbarMain{
    background: #CECECE;
    display: block;
    height: 120px;
  }
.navbarList li > a {
    display: block;
    text-decoration: none;
  }
.navbarul{
      padding-top: 8px;
      margin-left: 0.5%;
  }
ul.navbarul li{
      display: inline-block;
  }
.navbarList{
  display: block;
  margin-left: 2px;
  list-style: none;
  text-align: center;
  padding: 7px 10px;
  border: 1px solid #ECECEC;
  background: #ECECEC;
  cursor: pointer;
  height: 100px;
  }
.navbarList:hover{
      border: 1px solid #9D9D9D;
  }
.image{
      width: 40px;
      margin-top: 5px;
  }
.navbarDescription{
      color: #000000;
      font-size: 400;
      font-size: 12px;
      /* padding-top: 6px; */
      margin-bottom: 0;
      bottom: 0;
     text-align: left;
  }
  </style>
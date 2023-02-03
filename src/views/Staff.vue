<template>
  <div class="row">
    <div class="col-md-2">
        <StaffNavbar :tabs="tabs" :counter="counter"></StaffNavbar>
    </div>
    <div class="col-md-10">
      <p class="infoNull" v-if="tabs.length === 0">
        Вы не выбрали ещё ни одной таблицы
      </p>
      <b-card no-body class="leftTable">
        <b-tabs card>
          <b-tab v-for="i in tabs" :key="i.id">
            <template #title>
              <span>Таблица {{ i.name }}</span>
              <span @click="closeTab(i.id)">&nbsp;&nbsp;❌</span>
            </template>

            <b-card-text>
              <div v-if="i.name === 'Сотрудники'">
                <StaffTable />
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
  <!-- <div>
        <StaffNavbar :tabs="tabs" :counter="counter"></StaffNavbar>
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
                            <div v-if="i.name==='Сотрудники'"> 
                                <StaffTable/>
                            </div>
                            
                        
                        </b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
        </div> -->
</template>

<script>
import StaffNavbar from "@/components/Navbar/StaffNavbar.vue";
import StaffTable from "@/components/Table/StaffTable.vue";
export default {
  name: "Staff",
  components: { StaffNavbar, StaffTable },
  data() {
    return {
      tabs: [],
      counter: 1,
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
  },
  mounted() {
    const tabs = localStorage.getItem("tabs");
    if (tabs) {
      this.tabs = JSON.parse(tabs);
    }
    document.title = "Кадровая служба";
  },
};
</script>
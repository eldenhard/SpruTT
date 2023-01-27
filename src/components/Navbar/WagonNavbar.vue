<template>
  <div id="navbarMain">
    <b-card no-body>
      <b-tabs
        pills
        card
        vertical
        nav-wrapper-class="w-100"
        style="
          background: white;
          height: 100vh !important;
          text-align: center !important;
          justify-content: center !important;
        "
      >
        <b-container class="bv-example-row">
          <b-tab title="Вагоны" active @click="newTab('Вагоны')"> </b-tab>
          <b-tab title="Полигоны" @click="newTab('Полигоны')"> </b-tab>
          <b-tab title="Телеграммы" @click="newTab('Телеграммы')"> </b-tab>
        </b-container>
      </b-tabs>
    </b-card>
    <!-- <button class="nav-button"  @click="newTab('Вагоны')">Вагоны</button>
                    <button class="nav-button" @click="newTab('Полигоны')">Полигоны</button>
                    <button class="nav-button" @click="newTab('Телеграммы')">Телеграммы</button> -->
  </div>

  <!-- <li class="navbarList"  style="filter:brightness(0.8)">
                    
                    <div @click="newTab('Дислокация')" style="filter:brightness(0.8)">
                      
                    </div>
                    <img src="@/assets/map.png" class="image">
                    <b-dropdown text="Дислокация" style="width: 100%" disabled>
                        <b-dropdown-item @click="newTab('Дислокация-таблица')" >дислокация 1</b-dropdown-item>
                    </b-dropdown>
                </li> -->

  <!-- <li class="navbarList" style="filter:brightness(0.8)">
                    <div @click="newTab('Рейсы')">
                        <div>
                        <img src="@/assets/flight.png" class="image">
                    </div>
                    <b-dropdown text="Рейсы" style="width: 100%" disabled>
                        <b-dropdown-item @click="newTab('Рейсы-таблица')">Рейсы 1</b-dropdown-item>
                    </b-dropdown>
                </li> -->

  <!-- <li class="navbarList">
                  <div style="filter:brightness(0.8)">
                    <div @click="newTab('Отчеты')">
                        <img src="@/assets/report.png" class="image">
                    </div>
                    <b-dropdown text="Отчеты" style="width: 100%" >
                        <b-dropdown-item @click="newTab('Отчеты-таблица')">Отчеты 1</b-dropdown-item>
                        <b-dropdown-item @click="newTab('Отчет брошенные вагоны')">БРОС. вагоны</b-dropdown-item>
                        <b-dropdown-item @click="newTab('Брошенные вагоны')">План факт. по дог.</b-dropdown-item>


                    </b-dropdown>
                </li> -->
</template>
  
  <script>
export default {
  name: "Navbar",
  props: ["tabs", "counter"],
  data: function () {
    return {
      inner_counter: this.counter,
    };
  },
  methods: {
    newTab(tabname) {
      this.tabs.push({ name: tabname, id: Date.now() });
      localStorage.setItem("tabs", JSON.stringify([...this.tabs]));
    },
  },
};
</script>

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
}
</style>
  
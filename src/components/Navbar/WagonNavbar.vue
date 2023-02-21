<template>
  <div id="navbarMain">
    <b-card no-body>
      <b-tabs pills card vertical nav-wrapper-class="w-100" class="test" style="background: white;height: 100vh !important;text-align:center !important;
            justify-content: center !important;
            ">
        <b-container class="bv-example-row">
          <b-tab title="Вагоны" @click="newTab('Вагоны')" style="display: none !important"> </b-tab>
          <b-tab title="Телеграммы" @click="newTab('Телеграммы')" style="display: none !important"> </b-tab>
          <b-tab title="Ремонты" @click="newTab('Ремонты')" style="display: none !important"> </b-tab>
          <b-tab title="Расчет" @click="newTab('Расчет')" style="display: none !important"> </b-tab>
          <b-tab  title="Отправки БЧ" @click="newTab('Отправки БЧ')" style="display: none !important"> </b-tab>

        </b-container>
      </b-tabs>
    </b-card>
  </div>
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
  
<template>

    <b-card no-body >
    <b-tabs pills card vertical style="height: 100vh;">
        <b-container>
          <b-tab title="Вагоны" @click="newTab('Вагоны')"> </b-tab>
          <b-tab title="Телеграммы" @click="newTab('Телеграммы')" > </b-tab>
          <b-tab title="Ремонты" @click="newTab('Ремонты')" > </b-tab>
          <b-tab title="Расчет" @click="newTab('Расчет')" > </b-tab>
          <b-tab title="Отправки БЧ" @click="newTab('Отправки БЧ')" > </b-tab>
          <b-tab title="Тариф по сопр. терр." @click="newTab('Тариф по сопредельным территориям')" >  </b-tab>
          <b-tab title="Продление срока ввоза" @click="newTab('Продление срока ввоза')" >  </b-tab>
        </b-container>
      </b-tabs>
    </b-card>

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

.btnnav {
  background: red;
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
  
<template>

    <b-card no-body  style="background: #F6F6F7 !important; height: 100%;">
    <b-tabs pills card vertical  style="background: #F6F6F7 !important;  height: 100%;">
        <b-container style="background: #F6F6F7 !important;  height: 100%;">
          <b-tab title="Вагоны" @click="newTab('Вагоны')"></b-tab>
          <b-tab title="Телеграммы" @click="newTab('Телеграммы')" ></b-tab>
          <b-tab title="Ремонты" @click="newTab('Ремонты')" ></b-tab>
          <b-tab title="Расчет" @click="newTab('Расчет')" ></b-tab>
          <b-tab title="Отправки БЧ" @click="newTab('Отправки БЧ')" ></b-tab>
          <b-tab title="Тариф по сопр. терр." @click="newTab('Тариф по сопредельным территориям')" > </b-tab>
          <b-tab title="Продление срока ввоза" @click="newTab('Продление срока ввоза')" > </b-tab>
          <b-tab title="Данные по дислокациям" @click="newTab('Данные по дислокациям')" > </b-tab>
          <b-tab title="GLP" @click="newTab('GLP')"> </b-tab>
          <b-tab title="Влияние простоя брош. ваг. на просрочку доставки" @click="newTab('Влияние простоя брош. ваг. на просрочку доставки')"></b-tab>
          <b-tab title="Данные по количеству брош.ваг." @click="newTab('Данные по количеству брош.ваг.')"></b-tab>
          <b-tab title="Калькулятор ставок" @click="newTab('Калькулятор ставок')"></b-tab>
          <!-- <b-tab title="Ввод бюджета" @click="newTab('Ввод бюджета')"></b-tab> -->
          <b-tab title="Оперативная справка" @click="newTab('Оперативная справка')">  </b-tab>
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
.nav-pills .nav-link.active {
  background: transparent !important;
  color: #2e67b1 !important;
  font-weight: 600;
}
/* .nav .nav-pills {
  height: 100vh !important;
}

.nav-item {
  text-align: center !important;
}

li.nav-item {
  text-align: center !important;
  justify-content: center !important;
} */
</style>
  
<template>
    <div id="navbarMain">
      <b-card no-body>
        <b-tabs pills card vertical nav-wrapper-class="w-100" style="
              background: white;
              height: 100vh !important;
              text-align: center !important;
              justify-content: center !important;
            ">
          <b-container class="bv-example-row">
            <b-tab title="Формирование парка " active @click="newTab('Формирование парка')"> </b-tab>
            <b-tab title="Размещение парка " active @click="newTab('Размещение парка')"> </b-tab>
            <b-tab title="Арендованный парк " active @click="newTab('Арендованный парк')"> </b-tab>
            <b-tab title="Парк, переданный в аренду " active @click="newTab('Парк, переданный в аренду')"> </b-tab>
            <b-tab title="Справка о выполнении перевозок полувагонами " active @click="newTab('Справка о выполнении перевозок полувагонами')"> </b-tab>
            <b-tab title="Анализ перевозки и выручки по сегменту полувагонов" active @click="newTab('Анализ перевозки и выручки по сегменту полувагонов')"> </b-tab>
            <b-tab title="Производство по универсальным перевозкам (собственный парк)" active @click="newTab('Производство по универсальным перевозкам (собственный парк)')"> </b-tab>
            <b-tab title="Производство по универсальным перевозкам (привлеченный парк)" active @click="newTab('Производство по универсальным перевозкам (привлеченный парк)')"> </b-tab>

            <b-tab title="Фин. отчет №1" active @click="newTab('Фин. отчет №1')"> </b-tab>
            <b-tab title="Фин. отчет №2" active @click="newTab('Фин. отчет №2')"> </b-tab>

          </b-container>
        </b-tabs>
      </b-card>
    </div>
  </template>
    
  <script>
  
  
  export default {
    name: 'ManagmentRepNavbar',
    props: ['tabs', 'counter'],
    data: function () {
      return {
        inner_counter: this.counter
      }
    },
    methods: {
      newTab(tabname) {
        this.tabs.push({ 'name': tabname, 'id': Date.now() })
  
        localStorage.setItem('tabs', JSON.stringify([...this.tabs]))
      }
    }
  
  }
  
  </script>
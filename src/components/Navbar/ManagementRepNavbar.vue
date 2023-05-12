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
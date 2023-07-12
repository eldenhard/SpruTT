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
            <b-tab title="3. Арендованный парк " active @click="newTab('3. Арендованный парк')"> </b-tab>
            <b-tab title="4. Парк, переданный в аренду " active @click="newTab('4. Парк, переданный в аренду')"> </b-tab>
            <b-tab title="5. Справка о выполнении перевозок полувагонами " active @click="newTab('5.Справка о выполнении перевозок полувагонами')"> </b-tab>
            <b-tab title="6. Справка о выполнении перевозок вагоно-цистернами" active @click="newTab('6. Справка о выполнении перевозок вагоно-цистернами')"> </b-tab>

            <b-tab title="7. Анализ перевозки и выручки по сегменту полувагонов" active @click="newTab('7. Анализ перевозки и выручки по сегменту полувагонов')"> </b-tab>
            <b-tab title="8. Производство по универсальным перевозкам (собственный парк)" active @click="newTab('8. Производство по универсальным перевозкам (собственный парк)')"> </b-tab>
            <b-tab title="9. Производство по универсальным перевозкам (привлеченный парк)" active @click="newTab('9. Производство по универсальным перевозкам (привлеченный парк)')"> </b-tab>
            <!-- 10 -->
            <b-tab title="10. Производство по наливным перевозкам (собственный парк)" active @click="newTab('10. Производство по наливным перевозкам (собственный парк)')"> </b-tab>
            <!-- 11 -->
            <b-tab title="11. Производство по наливным перевозкам (привлеченный парк)" active @click="newTab('11. Производство по наливным перевозкам (привлеченный парк)')"> </b-tab>
            <!-- 12 -->
            <b-tab title="12. Доходность по виду перевозок по сегменту полувагонов" active @click="newTab('12. Доходность по виду перевозок по сегменту полувагонов')"> </b-tab>
            <!-- 13 -->
            <b-tab title="13. Анализ доходности по сегменту вагоно-цистерн" active @click="newTab('13. Анализ доходности по сегменту вагоно-цистерн')"> </b-tab>
            <!-- 14 -->
            <b-tab title="14. Анализ доходности по направлениям по сегменту вагоно-цистерн (собственный парк)" active @click="newTab('14. Анализ доходности по направлениям по сегменту вагоно-цистерн (собственный парк)')"> </b-tab>
            <!-- 15 -->
            <b-tab title="15. Анализ доходности по направлениям по сегменту вагоно-цистерн (привлеченный парк)" active @click="newTab('15. Анализ доходности по направлениям по сегменту вагоно-цистерн (привлеченный парк)')"> </b-tab>

            <b-tab title="22. Сводные расходы на ремонт ПС" active @click="newTab('22. Сводные расходы на ремонт ПС')"> </b-tab>
            <b-tab title="24. Простои в ремонте" active @click="newTab('24. Простои в ремонте')"> </b-tab>

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
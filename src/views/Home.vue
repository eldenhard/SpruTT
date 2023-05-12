
<!-- <template>
  <div id="navbarMain">
    <b-card no-body>
      <b-tabs pills card vertical nav-wrapper-class="w-100" class="test" style="background: white;height: 100vh !important;text-align:center !important;
            justify-content: center !important;">
        <b-container class="bv-example-row">
          <b-tab title="Вагоны" @click="newTab('Вагоны')" style="display: none !important"> </b-tab>
          <b-tab title="Телеграммы" @click="newTab('Телеграммы')" style="display: none !important"> </b-tab>
          <b-tab title="Ремонты" @click="newTab('Ремонты')" style="display: none !important"> </b-tab>
          <b-tab title="Расчет" @click="newTab('Расчет')" style="display: none !important"> </b-tab>
          <b-tab  title="Отправки БЧ" @click="newTab('Отправки БЧ')" style="display: none !important"> </b-tab>
          <b-tab  title="Тариф по сопр. терр." @click="newTab('Тариф по сопредельным территориям')" style="display: none !important"> </b-tab>

        </b-container>
      </b-tabs>
    </b-card>
  </div>
</template> -->



<template>
  
<b-card no-body style="margin-top: 1%">
    <b-tabs pills card vertical style="background: white">
      <b-container >
        <b-tab title="Справочник контрагенты">
                <b-card-text>
                    <partnerTable/>
              </b-card-text>
              </b-tab>
            <b-tab title="Справочник договора">
              <b-card-text>
                <contractTable/>
              </b-card-text>
            </b-tab>
            <b-tab title="Ставки по аренде" active>
                <b-card-text>
                    <rentalrateTable/>
              </b-card-text>
              </b-tab>
          </b-container>

    </b-tabs>
  </b-card>

</template>

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

<script>
import partnerTable from '@/components/Table/PartnerTable.vue'
import contractTable from '@/components/Table/ContractTable.vue'
import rentalrateTable from '@/components/Table/RentalRateTable.vue'
export default{
    name: 'Directory',
    components: {partnerTable, contractTable , rentalrateTable},
    mounted(){
      document.title = 'Справочники'

    }

}

</script>




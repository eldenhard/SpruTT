<template>

  <div>
    <farmsContract />
    <!-- <b-card no-body >
      <b-tabs  align="center" style="width: 100%">
        <b-tab title="Общехозяйственные" active style="color: black !important"  title-item-class="w-30" @click="setCurrentTab('economic')">
          <b-card-text >
            <farmsContract :named="'Общехозяйственные'" :current_tab="'economic'"/>
          </b-card-text>
        </b-tab>
        <b-tab title="Ремонтные" style="color: black  !important"  title-item-class="w-30"  @click="setCurrentTab('repair')">
          <b-card-text>
            <farmsContract :named="'Ремонтные'" :current_tab="'repair'"/>
          </b-card-text>
        </b-tab>

        <b-tab title="Финансовые" style="color: black  !important"  title-item-class="w-30"  @click="setCurrentTab('financial')">
          <b-card-text>
            <farmsContract :named="'Финансовые'" :current_tab="'financial'"/>
          </b-card-text>
        </b-tab>

        <b-tab title="С покупателем" style="color: black  !important"  title-item-class="w-30"  @click="setCurrentTab('buyer')">
          <b-card-text>
            <farmsContract :named="'С покупателем'" :current_tab="'buyer'"/>
          </b-card-text>
        </b-tab>

        <b-tab title="С поставщиками" style="color: black  !important"  title-item-class="w-30"  @click="setCurrentTab('supply')">
          <b-card-text>
            <farmsContract :named="'С поставщиками'" :current_tab="'supply'"/>
          </b-card-text>
        </b-tab>


        <b-tab title="Прочие" style="color: black  !important"  title-item-class="w-30"  @click="setCurrentTab('other')">
          <b-card-text>
            <farmsContract :named="'Прочие'" :current_tab="'other'"/>
          </b-card-text>
        </b-tab>
        
      </b-tabs>
    </b-card> -->
  </div>

</template>



<script>
import farmsContract from '@/components/Table/Contracts/farmsContract.vue'

export default {
  name: 'ContractTable',
  components: { farmsContract },
  methods: {
    setCurrentTab(val){
      this.$store.commit('setCurrentTab', val)
    }
  }
  // mounted(){
  //   let container = document.querySelector('.container')
  //   container.classList.remove("container")
  // }
}
</script>
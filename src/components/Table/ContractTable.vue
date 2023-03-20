<template>

  <div>
    <b-card no-body >
      <b-tabs  align="center" style="width: 90%">
        <b-tab title="Общехозяйственные" active style="color: black !important"  title-item-class="w-30">
          <b-card-text >
            <farmsContract :named="'Общехозяйственные'" />
          </b-card-text>
        </b-tab>
        <b-tab title="Ремонтные" style="color: black  !important"  title-item-class="w-30">
          <b-card-text>
            <farmsContract :named="'Ремонтные'"/>
          </b-card-text>
        </b-tab>

        <b-tab title="Финансовые" style="color: black  !important"  title-item-class="w-30">
          <b-card-text>
            <farmsContract :named="'Финансовые'"/>
          </b-card-text>
        </b-tab>

        <b-tab title="С покупателем" style="color: black  !important"  title-item-class="w-30">
          <b-card-text>
            <farmsContract :named="'С покупателем'"/>
          </b-card-text>
        </b-tab>

        <b-tab title="Прочие" style="color: black  !important"  title-item-class="w-30">
          <b-card-text>
            <farmsContract :named="'Прочие'"/>
          </b-card-text>
        </b-tab>
        
      </b-tabs>
    </b-card>
  </div>

</template>



<script>
import farmsContract from '@/components/Table/Contracts/farmsContract.vue'

export default {
  name: 'ContractTable',
  components: { farmsContract },
 
  // mounted(){
  //   let container = document.querySelector('.container')
  //   container.classList.remove("container")
  // }
}
</script>
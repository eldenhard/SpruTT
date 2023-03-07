<template>

  <div>
    <b-card no-body >
      <b-tabs  align="center" style="width: 90%">
        <b-tab title="Общехозяйственные" active style="color: black !important"  title-item-class="w-30">
          <b-card-text>
            <farmsContract />
          </b-card-text>
        </b-tab>
        <b-tab title="Ремонтные" style="color: black  !important"  title-item-class="w-30">
          <b-card-text>
            <renovationContract />
          </b-card-text>
        </b-tab>
        <b-tab title="С покупателем" style="color: black  !important"  title-item-class="w-30">
          <b-card-text>
            <buyerContract />
          </b-card-text>
        </b-tab>
   
        <b-tab title="Финансовые" style="color: black  !important"  title-item-class="w-30">
          <b-card-text>
            <financeContract />
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>

</template>



<script>
import farmsContract from '@/components/Table/Contracts/farmsContract.vue'
import financeContract from '@/components/Table/Contracts/financeContract.vue'
import buyerContract from '@/components/Table/Contracts/buyerContract.vue'
import renovationContract from '@/components/Table/Contracts/renovationContract.vue'
// import providerContract from '@/components/Table/Contracts/providerContract.vue'

export default {
  name: 'ContractTable',
  components: { farmsContract, financeContract, buyerContract, renovationContract },
  // mounted(){
  //   let container = document.querySelector('.container')
  //   container.classList.remove("container")
  // }
}
</script>
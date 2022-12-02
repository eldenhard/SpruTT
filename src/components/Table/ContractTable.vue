<template>

  <div>
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="Общехозяйственные" active style="color: black !important" >
          <b-card-text>
            <farmsContract />
          </b-card-text>
        </b-tab>
        <b-tab title="Ремонтные" style="color: black  !important">
          <b-card-text>
            <renovationContract />
          </b-card-text>
        </b-tab>
        <b-tab title="С покупателем" style="color: black  !important">
          <b-card-text>
            <buyerContract />
          </b-card-text>
        </b-tab>
        <b-tab title="С поставщиком" style="color: black  !important">
          <b-card-text>
            <providerContract />
          </b-card-text>
        </b-tab>
        <b-tab title="Финансовые" style="color: black  !important">
          <b-card-text>
            <financeContract />
          </b-card-text>
        </b-tab>
      </b-tabs>
  </div>

</template>

<script>
import farmsContract from '@/components/Table/Contracts/farmsContract.vue'
import financeContract from '@/components/Table/Contracts/financeContract.vue'
import buyerContract from '@/components/Table/Contracts/buyerContract.vue'
import renovationContract from '@/components/Table/Contracts/renovationContract.vue'
import providerContract from '@/components/Table/Contracts/ProviderContract.vue'

export default {
  name: 'ContractTable',
  components: { farmsContract, financeContract, buyerContract, renovationContract, providerContract }
}
</script>
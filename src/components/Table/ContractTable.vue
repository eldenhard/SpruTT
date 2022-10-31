<template>

  <div>
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="Общехозяйственные" active>
          <b-card-text>
            <farmsContract />
          </b-card-text>
        </b-tab>
        <b-tab title="Ремонтные">
          <b-card-text>
            <renovationContract />
          </b-card-text>
        </b-tab>
        <b-tab title="С покупателем" active>
          <b-card-text>
            <buyerContract />
          </b-card-text>
        </b-tab>
        <b-tab title="С поставщиком">
          <b-card-text>
            <providerContract />
          </b-card-text>
        </b-tab>
        <b-tab title="Финансовые">
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
import providerContract from '@/components/Table/Contracts/providerContract.vue'
export default {
  name: 'ContractTable',
  components: { farmsContract, financeContract, buyerContract, renovationContract, providerContract }
}
</script>
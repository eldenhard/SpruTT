<template>


  <b-card no-body style="margin-top: 1%">

    <b-tabs pills card vertical style="background: white">
      <b-container class="bv-example-row">
            <b-tab title="Справочник контрагенты" active>
                <b-card-text>
                    <partnerTable/>
              </b-card-text>
              </b-tab>
            <!-- <b-tab title="Справочник договора">
              <b-card-text>
                <contractTable/>
              </b-card-text>
            </b-tab> -->
      </b-container>
    </b-tabs>
  </b-card>

</template>



<script>
import partnerTable from '@/components/Table/PartnerTable.vue'
// import contractTable from '@/components/Table/ContractTable.vue'
export default{
    name: 'Home',
    components: {partnerTable},
    mounted(){
      document.title = 'Справочники'

    }

}

</script>




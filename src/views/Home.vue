<template>


  <b-card no-body style="margin-top: 1%">
    <b-tabs pills card vertical style="background: white">
      <b-container >
        <b-tab title="Справочник контрагенты">
                <b-card-text>
                    <partnerTable/>
              </b-card-text>
              </b-tab>
            <b-tab title="Справочник договора" active>
              <b-card-text>
                <contractTable/>
              </b-card-text>
            </b-tab>
                
          </b-container>

    </b-tabs>
  </b-card>

</template>

<style scoped>

</style>

<script>
import partnerTable from '@/components/Table/PartnerTable.vue'
import contractTable from '@/components/Table/ContractTable.vue'
export default{
    name: 'Directory',
    components: {partnerTable, contractTable },
    mounted(){
      document.title = 'Справочники'

    }

}

</script>




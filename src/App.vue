<template>
  <div>
    <Loader :loader="loader"></Loader>
    <UpNavbar />
    <router-view />
    <Authorization style="z-index: 999999999999999999999999999999999999999"></Authorization>
  </div>
</template>

<script>
import UpNavbar from './views/UpNavbar.vue'
import Authorization from './views/Authorization.vue'
import { actionTypes } from './store/modules/auth';
import { actionTypes as cpActionTypes } from './store/modules/counterparties';
import { actionTypes as stActionTypes } from './store/modules/stations';
import { actionTypes as dnActionTypes } from './store/modules/dog_number';
import { actionTypes as ccActionTypes } from './store/modules/cargo_code';
 
import Loader from '@/components/loader/loader.vue';

export default {
  name: 'App',
  components: { UpNavbar, Authorization, Loader },
  data() {
    return {
      loader: false
    }
  },
  async mounted() {
    // this.loader = true
    await this.loading()

    // this.loader = false
  },
  methods: {
    async loading() {
      
       this.$store.dispatch(actionTypes.getStaffGroups)
       this.$store.dispatch(actionTypes.staffGlobal)
       this.$store.dispatch(cpActionTypes.getCounterparties, { url: 'personal/counterparties/?page_size=700', clear: true })
       this.$store.dispatch(stActionTypes.checkLocalStations, { url: 'wagon-park/station?page_size=1000' })
       this.$store.dispatch(ccActionTypes.getCargoCode, { url: 'wagon-park/cargo?page_size=500', clear: true })

    }
  }
}
</script>

<style>
@import './style/style.css';
</style>

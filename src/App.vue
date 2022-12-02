<template>
  <div>
    <Loader :loader="loader"></Loader>
    <UpNavbar/>
    <router-view/>
    <Authorization style="z-index: 999999999999999999999999999999999999999"></Authorization>
  </div>
</template>

<script>
import UpNavbar from './views/UpNavbar.vue'
import Authorization from './views/Authorization.vue'
import { actionTypes } from './store/modules/auth';
import { actionTypes as cpActionTypes } from './store/modules/counterparties';
import Loader from '@/components/loader/loader.vue'

export default {
  name: 'App',
  components: {UpNavbar, Authorization, Loader},
  data(){
    return{
      loader: false
    }   
  },
  mounted(){
    this.loader = true
    this.$store.dispatch(actionTypes.getStaffGroups)
    this.$store.dispatch(actionTypes.staffGlobal)
    this.$store.dispatch(cpActionTypes.getCounterparties, {url: 'personal/counterparties/?page_size=700', clear: true})
    this.loader = false
  }
}
</script>

<style>
@import './style/style.css';
</style>

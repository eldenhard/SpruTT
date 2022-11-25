<template>
  <div>
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

export default {
  name: 'App',
  components: {UpNavbar, Authorization},
  mounted(){
    this.$store.dispatch(actionTypes.getStaffGroups)
    this.$store.dispatch(actionTypes.staffGlobal)
    this.$store.dispatch(cpActionTypes.getCounterparties, {url: 'personal/counterparties/?page_size=300', clear: true})
  }
}
</script>

<style>
@import './style/style.css';
</style>

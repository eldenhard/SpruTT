<template>
  <div>
    <Loader :loader="loader"></Loader>
    <UpNavbar />
    <router-view />
    <Authorization style="z-index: 999999999999999999999999999999999999999 !important" />
  </div>
</template>

<script>
import Loader from '@/components/loader/loader.vue';
import UpNavbar from './views/UpNavbar.vue'
import Authorization from './views/Authorization.vue'
import { actionTypes } from './store/modules/auth';
import { actionTypes as cpActionTypes } from './store/modules/counterparties';
import { actionTypes as userActionTypes } from './store/modules/users';
import { mapState } from 'vuex';
import { mapActions } from 'vuex'
// import { actionTypes as stActionTypes } from './store/modules/stations';
// import { actionTypes as dnActionTypes } from './store/modules/dog_number';
import { actionTypes as ccActionTypes } from './store/modules/cargo_code';


export default {
  name: 'App',
  components: { UpNavbar, Authorization, Loader },
  data() {
    return {
      loader: false,
      accessToken: localStorage.getItem('accessToken')
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.user.token,
    }),


  },

  watch: {
    accessToken() {
      console.log('111')
      localStorage.setItem('accessToken', JSON.stringify(this.token))

    }
  },
  mounted() {
    // console.log(this.token)
    localStorage.setItem('accessToken', JSON.stringify(this.token))
    // this.loader = true
    this.$store.dispatch(actionTypes.getStaffGroups)
    this.$store.dispatch('getClient');
    this.$store.dispatch(actionTypes.staffGlobal)
    this.$store.dispatch(cpActionTypes.getCounterparties, { url: 'personal/counterparties/?page_size=500', clear: true })
    this.$store.dispatch(userActionTypes.getUsers, { url: 'personal/users/?page_size=500', clear: true })
    this.$store.dispatch(ccActionTypes.getCargoCode, { url: 'wagon-park/cargo/?page_size=500', clear: true })

    this.loader = false

  }




}
</script>

<style>
@import './style/style.css';
</style>

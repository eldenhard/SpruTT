<template>
  <div>
    <Loader :loader="loader"></Loader>
    
    <UpNavbar/>
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

// import { actionTypes as stActionTypes } from './store/modules/stations';
// import { actionTypes as dnActionTypes } from './store/modules/dog_number';
import { actionTypes as ccActionTypes } from './store/modules/cargo_code';


export default {
  name: 'App',
  components: { UpNavbar, Authorization, Loader },
  data() {
    return {
      loader: false,
      accessToken: localStorage.getItem('accessToken'),
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.user.token,
    }),
    // YUI(){
    //   if(!window.location.href.includes('fin_operation')){
    //     return false
    //   } return true
    // }


  },

  watch: {
    accessToken() {
      console.log('111')
      localStorage.setItem('accessToken', JSON.stringify(this.token))

    }
  },
  beforeCreate(){
    let date = new Date()
    let limit = localStorage.getItem('first_entry_time')
    // Получил количество часов
    if(((date - new Date(limit))/ 3_600_000).toFixed(2) < 12){
     return
    } else {
      localStorage.setItem('first_entry_time', date)
      location.reload()
    }
    // localStorage.setItem('first_entry_time', date)
  },
  mounted() {
    // console.log(this.token)
    localStorage.setItem('accessToken', JSON.stringify(this.token))
    if (!window.location.href.includes('fin_operation')){
    // this.loader = true
    this.$store.dispatch(actionTypes.getStaffGroups)
    this.$store.dispatch('getClient');
    this.$store.dispatch('getCounterpartie')
    this.$store.dispatch('getRoadAsRoad')

    this.$store.dispatch(actionTypes.staffGlobal)
    this.$store.dispatch(cpActionTypes.getCounterparties, { url: 'personal/counterparties/?page_size=500', clear: true })
    this.$store.dispatch(userActionTypes.getUsers, { url: 'personal/users/?page_size=500', clear: true })
    this.$store.dispatch(ccActionTypes.getCargoCode, { url: 'wagon-park/cargo/?page_size=500', clear: true })
    }
    this.loader = false

  }




}
</script>

<style>
@import './style/style.css';
</style>

<template>
  <div>
    <Loader :loader="loader"></Loader>

    <UpNavbar />
    <loader_mini :loader="loader_mini" />
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
import loader_mini from './components/loader/loader_mini.vue';
// import { actionTypes as stActionTypes } from './store/modules/stations';
// import { actionTypes as dnActionTypes } from './store/modules/dog_number';
import { actionTypes as ccActionTypes } from './store/modules/cargo_code';

import LogRocket from 'logrocket';
export default {
  name: 'App',
  components: { UpNavbar, Authorization, Loader, loader_mini },
  data() {
    return {
      loader: false,
      accessToken: localStorage.getItem('accessToken'),
      loader_mini: false
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
  beforeCreate() {
    let date = new Date()
    let limit = localStorage.getItem('first_entry_time')
    // Получил количество часов
    if (((date - new Date(limit)) / 3_600_000).toFixed(2) < 12) {
      return
    } else {
      localStorage.setItem('first_entry_time', date)
      location.reload()
    }
    // localStorage.setItem('first_entry_time', date)
  },
  // Синхронизация
  async mounted() {

    const cashe = await cashe.open()
    console.log(cashe)
    // for(let i = 0; i < 15; i++){
    //   await fetch('https://jsonplaceholder.typicode.com/comments')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    // }
  


    let id_rocket = JSON.parse(localStorage.getItem('vuex')).auth.uid

    let { first_name, last_name, email } = JSON.parse(localStorage.getItem('vuex')).auth.user.user
    LogRocket.init('fs2mx3/sprutt')
    LogRocket.identify(id_rocket, {
      name: `${first_name} ${last_name}`,
      email: `${email}`,
    });


    if (navigator.storage && navigator.storage.estimate) {
      const quota = await navigator.storage.estimate();
      // quota.usage -> свободное пространство ( в байтах).
      // quota.quota -> доступное пространство (в байтах).
      const percentageUsed = (quota.usage / quota.quota) * 100;
      console.log(`Вы используете ${percentageUsed}% от доступного пространства.`);
      const remaining = quota.quota - quota.usage;
      console.log(`Вы можете записать еще ${remaining} байт.`);
    }


    this.loader_mini = true
    let objStation = {
      'ОКТЯБРЬСКАЯ': 'ОКТ',
      'ЭСТОНСКАЯ': 'ЭСТ',
      'ЛАТВИЙСКАЯ': 'ЛАТ',
      'КАЛИНИНГРАДСКАЯ': 'КЛГ',
      'МПС': 'МПС',
      'ЛИТОВСКАЯ': 'ЛИТ',
      'БЕЛОРУССКАЯ': 'БЕЛ',
      'МОСКОВСКАЯ': 'МСК',
      'ГОРЬКОВСКАЯ': 'ГОР',
      'СЕВЕРНАЯ': 'СЕВ',
      'ЮГО-ЗАПАДНАЯ': 'ЮЗП',
      'ЛЬВОВСКАЯ': 'ЛЬВ',
      'МОЛДАВСКАЯ': 'МЛД',
      'ОДЕССКАЯ': 'ОДС',
      'ЮЖНАЯ': 'ЮЖН',
      'ПРИДНЕПРОВСКАЯ': 'ПДН',
      'ДОНЕЦКАЯ': 'ДОН',
      'СЕВЕРО-КАВКАЗСКАЯ': 'СКВ',
      'АЗЕРБАЙДЖАНСКАЯ': 'АЗР',
      "ЗАО 'ЮЖНО-КАВКАЗСКАЯ ж. д.'": 'ЮКЖ',
      'ГРУЗИНСКАЯ': 'ГРЗ',
      'ЮГО-ВОСТОЧНАЯ': 'ЮВС',
      'ПРИВОЛЖСКАЯ': 'ПРВ',
      'КУЙБЫШЕВСКАЯ': 'КБШ',
      'КАЗАХСТАНСКИЕ': 'КЗХ',
      'КЫРГЫЗСКАЯ': 'КРГ',
      'УЗБЕКСКИЕ': 'УЗБ',
      'ТАДЖИКСКАЯ': 'ТДЖ',
      'ТУРКМЕНСКАЯ': 'ТРК',
      'СВЕРДЛОВСКАЯ': 'СВР',
      'ЮЖНО-УРАЛЬСКАЯ': 'ЮУР',
      'Мелитопольская железная дорога': 'МЕЛ',
      'ЗАПАДНО-СИБИРСКАЯ': 'ЗСБ',
      'Луганская железная дорога': 'ЛУГ',
      "ФГУП 'КЖД'": 'КРМ',
      'КРАСНОЯРСКАЯ': 'КРС',
      'Донецкая железная дорога': 'ДОН',
      'Херсонская железная дорога': 'ХРС',
      "АО 'АК'ЖЕЛЕЗНЫЕ ДОРОГИ ЯКУТИИ'": 'ЖДЯ',
      'ВОСТОЧНО-СИБИРСКАЯ': 'ВСБ',
      'ЗАБАЙКАЛЬСКАЯ': 'ЗАБ',
      'ДАЛЬНЕВОСТОЧНАЯ': 'ДВС',
      "ООО 'Рубикон'": 'РБК',
    }
    localStorage.setItem('road', JSON.stringify(objStation))
    if (document.title != 'Транспортные')
      this.loader_mini = true
    // console.log(this.token)
    try {
      localStorage.setItem('accessToken', JSON.stringify(this.token))
      // if (!window.location.href.includes('fin_operation')) {
      //   await Promise.all([
      //     this.$store.dispatch(actionTypes.getStaffGroups),
      //     this.$store.dispatch('getClient'),
      //     this.$store.dispatch('getCounterpartie'),
      //     this.$store.dispatch('getRoadAsRoad'),

      //     this.$store.dispatch(actionTypes.staffGlobal),
      //     this.$store.dispatch(cpActionTypes.getCounterparties, { url: 'personal/counterparties/?page_size=500', clear: true }),
      //     this.$store.dispatch(userActionTypes.getUsers, { url: 'personal/users/?page_size=500', clear: true }),
      //     this.$store.dispatch(ccActionTypes.getCargoCode, { url: 'wagon-park/cargo/?page_size=500', clear: true }),
      //   ])
      // }
    }
    catch (error) {
      console.error(error)
    } finally {
      this.loader_mini = false
    }


  }




}
</script>

<style>
@import './style/style.css';
</style>

import Vue from 'vue'
import router from './router'
import App from '../src/App'
import store from './store/main'

import Vuex from 'vuex'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.prototype.axios = axios
Vue.prototype.$store = store
Vue.config.productionTip = false

new Vue({
  router,
  components: {App},
  template: '<App/>',
  store,
  render: h => h(App)
}).$mount('#app')



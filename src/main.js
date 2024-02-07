import Vue from 'vue'
import router from './router'
import App from '../src/App'
import store from './store'
import Vuex from 'vuex'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// import * as Sentry from "@sentry/vue";

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
// import axios from 'axios'
import "./helpers/axios"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './assets/tailwind.css'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Toast, {
  position: "top-left",
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
})


//Vue.prototype.axios = axios
Vue.prototype.$store = store
Vue.config.productionTip = false





new Vue({
  router,
  components: {App},
  template: '<App/>',
  store,
  vSelect,
  render: h => h(App)
}).$mount('#app')



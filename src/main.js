import Vue from 'vue'
import router from './router'
import App from '../src/App'
import store from './store'
import Vuex from 'vuex'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// import './node_modules/normalize.css/normalize.css';
import '../node_modules/normalize.css/normalize.css';
// import * as Sentry from "@sentry/vue";

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
// import axios from 'axios'
import "./helpers/axios"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@toast-ui/editor/dist/toastui-editor.css';
// import './assets/tailwind.css'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


import LogRocket from 'logrocket';
LogRocket.init('fs2mx3/sprutt');
LogRocket.onerror = function(error)  {
  console.log('LogRocket error',error)
}


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Toast, {
  position: "top-left",
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
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



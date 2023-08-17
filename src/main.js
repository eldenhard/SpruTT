import Vue from 'vue'
import router from './router'
import App from '../src/App'
import store from './store'
import Vuex from 'vuex'
// import * as Sentry from "@sentry/vue";

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
// import axios from 'axios'
import "./helpers/axios"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './assets/tailwind.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


//Vue.prototype.axios = axios
Vue.prototype.$store = store
Vue.config.productionTip = false



// Sentry.init({
//   Vue,
//   dsn: "https://826b8787a8ec7603d09d34f0c02e01e2@o4505680601808896.ingest.sentry.io/4505680604037120",
//   integrations: [
//     new Sentry.BrowserTracing({
//       // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//       tracePropagationTargets: ["localhost", "https:yourserver.io/api/"],
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//     }),
//     new Sentry.Replay(),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });


new Vue({
  router,
  components: {App},
  template: '<App/>',
  store,
  render: h => h(App)
}).$mount('#app')



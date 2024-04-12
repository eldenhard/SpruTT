import Vue from "vue";
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import LogRocket from 'logrocket';
import createPlugin from 'logrocket-vuex';
const logrocketPlugin = createPlugin(LogRocket);



import auth from "@/store/modules/auth"
import counterparties from '@/store/modules/counterparties'
import stations  from "@/store/modules/stations";
import dog_number from "./modules/dog_number";
import cargo_code from "./modules/cargo_code";
import users from "./modules/users"
import client from "./modules/client"
import countries from "./modules/countries";
import road from "./modules/road";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {},
  plugins: [createPersistedState({paths: ['auth']})], 
  modules: {
    auth,
    counterparties,
    stations,
    dog_number,
    cargo_code,
    users,
    client,
    countries,
    road,
  }
})

export default store

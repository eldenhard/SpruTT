

import Vue from "vue";
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import auth from "@/store/modules/auth"
import counterparties from '@/store/modules/counterparties'
import stations  from "@/store/modules/stations";
import dog_number from "./modules/dog_number";
import cargo_owner from "./modules/cargo_owner";
import cargo_code from "./modules/cargo_code";
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
    cargo_owner,
    cargo_code,
  }
})

export default store

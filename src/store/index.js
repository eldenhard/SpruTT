

import Vue from "vue";
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import auth from "@/store/modules/auth"
import counterparties from '@/store/modules/counterparties'

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
    counterparties
  }
})

export default store

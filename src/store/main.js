// Импортируем Vue здесь, если вызов стора произойдет раньше

import Vue from "vue";
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

// И просим vue использовать vuex
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  plugins: [createPersistedState()],
})

export default store

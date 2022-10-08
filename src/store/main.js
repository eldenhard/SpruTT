import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

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

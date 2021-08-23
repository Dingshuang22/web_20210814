import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
import createPersistedState from "vuex-persistedstate"
import app from "./modules/app"
import cart from "./modules/cart"


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    cart
  },

  getters,

  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(val) {
        const { app } = val
        return { app }
      }
    })
  ]
})

export default store

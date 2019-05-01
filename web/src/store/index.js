import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { registerStoreModules } from './hooks'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'DocsAppV1'
    })
  ],
  modules: registerStoreModules()
})

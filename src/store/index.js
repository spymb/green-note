import Vue from 'vue'
import Vuex from 'vuex'
import notebook from './modules/notebook-module'
import note from './modules/note-module'
import trash from './modules/trash-module'
import auth from './modules/auth-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notebook,
    note,
    auth,
  }
})

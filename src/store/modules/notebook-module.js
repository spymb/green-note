import Notebook from '../../apis/notebooks'
import { Message } from 'element-ui'

const state = {
  notebooks: null,
}

const getters = {
  notebooks: state => state.notebooks || [],
}

const mutations = {
  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },

  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId)
  },

  updateNotebook(state, payload) {
    let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId) || {}
    notebook.title = payload.title
  },

  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },
}

const actions = {
  addNotebook({ commit }, payload) {
    return Notebook.add({ title: payload.title })
      .then(res => {
        commit('addNotebook', { notebook: res.data })
        Message.success(res.msg)
      })
  },

  deleteNotebook({ commit }, payload) {
    return Notebook.delete(payload.notebookId)
      .then(res => {
        commit('deleteNotebook', { notebookId: payload.notebookId })
        Message.success(res.msg)
      })
  },

  updateNotebook({ commit }, payload) {
    return Notebook.update(payload.notebookId, { title: payload.title })
      .then(res => {
        commit('updateNotebook', { notebookId: payload.notebookId, title: payload.title })
        Message.success(res.msg)
      })
  },

  getNotebooks({ commit }) {
    return Notebook.getAll()
      .then(res => {
        commit('setNotebooks', { notebooks: res.data })
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

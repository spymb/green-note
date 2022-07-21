import Trash from '../../apis/trash'
import { Message } from 'element-ui'

const state = {
  trashNotes: null,
  curTrashNoteId: null
}

const getters = {
  trashNotes: state => state.trashNotes || [],

  curTrashNote: (state, getters) => {
    if(!state.curTrashNoteId) return getters.trashNotes[0] || {}
    return state.trashNotes.find(note => note.id == state.curTrashNoteId) || {}
  },

  belongTo: (state, getters, rootState, rootGetters) => {
    let notebook = rootGetters.notebooks.find(notebook => notebook.id == getters.curTrashNote.notebookId) || {}
    return notebook.title || ''
  }
}

const mutations = {
  addTrashNote(state, payload) {
    state.trashNotes.unshift(payload.note)
  },

  deleteTrashNote(state, payload) {
    state.trashNotes = state.trashNotes.filter(note => note.id != payload.noteId)
  },

  setTrashNotes(state, payload) {
    state.trashNotes = payload.trashNotes
  },

  setCurTrashNote(state, payload) {
    state.curTrashNoteId = payload.curTrashNoteId
  }
}

const actions = {
  deleteTrashNote({ commit }, { noteId }) {
    return Trash.delete({ noteId })
      .then(res => {
        commit('deleteTrashNote', { noteId })
        Message.success(res.msg)
      })
  },

  revertTrashNote({ commit }, { noteId }) {
    return Trash.revert({ noteId })
      .then(res => {
        commit('deleteTrashNote', { noteId })
        Message.success(res.msg)
      })
  },

  getTrashNotes({ commit }) {
    return Trash.getAll()
      .then(res => {
        commit('setTrashNotes', { trashNotes: res.data })
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

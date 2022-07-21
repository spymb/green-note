import Note from '../../apis/notes'
import { Message } from 'element-ui'

const state = {
  notes: null,
  curNoteId: null
}

const getters = {
  notes: state => state.notes || [],

  curNote: state => {
    if (!Array.isArray(state.notes)) return {title: '', content: ''}
    if (!state.curNoteId) return state.notes[0] || {title: '', content: ''}
    return state.notes.find(note => note.id == state.curNoteId) || {title: '', content: ''}
  }
}

const mutations = {
  addNote(state, payload) {
    state.notes.unshift(payload.note)
  },

  deleteNote(state, payload) {
    state.notes = state.notes.filter(note => note.id !== payload.noteId)
  },

  updateNote(state, payload) {
    let note = state.notes.find(note => note.id === payload.noteId) || {}
    note.title = payload.title
    note.content = payload.content
  },

  setNote(state, payload) {
    state.notes = payload.notes
  },

  setCurNote(state, payload = {}) {
    state.curNoteId = payload.curNoteId
  }
}

const actions = {
  addNote({ commit }, { notebookId, title, content }) {
    return Note.add({ notebookId }, { title, content })
      .then(res => {
        commit('addNote', { note: res.data })
      })
  },

  deleteNote({ commit }, { noteId }) {
    return Note.delete({ noteId })
      .then(res => {
        commit('deleteNote', { noteId })
        Message.success(res.msg)
      })
  },

  updateNote({ commit }, { noteId, title, content }) {
    return Note.update({ noteId }, { title, content })
      .then(res => {
        commit('updateNote', { noteId, title, content })
      })
  },

  getNotes({ commit }, { notebookId }) {
    return Note.getAll({ notebookId })
      .then(res => {
        commit('setNote', { notes: res.data })
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

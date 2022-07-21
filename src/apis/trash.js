import request from '../helpers/request'
import {beautifyDate} from '../helpers/date';

const URL = {
  DELETE: '/notes/:noteId/confirm',
  REVERT: '/notes/:noteId/revert',
  GET: '/notes/trash',
}

export default {
  delete({ noteId }) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },

  revert({ noteId }) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
  },

  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort((note1, note2) => note1.updatedAt < note2.updatedAt ? 1 : -1)
          res.data.forEach(note => {
            note.newCreatedAt = beautifyDate(note.createdAt)
            note.newUpdatedAt = beautifyDate(note.updatedAt)
          })
          resolve(res)
        }).catch(err => {
        reject(err)
      })
    })
  },
}

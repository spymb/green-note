import request from '../helpers/request';
import {beautifyDate} from '../helpers/date';

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
};

export default {
  add({notebookId}, {title = '', content = ''} = {title: '', content: ''}) {
    return new Promise((resolve, reject) => {
      request(URL.ADD.replace(':notebookId', notebookId), 'POST', {title, content})
        .then(res => {
          res.data.newCreatedAt = beautifyDate(res.data.createdAt);
          res.data.newUpdatedAt = beautifyDate(res.data.updatedAt);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  delete({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE');
  },

  update({noteId}, {title, content}) {
    return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title, content});
  },

  getAll({notebookId}) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId))
        .then(res => {
          res.data = res.data.map(note => {
            note.newCreatedAt = beautifyDate(note.createdAt);
            note.newUpdatedAt = beautifyDate(note.updatedAt);
            return note;
          }).sort((note1, note2) => {
            return note1.updatedAt < note2.updatedAt ? 1 : -1;
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};

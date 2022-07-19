import request from '../helpers/request';
import {beautifyDate} from '../helpers/date';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
};

export default {
  add({title = ''} = {title: ''}) {
    return request(URL.ADD, 'POST', {title});
  },

  delete(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE');
  },

  update(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title});
  },

  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt ? 1 : -1);
          res.data.forEach(notebook => {
            notebook.newCreatedAt = beautifyDate(notebook.createdAt);
          });
          resolve(res);
        }).catch(err => {
        reject(err);
      });
    });
  },
};

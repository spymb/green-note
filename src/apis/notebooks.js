import request from '../helpers/request';

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
    return request(URL.GET);
  }
};

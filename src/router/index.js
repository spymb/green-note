import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Login';
import NoteBooks from '../components/NoteBooks';
import NoteDetails from '../components/Notes';
import TrashDetails from '../components/Trash';

Vue.use(Router)

const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(e => e);
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/notebooks',
      component: NoteBooks
    },
    {
      path: '/note',
      component: NoteDetails
    },
    {
      path: '/trash',
      component: TrashDetails
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Login';
import NoteBooks from '../components/NoteBooks';
import NoteDetails from '../components/NoteDetails';
import TrashDetails from '../components/TrashDetails';

Vue.use(Router)

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
      path: '/note/:noteId',
      component: NoteDetails
    },
    {
      path: '/trash/:noteId',
      component: TrashDetails
    }
  ]
})

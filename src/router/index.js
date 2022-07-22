import Vue from 'vue'
import Router from 'vue-router'

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
      alias: '/login',
      component: () => import('../pages/Login.vue')
    },

    {
      path: '/notebooks',
      component: () => import('../pages/NoteBooks')
    },
    {
      path: '/note',
      component: () => import('../pages/Notes')
    },
    {
      path: '/trash',
      component: () => import('../pages/Trash')
    }
  ]
})

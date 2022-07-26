import Auth from '../../apis/auth';
import router from '../../router';

const state = {
  user: null
};

const getters = {
  username: state => state.user === null ? '未登录' : state.user.username,

  slug: state => state.user === null ? '未' : state.user.username[0]
};

const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  }
};

const actions = {
  register({commit}, {username, password}) {
    return Auth.register({username, password})
      .then(res => {
        commit('setUser', {user: res.data});
      });
  },

  login({commit}, {username, password}) {
    return Auth.login({username, password})
      .then(res => {
        commit('setUser', {user: res.data});
      });
  },

  logout({commit}) {
    return Auth.logout()
      .then(() => {
        router.push('/login');
        commit('setUser', {user: {username: '未登录'}});
      });
  },

  checkLogin({commit}) {
    return Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          router.push({ path: '/login' });
        } else {
          commit('setUser', {user: res.data});
        }
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

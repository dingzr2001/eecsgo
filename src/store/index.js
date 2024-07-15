import Vue from 'vue';
  
import Vuex from 'vuex';

Vue.use(Vuex)

// 创建仓库 store
const store = new Vuex.Store({
  state: {
    Authorization: null, //localStorage.getItem('Authorization') ? JSON.parse(localStorage.getItem('Authorization')) : '',
    user: localStorage.getItem('user') || sessionStorage.getItem('user') || null
  },
  mutations: {
    handleLogin(state, payload) {
      state.Authorization = payload.Authorization
      state.user = payload.user
      if (payload.rememberMe) {
        localStorage.setItem('Authorization', JSON.stringify(payload.Authorization))
        localStorage.setItem('user', JSON.stringify(payload.user))
      }
      sessionStorage.setItem('Authorization', JSON.stringify(payload.Authorization))
      sessionStorage.setItem('user', JSON.stringify(payload.user))
    },
    handleLogout(state) {
      state.Authorization = ''
      state.isLogin = false
      state.user = null

      localStorage.removeItem('isLogin')
      localStorage.removeItem('Authorization')
      localStorage.setItem('user', null)

      sessionStorage.removeItem('isLogin')
      sessionStorage.removeItem('Authorization')
      sessionStorage.setItem('user', null)
    }
  },
  getters: {
    getTokenFromStorage(state) {
      console.log('yes')
      if (sessionStorage.getItem('Authorization')) state.Authorization = JSON.parse(sessionStorage.getItem('Authorization'))
      if (localStorage.getItem('Authorization')) state.Authorization = JSON.parse(localStorage.getItem('Authorization'))
      return state.Authorization
    },
    getUserIdFromStorage(state) {
      console.log('yes')
      if (sessionStorage.getItem('Authorization')) state.Authorization = JSON.parse(sessionStorage.getItem('Authorization'))
      if (localStorage.getItem('Authorization')) state.Authorization = JSON.parse(localStorage.getItem('Authorization'))
      return state.Authorization
    }
  }
})

export default store;
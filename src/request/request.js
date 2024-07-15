import store from '@/store'
import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    if (store.getters.getTokenFromStorage) {
      console.log("有token:", store.state.Authorization)
      config.headers['Authorization'] = store.getters.getTokenFromStorage
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response.status === 401) {
//       // 如果 401 Unauthorized,则跳转到登录页面
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   }
// )

export default request

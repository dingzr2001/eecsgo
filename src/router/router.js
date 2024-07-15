
// import request from '@/request/request'
// import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入你的页面组件
// import Discussion from './components/Discussion.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import UserPage from '@/pages/UserPage.vue'
import ProgramsPage from '../pages/ProgramsPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import AdminProgramsPage from '@/pages/AdminProgramsPage.vue'
// import User from './components/User.vue'

// 使用Vue Router插件
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 创建路由实例
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/program',
      component: ProgramsPage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/user',
      component: UserPage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/admin/programs',
      component: AdminProgramsPage
    }
    // {
    //   path: '/discussion',
    //   component: Discussion
    // },
    // {
    //   path: '/user',
    //   component: User
    // }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.path == '/user'){
//     alert('您还没有登录，请先登录')
//     next('/login')
//   }
//   else {
//     next()
//   }
// })
export default router
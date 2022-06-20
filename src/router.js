import { createRouter, createWebHistory } from "vue-router";

import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Logout from './components/Logout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: ()=>import('./components/Dashboard.vue')
  },
  {
    path: '/adminlist',
    name: 'adminlist',
    component: ()=>import('./components/AdminList')
  },
  {
    path: '/detail',
    name: 'detail',
    component: ()=>import('./components/Detail.vue')
  },
  {
    path: '/changepass',
    name: 'changepass',
    component: ()=>import('./components/ChangePassword.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: ()=>import('./components/PageNotFound.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
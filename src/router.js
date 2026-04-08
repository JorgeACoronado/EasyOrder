import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/UserLogin.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

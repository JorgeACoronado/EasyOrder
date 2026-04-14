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
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('@/pages/MenuPage.vue'),
  },
  {
    path: '/create-user',
    name: 'CreateUser',
    component: () => import('@/pages/CreateUser.vue'),
  },
  {
    path: '/management',
    name: 'Management',
    component: () => import('@/pages/ManageAccount.vue'),
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('@/pages/OrderStatus.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/pages/CheckoutCart.vue'),
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: () => import('@/pages/ThankYouPage.vue'),
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/pages/PaySubmit.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

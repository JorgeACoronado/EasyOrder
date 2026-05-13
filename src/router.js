import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  // public routes
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('@/pages/OrderStatus.vue'),
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('@/pages/MenuPage.vue'),
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
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/UserLogin.vue'),
  },
  {
    path: '/create-user',
    name: 'CreateUser',
    component: () => import('@/pages/CreateUser.vue'),
  },

  //management routes
  {
    path: '/management',
    name: 'Management',
    component: () => import('@/pages/ManageAccount.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/businessSettings',
    name: 'BusinessSettings',
    component: () => import('@/pages/BusinessSettings.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/viewOrders',
    name: 'ViewOrders',
    component: () => import('@/pages/ViewOrders.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
    return
  }

  next()
})

export default router

import { isAuthenticated } from '@/js/helpers/auth.helper'
import AuthView from '@/views/AuthView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/profile'
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: AuthView,
      meta: { requiresAuth: false }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = isAuthenticated()
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !auth) {
    next('/login')
  } else if (!requiresAuth && auth) {
    next('/profile')
  } else {
    next()
  }
})

export default router

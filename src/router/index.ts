import MasterLayout from '@/components/layouts/MasterLayout.vue'
import VehiclesLayout from '@/components/layouts/VehiclesLayout.vue'
import ServicesLayout from '@/components/layouts/ServicesLayout.vue'
import { isAuthenticated } from '@/js/helpers/auth.helper'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/vehicles'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: MasterLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/ProfileView.vue')
      },
      {
        path: 'vehicles',
        component: VehiclesLayout,
        children: [
          {
            path: '',
            name: 'vehicles',
            component: () => import('@/views/vehicles/VehiclesView.vue')
          },
          {
            path: 'create',
            name: 'vehicles-create',
            component: () => import('@/views/vehicles/VehicleCreateView.vue')
          }
        ]
      },
      {
        path: 'services',
        component: ServicesLayout,
        children: [
          {
            path: '',
            name: 'services',
            component: () => import('@/views/services/ServicesView.vue')
          },
          {
            path: 'create',
            name: 'services-create',
            component: () => import('@/views/services/ServicesCreateView.vue')
          },
          {
            path: ':id',
            name: 'service-detail',
            component: () => import('@/views/services/ServiceDetailView.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/ErrorNotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
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

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add',
      name: 'add-dog',
      component: () => import('../views/AddDog.vue'),
    },
    {
      path: '/edit/:id', //
      name: 'edit-dog',
      component: () => import('../views/EditDog.vue'),
    },
  ],
})

export default router

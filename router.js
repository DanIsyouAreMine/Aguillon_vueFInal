// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AddDog from './views/AddDog.vue'
import EditDog from './views/EditDog.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/add',
    name: 'add-dog',
    component: AddDog,
  },
  {
    path: '/edit/:id',
    name: 'edit-dog',
    component: EditDog,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

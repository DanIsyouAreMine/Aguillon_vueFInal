// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
// Import HomeView directly since it will be the main view
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home page, where all the dogs will be listed
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Add Dog page, where users can add new dogs for adoption
    {
      path: '/add',
      name: 'add-dog',
      component: () => import('../views/AddDog.vue'), // Lazy-loaded
    },
    // Edit Dog page, to edit an existing dog's details
    {
      path: '/edit/:id', // :id is a dynamic route parameter
      name: 'edit-dog',
      component: () => import('../views/EditDog.vue'), // Lazy-loaded
    },
  ],
})

export default router

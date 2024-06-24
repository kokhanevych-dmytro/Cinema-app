import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '../views/MovieView.vue'
import SessionView from '@/views/SessionView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/movie/:id', component: MovieView },
  { path: '/sessions/', component: SessionView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

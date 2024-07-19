import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'
import IpView from '../views/IpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchView
    },
    {
      path: '/:ip',
      name: 'ip-info',
      component: IpView
    }
  ]
})

export default router

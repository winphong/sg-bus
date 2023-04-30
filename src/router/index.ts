import { createRouter, createWebHistory } from 'vue-router'
import NearbyBusStop from '@/views/NearbyBusStopView.vue'
import BusTiming from '@/views/BusTimingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NearbyBusStop,
    },
    {
      path: '/timing/:busStopId',
      name: 'timing',
      component: BusTiming,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router

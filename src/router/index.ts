import { createRouter, createWebHistory } from 'vue-router'
import BusStopList from '@/views/BusStopListView.vue'
import BusTiming from '@/views/BusTimingView.vue'
import BusRoute from '@/views/BusRouteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BusStopList,
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
    {
      path: '/route/:busId',
      name: 'route',
      component: BusRoute,
    },
  ],
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Menu',
    component: () => import('@/views/Menu.vue'),
  },
  {
    path: '/item/:item',
    name: 'Item',
    component: () => import('@/views/Item.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavvior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/pages/Home')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/components/pages/Blog')
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: () => import('@/components/pages/Shipping')
  },
  {
    path: '/contactus',
    name: 'Contactus',
    component: () => import('@/components/pages/Contactus')
  },
]

const router = new VueRouter({
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppView from '@/views/AppView.vue'
import CategoryView from '@/views/CategoryView.vue'
import ShoppingCartView from '@/views/ShoppingCartView.vue'
import ProductView from '@/views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppView,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/category/:categoryId',
          name: 'Category',
          component: CategoryView,
          props: true,
        },
        {
          path: '/product/:productId',
          name: 'product',
          component: ProductView,
        },
        {
          path: '/cart',
          name: 'cart',
          component: ShoppingCartView,
        },
      ]
    },
  ]
})

export default router

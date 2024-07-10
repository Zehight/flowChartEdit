import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/notfount',
    name: 'NotFound',
    component: () => import('@/views/common/NotFound.vue'),
  },
  // {
  //   path: '/',
  //   redirect: {
  //     name: 'HomePage',
  //   },
  // },
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/common/HomePage.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: {
      name: 'NotFound',
    },
  },
]

// 二级目录，vite.config.ts base 配置的值。默认的全局变量
const base = import.meta.env.BASE_URL

const router = createRouter({
      // baseFolder('/context/') should be same with the base value in vite.config.ts
      history: createWebHistory(base),
      routes,
    }
)


export default router

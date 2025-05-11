import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// 非 layout 頁面
const Login = () => import('@/views/UserLogin.vue')

// layout 頁面
const LayoutComponent = () => import('@/components/layout/LayoutComponent.vue')
// const Dashboard = () => import('@/views/DashboardPage.vue')
// 其他登入後頁面...

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: LayoutComponent,
    children: [
    //   {
    //     path: '',
    //     name: 'Dashboard',
    //     component: Dashboard
    //   },
      // ...其他登入後頁面
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' // 錯誤頁面導回首頁
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ 登入守衛
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = !!authStore.token

  if (to.path !== '/login' && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router

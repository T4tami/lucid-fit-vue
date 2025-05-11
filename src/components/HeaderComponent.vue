<template>
  <header
    class="fixed inset-x-0 top-0 h-16 bg-green-600 flex items-center px-4 justify-between z-50"
  >
    <!-- ⬅︎ 漢堡按鈕（手機用） -->
    <button class="lg:hidden text-white" @click="$emit('toggle')">☰</button>

    <!-- 標題 -->
    <h1 class="text-white text-xl font-bold">LucidFit 健身系統</h1>

    <!-- 登出 -->
    <button class="text-white" @click="logout">登出</button>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

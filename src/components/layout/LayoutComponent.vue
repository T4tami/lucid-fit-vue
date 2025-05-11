<template>
  <div class="layout-container">
    <!-- Header -->
    <Header @toggleSidebar="collapsed = !collapsed" />

    <!-- Sidebar -->
    <SideBar :collapsed="collapsed" />

    <!-- 登出按鈕 -->
    <header class="layout-header">
      <button class="logout-btn" @click="logout">登出</button>
    </header>

    <!-- 主內容 -->
    <main :class="['layout-main', { collapsed }]">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Header from '@/components/layout/HeaderLayout.vue'
import SideBar from '@/components/layout/SideBar.vue'

const collapsed = ref(false)
const router = useRouter()
const authStore = useAuthStore()

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
}

.layout-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: #f8f9fa;
}

.logout-btn {
  padding: 6px 12px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #d9363e;
}

.layout-main {
  padding-left: 240px;
  transition: padding-left 0.3s;
}

.layout-main.collapsed {
  padding-left: 80px; /* 側邊欄收起時寬度 */
}
</style>

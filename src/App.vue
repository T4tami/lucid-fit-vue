<template>
  <div id="app">
    <!-- Header 登入後才顯示 -->
    <Header v-if="isLoggedIn" />

    <!-- 頁面內容 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from '@/components/HeaderComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()

// 判斷有沒有 token
const isLoggedIn = computed(() => !!authStore.token)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

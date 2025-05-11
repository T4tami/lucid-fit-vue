<template>
  <div>
    <!-- 頂欄 -->
    <Header @toggle="isCollapsed = !isCollapsed" />

    <!-- 側欄 -->
    <Sidebar :collapsed="isCollapsed" />

    <!-- 主要內容 -->
    <main
      :class="[
        'transition-all pt-16',          // 避開 header 高度 (4rem)
        isCollapsed ? 'ml-0' : 'ml-64'   // 避開 sidebar 寬度 (16rem)
      ]"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/layout/HeaderLayout.vue'
import Sidebar from '@/components/layout/SideBar.vue'

const isCollapsed = ref(false)
</script>

<template>
  <header class="flex items-center justify-between px-4 py-2 bg-white shadow-md h-16">
    <!-- 左側：漢堡按鈕 -->
    <button @click="$emit('toggleSidebar')" class="text-gray-600 hover:text-black">
      <MenuIcon class="w-6 h-6" />
    </button>

    <!-- 右側：通知鈴鐺＋設定（大頭貼） -->
    <div class="flex items-center space-x-4">
      <BellIcon class="w-6 h-6 text-gray-600 hover:text-black cursor-pointer" />
      <div class="relative">
        <img src="https://via.placeholder.com/32" class="w-8 h-8 rounded-full cursor-pointer" />
      </div>
    </div>
  </header>
</template>

<script setup>
// import { MenuIcon, BellIcon } from 'lucide-vue-next'; // lucide-icons 更現代的icon
</script>

<template>
  <aside
    :class="[
      'bg-gray-100 w-64 fixed left-0 top-16',          // top-16 ➜ 避開 header
      'h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-300',
      collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
    ]"
  >
    <div class="h-16 flex items-center justify-center font-bold text-xl">
      LOGO
    </div>

    <nav class="mt-6 flex flex-col space-y-2 px-4">
      <MenuItem v-for="item in menuList" :key="item.id" :item="item" />
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MenuItem from './MenuItem.vue'
/*eslint-disable*/
defineProps({
  collapsed: { type: Boolean, required: true }
})

const menuList = ref([])

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get('http://localhost:8080/api/auth/menu', {
      headers: { Authorization: `Bearer ${token}` }
    })
    menuList.value = data.data
  } catch (err) {
    console.error('載入選單失敗:', err)
  }
})
</script>

<template>
  <div>
    <!-- 上層項目：有 children 的 -->
    <div
      v-if="item.children?.length"
      @click="toggle"
      class="cursor-pointer hover:bg-gray-300 p-2 rounded flex justify-between items-center"
    >
      {{ item.name }}
      <span class="ml-2 transition-transform duration-300" :class="{ 'rotate-90': isOpen }">
        ▶
      </span>
    </div>

    <!-- 下層項目：沒有 children 的 -->
    <a
      v-else
      :href="item.path"
      class="hover:bg-gray-300 p-2 rounded block ml-4"
    >
      {{ item.name }}
    </a>

    <!-- 子項目列表 -->
    <div v-if="isOpen && item.children?.length" class="ml-4">
      <MenuItem v-for="child in item.children" :key="child.id" :item="child" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
/* eslint-disable */
const { item } = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);

const toggle = () => {
  if (item.children?.length) {
    isOpen.value = !isOpen.value;
  }
};
</script>

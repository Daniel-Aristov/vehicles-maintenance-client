<template>
  <div v-if="isOpen" class="pop-menu" @click.stop>
    <button
      v-for="item in items"
      :key="item.id"
      class="pop-menu__item"
      :class="{ 'pop-menu__item--danger': item.type === 'danger' }"
      @click="$emit(item.action)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

interface MenuItem {
  id: string
  label: string
  action: string
  type?: 'default' | 'danger'
}

const props = defineProps<{
  isOpen: boolean
  items: MenuItem[]
}>()

const emit = defineEmits<{
  [key: string]: [value: unknown]
  'update:is-open': [isOpen: boolean]
}>()

const handleClickOutside = () => {
  if (props.isOpen) {
    emit('update:is-open', false)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.pop-menu {
  position: absolute;
  right: 0;
  top: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 4px;
  z-index: 50;
}

.pop-menu__item {
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s ease;
  color: #000000;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.pop-menu__item--danger {
  color: #ff4d4d;
}
</style>

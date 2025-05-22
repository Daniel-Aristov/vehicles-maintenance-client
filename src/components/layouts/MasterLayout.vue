<template>
  <div class="master-layout">
    <MainMenu @update:loading="updateLoading" />
    <main class="content">
      <div v-if="isLoading" class="loader-container">
        <div class="loader"></div>
      </div>
      <router-view v-else></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/MainMenu.vue'
import { ref } from 'vue'

const isLoading = ref(false)

const updateLoading = (value: boolean) => {
  isLoading.value = value
}
</script>

<style scoped>
.master-layout {
  display: flex;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  position: relative;
}

.loader-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 70px;
  height: 70px;
  border: 4px solid #d0d0d0;
  border-radius: 50%;
  border-top: 4px solid #930eec;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

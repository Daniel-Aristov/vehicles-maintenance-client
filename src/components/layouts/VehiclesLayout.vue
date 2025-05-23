<template>
  <div>
    <div class="header">
      <div class="header__breadcrumbs">
        <GarageIcon />
        <p class="header__breadcrumbs-item-text">Гараж</p>
      </div>
      <div class="header__buttons">
        <button
          v-if="showBackButton"
          class="header__button"
          @click="$router.push('/vehicles')"
        >
          Вернуться в гараж
        </button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import GarageIcon from '@/components/icons/GarageIcon.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showBackButton = computed(() => route.path !== '/vehicles')
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 36px;
  min-height: 40px;
}

.header__breadcrumbs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__breadcrumbs-item-text {
  font-size: 16px;
  font-weight: 500;
}

.header__buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__button {
  font-weight: 500;
  padding: 10px 40px;
}
</style>

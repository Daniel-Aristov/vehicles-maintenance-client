<template>
  <div>
    <div class="header">
      <div class="header__breadcrumbs">
        <ServiceIcon />
        <p class="header__breadcrumbs-item-text">Сервисы</p>
      </div>
      <div class="header__buttons">
        <button
          class="header__button"
          @click="$router.push('/services/create')"
        >
          Зарегистрировать сервис
        </button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import ServiceIcon from '@/components/icons/ServiceIcon.vue'
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
  height: 40px;
  font-weight: 500;
  padding: 10px 40px;
}
</style>

<template>
  <div>
    <div class="header">
      <div class="header__breadcrumbs">
        <ServiceIcon />
        <p class="header__breadcrumbs-item-text">Сервисы</p>
      </div>
      <div class="header__search" v-if="isVehiclesRoute">
        <input
          type="text"
          placeholder="Поиск..."
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="header__buttons">
        <button
          v-if="isVehiclesRoute"
          class="header__button"
          @click="$router.push('/services/create')"
        >
          Зарегистрировать сервис
        </button>
        <button
          v-else
          class="header__button"
          @click="$router.push('/services')"
        >
          Вернуться к сервисам
        </button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import ServiceIcon from '@/components/icons/ServiceIcon.vue'
import { computed, ref, provide } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isVehiclesRoute = computed(() => route.path === '/services')
const searchQuery = ref('')
const searchText = ref('')

provide('searchText', searchText)

const handleSearch = () => {
  searchText.value = searchQuery.value
}
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

.header__search {
  input {
    color: white;
    border: none;
    width: 500px;
    height: 40px;
    background-color: rgba(116, 116, 116, 0.5);
    border-radius: 8px;
    padding: 8px 16px;
  }
}
</style>

<template>
  <div class="error-not-found-view">
    <div class="error-not-found-view__logo">
      <img src="@/assets/images/logo.png" alt="logo" />
    </div>
    <div class="error-not-found-view__content">
      <h1 class="error-not-found-view__title">404</h1>
      <p class="error-not-found-view__subtitle">Упс... Страница не найдена</p>
      <p class="error-not-found-view__description">
        К сожалению, запрашиваемая вами страница была перемещена или удалена, а,
        возможно, ее никогда не было.
      </p>
      <button class="error-not-found-view__button" @click="goToHome">
        Вернуться на главную
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ErrorNotFoundView',
  setup() {
    const router = useRouter()

    const goToHome = () => {
      router.push('/profile')
    }

    return {
      goToHome
    }
  }
})
</script>

<style scoped>
.error-not-found-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-image: url('@/assets/images/glass.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.error-not-found-view__logo {
  margin-top: 42px;
  flex-shrink: 0;
  img {
    width: 260px;
    height: 80px;
  }
}

.error-not-found-view__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-not-found-view__title {
  font-size: 160px;
  font-weight: 500;
}

.error-not-found-view__subtitle {
  font-size: 28px;
  text-align: center;
  font-weight: 400;
}

.error-not-found-view__description {
  font-size: 18px;
  max-width: 600px;
  text-align: center;
  font-weight: 400;
  margin-top: 12px;
}

.error-not-found-view__button {
  width: 300px;
  margin-top: 50px;
}
</style>

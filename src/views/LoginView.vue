<template>
  <div class="auth-view">
    <LoginForm @submit="handleLogin" :error="error" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/store/auth.store'
import LoginForm from '@/components/auth/LoginForm.vue'
import { LoginData } from '@/types/auth.types'

export default defineComponent({
  components: {
    LoginForm
  },
  data: () => ({
    error: ''
  }),
  mounted() {
    this.error = ''
  },
  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    async handleLogin(data: LoginData) {
      try {
        await this.authStore.login(data)
        this.error = ''
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Произошла ошибка'
      }
    }
  }
})
</script>

<style scoped>
.auth-view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

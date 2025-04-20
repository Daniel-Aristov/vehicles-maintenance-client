<template>
  <div class="auth-view">
    <LoginForm
      v-if="currentForm === 'login'"
      @submit="handleLogin"
      :error="error"
    />
    <RegisterForm
      v-if="currentForm === 'register'"
      @submit="handleRegister"
      :error="error"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/store/auth.store'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { LoginData, RegisterData } from '@/types/auth.types'

export default defineComponent({
  components: {
    LoginForm,
    RegisterForm
  },
  data: () => ({
    error: ''
  }),
  props: {},
  emits: [],
  mounted() {
    this.error = ''
  },
  computed: {
    ...mapStores(useAuthStore),
    currentForm(): string {
      return this.$route.path.includes('register') ? 'register' : 'login'
    }
  },
  watch: {
    currentForm() {
      this.error = ''
    }
  },
  methods: {
    async handleLogin(data: LoginData) {
      try {
        await this.authStore.login(data)
        this.error = ''
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Произошла ошибка'
      }
    },
    async handleRegister(data: RegisterData) {
      try {
        await this.authStore.register(data)
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

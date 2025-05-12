<template>
  <div class="registration-email-confirm">
    <div class="content">
      <h2>Подтвердите адрес электронной почты</h2>
      <p>
        На вашу электронную почту
        <span class="email">{{ email }}</span>
        <br />
        было отправлено письмо с подтверждением регистрации!
      </p>
      <button class="back-button" @click="$router.push('/login')">
        Вернуться назад
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegistrationSuccess',
  props: {
    email: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.registration-email-confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  text-align: center;
  padding: 32px;
  border-radius: 12px;
  background-color: #090f23;
}

h2 {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 28px;
}

p {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 36px;
}

.email {
  display: inline-block;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

.back-button {
  max-width: 210px;
}
</style>

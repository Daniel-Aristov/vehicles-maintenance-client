<template>
  <div class="choice-register-entity">
    <div class="choice-register-entity__header">
      <div class="choice-register-entity__title">Выберите тип регистрации</div>
      <router-link to="/login" class="register-form__link"
        >Уже есть учетная запись? Войдите</router-link
      >
    </div>
    <div class="choice-register-entity__buttons">
      <button
        class="choice-register-entity__button"
        @click="handleClickButton('account')"
      >
        <img src="@/assets/images/choice-driver.png" alt="driver" />
        <span class="choice-register-entity__button-text">Автовладелец</span>
      </button>
      <button
        class="choice-register-entity__button"
        @click="handleClickButton('service')"
      >
        <img src="@/assets/images/choice-service.png" alt="service" />
        <span class="choice-register-entity__button-text"
          >Владелец автосервиса</span
        >
      </button>
      <button
        class="choice-register-entity__button"
        @click="handleClickButton('worker')"
      >
        <img src="@/assets/images/choice-worker.png" alt="worker" />
        <span class="choice-register-entity__button-text"
          >Сотрудник автосервиса</span
        >
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    handleClickButton(entity: 'account' | 'service' | 'worker') {
      this.$emit('selectedEntity', entity)
    }
  }
})
</script>

<style scoped>
.choice-register-entity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 120px;
}

.choice-register-entity__header {
  margin-bottom: 100px;
}

.choice-register-entity__title {
  font-size: 28px;
  font-weight: 600;
}

.register-form__link {
  display: block;
  font-size: 16px;
  text-align: center;
  margin-top: 40px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: #d0d0d0;
  }
}

.choice-register-entity__buttons {
  display: flex;
  flex-direction: row;
  gap: 160px;
}

.choice-register-entity__button {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #930eec;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  height: 300px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 10px -10px 1px rgba(147, 14, 236, 0.3);
  }

  span {
    font-size: 18px;
    font-weight: 500;
    margin-top: 15px;
    letter-spacing: 1.5px;
  }

  img {
    max-width: 240px;
    max-height: 180px;
    object-fit: contain;
  }
}
</style>

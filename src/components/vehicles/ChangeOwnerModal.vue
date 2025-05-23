<template>
  <div v-if="props.isOpen" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Передать автомобиль</h3>
        <div class="modal-close" @click="close">
          <CloseIcon :size="14" color="#fff" />
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Почта нового владельца</label>
          <input
            type="email"
            v-model="form.email"
            required
            placeholder="example@mail.com"
          />
        </div>
        <button class="modal-buttons__button-save" type="submit">
          Передать
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: { email: string }): void
}>()

const form = reactive({
  email: ''
})

const close = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form })
  form.email = ''
  close()
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-in-out;
  backdrop-filter: blur(2px);
  z-index: 100;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  color: #fff;
  font-size: 20px;
  font-weight: 400;
}

.modal-content {
  position: relative;
  background: #090f23;
  padding: 36px;
  border-radius: 20px;
  width: 450px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  color: #fff;
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  height: 44px;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.modal-buttons__button-save {
  width: 100%;
  margin-top: 8px;
}

.modal-close {
  background: none;
  font-size: 22px;
  border-radius: 8px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>

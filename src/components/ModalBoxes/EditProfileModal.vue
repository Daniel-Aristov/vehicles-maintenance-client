<template>
  <div v-if="modelValue" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Редактирование профиля</h3>
        <div class="modal-close" @click="close">
          <CloseIcon :size="14" color="#000000" />
        </div>
      </div>
      <form @submit.prevent="onUpdated">
        <div class="form-group">
          <label>Фамилия</label>
          <input v-model="form.last_name" placeholder="Фамилия" type="text" />
        </div>
        <div class="form-group">
          <label>Имя</label>
          <input v-model="form.first_name" placeholder="Имя" type="text" />
        </div>
        <div class="form-group">
          <label>Отчество</label>
          <input v-model="form.patronymic" placeholder="Отчество" type="text" />
        </div>
        <div class="form-group">
          <label>Телефон</label>
          <input
            type="text"
            placeholder="Номер телефона"
            v-model="form.phone"
            @input="formatPhoneNumber"
            maxlength="18"
          />
        </div>
        <div class="form-group">
          <label>Дата рождения</label>
          <input
            v-model="form.birthday"
            placeholder="Дата рождения"
            type="date"
          />
        </div>
        <div class="modal-buttons">
          <button type="submit">Сохранить</button>
          <button type="button" @click="close">Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/types/user.types'
import CloseIcon from '@/components/icons/CloseIcon.vue'

export default defineComponent({
  name: 'EditProfileModal',
  components: {
    CloseIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object as () => User | null,
      required: true
    }
  },
  emits: ['close', 'save'],
  data() {
    return {
      form: {
        first_name: this.userData?.first_name || null,
        last_name: this.userData?.last_name || null,
        patronymic: this.userData?.patronymic || null,
        phone: this.userData?.phone || null,
        birthday: this.userData?.birthday || null
      }
    }
  },
  watch: {
    userData: {
      handler(newValue: User) {
        this.form = {
          first_name: newValue?.first_name || null,
          last_name: newValue?.last_name || null,
          patronymic: newValue?.patronymic || null,
          phone: newValue?.phone || null,
          birthday: newValue?.birthday
            ? new Date(newValue.birthday).toISOString().split('T')[0]
            : null
        }
      },
      immediate: true
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.form = {
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
        birthday: null
      }
    },
    onUpdated() {
      this.$emit('save', this.form)
      this.close()
    },
    formatPhoneNumber(event: Event) {
      const input = event.target as HTMLInputElement
      let value = input.value.replace(/\D/g, '')

      if (value.length === 0) {
        this.form.phone = ''
        return
      }

      if (value[0] === '7' || value[0] === '8') {
        value = value.substring(1)
      }

      let formattedNumber = '+7'
      if (value.length > 0) {
        formattedNumber += ' (' + value.substring(0, 3)
      }
      if (value.length > 3) {
        formattedNumber += ') ' + value.substring(3, 6)
      }
      if (value.length > 6) {
        formattedNumber += '-' + value.substring(6, 8)
      }
      if (value.length > 8) {
        formattedNumber += '-' + value.substring(8, 10)
      }

      this.form.phone = formattedNumber
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-in-out;
  backdrop-filter: blur(2px);
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
  color: #000;
}

.modal-content {
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  color: #000;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-buttons button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button[type='submit'] {
  background: #8c04e6;
  color: white;
  border: none;
  &:hover {
    background-color: #7a00c4;
  }
}

.modal-buttons button[type='button'] {
  background: #6a6a6a;
  border: 1px solid white;
  &:hover {
    background-color: #616161;
  }
}

.modal-close {
  background: none;
  font-size: 22px;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
  &:hover {
    background-color: #dbdbdb;
  }
}
</style>

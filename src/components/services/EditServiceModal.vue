<template>
  <div v-if="modelValue" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Редактирование сервиса</h3>
        <div class="modal-close" @click="close">
          <CloseIcon :size="14" color="#fff" />
        </div>
      </div>
      <form @submit.prevent="onUpdated">
        <div class="form-group">
          <label>Коммерческое название</label>
          <input
            v-model="form.commercial_name"
            placeholder="Коммерческое название"
            type="text"
          />
        </div>
        <div class="form-group">
          <label>Адрес</label>
          <input v-model="form.address" placeholder="Адрес" type="text" />
        </div>
        <div class="form-group form-group__textarea">
          <label>Описание</label>
          <textarea
            v-model="form.summary"
            placeholder="Описание"
            rows="4"
          ></textarea>
        </div>
        <div class="form-group">
          <label>График работы</label>
          <input
            v-model="form.timetable"
            placeholder="График работы"
            type="text"
          />
        </div>
        <div class="form-group">
          <label>Веб-сайт</label>
          <input v-model="form.website" placeholder="Веб-сайт" type="text" />
        </div>
        <button class="modal-buttons__button-save" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Service } from '@/types/service.types'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { UpdateServiceDto } from '@/js/models/services.dto'

export default defineComponent({
  name: 'EditServiceModal',
  components: {
    CloseIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    service: {
      type: Object as () => Service | null,
      required: true
    }
  },
  emits: ['update:modelValue', 'update-service'],
  data() {
    return {
      form: {
        commercial_name: this.service?.commercial_name || null,
        address: this.service?.address || null,
        summary: this.service?.summary || null,
        timetable: this.service?.timetable || null,
        website: this.service?.website || null
      } as UpdateServiceDto
    }
  },
  watch: {
    service: {
      handler(newValue: Service) {
        this.form = {
          commercial_name: newValue?.commercial_name || null,
          address: newValue?.address || null,
          summary: newValue?.summary || null,
          timetable: newValue?.timetable || null,
          website: newValue?.website || null
        }
      },
      immediate: true
    },
    modelValue(newValue: boolean) {
      if (newValue && this.service) {
        this.form = {
          commercial_name: this.service.commercial_name || null,
          address: this.service.address || null,
          summary: this.service.summary || null,
          timetable: this.service.timetable || null,
          website: this.service.website || null
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false)
      this.form = {
        commercial_name: null,
        address: null,
        summary: null,
        timetable: null,
        website: null
      }
    },
    onUpdated() {
      this.$emit('update-service', this.form)
      this.close()
    }
  }
})
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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
}

.form-group input {
  height: 44px;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
  max-width: 427px;
}

.form-group__textarea {
  margin-bottom: 10px;
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

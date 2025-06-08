<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Оценка работника</h3>
        <div class="modal-close" @click="close">
          <CloseIcon :size="14" color="#fff" />
        </div>
      </div>
      <div class="rating-container">
        <div class="stars">
          <div
            v-for="star in 5"
            :key="star"
            class="star"
            @click="selectRating(star)"
            @mouseenter="setHoverRating(star)"
            @mouseleave="setHoverRating(0)"
            :class="{ active: star <= (hoverRating || selectedRating) }"
          >
            <StarIcon
              :color="
                star <= (hoverRating || selectedRating) ? '#ffc107' : '#4a4a4a'
              "
            />
          </div>
        </div>
      </div>
      <button
        class="modal-buttons__button-save"
        @click="onSubmit"
        :disabled="!selectedRating"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'

export default defineComponent({
  name: 'RateWorkerModal',
  components: {
    CloseIcon,
    StarIcon
  },
  emits: ['close', 'submit'],
  data() {
    return {
      selectedRating: 0,
      hoverRating: 0
    }
  },
  methods: {
    selectRating(rating: number) {
      this.selectedRating = rating
    },
    setHoverRating(rating: number) {
      this.hoverRating = rating
    },
    close() {
      this.$emit('close')
      this.selectedRating = 0
    },
    onSubmit() {
      this.$emit('submit', this.selectedRating)
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

.rating-container {
  margin: 20px 0;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.star {
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 32px;
    height: 32px;
  }
}

.modal-buttons__button-save {
  width: 100%;
  margin-top: 8px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

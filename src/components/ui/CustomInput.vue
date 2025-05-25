<template>
  <div class="custom-input">
    <span class="custom-input__icon" v-if="icon">
      <component :is="icon" color="#858585" />
    </span>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :maxlength="maxlength"
      :disabled="disabled"
      @input="handleInput"
      :class="{ 'with-icon': icon }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    maxlength: {
      type: String,
      default: ''
    },
    icon: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(e: Event) {
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
  }
})
</script>

<style scoped>
.custom-input {
  position: relative;
  width: 100%;
}

.custom-input__icon {
  position: absolute;
  width: 25px;
  height: 25px;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

input.with-icon {
  padding-left: 50px;
}

input:disabled {
  background-color: #c7c7c7 !important;
  color: #000000 !important;
  cursor: not-allowed;
  opacity: 1;
}
</style>

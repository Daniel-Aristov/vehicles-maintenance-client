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
      type: String,
      default: ''
    },
    maxlength: {
      type: String,
      default: ''
    },
    icon: {
      type: [String, Object],
      default: null
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
</style>

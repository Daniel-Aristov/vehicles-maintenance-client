<template>
  <div class="custom-input">
    <span class="custom-input__icon" v-if="icon">
      <component :is="icon" color="#858585" />
    </span>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
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
    icon: {
      type: [String, Object],
      default: null
    }
  },
  emits: ['update:modelValue']
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

input {
  padding-left: 50px;
}
</style>

<template>
  <div class="custom-textarea">
    <span class="custom-textarea__icon" v-if="icon">
      <component :is="icon" color="#858585" />
    </span>
    <textarea
      :placeholder="placeholder"
      :value="modelValue"
      :maxlength="maxlength"
      :disabled="disabled"
      :rows="rows"
      @input="handleInput"
      :class="{ 'with-icon': icon }"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(e: Event) {
      this.$emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
    }
  }
})
</script>

<style scoped>
.custom-textarea {
  position: relative;
  width: 100%;

  textarea {
    width: 535px;
  }
}

.custom-textarea__icon {
  position: absolute;
  width: 25px;
  height: 25px;
  left: 14px;
  top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

textarea:disabled {
  background-color: #c7c7c7 !important;
  color: #000000 !important;
  cursor: not-allowed;
  opacity: 1;
}

textarea.with-icon {
  padding-left: 50px;
}
</style>

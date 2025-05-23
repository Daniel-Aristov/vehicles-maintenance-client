<template>
  <div class="custom-select" v-click-outside="closeDropdown">
    <div
      class="custom-select__input"
      :class="{ 'is-disabled': disabled }"
      @click="toggleDropdown"
    >
      <input
        readonly
        :placeholder="placeholder"
        :value="selectedLabel"
        :disabled="disabled"
      />
      <span
        class="custom-select__arrow"
        :class="{ 'is-open': isOpen, 'is-disabled': disabled }"
      >
        <DownArrowIcon />
      </span>
    </div>
    <div v-if="isOpen && !disabled" class="custom-select__dropdown">
      <div v-if="options.length === 0" class="custom-select__option">
        Список пуст!
      </div>
      <div
        v-else
        v-for="option in options"
        :key="option.value"
        class="custom-select__option"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'

export default defineComponent({
  components: {
    DownArrowIcon
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array as () => Array<{ value: string | number; label: string }>,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isOpen = ref(false)

    const selectedLabel = computed(() => {
      const selected = props.options.find(
        (option) => option.value === props.modelValue
      )
      return selected ? selected.label : ''
    })

    const toggleDropdown = () => {
      if (!props.disabled) {
        isOpen.value = !isOpen.value
      }
    }

    const closeDropdown = () => {
      isOpen.value = false
    }

    const selectOption = (option: {
      value: string | number
      label: string
    }) => {
      emit('update:modelValue', option.value)
      closeDropdown()
    }

    return {
      isOpen,
      selectedLabel,
      toggleDropdown,
      closeDropdown,
      selectOption
    }
  }
})
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
}

.custom-select__input {
  position: relative;
  width: 100%;
}

.custom-select__input input {
  width: 100%;
  height: 43px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 0 40px 0 20px;
  font-size: 16px;
  cursor: pointer;
}

.custom-select__arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.2s;
  cursor: pointer;
}

.custom-select__arrow.is-open {
  transform: translateY(-50%) rotate(180deg);
}

.custom-select__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.custom-select__option {
  color: #000;
  padding: 12px 20px;
  cursor: pointer;
  border-bottom: 1px solid #e5e5e5;
}

.custom-select__option:last-child {
  border-bottom: none;
}

.custom-select__option:hover {
  background: #f5f5f5;
}

.custom-select__input.is-disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  border-radius: 10px;
}

.custom-select__input.is-disabled input {
  background: #f5f5f5;
  cursor: not-allowed;
  color: #999;
}

.custom-select__arrow.is-disabled {
  opacity: 0.5;
}

.custom-select__empty {
  color: #999;
  padding: 12px 20px;
  text-align: center;
  font-size: 14px;
}
</style>

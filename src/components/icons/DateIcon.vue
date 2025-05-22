<template>
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.0833 18.4322H12.9166M16.5939 18.4322H18.4273M5.58332 18.4322H7.41663M11.0833 12.9322H12.9166M16.5939 12.9322H18.4273M5.58332 12.9322H7.41663M1 8.33332H23.0106M17.5106 5.58332V1M6.5 5.58332V1M4.67726 23H19.3333C21.3642 23 23.0106 21.3536 23.0106 19.3227V6.51063C23.0106 4.47973 21.3642 2.83332 19.3333 2.83332H4.67726C2.64636 2.83332 1 4.47973 1 6.51063V19.3227C1 21.3536 2.64636 23 4.67726 23Z"
      :stroke="color"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DateIcon',
  props: {
    color: {
      type: String,
      default: '#ffffff'
    }
  }
})
</script>

<style scoped></style>

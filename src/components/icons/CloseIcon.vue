<template>
  <svg :width="size" :height="size" x="0" y="0" viewBox="0 0 47.971 47.971">
    <g>
      <path
        d="M28.228 23.986 47.092 5.122a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 1 0 4.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L28.228 23.986z"
        :fill="color"
        opacity="1"
        data-original="#000000"
      ></path>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CloseIcon',
  props: {
    size: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: '#000000'
    }
  }
})
</script>

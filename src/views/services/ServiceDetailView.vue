<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useServicesStore } from '@/store/services.store'

export default defineComponent({
  components: {},
  data: () => ({}),
  props: {},
  emits: [],
  computed: {
    ...mapStores(useServicesStore)
  },
  methods: {}
})
</script>

<style scoped></style>

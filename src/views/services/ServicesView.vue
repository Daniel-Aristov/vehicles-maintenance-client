<template>
  <div>
    <div class="services-list">
      <div class="services-list__item">Сервис 1</div>
      <div class="services-list__item">Сервис 2</div>
      <div class="services-list__item">Сервис 3</div>
      <div class="services-list__item">Сервис 4</div>
      <div class="services-list__item">Сервис 5</div>
      <div class="services-list__item">Сервис 6</div>
      <div class="services-list__item">Сервис 7</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'

export default defineComponent({
  components: {},
  data: () => ({}),
  props: {},
  emits: [],
  computed: {
    ...mapStores([])
  },
  methods: {}
})
</script>

<style scoped>
.services-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.services-list__item {
  padding: 10px;
  border-radius: 10px;
  background-color: #474747;
}
</style>

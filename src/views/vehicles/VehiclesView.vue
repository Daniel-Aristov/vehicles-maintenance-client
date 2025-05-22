<template>
  <div>
    <div class="vehicles-list">
      <div class="vehicles-list__item"></div>
      <div
        class="vehicles-list__add-button"
        @click="$router.push('/vehicles/create')"
      >
        <PlusIcon />
        <span>Добавить автомобиль</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import PlusIcon from '@/components/icons/PlusIcon.vue'

export default defineComponent({
  components: {
    PlusIcon
  },
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
.vehicles-list {
  padding: 0 36px;
  min-height: 70px;
}

.vehicles-list__add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 444px;
  height: 191px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>

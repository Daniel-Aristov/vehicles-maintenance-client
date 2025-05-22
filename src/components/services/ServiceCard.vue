<template>
  <div class="service-card" @click="goToServiceDetail">
    <div class="service-card__header">
      <p class="service-card__title">{{ service.name }}</p>
      <div class="service-card__timetable">
        <TimeIcon />
        <p class="service-card__timetable">{{ service.timetable }}</p>
      </div>
    </div>
    <p class="service-card__summary">{{ service.summary }}</p>
    <div class="service-card__info">
      <AdressIcon />
      <p class="service-card__text">{{ service.address }}</p>
    </div>
    <div class="service-card__info">
      <InternetIcon />
      <p class="service-card__text">{{ service.website }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Service } from '@/types/service.types'
import TimeIcon from '@/components/icons/TimeIcon.vue'
import AdressIcon from '@/components/icons/AdressIcon.vue'
import InternetIcon from '@/components/icons/InternetIcon.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    TimeIcon,
    AdressIcon,
    InternetIcon
  },
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const goToServiceDetail = () => {
      router.push(`/services/${props.service.id}`)
    }

    return {
      goToServiceDetail
    }
  }
})
</script>

<style scoped>
.service-card {
  padding: 24px 40px;
  background-color: #090f23;
  border-radius: 12px;
  cursor: pointer;
  width: 1110px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0a0f22;
  }
}

.service-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.service-card__timetable {
  display: flex;
  align-items: center;
  gap: 8px;
}

.service-card__info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
}

.service-card__title {
  font-size: 18px;
  font-weight: 600;
}

.service-card__timetable {
  font-size: 16px;
  font-weight: 500;
}

.service-card__summary {
  font-size: 15px;
  color: #c2c2c2;
  font-weight: 500;
  margin-top: 6px;
  margin-bottom: 24px;
}

.service-card__text {
  font-size: 15px;
  font-weight: 500;
}
</style>

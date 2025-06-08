import {
  Configuration,
  Generation,
  Make,
  Model,
  Range,
  Vehicle
} from '@/types/vehicle.types'
import { defineStore } from 'pinia'
import { VehicleService } from '@/js/services/vehicle.service'
import { CreateVehicleDto } from '@/js/models/vehicle.dto'
import { useUserStore } from '@/store/user.store'

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicles: [] as Vehicle[],
    makes: [] as Make[],
    models: [] as Model[],
    ranges: [] as Range[],
    generations: [] as Generation[],
    configurations: [] as Configuration[]
  }),
  getters: {
    getVehicleById: (state) => (id: number) => {
      return state.vehicles.find((vehicle) => vehicle.id === id)
    }
  },
  actions: {
    async getVehiclesByOwnerId(ownerId: number) {
      const vehicles = await VehicleService.getVehiclesByOwnerId(ownerId)
      this.vehicles = vehicles
    },
    async createVehicle(vehicle: CreateVehicleDto) {
      try {
        const userStore = useUserStore()

        if (!userStore.user) {
          throw new Error('Пользователь не авторизован')
        }

        if (!userStore.user.roles.includes('owner')) {
          await userStore.assignNewRoleUser({ role: 'owner' })
        }

        const newVehicle = await VehicleService.createVehicle(vehicle)
        this.vehicles?.push(newVehicle)
      } catch (error) {
        console.error(error)
      }
    },
    async getMakes() {
      const makes = await VehicleService.getMakes()
      this.makes = makes
    },
    async getModels(
      makeId: number,
      modelType: 'passenger' | 'truck' | null = null
    ) {
      const models = await VehicleService.getModels(makeId, modelType)
      this.models = models
    },
    async getRanges(modelId: number) {
      const ranges = await VehicleService.getRanges(modelId)
      this.ranges = ranges
    },
    async getGenerations(rangeId: number) {
      const generations = await VehicleService.getGenerations(rangeId)
      this.generations = generations
    },
    async getConfigurations(generationId: number) {
      const configurations = await VehicleService.getConfigurations(
        generationId
      )
      this.configurations = configurations
    },
    async changeOwner(vehicleId: number, email: string) {
      try {
        await VehicleService.changeOwner(vehicleId, email)
      } catch (error) {
        throw new Error('Не удалось отправить письмо на почту нового владельца')
      }
    }
  }
})

import { MaintenanceRecordDto } from '@/js/models/maintenance.dto'
import { MaintenanceService } from '@/js/services/maintenance.service'
import { VehicleService } from '@/js/services/vehicle.service'
import { MaintenanceRecord } from '@/types/maintenace'
import { defineStore } from 'pinia'

export const useMaintenanceStore = defineStore('maintenance', {
  state: () => ({
    maintenanceRecords: [] as MaintenanceRecord[]
  }),
  actions: {
    async createMaintenanceRecord(maintenanceRecord: MaintenanceRecordDto) {
      try {
        const newMaintenanceRecord =
          await MaintenanceService.createMaintenanceRecord(maintenanceRecord)
        this.maintenanceRecords.push(newMaintenanceRecord)
      } catch (error) {
        throw new Error('Не удалось создать запись технического обслуживания')
      }
    },
    async getMaintenanceRecords(vehicleId: number) {
      try {
        const maintenanceRecords = await VehicleService.getMaintenanceRecords(
          vehicleId
        )
        this.maintenanceRecords = maintenanceRecords
      } catch (error) {
        throw new Error('Не удалось получить записи технического обслуживания')
      }
    },
    async getMaintenancePurchaseOrders(maintenanceOrderId: number) {
      try {
        await MaintenanceService.getMaintenancePurchaseOrders(
          maintenanceOrderId
        )
      } catch (error) {
        throw new Error('Не удалось получить накладную')
      }
    }
  }
})

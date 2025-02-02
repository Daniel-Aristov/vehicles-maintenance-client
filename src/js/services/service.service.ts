import axios from 'axios'
import { ServiceResponse } from '@/js/models/services.dto'

export async function getAllServices() {
  const { data } = await axios.get<ServiceResponse[]>(
    'http://localhost:8000/services'
  )
  return data
}

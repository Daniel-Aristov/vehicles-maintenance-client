import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance

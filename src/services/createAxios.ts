import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_GATEWAY_URL,
  headers: {
    "Content-type": "application/json",
  }
})

export default api

import axios from 'axios'
import type { App } from 'vue'

interface AxiosOptions {
  baseUrl?: string
  token?: string
}

export default {
  install: (app: App, options: AxiosOptions) => {
    const axiosInstance = axios.create({
      baseURL: options.baseUrl,
    })
    app.config.globalProperties.$axios = axiosInstance
  },
}

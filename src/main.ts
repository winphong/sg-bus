import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import './assets/main.css'
import axios from './api/axios'
import type { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

const app = createApp(App)

app.use(router)
app.use(axios, {
  baseUrl: 'http://localhost:8081'
})

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  }
})

app.mount('#app')

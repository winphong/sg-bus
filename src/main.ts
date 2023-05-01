import { createApp, type InjectionKey } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import './assets/main.css'
import axios from './api/axios'
import type { AxiosInstance } from 'axios'
import store from './store'
import type { Store } from './store/types/store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $store: Store
  }
}

const app = createApp(App)

app.use(router)
app.use(axios, { baseUrl: import.meta.env.VITE_BASE_URL })

app.use(VueGoogleMaps, {
  load: { key: import.meta.env.VITE_GOOGLE_MAP_API_KEY },
})

app.use(store)

app.mount('#app')

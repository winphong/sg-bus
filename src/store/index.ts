import type { IBusStop } from '@/model'
import { createStore } from 'vuex'
import type { IStore } from './IStore'

const store = createStore<IStore>({
  state: {
    nearbyBusStops: [] as IBusStop[],
    selectedBusStop: null as IBusStop | null,
    lng: null,
    lat: null,
  },
  mutations: {
    setSelectedBusStop(state, payload: { busStop: IBusStop | null }) {
      state.selectedBusStop = payload.busStop
    },
    setNearbyBusStops(state, payload: { busStops: IBusStop[] }) {
      state.nearbyBusStops = payload.busStops
    },
    setCurrentPosition(
      state,
      payload: { position: { lng: number; lat: number } },
    ) {
      state.lng = payload.position.lng
      state.lat = payload.position.lat
    },
  },
  getters: {
    getNearbyBusStops(state) {
      return state.nearbyBusStops
    },
    getSelectedBusStop(state) {
      return state.selectedBusStop
    },
    getCurrentPosition(state) {
      return { lat: state.lat, lng: state.lng }
    },
  },
})

export default store

import _ from 'lodash'
import { createStore } from 'vuex'
import rbush from 'rbush'

import type { IStore } from '@/store/IStore'
import type { IBusStop } from '@/model'

import RawBusStops from '@/data/bus-stops.json'
import GeoDistanceCalculator from '@/lib/GeoDistanceCalculator'

const store = createStore<IStore>({
  state: {
    nearbyBusStops: new Map<string, IBusStop>(),
    selectedBusStopCode: '',
    lng: null,
    lat: null,
  },
  mutations: {
    setSelectedBusStop(state, payload: { busStopCode: string | null }) {
      state.selectedBusStopCode = payload.busStopCode
    },
    setNearbyBusStops(state, payload: { busStops: IBusStop[] }) {
      state.nearbyBusStops = new Map(
        payload.busStops.map((v) => [v.BusStopCode, v]),
      )
    },
    setCurrentPosition(
      state,
      payload: { position: { lng: number; lat: number } },
    ) {
      state.lng = payload.position.lng
      state.lat = payload.position.lat

      localStorage.setItem(
        'position',
        JSON.stringify({
          lng: payload.position.lng,
          lat: payload.position.lat,
        }),
      )
    },
  },
  getters: {
    getBusStops() {
      const data = _.keyBy(RawBusStops, 'BusStopCode')
      return data
    },
    getRbush() {
      const tree = new rbush() // initialize R-tree
      const data = RawBusStops.map((stop) => {
        return {
          minX: stop.Latitude,
          minY: stop.Longitude,
          maxX: stop.Latitude,
          maxY: stop.Longitude,
          id: stop.BusStopCode,
        }
      })
      tree.load(data)

      return tree
    },
    getNearbyBusStops(state, getters) {
      if (state.lat === null || state.lng === null) {
        return []
      }

      const delta = 0.008

      const bbox = {
        maxX: state.lat + delta,
        maxY: state.lng + delta,
        minX: state.lat - delta,
        minY: state.lng - delta,
      }
      const matchingBusStops = getters.getRbush.search(bbox)

      const calculator = new GeoDistanceCalculator()
      const matchingBusStopsWDistance = matchingBusStops.map((v) => {
        const busStop = getters.getBusStops[v.id]
        return {
          ...busStop,
          distance: calculator.getDistance({
            srcLat: state.lat!,
            srcLng: state.lng!,
            destLat: busStop.Latitude,
            destLng: busStop.Longitude,
          }),
        }
      })

      return _.orderBy(matchingBusStopsWDistance, 'distance', 'asc')
    },

    getSelectedBusStop: (_, getters) => (selectedBusStopCode: string) => {
      return getters.getBusStops[selectedBusStopCode]
    },
    getCurrentPosition(state) {
      if (localStorage.getItem('position')) {
        return JSON.parse(localStorage.getItem('position') || '{}')
      }
      return { lat: state.lat, lng: state.lng }
    },
  },
})

export default store

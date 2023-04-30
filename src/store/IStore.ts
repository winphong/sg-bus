import type { IBusStop } from '@/model'

export interface IStore {
  selectedBusStop: IBusStop | null
  nearbyBusStops: IBusStop[]
  lat: number | null
  lng: number | null
}

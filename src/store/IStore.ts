import type { IBusStop } from '@/model'

export interface IStore {
  selectedBusStopCode: string | null
  nearbyBusStops: Map<string, IBusStop>
  lat: number | null
  lng: number | null
}

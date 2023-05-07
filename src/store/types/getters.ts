import type { IBusStop, IBusStopDistance } from '@/model'
import type { IStore } from '@/store/IStore'

export type Getters = {
  getNearbyBusStops(state: IStore): IBusStopDistance[]
  getSelectedBusStop(state: IStore): (code: string) => IBusStop
  getCurrentPosition(state: IStore): { lat: number; lng: number }
  getIsRetrievingPosition(state: IStore): boolean
}

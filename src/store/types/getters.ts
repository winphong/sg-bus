import type { IBusStop } from '@/model'
import type { IStore } from '@/store/IStore'

export type Getters = {
  getNearbyBusStops(state: IStore): IBusStop[]
  getSelectedBusStop(state: IStore): (code: string) => IBusStop
  getCurrentPosition(state: IStore): { lat: number; lng: number }
}
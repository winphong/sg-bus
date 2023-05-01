import type { ILocation } from './common'

export interface IBusStop {
  code: string
  description: string
  roadName: string
  location: ILocation
  distance: number
}

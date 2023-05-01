export interface IBusStop {
  BusStopCode: string
  Description: string
  RoadName: string
  Latitude: number
  Longitude: number
}

export interface IBusStopDistance extends IBusStop {
  distance: number
}

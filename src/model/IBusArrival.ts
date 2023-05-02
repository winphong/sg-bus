export interface IBusArrival {
  service_num: string
  operator: string
  next: IBusNextArrival
  next2: IBusNextArrival
  next3: IBusNextArrival
  OriginCode: string
  DestinationCode: string
}

export interface IBusNextArrival {
  duration_ms: number
  feature: string
  lat: number | null
  lng: number | null
  load: string
  time: string
  type: string
}

export interface RawBusRoute {
  ServiceNo: string
  Operator: string
  Direction: number
  StopSequence: number
  BusStopCode: string
  Distance: number
  WD_FirstBus: string
  WD_LastBus: string
  SAT_FirstBus: string
  SAT_LastBus: string
  SUN_FirstBus: string
  SUN_LastBus: string
}
export interface RawBusService {
  ServiceNo: string
  Operator: string
  Direction: number
  Category: string
  OriginCode: string
  DestinationCode: string
  AM_Peak_Freq: string
  AM_Offpeak_Freq: string
  PM_Peak_Freq: string
  PM_Offpeak_Freq: string
  LoopDesc: string
}

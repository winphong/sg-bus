export default class GeoDistanceCalculator {
  public getDistance = ({
    srcLat,
    destLat,
    srcLng,
    destLng,
  }: {
    srcLat: number
    destLat: number
    srcLng: number
    destLng: number
  }) => {
    const R = 6371 // Radius of the earth in km
    const dLat = this.deg2rad(destLat - srcLat) // deg2rad below
    const dLon = this.deg2rad(destLng - srcLng)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(srcLat)) *
        Math.cos(this.deg2rad(destLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  // Deg conversion
  private deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }
}

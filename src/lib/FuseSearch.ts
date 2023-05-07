import Fuse from 'fuse.js'
import RawBusStop from '@/data/bus-stops.json'
import _ from 'lodash'

export default class FuseSearch {
  public search(searchString: string) {
    const fuse = new Fuse(_.map(RawBusStop), {
      keys: [
        { name: 'Description', weight: 0.9 },
        { name: 'BusStopCode', weight: 0.1 },
      ],
      isCaseSensitive: false,
      threshold: 0.1,
      distance: 50,
      shouldSort: true,
      includeScore: true,
    })
    return fuse.search(searchString)
  }
}

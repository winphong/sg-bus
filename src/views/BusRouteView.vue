<script lang="ts">
import _ from 'lodash'
import type { IBusStopDistance } from '@/model'
import BaseCard from '@/components/BaseCard.vue'
import BusRoutes from '@/data/bus-routes-by-bus-service.json'

export default {
  components: {
    BaseCard,
  },
  props: {
    busStop: { type: Object as () => IBusStopDistance, required: true },
  },
  methods: {
    isNearby(busStopCode: string) {
      const nearbyBusStops = _.map(
        this.$store.getters.getNearbyBusStops,
        (busStop) => busStop.BusStopCode,
      )

      if (nearbyBusStops.length === 0) {
        return false
      }

      return nearbyBusStops[0] === busStopCode
      // return _.some(nearbyBusStops, (busStop) => busStop === busStopCode)
    },
  },
  computed: {
    routes() {
      const busRoutes = BusRoutes[this.$route.params.busId]
      const routes = _.map(_.uniqBy(busRoutes, 'Distance'), (route) => {
        const busStop = this.$store.getters.getBusStops[route.BusStopCode]

        return {
          ServiceNo: route.ServiceNo,
          BusStopCode: route.BusStopCode,
          BusStopName: busStop.Description,
          BusStopRoad: busStop.RoadName,
          Distance: route.Distance,
        }
      })
      return routes
    },
  },
}
</script>

<template>
  <div v-for="route in routes" :key="route.Distance">
    <base-card
      :style="{
        padding: '10px',
        margin: '8px',
        border: isNearby(route.BusStopCode) ? '1px solid green' : undefined,
      }"
    >
      <span>{{ route.Distance }}km, {{ route.BusStopCode }}, {{ route.BusStopName }}</span>
    </base-card>
  </div>
</template>

<style scoped>
.container {
  padding: 12px;
  margin: 12px 0;
}
</style>

<script lang="ts">
import _ from 'lodash'

import BusListItem from '@/components/BusListItem.vue'
import GoogleMap from '@/components/GoogleMap.vue'
import type { IBusStop } from '@/model'

export default {
  components: { BusListItem, GoogleMap },
  data() {
    return {
      nearbyBusStops: [] as IBusStop[],
      currentPosition: { lat: null, lng: null } as { lat: number | null, lng: number | null }
    }
  },
  async mounted() {
    navigator.geolocation.getCurrentPosition((e) => {
      this.currentPosition = { lat: e.coords.latitude, lng: e.coords.longitude }
    }, (e) => console.log('failure', e));
  },
  watch: {
    async currentPosition() {
      const { lat, lng } = this.currentPosition
      if (lat === null || lng === null) {
        return
      }
      const busStops = (await this.$axios.get(`?lat=${lat}&lng=${lng}`)).data.services.data
      this.nearbyBusStops = busStops
    }
  },
  computed: {
    markers() {
      return _.map(this.nearbyBusStops, (busStop) => {
        return { position: { lat: busStop.location.latitude, lng: busStop.location.longitude } }
      }).slice(0, 10)
    },
    center() {
      if (this.currentPosition.lat !== null && this.currentPosition.lng !== null) {
        return this.currentPosition
      }
      return this.markers[0]?.position ?? { lat: 0, lng: 0 }
    }
  }
}
</script>

<template>
  <div class="nearby-bus-container">
    <!-- <google-map :center="center" :markers="markers"></google-map> -->
    <div v-for="busStop in nearbyBusStops" :key="busStop.code">
      <bus-list-item :bus-stop="busStop"></bus-list-item>
    </div>
  </div>
</template>


<style scoped>
.nearby-bus-container {
  margin: 0 4vw;
}
</style>
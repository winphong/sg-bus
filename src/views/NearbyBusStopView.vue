<script lang="ts">
import _ from 'lodash'

import BusListItem from '@/components/BusListItem.vue'
import GoogleMap from '@/components/GoogleMap.vue'

export default {
  components: { BusListItem, GoogleMap },
  data() {
    return {
      currentPosition: { lat: null, lng: null } as { lat: number | null, lng: number | null },
      // isLoading: true
    }
  },
  computed: {
    getNearbyBusStops() {
      return this.$store.getters.getNearbyBusStops
    },
    getCurrentPosition() {
      return this.$store.getters.getCurrentPosition
    },
    markers() {
      return _.map(this.getNearbyBusStops, (busStop) => {
        return { position: { lat: busStop.Latitude, lng: busStop.Longitude } }
      }).slice(0, 10)
    },
    center() {
      const position = this.getCurrentPosition
      if (position?.lat !== null && position?.lng !== null) {
        return position
      }
      return this.markers[0]?.position ?? { lat: 0, lng: 0 }
    }
  }
}
</script>

<template>
  <div>
    <!-- <div class="circular-progreess-container">
      <v-progress-circular v-if="isLoading" indeterminate color="primary" size="40"></v-progress-circular>
    </div> -->
    <!-- <google-map :center="center" :markers="markers"></google-map> -->
    <div v-for="busStop in getNearbyBusStops" :key="busStop.BusStopCode">
      <bus-list-item :bus-stop="busStop"></bus-list-item>
    </div>
  </div>
</template>


<style scoped>
.circular-progreess-container {
  position: absolute;
  top: 3vh;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
}
</style>
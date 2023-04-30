<script lang="ts">
import _ from 'lodash'
import { mapGetters } from 'vuex'

import BusListItem from '@/components/BusListItem.vue'
import GoogleMap from '@/components/GoogleMap.vue'

export default {
  components: { BusListItem, GoogleMap },
  data() {
    return {
      currentPosition: { lat: null, lng: null } as { lat: number | null, lng: number | null }
    }
  },
  async mounted() {
    navigator.geolocation.getCurrentPosition((e) => {
      const position = { lat: e.coords.latitude, lng: e.coords.longitude }
      this.currentPosition = position
    }, (e) => console.log('failure', e));
  },
  watch: {
    async currentPosition() {
      const { lat, lng } = this.currentPosition
      if (lat === null || lng === null) {
        return
      }

      const position = this.$store.getters.getCurrentPosition
      if (position.lat && position.lng) {
        console.log("Same position")
        return
      }

      const busStops = (await this.$axios.get(`/nearby-bus-stops?lat=${lat}&lng=${lng}`)).data.data

      this.$store.commit('setNearbyBusStops', { busStops })
      this.$store.commit('setCurrentPosition', { position: this.currentPosition })
    }
  },
  computed: {
    ...mapGetters(['getNearbyBusStops']),
    markers() {
      return _.map(this.getNearbyBusStops, (busStop) => {
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
  <div>
    <!-- <google-map :center="center" :markers="markers"></google-map> -->
    <div v-for="busStop in getNearbyBusStops" :key="busStop.code">
      <bus-list-item :bus-stop="busStop"></bus-list-item>
    </div>
  </div>
</template>


<style scoped></style>
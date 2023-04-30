<script lang="ts">
import BusListItem from '@/components/BusListItem.vue'
import GoogleMap from '@/components/GoogleMap.vue'
import type { IBusStop } from '@/model'

export default {
  components: { BusListItem, GoogleMap },
  data() {
    return {
      nearbyBusStops: [] as IBusStop[]
    }
  },
  async mounted() {
    const busStops = (await this.$axios.get('/?id=1')).data.services.data
    this.nearbyBusStops = busStops
  },
  computed: {

    center() { return { lat: 1.459689, lng: 103.7701027, } },
    markers() {
      return this.nearbyBusStops.map(busStop => {
        return { position: { lat: busStop.location.latitude, lng: busStop.location.longitude } }
      }).concat([{ position: this.center }])
    }
  }
}
</script>

<template>
  <main>
    <!-- <google-map :center="center" :markers="markers"></google-map> -->
    <div v-for="busStop in nearbyBusStops" :key="busStop.code">
      <bus-list-item :bus-stop="busStop"></bus-list-item>
    </div>
  </main>
</template>


<style scoped></style>
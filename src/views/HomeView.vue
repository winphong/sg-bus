<script lang="ts">
import BusListItem from '@/components/BusListItem.vue'
import type { IBusStop, ILocation } from '@/model'

export default {
  components: { BusListItem },
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

    <!-- <GMapMap :center="center" :zoom="15" style="width: 90vw; height: 60vh" :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        clickableIcons: false,
      }">
      <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" />
    </GMapMap> -->
    <div v-for="busStop in nearbyBusStops" :key="busStop.code">
      <bus-list-item :bus-stop="busStop"></bus-list-item>
    </div>
  </main>
</template>


<style scoped></style>
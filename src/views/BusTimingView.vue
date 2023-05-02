
<script lang="ts">
import type { IBusArrival } from '@/model';
import BusArrival from '@/components/BusArrival.vue';

export default {
    components: { BusArrival },
    data() {
        return { arrivals: [] as IBusArrival[] }
    },
    async mounted() {
        const data = (await this.$axios.get(`/timing/${this.$route.params.busStopId}`)).data
        this.arrivals = data.Services
    },
    computed: {
        busStop() {
            return this.$store.getters.getSelectedBusStop(this.$route.params.busStopId as string)
        }
    }

}
</script>

<template>
    <div>
        <div>{{ busStop.Description }} ({{ busStop.BusStopCode }})</div>
    </div>
    <div v-for="arrival in arrivals" :key="arrival.service_num">
        <bus-arrival :bus-arrival="arrival"></bus-arrival>
    </div>
</template>
  
<style scoped></style>
  
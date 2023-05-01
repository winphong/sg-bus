
<script lang="ts">
import type { IBusArrival } from '@/model';

export default {
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
    <span v-if="!!busStop">{{ busStop.Description }} ({{ busStop.BusStopCode }})</span>

    <div v-for="arrival in arrivals" :key="arrival.service_num">
        <span>{{ arrival.service_num }} - {{ arrival.operator }} - </span>
        <span>{{ Math.ceil(arrival.next.duration_ms / 1000 / 60) }}, </span>
        <span>{{ Math.ceil(arrival.next2.duration_ms / 1000 / 60) }}, </span>
        <span>{{ Math.ceil(arrival.next3.duration_ms / 1000 / 60) }} </span>

    </div>
</template>
  
<style scoped></style>
  
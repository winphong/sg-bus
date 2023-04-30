
<script lang="ts">
import type { IBusArrival, IBusStop } from '@/model';

export default {
    props: {
        busStop: { type: Object as () => IBusStop, required: true },
    },
    data() {
        return { arrivals: [] as IBusArrival[] }
    },
    async mounted() {
        const data = (await this.$axios.get(`/timing/${this.$route.params.busStopId}`)).data
        this.arrivals = data.Services
    },
}
</script>

<template>
    <div v-for="arrival in arrivals" :key="arrival.service_num">
        <span>{{ arrival.service_num }} - {{ arrival.operator }}</span>
    </div>
</template>
  
<style scoped></style>
  
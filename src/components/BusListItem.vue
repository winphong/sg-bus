

<script lang="ts">
import type { IBusStopDistance } from '@/model';
import BaseCard from './BaseCard.vue';

export default {
    components: {
        BaseCard
    },
    props: {
        busStop: { type: Object as () => IBusStopDistance, required: true }
    },
}
</script>

<template>
    <router-link :to="{ name: 'timing', params: { busStopId: busStop.BusStopCode } }">
        <base-card>
            <div class="container">
                <span>{{ busStop.Description }}</span>
                <div :class="['center-row-flex', 'between']">
                    <span>{{ busStop.BusStopCode }}, {{ busStop.RoadName }}</span>
                    <span v-if="busStop.distance">~{{ busStop.distance.toFixed(2) }}km</span>
                </div>
            </div>
        </base-card>
    </router-link>
</template>

<style scoped>
.container {
    padding: 12px;
    margin: 12px 0;
}
</style>



<script lang="ts">
import type { IBusArrival } from '@/model';
import BusTiming from './BusTiming.vue';
import BaseCard from './BaseCard.vue';

export default {
    components: { BusTiming, BaseCard },
    props: {
        busArrival: { type: Object as () => IBusArrival, required: true }
    },
}
</script>

<template>
    <base-card class="arrival-bus-card">
        <div class="center-row-flex">
            <div class="flex-1">
                <span>{{ busArrival.service_num }} - {{ busArrival.operator }} - </span>
            </div>
            <div class="flex-2">
                <div class="timing-grid">
                    <bus-timing :arrival="busArrival.next"></bus-timing>
                    <bus-timing :arrival="busArrival.next2"></bus-timing>
                    <bus-timing :arrival="busArrival.next3"></bus-timing>
                </div>
            </div>
        </div>
    </base-card>
</template>

<style scoped>
.flex-1 {
    flex: 1;
    padding: 1.2rem
}

.flex-2 {
    flex: 2;
    padding: 0.3rem
}

.timing-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

.arrival-bus-card {
    margin: 10px 0;
}
</style>
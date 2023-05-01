


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
                <v-timeline side="end" truncate-line="both">
                    <v-timeline-item size="x-small" hide-opposite>
                        <span>{{ busArrival.next.sad.DestinationCode }}</span>
                    </v-timeline-item>
                    <v-timeline-item size="x-small" hide-opposite>
                        <span>{{ busArrival.next.sad.OriginCode }}</span>
                    </v-timeline-item>
                </v-timeline>
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

.v-timeline--vertical.v-timeline {
    grid-row-gap: 6px;
    grid-column-gap: 0px;
    grid-template-columns: 0 min-content auto;
    padding-inline-start: 0px;

}


div.v-timeline--vertical.v-timeline--truncate-line-start .v-timeline-item:first-child .v-timeline-item__body {
    padding-inline-start: 0px;
    color: red
}

.v-timeline--vertical.v-timeline.v-timeline--side-end .v-timeline-item .v-timeline-item__opposite {
    padding-inline-start: 0px;
}
</style>




<!-- .xx:first-child {
    /* color: pink;
    padding-inline-start: 2px !important;
    writing-mode: horizontal-tb;
    direction: rtl; */
}
 -->

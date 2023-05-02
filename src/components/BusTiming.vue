<script setup lang="ts">
import { mdiWheelchair, mdiBus, mdiBusDoubleDecker } from '@mdi/js';
</script>

<script lang="ts">
import type { IBusNextArrival } from '@/model';
import BaseCard from './BaseCard.vue';

export default {
    components: {
        BaseCard
    },
    props: {
        arrival: { type: Object as () => IBusNextArrival, required: true }
    },
    computed: {
        arrivalTime() {
            return (time: number) => {
                const minutes = Math.floor(time / 1000 / 60)
                if (minutes <= 1) {
                    return 'Arr'
                }
                return minutes
            }
        },

        crowd() {
            return (load: string) => {
                switch (load) {
                    case 'SEA':
                        return 'orange'
                    case 'LSD':
                        return 'red'
                    default:
                        return 'green'
                }

            }
        }
    }
}
</script>

<template>
    <base-card class="card-in" v-if="!!arrival.time">
        <div :class="['center-row-flex', 'full-width']">
            <div :class="['center-column-flex', 'full-width']">
                <span class="arrival-time-text">{{ arrivalTime(arrival.duration_ms) }}</span>
                <span class="min-text" v-if="arrivalTime(arrival.duration_ms) !== 'Arr'">min</span>
            </div>

            <div :class="['center-column-flex']">
                <v-icon color="grey" size="18" v-if="arrival.type === 'DD'" :icon="mdiBusDoubleDecker"></v-icon>
                <v-icon color="grey" size="18" v-else :icon="mdiBus"></v-icon>
                <div class="bar" :style="{ 'background-color': crowd(arrival.load) }"></div>
                <v-icon color="grey" size="12" v-if="arrival.feature === 'WAB'" :icon="mdiWheelchair"></v-icon>
            </div>
        </div>
    </base-card>
</template>

<style scoped>
.card-in {
    min-width: 50px;
    padding: 12% 6%;
    margin: 10%;
    background-color: beige
}

.arrival-time-text {
    text-align: center;
    font-size: 12px;
    line-height: 14px;
    width: 100%;
}

.min-text {
    font-size: 8px;
    line-height: 8px;
}



.bar {
    margin-top: 2px;
    margin-bottom: 4px;
    height: 2px;
    width: 100%;
}
</style>
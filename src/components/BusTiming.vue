<script setup lang="ts">
import { mdiWheelchair, mdiBus, mdiBusDoubleDecker } from '@mdi/js'
</script>

<script lang="ts">
import type { IBusNextArrival } from '@/model'
import BaseCard from './BaseCard.vue'

export default {
  components: {
    BaseCard,
  },
  props: {
    arrival: { type: Object as () => IBusNextArrival | null, required: true },
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
    },
  },
}
</script>

<template>
  <base-card :class="['card-in']" v-if="!!arrival?.time">
    <div :class="['center-row-flex', 'full-width', 'justify']">
      <div :class="['center-column-flex']">
        <span class="arrival-time-text">{{ arrivalTime(arrival.duration_ms) }}</span>
        <span class="min-text" v-if="arrivalTime(arrival.duration_ms) !== 'Arr'">min</span>
      </div>
      <div :style="{ margin: '4px' }"></div>
      <div :class="['center-column-flex']">
        <v-icon
          color="grey"
          size="20"
          v-if="arrival.type === 'DD'"
          :icon="mdiBusDoubleDecker"
        ></v-icon>
        <v-icon color="grey" size="20" v-else :icon="mdiBus"></v-icon>
        <div class="bar" :style="{ 'background-color': crowd(arrival.load) }"></div>
        <v-icon
          color="grey"
          size="16"
          v-if="arrival.feature === 'WAB'"
          :icon="mdiWheelchair"
        ></v-icon>
      </div>
    </div>
  </base-card>
</template>

<style scoped>
.card-in {
  min-width: 50px;
  padding: 1.2rem 0;
}

.arrival-time-text {
  text-align: center;
  font-size: 0.9rem;
  line-height: 14px;
  width: 100%;
}

.min-text {
  font-size: 8px;
  line-height: 8px;
}

.bar {
  margin: 4px 0px;
  height: 2px;
  width: 100%;
}
</style>

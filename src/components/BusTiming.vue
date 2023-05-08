<script setup lang="ts">
import { mdiWheelchair, mdiBus, mdiBusDoubleDecker, mdiBusMultiple } from '@mdi/js'
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
    showMinText() {
      return (duration_ms: number) => {
        return this.arrivalTime(duration_ms) !== 'Arr'
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
    <div :class="['center-column-flex', 'full-width', 'justify']">
      <div class="bar" :style="{ 'background-color': crowd(arrival.load) }"></div>
      <div :class="['center-column-flex', 'full-width', 'timing-box']">
        <span class="arrival-time-text">{{ arrivalTime(arrival.duration_ms) }}</span>
        <span class="min-text" v-if="showMinText(arrival.duration_ms)">min</span>
      </div>
      <div :class="['center-row-flex']">
        <v-icon
          color="grey"
          size="20"
          v-if="arrival.type === 'DD'"
          :icon="mdiBusDoubleDecker"
        ></v-icon>
        <v-icon
          color="grey"
          size="20"
          v-else-if="arrival.type === 'BD'"
          :icon="mdiBusMultiple"
        ></v-icon>
        <v-icon color="grey" size="20" v-else :icon="mdiBus"></v-icon>
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
  padding: 8px;
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

.timing-box {
  height: 34px;
}

.bar {
  height: 2px;
  width: 80%;
}
</style>

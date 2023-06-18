<script lang="ts">
import type { IBusArrival } from '@/model'
import BusTiming from './BusTiming.vue'
import BaseCard from './BaseCard.vue'

export default {
  components: { BusTiming, BaseCard },
  props: {
    busArrival: { type: Object as () => IBusArrival, required: true },
    isEmpty: { type: Boolean, required: true },
  },
  computed: {
    origin() {
      return this.$store.getters.getSelectedBusStop(this.busArrival.OriginCode).Description
    },
    destination() {
      return this.$store.getters.getSelectedBusStop(this.busArrival.DestinationCode).Description
    },
  },
}
</script>

<template>
  <router-link :to="{ name: 'route', params: { busId: busArrival.service_num } }">
    <base-card class="arrival-bus-card">
      <div :class="['center-row-flex', 'min-height']">
        <div class="flex-1">
          <span>{{ busArrival.service_num }} ({{ busArrival.operator }}) </span>
          <!-- Refactor to reusable component -->
          <v-timeline side="end" truncate-line="both" class="ma-0 pa-0" density="compact">
            <v-timeline-item size="x-small" hide-opposite density="compact" dot-color="green">
              <span class="location">{{ origin }}</span>
            </v-timeline-item>
            <v-timeline-item size="x-small" hide-opposite density="compact" dot-color="red">
              <span class="location">{{ destination }}</span>
            </v-timeline-item>
          </v-timeline>
        </div>
        <div :class="['flex-2', 'text-center']">
          <div class="timing-grid" v-if="!isEmpty">
            <bus-timing v-if="busArrival.next" :arrival="busArrival.next"></bus-timing>
            <bus-timing v-if="busArrival.next2" :arrival="busArrival.next2"></bus-timing>
            <bus-timing v-if="busArrival.next3" :arrival="busArrival.next3"></bus-timing>
          </div>
          <span v-if="isEmpty">Bus not in service</span>
        </div>
      </div>
    </base-card>
  </router-link>
</template>

<style scoped>
.flex-1 {
  padding-right: 8px;
  flex: 1.5;
}

.min-height {
  min-height: 10vh;
}

.flex-2 {
  flex: 2;
}

.timing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 4px;
}

.arrival-bus-card {
  margin: 10px 0;
  padding: 0.8rem 0.6rem;
}

.location {
  font-size: 10px;
}

.text-center {
  text-align: center;
}

.v-timeline--vertical.v-timeline {
  grid-row-gap: 6px;
  grid-column-gap: 0px;
  grid-template-columns: 0 min-content auto;
}

.v-timeline > :first-child > :first-child,
.v-timeline > :nth-child(2) > :first-child {
  padding-inline-start: 8px !important;
}
</style>

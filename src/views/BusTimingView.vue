<script lang="ts">
import PullRefresh from 'pull-refresh-vue3'

import type { IBusArrival } from '@/model'
import BusArrivalListItem from '@/components/BusArrivalListItem.vue'
import CircularProgress from '@/components/CircularProgress.vue'

export default {
  components: { BusArrivalListItem, PullRefresh, CircularProgress },
  data() {
    return {
      arrivals: [] as IBusArrival[],
      isRefreshing: false,
      isLoading: false,
      scrollPosition: 0,
    }
  },
  async mounted() {
    this.isLoading = true
    const data = (await this.$axios.get(`/?id=${this.$route.params.busStopId}`)).data
    this.arrivals = data.Services

    this.isLoading = false
  },
  computed: {
    busStop() {
      return this.$store.getters.getSelectedBusStop(this.$route.params.busStopId as string)
    },
    refreshDisabled() {
      return this.scrollPosition > 100
    },
  },

  methods: {
    async onRefresh() {
      this.isRefreshing = true

      const data = (await this.$axios.get(`/?id=${this.$route.params.busStopId}`)).data
      this.arrivals = data.Services

      this.isRefreshing = false
    },
    handleScroll(event: Event) {
      const scrollPosition = (event.target as HTMLElement).scrollTop
      if (scrollPosition > 150) {
        return
      }
      this.scrollPosition = (event.target as HTMLElement).scrollTop
    },
  },
}
</script>

<template>
  <div>
    <pull-refresh
      class="pull-container"
      v-model="isRefreshing"
      @refresh="onRefresh"
      pulling-text="Pull down to refresh"
      loading-text="Loading..."
      loosing-text="Release to refresh"
      success-text=""
      pull-distance="40"
      @scroll="handleScroll"
      :disabled="refreshDisabled"
    >
      <div class="page-container">
        <div class="center-column-flex">
          <span class="title">{{ busStop.Description }} ({{ busStop.BusStopCode }})</span>
          <span class="subtitle">{{ busStop.RoadName }}</span>
          <circular-progress v-if="isLoading"></circular-progress>
        </div>
        <div v-for="arrival in arrivals" :key="arrival.service_num">
          <bus-arrival-list-item :bus-arrival="arrival"></bus-arrival-list-item>
        </div>
      </div>
    </pull-refresh>
  </div>
</template>

<style scoped>
.pull-container {
  height: 80vh;
  overflow-y: scroll;
}

.page-container {
  padding: 1vh 2vw;
}

.title {
  font-size: 1.3rem;
  text-align: center;
  line-height: 1.3rem;
}

.subtitle {
  font-style: italic;
  font-size: 0.7rem;
  text-align: center;
  line-height: 1rem;
}
</style>

<script lang="ts">
import _ from 'lodash'
import PullRefresh from 'pull-refresh-vue3'

import type { IBusArrival, IBusNextArrival, RawBusRoute, RawBusService } from '@/model'
import BusArrivalListItem from '@/components/BusArrivalListItem.vue'
import CircularProgress from '@/components/CircularProgress.vue'
import RawBusRoutesBusStopCode from '@/data/bus-routes-by-bus-stop-code.json'
import RawBusServices from '@/data/bus-services.json'

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
    this.arrivals = this.staticBusServices

    this.isLoading = true
    const data = (await this.$axios.get(`/?id=${this.$route.params.busStopId}`)).data
    const busArrivalData = _.keyBy(data.Services, 'service_num')

    this.arrivals = this.staticBusServices.map((arrival) => {
      const nextBusArrival = busArrivalData[arrival.service_num]
      if (!nextBusArrival) {
        return arrival
      }
      return {
        ...arrival,
        next: nextBusArrival.next,
        next2: nextBusArrival.next2,
        next3: nextBusArrival.next3,
      }
    })
    this.isLoading = false
  },
  computed: {
    busStop() {
      return this.$store.getters.getSelectedBusStop(this.$route.params.busStopId as string)
    },
    refreshDisabled() {
      return this.scrollPosition > 100
    },
    staticBusServices() {
      return _.orderBy(
        _.uniqWith(
          _.compact(
            (RawBusRoutesBusStopCode as Record<string, RawBusRoute[]>)[
              this.$route.params.busStopId as string
            ].map((bus) => {
              const busService = (RawBusServices as Record<string, RawBusService>)[bus.ServiceNo]

              if (!busService.OriginCode || !busService.DestinationCode) {
                return null
              }

              return {
                service_num: bus.ServiceNo,
                operator: bus.Operator,
                next: null,
                next2: null,
                next3: null,
                OriginCode: busService.OriginCode,
                DestinationCode: busService.DestinationCode,
              }
            }),
          ),
          (dis, dat) => dis.service_num === dat.service_num && dis.OriginCode === dat.OriginCode,
        ),
        (nextArrival) => {
          const match = nextArrival.service_num.match(/^(\d+)([a-zA-Z]*)$/)
          if (!match) {
            return nextArrival
          }
          const number = parseInt(match[1])
          return isNaN(number) ? nextArrival.service_num : number
        },
      )
    },
  },
  methods: {
    async onRefresh() {
      this.isRefreshing = true

      const data = (await this.$axios.get(`/?id=${this.$route.params.busStopId}`)).data
      const busArrivalData = _.keyBy(data.Services, 'service_num')

      this.arrivals = this.staticBusServices.map((arrival) => {
        const nextBusArrival = busArrivalData[arrival.service_num]
        if (!nextBusArrival) {
          return arrival
        }
        return {
          ...arrival,
          next: nextBusArrival.next,
          next2: nextBusArrival.next2,
          next3: nextBusArrival.next3,
        }
      })

      this.isRefreshing = false
    },
    handleScroll(event: Event) {
      const scrollPosition = (event.target as HTMLElement).scrollTop
      if (scrollPosition > 150) {
        return
      }
      this.scrollPosition = (event.target as HTMLElement).scrollTop
    },
    isEmpty(next: IBusNextArrival | null) {
      return !this.isLoading && !next
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
          <bus-arrival-list-item
            :bus-arrival="arrival"
            :is-empty="isEmpty(arrival.next)"
          ></bus-arrival-list-item>
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

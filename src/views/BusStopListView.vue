<script lang="ts">
import FuseSearch from '@/lib/FuseSearch'
import _ from 'lodash'
import BusListItem from '@/components/BusListItem.vue'
import GeoDistanceCalculator from '@/lib/GeoDistanceCalculator'
import SearchBar from '@/components/SearchBar.vue'
import CircularProgress from '@/components/CircularProgress.vue'
import RawBusStops from '@/data/bus-stops.json'

const MAX_NUM_OF_RESULT = 30

export default {
  components: { BusListItem, SearchBar, CircularProgress },
  setup() {
    const fuse = new FuseSearch()
    const calculator = new GeoDistanceCalculator()

    return {
      fuse,
      calculator,
    }
  },
  data() {
    return {
      searchString: '',
      hasNearbyBusStops: true,
    }
  },
  methods: {
    updateSearchString(value: string) {
      this.searchString = value
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.getIsRetrievingPosition
    },
    fallbackBusStops() {
      return _.map(RawBusStops.slice(0, MAX_NUM_OF_RESULT), (item) => ({
        ...item,
        distance: 0,
      }))
    },

    searchResults() {
      if (!this.searchString.trim()) {
        const nearbyBusStops = this.$store.getters.getNearbyBusStops.slice(0, MAX_NUM_OF_RESULT)
        // No nearby bus stops
        if (nearbyBusStops.length === 0) {
          return this.fallbackBusStops
        }
        return nearbyBusStops
      }

      const position = this.$store.getters.getCurrentPosition
      const invalidPosition = !position.lat || !position.lng

      const searchResult = this.fuse.search(this.searchString).slice(0, MAX_NUM_OF_RESULT)
      return _.map(searchResult, ({ item }) => ({
        ...item,
        distance: invalidPosition
          ? 0
          : this.calculator.getDistance({
              srcLat: position.lat!,
              srcLng: position.lng!,
              destLat: item.Latitude,
              destLng: item.Longitude,
            }),
      }))
    },
    relevantBusStops() {
      const position = this.$store.getters.getCurrentPosition
      const invalidPosition = !position.lat || !position.lng

      // Fallback list if position permission not granted
      if (invalidPosition && !this.searchString.trim()) {
        return this.fallbackBusStops
      }

      return this.searchResults
    },
  },
}
</script>

<template>
  <div>
    <search-bar
      class="search-input"
      :search-string="searchString"
      placeholder="Type to search bus stops..."
      v-on:update:value="updateSearchString"
    >
    </search-bar>
    <div class="center-column-flex">
      <circular-progress v-if="isLoading">
        <span v-if="isLoading">Retrieving your location to show you nearby bus stops...</span>
      </circular-progress>
    </div>
    <div class="overflow-y">
      <div v-for="busStop in relevantBusStops" :key="busStop.BusStopCode" class="bus-li-container">
        <bus-list-item :bus-stop="busStop"></bus-list-item>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-input {
  border: 1px solid rgb(128, 128, 128, 0.6);
  border-radius: 4px;
  width: 100%;
  padding: 2vh;
  margin-bottom: 1vh;
}

.bus-li-container {
  padding: 0 4px;
}

.search-input:hover {
  background-color: rgb(128, 128, 128, 0.1);
}

.overflow-y {
  height: 70vh;
  overflow-y: scroll;
}
</style>

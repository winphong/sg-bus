<script lang="ts">
import FuseSearch from '@/lib/FuseSearch'
import _ from 'lodash'
import BusListItem from '@/components/BusListItem.vue'
import GeoDistanceCalculator from '@/lib/GeoDistanceCalculator'
import SearchBar from '@/components/SearchBar.vue'

const MAX_NUM_OF_RESULT = 30

export default {
  components: { BusListItem, SearchBar },
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
    }
  },
  methods: {
    updateSearchString(value: string) {
      this.searchString = value
    },
  },
  computed: {
    searchResults() {
      const position = this.$store.getters.getCurrentPosition

      if (!this.searchString.trim()) {
        const nearbyBusStops = this.$store.getters.getNearbyBusStops.slice(0, MAX_NUM_OF_RESULT)
        return nearbyBusStops
      }

      const searchResult = this.fuse.search(this.searchString).slice(0, MAX_NUM_OF_RESULT)
      return _.map(searchResult, ({ item }) => ({
        ...item,
        distance: this.calculator.getDistance({
          srcLat: position.lat!,
          srcLng: position.lng!,
          destLat: item.Latitude,
          destLng: item.Longitude,
        }),
      }))
    },
  },
}
</script>

<template>
  <div>
    <search-bar
      class="search-input"
      :search-string="searchString"
      v-on:update:value="updateSearchString"
    >
    </search-bar>
    <div class="overflow-y">
      <div v-for="busStop in searchResults" :key="busStop.BusStopCode">
        <bus-list-item :bus-stop="busStop"></bus-list-item>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-input {
  border: 1px solid black;
  border-radius: 2px;
  width: 100%;
  padding: 2vh;
}

.search-input:hover {
  background-color: rgb(128, 128, 128, 0.1);
}

.overflow-y {
  height: 70vh;
  overflow-y: scroll;
}
</style>

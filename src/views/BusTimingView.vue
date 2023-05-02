
<script lang="ts">
import type { IBusArrival } from '@/model';
import BusArrivalListItem from '@/components/BusArrivalListItem.vue';
import PullRefresh from 'pull-refresh-vue3'


export default {
    components: { BusArrivalListItem, PullRefresh },
    data() {
        return { arrivals: [] as IBusArrival[], isLoading: false }
    },
    async mounted() {
        const data = (await this.$axios.get(`/timing/${this.$route.params.busStopId}`)).data
        this.arrivals = data.Services
    },
    computed: {
        busStop() {
            return this.$store.getters.getSelectedBusStop(this.$route.params.busStopId as string)
        },
        loading() {
            return this.isLoading
        }
    },
    methods: {
        async onRefresh() {
            this.isLoading = true

            const data = (await this.$axios.get(`/timing/${this.$route.params.busStopId}`)).data
            this.arrivals = data.Services

            this.isLoading = false
        }
    }

}
</script>

<template>
    <pull-refresh class="pull-container " v-model="loading" @refresh="onRefresh" pulling-text="Pull down to refresh"
        loading-text="Loading..." loosing-text="Release to refresh" success-text="" pull-distance="40">
        <div class="page-container">
            <div class="center-column-flex">
                <span class="title">{{ busStop.Description }} ({{ busStop.BusStopCode }})</span>
                <span class="subtitle">{{ busStop.RoadName }}</span>
            </div>
            <div v-for="arrival in arrivals" :key="arrival.service_num">
                <bus-arrival-list-item :bus-arrival="arrival"></bus-arrival-list-item>
            </div>
        </div>
    </pull-refresh>
</template>
  
<style scoped>
.pull-container {
    height: 90vh;
}

.page-container {
    padding: 0 2vw;
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
  
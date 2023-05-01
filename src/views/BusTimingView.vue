
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
        <div>
            <div>{{ busStop.Description }} ({{ busStop.BusStopCode }})</div>
        </div>
        <div v-for="arrival in arrivals" :key="arrival.service_num">
            <bus-arrival-list-item :bus-arrival="arrival"></bus-arrival-list-item>
        </div>
    </pull-refresh>
</template>
  
<style scoped>
.pull-container {
    height: 90vh;
}
</style>
  
<script lang="ts">
interface GMapPosition {
    lat: number,
    lng: number
}

interface GMapMarker {
    position: GMapPosition
}

export default {
    props: {
        center: { type: Object as () => GMapPosition, required: true },
        markers: {
            type: Array as () => GMapMarker[],
            required: true
        }
    },
    methods: {
        handleMarker(e: any) {
            this.$store.commit('setCurrentPosition', { position: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
        }
    }
}
</script>

<template>
    <GMapMap :center="center" :zoom="15" style="width: 90vw; height: 40vh" :options="{
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            clickableIcons: false
        }">
        <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" @click="handleMarker" />
    </GMapMap>
</template>


<style scoped></style>
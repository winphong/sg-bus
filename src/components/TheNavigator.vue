<script setup lang="ts">
import { mdiMenu, mdiBusStop, mdiRefresh } from '@mdi/js'
</script>

<script lang="ts">
export default {
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    showRefresh() {
      return this.$route.path === '/'
    },
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    refreshCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          const position = { lat: e.coords.latitude, lng: e.coords.longitude }
          this.$store.commit('setCurrentPosition', { position })
          this.$store.commit('setIsLoadingPosition', false)
        },
        (e) => {
          this.$store.commit('setIsLoadingPosition', false)
          console.log('failure', e)
        },
        { maximumAge: 10000, enableHighAccuracy: false },
      )
    },
  },
}
</script>

<template>
  <v-layout>
    <v-navigation-drawer
      :model-value="drawer"
      @click="toggleDrawer"
      location="bottom"
      class="pastel"
      disable-resize-watcher
      disable-route-watcher
      color="#f6fefd"
    >
      <v-list-item :prepend-icon="mdiBusStop" value="idk" title="Bus Stops" link :to="'/'">
      </v-list-item>
      <!-- <v-list-item :prepend-icon="mdiRoad" title="Bus Routes" link :to="'/about'"> </v-list-item> -->
    </v-navigation-drawer>
  </v-layout>

  <div class="sticky">
    <v-btn v-if="showRefresh" size="big" @click="refreshCurrentLocation" rounded class="button">
      <v-icon color="red" size="25" :icon="mdiRefresh"></v-icon>
    </v-btn>
    <div :style="{ margin: '2px' }"></div>
    <v-btn size="big" @click.stop="drawer = !drawer" rounded class="button">
      <v-icon color="red" size="25" :icon="mdiMenu"></v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
.button {
  height: 6vh !important;
  width: 6vh;
  border-radius: 50%;
  background-color: var(--color-pastel);
}

.sticky {
  right: 20px;
  bottom: 20px;
  z-index: 200;
  display: flex;
  position: fixed;
  flex-direction: column;
}
</style>

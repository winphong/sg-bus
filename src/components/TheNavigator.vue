<script setup lang="ts">
import { mdiMenu, mdiRoad, mdiBusStop } from '@mdi/js'
</script>

<script lang="ts">
export default {
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
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
      <v-list-item :prepend-icon="mdiRoad" title="Bus Routes" link :to="'/about'"> </v-list-item>
    </v-navigation-drawer>
  </v-layout>

  <div :style="{ position: 'fixed', zIndex: 200, bottom: '20px', right: '20px' }">
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
</style>

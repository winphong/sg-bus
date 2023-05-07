<script setup lang="ts">
import { mdiMenu } from '@mdi/js'
</script>

<script lang="ts">
export default {
  data() {
    return {
      drawer: false,
    }
  },
}
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" floating location="bottom">
      <v-list-item title="Bus Stops" link :to="'/'"> </v-list-item>
      <v-list-item title="Bus Routes" link :to="'/about'"> </v-list-item>
    </v-navigation-drawer>
  </v-layout>

  <div :style="{ position: 'fixed', zIndex: 200, bottom: '20px', right: '20px' }">
    <v-btn
      size="big"
      @click.stop="drawer = !drawer"
      rounded
      :style="{ height: '6vh', width: '6vh', borderRadius: '50%' }"
    >
      <v-icon color="red" size="25" :icon="mdiMenu"></v-icon>
    </v-btn>
  </div>
</template>

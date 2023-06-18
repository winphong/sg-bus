<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js'
</script>

<script lang="ts">
export default {
  computed: {
    showBackButton() {
      if (this.$route.path !== '/') {
        return true
      }
      return false
    },
  },
  methods: {
    handleBack() {
      this.$router.back()
    },
  },
}
</script>

<template>
  <div :class="['container', 'center-row-flex', 'justify']">
    <v-icon
      v-if="showBackButton"
      @click="handleBack"
      :icon="mdiArrowLeft"
      color="black"
      size="25"
      class="icon"
    ></v-icon>
    <div :style="{ flex: 8 }" :class="['center-row-flex', 'justify']">
      <img src="/img/icons/bus.png" />
      <span class="brand">SingBus</span>
    </div>
    <div :style="{ flex: 1 }" v-if="showBackButton"></div>
  </div>
</template>

<style scoped>
.container {
  height: 60px;
  position: fixed;
  z-index: 20;
  width: 100vw;
  background-color: beige;
}

img {
  height: 30px;
  margin-right: 12px;
}

.icon {
  font-weight: 100;
  flex: 1;
}

.brand {
  font-size: large;
  font-weight: 600;
  color: var(--color-text);
}
</style>

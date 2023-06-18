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
    <img src="/img/icons/bus.png" />
    <span class="brand">SingBus</span>
  </div>
</template>

<style scoped>
.container {
  height: 8vh;
  position: fixed;
  z-index: 20;
  width: 100vw;
  background-color: #f6fefd;
}

img {
  height: 30px;
  margin-right: 12px;
}

.icon {
  position: fixed;
  top: 16px;
  left: 16px;
  font-weight: 100;
}

.brand {
  font-size: large;
  font-weight: 600;
  color: var(--color-text);
}
</style>

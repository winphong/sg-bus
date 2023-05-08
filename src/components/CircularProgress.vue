<template>
  <div class="circular-progress-container">
    <div class="flex-container">
      <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.circular-progress-container {
  position: absolute;
  top: 10vh;
}

.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

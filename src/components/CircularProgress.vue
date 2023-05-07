<template>
  <div class="circular-progress-container">
    <v-progress-circular indeterminate color="blue-grey"></v-progress-circular>
    <slot></slot>
  </div>
</template>

<style scoped>
.circular-progress-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 4vh 0;
}
</style>

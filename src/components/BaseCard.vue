


<script lang="ts">

export default {
}
</script>

<template>
    <div class="c-card">
        <slot></slot>
    </div>
</template>

<style scoped>
.c-card {
    border-radius: 4px;
    box-shadow:
        0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        2px 4px 4px 2px rgba(0, 0, 0, 0.14),
        0px 1px 4px 0px rgba(0, 0, 0, 0.12)
}
</style>
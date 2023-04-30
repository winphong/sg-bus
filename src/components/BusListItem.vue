

<script lang="ts">
import type { IBusStop } from '@/model';

export default {
    props: {
        busStop: { type: Object as () => IBusStop, required: true }
    },

}
</script>


<template>
    <div>
        <div>{{ busStop.description }}</div>
        <div class="center-row-flex">
            <div>{{ busStop.code }}</div>
            <div>{{ busStop.roadName }}</div>
        </div>
        <div>{{ busStop.distance }}</div>
    </div>
</template>

<style scoped></style>
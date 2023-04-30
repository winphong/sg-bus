

<script lang="ts">
import type { IBusStop } from '@/model';

export default {
    props: {
        busStop: { type: Object as () => IBusStop, required: true }
    },

}
</script>


<template>
    <div class="container">
        <div>{{ busStop.description }}</div>
        <div :class="{ 'center-row-flex': true, 'space-between': true }">
            <span>{{ busStop.code }}, {{ busStop.roadName }}</span>
            <div>~{{ busStop.distance.toFixed(2) }}km</div>

        </div>
    </div>
</template>

<style scoped>
.container {
    border-radius: 8px;
    padding: 8px;
    background-color: gray;
    margin: 1vh 0;
}

.space-between {
    justify-content: space-between;
}
</style>
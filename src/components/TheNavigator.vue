<script setup lang="ts">
import { mdiMenu } from '@mdi/js';
</script>

<script lang="ts">
export default {
    data() {
        return {
            drawer: false
        }
    },
}
</script>

<template>
    <v-layout>
        <v-navigation-drawer v-model="drawer" floating location="top">
            <v-list-item title="Home" link :to="'/'">
            </v-list-item>
            <v-list-item title="About" link :to="'/about'">
            </v-list-item>
        </v-navigation-drawer>
    </v-layout>

    <div :style="{ position: 'absolute', zIndex: 200, top: '20px', right: '20px' }">
        <v-btn size="big" @click.stop="drawer = !drawer" rounded
            :style="{ height: '70px', width: '70px', borderRadius: '50%' }">
            <v-icon color="pink" size="45" :icon="mdiMenu"></v-icon>
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavigator from '@/components/TheNavigator.vue'
import TheHeader from './components/TheHeader.vue'
</script>

<script lang="ts">
export default {
  components: {
    TheNavigator,
    TheHeader,
  },
  beforeCreate() {
    this.$store.commit('setIsLoadingPosition', true)
    navigator.geolocation.getCurrentPosition(
      (e) => {
        const position = { lat: e.coords.latitude, lng: e.coords.longitude }
        this.$store.commit('setCurrentPosition', { position })
        this.$store.commit('setIsLoadingPosition', false)
      },
      (e) => {
        this.$store.commit('setIsLoadingPosition', false)
        console.log('failure', e)
      },
      { maximumAge: 10000, enableHighAccuracy: false },
    )
  },
}
</script>

<template>
  <the-header></the-header>
  <the-navigator> </the-navigator>
  <main :style="{ padding: '60px 10px 0' }">
    <router-view> </router-view>
  </main>
  <ins class="adsbygoogle"></ins>
</template>

<style scoped>
.adsbygoogle {
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 78vw;
  height: 10vh;

  @media (min-width: 1024px) {
    width: 90vw;
  }
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

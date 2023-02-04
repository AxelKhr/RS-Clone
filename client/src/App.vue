<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="50" height="50" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Forecast</RouterLink>
        <RouterLink to="/map">Map</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink to="/test">Test</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 80px;
}

.wrapper {
  display: flex;
  align-items: center;
}

.logo {
  display: block;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
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
}

</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header>
        <div class="container">
            <img alt="Vue logo" class="logo" src="./assets/weather-logo.png" width="80" height="80" />
            <div class="wrapper">
                <nav>
                    <RouterLink to="/">Forecast</RouterLink>
                    <RouterLink to="/map">Map</RouterLink>
                    <RouterLink to="/settings">Settings</RouterLink>
                    <RouterLink to="/test">Test</RouterLink>
                </nav>
            </div>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>
header {
    padding: 10px 0px;
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 80px;
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
}

.container {
    display: flex;
    align-items: center;
}

.wrapper {
    width: 100%;
}

.logo {
    display: block;
}

nav {
    margin: 0 auto;
    justify-content: space-between;
    display: flex;
    width: 70%;
    font-size: 1.2rem;
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

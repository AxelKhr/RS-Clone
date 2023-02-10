<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
    <div class="block">
        <div class="block__text">Location: {{ $store.state.forecast.current.cityName }}</div>
        <div class="block__text">Temperature: {{ $store.state.forecast.current.temperature }}</div>
        <div class="block__text">Feels Like: {{ $store.state.forecast.current.feelsLikeTemp }}</div>
        <div class="block__text">Wind Speed: {{ $store.state.forecast.current.windSpeed }}</div>
    </div>
</template>

<style lang="scss" scoped>
.block {
    width: 300px;
    background: lightgreen;
    padding: 10px;

    &__text {
        font-size: 1rem;
    }
}
</style>

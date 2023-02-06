<template>
    <div class="city">City: {{ weatherData.city_name }}</div>
    <div class="country_code">Country: {{ weatherData.country_code }}</div>
    <div class="timezone">TimeZone: {{ weatherData.timezone }}</div>
    <div class="clouds">Clouds: {{ weatherData.clouds }}</div>
    <div class="sunrise">Sunrise: {{ weatherData.sunrise }}</div>
    <div class="sunset">Sunset: {{ weatherData.sunset }}</div>
    <div class="weather_desc">Weather: {{ weatherData.weather.description }}</div>
    <div class="temperature">Temperature: {{ weatherData.temp }} °C</div>
    <div class="feelings">Temperature by feelings: {{ weatherData.app_temp }} °C</div>
    <img class="weather_icon" :src="weatherData.weather.icon" />
    <div class="wind_dir">Wind-direction: {{ weatherData.wind_cdir_full }}</div>
    <div class="weather_speed">Wind-speed: {{ weatherData.wind_spd.toFixed(2) }}</div>
</template>

<script lang="ts">
import { getForecastByLocation } from '../../api/forecast/weather';
import type LocationForecastResponse from '../../api/types/response';
export default {
    async setup() {
        const data = await getForecastByLocation({ latitude: 51.5072, longitude: -0.1276 });
        const response = await data.json();
        const weatherData: LocationForecastResponse = response.data[0];
        weatherData.weather.icon = require(`../../assets/icons/${weatherData.weather.icon}.png`);
        return { weatherData };
    },
};
</script>

<style scoped>
div {
    font-size: 2rem;
}
</style>

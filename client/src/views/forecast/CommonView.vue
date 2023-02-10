<template>
    <div class="weather-actions">
        <div class="locations">
            <img class="locations__img" src="../../assets/images/location.svg" alt="locations" />
            <div class="locations__text">{{ weatherData.city_name }}</div>
        </div>
        <img class="refresh" src="../../assets/images/refresh.svg" alt="refresh" />
    </div>

    <div class="weather">
        <div class="weather__text">
            <!-- обновлять раз в минутут -->
            <div class="timezone">Time: {{ weatherData.ob_time.slice(-5) }}</div>
            <div class="temperature">{{ Math.round(weatherData.temp) }}°C</div>
            <div class="feelings">Feelings like {{ Math.round(weatherData.temp) }}°C</div>
            <div class="weather_desc">{{ weatherData.weather.description }}</div>
        </div>
        <img class="weather_img" :src="weatherData.weather.icon" />
    </div>

    <div class="details">
        <div class="block__title">Today</div>
        <transition name="mode-fade" mode="out-in">
            <div class="details__container" v-if="down">
                <div v-for="detail in details" :key="detail.id">
                    <div class="details__subtitle">{{ detail.subtitle }}</div>
                    <div class="details__value">{{ detail.value }}</div>
                </div>
            </div>
            <div class="details__container" v-else>
                <div v-for="detail in details.slice(0, -3)" :key="detail.id">
                    <div class="details__subtitle">{{ detail.subtitle }}</div>
                    <div class="details__value">{{ detail.value }}</div>
                </div>
            </div>
        </transition>
        <div class="details__size">
            <transition name="mode-fade" mode="out-in">
                <button class="details__btn" v-if="down" key="down" @click="down = false">
                    <img src="../../assets/images/chevron-up.svg" alt="arrow" />
                </button>
                <button class="details__btn" v-else key="up" @click="down = true">
                    <img src="../../assets/images/chevron-down.svg" alt="arrow" />
                </button>
            </transition>
        </div>
    </div>
    <daily-view />
</template>

<!--         
    TODAY    
    pres: Pressure (mb).
        pod: Part of the day (d = day / n = night).
        vis: Visibility (default KM).
        precip: Liquid equivalent precipitation rate (default mm/hr).
        snow: Snowfall (default mm/hr).
        uv: UV Index (0-11+).
        aqi: Air Quality Index [US - EPA standard 0 - +500] 
    -->
<script lang="ts">
import DailyView from './DailyView.vue';

import { getForecastByLocation } from '../../api/forecast/weather';
import type LocationForecastResponse from '../../api/types/response';
export default {
    components: {
        DailyView,
    },
    data() {
        return {
            down: false,
        };
    },

    async setup() {
        const data = await getForecastByLocation({ latitude: 51.5072, longitude: -0.1276 });
        const response = await data.json();
        console.log('response :>> ', response);
        const weatherData: LocationForecastResponse = response.data[0];
        weatherData.weather.icon = require(`../../assets/icons/${weatherData.weather.icon}.png`);
        let details = [
            { id: 0, subtitle: 'Temp', value: '?? Value' },
            { id: 1, subtitle: 'Humidity', value: `${weatherData.rh} %` },
            { id: 2, subtitle: 'Precipitation', value: '?? % chance' },
            { id: 3, subtitle: 'Sunrise', value: `${weatherData.sunrise}` },
            { id: 4, subtitle: 'Sunset', value: `${weatherData.sunset}` },
            { id: 5, subtitle: 'Wind', value: `${weatherData.wind_spd.toFixed(2)} m/s ${weatherData.wind_cdir}` },
            { id: 6, subtitle: 'Pressure', value: `${Math.round(weatherData.pres / 1.333)} mmHg` },
            { id: 7, subtitle: 'Clouds Cov.', value: `${weatherData.clouds} %` },
            { id: 8, subtitle: 'Visibility', value: `${weatherData.vis} km` },
        ];
        return { weatherData, details };
    },
    methods: {},
};
</script>

<style scoped>
.weather-actions {
    display: flex;
    justify-content: space-between;
}
.locations {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}
.locations__img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
}
.locations__text {
    font-size: 1.5rem;
}
.refresh {
    width: 25px;
    height: 25px;
}
.weather {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}
.temperature {
    font-size: 3rem;
}
.feelings {
    font-size: 0.8rem;
}
.weather_desc {
    font-size: 0.8rem;
}
.weather_img {
    width: 150px;
    height: 150px;
}

.block__title {
    font-size: 1.5rem;
}
.details__container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}
.details__subtitle {
    font-size: 0.8rem;
    text-align: center;
}
.details__value {
    font-size: 1rem;
    text-align: center;
}

.details__size {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.mode-fade-enter-active,
.no-mode-fade-leave-active {
    transition: opacity 0.2s;
}

.mode-fade-enter-from,
.no-mode-fade-leave-to {
    opacity: 0;
}
</style>

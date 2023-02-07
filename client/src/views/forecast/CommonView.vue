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
        <div v-for="detail in details" :key="detail.id" class="details__container">
            <div>
                <div :key="detail.subtitle" class="details__subtitle">{{ detail.subtitle }}</div>
                <div :key="detail.value" class="details__value">{{ detail.value }}</div>
            </div>
            <!-- <div>
                <div class="details__subtitle">Humidity</div>
                <div class="details__value">{{ weatherData.rh }} %</div>
            </div>
            <div>
                <div class="details__subtitle">Precipitation</div>
                <div class="details__value">?? % chance</div>
            </div>
            <div>
                <div class="details__subtitle">Sunrise</div>
                <div class="details__value">{{ weatherData.sunrise }}</div>
            </div>
            <div>
                <div class="details__subtitle">Sunset</div>
                <div class="details__value">{{ weatherData.sunset }}</div>
            </div>
            <div>
                <div class="details__subtitle">Wind</div>
                <div class="details__value">{{ weatherData.wind_spd.toFixed(2) }}m/s {{ weatherData.wind_cdir }}</div>
            </div>
            <div>
                <div class="details__subtitle">Pressure</div>
                <div class="details__value">{{ Math.round(weatherData.pres / 1.333) }} mmHg</div>
            </div>
            <div>
                <div class="details__subtitle">Clouds Cov.</div>
                <div class="details__value">{{ weatherData.clouds }}%</div>
            </div>
            <div>
                <div class="details__subtitle">Visibility</div>
                <div class="details__value">{{ weatherData.vis }} km</div>
            </div> -->
        </div>
        <daily-view />
    </div>
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

    async setup() {
        const data = await getForecastByLocation({ latitude: 51.5072, longitude: -0.1276 });
        const response = await data.json();
        console.log('response :>> ', response);
        const weatherData: LocationForecastResponse = response.data[0];
        weatherData.weather.icon = require(`../../assets/icons/${weatherData.weather.icon}.png`);
        return { weatherData };
    },
    data() {
        let weatherData: LocationForecastResponse;
        return {
            details: [
                { id: 1, subtitle: 'Temp', value: '?? Value' },
                { id: 2, subtitle: 'Humidity', value: '27%' },
                { id: 3, subtitle: 'Precipitation', value: '?? % chance' },
                /* { id: 2, subtitle: 'Humidity', value: `${{ weatherData.rh }} %` }, */
            ],
        };
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
</style>

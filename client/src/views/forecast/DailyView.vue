<template>
    <div class="block__title">Daily</div>
    <div class="days">
        <div class="day">
            <!-- v-for="day in days" :key="day.id" -->
            <div class="day-short" @click="show = !show">
                <img class="day__img" src="../../assets/icons/a02d.png" alt="" />
                <div class="day-text">
                    <div class="day__subtitle valid_date">Friday</div>
                    <div class="day__description data.weather.description">Snow</div>
                </div>
                <div class="day__pop data.pop">100%</div>
                <div class="day__max-temp data.max_temp">-7</div>
                <div class="day__min-temp data.min_temp">-4</div>
            </div>
            <div class="day-short" @click="show = !show">
                <img class="day__img" src="../../assets/icons/a02d.png" alt="" />
                <div class="day-text">
                    <div class="day__subtitle valid_date">Monday</div>
                    <div class="day__description data.weather.description">Snow</div>
                </div>
                <div class="day__pop data.pop">100%</div>
                <div class="day__max-temp data.max_temp">-7</div>
                <div class="day__min-temp data.min_temp">-4</div>
            </div>

            <transition name="mode-fade" mode="out-in">
                <div class="details__container" v-if="show">
                    <div v-for="detail in details" :key="detail.id">
                        <div>
                            <div class="details__subtitle">{{ detail.subtitle }}</div>
                            <div class="details__value">{{ detail.value }}</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { getForecastDaily } from '@/api/forecast/weather';
import { LocationForecastResponse } from '@/api/types/response';
export default {
    components: {},
    data() {
        return {
            show: false,
        };
    },
    methods: {},

    async setup() {
        const data = await getForecastDaily({ latitude: 51.5072, longitude: -0.1276 });
        const response = await data.json();
        console.log('Dayli :>> ', response);
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
            /*      { id: 9, subtitle: 'icon', value: `${weatherData.weather.icon}` }, */
        ];

        return { weatherData, details };
    },
};
</script>

<style scoped>
.block__title {
    font-size: 1.5rem;
}
.day-short {
    display: grid;
    grid-template-columns: 1fr 20fr 2fr 1fr 1fr;
    align-items: center;
}
.day__img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.details__container {
    margin-top: 20px;
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

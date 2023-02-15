<template>
    <current-view />
    <today-view />
    <daily-view />
    <hourly-view />
    <!--     <test-vue /> -->
</template>

<script lang="ts">
import DailyView from './DailyView.vue';
import TodayView from './TodayView.vue';
import CurrentView from './CurrentView.vue';
import HourlyView from './HourlyView.vue';
/* import TestVue from './TestVue.vue'; */
import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        TodayView,
        DailyView,
        CurrentView,
        HourlyView,
        /*   TestVue, */
    },
});

    async setup() {
        const data = await getForecastByLocation({ latitude: 51.5072, longitude: -0.1276 });
        const response = await data.json();
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

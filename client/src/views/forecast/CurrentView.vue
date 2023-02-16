<template>
    <div
        class="cur-wrap"
        :style="{
            'background-image': 'url(' + bgr + ')',
        }"
    >
        <div class="weather-actions">
            <div class="locations">
                <img class="locations__img" src="../../assets/images/location.svg" alt="locations" />
                <div class="locations__text">
                    {{ $store.state.forecast.current.cityName }}
                </div>
            </div>
            <button class="refresh-btn" @click="$store.dispatch('forecast/updateForecast')">
                <img
                    src="../../assets/images/refresh.svg"
                    alt="refresh"
                    @click="$store.dispatch('forecast/updateForecast')"
                />
            </button>
        </div>

        <div class="weather">
            <div class="weather__text">
                <!-- обновлять раз в минутут -->
                <div class="timezone">Time: TODO</div>
                <div class="temperature">
                    <img class="weather__img" :src="$store.state.forecast.current.weatherIcon" />
                    <span class="temperature__cur">{{ Math.round($store.state.forecast.current.temperature) }}°C</span>
                </div>
                <div class="weather__desc">
                    <div class="feelings">
                        Feelings like
                        {{ Math.round($store.state.forecast.current.feelsLikeTemp) }}°C
                    </div>
                    <div class="desc">{{ $store.state.forecast.current.weatherDescription }}</div>
                    <div class="precipitation">
                        Precipitation:
                        {{ $store.state.forecast.daily.days[1].precipitationProbability }}%
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { WeatherCodes } from './weatherCodes/weatherCodes';
import { defineComponent } from 'vue';
export default defineComponent({
    components: {},
    data() {
        return {
            bgr: this.getWeatherBackground(store.state.forecast.current.weatherCode),
        };
    },
    methods: {
        getWeatherBackground(code: number) {
            return Object.entries(WeatherCodes).find(([key, value]) => {
                if (+key === code) {
                    console.log(value);
                    return value;
                }
            })?.[1];
        },
    },
});
</script>

<style lang="scss" scoped>
.cur-wrap {
    color: white;
    padding: 25px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-size: cover;
    background-position: center;
}
button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: rgb(205, 205, 205);

    &:hover {
        background-color: rgb(228, 228, 228);
    }

    &:active {
        background-color: rgb(205, 205, 205);
    }
}

.weather-actions {
    display: flex;
    justify-content: space-between;
}
.locations {
    display: flex;
    align-items: center;

    &__img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
    }

    &__text {
        font-size: 1.5rem;
    }
}

.refresh-btn {
    width: 45px;
    height: 45px;
    padding: 10px;
    background-color: transparent;
}
.weather {
    display: flex;
    margin-top: 30px;

    &__text {
        font-weight: 700;
    }

    &__img {
        margin-top: 20px;
        width: 100px;
        height: 100px;
    }
}
.temperature {
    column-gap: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 3rem;
}
.feelings,
.desc,
.principitation {
    font-weight: 600;
    font-size: 1.1rem;
}
</style>

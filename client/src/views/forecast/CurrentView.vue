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
                <time-view />
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
                </div>
            </div>
            <div class="weather__info">
                <div class="details__container details__top">
                    <div v-for="detail in details" :key="detail.id">
                        <div class="details__subtitle">
                            <span class="details__sub">{{ detail.subtitle }}</span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                xmlns="http://www.w3.org/2000/svg"
                                class="details__info"
                            >
                                <path
                                    d="M6.00001 0.166061C9.22217 0.166061 11.8342 2.77814 11.8342 6.0003C11.8342 9.22246 9.22217 11.8345 6.00001 11.8345C2.77785 11.8345 0.165771 9.22246 0.165771 6.0003C0.165771 2.77814 2.77785 0.166061 6.00001 0.166061ZM6.00001 1.04106C3.2611 1.04106 1.04077 3.26139 1.04077 6.0003C1.04077 8.73921 3.2611 10.9595 6.00001 10.9595C8.73892 10.9595 10.9592 8.73921 10.9592 6.0003C10.9592 3.26139 8.73892 1.04106 6.00001 1.04106ZM5.99788 5.12473C6.21937 5.12459 6.40253 5.28906 6.43164 5.50258L6.43567 5.56195L6.43777 8.77121C6.43793 9.01284 6.24218 9.20884 6.00056 9.209C5.77907 9.20914 5.59591 9.04467 5.5668 8.83115L5.56277 8.77178L5.56067 5.56252C5.56051 5.3209 5.75626 5.12489 5.99788 5.12473ZM6.00027 3.08437C6.32201 3.08437 6.58282 3.34519 6.58282 3.66693C6.58282 3.98866 6.32201 4.24948 6.00027 4.24948C5.67854 4.24948 5.41772 3.98866 5.41772 3.66693C5.41772 3.34519 5.67854 3.08437 6.00027 3.08437Z"
                                    fill="white"
                                    fill-opacity="0.55"
                                ></path>
                            </svg>
                            <div class="details__description">
                                <span>{{ detail.desc }}</span>
                            </div>
                        </div>
                        <div class="details__value">{{ detail.value }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import TimeView from './TimeView.vue';
import { WeatherCodes } from './weatherCodes/weatherCodes';
import { defineComponent } from 'vue';
import { Wind } from './weatherData/wind';
import { Visibility } from './weatherData/visibility';
export default defineComponent({
    components: {
        TimeView,
    },

    data() {
        let details = [
            {
                id: 0,
                subtitle: 'Humidity',
                value: `${store.state.forecast.current.humidityRelative} %`,
                desc: 'Amount of moisture present in the air relative to the maximum amount of moisture the air can contain at its current temperature.',
            },
            {
                id: 1,
                subtitle: 'Precipitation',
                value: `${store.state.forecast.daily.days[1].precipitationProbability} %`,
                desc: 'In meteorology, precipitation is any product of the condensation of atmospheric water vapor that falls under gravitational pull from clouds.',
            },
            {
                id: 2,
                subtitle: 'Wind',
                value: `${store.state.forecast.current.windSpeed.toFixed(2)} m/s ${
                    store.state.forecast.current.windDirectionAbbr
                }`,
                desc: this.getWindDesc(store.state.forecast.current.windSpeed.toFixed(1)),
            },
            {
                id: 3,
                subtitle: 'Pressure',
                value: `${Math.round(store.state.forecast.current.pressure / 1.333)} mmHg`,
                desc: 'Pressure is the weight of the air in the atmosphere. It is normalized to the standard atmospheric pressure of 1,013.25 mb (29.9212 inHg). Higher pressure is usually associated with sunny weather, lower pressure with stormy weather.',
            },
            {
                id: 4,
                subtitle: 'Clouds Cov.',
                value: `${store.state.forecast.current.cloudCoverage} %`,
                desc: 'The cloud cover is a part of the sky covered by clouds in relation to an observer (weather station) at a certain point on land or at sea.',
            },
            {
                id: 5,
                subtitle: 'Visibility',
                value: `${store.state.forecast.current.visibility} km`,
                desc: this.getVisibilityDesc(store.state.forecast.current.visibility),
            },
        ];
        return {
            details,
            bgr: this.getWeatherBackground(store.state.forecast.current.weatherCode),
        };
    },
    methods: {
        getWeatherBackground(code: number) {
            return Object.entries(WeatherCodes).find(([key, value]) => {
                if (+key === code) {
                    return value;
                }
            })?.[1];
        },
        getWindDesc(speed: number) {
            const wind = Wind.filter((el) => Number(speed) >= el.min_speed && Number(speed) <= el.max_speed);
            return wind[0].name;
        },
        getVisibilityDesc(visibility: number) {
            const data = Visibility.filter(
                (el) => Number(visibility) >= el.min_visibility && Number(visibility) <= el.max_visibility
            );
            return data[0].desc;
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

.details {
    padding: 0 80px;
    height: 100%;
    transition: all 2s;
    margin-bottom: 20px;
    padding-bottom: 20px;
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
    &__collapsed {
        max-height: 100px;
    }
    &__container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
    }
    &__top {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    &__subtitle {
        text-decoration: underline;
        font-size: 1.2rem;
        text-align: center;
        position: relative;

        .details__sub:hover {
            cursor: pointer;
        }
        .details__sub:hover ~ .details__description {
            visibility: visible;
            opacity: 1;
            transition: 0.7s;
        }
    }
    &__info {
        margin-left: 5px;
    }
    &__description {
        visibility: hidden;
        opacity: 0;
        transition: 0.7s;
        position: absolute;
        padding: 5px;
        color: black;
        background-color: white;
        font-size: 0.9rem;
        width: 250px;
        top: 25px;
        z-index: 100;
        right: -80px;
        border: none;
        border-radius: 10px;
    }
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
    justify-content: space-between;

    &__info {
        margin: auto 0 0 0;
        text-align: center;
    }
    &__text,
    &__info {
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
.desc {
    font-weight: 600;
    font-size: 1.1rem;
}
</style>

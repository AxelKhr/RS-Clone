<template>
    <div
        class="cur-wrap"
        :style="{
            'background-image': 'url(' + bgr + ')',
        }"
    >
        <div class="weather-actions">
            <div class="locations">
                <div class="locations__img"></div>
                <div class="locations__text">
                    {{ $store.state.forecast.current.cityName }}
                </div>
            </div>
            <button class="refresh-btn" @click="$store.dispatch('forecast/updateForecast')">
                <div class="locations__refresh"></div>
            </button>
        </div>
        <div class="weather">
            <div class="weather__text">
                <time-view />
                <div class="temperature">
                    <img class="weather__img" :src="$store.state.forecast.current.weatherIcon" />
                    <span class="temperature__cur">{{
                        Math.round($store.state.forecast.current.temperature) + ' ' + unit.temperature
                    }}</span>
                </div>
                <div class="weather__desc">
                    <div class="feelings">
                        {{ lang.feeling }}
                        {{ Math.round($store.state.forecast.current.feelsLikeTemp) + ' ' + unit.temperature }}
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
import { windScale } from './weatherData/wind';
import { visibilityScale } from './weatherData/visibility';
import { unitData } from '@/views/utils/metricUtils';
import { langData } from '../utils/langUtils';
import { LANG } from '@/types/language';
import { UNITS } from '@/types/units';
export default defineComponent({
    components: {
        TimeView,
    },
    data() {
        let unit = unitData();
        let lang = langData();
        let details = [
            {
                id: 0,
                subtitle: lang.humidity,
                value: `${store.state.forecast.current.humidityRelative} %`,
                desc:
                    store.state.settings.languageCurrent == LANG.en
                        ? 'Amount of moisture present in the air relative to the maximum amount of moisture the air can contain at its current temperature.'
                        : 'Количество влаги, присутствующей в воздухе, по отношению к максимальному количеству влаги, которое воздух может содержать при текущей температуре.',
            },
            {
                id: 1,
                subtitle: lang.precipitation,
                value: `${store.state.forecast.daily.days[1].precipitationProbability} %`,
                desc:
                    store.state.settings.languageCurrent == LANG.en
                        ? 'Precipitation is any product of the condensation of atmospheric water vapor that falls under gravitational pull from clouds.'
                        : 'Осадки — это любой продукт конденсации атмосферного водяного пара, попадающий под действием гравитационного притяжения облаков.',
            },
            {
                id: 2,
                subtitle: lang.wind,
                value: `${store.state.forecast.current.windSpeed.toFixed(2)} ${unit.speed} ${
                    store.state.forecast.current.windDirectionAbbr
                }`,
                desc: this.getWindDesc(store.state.forecast.current.windSpeed.toFixed(1)),
            },
            {
                id: 3,
                subtitle: lang.pressure,
                value: `${Math.round(store.state.forecast.current.pressure / 1.333)} ${unit.pressure}`,
                desc:
                    store.state.settings.languageCurrent == LANG.en
                        ? 'Pressure is the weight of the air in the atmosphere. It is normalized to the standard atmospheric pressure of 1,013.25 mb (29.9212 inHg). Higher pressure is usually associated with sunny weather, lower pressure with stormy weather.'
                        : 'Давление – это вес воздуха в атмосфере. Оно нормализовано к стандартному атмосферному давлению 1013,25 мбар (29,9212 дюйма ртутного столба). Более высокое давление обычно связано с солнечной погодой, более низкое – с ненастной погодой.',
            },
            {
                id: 4,
                subtitle: lang.clouds,
                value: `${store.state.forecast.current.cloudCoverage} %`,
                desc:
                    store.state.settings.languageCurrent == LANG.en
                        ? 'The cloud cover is a part of the sky covered by clouds in relation to an observer (weather station) at a certain point on land or at sea.'
                        : 'Облачный покров — это часть неба, покрытая облаками по отношению к наблюдателю (метеостанции) в определенной точке на суше или на море.',
            },
            {
                id: 5,
                subtitle: lang.visibility,
                value: `${store.state.forecast.current.visibility} ${unit.length}`,
                desc: this.getVisibilityDesc(Math.round(store.state.forecast.current.visibility)),
            },
        ];
        return {
            unit,
            lang,
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
            const s = store.state.settings.units == UNITS.imperial ? speed / 2.237 : speed;
            const wind = windScale().filter((el) => Number(s) >= el.min_speed && Number(s) <= el.max_speed);
            return `${wind[0].name} (${wind[0].min_speed} - ${wind[0].max_speed} m/s) - ${wind[0].description}`;
        },
        getVisibilityDesc(visibility: number) {
            const v = store.state.settings.units == UNITS.imperial ? visibility * 1.609 : visibility;
            let data = visibilityScale().filter(
                (el) => Number(v) >= el.min_visibility && Number(v) <= el.max_visibility
            );
            return `${data[0].desc} ( > ${data[0].min_visibility} km)`;
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
        background-color: var(--background__color--hover);
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

    &__img,
    &__refresh {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        background-color: white;
        mask-size: contain;
        --webkit-mask-size: contain;
        mask-repeat: no-repeat;
        --webkit-mask-repeat: no-repeat;
        mask-position: center;
        --webkit-mask-position: center;
    }
    &__img {
        mask-image: url('@/assets/images/location.svg');
        --webkit-mask-image: url('@/assets/images/location.svg');
    }
    &__refresh {
        mask-image: url('@/assets/images/refresh.svg');
        --webkit-mask-image: url('@/assets/images/refresh.svg');
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

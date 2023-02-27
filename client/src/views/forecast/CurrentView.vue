<template>
    <div
        class="cur-wrap"
        :style="{
            'background-image': 'url(' + getBgr + ')',
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
                <div class="locations__refresh" @click="rotate"></div>
            </button>
        </div>
        <div class="weather">
            <div class="weather__text">
                <div class="time">
                    <span class="time-local">{{ lang.time }}:</span>
                    <time-view class="time-local" />
                </div>
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
                    <div v-for="detail in getDetails" :key="detail.id">
                        <div class="details__subtitle">
                            <div class="subtitle-wrap">
                                <span class="dot" :style="detail.color"></span>
                                <span class="details__sub">{{ detail.subtitle }}</span>
                            </div>
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

interface Detail {
    id: number;
    subtitle: string;
    value: string;
    desc: string;
    color: string;
}

export default defineComponent({
    components: {
        TimeView,
    },

    data() {
        let unit = unitData();
        let lang = langData();

        return {
            unit,
            lang,
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
            const wind = windScale().filter((el) => Number(s) >= el.min_speed && Number(s) < el.max_speed);
            return `${wind[0].name} (${wind[0].min_speed} - ${wind[0].max_speed} m/s) - ${wind[0].description}`;
        },
        getWindColor(speed: number) {
            const s = store.state.settings.units == UNITS.imperial ? speed / 2.237 : speed;
            const wind = windScale().filter((el) => Number(s) >= el.min_speed && Number(s) < el.max_speed);
            return `${wind[0].color}`;
        },
        getVisibilityDesc(visibility: number) {
            const v = store.state.settings.units == UNITS.imperial ? visibility * 1.609 : visibility;
            let data = visibilityScale().filter(
                (el) => Number(v) >= el.min_visibility && Number(v) < el.max_visibility
            );
            return `${data[0].desc} ( ${data[0].min_visibility} - ${data[0].max_visibility} km)`;
        },
        getVisibilityColor(visibility: number) {
            const v = store.state.settings.units == UNITS.imperial ? visibility * 1.609 : visibility;
            let data = visibilityScale().filter(
                (el) => Number(v) >= el.min_visibility && Number(v) < el.max_visibility
            );
            return `${data[0].color}`;
        },
        rotate(e: Event) {
            const target = e.target as HTMLElement;
            target.classList.add('rotate');
            setTimeout(() => {
                target.classList.remove('rotate');
            }, 2000);
        },
    },
    computed: {
        getBgr(): string {
            return this.getWeatherBackground(store.state.forecast.current.weatherCode);
        },
        getDetails(): Detail[] {
            let unit = unitData();
            let lang = langData();
            return [
                {
                    id: 0,
                    subtitle: lang.humidity,
                    value: `${store.state.forecast.current.humidityRelative} %`,
                    desc:
                        store.state.settings.languageCurrent == LANG.en
                            ? 'Amount of moisture present in the air relative to the maximum amount of moisture the air can contain at its current temperature.'
                            : 'Количество влаги, присутствующей в воздухе, по отношению к максимальному количеству влаги, которое воздух может содержать при текущей температуре.',
                    color: 'background-color: transparent',
                },
                {
                    id: 1,
                    subtitle: lang.precipitation,
                    value: `${store.state.forecast.daily.days[1].precipitationProbability} %`,
                    desc:
                        store.state.settings.languageCurrent == LANG.en
                            ? 'Precipitation is any product of the condensation of atmospheric water vapor that falls under gravitational pull from clouds.'
                            : 'Осадки — это любой продукт конденсации атмосферного водяного пара, попадающий под действием гравитационного притяжения облаков.',
                    color: 'background-color: transparent',
                },
                {
                    id: 2,
                    subtitle: lang.wind,
                    value: `${store.state.forecast.current.windSpeed.toFixed(2)} ${unit.speed} ${
                        store.state.forecast.current.windDirectionAbbr
                    }`,
                    desc: this.getWindDesc(store.state.forecast.current.windSpeed),
                    color: this.getWindColor(store.state.forecast.current.windSpeed),
                },
                {
                    id: 3,
                    subtitle: lang.pressure,
                    value: `${Math.round(store.state.forecast.current.pressure / 1.333)} ${unit.pressure}`,
                    desc:
                        store.state.settings.languageCurrent == LANG.en
                            ? 'Pressure is the weight of the air in the atmosphere. It is normalized to the standard atmospheric pressure of 1,013.25 mb (29.9212 inHg). Higher pressure is usually associated with sunny weather, lower pressure with stormy weather.'
                            : 'Давление – это вес воздуха в атмосфере. Оно нормализовано к стандартному атмосферному давлению 1013,25 мбар (29,9212 дюйма ртутного столба). Более высокое давление обычно связано с солнечной погодой, более низкое – с ненастной погодой.',
                    color: 'background-color: transparent',
                },
                {
                    id: 4,
                    subtitle: lang.clouds,
                    value: `${store.state.forecast.current.cloudCoverage} %`,
                    desc:
                        store.state.settings.languageCurrent == LANG.en
                            ? 'The cloud cover is a part of the sky covered by clouds in relation to an observer (weather station) at a certain point on land or at sea.'
                            : 'Облачный покров — это часть неба, покрытая облаками по отношению к наблюдателю (метеостанции) в определенной точке на суше или на море.',
                    color: 'background-color: transparent',
                },
                {
                    id: 5,
                    subtitle: lang.visibility,
                    value: `${store.state.forecast.current.visibility} ${unit.length}`,
                    desc: this.getVisibilityDesc(store.state.forecast.current.visibility),
                    color: this.getVisibilityColor(store.state.forecast.current.visibility),
                },
            ];
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

.time {
    display: flex;
    flex-direction: row;
    column-gap: 15px;
}
.time-local {
    font-size: 1.1rem;
    font-weight: bold;
}
.dot {
    display: inline-block;
    margin-right: 10px;
    border-radius: 5px;
    width: 10px;
    height: 10px;
}

.locations__refresh {
    transition: transform 2s ease;
}
.rotate {
    transform: rotate(720deg);
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
        grid-gap: 5px;
        font-size: 0.9rem;
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
        .subtitle-wrap:hover ~ .details__description {
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
        right: -35px;
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
@media (max-width: 920px) {
    .details__container {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 790px) {
    .details__container {
        grid-template-columns: repeat(3, 1fr);
    }
    .weather {
        flex-direction: column;
    }
}
@media (max-width: 470px) {
    .details__container {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 330px) {
    .details__sub {
        font-size: 0.9rem;
    }
}
</style>

<template>
    <div class="details">
        <collapse :when="isExpanded" class="v-collapse">
            <div class="sunrise-sunset">
                <div class="sunrise-sunset__chart"></div>
                <dl class="sunrise-sunset__description sunrise-sunset__description_value_sunrise">
                    <dt class="sunrise-sunset__label">
                        <span class="a11y-hidden">Sunrise</span
                        ><span class="sunrise-sunset__text" aria-hidden="true">Sunrise</span
                        ><i class="icon icon_sunrise icon_size_24" aria-hidden="true" data-width="24"></i>
                    </dt>
                    <dd class="sunrise-sunset__value">{{ sunrise }}</dd>
                </dl>
                <dl class="sunrise-sunset__description sunrise-sunset__description_value_sunset">
                    <dt class="sunrise-sunset__label">
                        <span class="a11y-hidden">Sunset</span
                        ><span class="sunrise-sunset__text" aria-hidden="true">Sunset</span
                        ><i class="icon icon_sunset icon_size_24" aria-hidden="true" data-width="24"></i>
                    </dt>
                    <dd class="sunrise-sunset__value">{{ sunset }}</dd>
                </dl>
                <dl class="sunrise-sunset__description sunrise-sunset__description_value_duration">
                    <dt class="sunrise-sunset__label"><span class="sunrise-sunset__text">Daylight hours</span></dt>
                    <dd class="sunrise-sunset__value">{{ dayLength }}</dd>
                </dl>
            </div>
            <div class="daily">
                <div class="daily__weather" v-for="w in dayWeather" :key="w.id">
                    <span>{{ w.name }}</span>
                    <img class="daily__icon" :src="w.weather.weatherIcon" />
                    <span>{{ w.weather.temperature + ' ' + unit.temperature }}</span>
                    <span>{{ w.weather.windSpeed.toFixed(2) + ' ' + unit.speed }}</span>
                    <span>{{ Math.round(w.weather.pressure / 1.333) + ' ' + unit.pressure }}</span>
                    <span>{{ w.weather.humidityRelative }} %</span>
                </div>
            </div>
        </collapse>
        <div class="details__size">
            <transition name="mode-fade" mode="out-in">
                <button @click="switchButton" class="details__btn">
                    <div ref="exBtn" class="expand__btn"></div>
                </button>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue';
import { Collapse } from 'vue-collapsed';
import { IUnit, unitData } from '../utils/metricUtils';
import { langData } from '../utils/langUtils';
export default defineComponent({
    components: {
        Collapse,
    },
    data() {
        let unit = unitData();
        let lang = langData();
        const forecast = store.state.forecast.hourly.hours;
        const dayForecast = store.state.forecast.dayHourly.hours;
        for (let i = dayForecast.length, j = 0; i < 24; i++, j++) {
            dayForecast.push(forecast[j]);
        }
        return {
            unit,
            down: false,
            isExpanded: false,
            sunrise: this.getWithUtc(store.state.forecast.current.sunRise),
            sunset: this.getWithUtc(store.state.forecast.current.sunSet),
            dayLength: this.getDayLength(
                store.state.forecast.current.sunRise,
                store.state.forecast.current.sunSet,
                unit
            ),
            weather: dayForecast,
            dayWeather: [
                {
                    id: 1,
                    name: lang.morning,
                    weather: dayForecast[5],
                },
                {
                    id: 2,
                    name: lang.day,
                    weather: dayForecast[11],
                },
                {
                    id: 3,
                    name: lang.evening,
                    weather: dayForecast[17],
                },
                {
                    id: 4,
                    name: lang.night,
                    weather: dayForecast[22],
                },
            ],
        };
    },
    methods: {
        switchButton() {
            this.isExpanded = !this.isExpanded;
            (this.$refs.exBtn as HTMLElement).classList.toggle('collapse__btn');
            (this.$refs.exBtn as HTMLElement).classList.toggle('expand__btn');
        },
        getWithUtc(value: string) {
            const utc = new Date().getTimezoneOffset() / 60;
            const timeArr = value.split(':');
            timeArr[0] = (+timeArr[0] - utc).toString();
            return timeArr.join(':');
        },
        getDayLength(start: string, end: string, unit: IUnit) {
            const startArr = start.split(':');
            const startLength = +startArr[0] * 60 + +startArr[1];
            const endArr = end.split(':');
            const endLength = +endArr[0] * 60 + +endArr[1];
            const length = endLength - startLength;
            return `${(length / 60).toFixed(0)} ${unit.hour} ${length % 60} ${unit.minute}`;
        },
    },
});
</script>

<style lang="scss" scoped>
.v-collapse {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    column-gap: 30px;
    width: 100%;
    transition: height var(--vc-auto-duration) ease-out;
}

.daily__icon {
    width: 35px;
    height: 35px;
}

.sunrise-sunset {
    width: 210px;
    margin: auto 0;

    &__chart {
        width: 100%;
        height: 31px;
        margin-bottom: 7px;
        background: url('@/assets/sunrise_chart.svg') center no-repeat;
    }

    &__description {
        text-align: center;
        margin: 0;
    }

    &__label {
        line-height: 24px;
        height: 24px;
        margin-bottom: 5px;
    }

    &__description_value_sunrise {
        float: left;
    }

    &__description_value_sunset {
        float: right;
    }
    .a11y-hidden {
        height: 1px;
        width: 1px;
        top: 0;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px);
        position: absolute;
        left: -32767px;
    }

    .sunrise-sunset__text {
        display: none;
    }

    .icon {
        display: inline-block;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .icon_sunrise {
        -webkit-background-size: 100% 100%;
        background-size: 100%;
        background-image: url('@/assets/sunrise.svg');
    }

    .icon_sunset {
        -webkit-background-size: 100% 100%;
        background-size: 100%;
        background-image: url('@/assets/sunset.svg');
    }
    .icon_size_24 {
        width: 24px;
        height: 24px;
    }
}

.daily {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;

    &__weather {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
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

.expand__btn {
    height: 15px;
    width: 15px;
    margin: 0 auto;
    background-color: var(--font__color);
    mask-image: url('@/assets/images/chevron-down.svg');
    --webkit-mask-image: url('@/assets/images/chevron-down.svg');
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
}

.collapse__btn {
    height: 15px;
    width: 15px;
    margin: 0 auto;
    background-color: var(--font__color);
    mask-image: url('@/assets/images/chevron-up.svg');
    --webkit-mask-image: url('@/assets/images/chevron-up.svg');
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
}

.block__title {
    font-size: 1.5rem;
}
.details {
    padding: 20px 80px;
    height: 100%;
    transition: all 2s;
    margin-bottom: 20px;
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
    &__btn {
        position: absolute;
        background-color: var(--background__color);
        top: 10px;
        width: 32px;
        height: 25px;
        box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
        &:hover {
            background-color: var(--background__color);
        }
    }
    &__subtitle {
        text-decoration: underline;
        font-size: 1.2rem;
        text-align: center;
        position: relative;
    }
    &__info {
        margin-left: 5px;
    }
    &__description {
        opacity: 0;
        transition: 0.5s;
        position: absolute;
        padding: 5px;
        color: black;
        background-color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
        width: 250px;
        top: 25px;
        right: -80px;
        border: none;
        border-radius: 10px;
    }
    &__value {
        font-size: 1rem;
        text-align: center;
    }

    &__size {
        position: relative;
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }
}
.collapse {
    height: 0;
    overflow: hidden;
    transition: height 2s;
}
.mode-fade-enter-active,
.no-mode-fade-leave-active {
    transition: opacity 0.5s;
}

.mode-fade-enter-from,
.no-mode-fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>

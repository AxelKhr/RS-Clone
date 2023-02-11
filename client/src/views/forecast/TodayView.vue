<template>
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
                <div v-for="detail in details.slice(0, -6)" :key="detail.id">
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
</template>

<script lang="ts">
import store from '@/store';

export default {
    components: {},
    data() {
        return {
            down: false,
        };
    },
    async setup() {
        let details = [
            {
                id: 0,
                subtitle: 'Temp',
                value: `${Math.round(store.state.forecast.daily.days[1].temperatureMin)} - ${Math.round(
                    store.state.forecast.daily.days[1].temperatureMax
                )}°C`,
            },
            {
                id: 1,
                subtitle: 'Humidity',
                value: `${store.state.forecast.current.humidityRelative} %`,
            },
            {
                id: 2,
                subtitle: 'Precipitation',
                value: `${store.state.forecast.daily.days[1].precipitationProbability} %`,
            },
            {
                id: 3,
                subtitle: 'Sunrise',
                value: `${store.state.forecast.current.sunRise}`,
            },
            {
                id: 4,
                subtitle: 'Sunset',
                value: `${store.state.forecast.current.sunSet}`,
            },
            {
                id: 5,
                subtitle: 'Wind',
                value: `${store.state.forecast.current.windSpeed.toFixed(2)} m/s ${
                    store.state.forecast.current.windDirectionAbbr
                }`,
            },
            {
                id: 6,
                subtitle: 'Pressure',
                value: `${Math.round(store.state.forecast.current.pressure / 1.333)} mmHg`,
            },
            {
                id: 7,
                subtitle: 'Clouds Cov.',
                value: `${store.state.forecast.current.cloudCoverage} %`,
            },
            {
                id: 8,
                subtitle: 'Visibility',
                value: `${store.state.forecast.current.visibility} km`,
            },
        ];
        return { details };
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
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

.block__title {
    font-size: 1.5rem;
}
.details {
    &__container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
    }
    &__btn {
        width: 32px;
        height: 32px;
    }
    &__subtitle {
        font-size: 0.8rem;
        text-align: center;
    }
    &__value {
        font-size: 1rem;
        text-align: center;
    }

    &__size {
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }
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

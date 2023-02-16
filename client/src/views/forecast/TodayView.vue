<template>
    <div class="details">
        <div class="block__title">Today</div>
        <div class="details__container details__top">
            <div v-for="detail in details.slice(0, -6)" :key="detail.id">
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
        <transition name="fade" mode="out-in">
            <div ref="collapse" class="details__container details__collapsed collapse">
                <div v-for="detail in details.slice(3)" :key="detail.id">
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
        </transition>
        <div class="details__size">
            <transition name="mode-fade" mode="out-in">
                <button class="details__btn" v-if="down" key="down" @click="toggleCollapse">
                    <img src="../../assets/images/chevron-up.svg" alt="arrow" />
                </button>
                <button class="details__btn" v-else key="up" @click="toggleCollapse">
                    <img src="../../assets/images/chevron-down.svg" alt="arrow" />
                </button>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import store from '@/store';

import { defineComponent } from 'vue';
export default defineComponent({
    components: {},
    data() {
        let details = [
            {
                id: 0,
                subtitle: 'Temp',
                value: `${Math.round(store.state.forecast.daily.days[1].temperatureMin)} ... ${Math.round(
                    store.state.forecast.daily.days[1].temperatureMax
                )}°C`,
                desc: 'Test desc',
            },
            {
                id: 1,
                subtitle: 'Humidity',
                value: `${store.state.forecast.current.humidityRelative} %`,
                desc: 'Amount of moisture present in the air relative to the maximum amount of moisture the air can contain at its current temperature.',
            },
            {
                id: 2,
                subtitle: 'Precipitation',
                value: `${store.state.forecast.daily.days[1].precipitationProbability} %`,
                desc: 'Test desc',
            },
            {
                id: 3,
                subtitle: 'Sunrise',
                value: `${store.state.forecast.current.sunRise}`,
                desc: 'Test desc',
            },
            {
                id: 4,
                subtitle: 'Sunset',
                value: `${store.state.forecast.current.sunSet}`,
                desc: 'Test desc',
            },
            {
                id: 5,
                subtitle: 'Wind',
                value: `${store.state.forecast.current.windSpeed.toFixed(2)} m/s ${
                    store.state.forecast.current.windDirectionAbbr
                }`,
                desc: 'Test desc',
            },
            {
                id: 6,
                subtitle: 'Pressure',
                value: `${Math.round(store.state.forecast.current.pressure / 1.333)} mmHg`,
                desc: 'Test desc',
            },
            {
                id: 7,
                subtitle: 'Clouds Cov.',
                value: `${store.state.forecast.current.cloudCoverage} %`,
                desc: 'Test desc',
            },
            {
                id: 8,
                subtitle: 'Visibility',
                value: `${store.state.forecast.current.visibility} km`,
                desc: 'Test desc',
            },
        ];

        return { details, down: false };
    },
    methods: {
        toggleCollapse() {
            (this.$refs.collapse as HTMLElement).classList.toggle('collapse');
        },
    },
});
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
    height: 100%;
    transition: all 2s;
    margin-bottom: 30px;
    padding-bottom: 30px;
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
    &__collapsed {
        max-height: 100px;
    }
    &__container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
    }
    &__top {
        margin-bottom: 10px;
    }
    &__btn {
        position: absolute;
        background-color: #222222;
        top: 20px;
        width: 32px;
        height: 25px;
        box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
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
            opacity: 1;
            transition: 0.5s;
        }
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

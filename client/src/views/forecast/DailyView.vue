<template>
    <div class="block__title">{{ lang.daily }}</div>
    <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide
            @click="toggleChild(index)"
            v-for="(day, index) in getDetails"
            :key="index"
            :class="{ active: index === selected }"
        >
            <div class="carousel__item day__short">
                <div class="item-main">
                    <div class="day__subtitle">{{ day[0].date }}</div>
                    <img class="day__img" :src="day[12].icon" alt="" />
                    <div class="day__temp" v-html="day[1].temp"></div>
                </div>
                <div class="day-text">
                    <div class="day__description">
                        <p class="desc">{{ day[13].descriptions }}</p>
                    </div>
                </div>
            </div>
        </Slide>

        <template #addons>
            <Navigation />
        </template>
    </Carousel>
    <collapse :when="isExpanded" class="v-collapse">
        <div v-for="(day, index) in getDetails" :key="index" :class="{ active: index === selected }">
            <transition name="fade">
                <div class="details__container child" v-if="index === selected">
                    <div>
                        <img src="../../assets/images/humidity.svg" alt="" />
                        <div class="details__subtitle">{{ lang.humidity }}<br />{{ day[2].humidity }}</div>
                    </div>
                    <div>
                        <img src="../../assets/images/sunrise.svg" alt="" />
                        <div class="details__subtitle">{{ lang.sunrise }}<br />{{ day[4].sunrise }}</div>
                    </div>
                    <div>
                        <img src="../../assets/images/sunset.svg" alt="" />
                        <div class="details__subtitle">{{ lang.sunset }}<br />{{ day[5].sunset }}</div>
                    </div>
                    <div>
                        <img src="../../assets/images/wind.svg" alt="" />
                        <div class="details__subtitle">{{ lang.wind }}<br />{{ day[6].wind }}</div>
                    </div>
                    <div>
                        <img src="../../assets/images/pressure.svg" alt="" />
                        <div class="details__subtitle">{{ lang.pressure }}<br />{{ day[7].pressure }}</div>
                    </div>
                    <div>
                        <img src="../../assets/images/cloud.svg" alt="" />
                        <div class="details__subtitle">{{ lang.clouds }}<br />{{ day[8].clouds }}</div>
                    </div>
                    <div>
                        <img src="../../assets/images/visibility.svg" alt="" />
                        <div class="details__subtitle">{{ lang.visibility }}<br />{{ day[9].visibility }}</div>
                    </div>
                    <div>
                        <img class="moon" src="../../assets/moonrise-black.png" alt="" />
                        <div class="details__subtitle">{{ lang.moonrise }}<br />{{ day[10].moonrise }}</div>
                    </div>
                    <div>
                        <img class="moon" src="../../assets/moonset-black.png" alt="" />
                        <div class="details__subtitle">{{ lang.moonset }}<br />{{ day[11].moonset }}</div>
                    </div>
                </div>
            </transition>
        </div>
    </collapse>
    <div class="days">
        <div class="day">
            <div
                @click="toggleChild(index)"
                v-for="(day, index) in getDetails"
                :key="index"
                :class="{ active: index === selected }"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { Collapse } from 'vue-collapsed';
import { unitData } from '../utils/metricUtils';
import { langData } from '../utils/langUtils';
export default defineComponent({
    name: 'BreakPoints',
    components: {
        Carousel,
        Slide,
        Navigation,
        Collapse,
    },
    data: () => {
        let unit = unitData();
        let lang = langData();
        let settings = {
            itemsToShow: 1.15,
            snapAlign: 'start',
        };
        let breakpoints = {
            400: {
                itemsToShow: 2.35,
                snapAlign: 'start',
            },
            700: {
                itemsToShow: 3.5,
                snapAlign: 'start',
            },
            800: {
                itemsToShow: 4.7,
                snapAlign: 'start',
            },
            1024: {
                itemsToShow: 4.7,
                snapAlign: 'start',
            },
        };
        return { lang, unit, isExpanded: false, settings, breakpoints, selected: null as number | null };
    },
    methods: {
        toggleChild(index: number) {
            this.selected = this.selected === index ? null : index;
            this.selected === null ? (this.isExpanded = false) : (this.isExpanded = true);
        },
        getCurDate(dateStr: string): string {
            const date = new Date(dateStr);
            const curDate = new Date();
            if (date.getDate() === curDate.getDate()) {
                return langData().today;
            } else if (date.getDate() - curDate.getDate() === 1) {
                return langData().tommorow;
            }
            return `${date.getDate()} ${date.toLocaleString(store.state.settings.languageCurrent, { month: 'short' })}`;
        },
    },
    computed: {
        getDetails() {
            let unit = unitData();
            let lang = langData();
            let daysData = store.state.forecast.daily.days;
            return daysData
                .map((day) => {
                    return [
                        { date: `${this.getCurDate(day.validDate)}` },
                        {
                            temp: `${lang.day}: <span style="font-size: 1.1rem; font-weight: bold;">
                            ${day.temperatureMax}${unit.temperature}
                            </span><br>${lang.night}: <span style="font-size: 1.1rem; font-weight: bold;">
                                ${day.temperatureMin}${unit.temperature}
                            </span>`,
                        },
                        { humidity: `${day.humidityRelative} %` },
                        { precipitation: `${day.precipitationProbability} %` },
                        { sunrise: `${day.sunRise}` },
                        { sunset: `${day.sunSet}` },
                        { wind: `${day.windSpeed} ${unit.speed} ${day.windDirectionAbbr}` },
                        { pressure: `${day.pressure} ${unit.pressure}` },
                        { clouds: `${day.cloudCoverage} %` },
                        { visibility: `${day.visibility} ${unit.length}` },
                        { moonrise: `${day.moonRise}` },
                        { moonset: `${day.moonSet}` },
                        { icon: `${day.weatherIcon}` },
                        { descriptions: `${day.weatherDescription}` },
                        { time: `${day.timeStamp}` },
                    ];
                })
                .slice(0, 16);
        },
    },
});
</script>

<style lang="scss" scoped>
.block__title {
    display: inline-block;
    width: 25%;
    padding: 5px 20px;
    padding-right: 60px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 1.5rem;
    margin-bottom: 20px;
    box-shadow: 2px 2px 2px -1px rgba(34, 60, 80, 0.2);
}

.item-main {
    height: 80%;
}

.active .carousel__item {
    background-color: rgba(0, 0, 0, 0.05);
}
.v-collapse .active {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 1px;
}
.day {
    &__short {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        white-space: nowrap;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 95%;
        padding: 15px;
        cursor: pointer;
        &:hover {
            background-color: rgb(228, 228, 228);
        }
    }
    &__img {
        width: 100%;
        height: auto;
    }
    &__subtitle {
        font-size: 1.5rem;
    }
    &-text {
        max-width: 200px;
        width: 100%;
    }
    &__description {
        margin-top: 10px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 5px 15px;
        white-space: pre-wrap;

        .desc {
            text-align: center;
            word-wrap: break-word;
            font-weight: 500;
            max-width: 200px;
            width: 100%;
        }
    }
}

.details {
    position: relative;
    height: 100%;
    transition: all 2s;
    &__collapsed {
        max-height: 100px;
    }
    &__container {
        margin-top: 20px;
        margin-bottom: 20px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        @media (max-width: 900px) {
            grid-template-columns: repeat(2, 1fr);
        }
        & > div {
            margin: 0 auto;
            display: flex;
            align-items: center;
            background-color: rgb(228, 228, 228);
            border-radius: 5px;
            width: 95%;
            & > img {
                width: 30px;
                height: 30px;
                margin: 20px;
            }
        }
    }

    &__subtitle {
        font-size: 1.1rem;
        text-align: left;
        width: 100%;
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

.day__precipitation {
    display: flex;
    justify-content: center;
    &-img {
        width: 18px;
        height: 18px;
    }
}
.v-collapse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    column-gap: 30px;
    width: 100%;
    transition: height var(--vc-auto-duration) ease-in;
    box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6) inset, 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
}

.days {
    margin-bottom: 40px;
}

.collapse {
    height: 0;
    overflow: hidden;
    transition: height 2s;
}
.carousel__slide {
    flex-direction: column;
    justify-content: space-between;
}

.carousel__item {
    height: 100%;
    box-shadow: 0px 2px 5px -1px rgba(34, 60, 80, 0.2);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.01s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.mode-fade-enter-active,
.no-mode-fade-leave-active {
    transition: opacity 0.5s;
}

.mode-fade-enter-from,
.no-mode-fade-leave-to {
    opacity: 0;
}

@media (max-width: 720px) {
    .block__title {
        width: 50%;
        padding: 5px 20px;
        padding-right: 60px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        font-size: 1.5rem;
        margin-bottom: 20px;
        box-shadow: 2px 2px 2px -1px rgba(34, 60, 80, 0.2);
    }
}

@media (max-width: 450px) {
    .block__title {
        font-size: 1rem;
    }
    .details__subtitle {
        font-size: 0.8rem;
        text-align: left;
        width: 100%;
    }
    .details__container > div > img {
        width: 20px;
        height: 20px;
        margin: 10px;
    }
}
</style>

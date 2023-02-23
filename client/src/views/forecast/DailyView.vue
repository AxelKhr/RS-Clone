<template>
    <div class="block__title">Daily Forecast</div>
    <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide
            @click="toggleChild(index)"
            v-for="(day, index) in details"
            :key="index"
            :class="{ active: index === selected }"
        >
            <div class="carousel__item day__short">
                <img class="day__img" :src="day[10].icon" alt="" />
                <div class="day-text">
                    <div class="day__subtitle">{{ day[0].date }}</div>
                    <div class="day__description">{{ day[11].descriptions }}</div>
                </div>
                <div class="day__precipitation">
                    <img class="day__precipitation-img" src="../../assets/images/drop.svg" alt="" />
                    <div>{{ day[3].precipitation }}</div>
                </div>
                <div class="day__temp">
                    {{ day[1].temp }}
                </div>
            </div>
        </Slide>

        <template #addons>
            <Navigation />
        </template>
    </Carousel>
    <collapse
        :when="isExpanded"
        class="v-collapse"
        v-for="(day, index) in details"
        :key="index"
        :class="{ active: index === selected }"
    >
        <div class="details__container child" v-if="index === selected">
            <div>
                <img src="../../assets/images/humidity.svg" alt="" />
                <div class="details__subtitle">Humidity<br />{{ day[2].humidity }}</div>
            </div>
            <div>
                <img src="../../assets/images/sunrise.svg" alt="" />
                <div class="details__subtitle">Sunrise<br />{{ day[4].sunrise }}</div>
            </div>
            <div>
                <img src="../../assets/images/sunset.svg" alt="" />
                <div class="details__subtitle">Sunset<br />{{ day[5].sunset }}</div>
            </div>
            <div>
                <img src="../../assets/images/wind.svg" alt="" />
                <div class="details__subtitle">Wind Speed<br />{{ day[6].wind }}</div>
            </div>
            <div>
                <img src="../../assets/images/pressure.svg" alt="" />
                <div class="details__subtitle">Pressure<br />{{ day[7].pressure }}</div>
            </div>
            <div>
                <img src="../../assets/images/cloud.svg" alt="" />
                <div class="details__subtitle">Cloud Coverage<br />{{ day[8].clouds }}</div>
            </div>
            <div>
                <img src="../../assets/images/visibility.svg" alt="" />
                <div class="details__subtitle">Visibility<br />{{ day[9].visibility }}</div>
            </div>
        </div>
    </collapse>
    <div class="days">
        <div class="day">
            <div
                @click="toggleChild(index)"
                v-for="(day, index) in details"
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
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Breakpoints',
    components: {
        Carousel,
        Slide,
        Navigation,
        Collapse,
    },
    data() {
        let daysData = store.state.forecast.daily.days;

        let details = daysData
            .map((day) => {
                return [
                    { date: `${day.validDate}` },
                    { temp: `${day.temperatureMin} ... ${day.temperatureMax}°C` },
                    { humidity: `${day.humidityRelative} %` },
                    { precipitation: `${day.precipitationProbability} %` },
                    { sunrise: `${day.sunRise}` },
                    { sunset: `${day.sunSet}` },
                    { wind: `${day.windSpeed} m/s ${day.windDirectionAbbr}` },
                    { pressure: `${day.pressure} mmHg` },
                    { clouds: `${day.cloudCoverage} %` },
                    { visibility: `${day.visibility} km` },
                    { icon: `${day.weatherIcon}` },
                    { descriptions: `${day.weatherDescription}` },
                    { time: `${day.timeStamp}` },
                ];
            })
            .slice(0, 16);
        let settings = {
            itemsToShow: 1,
            snapAlign: 'center',
        };
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        let breakpoints = {
            // 700px and up
            700: {
                itemsToShow: 3.5,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 5,
                snapAlign: 'start',
            },
        };

        return { isExpanded: true, settings, breakpoints, details, selected: null as number | null };
    },
    methods: {
        toggleChild(index: number) {
            this.selected = this.selected === index ? null : index;
        },
        switchButton() {
            this.isExpanded = !this.isExpanded;
        },
    },
    computed: {},
});
</script>

<style lang="scss" scoped>
.block__title {
    font-size: 1.5rem;
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
        cursor: pointer;
        &:hover {
            background-color: rgb(228, 228, 228);
        }
    }
    &__img {
        width: 50px;
        height: 50px;
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
            display: flex;
            align-items: center;
            background-color: rgb(228, 228, 228);
            border-radius: 5px;
            width: 300px;
            & > img {
                width: 30px;
                height: 30px;
                margin: 20px;
            }
        }
    }

    &__subtitle {
        font-size: 0.8rem;
        text-align: center;
        width: 80px;
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
    transition: height var(--vc-auto-duration) ease-out;
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

.mode-fade-enter-active,
.no-mode-fade-leave-active {
    transition: opacity 0.5s;
}

.mode-fade-enter-from,
.no-mode-fade-leave-to {
    opacity: 0;
}
</style>

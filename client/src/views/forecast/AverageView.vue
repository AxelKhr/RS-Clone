<template>
    <div class="block__title">{{ langData().average }}</div>
    <div class="average__container">
        <div class="polar__container">
            <PolarArea class="polar" id="MyPolar" :options="chartOptions" :data="chartData"></PolarArea>
        </div>
        <div class="data__container">
            <div class="data__item">
                <img class="data__img" src="../../assets/images/averageHumid.svg" alt="" />
                <div class="data__value">
                    {{ averageHumid }}
                </div>
                <span class="data__text">
                    % <br />
                    <span class="title">{{ langData().humidity }}</span>
                </span>
            </div>
            <div class="data__item">
                <img class="data__img" src="../../assets/images/averageWind.svg" alt="" />
                <div class="data__value">
                    {{ averageWind }}
                </div>
                <span class="data__text">
                    {{ unitData().speed }} <br />
                    <span class="title">{{ langData().wind }}</span>
                </span>
            </div>
            <div class="data__item">
                <img class="data__img" src="../../assets/images/averagePrecip.svg" alt="" />
                <div class="data__value">
                    {{ averageRain + averageSnow }}
                </div>
                <span class="data__text">
                    {{ unitData().precipitation }} <br />
                    <span class="title">{{ langData().precipitation }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChartOptions } from 'chart.js/auto';
import { computed } from 'vue';
import { PolarArea } from 'vue-chartjs';
import { langData } from '../utils/langUtils';
import { unitData } from '../utils/metricUtils';
import 'chartjs-plugin-datalabels';
import store from '@/store';

let daysData = computed(() => {
    return store.state.forecast.daily.days;
});
const averageSunny = computed(() => {
    return daysData.value.filter((day) => day.cloudCoverage < 30);
});
const averageCloudy = computed(() => {
    return daysData.value.filter((day) => day.cloudCoverage >= 30);
});
const averagePrecipProbability = computed(() => {
    return daysData.value.filter((day) => day.precipitationProbability >= 60);
});
const averageHumid = computed(() => {
    return (
        daysData.value.reduce((acc, day) => {
            return acc + day.humidityRelative;
        }, 0) / daysData.value.length
    ).toFixed(0);
});
const averageWind = computed(() => {
    return (
        daysData.value.reduce((acc, day) => {
            return acc + day.windSpeed;
        }, 0) / daysData.value.length
    ).toFixed(1);
});
const averageRain = computed(() => {
    return +(
        daysData.value.reduce((acc, day) => {
            return acc + day.precip;
        }, 0) / daysData.value.length
    ).toFixed(0);
});
const averageSnow = computed(() => {
    return +(
        daysData.value.reduce((acc, day) => {
            return acc + day.snow;
        }, 0) / daysData.value.length
    ).toFixed(0);
});

let lang = langData();

interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

interface ChartDataset {
    label: string;
    data: number[];
    fill?: boolean;
    backgroundColor: string[];
}

const chartData = computed<ChartData>(() => {
    return {
        labels: [lang.clear, lang.prec_day, lang.cloudy_day],
        datasets: [
            {
                label: lang.temperature,
                data: [averageSunny.value.length, averagePrecipProbability.value.length, averageCloudy.value.length],
                fill: true,
                backgroundColor: ['rgba(254, 188, 0, 0.5)', 'rgba(142, 191, 226, 0.5)', 'rgba(38, 132, 210, 0.5)'],
            },
        ],
    };
});

const chartOptions: ChartOptions<'polarArea'> = {
    responsive: true,

    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 25,
                boxHeight: 25,
                font: {
                    size: 14,
                },
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
    },
};
</script>
<style lang="scss" scoped>
.block__title {
    display: inline-block;
    width: 25%;
    padding: 5px 20px;
    padding-right: 20px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 1.5rem;
    box-shadow: 2px 2px 2px -1px rgba(0, 0, 0, 0.2);
}
.average__container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 40px;
    margin-top: -30px;
}
.polar__container {
    height: 400px;
    width: 400px;
}

.data__container {
    display: grid;
    width: 40%;
    grid-template-rows: 1fr 1fr 1fr;
    margin-left: 10px;
}
.data__item {
    width: 60%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-right: 50px;
    margin-bottom: 30px;
}
.data__img {
    margin-right: 10px;
    height: 40px;
    width: 40px;
}
.data__value {
    font-size: 2rem;
    margin-right: 10px;
}

@media (max-width: 750px) {
    .data__img {
        height: 35px;
        width: 35px;
    }
    .data__value {
        font-size: 1.1rem;
        margin-right: 10px;
    }
    .data__item {
        width: unset;
    }
    .polar__container {
        margin-top: -50px;
        height: 400px;
        width: 400px;
    }
    .data__container {
        width: 100%;
        margin-top: -50px;
        grid-template-rows: unset;
        grid-template-columns: 1fr 1fr 1fr;
        margin-left: 0;
    }
}
@media (max-width: 720px) {
    .block__title {
        width: 50%;
        padding: 5px 20px;
        padding-right: 20px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        font-size: 1.5rem;
        margin-bottom: 20px;
        box-shadow: 2px 2px 2px -1px rgba(0, 0, 0, 0.2);
    }
}

@media (max-width: 650px) {
    .data__img {
        height: 25px;
        width: 25px;
    }
    .data__value {
        font-size: 1rem;
        margin-right: 10px;
    }
    .average__container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        margin-left: 40px;
        margin-top: -10px;
    }
    .data__container {
        width: 40%;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: unset;
    }
    .data__item {
        margin: unset;
        margin-bottom: 5px;
    }

    .polar__container {
        width: 400px;
        height: 300px;
    }
}

@media (max-width: 530px) {
    .average__container {
        flex-wrap: wrap;
    }

    .data__container {
        width: 100%;
        margin-top: -50px;
        grid-template-columns: 1fr 1fr 1fr;
        margin-left: 0;
    }
}

@media (max-width: 450px) {
    .average__container {
        margin-left: 15px;
    }
    .title {
        display: none;
    }
    .data__item {
        margin: 0 auto;
    }
    .block__title {
        font-size: 1rem;
    }
}
@media (max-width: 330px) {
    .polar__container {
        width: 390px;
        height: 270px;
    }
}
</style>

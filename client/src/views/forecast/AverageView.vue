<template>
    <div class="average__container">
        <div style="height: 400px; width: 500px" class="polar__container">
            <canvas id="MyPolar"></canvas>
        </div>
        <div class="data__container">
            <div class="data__item">
                <img class="data__img" src="../../assets/images/averageHumid.svg" alt="" />
                <div class="data__value">
                    {{ averageHumid }}
                </div>
                <span class="data__text">
                    % <br />
                    влажность воздуха</span
                >
            </div>
            <div class="data__item">
                <img class="data__img" src="../../assets/images/averageWind.svg" alt="" />
                <div class="data__value">
                    {{ averageWind }}
                </div>
                <span class="data__text">
                    м/с <br />
                    ветер</span
                >
            </div>
            <div class="data__item">
                <img class="data__img" src="../../assets/images/averagePrecip.svg" alt="" />
                <div class="data__value">
                    {{ averageRain + averageSnow }}
                </div>
                <span class="data__text"> мм <br />осадков</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';

import { onMounted, ref } from 'vue';
import { ChartConfiguration } from 'chart.js';
import { langData } from '../utils/langUtils';
import 'chartjs-plugin-datalabels';
import store from '@/store';
let daysData = store.state.forecast.daily.days;
const averageSunny = daysData.filter((day) => day.cloudCoverage < 30);
const averageCloudy = daysData.filter((day) => day.cloudCoverage >= 30);
const averagePrecipProbability = daysData.filter((day) => day.precipitationProbability >= 60);
const averageHumid = (
    daysData.reduce((acc, day) => {
        return acc + day.humidityRelative;
    }, 0) / daysData.length
).toFixed(0);
const averageWind = (
    daysData.reduce((acc, day) => {
        return acc + day.windSpeed;
    }, 0) / daysData.length
).toFixed(1);
const averageRain = +(
    daysData.reduce((acc, day) => {
        return acc + day.precip;
    }, 0) / daysData.length
).toFixed(0);
const averageSnow = +(
    daysData.reduce((acc, day) => {
        return acc + day.snow;
    }, 0) / daysData.length
).toFixed(0);

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

const chartData: ChartData = {
    labels: ['ясных дней', 'дней с осадками', 'облачных дней'],
    datasets: [
        {
            label: lang.temperature,
            data: [averageSunny.length, averagePrecipProbability.length, averageCloudy.length],
            fill: true,
            backgroundColor: ['rgba(254, 188, 0, 0.5)', 'rgba(142, 191, 226, 0.5)', 'rgba(38, 132, 210, 0.5)'],
        },
    ],
};

const chartConfig = ref<ChartConfiguration>({
    type: 'polarArea',
    data: chartData,
    options: {
        responsive: true,

        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 40,
                    boxHeight: 40,
                    font: {
                        size: 16,
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            title: {
                display: true,
                text: '',
            },
        },
    },
});

onMounted(() => {
    const canvasTag = document.getElementById('MyPolar') as HTMLCanvasElement;
    new Chart(canvasTag, chartConfig.value);
});
</script>
<style lang="scss" scoped>
.average__container {
    margin-top: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}
.polar__container {
    display: flex;
    align-items: center;
}

.data__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    margin-left: 50px;
}
.data__item {
    display: flex;
    align-items: center;
    margin-right: 50px;
    margin-bottom: 30px;
}
.data__img {
    margin-right: 10px;
    height: 70px;
    width: 70px;
}
.data__value {
    font-size: 3rem;
    margin-right: 10px;
}
</style>

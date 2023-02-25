develop
<template>
    <div class="btn-container">
        <div class="btn-chart" @click="selectedCategory = 'temperature'">
            <img src="@/assets/images/temperature.svg" alt="" />
        </div>
        <div class="btn-chart" @click="selectedCategory = 'precipitation'">
            <img src="@/assets/images/precipitation.svg" alt="" />
        </div>
        <div class="btn-chart" @click="selectedCategory = 'wind'">
            <img src="@/assets/images/wind.svg" alt="" />
        </div>
    </div>
    <div style="height: 400px; width: 100%">
        <canvas id="MyChart"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { onMounted, ref, watch } from 'vue';
import { ChartConfiguration } from 'chart.js';
import { langData } from '../utils/langUtils';
import 'chartjs-plugin-datalabels';
import store from '@/store';
import { unitData } from '../utils/metricUtils';
let hoursData = store.state.forecast.hourly.hours;
let unit = unitData();
let lang = langData();
Chart.register(ChartDataLabels);
interface ChartData {
    [key: string]: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            fill: boolean;
            borderColor: string;
            tension: number;
            stepped?: string;
        }[];
    };
}

const chartData: ChartData = {
    temperature: {
        labels: hoursData.map((el) => el.timeStampLocal.slice(-8, -3)),
        datasets: [
            {
                label: lang.temperature + ' ' + unit.temperature,
                data: hoursData.map((el) => el.temperature),
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
            },
        ],
    },
    precipitation: {
        labels: hoursData.map((el) => el.timeStampLocal.slice(-8, -3)),
        datasets: [
            {
                label: lang.precipitation + ' ' + 'TODO unit.precipitation',
                data: hoursData.map((el) => el.precipitationProbability),
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.4,
                stepped: 'middle',
            },
        ],
    },
    wind: {
        labels: hoursData.map((el) => el.timeStampLocal.slice(-8, -3)),
        datasets: [
            {
                label: lang.wind + ' ' + 'TODO unit.wind',
                data: hoursData.map((el) => +el.windSpeed.toFixed(1)),
                fill: true,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.4,
            },
        ],
    },
};

const selectedCategory = ref('temperature');

const chartConfig = ref<ChartConfiguration>({
    type: 'line',
    data: chartData[selectedCategory.value],
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            datalabels: {
                color: 'black',
                font: {
                    weight: 'bold',
                },
                anchor: 'end',
                align: 'start',
                offset: -20,
            },
        },
        scales: {
            y: {
                display: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
});

onMounted(() => {
    const canvasTag = document.getElementById('MyChart') as HTMLCanvasElement;
    const chart = new Chart(canvasTag, chartConfig.value);

    // Watch for changes in selectedCategory and update the chart data
    watch(
        function () {
            return selectedCategory.value;
        },
        function () {
            chart.data = chartData[selectedCategory.value];
            chart.update();
        }
    );
});
</script>
<style lang="scss" scoped>
.btn-container {
    margin-top: 10px;
    margin-left: 20px;
    width: 100%;
    display: flex;
    column-gap: 10px;
    justify-content: start;
}

.btn-chart {
    width: 45px;
    height: 45px;
    padding: 5px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    box-shadow: 4px 4px 7px -2px rgba(34, 60, 80, 0.2);

    &:hover {
        background-color: rgb(228, 228, 228);
    }

    &:active {
        background-color: rgb(205, 205, 205);
    }
}
.active {
    background-color: aliceblue;
}
</style>

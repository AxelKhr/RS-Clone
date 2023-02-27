<template>
    <div class="btn-container" @click="toggleActive">
        <div class="btn-chart active" @click="activeButton = 'temperature'">
            <img src="@/assets/images/temperature.svg" alt="" />
        </div>
        <div class="btn-chart" @click="activeButton = 'precipitation'">
            <img src="@/assets/images/precipitation.svg" alt="" />
        </div>
        <div class="btn-chart" @click="activeButton = 'wind'">
            <img src="@/assets/images/wind.svg" alt="" />
        </div>
    </div>
    <div class="chart">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>

<script lang="ts">
import { Chart } from 'chart.js/auto';
import { defineComponent } from 'vue';
import store from '@/store';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { langData } from '../utils/langUtils';
import { ChartOptions } from 'chart.js/auto';
import { ChartData } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { unitData } from '../utils/metricUtils';
Chart.register(ChartDataLabels);
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

interface ChartArr {
    temperature: ChartData<'line'>;
    precipitation: ChartData<'line'>;
    wind: ChartData<'line'>;
}

export default defineComponent({
    name: 'LineChart',
    components: { Line },
    data() {
        return {
            activeButton: 'temperature',
        };
    },
    methods: {
        toggleActive(e: Event) {
            const target = e.target as HTMLElement;
            const elem = target.closest('div');
            const el = document.querySelectorAll('.btn-chart');
            el.forEach((el) => el.classList.remove('active'));
            elem?.classList.add('active');
        },
    },
    computed: {
        chartData(): ChartData<'line'> {
            let unit = unitData();
            let lang = langData();
            let hoursData = store.state.forecast.hourly.hours;
            let result: ChartArr = {
                temperature: {
                    labels: hoursData.map((el) => el.timeStampLocal.slice(-8, -3)),
                    datasets: [
                        {
                            label: lang.temperature + ', ' + unit.temperature,
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
                            label: lang.precipitation + ' ' + unit.precipitation,
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
                            label: lang.wind + ', ' + unit.speed,
                            data: hoursData.map((el) => +el.windSpeed.toFixed(1)),
                            fill: true,
                            borderColor: 'rgb(54, 162, 235)',
                            tension: 0.4,
                        },
                    ],
                },
            };
            return result[this.activeButton as keyof ChartArr];
        },

        chartOptions(): ChartOptions<'line'> {
            return {
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
                            size: 8,
                            weight: 'bold',
                        },
                        anchor: 'end',
                        align: 'start',
                        offset: -20,
                        display: true,
                    },
                },
                scales: {
                    y: {
                        display: false,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
            };
        },
    },
});
</script>

<style lang="scss" scoped>
.btn-container {
    margin-top: 10px;
    margin-left: 20px;
    width: max-content;
    display: flex;
    column-gap: 10px;
    justify-content: start;
}

.chart {
    height: 400px;
    width: 100%;
    margin-bottom: 60px;
    padding: 35px;
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
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2) inset;
}

@media (max-width: 450px) {
    .btn-container {
        margin: 0 auto;
        width: 80%;
    }

    .btn-chart {
        width: 35px;
        height: 35px;
    }
    .chart {
        height: 300px;
        margin-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        padding-top: 10px;
    }
}
</style>

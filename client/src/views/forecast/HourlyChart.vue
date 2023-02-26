<template>
    <div class="btn-container">
        <div class="btn-chart" @click="activeButton = 'temperature'">
            <img src="@/assets/images/temperature.svg" alt="" />
        </div>
        <div class="btn-chart" @click="activeButton = 'precipitation'">
            <img src="@/assets/images/precipitation.svg" alt="" />
        </div>
        <div class="btn-chart" @click="activeButton = 'wind'">
            <img src="@/assets/images/wind.svg" alt="" />
        </div>
    </div>
    <div style="height: 400px; width: 100%">
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
            };
        },
    },
});
</script>

<style lang="scss" scoped>
.btn-container {
    width: 100px;
    display: flex;
    justify-content: space-between;
}

.btn-chart {
    width: 30px;
    height: 30px;
    padding: 3px;
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
</style>

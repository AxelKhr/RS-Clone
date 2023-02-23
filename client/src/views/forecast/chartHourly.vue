<!-- Поковыряться с настройками графика что б был более пологий  и с текущего времени-->
<!-- слайдер докрутить добавить коллапс-->
<!-- маленькие окна сделать  -->
<template>
    <div class="btn-container">
        <div class="btn-chart" @click="selectedCategory = 'temperature'">
            <img src="@/assets/images/temperature.svg" alt="" />
        </div>
        <div class="btn-chart" @click="selectedCategory = 'pressure'">
            <img src="@/assets/images/pressure.svg" alt="" />
        </div>
        <div class="btn-chart" @click="selectedCategory = 'wind'">
            <img src="@/assets/images/wind.svg" alt="" />
        </div>
    </div>
    <canvas id="MyChart" height="500" width="1200"></canvas>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted, ref, watch } from 'vue';
import { ChartConfiguration } from 'chart.js';
import 'chartjs-plugin-datalabels';
import store from '@/store';
let hoursData = store.state.forecast.hourly.hours;
console.log('hoursData :>> ', hoursData);
const labels = [
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
];

interface ChartData {
    [key: string]: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            fill: boolean;
            borderColor: string;
            tension: number;
            pointLabel?: any;
        }[];
    };
}

const chartData: ChartData = {
    temperature: {
        labels: labels,
        datasets: [
            {
                label: 'Temperature',
                data: hoursData.map((el) => el.temperature),
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
                pointLabel: function (context: any) {
                    return context.parsed.y;
                },
            },
        ],
    },
    pressure: {
        labels: labels,
        datasets: [
            {
                label: 'Pressure',
                data: hoursData.map((el) => el.pressure),
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.4,
            },
        ],
    },
    wind: {
        labels: labels,
        datasets: [
            {
                label: 'Wind',
                data: hoursData.map((el) => el.windSpeed),
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
            datalabels: {
                display: function (context) {
                    return context.dataset.data[context.dataIndex] !== null;
                },
                color: 'white',
                font: {
                    weight: 'bold',
                },
                formatter: (value) => {
                    return `${value}°C`;
                },
                anchor: 'end',
                align: 'start',
                offset: 8,
            },
        },
        scales: {
            y: {
                display: true,
                max: 10,
                min: -10,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        aspectRatio: 5 / 3,
        layout: {
            padding: {
                top: 32,
                right: 16,
                bottom: 16,
                left: 8,
            },
        },
        elements: {
            line: {
                fill: false,
                tension: 0.4,
            },
        },

        interaction: {
            mode: 'index',
            intersect: false,
        },
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

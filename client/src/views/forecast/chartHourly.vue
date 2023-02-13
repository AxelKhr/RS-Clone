<template>
    <div class="btn-container">
        <div class="btn-chart">
            <img src="@/assets/images/temperature.svg" alt="" />
        </div>
        <div class="btn-chart">
            <img src="@/assets/images/precipitation.svg" alt="" />
        </div>
        <div class="btn-chart">
            <img src="@/assets/images/wind.svg" alt="" />
        </div>
    </div>
    <canvas id="MyChart" height="500" width="1200"></canvas>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';
import { ChartConfiguration } from 'chart.js';
import 'chartjs-plugin-datalabels';

const labels = [
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
];

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Temperature',
            data: [-5, -5, -2, -2, -2, 0, 0, 0, 3, 7, 7, 7, 12, 16, 16, 15, 12, 12, 12, 10, 8, 8, 8, 7],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4,
        },

        /*      {
            label: 'Wind',
            data: [5, 5, 6, 7, 7, 10, 8, 8, 7, 7, 7, 6, 7],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4,
        }, */
    ],
};

const config: ChartConfiguration = {
    type: 'line',
    data: data,
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
                formatter: Math.round,
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
};

onMounted(() => {
    const canvasTag = document.getElementById('MyChart') as HTMLCanvasElement;
    new Chart(canvasTag, config);
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

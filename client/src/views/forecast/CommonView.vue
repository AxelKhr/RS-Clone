<template>
    <tabs-list />
    <template v-if="$store.state.forecast.isDataReady">
        <current-view />
        <today-view />
        <daily-view />
        <average-view />
        <hourly-view />
    </template>
</template>

<script lang="ts">
import DailyView from './DailyView.vue';

import TodayView from './TodayView.vue';
import CurrentView from './CurrentView.vue';
import HourlyView from './HourlyView.vue';
import AverageView from './AverageView.vue';
import TabsList from '@/components/TabsList.vue';
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
    components: {
        TabsList,
        TodayView,
        DailyView,
        CurrentView,
        HourlyView,
        AverageView,
    },
    mounted() {
        store.dispatch('forecast/updateForecast');
    },
});
</script>

<style>
.carousel__viewport {
    margin: 0 auto;
    width: 85%;
}
.carousel__prev {
    margin-right: 30px;
}
</style>

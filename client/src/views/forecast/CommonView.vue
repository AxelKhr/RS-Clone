<template>
    <tabs-list />
    <button @click="$store.dispatch('forecast/updateForecast')">Update</button>
    <template v-if="$store.state.forecast.isDataReady">
        <current-view />
        <today-view />
        <daily-view />
        <hourly-view />
    </template>
</template>

<script lang="ts">
import DailyView from './DailyView.vue';
import TodayView from './TodayView.vue';
import CurrentView from './CurrentView.vue';
import HourlyView from './HourlyView.vue';
import TabsList from '@/components/TabsList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        TabsList,
        TodayView,
        DailyView,
        CurrentView,
        HourlyView,
    },
});
</script>

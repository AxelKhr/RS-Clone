<template>
    <current-view />
    <today-view />
    <daily-view />
    <hourly-view />
    <!--     <test-vue /> -->
</template>

<script lang="ts">
import DailyView from './DailyView.vue';
import TodayView from './TodayView.vue';
import CurrentView from './CurrentView.vue';
import HourlyView from './HourlyView.vue';
/* import TestVue from './TestVue.vue'; */
import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        TodayView,
        DailyView,
        CurrentView,
        HourlyView,
        /*   TestVue, */
    },
});
</script>

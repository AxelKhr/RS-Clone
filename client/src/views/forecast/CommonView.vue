<template>
    <current-view />
    <today-view />
    <daily-view />
    <!--     <test-vue /> -->
</template>

<script lang="ts">
import DailyView from './DailyView.vue';
import TodayView from './TodayView.vue';
import CurrentView from './CurrentView.vue';
/* import TestVue from './TestVue.vue'; */
export default {
    components: {
        TodayView,
        DailyView,
        CurrentView,
        /*   TestVue, */
    },
};
</script>

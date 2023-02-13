<template>
    <div class="block__title">Hourly Forecast</div>
    <chart-hourly />
</template>

<script lang="ts">
import store from '@/store';
import chartHourly from '@/views/forecast/chartHourly.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components: { chartHourly },
});
</script>

<style lang="scss" scoped>
.block__title {
    font-size: 1.5rem;
}
</style>

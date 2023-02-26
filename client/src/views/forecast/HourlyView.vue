<template>
    <div class="block__title">{{ lang.hourly }}</div>
    <hourly-chart />
</template>

<script lang="ts">
import HourlyChart from './HourlyChart.vue';
import { defineComponent } from 'vue';
import { langData } from '../utils/langUtils';
export default defineComponent({
    components: { HourlyChart },
    data() {
        let lang = langData();
        return {
            lang,
        };
    },
});
</script>

<style lang="scss" scoped>
.block__title {
    margin-top: 50px;
    font-size: 1.5rem;
}
</style>

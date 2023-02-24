<template>
    <div class="block__title">{{ lang.hourly }}</div>
    <chart-hourly />
</template>

<script lang="ts">
import chartHourly from '@/views/forecast/chartHourly.vue';
import { defineComponent } from 'vue';
import { langData } from '../utils/langUtils';
export default defineComponent({
    components: { chartHourly },
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

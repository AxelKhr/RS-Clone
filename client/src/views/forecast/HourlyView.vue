<template>
    <div class="block__title">{{ lang.hourly }}</div>
    <hourly-chart />
</template>

<script lang="ts">
import HourlyChart from './HourlyChart.vue';
import { defineComponent } from 'vue';
import { langData } from '../utils/langUtils';
export default defineComponent({
    name: 'hourly-view',
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
    display: inline-block;
    width: 25%;
    padding: 5px 20px;
    padding-right: 60px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 1.5rem;
    margin-bottom: 20px;
    box-shadow: 2px 2px 2px -1px rgba(34, 60, 80, 0.2);
}

@media (max-width: 720px) {
    .block__title {
        width: 50%;
        padding: 5px 20px;
        padding-right: 60px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        font-size: 1.5rem;
        margin-bottom: 20px;
        box-shadow: 2px 2px 2px -1px rgba(34, 60, 80, 0.2);
    }
}

@media (max-width: 450px) {
    .block__title {
        font-size: 1rem;
    }
}
</style>

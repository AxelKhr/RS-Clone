<template>
    <div class="timezone">
        <p>{{ currentTime.toLocaleString($store.state.settings.languageCurrent, options) }}.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
export default defineComponent({
    data() {
        return {
            currentTime: new Date(),
            options: {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: store.state.forecast.current.timeZone,
            },
        };
    },
    mounted() {
        setInterval(() => {
            this.currentTime = new Date();
        }, 1000);
    },
});
</script>

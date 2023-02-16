<template>
    <div class="timezone">
        <!-- ругается но вроде все правильно отображает -->
        <p>{{ currentTime.toLocaleString('en-GB', options) }}.</p>
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
                locales: 'en-GB',
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

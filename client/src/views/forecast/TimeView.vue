<template>
    <div class="timezone">
        <p>
            {{
                currentTime.toLocaleString(
                    $store.state.settings.languageCurrent,
                    getTime.options as Intl.DateTimeFormatOptions
                )
            }}.
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
export default defineComponent({
    data() {
        return {
            currentTime: new Date(),
        };
    },
    mounted() {
        setInterval(() => {
            this.currentTime = new Date();
        }, 1000);
    },
    computed: {
        getTime() {
            return {
                options: {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: store.state.forecast.current.timeZone,
                },
            };
        },
    },
});
</script>

<style scoped>
.timezone p {
    font-weight: 700;
}
</style>

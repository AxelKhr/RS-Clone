<template>
    <div class="timezone">
        <p>
            {{
                currentTime.toLocaleString($store.state.settings.languageCurrent, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                })
            }}
        </p>
        <p>
            {{
                currentTime.toLocaleString($store.state.settings.languageCurrent, {
                    hour: 'numeric',
                    minute: 'numeric',
                })
            }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
});
</script>

<style scoped>
.timezone p {
    font-weight: 700;
    text-align: right;
}

@media (max-width: 800px) {
    .list-wrap {
        flex-wrap: wrap;
    }
    .time {
        width: 100%;
        margin-bottom: 10px;
    }

    .timezone {
        display: flex;
        flex-direction: row;
        column-gap: 25px;
        justify-content: center;
    }
}
</style>

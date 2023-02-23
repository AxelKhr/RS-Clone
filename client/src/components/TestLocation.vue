<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
    <div class="block">
        <div class="block__buttons">
            <div class="block__text">{{ $store.state.forecast.isLoading }}</div>
            <div>
                <button class="block__button" @click="$store.dispatch('forecast/showModal')">Location</button>
            </div>
        </div>
        <div class="test-box transition-theme"></div>
    </div>
</template>

<style lang="scss" scoped>
.block {
    .block {
        &__buttons {
            width: 300px;
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: lightseagreen;
            padding: 10px;
        }

        &__text {
            font-size: 1.5rem;
        }

        &__button {
            border: none;
            padding: 5px 10px;
            border-radius: 10px;

            &:hover {
                background: lightblue;
            }
        }
    }

    .test-box {
        height: 100px;
        background: var(--background__colour);
    }
}
</style>

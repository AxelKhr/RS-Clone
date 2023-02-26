<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    computed: {
        ...mapState('language', {
            langData: 'data',
        }),
    },
});
</script>

<template>
    <div class="container">
        <div class="wrap">
            <div class="start">
                <p class="start__text">{{ langData.startText }}</p>
                <button class="start__button" @click="$store.dispatch('forecast/showModal')">
                    {{ langData.startButton }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding-top: 40px;
    .start {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        max-width: 300px;
        padding: 10px;

        .start {
            &__text {
                font-size: 1.2rem;
                margin-bottom: 10px;
                text-align: center;
            }
            &__button {
                font-family: inherit;
                font-size: 1.2rem;
                color: var(--font__color);
                border: 1px solid var(--border__color);
                border-radius: 20px;
                background-color: var(--background__color);
                padding: 8px 20px;

                &:hover {
                    cursor: pointer;
                    background-color: var(--background__color--hover);
                }

                &:active {
                    background-color: var(--background__color--active);
                }
            }
        }
    }
}
</style>

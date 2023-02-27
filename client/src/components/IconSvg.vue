<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    props: {
        iconPath: {
            type: String,
        },
    },

    setup(props) {
        const href = computed(() => `${props.iconPath}#icon`);
        return {
            href,
        };
    },
});
</script>

<template>
    <svg class="icon">
        <use v-bind:xlink:href="href" />
    </svg>
</template>

<style lang="scss" scoped>
.icon {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    fill: currentColor;
    stroke: none;
    vertical-align: middle;
}
</style>

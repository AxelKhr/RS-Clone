<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'loader-icon',
    props: {
        isEnable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        className() {
            return { 'anim--enable': this.isEnable };
        },
    },
});
</script>

<template>
    <div class="loader-icon" :class="className"></div>
</template>

<style lang="scss">
.loader-icon {
    display: inline-block;
    position: relative;
    width: 24px;
    height: 24px;

    &:before,
    &:after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-width: 4px;
        border-style: solid;
        border-radius: 50%;
        border-color: transparent;
    }
}

.anim--enable {
    &:before {
        border-color: var(--font__color);
        opacity: 0.8;
    }

    &:after {
        animation: loader-anim 800ms infinite linear;
        border-right-color: var(--background__color);
        opacity: 0.8;
    }
}

@keyframes loader-anim {
    0% {
        transform: rotate(-90deg);
    }

    100% {
        transform: rotate(270deg);
    }
}
</style>

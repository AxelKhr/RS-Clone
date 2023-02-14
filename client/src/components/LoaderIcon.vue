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
        border-color: rgb(220, 220, 220);
    }

    &:after {
        animation: loader-anim 500ms infinite linear;
        border-right-color: rgb(120, 120, 120);
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

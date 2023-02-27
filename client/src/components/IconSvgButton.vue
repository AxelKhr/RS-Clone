<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        iconPath: {
            type: String,
        },
    },
});
</script>

<template>
    <div class="icon-button">
        <icon-svg class="icon-button__icon" :iconPath="iconPath"></icon-svg>
        <div class="icon-button__label" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.icon-button {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    border: 1px solid transparent;

    .icon-button__icon {
        transition: all 0.2s ease-in-out;
    }

    &:hover {
        background-color: var(--background__color--hover);
        border-color: var(--font__color);

        .icon-button__icon {
            transform: scale(1.2);
        }
    }

    .icon-button__label {
        margin-left: 5px;
    }
}
</style>

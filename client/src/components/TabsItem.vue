<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'tabs-item',
    props: {
        title: {
            type: String,
            default: '',
        },
        isNew: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<template>
    <div class="item">
        <template v-if="isNew">
            <icon-svg-button class="item__icon" :iconPath="require('@/assets/icons/_plus.svg')"></icon-svg-button>
        </template>
        <template v-else>
            <p class="item__text">{{ title }}</p>
            <icon-svg-button class="item__icon" :iconPath="require('@/assets/icons/_cross.svg')"></icon-svg-button>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.item {
    display: flex;
    align-items: center;
    width: auto;
    padding: 5px;
    font-size: 1rem;
    border: 1px solid var(--border__color);
    // border-radius: 10px 10px 0 0;
    border-radius: 10px;
    // border-bottom: none;
    &:hover:not(.item__icon) {
        background-color: var(--background__color--hover);
        cursor: pointer;
    }
    &:active {
        background-color: var(--background__color--active);
    }

    &__text {
        padding: 0 5px;
    }

    &__icon {
        width: 28px;
        height: 28px;
    }
}
</style>

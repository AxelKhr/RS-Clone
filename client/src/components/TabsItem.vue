<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'tabs-item',
    data() {
        return {
            activeClass: 'item--active',
        };
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        isNew: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        submit() {
            this.$emit('closeTab');
            this.$emit('addTab');
        },
    },
});
</script>

<template>
    <div class="item" :class="[isActive ? activeClass : '']">
        <template v-if="isNew">
            <icon-svg-button
                class="item__icon"
                :iconPath="require('@/assets/icons/_plus.svg')"
                @click.stop="$emit('addTab')"
            ></icon-svg-button>
        </template>
        <template v-else>
            <p class="item__text">{{ title }}</p>
            <icon-svg-button
                class="item__icon"
                :iconPath="require('@/assets/icons/_cross.svg')"
                @click.stop="$emit('closeTab')"
            ></icon-svg-button>
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
    border-radius: 10px;
    &:hover:not(.item__icon) {
        background-color: var(--background__color--hover);
        cursor: pointer;
    }
    &:active {
        background-color: var(--background__color--active);
    }
    &--active {
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

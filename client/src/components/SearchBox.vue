<script lang="ts">
import { defineComponent } from 'vue';
import LoaderIcon from './LoaderIcon.vue';

export default defineComponent({
    name: 'search-box',
    components: { LoaderIcon },
    props: {
        modelValue: {
            type: String,
        },

        isLoading: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        updateInput(event: Event) {
            if (event.target) {
                this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
            }
        },
    },
});
</script>

<template>
    <div class="search-box">
        <icon-svg class="search-box__icon" :iconPath="require('@/assets/icons/_search.svg')" />
        <input
            class="search-box__input"
            type="text"
            :value="modelValue"
            @input="updateInput"
            autocomplete="off"
            v-bind="$attrs"
        />
        <loader-icon :isEnable="isLoading" class="search-box__loader-icon" />
    </div>
</template>

<style lang="scss">
.search-box {
    display: flex;
    align-items: center;

    &__input {
        flex: 1 0 0%;
        width: 100%;
        font-size: 1rem;
        padding: 5px;
        border: none;
        outline: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: var(--font__color);
        background-color: var(--background__color);

        &::placeholder {
            color: var(--font__color);
            opacity: 0.4;
        }
    }
}
</style>

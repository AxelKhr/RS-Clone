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
    <div class="search-box" layout="row center-justify">
        <img class="search-box__icon" alt="Searchsearch icon" src="@/assets/icons/search.svg" width="24" height="24" />
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
    display: inline-flex;
    align-items: center;
    width: 100%;

    &__input {
        flex: 1 1 auto;
        font-size: 1rem;
        padding: 5px;
        border: none;
        outline: none;
    }
}
</style>

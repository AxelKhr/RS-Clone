<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'settings-block',
    props: {
        title: {
            type: String,
        },
    },
});
</script>

<template>
    <div class="settings-block">
        <p class="settings-block__title">{{ title }}</p>
        <div class="settings-block__content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settings-block {
    .settings-block {
        &__title {
            margin-bottom: 10px;
            font-size: 1.2rem;
        }
        &__content {
            margin: 0 auto;
            margin-bottom: 10px;
            max-width: 100%;
        }
    }
}
</style>

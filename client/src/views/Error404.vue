<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'page-404',
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
            <div class="block">
                <div class="block__text">{{ langData.page404 }}</div>
                <icon-svg class="block__icon" :iconPath="require('@/assets/icons/_404.svg')" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding-top: 40px;
    .block {
        max-width: 300px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        .block {
            &__text {
                font-size: 1.5rem;
                text-align: center;
                margin-bottom: 10px;
            }
            &__icon {
                margin: 0 auto;
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>

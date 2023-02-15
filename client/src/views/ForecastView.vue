<template>
    <div class="container">
        <div class="forecast">
            <Suspense>
                <template #default>
                    <CommonVue />
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script lang="ts">
import CommonVue from './forecast/CommonView.vue';
export default {
    components: {
        CommonVue,
    },
};
</script>

<style scoped>
.forecast {
    padding-top: 40px;
    width: 100%;
}
</style>

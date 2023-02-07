<template>
    <div class="forecast">
        <Suspense>
            <template #default>
                <CommonVue />
            </template>
        </Suspense>
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

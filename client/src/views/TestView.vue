<script lang="ts">
import { defineComponent } from 'vue';
import TestStorage from '@/components/TestStorage.vue';
import TestLocation from '@/components/TestLocation.vue';
import TestCurrent from '@/components/TestCurrent.vue';

export default defineComponent({
    components: { TestStorage, TestLocation, TestCurrent },
});
</script>

<template>
    <div class="container">
        <div class="wrap">
            <div>
                <TestStorage />
                <TestLocation />
                <TestCurrent />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding-top: 40px;
}
</style>

<script setup lang="ts">
import TestStorage from '@/components/TestStorage.vue';
import TestLocation from '@/components/TestLocation.vue';
import TestCurrent from '@/components/TestCurrent.vue';
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

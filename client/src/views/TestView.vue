<script lang="ts">
import { defineComponent } from 'vue';
import TestStorage from '@/components/TestStorage.vue';
import TestLocation from '@/components/TestLocation.vue';
import TestCurrent from '@/components/TestCurrent.vue';
import LocationModal from '@/components/LocationModal.vue';

export default defineComponent({
    components: { TestStorage, TestLocation, TestCurrent, LocationModal },
});
</script>

<template>
    <div class="container">
        <div class="wrap">
            <div>
                <TestStorage />
                <TestLocation />
                <TestCurrent />
                <location-modal v-model:isShow="$store.state.location.isShowModal" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding-top: 40px;
}
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import TabsItem from './TabsItem.vue';
import store from '@/store';

export default defineComponent({
    name: 'tabs-list',
    components: { TabsItem },
    setup() {
        const locationCurrent = computed(() => store.state.forecast.location);
        const locationsTabs = computed(() => store.state.settings.locationTabs);
        return { locationCurrent, locationsTabs };
    },
});
</script>

<template>
    <ul class="list">
        <li
            class="list__item"
            v-for="tab in locationsTabs"
            :key="tab.id"
            @click="$store.dispatch('forecast/setLocation', tab)"
        >
            <tabs-item
                :title="tab.name"
                :isActive="locationCurrent.id === tab.id"
                @close-tab="$store.dispatch('forecast/removeTab', tab)"
            >
            </tabs-item>
        </li>
        <tabs-item isNew @add-tab="$store.dispatch('forecast/showModal')"> </tabs-item>
    </ul>
</template>

<style lang="scss" scoped>
.list {
    display: flex;
    column-gap: 5px;
    padding-bottom: 10px;
}
</style>

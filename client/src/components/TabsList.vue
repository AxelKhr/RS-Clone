<script lang="ts">
import { defineComponent, computed } from 'vue';
import TabsItem from './TabsItem.vue';
import CurTime from '@/views/forecast/CurTime.vue';
import store from '@/store';

export default defineComponent({
    name: 'tabs-list',
    components: { TabsItem, CurTime },
    setup() {
        const locationCurrent = computed(() => store.state.forecast.location);
        const locationsTabs = computed(() => store.state.settings.locationTabs);
        return { locationCurrent, locationsTabs };
    },
});
</script>

<template>
    <div class="list-wrap">
        <div class="time">
            <cur-time />
        </div>
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
    </div>
</template>

<style lang="scss" scoped>
.list-wrap {
    margin-bottom: 5px;
    min-height: 80px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-between;
}
.list {
    display: flex;
    column-gap: 5px;
    padding-bottom: 10px;
}
.time {
    width: 15%;
    text-transform: uppercase;
    padding: 5px;
    padding-right: 15px;
    border-bottom-left-radius: 10px;
    font-size: 1.2rem;
    box-shadow: -2px 2px 2px -1px rgba(34, 60, 80, 0.2);
}
</style>

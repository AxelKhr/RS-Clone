<script lang="ts">
import { defineComponent } from 'vue';
import TabsItem from './TabsItem.vue';

export default defineComponent({
    name: 'tabs-list',
    components: { TabsItem },
    setup() {
        const list = ['Location1', 'Location2', 'Location3', 'Location4'];
        return { list };
    },
});
</script>

<template>
    <ul class="list">
        <li class="list__item" v-for="item in list" :key="item">
            <tabs-item :title="item"> </tabs-item>
        </li>
        <tabs-item title="new" isNew> </tabs-item>
    </ul>
</template>

<style lang="scss" scoped>
.list {
    display: flex;
}
</style>

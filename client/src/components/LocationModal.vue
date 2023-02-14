<script lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue';
import SearchBox from './SearchBox.vue';
import funcDebounce from 'lodash/debounce';
import { ILocationPlace } from '@/types/location';
import { searchLocations } from '@/services/location';

export default defineComponent({
    name: 'location-modal',
    components: { SearchBox },
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const { isShow } = toRefs(props);
        const searchQuery = ref('');
        const isLoading = ref(false);
        const resultSearch = ref<ILocationPlace[]>([]);
        const hideModal = () => {
            isShow.value = false;
        };
        const executeSearch = funcDebounce(async (query: string) => {
            isLoading.value = true;
            try {
                resultSearch.value = await searchLocations(query);
            } finally {
                isLoading.value = false;
                console.log(resultSearch.value);
            }
        }, 500);
        const search = computed({
            get: () => searchQuery.value,
            set: (value: string) => {
                searchQuery.value = value;
                if (value && value.length > 0) {
                    executeSearch(searchQuery.value);
                }
            },
        });

        return { searchQuery, isLoading, resultSearch, hideModal, search };
    },
});
</script>

<template>
    <div class="modal" v-if="isShow" @click.stop="hideModal">
        <div class="modal__content" @click.stop>
            <search-box v-model="search" :isLoading="isLoading" placeholder="Search for a location..."></search-box>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;

    &__content {
        margin: auto;
        background: white;
        border-radius: 10px;
        min-height: 50px;
        min-width: 300px;
        max-width: 480px;
        padding: 15px;
    }
}
</style>

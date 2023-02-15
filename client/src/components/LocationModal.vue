<script lang="ts">
import { defineComponent, ref, toRefs, computed, watch } from 'vue';
import SearchBox from './SearchBox.vue';
import funcDebounce from 'lodash-es/debounce';
import { ILocationPlace } from '@/types/location';
import { searchLocations } from '@/services/location';
import store from '@/store';

export default defineComponent({
    name: 'location-modal',
    components: { SearchBox },
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        hideModal() {
            this.$emit('update:isShow', false);
        },
    },
    setup(props) {
        const modal = ref(null);
        const { isShow } = toRefs(props);
        const searchQuery = ref('');
        const isLoading = ref(false);
        const resultSearch = ref<ILocationPlace[]>([]);
        const executeSearch = funcDebounce(async (query: string) => {
            isLoading.value = true;
            try {
                resultSearch.value = await searchLocations(query);
            } finally {
                isLoading.value = false;
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
        function setCurrentLocation(location: ILocationPlace) {
            store.dispatch('location/updateCurrentLocation', location);
            store.commit('location/setShowModal', false);
        }

        watch(isShow, (isShow: boolean) => {
            if (isShow) {
                console.log('reset');
                searchQuery.value = '';
                resultSearch.value = [];
            }
        });

        return { modal, searchQuery, isLoading, resultSearch, search, setCurrentLocation };
    },
});
</script>

<template>
    <div class="modal" v-if="isShow" @click.stop="hideModal">
        <div class="modal__content" @click.stop>
            <search-box
                class="search-line"
                v-model="search"
                :isLoading="isLoading"
                placeholder="Search for a location..."
            ></search-box>
            <div class="list">
                <template v-if="searchQuery">
                    <div
                        class="list__item"
                        v-for="location in resultSearch"
                        :key="location.id"
                        @click="setCurrentLocation(location)"
                    >
                        <div class="item__text">{{ location.nameFull }}</div>
                    </div>
                </template>
            </div>
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
    padding: 10px;

    &__content {
        margin: auto;
        background: white;
        border-radius: 10px;
        min-height: 50px;
        max-width: 480px;
        width: 100%;
        padding: 15px;
        overflow-y: auto;

        .search-line {
            margin-bottom: 10px;
        }

        .list__item {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            border-radius: 5px;
            overflow: hidden;

            &:hover {
                background-color: rgb(220, 220, 220);
                cursor: pointer;
            }

            .item__text {
                flex: 1 0 0%;
                width: 100%;
                font-size: 1rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
}
</style>

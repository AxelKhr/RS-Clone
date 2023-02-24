<script lang="ts">
import { defineComponent, ref, toRefs, computed, watch } from 'vue';
import SearchBox from './SearchBox.vue';
import funcDebounce from 'lodash-es/debounce';
import { ILocationPlace } from '@/types/location';
import { searchLocations } from '@/services/location';
import store from '@/store';

interface ILocationItem {
    place: ILocationPlace;
    asFavorite: boolean;
}

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
        const favorites = computed(() => store.state.settings.locationFavorites);
        const resultSearch = ref<ILocationItem[]>([]);
        const favoritesList = ref<ILocationItem[]>([]);
        updateFavorites();
        watch(favorites, () => {
            updateFavorites();
            updateResultSearch(resultSearch.value.map((item) => item.place));
        });
        function updateFavorites() {
            const list = favorites.value.map((item) => {
                const res: ILocationItem = {
                    place: item,
                    asFavorite: true,
                };
                return res;
            });
            favoritesList.value = list;
        }
        function updateResultSearch(places: ILocationPlace[]) {
            resultSearch.value = places.map((place) => {
                const value: ILocationItem = {
                    place,
                    asFavorite: favorites.value.findIndex((elem) => elem.id === place.id) >= 0,
                };
                return value;
            });
        }
        const executeSearch = funcDebounce(async (query: string) => {
            isLoading.value = true;
            try {
                const resSearch = await searchLocations(query);
                updateResultSearch(resSearch);
            } finally {
                isLoading.value = false;
            }
        }, 500);
        watch(isShow, (isShow: boolean) => {
            if (isShow) {
                searchQuery.value = '';
                resultSearch.value = [];
            }
        });
        const search = computed({
            get: () => searchQuery.value,
            set: (value: string) => {
                searchQuery.value = value;
                if (value && value.length > 0) {
                    executeSearch(searchQuery.value);
                }
            },
        });
        function setLocation(location: ILocationItem) {
            store.dispatch('forecast/setLocation', location.place);
            store.commit('forecast/setShowModal', false);
        }
        function modifyLocation(location: ILocationItem) {
            if (location.asFavorite) {
                store.dispatch('forecast/removeFavLocation', location.place);
            } else {
                store.dispatch('forecast/addFavLocation', location.place);
            }
        }
        return { modal, searchQuery, isLoading, favoritesList, resultSearch, search, setLocation, modifyLocation };
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
                        :key="location.place.id"
                        @click="setLocation(location)"
                    >
                        <div class="item__text">{{ location.place.nameFull }}</div>
                        <icon-svg-button
                            class="item__icon"
                            :iconPath="
                                location.asFavorite
                                    ? require('@/assets/icons/_star-fill.svg')
                                    : require('@/assets/icons/_star.svg')
                            "
                            @click.stop="modifyLocation(location)"
                        ></icon-svg-button>
                    </div>
                </template>
                <template v-else>
                    <div
                        class="list__item"
                        v-for="location in favoritesList"
                        :key="location.place.id"
                        @click="setLocation(location)"
                    >
                        <div class="item__text">{{ location.place.nameFull }}</div>
                        <icon-svg-button
                            class="item__icon"
                            :iconPath="
                                location.asFavorite
                                    ? require('@/assets/icons/_star-fill.svg')
                                    : require('@/assets/icons/_star.svg')
                            "
                            @click.stop="modifyLocation(location)"
                        ></icon-svg-button>
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
            margin: 5px 0;
        }
        .list {
            overflow-y: auto;
            max-height: 200px;
        }
        .list__item {
            display: flex;
            align-items: center;
            padding: 2px 5px 2px 10px;
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

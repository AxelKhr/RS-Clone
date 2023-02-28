<script lang="ts">
import { defineComponent, computed } from 'vue';
import SettingsItem from './SettingsItem.vue';
import ParamsCheck from '@/components/ParamsCheck.vue';
import { useStore, mapState } from 'vuex';
import { IState } from '@/types/state';
import { ParamCheckItem } from '@/types/params';
import { IMapLayersLang } from '@/types/language';
import ParamsList from '@/components/ParamsList.vue';

export default defineComponent({
    name: 'settings-map',
    components: { SettingsItem, ParamsCheck, ParamsList },
    data() {
        return {
            isDropLayers: false,
            isDropMaps: false,
        };
    },
    computed: {
        ...mapState('language', {
            langData: 'data',
        }),
    },
    setup() {
        const store = useStore<IState>();

        const mapsBaseList = computed(() => store.state.settings.mapsBase);
        const mapsList = mapsBaseList.value.map((el) => el.name);
        const mapSelected = computed({
            get: () => {
                const selected = mapsBaseList.value.find((el) => el.visible);
                return selected ? selected.name : '';
            },
            set: (value) => {
                const list = mapsBaseList.value.map((el) => {
                    const item = el;
                    item.visible = value === item.name;
                    return item;
                });
                store.dispatch('settings/updateSettings', { mapsBase: list });
            },
        });

        const layersList = computed<ParamCheckItem[]>({
            get: () => {
                const names = store.state.language.data.mapLayers;
                return store.state.settings.mapLayersEnable.map((el) => {
                    const item: ParamCheckItem = {
                        id: el.id,
                        name: names[el.id as keyof IMapLayersLang],
                        checked: el.enable,
                    };
                    return item;
                });
            },
            set: (list) => {
                const paramList = store.state.settings.mapLayersEnable;
                list.forEach((el) => {
                    const ind = paramList.findIndex((item) => item.id === el.id);
                    if (ind >= 0) {
                        paramList[ind].enable = el.checked;
                    }
                });
                store.dispatch('settings/updateSettings', { mapLayersEnable: paramList });
            },
        });
        return { mapsList, mapSelected, layersList };
    },
});
</script>

<template>
    <div class="settings">
        <settings-item :titleParam="langData.settingsMaps" :valueParam="mapSelected" v-model:isDrop="isDropMaps">
            <div class="settings__block">
                <params-list class="list--right" :items="mapsList" v-model:selected="mapSelected" />
            </div>
        </settings-item>
        <settings-item :titleParam="langData.settingsLayers" v-model:isDrop="isDropLayers">
            <div class="settings__block">
                <params-check class="list--right" v-model:items="layersList"> </params-check>
            </div>
        </settings-item>
    </div>
</template>

<style lang="scss" scoped>
.settings {
    .settings {
        &__block {
            width: 100%;
            .list--right {
                margin-left: auto;
                width: fit-content;
            }
        }
    }
}
</style>

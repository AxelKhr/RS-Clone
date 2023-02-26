<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SettingsItem from './SettingsItem.vue';
import ParamsCheck from '@/components/ParamsCheck.vue';
import { useStore, mapState } from 'vuex';
import { IState } from '@/types/state';
import { ParamCheckItem } from '@/types/params';
import { IMapLayersLang } from '@/types/language';

export default defineComponent({
    name: 'settings-map',
    components: { SettingsItem, ParamsCheck },
    data() {
        return {
            isDropLayers: false,
        };
    },
    computed: {
        ...mapState('language', {
            langData: 'data',
        }),
    },
    setup() {
        const store = useStore<IState>();

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
        return { layersList };
    },
});
</script>

<template>
    <div class="settings">
        <settings-item :titleParam="langData.settingsLayers" v-model:isDrop="isDropLayers">
            <div class="settings__units">
                <params-check class="units__params" v-model:items="layersList"> </params-check>
            </div>
        </settings-item>
    </div>
</template>

<style lang="scss" scoped>
.settings {
    .settings {
        &__units {
            width: 100%;
            .units__params {
                margin-left: auto;
                width: min-content;
            }
        }
    }
}
</style>

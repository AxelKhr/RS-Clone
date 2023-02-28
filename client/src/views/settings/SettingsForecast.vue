<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SettingsItem from './SettingsItem.vue';
import ParamsList from '@/components/ParamsList.vue';
import { UNITS } from '@/types/units';
import store from '@/store';
import { mapState } from 'vuex';
import { IUnitsTypesLang, ISectionsLang } from '@/types/language';
import ParamsBlocks from '@/components/ParamsBlocks.vue';
import { ParamBlockItem } from '@/types/params';
import { ISection, SectionsId } from '@/types/sections';

export default defineComponent({
    name: 'settings-forecast',
    components: { SettingsItem, ParamsList, ParamsBlocks },
    data() {
        return {
            isDropUnits: false,
            isDropBloks: false,
        };
    },
    computed: {
        ...mapState('language', {
            langData: 'data',
        }),
    },
    setup() {
        const unitsNames = computed(() => store.state.language.data.unitsTypes);
        const unitsKeys = Object.keys(UNITS);
        const unitsList = computed(() =>
            unitsKeys.map((key) => {
                return unitsNames.value[key as keyof IUnitsTypesLang];
            })
        );
        const unitsSelected = computed({
            get: () => {
                const unitsCurrent = ref(store.state.settings.units);
                return unitsNames.value[unitsCurrent.value];
            },
            set: (value) => {
                const item = unitsKeys.find((key) => {
                    return unitsNames.value[key as keyof IUnitsTypesLang] === value;
                });
                if (item) {
                    store.dispatch('settings/updateSettings', { units: item });
                }
            },
        });

        const blocksNames = computed(() => store.state.language.data.forecastSections);
        const blocksList = computed({
            get: () => {
                const sections = store.state.settings.sections;
                const list: ParamBlockItem[] = [];
                sections.forEach((el) => {
                    list.push({
                        id: el.id,
                        name: blocksNames.value[el.id as keyof ISectionsLang],
                        visible: el.visible,
                    });
                });
                return list;
            },
            set: (list) => {
                const sections: ISection[] = [];
                list.forEach((el) => {
                    sections.push({
                        id: el.id as SectionsId,
                        visible: el.visible,
                    });
                });
                store.dispatch('settings/updateSettings', { sections });
            },
        });

        return { unitsList, unitsSelected, blocksList };
    },
});
</script>

<template>
    <div class="settings">
        <settings-item :titleParam="langData.settingsUnits" :valueParam="unitsSelected" v-model:isDrop="isDropUnits">
            <div class="settings__list">
                <params-list class="list__units" :items="unitsList" v-model:selected="unitsSelected" />
            </div>
        </settings-item>
        <settings-item :titleParam="langData.settingsSections" v-model:isDrop="isDropBloks">
            <div class="settings__list">
                <params-blocks class="list__blocks" v-model:items="blocksList" />
            </div>
        </settings-item>
    </div>
</template>

<style lang="scss" scoped>
.settings {
    .settings {
        &__list {
            width: 100%;
            .list__units {
                margin-left: auto;
                width: min-content;
            }

            .list__blocks {
                width: 100%;
            }
        }
    }
}
</style>

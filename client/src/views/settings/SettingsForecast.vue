<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SettingsItem from './SettingsItem.vue';
import ParamsList from '@/components/ParamsList.vue';
import { UNITS } from '@/types/units';
import store from '@/store';
import { mapState } from 'vuex';
import { IUnitsTypesLang } from '@/types/language';

export default defineComponent({
    name: 'settings-forecast',
    components: { SettingsItem, ParamsList },
    data() {
        return {
            isDropUnits: false,
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
        return { unitsList, unitsSelected };
    },
});
</script>

<template>
    <div class="settings">
        <settings-item :titleParam="langData.settingsUnits" :valueParam="unitsSelected" v-model:isDrop="isDropUnits">
            <div class="settings__units">
                <params-list class="units__params" :items="unitsList" v-model:selected="unitsSelected"> </params-list>
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

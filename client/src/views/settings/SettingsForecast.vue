<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SettingsItem from './SettingsItem.vue';
import ParamsList from '@/components/ParamsList.vue';
import { UNITS } from '@/types/units';
import store from '@/store';

export default defineComponent({
    name: 'settings-forecast',
    components: { SettingsItem, ParamsList },
    data() {
        return {
            isDropUnits: false,
        };
    },
    setup() {
        const unitsList = Object.values(UNITS);
        const unitsSelected = computed({
            get: () => {
                const unitsCurrent = ref(store.state.settings.units);
                return unitsCurrent.value;
            },
            set: (value) => {
                store.dispatch('settings/updateSettings', { units: value });
            },
        });
        return { unitsList, unitsSelected };
    },
});
</script>

<template>
    <div class="settings">
        <settings-item titleParam="Units" :valueParam="unitsSelected" v-model:isDrop="isDropUnits">
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

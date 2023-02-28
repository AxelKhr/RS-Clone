<script lang="ts">
import { defineComponent } from 'vue';
import SettingsBlock from './settings/SettingsBlock.vue';
import SettingsGeneral from './settings/SettingsGeneral.vue';
import SettingsForecast from './settings/SettingsForecast.vue';
import SettingsMap from './settings/SettingsMap.vue';
import { mapState } from 'vuex';

export default defineComponent({
    components: { SettingsBlock, SettingsGeneral, SettingsForecast, SettingsMap },
    computed: {
        ...mapState('language', {
            langData: 'data',
        }),
    },
});
</script>

<template>
    <div class="container">
        <div class="wrap">
            <div class="settings">
                <settings-block class="settings__block" :title="langData.settingsForecastTitle">
                    <settings-forecast />
                </settings-block>
                <settings-block class="settings__block" :title="langData.settingsMapTitle">
                    <settings-map />
                </settings-block>
                <settings-block class="settings__block" :title="langData.settingsGeneralTitle">
                    <settings-general />
                </settings-block>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding-top: 40px;
}
.settings {
    max-width: 500px;
    margin: 0 auto;

    .settings__block {
        margin-bottom: 30px;
    }
}
</style>

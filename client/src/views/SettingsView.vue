<script lang="ts">
import { defineComponent } from 'vue';
import SettingsBlock from './settings/SettingsBlock.vue';
import SettingsGeneral from './settings/SettingsGeneral.vue';

export default defineComponent({
    components: { SettingsBlock, SettingsGeneral },
});
</script>

<template>
    <div class="container">
        <div class="wrap">
            <div class="settings">
                <settings-block title="GENERAL">
                    <settings-general />
                </settings-block>
                <settings-block title="FORECAST"></settings-block>
                <settings-block title="MAP"></settings-block>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding-top: 40px;
}
</style>

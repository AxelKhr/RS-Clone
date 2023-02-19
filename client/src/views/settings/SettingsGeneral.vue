<script lang="ts">
import { defineComponent } from 'vue';
import SettingsItem from './SettingsItem.vue';
import ParamsList from '@/components/ParamsList.vue';

export default defineComponent({
    name: 'settings-general',
    components: { SettingsItem, ParamsList },
    data() {
        return {
            isDropLanguage: false,
            isDropTheme: false,
            languagesList: ['123', '456'],
            languageCurrent: '456',
        };
    },
});
</script>

<template>
    <div class="settings">
        <settings-item titleParam="Language" valueParam="EN" v-model:isDrop="isDropLanguage">
            <div class="settings__language">
                <params-list class="language__params" :items="languagesList" v-model:selected="languageCurrent">
                    <!-- <template #itemSlot="{ item }">
                        <p>{{ item }}</p>
                    </template> -->
                </params-list>
            </div>
        </settings-item>
        <settings-item titleParam="Theme" v-model:isDrop="isDropTheme">
            <div class="test-style">fghjy</div>
        </settings-item>
    </div>
</template>

<style lang="scss" scoped>
.settings {
    .settings {
        &__language {
            width: 100%;
            .language__params {
                margin-left: auto;
                width: min-content;
            }
        }
    }
}
</style>

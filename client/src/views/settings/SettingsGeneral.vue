<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SettingsItem from './SettingsItem.vue';
import ParamsList from '@/components/ParamsList.vue';
import LANGUAGES from '@/constants/langs/langs';
import { LANG } from '@/types/language';
import store from '@/store';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'settings-general',
    components: { SettingsItem, ParamsList },
    data() {
        return {
            isDropLanguage: false,
            isDropTheme: false,
        };
    },
    computed: {
        ...mapState('language', {
            langData: 'data',
        }),
    },
    setup() {
        const langKeys = Object.values(LANG);
        const langList = langKeys.map((key) => LANGUAGES[key].name);
        const langSelected = computed({
            get: () => {
                const langKeyCurrent = ref(store.state.settings.languageCurrent);
                return LANGUAGES[langKeyCurrent.value].name;
            },
            set: (value) => {
                const key = langKeys.find((item) => {
                    return LANGUAGES[item].name === value;
                });
                store.dispatch('language/updateLanguage', key);
            },
        });
        return { langList, langSelected };
    },
});
</script>

<template>
    <div class="settings">
        <settings-item
            :titleParam="langData.settingsLanguage"
            :valueParam="langSelected"
            v-model:isDrop="isDropLanguage"
        >
            <div class="settings__language">
                <params-list class="language__params" :items="langList" v-model:selected="langSelected">
                    <!-- <template #itemSlot="{ item }">
                        <p>{{ item }}</p>
                    </template> -->
                </params-list>
            </div>
        </settings-item>
        <settings-item :titleParam="langData.settingsTheme" v-model:isDrop="isDropTheme">
            <div class="test-style">Default</div>
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

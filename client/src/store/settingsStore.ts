import { ISettings } from '@/types/settings';
import { loadSettings, saveSettings } from './storage/storage';
import { ActionContext } from 'vuex';
import { IState } from '@/types/state';

type Context = ActionContext<ISettings, IState>;

export default {
    namespaced: true,
    state: (): ISettings => loadSettings(),
    getters: {},
    mutations: {
        setSettings(state: ISettings, value: Partial<ISettings>) {
            const settings: ISettings = {
                ...state,
                ...value,
            };
            Object.assign(state, settings);
            saveSettings(settings);
        },
    },
    actions: {
        updateSettings(context: Context, settings: Partial<ISettings>) {
            context.commit('setSettings', settings);
        },
    },
};

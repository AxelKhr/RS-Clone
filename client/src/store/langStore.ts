import LANGUAGES from '@/constants/langs/langs';
import { LANG, ILang } from '@/types/language';
import { ActionContext } from 'vuex';
import { IState } from '@/types/state';

type Context = ActionContext<ILang, IState>;

export default {
    namespaced: true,
    state: (): ILang => {
        return { ...LANGUAGES.EN };
    },
    getters: {},
    mutations: {
        setLanguage(state: ILang, lang: LANG) {
            Object.assign(state, LANGUAGES[lang]);
        },
    },
    actions: {
        loadLanguage(context: Context) {
            const lang = context.rootState.settings.languageCurrent;
            context.commit('setLanguage', lang);
        },
        updateLanguage(context: Context, lang: LANG) {
            context.commit('setLanguage', lang);
            context.dispatch('settings/updateSettings', { languageCurrent: lang }, { root: true });
        },
    },
};

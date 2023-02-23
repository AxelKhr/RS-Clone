import { createStore } from 'vuex';
import { IState } from '@/types/state';
import forecastStore from './forecastStore';
import settingsStore from './settingsStore';
import langStore from './langStore';
import themePlugin from '@/themes/themePlugin';

const store = createStore<IState>({
    modules: {
        forecast: forecastStore,
        settings: settingsStore,
        language: langStore,
    },
    plugins: [themePlugin],
});

export default store;

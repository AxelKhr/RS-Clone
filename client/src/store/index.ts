import { createStore } from 'vuex';
import { IState } from '@/types/state';
import forecastStore from './forecastStore';
import settingsStore from './settingsStore';
import langStore from './langStore';

const store = createStore<IState>({
    modules: {
        forecast: forecastStore,
        settings: settingsStore,
        language: langStore,
    },
});

export default store;

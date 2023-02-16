import { createStore } from 'vuex';
import { IState } from '@/types/state';
import forecastStore from './forecastStore';
import settingsStore from './settingsStore';

const store = createStore<IState>({
    modules: {
        settings: settingsStore,
        forecast: forecastStore,
    },
});

export default store;

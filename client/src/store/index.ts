import { createStore } from 'vuex';
import { IState } from '@/types/state';
import forecastStore from './forecastStore';
import settingsStore from './settingsStore';

const store = createStore<IState>({
    modules: {
        forecast: forecastStore,
        settings: settingsStore,
    },
});

export default store;

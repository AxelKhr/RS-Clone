import { createStore } from 'vuex';
import { IState } from '@/types/state';
import forecastStore from './forecastStore';
import locationStore from './locationStore';
import settingsStore from './settingsStore';

const store = createStore<IState>({
    modules: {
        settings: settingsStore,
        forecast: forecastStore,
        location: locationStore,
    },
});

export default store;

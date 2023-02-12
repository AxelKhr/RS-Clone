import Vuex from 'vuex';
import { IState } from '@/types/state';
import forecastStore from './forecastStore';
import locationStore from './locationStore';

export default new Vuex.Store<IState>({
    modules: {
        forecast: forecastStore,
        location: locationStore,
    },
});

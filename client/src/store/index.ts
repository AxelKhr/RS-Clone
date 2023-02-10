import Vuex from 'vuex';
import forecastStore from './forecastStore';
import { IState } from '@/types/state';

export default new Vuex.Store<IState>({
    modules: {
        forecast: forecastStore,
    },
});

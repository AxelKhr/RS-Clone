// import { searchLocationByQuery } from '@/api/location/locationApi';
import { ILocation, ILocationPlace } from '@/types/location';
import { ActionContext } from 'vuex';
import { IState } from '@/types/state';

type Context = ActionContext<ILocation, IState>;

export default {
    namespaced: true,
    state: (): ILocation => ({
        isShowModal: false,
        currentLocation: {
            id: '',
            name: '',
            nameFull: '',
            position: {
                latitude: 0,
                longitude: 0,
            },
        },
    }),
    getters: {},
    mutations: {
        setShowModal(state: ILocation, isShowModal: boolean) {
            state.isShowModal = isShowModal;
        },
        setCurrentLocation(state: ILocation, location: ILocationPlace) {
            state.currentLocation = location;
        },
    },
    actions: {
        showModal(context: Context) {
            context.commit('setShowModal', true);
        },
        updateCurrentLocation(context: Context, location: ILocationPlace) {
            context.commit('setCurrentLocation', location);
            context.dispatch('forecast/updateForecast', location, { root: true });
            context.dispatch('settings/updateSettings', { locationCurrent: location }, { root: true });
        },
    },
};

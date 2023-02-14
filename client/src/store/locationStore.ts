import { searchLocationByQuery } from '@/api/location/locationApi';
import { ILocation } from '@/types/location';
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
    },
    actions: {
        showModal(context: Context) {
            context.commit('setShowModal', true);
        },
        async searchLocations() {
            console.log('searchLocations');
            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log('searchLocations end');
        },
        async updateLocation() {
            const dataLocation = await searchLocationByQuery({ query: 'min', limit: 100, language: 'en' });
            console.log(dataLocation);
        },
    },
};

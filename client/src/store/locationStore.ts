import { getLocationByQuery } from '@/api/location/locationApi';

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async updateLocation() {
            const dataLocation = await getLocationByQuery({ query: 'min', limit: 100, language: 'en' });
            console.log(dataLocation);
        },
    },
};

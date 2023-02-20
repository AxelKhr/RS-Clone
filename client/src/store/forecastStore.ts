import { IForecast, IForecastCurrent, IForecastDaily, IForecastHourly } from '@/types/weather';
import { getForecastByLocation, getForecastDaily, getForecastHourly } from '@/api/forecast/weather';
import { ActionContext } from 'vuex';
import { IState } from '@/types/state';
import transformRespForecastCurrent from '@/store/transformApi/forecast';
import transformRespForecastDaily from '@/store/transformApi/forecastDaily';
import transformRespForecastHourly from '@/store/transformApi/forecastHourly';
import { ILocationPlace } from '@/types/location';
import { LocationForecastRequest } from '@/api/types/request';
import SETTINGS from '@/constants/settings';
import FORECAST_CURRENT_DEF from '@/constants/forecast/current';
import FORECAST_DAILY_DEF from '@/constants/forecast/daily';
import FORECAST_HOURLY_DEF from '@/constants/forecast/hourly';
import uniqBy from 'lodash/uniqBy';

type Context = ActionContext<IForecast, IState>;

export default {
    namespaced: true,
    state: (): IForecast => {
        return {
            isLoading: false,
            isShowModal: false,
            location: SETTINGS.default.locationCurrent,
            current: FORECAST_CURRENT_DEF,
            daily: FORECAST_DAILY_DEF,
            hourly: FORECAST_HOURLY_DEF,
        };
    },
    getters: {},
    mutations: {
        setLoading(state: IForecast, isLoading: boolean) {
            state.isLoading = isLoading;
        },
        setShowModal(state: IForecast, isShowModal: boolean) {
            state.isShowModal = isShowModal;
        },
        setLocation(state: IForecast, location: ILocationPlace) {
            state.location = location;
        },
        setForecastCurrent(state: IForecast, forecastCurrent: IForecastCurrent) {
            state.current = forecastCurrent;
        },
        setForecastDaily(state: IForecast, forecastDaily: IForecastDaily) {
            state.daily = forecastDaily;
        },
        setForecastHourly(state: IForecast, forecastHourly: IForecastHourly) {
            state.hourly = forecastHourly;
        },
    },
    actions: {
        showModal(context: Context) {
            context.commit('setShowModal', true);
        },
        updateLocation(context: Context, location: ILocationPlace) {
            context.commit('setLocation', location);
            context.dispatch('updateForecast', location);
            context.dispatch('settings/updateSettings', { locationCurrent: location }, { root: true });
        },
        addLocation(context: Context, location: ILocationPlace) {
            const locations = context.rootState.settings.locationFavorites;
            context.dispatch(
                'settings/updateSettings',
                { locationFavorites: uniqBy([...locations, location], ({ id }) => id) },
                { root: true }
            );
        },
        removeLocation(context: Context, location: ILocationPlace) {
            const locations = context.rootState.settings.locationFavorites.filter((item) => item.id !== location.id);
            context.dispatch('settings/updateSettings', { locationFavorites: locations }, { root: true });
        },
        async updateForecast(context: Context, location: ILocationPlace) {
            const query: LocationForecastRequest = {
                latitude: location.position.latitude,
                longitude: location.position.longitude,
                units: context.rootState.settings.units,
            };
            context.commit('setLoading', true);
            const dataCurrent = await getForecastByLocation(query);
            const respCurrent = await dataCurrent.json();
            context.commit('setForecastCurrent', transformRespForecastCurrent(respCurrent.data[0]));
            const dataDaily = await getForecastDaily(query);
            const respDaily = await dataDaily.json();
            context.commit('setForecastDaily', transformRespForecastDaily(respDaily));
            const dataHourly = await getForecastHourly(query);
            const respHourly = await dataHourly.json();
            context.commit('setForecastHourly', transformRespForecastHourly(respHourly));
            context.commit('setLoading', false);
        },
        async saveApiForecastToStorage() {
            const dataCurrent = await getForecastByLocation({ latitude: 51.5072, longitude: -0.1276 });
            const respCurrent = await dataCurrent.json();
            const dataDaily = await getForecastDaily({ latitude: 51.5072, longitude: -0.1276 });
            const respDaily = await dataDaily.json();
            const dataHourly = await getForecastHourly({ latitude: 51.5072, longitude: -0.1276 });
            const respHourly = await dataHourly.json();
            localStorage.setItem('RS-Weather-test-current', JSON.stringify(respCurrent));
            localStorage.setItem('RS-Weather-test-daily', JSON.stringify(respDaily));
            localStorage.setItem('RS-Weather-test-hourly', JSON.stringify(respHourly));
        },
        loadApiForecastFromStorage(context: Context) {
            const dataCurrent = localStorage.getItem('RS-Weather-test-current');
            if (dataCurrent) {
                const respCurrent = JSON.parse(dataCurrent);
                context.commit('setForecastCurrent', transformRespForecastCurrent(respCurrent.data[0]));
            }
            const dataDaily = localStorage.getItem('RS-Weather-test-daily');
            if (dataDaily) {
                const respDaily = JSON.parse(dataDaily);
                context.commit('setForecastDaily', transformRespForecastDaily(respDaily));
            }
            const dataHourly = localStorage.getItem('RS-Weather-test-hourly');
            if (dataHourly) {
                const respHourly = JSON.parse(dataHourly);
                context.commit('setForecastHourly', transformRespForecastHourly(respHourly));
            }
        },
    },
};

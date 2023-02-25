import { IForecast, IForecastCurrent, IForecastDaily, IForecastHourly } from '@/types/weather';
import {
    getForecastByLocation,
    getForecastDaily,
    getForecastHourly,
    getForecastDayHourly,
} from '@/api/forecast/weather';
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
            isDataReady: false,
            current: FORECAST_CURRENT_DEF,
            daily: FORECAST_DAILY_DEF,
            hourly: FORECAST_HOURLY_DEF,
            dayHourly: FORECAST_HOURLY_DEF,
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
        setDataReady(state: IForecast, isDataReady: boolean) {
            state.isDataReady = isDataReady;
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
        setForecastDayHourly(state: IForecast, forecastHourly: IForecastHourly) {
            state.dayHourly = forecastHourly;
        },
    },
    actions: {
        showModal(context: Context) {
            context.commit('setShowModal', true);
        },
        setLocation(context: Context, location: ILocationPlace) {
            if (!context.rootState.settings.locationTabs.find((el) => el.id === location.id)) {
                const tabs = context.rootState.settings.locationTabs;
                context.dispatch(
                    'settings/updateSettings',
                    { locationTabs: uniqBy([...tabs, location], ({ id }) => id) },
                    { root: true }
                );
            }
            context.commit('setLocation', location);
            context.dispatch('updateForecast', location);
            context.dispatch('settings/updateSettings', { locationCurrent: location }, { root: true });
        },
        removeTab(context: Context, location: ILocationPlace) {
            const tabs = context.rootState.settings.locationTabs.filter((tab) => tab.id !== location.id);
            context.dispatch('settings/updateSettings', { locationTabs: tabs }, { root: true });
            if (location.id === context.state.location.id) {
                if (context.rootState.settings.locationTabs.length > 0) {
                    context.commit('setLocation', context.rootState.settings.locationTabs[0]);
                    context.dispatch('updateForecast', location);
                }
            }
        },
        addFavLocation(context: Context, location: ILocationPlace) {
            const locations = context.rootState.settings.locationFavorites;
            context.dispatch(
                'settings/updateSettings',
                { locationFavorites: uniqBy([...locations, location], ({ id }) => id) },
                { root: true }
            );
        },
        removeFavLocation(context: Context, location: ILocationPlace) {
            const locations = context.rootState.settings.locationFavorites.filter((item) => item.id !== location.id);
            context.dispatch('settings/updateSettings', { locationFavorites: locations }, { root: true });
        },
        async updateForecast(context: Context) {
            const location = context.state.location;
            const query: LocationForecastRequest = {
                latitude: location.position.latitude,
                longitude: location.position.longitude,
                start_date: ``,
                end_date: ``,
                units: context.rootState.settings.units,
                lang: context.rootState.settings.languageCurrent,
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
            const time = respCurrent.data[0];
            const curDate = new Date().toLocaleString('en-US', { timeZone: time.timezone });
            const curLocalDate = new Date(curDate);
            const ISOstr = `${curLocalDate.getFullYear()}-${curLocalDate.getMonth() + 1}-${curLocalDate.getDate()}`;
            const hourlyQuery: LocationForecastRequest = {
                latitude: location.position.latitude,
                longitude: location.position.longitude,
                start_date: `${ISOstr}:00`,
                end_date: `${ISOstr}:${curLocalDate.getHours()}`,
                units: context.rootState.settings.units,
                lang: context.rootState.settings.languageCurrent,
            };
            if (Number(hourlyQuery.end_date?.split(':')[1]) !== 0) {
                await getForecastDayHourly(hourlyQuery)
                    .then(async (data) => {
                        const resp = await data.json();
                        context.commit('setForecastDayHourly', transformRespForecastHourly(resp));
                    })
                    .catch((error) => console.log(error));
            }
            context.commit('setDataReady', true);
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
            context.commit('setDataReady', true);
        },
    },
};

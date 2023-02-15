import { IForecast, IForecastCurrent, IForecastDaily } from '@/types/weather';
import { getForecastByLocation, getForecastDaily } from '@/api/forecast/weather';
import { ActionContext } from 'vuex';
import { IState } from '@/types/state';
import transformRespForecastCurrent from '@/store/transformApi/forecast';
import transformRespForecastDaily from '@/store/transformApi/forecastDaily';
import * as def from '@/store/default/forecastDef';
import { ILocationPlace } from '@/types/location';
import { LocationForecastRequest } from '@/api/types/request';

type Context = ActionContext<IForecast, IState>;

export default {
    namespaced: true,
    state: (): IForecast => ({
        isLoading: false,
        current: def.getForecastCurrentDef(),
        daily: def.getForecastDailyDef(),
    }),
    getters: {},
    mutations: {
        setLoading(state: IForecast, isLoading: boolean) {
            state.isLoading = isLoading;
        },
        setForecastCurrent(state: IForecast, current: IForecastCurrent) {
            state.current = current;
        },
        setForecastDaily(state: IForecast, daily: IForecastDaily) {
            state.daily = daily;
        },
    },
    actions: {
        async updateForecast(context: Context, location: ILocationPlace) {
            const query: LocationForecastRequest = {
                latitude: location.position.latitude,
                longitude: location.position.longitude,
            };
            context.commit('setLoading', true);
            const dataCurrent = await getForecastByLocation(query);
            const respCurrent = await dataCurrent.json();
            context.commit('setForecastCurrent', transformRespForecastCurrent(respCurrent.data[0]));
            const dataDaily = await getForecastDaily({ latitude: 51.5072, longitude: -0.1276 });
            const respDaily = await dataDaily.json();
            context.commit('setForecastDaily', transformRespForecastDaily(respDaily));
            context.commit('setLoading', false);
        },
        async saveApiForecastToStorage() {
            const dataCurrent = await getForecastByLocation({ latitude: 51.5072, longitude: -0.1276 });
            const respCurrent = await dataCurrent.json();
            const dataDaily = await getForecastDaily({ latitude: 51.5072, longitude: -0.1276 });
            const respDaily = await dataDaily.json();
            localStorage.setItem('RS-Weather-test-current', JSON.stringify(respCurrent));
            localStorage.setItem('RS-Weather-test-daily', JSON.stringify(respDaily));
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
        },
    },
};

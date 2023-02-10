import { IForecast, IForecastCurrent } from '@/types/weather';
import { getForecastByLocation, getForecastDaily } from '@/api/forecast/weather';
import { ActionContext } from 'vuex';
import { IState } from '@/types/state';
import transformRespForecastCurrent from '@/store/transformApi/forecast';
import * as def from '@/store/default/forecastDef';

type Context = ActionContext<IForecast, IState>;

export default {
    namespaced: true,
    state: (): IForecast => ({
        isLoading: false,
        current: def.getForecastCurrentDef(),
        daily: {
            data1: 0,
            data2: 0,
        },
    }),
    getters: {},
    mutations: {
        setLoading(state: IForecast, isLoading: boolean) {
            state.isLoading = isLoading;
        },
        setForecastCurrent(state: IForecast, current: IForecastCurrent) {
            state.current = current;
        },
    },
    actions: {
        async updateForecast(context: Context) {
            context.commit('setLoading', true);
            const data = await getForecastByLocation({ latitude: 51.5072, longitude: -0.1276 });
            const response = await data.json();
            context.commit('setForecastCurrent', transformRespForecastCurrent(response.data[0]));
            const data2 = await getForecastDaily({ latitude: 51.5072, longitude: -0.1276 });
            const response2 = await data2.json();
            console.log(response2);

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
        },
    },
};

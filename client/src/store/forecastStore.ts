import { IForecast, IForecastCurrent, IForecastDaily, IForecastHourly } from '@/types/weather';
import { getForecastByLocation, getForecastDaily, getForecastHourly } from '@/api/forecast/weather';
import { ActionContext } from 'vuex';
import { IState } from '@/types/state';
import transformRespForecastCurrent from '@/store/transformApi/forecast';
import transformRespForecastDaily from '@/store/transformApi/forecastDaily';
import transformRespForecastHourly from '@/store/transformApi/forecastHourly';
import * as def from '@/store/default/forecastDef';

type Context = ActionContext<IForecast, IState>;

export default {
    namespaced: true,
    state: (): IForecast => ({
        isLoading: false,
        current: def.getForecastCurrentDef(),
        daily: def.getForecastDailyDef(),
        hourly: def.getForecastHourlyDef(),
    }),
    getters: {},
    mutations: {
        setLoading(state: IForecast, isLoading: boolean) {
            state.isLoading = isLoading;
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
        async updateForecast(context: Context) {
            context.commit('setLoading', true);
            const dataCurrent = await getForecastByLocation({ latitude: 51.5072, longitude: -0.1276 });
            const respCurrent = await dataCurrent.json();
            context.commit('setForecastCurrent', transformRespForecastCurrent(respCurrent.data[0]));
            const dataDaily = await getForecastDaily({ latitude: 51.5072, longitude: -0.1276 });
            const respDaily = await dataDaily.json();
            context.commit('setForecastDaily', transformRespForecastDaily(respDaily));
            const dataHourly = await getForecastHourly({ latitude: 51.5072, longitude: -0.1276 });
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

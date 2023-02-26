import { IState } from '@/types/state';
import { Store } from 'vuex';

const startPagePlugin = (store: Store<IState>) => {
    if (store.state.settings.locationTabs.length === 0) {
        store.commit('forecast/setStart', true);
    }
    let isStartPrev = store.state.forecast.isStart;
    let isTabsLengthPrev = store.state.settings.locationTabs.length;
    let isStartTrig = false;
    store.subscribe(() => {
        const isStartCurr = store.state.forecast.isStart;
        const isTabsLengthCurr = store.state.settings.locationTabs.length;
        if (isStartCurr !== isStartPrev || isTabsLengthCurr !== isTabsLengthPrev) {
            isStartTrig = true;
        }
        isStartPrev = isStartCurr;
        isTabsLengthPrev = isTabsLengthCurr;
        if (isStartTrig === true) {
            isStartTrig = false;
            store.commit('forecast/setStart', isTabsLengthCurr === 0);
        }
        isStartTrig = false;
    });
};

export default startPagePlugin;

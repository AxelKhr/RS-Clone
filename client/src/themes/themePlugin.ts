import { IState } from '@/types/state';
import { Store } from 'vuex';
import { setTheme } from './themes';

const themePlugin = (store: Store<IState>) => {
    let themePrev = store.state.settings.theme;
    setTheme(themePrev);
    store.subscribe((mutation, state) => {
        const themeCurr = state.settings.theme;
        if (themeCurr !== themePrev) {
            setTheme(themeCurr);
        }
        themePrev = themeCurr;
    });
};

export default themePlugin;

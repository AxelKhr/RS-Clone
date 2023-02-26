import store from '@/store';
import { LANG } from '@/types/language';

const SCALE = [0, 5, 10, 100];

const Visibility = {
    en: [
        {
            min_visibility: SCALE[0],
            max_visibility: SCALE[1],
            desc: 'Low visibility',
            color: 'background-color: #ed2912',
        },
        {
            min_visibility: SCALE[1],
            max_visibility: SCALE[2],
            desc: 'Normal visibility',
            color: 'background-color: #edc212',
        },
        {
            min_visibility: SCALE[2],
            max_visibility: SCALE[3],
            desc: 'Good visibility',
            color: 'background-color: #228b22',
        },
    ],
    ru: [
        {
            min_visibility: SCALE[0],
            max_visibility: SCALE[1],
            desc: 'Низкая видимость',
            color: 'background-color: #ed2912',
        },
        {
            min_visibility: SCALE[1],
            max_visibility: SCALE[2],
            desc: 'Нормальная видимость',
            color: 'background-color: #edc212',
        },
        {
            min_visibility: SCALE[2],
            max_visibility: SCALE[3],
            desc: 'Хорошая видимость',
            color: 'background-color: #228b22',
        },
    ],
};

export const visibilityScale = () => {
    return store.state.settings.languageCurrent == LANG.ru ? Visibility.ru : Visibility.en;
};

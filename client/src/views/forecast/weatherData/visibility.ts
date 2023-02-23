import store from '@/store';
import { LANG } from '@/types/language';

const Visibility = {
    en: [
        {
            min_visibility: 0,
            max_visibility: 4,
            desc: 'Low visibility',
            color: '#ed2912',
        },
        {
            min_visibility: 5,
            max_visibility: 9,
            desc: 'Normal visibility',
            color: '#edc212',
        },
        {
            min_visibility: 10,
            max_visibility: 20,
            desc: 'Good visibility',
            color: '#228b22',
        },
    ],
    ru: [
        {
            min_visibility: 0,
            max_visibility: 4,
            desc: 'Низкая видимость',
            color: '#ed2912',
        },
        {
            min_visibility: 5,
            max_visibility: 9,
            desc: 'Нормальная видимость',
            color: '#edc212',
        },
        {
            min_visibility: 10,
            max_visibility: 20,
            desc: 'Хорошая видимость',
            color: '#228b22',
        },
    ],
};

export const visibilityScale = () => {
    return store.state.settings.languageCurrent == LANG.ru ? Visibility.ru : Visibility.en;
};

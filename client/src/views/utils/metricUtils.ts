import store from '@/store';
import { LANG } from '@/types/language';
import { UNITS } from '@/types/units';

export const unitData = () => {
    const data = {
        en: {
            metric: {
                length: 'km',
                speed: 'm/s',
                temperature: '°C',
                pressure: 'mmHg',
                hour: 'h',
                minute: 'min',
            },
            imperial: {
                length: 'mi',
                speed: 'mph',
                temperature: '°F',
                pressure: 'inHg',
                hour: 'h',
                minute: 'min',
            },
        },
        ru: {
            metric: {
                length: 'км',
                speed: 'м/с',
                temperature: '°C',
                pressure: 'мм рт.ст.',
                hour: 'ч',
                minute: 'мин',
            },
            imperial: {
                length: 'миль',
                speed: 'миля/ч',
                temperature: '°F',
                pressure: 'дюйм рт.ст.',
                hour: 'ч',
                minute: 'мин',
            },
        },
    };
    if (store.state.settings.languageCurrent == LANG.ru) {
        if (store.state.settings.units == UNITS.imperial) {
            return data.ru.imperial;
        } else {
            return data.ru.metric;
        }
    } else {
        if (store.state.settings.units == UNITS.imperial) {
            return data.en.imperial;
        } else {
            return data.en.metric;
        }
    }
};

export interface IUnit {
    length: string;
    speed: string;
    temperature: string;
    pressure: string;
    hour: string;
    minute: string;
}

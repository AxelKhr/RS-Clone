import store from '@/store';
import { LANG } from '@/types/language';

const SCALE = [0, 0.5, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7, 100];

const Wind = {
    en: [
        {
            min_speed: SCALE[0],
            max_speed: SCALE[1],
            name: 'Calm',
            description: 'Smoke rises vertically',
            color: 'background-color: #000000',
        },
        {
            min_speed: SCALE[1],
            max_speed: SCALE[2],
            name: 'Light air',
            description: 'Direction shown by smoke drift but not by wind vanes',
            color: 'background-color: #aef1f9',
        },
        {
            min_speed: SCALE[2],
            max_speed: SCALE[3],
            name: 'Light breeze',
            description: 'Wind felt on face; leaves rustle; wind vane moved by wind',
            color: 'background-color: #96f7dc',
        },
        {
            min_speed: SCALE[3],
            max_speed: SCALE[4],
            name: 'Gentle breeze',
            description: 'Leaves and small twigs in constant motion; light flags extended',
            color: 'background-color: #96f7b4',
        },
        {
            min_speed: SCALE[4],
            max_speed: SCALE[5],
            name: 'Moderate breeze',
            description: 'Raises dust and loose paper; small branches moved',
            color: 'background-color: #6ff46f',
        },
        {
            min_speed: SCALE[5],
            max_speed: SCALE[6],
            name: 'Fresh breeze',
            description: 'Small trees in leaf begin to sway; crested wavelets form on inland waters',
            color: 'background-color: #73ed12',
        },
        {
            min_speed: SCALE[6],
            max_speed: SCALE[7],
            name: 'Strong breeze',
            description: 'Large branches in motion; whistling heard in telegraph wires; umbrellas used with difficulty',
            color: 'background-color: #a4ed12',
        },
        {
            min_speed: SCALE[7],
            max_speed: SCALE[8],
            name: 'High wind',
            description: 'Whole trees in motion; inconvenience felt when walking against the wind',
            color: 'background-color: #daed12',
        },
        {
            min_speed: SCALE[8],
            max_speed: SCALE[9],
            name: 'Gale',
            description: 'Twigs break off trees; generally impedes progress',
            color: 'background-color: #edc212',
        },
        {
            min_speed: SCALE[9],
            max_speed: SCALE[10],
            name: 'Strong gale',
            description: 'Slight structural damage (chimney pots and slates removed)',
            color: 'background-color: #ed8f12',
        },
        {
            min_speed: SCALE[10],
            max_speed: SCALE[11],
            name: 'Storm',
            description: 'Seldom experienced inland; trees uprooted; considerable structural damage',
            color: 'background-color: #ed6312',
        },
        {
            min_speed: SCALE[11],
            max_speed: SCALE[12],
            name: 'Violent storm',
            description: 'Very rarely experienced; accompanied by widespread damage',
            color: 'background-color: #ed2912',
        },
        {
            min_speed: SCALE[12],
            max_speed: SCALE[13],
            name: 'Hurricane',
            description: 'Devastation',
            color: 'background-color: #d5102d',
        },
    ],
    ru: [
        {
            min_speed: SCALE[0],
            max_speed: SCALE[1],
            name: 'Штиль',
            description: 'Дым поднимается вертикально',
            color: 'background-color: #000000',
        },
        {
            min_speed: SCALE[1],
            max_speed: SCALE[2],
            name: 'Тихий',
            description: 'Направление ветра заметно по относу дыма, но не по флюгеру.',
            color: 'background-color: #aef1f9',
        },
        {
            min_speed: SCALE[2],
            max_speed: SCALE[3],
            name: 'Лёгкий',
            description: 'Движение ветра ощущается лицом, шелестят листья, приводится в движение флюгер.',
            color: 'background-color: #96f7dc',
        },
        {
            min_speed: SCALE[3],
            max_speed: SCALE[4],
            name: 'Слабый',
            description: 'Листья и тонкие ветви деревьев всё время колышутся, ветер развевает лёгкие флаги.',
            color: 'background-color: #96f7b4',
        },
        {
            min_speed: SCALE[4],
            max_speed: SCALE[5],
            name: 'Умеренный',
            description: 'Ветер поднимает пыль и мусор, приводит в движение тонкие ветви деревьев.',
            color: 'background-color: #6ff46f',
        },
        {
            min_speed: SCALE[5],
            max_speed: SCALE[6],
            name: 'Свежий',
            description: 'Качаются тонкие стволы деревьев, движение ветра ощущается рукой.',
            color: 'background-color: #73ed12',
        },
        {
            min_speed: SCALE[6],
            max_speed: SCALE[7],
            name: 'Сильный',
            description: 'Качаются толстые сучья деревьев, гудят телеграфные провода.',
            color: 'background-color: #a4ed12',
        },
        {
            min_speed: SCALE[7],
            max_speed: SCALE[8],
            name: 'Крепкий',
            description: 'Гнутся стволы деревьев, трудно идти против ветра.',
            color: 'background-color: #daed12',
        },
        {
            min_speed: SCALE[8],
            max_speed: SCALE[9],
            name: 'Очень крепкий',
            description: 'Ветер ломает сучья деревьев, идти против ветра очень трудно.',
            color: 'background-color: #edc212',
        },
        {
            min_speed: SCALE[9],
            max_speed: SCALE[10],
            name: 'Шторм',
            description: 'Небольшие повреждения, ветер начинает разрушать крыши зданий.',
            color: 'background-color: #ed8f12',
        },
        {
            min_speed: SCALE[10],
            max_speed: SCALE[11],
            name: 'Сильный шторм',
            description: 'Значительные разрушения строений, ветер вырывает деревья с корнем.',
            color: 'background-color: #ed6312',
        },
        {
            min_speed: SCALE[11],
            max_speed: SCALE[12],
            name: 'Жестокий шторм',
            description: 'Большие разрушения на значительном пространстве. Наблюдается очень редко.',
            color: 'background-color: #ed2912',
        },
        {
            min_speed: SCALE[12],
            max_speed: SCALE[13],
            name: 'Ураган',
            description:
                'Огромные разрушения, серьёзно повреждены здания, строения и дома, деревья вырваны с корнями, растительность уничтожена. Случай крайне редкий.',
            color: 'background-color: #d5102d',
        },
    ],
};

export const windScale = () => {
    return store.state.settings.languageCurrent == LANG.ru ? Wind.ru : Wind.en;
};

import { ILang } from '@/types/language';

const RUSSIAN: ILang = {
    name: 'Russian',
    abbreviation: 'RU',
    data: {
        menuForecast: 'Прогноз',
        menuMap: 'Карта',
        menuSettings: 'Настройки',
        settingsGeneralTitle: 'ОБЩИЕ',
        settingsForecastTitle: 'ПРОГНОЗ',
        settingsMapTitle: 'КАРТА',
        settingsLanguage: 'Язык',
        settingsTheme: 'Тема',
        settingsUnits: 'Единицы измерения',
        settingsLayers: 'Слои',
        mapLayers: {
            temp: 'Температура',
            wind: 'Ветер',
            cloud: 'Облачность',
            pressure: 'Давление',
            precipitation: 'Осадки',
        },
        startText: 'Текст привествия',
        startButton: 'Выбрать локацию',
    },
};

export default RUSSIAN;

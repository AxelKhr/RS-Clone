import { ILang } from '@/types/language';

const ENGLISH: ILang = {
    name: 'English',
    abbreviation: 'EN',
    data: {
        menuForecast: 'Forecast',
        menuMap: 'Map',
        menuSettings: 'Settings',
        settingsGeneralTitle: 'GENERAL',
        settingsForecastTitle: 'FORECAST',
        settingsMapTitle: 'MAP',
        settingsLanguage: 'Language',
        settingsTheme: 'Theme',
        settingsUnits: 'Units',
        settingsLayers: 'Layers',
        mapLayers: {
            temp: 'Temperature',
            wind: 'Wind',
            cloud: 'Clouds',
            pressure: 'Pressure',
            precipitation: 'Precipiation',
        },
        startText: 'Greeting text',
        startButton: 'Set location',
    },
};

export default ENGLISH;

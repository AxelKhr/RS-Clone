import { ILang } from '@/types/language';

const ENGLISH: ILang = {
    name: 'English',
    abbreviation: 'EN',
    data: {
        page404: 'Page not found',
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
        settingsAbout: 'About',
        mapLayers: {
            temp: 'Temperature',
            wind: 'Wind',
            cloud: 'Clouds',
            pressure: 'Pressure',
            precipitation: 'Precipiation',
        },
        unitsTypes: {
            metric: 'Metric',
            imperial: 'Imperial',
        },
        startText: 'Greeting text',
        startButton: 'Set location',
        aboutTitle: 'About',
        aboutText: 'Weather forecast application with maps',
        aboutAuthor: 'Designed by',
        btnBackText: 'Back',
    },
};

export default ENGLISH;

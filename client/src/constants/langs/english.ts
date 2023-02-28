import { ILang } from '@/types/language';

const ENGLISH: ILang = {
    name: 'English',
    abbreviation: 'EN',
    data: {
        page404: 'Page not found',
        menuForecast: 'Forecast',
        menuMap: 'Map',
        menuSettings: 'Settings',
        modalSearch: 'Search for a location...',
        modalCurrent: 'Current location',
        settingsGeneralTitle: 'GENERAL',
        settingsForecastTitle: 'FORECAST',
        settingsMapTitle: 'MAP',
        settingsLanguage: 'Language',
        settingsTheme: 'Theme',
        settingsUnits: 'Units',
        settingsSections: 'Sections',
        settingsMaps: 'Map type',
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
        forecastSections: {
            daily: 'Daily forecast',
            hourly: 'Hourly forecast',
            average: 'Average data',
        },
        startText: 'Weather forecast application',
        startText2: 'Please select a location',
        startButton: 'Set location',
        aboutTitle: 'About',
        aboutText: 'Weather forecast application with maps',
        aboutAuthor: 'Designed by',
        btnBackText: 'Back',
    },
};

export default ENGLISH;

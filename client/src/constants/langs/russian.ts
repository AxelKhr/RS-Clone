import { ILang } from '@/types/language';

const RUSSIAN: ILang = {
    name: 'Русский',
    abbreviation: 'RU',
    data: {
        page404: 'Страница не найдена',
        menuForecast: 'Прогноз',
        menuMap: 'Карта',
        menuSettings: 'Настройки',
        settingsGeneralTitle: 'ОБЩИЕ',
        settingsForecastTitle: 'ПРОГНОЗ',
        settingsMapTitle: 'КАРТА',
        settingsLanguage: 'Язык',
        settingsTheme: 'Тема',
        settingsUnits: 'Единицы измерения',
        settingsSections: 'Секции',
        settingsLayers: 'Слои',
        settingsAbout: 'О программе',
        mapLayers: {
            temp: 'Температура',
            wind: 'Ветер',
            cloud: 'Облачность',
            pressure: 'Давление',
            precipitation: 'Осадки',
        },
        unitsTypes: {
            metric: 'Метрические',
            imperial: 'Имперские',
        },
        forecastSections: {
            daily: 'Дневной прогноз',
            hourly: 'Почасовой прогноз',
            average: 'Усредненные данные',
        },
        startText: 'Текст привествия',
        startButton: 'Выбрать локацию',
        aboutTitle: 'О программе',
        aboutText: 'Приложение прогноза погоды с картами',
        aboutAuthor: 'Разработано',
        btnBackText: 'Назад',
    },
};

export default RUSSIAN;

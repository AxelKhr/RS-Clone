import { ILang } from '@/types/language';

const RUSSIAN: ILang = {
    name: 'Русский',
    abbreviation: 'RU',
    data: {
        page404: 'Страница не найдена',
        menuForecast: 'Прогноз',
        menuMap: 'Карта',
        menuSettings: 'Настройки',
        modalSearch: 'Введите локацию...',
        modalCurrent: 'Текущее местоположение',
        settingsGeneralTitle: 'ОБЩИЕ',
        settingsForecastTitle: 'ПРОГНОЗ',
        settingsMapTitle: 'КАРТА',
        settingsLanguage: 'Язык',
        settingsTheme: 'Тема',
        settingsUnits: 'Единицы измерения',
        settingsSections: 'Секции',
        settingsMaps: 'Тип карты',
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
        startText: 'Приложение прогноза погоды',
        startText2: 'Пожалуйста выберите локацию',
        startButton: 'Выбрать локацию',
        aboutTitle: 'О программе',
        aboutText: 'Приложение прогноза погоды с картами',
        aboutAuthor: 'Разработано',
        btnBackText: 'Назад',
    },
};

export default RUSSIAN;

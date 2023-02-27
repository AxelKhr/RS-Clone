import { ILang } from '@/types/language';

const RUSSIAN: ILang = {
    name: 'Russian',
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
        settingsLayers: 'Слои',
        settingsAbout: 'О программе',
        mapLayers: {
            temp: 'Температура',
            wind: 'Ветер',
            cloud: 'Облачность',
            pressure: 'Давление',
            precipitation: 'Осадки',
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

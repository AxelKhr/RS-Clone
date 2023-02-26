import store from '@/store';
import { LANG } from '@/types/language';

export const langData = () => {
    const data = {
        en: {
            feeling: 'Feelings like',
            sunrise: 'Sunrise',
            sunset: 'Sunset',
            temperature: 'Temperature',
            humidity: 'Humidity',
            precipitation: 'Precipitation',
            wind: 'Wind',
            pressure: 'Pressure',
            clouds: 'Clouds Cov.',
            visibility: 'Visibility',
            morning: 'Morning',
            day: 'Day',
            evening: 'Evening',
            night: 'Night',
            daily: 'Daily Forecast',
            average: 'Average for 16 days',
            hourly: 'Hourly Forecast',
            today: 'Today',
            tommorow: 'Tommorow',
        },
        ru: {
            feeling: 'Ощущается как',
            sunrise: 'Восход',
            sunset: 'Закат',
            temperature: 'Температура',
            humidity: 'Влажность',
            precipitation: 'Осадки',
            wind: 'Ветер',
            pressure: 'Давление',
            clouds: 'Облачность',
            visibility: 'Видимость',
            morning: 'Утро',
            day: 'День',
            evening: 'Вечер',
            night: 'Ночь',
            daily: 'Дневной прогноз',
            average: 'В среднем за 16 дней',
            hourly: 'Почасовой прогноз',
            today: 'Сегодня',
            tommorow: 'Завтра',
        },
    };
    if (store.state.settings.languageCurrent == LANG.ru) {
        return data.ru;
    } else {
        return data.en;
    }
};

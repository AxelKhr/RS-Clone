import store from '@/store';
import { LANG } from '@/types/language';

export const langData = () => {
    const data = {
        en: {
            clear: 'Clear days',
            prec_day: 'Days with precipitation',
            cloudy_day: 'Cloudy days',
            time: 'Local time',
            feeling: 'Feelings like',
            sunrise: 'Sunrise',
            moonrise: 'Moonrise',
            sunset: 'Sunset',
            moonset: 'Moonset',
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
            clear: 'Ясные дни',
            prec_day: 'Дни с осадками',
            cloudy_day: 'Облачные дни',
            time: 'Местное время',
            feeling: 'Ощущается как',
            sunrise: 'Восход',
            moonrise: 'Восход луны',
            sunset: 'Закат',
            moonset: 'Заход луны',
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

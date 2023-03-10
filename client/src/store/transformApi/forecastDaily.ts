import { apiForecastDaily } from '@/api/types/response';
import { IForecastDaily, IForecastDailyData } from '@/types/weather';
import store from '..';

export default function transformRespForecastDaily(response: apiForecastDaily): IForecastDaily {
    return {
        days: response.data.map((day) => {
            const data: IForecastDailyData = {
                timeStamp: day.ts,
                validDate: day.valid_date,
                temperatureAverage: day.temp,
                temperatureMax: Math.round(day.max_temp),
                temperatureMin: Math.round(day.min_temp),
                temperatureHigh: day.high_temp,
                temperatureLow: day.low_temp,
                windSpeed: +day.wind_spd.toFixed(2),
                windGustSpeed: day.wind_gust_spd,
                windDirection: day.wind_dir,
                windDirectionAbbr: day.wind_cdir,
                precipitationProbability: day.pop,
                precip: day.precip,
                snow: day.snow,
                pressure: Math.round(day.pres / 1.333),
                humidityRelative: day.rh,
                cloudCoverage: day.clouds,
                sunRise: getTime(new Date(day.sunrise_ts * 1000)),
                sunSet: getTime(new Date(day.sunset_ts * 1000)),
                moonRise: getTime(new Date(day.moonrise_ts * 1000)),
                moonSet: getTime(new Date(day.moonset_ts * 1000)),
                indexUV: day.uv,
                visibility: Math.round(day.vis),
                weatherIcon: require(`@/assets/icons/${day.weather.icon}.png`),
                weatherCode: day.weather.code,
                weatherDescription: day.weather.description,
            };
            return data;
        }),
    };
}

function getTime(date: Date) {
    return date.toLocaleTimeString('en', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: store.state.forecast.current.timeZone,
    });
}

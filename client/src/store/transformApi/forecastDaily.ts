import { apiForecastDaily } from '@/api/types/response';
import { IForecastDaily, IForecastDailyData } from '@/types/weather';

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
                pressure: Math.round(day.pres / 1.333),
                humidityRelative: day.rh,
                cloudCoverage: day.clouds,
                sunRise: new Date((day.sunrise_ts - 3 * 60 * 60) * 1000).toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                sunSet: new Date((day.sunset_ts - 3 * 60 * 60) * 1000).toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                indexUV: day.uv,
                visibility: Math.round(day.vis),
                weatherIcon: require(`../../assets/icons/${day.weather.icon}.png`),
                weatherCode: day.weather.code,
                weatherDescription: day.weather.description,
            };
            return data;
        }),
    };
}

import { apiForecastDaily } from '@/api/types/response';
import { IForecastDaily, IForecastDailyData } from '@/types/weather';

export default function transformRespForecastDaily(response: apiForecastDaily): IForecastDaily {
    return {
        days: response.data.map((day) => {
            const data: IForecastDailyData = {
                timeStamp: day.ts,
                validDate: day.valid_date,
                temperatureAverage: day.temp,
                temperatureMax: day.max_temp,
                temperatureMin: day.min_temp,
                temperatureHigh: day.high_temp,
                temperatureLow: day.low_temp,
                windSpeed: day.wind_spd,
                windGustSpeed: day.wind_gust_spd,
                windDirection: day.wind_dir,
                windDirectionAbbr: day.wind_cdir,
                precipitationProbability: day.pop,
                pressure: day.pres,
                humidityRelative: day.rh,
                cloudCoverage: day.clouds,
                sunRise: day.sunrise_ts,
                sunSet: day.sunset_ts,
                indexUV: day.uv,
                visibility: day.vis,
                weatherIcon: day.weather.icon,
                weatherCode: day.weather.code,
                weatherDescription: day.weather.description,
            };
            return data;
        }),
    };
}

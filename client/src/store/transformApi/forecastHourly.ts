import { apiForecastHourly } from '@/api/types/response';
import { IForecastHourly, IForecastHourlyData } from '@/types/weather';

export default function transformRespForecastHourly(response: apiForecastHourly): IForecastHourly {
    return {
        hours: response.data.map((hour) => {
            const data: IForecastHourlyData = {
                timeStamp: hour.ts,
                timeStampLocal: hour.timestamp_local,
                timeStampUTC: hour.timestamp_utc,
                partOfDay: hour.pod,
                temperature: hour.temp,
                feelsLikeTemp: hour.app_temp,
                windSpeed: hour.wind_spd,
                windGustSpeed: hour.wind_gust_spd,
                windDirection: hour.wind_dir,
                windDirectionAbbr: hour.wind_cdir,
                precipitationProbability: hour.pop,
                precipitationLiquid: hour.precip,
                pressure: hour.pres,
                humidityRelative: hour.rh,
                cloudCoverage: hour.clouds,
                indexUV: hour.uv,
                visibility: hour.vis,
                weatherIcon: require(`@/assets/icons/${hour.weather.icon}.png`),
                weatherCode: hour.weather.code,
                weatherDescription: hour.weather.description,
            };
            return data;
        }),
    };
}

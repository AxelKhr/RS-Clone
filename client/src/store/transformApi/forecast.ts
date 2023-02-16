import { LocationForecastResponse } from '@/api/types/response';
import { IForecastCurrent } from '@/types/weather';

export default function transformRespForecastCurrent(response: LocationForecastResponse): IForecastCurrent {
    return {
        timeStamp: response.ts,
        timeObservation: response.ob_time,
        cityName: response.city_name,
        countryCode: response.country_code,
        timeZone: response.timezone,
        temperature: response.temp,
        feelsLikeTemp: response.app_temp,
        windSpeed: response.wind_spd,
        windGustSpeed: response.gust,
        windDirection: response.wind_dir,
        windDirectionAbbr: response.wind_cdir,
        pressure: response.pres,
        humidityRelative: response.rh,
        cloudCoverage: response.clouds,
        sunRise: response.sunrise,
        sunSet: response.sunset,
        visibility: response.vis,
        indexUV: response.uv,
        weatherIcon: require(`../../assets/icons/${response.weather.icon}.png`),
        weatherCode: response.weather.code,
        weatherDescription: response.weather.description,
        partOfDay: response.pod,
        airQualityIndex: response.aqi,
    };
}

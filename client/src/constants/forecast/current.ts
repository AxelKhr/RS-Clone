import { IForecastCurrent } from '@/types/weather';

const FORECAST_CURRENT_DEF: IForecastCurrent = {
    timeStamp: 0,
    timeObservation: '',
    cityName: '',
    countryCode: '',
    temperature: 0,
    feelsLikeTemp: 0,
    windSpeed: 0,
    windGustSpeed: 0,
    windDirection: 0,
    windDirectionAbbr: '',
    pressure: 0,
    humidityRelative: 0,
    cloudCoverage: 0,
    sunRise: '',
    sunSet: '',
    visibility: 0,
    indexUV: 0,
    weatherIcon: '',
    weatherCode: 0,
    weatherDescription: '',
    partOfDay: '',
    airQualityIndex: 0,
};

export default FORECAST_CURRENT_DEF;

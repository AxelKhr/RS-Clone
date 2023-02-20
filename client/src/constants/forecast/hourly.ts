import { IForecastHourly, IForecastHourlyData } from '@/types/weather';

export const FORECAST_HOURLY_DATA_DEF: IForecastHourlyData = {
    timeStamp: 0,
    timeStampLocal: '',
    timeStampUTC: '',
    partOfDay: '',
    temperature: 0,
    feelsLikeTemp: 0,
    windSpeed: 0,
    windGustSpeed: 0,
    windDirection: 0,
    windDirectionAbbr: '',
    pressure: 0,
    humidityRelative: 0,
    precipitationProbability: 0,
    precipitationLiquid: 0,
    cloudCoverage: 0,
    indexUV: 0,
    visibility: 0,
    weatherIcon: '',
    weatherCode: 0,
    weatherDescription: '',
};

const FORECAST_HOURLY_DEF: IForecastHourly = {
    hours: [],
};

export default FORECAST_HOURLY_DEF;

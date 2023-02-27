import { IForecastDaily, IForecastDailyData } from '@/types/weather';

export const FORECAST_DAILY_DATA_DEF: IForecastDailyData = {
    timeStamp: 0,
    validDate: '',
    temperatureAverage: 0,
    temperatureMax: 0,
    temperatureMin: 0,
    temperatureHigh: 0,
    temperatureLow: 0,
    windSpeed: 0,
    windGustSpeed: 0,
    windDirection: 0,
    windDirectionAbbr: '',
    precipitationProbability: 0,
    precip: 0,
    snow: 0,
    pressure: 0,
    humidityRelative: 0,
    cloudCoverage: 0,
    sunRise: '',
    sunSet: '',
    moonRise: '',
    moonSet: '',
    indexUV: 0,
    visibility: 0,
    weatherIcon: '',
    weatherCode: 0,
    weatherDescription: '',
};

const FORECAST_DAILY_DEF: IForecastDaily = {
    days: [],
};

export default FORECAST_DAILY_DEF;

import { ILocationPlace } from './location';

export interface IForecast {
    isStart: boolean;
    isLoading: boolean;
    isShowModal: boolean;
    location: ILocationPlace;
    isDataReady: boolean;
    current: IForecastCurrent;
    daily: IForecastDaily;
    hourly: IForecastHourly;
    dayHourly: IForecastHourly;
}

export interface IForecastCurrent {
    timeStamp: number;
    timeObservation: string;
    cityName: string;
    countryCode: string;
    timeZone: string;
    temperature: number;
    feelsLikeTemp: number;
    windSpeed: number;
    windGustSpeed: number;
    windDirection: number;
    windDirectionAbbr: string;
    pressure: number;
    humidityRelative: number;
    cloudCoverage: number;
    sunRise: string;
    sunSet: string;
    visibility: number;
    indexUV: number;
    weatherIcon: string;
    weatherCode: number;
    weatherDescription: string;
    partOfDay: string;
    airQualityIndex: number;
}

export interface IForecastDailyData {
    timeStamp: number;
    validDate: string;
    temperatureAverage: number;
    temperatureMax: number;
    temperatureMin: number;
    temperatureHigh: number;
    temperatureLow: number;
    windSpeed: number;
    windGustSpeed: number;
    windDirection: number;
    windDirectionAbbr: string;
    precipitationProbability: number;
    precip: number;
    snow: number;
    pressure: number;
    humidityRelative: number;
    cloudCoverage: number;
    sunRise: string;
    sunSet: string;
    moonRise: string;
    moonSet: string;
    indexUV: number;
    visibility: number;
    weatherIcon: string;
    weatherCode: number;
    weatherDescription: string;
}

export interface IForecastDaily {
    days: IForecastDailyData[];
}

export interface IForecastHourlyData {
    timeStamp: number;
    timeStampLocal: string;
    timeStampUTC: string;
    partOfDay: string;
    temperature: number;
    feelsLikeTemp: number;
    windSpeed: number;
    windGustSpeed: number;
    windDirection: number;
    windDirectionAbbr: string;
    precipitationProbability: number;
    precipitationLiquid: number;
    pressure: number;
    humidityRelative: number;
    cloudCoverage: number;
    indexUV: number;
    visibility: number;
    weatherIcon: string;
    weatherCode: number;
    weatherDescription: string;
}

export interface IForecastHourly {
    hours: IForecastHourlyData[];
}

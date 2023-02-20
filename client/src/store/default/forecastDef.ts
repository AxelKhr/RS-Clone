import {
    IForecastCurrent,
    IForecastDailyData,
    IForecastDaily,
    IForecastHourlyData,
    IForecastHourly,
} from '@/types/weather';

export function getForecastCurrentDef(): IForecastCurrent {
    return {
        timeStamp: 0,
        timeObservation: '',
        cityName: '',
        countryCode: '',
        timeZone: '',
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
}

export function getForecastDailyDataDef(): IForecastDailyData {
    return {
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
        pressure: 0,
        humidityRelative: 0,
        cloudCoverage: 0,
        sunRise: '',
        sunSet: '',
        indexUV: 0,
        visibility: 0,
        weatherIcon: '',
        weatherCode: 0,
        weatherDescription: '',
    };
}

export function getForecastDailyDef(): IForecastDaily {
    return {
        days: [],
    };
}

export function getForecastHourlyDataDef(): IForecastHourlyData {
    return {
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
}

export function getForecastHourlyDef(): IForecastHourly {
    return {
        hours: [],
    };
}

import { IForecastCurrent } from '@/types/weather';

export function getForecastCurrentDef(): IForecastCurrent {
    return {
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
}

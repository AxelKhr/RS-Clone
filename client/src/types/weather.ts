export interface IForecast {
    isLoading: boolean;
    current: IForecastCurrent;
    daily: IForecastDaily;
}

export interface IForecastCurrent {
    timeStamp: number;
    timeObservation: string;
    cityName: string;
    countryCode: string;
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
    pressure: number;
    humidityRelative: number;
    cloudCoverage: number;
    sunRise: number;
    sunSet: number;
    indexUV: number;
    visibility: number;
    weatherIcon: string;
    weatherCode: number;
    weatherDescription: string;
}

export interface IForecastDaily {
    days: IForecastDailyData[];
}

export interface IForecastDaily {
    data1: number;
    data2: number;
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

export interface IForecast {
    isLoading: boolean;
    current: IForecastCurrent;
    daily: IForecastDaily;
}

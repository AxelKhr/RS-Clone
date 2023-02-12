export interface LocationForecastRequest {
    latitude: number;
    longitude: number;
    metric?: string;
    lang?: string;
}

export interface Weather {
    icon: string;
    description: string;
}

export interface NameForecastRequest {
    city_name: string;
}
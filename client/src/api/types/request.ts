export interface LocationForecastRequest {
    latitude: number;
    longitude: number;
    start_date?: string;
    end_date?: string;
    metric?: string;
    units?: string;
    lang?: string;
}

export interface Weather {
    icon: string;
    code: number;
    description: string;
}

export interface NameForecastRequest {
    city_name: string;
    units?: string;
    lang?: string;
}

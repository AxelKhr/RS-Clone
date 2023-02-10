import type { Weather } from './request';

export default interface LocationForecastResponse {
    city_name: string;
    country_code: string;
    timezone: string;
    wind_spd: number;
    gust: number;
    wind_dir: number;
    wind_cdir: string;
    wind_cdir_full: string;
    clouds: number;
    weather: Weather;
    temp: number;
    app_temp: number;
    sunrise: string;
    sunset: string;
    ob_time: string;
    rh: number;
    pres: number;
    vis: number;
    ts: number;
    uv: number;
    pod: string;
    aqi: number;
}

/* export const GodObject: LocationForecastResponse = {
    city_name: '',
    country_code: '',
    timezone: '',
    wind_spd: 0,
    wind_dir: 0,
    wind_cdir: '',
    wind_cdir_full: '',
    clouds: 0,
    weather: {
        icon: '',
        description: '',
    },
    temp: 0,
    app_temp: 0,
    sunrise: '',
    sunset: '',
    ob_time: '',
    rh: 0,
    pres: 0,
    vis: 0,
}; */

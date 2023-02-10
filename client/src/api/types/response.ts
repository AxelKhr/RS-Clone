import type { Weather } from './request';

export interface LocationForecastResponse {
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

export interface apiForecastDailyData {
    valid_date: string;
    ts: number;
    wind_gust_spd: number;
    wind_spd: number;
    wind_dir: number;
    wind_cdir: string;
    wind_cdir_full: string;
    temp: number;
    max_temp: number;
    min_temp: number;
    high_temp: number;
    low_temp: number;
    app_max_temp: number;
    app_min_temp: number;
    pop: number;
    precip: number;
    snow: number;
    snow_depth: number;
    slp: number;
    pres: number;
    dewpt: number;
    rh: number;
    weather: Weather;
    clouds_low: number;
    clouds_mid: number;
    clouds_hi: number;
    clouds: number;
    vis: number;
    uv: number;
    moon_phase: number;
    moon_phase_lunation: number;
    moonrise_ts: number;
    moonset_ts: number;
    sunrise_ts: number;
    sunset_ts: number;
}

export interface apiForecastDaily {
    lon: number;
    lat: number;
    city_name: string;
    timezone: string;
    country_code: string;
    state_code: string;
    data: apiForecastDailyData[];
}

export interface apiForecastHourlyData {
    timestamp_local: string;
    timestamp_utc: string;
    ts: number;
    wind_gust_spd: number;
    wind_spd: number;
    wind_dir: number;
    wind_cdir: string;
    wind_cdir_full: string;
    temp: number;
    app_temp: number;
    pop: number;
    precip: number;
    snow: number;
    snow_depth: number;
    slp: number;
    pres: number;
    dewpt: number;
    rh: number;
    weather: Weather;
    pod: string;
    clouds_low: number;
    clouds_mid: number;
    clouds_hi: number;
    clouds: number;
    vis: number;
    dhi: number;
    dni: number;
    ghi: number;
    solar_rad: number;
    uv: number;
    ozone: number;
}

export interface apiForecastHourly {
    lon: number;
    lat: number;
    city_name: string;
    timezone: string;
    country_code: string;
    state_code: string;
    data: apiForecastHourlyData[];
}

import type { Weather } from "./request";

export default interface LocationForecastResponse {
    city_name: string,
    country_code: string,
    timezone: string,
    wind_spd: number,
    wind_dir: number,
    wind_cdir: string,
    wind_cdir_full: string,
    clouds: number,
    weather: Weather,
    temp: number,
    app_temp: number, 
    sunrise: string,
    sunset: string,
}
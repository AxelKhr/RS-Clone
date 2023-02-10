import type { LocationForecastRequest, NameForecastRequest } from '../types/request';
import { API_KEY } from '../constants';

export async function getForecastByLocation(response: LocationForecastRequest) {
    return await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${response.latitude}&lon=${response.longitude}&key=${API_KEY}`
    );
}

export async function getForecastByName(response: NameForecastRequest) {
    return await fetch(`https://api.weatherbit.io/v2.0/current?cities=${response.city_name}&key=${API_KEY}`);
}

export async function getForecastDaily(response: LocationForecastRequest) {
    return await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${response.latitude}&lon=${response.longitude}&key=${API_KEY}`
    );
}

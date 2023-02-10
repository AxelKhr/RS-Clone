import type { LocationForecastRequest, NameForecastRequest } from '../types/request';

const API_KEY = 'a23d71951d4f4dd89ced2ad48627f1c1';

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

export async function getForecastHourly(response: LocationForecastRequest) {
    return await fetch(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${response.latitude}&lon=${response.longitude}&key=${API_KEY}&hours=24`
    );
}

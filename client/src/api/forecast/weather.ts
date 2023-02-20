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

export async function getForecastHourly(response: LocationForecastRequest) {
    return await fetch(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${response.latitude}&lon=${response.longitude}&key=${API_KEY}&hours=24`
    );
}

export async function getForecastDayHourly(response: LocationForecastRequest) {
    //2023-02-20:00 -start
    //2023-02-20:24 - end
    return await fetch(
        `https://api.weatherbit.io/v2.0/history/hourly?lat=${response.latitude}&lon=${response.longitude}&start_date=${response.start_date}&end_date=${response.end_date}&key=${API_KEY}`
    );
}

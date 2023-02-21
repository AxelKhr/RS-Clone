import type { LocationForecastRequest, NameForecastRequest } from '../types/request';

import { API_KEY } from '../constants';

function getUnits(request: LocationForecastRequest | NameForecastRequest) {
    return request.units === 'Imperial' ? 'I' : 'M';
}

export async function getForecastByLocation(request: LocationForecastRequest) {
    const units = getUnits(request);
    return await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${request.latitude}&lon=${request.longitude}&units=${units}&key=${API_KEY}`
    );
}

export async function getForecastByName(request: NameForecastRequest) {
    const units = getUnits(request);
    return await fetch(
        `https://api.weatherbit.io/v2.0/current?cities=${request.city_name}&units=${units}&key=${API_KEY}`
    );
}

export async function getForecastDaily(request: LocationForecastRequest) {
    const units = getUnits(request);
    return await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.latitude}&lon=${request.longitude}&units=${units}&key=${API_KEY}`
    );
}

export async function getForecastHourly(request: LocationForecastRequest) {
    const units = getUnits(request);
    return await fetch(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${request.latitude}&lon=${request.longitude}&units=${units}&key=${API_KEY}&hours=24`
    );
}

export async function getForecastDayHourly(response: LocationForecastRequest) {
    //2023-02-20:00 -start
    //2023-02-20:24 - end
    return await fetch(
        `https://api.weatherbit.io/v2.0/history/hourly?lat=${response.latitude}&lon=${response.longitude}&start_date=${response.start_date}&end_date=${response.end_date}&key=${API_KEY}`
    );
}

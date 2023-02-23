import type { LocationForecastRequest, NameForecastRequest } from '../types/request';

import { API_KEY } from '../constants';

function getUnits(request: LocationForecastRequest | NameForecastRequest) {
    return request.units === 'Imperial' ? 'I' : 'M';
}

function getLang(request: LocationForecastRequest | NameForecastRequest) {
    return request.lang === 'RU' ? 'ru' : 'en';
}

export async function getForecastByLocation(request: LocationForecastRequest) {
    return await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${request.latitude}&lon=${request.longitude}&lang=${getLang(
            request
        )}&units=${getUnits(request)}&key=${API_KEY}`
    );
}

export async function getForecastByName(request: NameForecastRequest) {
    return await fetch(
        `https://api.weatherbit.io/v2.0/current?cities=${request.city_name}&lang=${getLang(request)}&units=${getUnits(
            request
        )}&key=${API_KEY}`
    );
}

export async function getForecastDaily(request: LocationForecastRequest) {
    return await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.latitude}&lon=${request.longitude}&lang=${getLang(
            request
        )}&units=${getUnits(request)}&key=${API_KEY}`
    );
}

export async function getForecastHourly(request: LocationForecastRequest) {
    return await fetch(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${request.latitude}&lon=${request.longitude}&lang=${getLang(
            request
        )}&units=${getUnits(request)}&key=${API_KEY}&hours=24`
    );
}

export async function getForecastDayHourly(request: LocationForecastRequest) {
    return await fetch(
        `https://api.weatherbit.io/v2.0/history/hourly?lat=${request.latitude}&lon=${request.longitude}&start_date=${
            request.start_date
        }&end_date=${request.end_date}&lang=${getLang(request)}&units=${getUnits(request)}&key=${API_KEY}`
    );
}

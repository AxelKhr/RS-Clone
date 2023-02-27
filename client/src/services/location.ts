import { searchLocationByQuery, getLocationByCoordinates } from '@/api/location/locationApi';
import { ILocationPlace, ILocationPosition } from '@/types/location';
import { BrowserLocationCallback } from '@/types/location';
import setError from '@/utils/error';

function getFullName(name: string, admin: string, country: string) {
    return `${name}, ${admin} , ${country}`;
}

export async function searchLocations(query: string): Promise<ILocationPlace[]> {
    const data = await searchLocationByQuery({ query, limit: 100, language: 'en' });
    return data.map((item) => {
        return <ILocationPlace>{
            id: item.id,
            name: item.name,
            nameFull: getFullName(item.name, item.adminDivision1.name, item.country.name),
            position: item.coordinates,
        };
    });
}

export function getBrowserLocation(callback: BrowserLocationCallback) {
    let geolocation = {
        isAvailable: false,
        latitude: 0,
        longitude: 0,
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            geolocation = {
                isAvailable: true,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            };
            getNameLocation({ latitude: geolocation.latitude, longitude: geolocation.longitude })
                .then((resp) => {
                    const location = resp[0];
                    callback({
                        isAvailable: geolocation.isAvailable,
                        id: location.id,
                        name: location.name,
                        nameFull: getFullName(location.name, location.adminDivision1.name, location.country.name),
                        position: {
                            latitude: location.coordinates.latitude,
                            longitude: location.coordinates.longitude,
                        },
                    });
                })
                .catch(() => {
                    setError('Location API Error');
                });
        });
    }
}

export async function getNameLocation(position: ILocationPosition) {
    const data = await getLocationByCoordinates({
        latitude: position.latitude,
        longitude: position.longitude,
        limit: 1,
        language: 'en',
    });
    return data;
}

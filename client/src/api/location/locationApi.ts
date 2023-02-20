const API_KEY_LOCATION = '87b9f08fb1mshfc8b07ee4985fe9p1e1199jsnaa7a18fdfdda';

export interface LocationRequest {
    query: string;
    limit: number;
    language: string;
}

export interface LocationResponse {
    id: string;
    geonameId: number;
    type: string;
    name: string;
    localizedName?: string;
    population: number;
    elevation: number;
    timezoneId: string;
    geonamesUpdatedAt: string;
    createdAt: string;
    updatedAt: string;
    country: {
        id: string;
        geonameId: number;
        name: string;
        localizedName?: string;
    };
    adminDivision1: {
        id: string;
        geonameId: number;
        name: string;
        localizedName?: string;
    };
    adminDivision2?: {
        id: string;
        geonameId: number;
        name: string;
        localizedName?: string;
    };
    score: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export async function searchLocationByQuery(request: LocationRequest): Promise<Array<LocationResponse>> {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY_LOCATION,
            'X-RapidAPI-Host': 'spott.p.rapidapi.com',
        },
    };

    return await fetch(
        `https://spott.p.rapidapi.com/places/autocomplete?limit=${request.limit}&skip=0&language=%20${request.language}&q=${request.query}&type=CITY`,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            const queryLowwer = `${request.query}`.toLocaleLowerCase();
            return (response as Array<LocationResponse>)
                .filter(
                    (item) =>
                        item.name.toLocaleLowerCase().indexOf(queryLowwer) === 0 ||
                        (item.localizedName && item.localizedName.toLocaleLowerCase().indexOf(queryLowwer) === 0)
                )
                .sort((a, b) => b.population - a.population)
                .slice(0, 5);
        });
}

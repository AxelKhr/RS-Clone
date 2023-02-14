import { searchLocationByQuery } from '@/api/location/locationApi';
import { ILocationPlace } from '@/types/location';

export async function searchLocations(query: string): Promise<ILocationPlace[]> {
    const data = await searchLocationByQuery({ query, limit: 100, language: 'en' });
    return data.map((item) => {
        return <ILocationPlace>{
            id: item.id,
            name: item.name,
            nameFull: item.name,
            position: item.coordinates,
        };
    });
}
